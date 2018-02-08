/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import { ActionState } from '../app/container';
import getOptions from '../utils/getOptions';


// action state 
// -----------------------------
/**
 * 网络请求管理器的构造参数
 * @class ActionStateRequestOptions
 * @property {object|array} [defaultData={}] - 默认数据 
 * @property {object|array} [initData={}] - 初始化数据 
 * @property {boolean} [trackState=falae] - 是否显示
 * @property {boolean} [updateOnStart=falae] - 是否在container 启动时更新数据
 * @property {boolean} [updateOnResume=falae] - 是否在container 获取焦点时更新数据
 * @property {boolean} [clearOnStop=true] - 是否在container 停止时，清除数据管理器
 */
/** 
 * 数据将要改变时触发
 * @callback onWillChange
 * @param {object|array} result - 请求结果
 * @return {object|array} - 如果返回则替换为返回的数据 
 */
/**
 * 数据修改后触发
 * @callback onDidChange
 * @param {object|array} result - 请求结果
 */
/**
 * @callback onChangeError
 * @param {Error|string} error - 错误信息
 * @param {object|array} result - 请求结果
 */

/**
 * 提供网络请求与网络请求数据的管理
 * @class
 */
class ActionStateRequest extends ActionState {
  static stateName = 'request';

  /**
   * 
   * @param {App} app - App 单实例
   * @param {string} uuid - 唯一id
   * @param {ActionStateRequestOptions} options - 请求参数
   */
  constructor(app, uuid, options){
    super(app, uuid);
    
    /**
     * @property {ActionStateRequestOptions} options - 请求的参数
     */
    this.options = options;
    this.options.defaultData = this.options.defaultData||{};
    this.options.initData = this.options.initData || this.options.defaultData;
    this.options.trackState = Boolean(this.options.trackState);
    this.options.noticeChangeError = this.options.noticeChangeError !== false;
  }

  // interface
  // -------------------------
  /**
   * @property {*} data - 返回请求的数据
   * @readonly
   */
  get data() {
    let state = this.app.getState('request',{});
    return (state.fetchResult && state.fetchResult[this.uuid] && state.fetchResult[this.uuid].result)||this.options.initData;
  }

  /*!
   * @property {*} state - return data for container state data
   * @readonly
   * @override
   */
  get state() { 
    return this.data;
  }

  /*!
   * @property {object} state - return data for container state object
   * @readonly
   * @override
   */
  get states() { 
    return !this.options.trackState?null:{
      state: this._getState(),
    };
  }
 
  /**
   * @method
   * @param {ActionStateRequestOptions} [options] - 本次请求的参数，为空使用创建时的参数
   * @param {boolean} [append=false] - 是否是追加数据还是替换之前数据 
   */
  update(aoptions={},append=null){
    let options = Object.assign( {},
      getOptions(this.options),
      getOptions(aoptions),
      (append===true||append===false)?{append}:{},
    )
    if(this.options.onWillUpdate && this.options.onWillUpdate(options)===false) return;
    this.app.actions.requestFetch(this, options);
  }

  /**
   * 用户设置数据，模拟请求返回的数据
   * @method
   * @param {*} data - 数据
   * @param {boolean} [append=false] - 是否是追加数据还是替换之前数据 
   */
  set(data, append) {
    app.actions.requestFetchSuccess(this.uuid,data||{},this.options.initData,append!==undefined?append:this.options.append,this.options.appendField);
  }

  /**
   * 清除网络数据管理器
   * @method
   */
  clear(){
    this.app.actions._requestFetchClear(this.uuid);
    delete ActionStateRequest.maps[this.uuid];
  }

  // state
  /*!
   * return network state data
   * @method
   */
  _getState() {
    let state = this.app.getState('request',{});
    return (state.fetchResult && state.fetchResult[this.uuid])||{};
  }

  /**
   * 返回请求是否成功完成
   * @method
   * @return {boolean} - 是否成功完成
   */
  getReady(){
    let state = this._getState();
    return state.fetching === false && !state.invalid;
  }

  /**
   * 返回请求的错误信息
   * @method
   * @return {Error|string} - 错误信息或者null
   */
  getError(){
    let state = this._getState();
    return state.error;
  }

  // event
  //----------------------------------
  /*!
   * triiger on container start
   * @callback
   */
  onStart() { //bnorth use
    if(!this.options.updateOnStart) return;
    this.update();
  }

  /*!
   * triiger on container start
   * @callback
   */
  onResume() { //bnorth use
    if(!this.options.updateOnResume) return;
    this.update();
  }

  /*!
   * triiger on container start
   * @callback
   */
  onStop() { //bnorth use
    if(this.options.clearOnStop===false) return;
    this.clear();
  }

  /*!
   * triiger on container start
   * @callback
   */
  onFetching(show=true, blocking=false) {
    if(blocking){
      this.app.actions.noticeBlocking(show);
    }else{
      this.app.actions.noticeLoading(show);
    }
  }

  /*!
   * triiger on container start
   * @callback
   * @param {*} result - network data
   * @return {*} - return changed data overrided
   */
  onWillChange(result) { 
    return this.options.onWillChange&&this.options.onWillChange(result);
  }

  /*!
   * triiger on container start
   * @callback
   * @param {*} result - network data
   */
  onDidChange(result) { 
    return this.options.onDidChange&&this.options.onDidChange(result);
  }

  /*!
   * triiger on network error
   * @callback
   * @param {Error|string} error - error info
   * @param {*} result - network data
   */
  onChangeError(error, result){
    this.app.error(error);
    if(this.options.onChangeError&&this.options.onChangeError(error, result));
    this.app.actions.noticeMessage(error, {cTheme: 'alert'});
  }
}


// plugin
// ------------------------------------------------------
/**
 * **plugin** name: request dependence: network
 * 提供网络请求与网络请求数据的管理
 * @class
 * @example
 * **使用**
 * // containerCreator 创建
 * container.states.order = app.actionStates.request({resource: 'order', data:{id: 1}});
 * // containerCreator 使用
 * container.states.order.update()
 * // page - 请求数据
 * this.props.state_order
 * // page - 请求状态数据
 * this.props.state_order_state
 */

const RequestFetchFetching = 'RequestFetchFetching';
const RequestFetchInvalid = 'RequestFetchInvalid';
const RequestFetchFetchSuccess = 'RequestFetchFetchSuccess';
const RequestFetchFetchFail = 'RequestFetchFetchFail';
/**
 * 发起获取型请求
 * @method app.actions.requestFetch
 * @param {*} request 
 * @param {*} options 
 */
let requestFetch = (request, options)=>app=>{
  app.actions.requestFetching(request.uuid);
  request.trigger('onFetching', true, options.blocking);

  app.network.fetch(options).then(
    (result)=>{
      request.trigger('onFetching', false, options.blocking);
      let ret = request.trigger('onWillChange', result); 
      if(ret)result = ret;
      if(ret===false) return;
      app.actions.requestFetchSuccess(request.uuid,result,options.initData,options.append,options.appendField);
      request.trigger('onDidChange', result);
    },
    (error)=>{
      request.trigger('onFetching', false, options.blocking);
      app.actions.requestFetchFail(request.uuid,error);
      request.trigger('onChangeError', error);
    }
  ).catch((error)=>{
    request.trigger('onFetching', false, options.blocking);
    app.errorNotice(error);
  });    
}
let requestFetching = (uuid)=>{
  return {
    type: RequestFetchFetching,
    uuid,
  };
}
let requestFetchInvalid = (uuid)=>{
  return {
    type: RequestFetchInvalid,
    uuid,
  };
}
let requestFetchSuccess = (uuid,result,initData,append,appendField)=>{
  return {
    type: RequestFetchFetchSuccess,
    uuid,
    result,
    initData,
    append,
    appendField,
  };
}
let requestFetchFail = (uuid,error)=>{
  return {
    type: RequestFetchFetchFail,
    uuid,
    error,
  };
}
let _requestFetchClear = (uuid)=>(app)=>{
  let state = app.getState('request',{});
  delete state.fetchResult[uuid];
}

/**
 * 发起提交型请求
 * @method app.actions.requestSubmit
 * @param {*} options 
 */
let requestSubmit = (options)=>(app)=>{
  if(options.blocking!==false)app.actions.noticeBlocking();
  
  app.network.operate(options).then(
    (result)=>{
      if(options.blocking!==false)app.actions.noticeBlocking(false);
      if(typeof(options.success)==="function"){options.success(result)};
    },
    (error)=>{
      app.error(error);
      if(options.blocking!==false)app.actions.noticeBlocking(false);
      if(typeof(options.error)==="function"){error = options.error(error)||error};
      if(error&&options.notice!==false)app.actions.noticeMessage(error, {cTheme: 'alert'});
    }
  ).catch((error)=>{
    app.error(error);
    if(options.blocking!==false)app.actions.noticeBlocking(false);
    if(options.notice!==false)app.actions.noticeMessage(error, {cTheme: 'alert'});
  });  
}

/*!
 * reduxer for request
 * @function reduxerRequestFetch
 */
function reduxerRequestFetch( state = {uuid: null, resource: null, fetchResult:{}}, action ) {
  switch (action.type) {
  case RequestFetchFetching:
    return Object.assign({}, state, {
      uuid: action.uuid,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {
          fetching: true,
        }),
      }),
    });
  case RequestFetchInvalid:
    return Object.assign({}, state, {
      uuid: action.uuid,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {
          invalid: true,
        }),
      }),
    });
  case RequestFetchFetchSuccess:
    let data = (state.fetchResult[action.uuid]&&state.fetchResult[action.uuid].result)||action.initData;
    if(action.append&&action.appendField&&data){
      if(Array.isArray(data)){
        data = Array.concat(data,action.result);
      }else{
        let fileds = Array.isArray(action.appendField)?action.appendField:(typeof(action.appendField)==='string'?[action.appendField]:['data']);
        for(let field of fileds){
          action.result[field] = Array.concat(data[field]||[],action.result[field]||[]);
        }
        data = Object.assign({},data,action.result);
      }
    }else{
      data = action.result;
    }

    return Object.assign({}, state, {
      uuid: action.uuid,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {
          invalid: false,
          fetching: false,
          result: data,
        }),
      }),
    });
  case RequestFetchFetchFail:
    return Object.assign({}, state, {
      uuid: action.uuid,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {
          fetching: false,
          error: action.error,
        }),
      }),
    });

  default:
    return state;
  }
}

export default {
  name: 'request',
  dependence: 'network',

  init(app) {
    app.actionStates.request = function(options={},uuid=null){
      return ActionState.instance(ActionStateRequest, app, uuid, options);
    }
  },
  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      requestFetch,
      requestFetching,
      requestFetchSuccess,
      requestFetchFail,
      requestFetchInvalid,
      _requestFetchClear,
      requestSubmit
    });

    app.reduxers.request = reduxerRequestFetch;
  },
}
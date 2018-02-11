/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import { ActionState } from '../app/container';
import getOptions from '../utils/getOptions';
import getUuid from '../utils/uuid';


// action state 
// -----------------------------
/**
 * 网络请求管理器的构造参数
 * @class ActionStateRequestOptions
 * @property {object|array} [defaultData={}] - 默认数据 
 * @property {object|array} [initData={}] - 初始化数据 
 * @property {} append
 * @property {} appendField
 * @property {boolean} [updateOnStart=falae] - 是否在container 启动时更新数据
 * @property {boolean} [updateOnResume=falae] - 是否在container 获取焦点时更新数据
 * @property {boolean} [clearOnStop=true] - 是否在container 停止时，清除数据管理器
 * @property {boolean} [trackState=falae] - 是否显示
 * @property {boolean} [blocking=] - 获取中时显示阻塞式还是非阻塞式的加载中指示
 * @property {boolean} [notice=true] - 出错时是否显示错误信息 
 * @property {string} [noticeTheme='alert'] - 错误提示的主题
 */
/**
 * 当获取请求数据时触发
 * @callback onWillUpdate
 * @param {ActionStateRequestOptions} options - 本次请求的配置信息
 * @return {boolean} - 返回false 终止本次请求
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
 * @callback onSuccess
 */
/**
 * @callback onError
 */
/**
 * @callback onUploadProgress
 */
/**
 * @callback onDownloadProgress
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
   * @param {ActionStateRequestOptions|NetworkOptions} options - 请求参数与网络请求底层API参数
   */
  constructor(app, uuid, options){
    super(app, uuid);
    
    /**
     * @property {ActionStateRequestOptions|NetworkOptions} options - 请求的参数
     */
    this.options = options;
    this.options.defaultData = this.options.defaultData||{};
    this.options.initData = this.options.initData || this.options.defaultData;
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
   * @param {ActionStateRequestOptions|NetworkOptions} [options] - 本次请求的参数，为空使用创建时的参数
   * @param {boolean} [append=false] - 是否是追加数据还是替换之前数据 
   */
  update(aoptions={},append=null){
    let options = Object.assign( {},
      getOptions(this.options),
      getOptions(aoptions),
      (append===true||append===false)?{append}:{},
    )
    if(this.options.onWillUpdate && this.options.onWillUpdate(options)===false) return;
    this.app.actions.request(options, true, this.uuid);
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
    ActionStateRequest.deleteInstance[this.uuid];
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

  /**
   * 请求进度条处理函数
   * @method
   * @param {boolean} show - 是否显示 
   * @param {Error|string} error - 异常信息
   * @param {App} app - App 实例
   * @param {ActionStateRequestOptions|NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是否是获取型
   */
  static _handleRequesting(show, app, options, isFetch) {
    if(isFetch){
      if(options.blocking){
        app.actions.noticeBlocking(show);
      }else{
        app.actions.noticeLoading(show);
      }
    }else{
      if(options.blocking!==false){
        app.actions.noticeBlocking(show);
      }
    }
  }

  /**
   * 请求异常显示处理函数
   * @method
   * @param {Error|string} error - 异常信息
   * @param {App} app - App 实例
   * @param {ActionStateRequestOptions|NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是否是获取型
   */
  static _handleError(error, app, options, isFetch) {
    if(error&&options.notice!==false) app.actions.noticeMessage(error, {cTheme: options.noticeTheme||'alert'});
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
 * 发起请求
 * @method app.actions.request
 * @param {ActionStateRequestOptions|NetworkOptions} options - 网络请求及network 网络请求api的参数
 * @param {boolean} isFetch - 是否是为请求型还是提交型
 * @param {string} uuid - 请求的uuid 
 */
let request = (options={}, isFetch=false, uuid=getUuid())=>app=>{
  isFetch&&app.actions._requestFetching(uuid, options, isFetch);
  ActionStateRequest._handleRequesting(true, app, options, isFetch);

  app.network.fetch&&app.network.fetch(options, isFetch).then( result=>{
    ActionStateRequest._handleRequesting(false, app, options, isFetch);
    if(options.onSuccess&&options.onSuccess(result)) return;

    let request = isFetch&&ActionStateRequest.getInstance(ActionStateRequest, uuid);
    let ret = request&&request.trigger('onWillChange', result); 
    if(ret)result = ret;
    if(request && ret===false) return;

    isFetch&&app.actions._requestFetchSuccess(result, uuid, options, isFetch);

    request&&request.trigger('onDidChange', result);
  }, error=>{
    ActionStateRequest._handleRequesting(false, app, options, isFetch);
    if(options.onError&&options.onError(error)) return;

    isFetch&&app.actions._requestFetchFail(error, uuid, options, isFetch);
    let request = isFetch&&ActionStateRequest.getInstance(ActionStateRequest, uuid);
    request&&request.trigger('onChangeError', error);
    ActionStateRequest._handleError(error, app, options, isFetch);
  }).catch(error=>{
    ActionStateRequest._handleRequesting(false, app, options, isFetch);
    ActionStateRequest._handleError(error, app, options, isFetch);
  });    
}

/**
 * 更新指定uuid 的请求状态为请求中
 * @method
 * @param {stirng} uuid - 唯一id
 * @param {ActionStateRequestOptions|NetworkOptions} options - 网络请求及network 网络请求api的参数
 * @param {boolean} isFetch - 是否是为请求型还是提交型
 */
let _requestFetching = (uuid, options, isFetch)=>{
  return {
    type: RequestFetchFetching,
    uuid,
  };
}

/**
 * 更新指定uuid 的请求的状态与数据
 * @method
 * @param {stirng} uuid - 唯一id
 * @param {ActionStateRequestOptions|NetworkOptions} options - 网络请求及network 网络请求api的参数
 * @param {boolean} isFetch - 是否是为请求型还是提交型
 */
let _requestFetchSuccess = (result, uuid, options, isFetch)=>{
  return {
    type: RequestFetchFetchSuccess,
    uuid,
    result,
    options,
  };
}

/**
 * 更新指定uuid 的请求错误状态
 * @method
 * @param {Error|string} error - 异常信息
 * @param {stirng} uuid - 唯一id
 * @param {ActionStateRequestOptions|NetworkOptions} options - 网络请求及network 网络请求api的参数
 * @param {boolean} isFetch - 是否是为请求型还是提交型
 */
let _requestFetchFail = (error, uuid, options, isFetch)=>{
  return {
    type: RequestFetchFetchFail,
    uuid,
    error,
  };
}

/**
 * 删除指定uuid 的请求数据
 * @method
 * @param {stirng} uuid - 唯一id
 * @param {ActionStateRequestOptions|NetworkOptions} options - 网络请求及network 网络请求api的参数
 * @param {boolean} isFetch - 是否是为请求型还是提交型
 */
let _requestFetchClear = (uuid, options, isFetch)=>(app)=>{
  let state = app.getState('request',{});
  delete state.fetchResult[uuid];
}

/*!
 * reduxer for request
 * @function reduxerRequestFetch
 */
function reduxerRequestFetch( state = {fetchResult:{}}, action ) {
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
  case RequestFetchFetchSuccess:
    let data = (state.fetchResult[action.uuid]&&state.fetchResult[action.uuid].result)||action.options.initData;
    if(action.options.append&&action.options.appendField&&data){
      if(Array.isArray(data)){
        data = Array.concat(data,action.result);
      }else{
        let fileds = Array.isArray(action.options.appendField)?action.options.appendField:(typeof(action.options.appendField)==='string'?[action.options.appendField]:['data']);
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
    /**
     * @method app.actionsStates.request
     * @param {ActionStateRequestOptions|NetworkOptions|function} [options] - 本次请求的参数
     * @param {string} [uuid] - 本次请求的uuid，为空使用随机id，如果该uuid已经存在，则返回该uuid 对象，无需创建
     */
    app.actionStates.request = function(options={},uuid=null){
      return ActionState.instance(ActionStateRequest, app, uuid, options);
    }
  },
  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      request,
      _requestFetching,
      _requestFetchSuccess,
      _requestFetchFail,
      _requestFetchClear,
    });

    app.reduxers.request = reduxerRequestFetch;
  },
}
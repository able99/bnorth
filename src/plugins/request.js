/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import getUuid from '../utils/uuid';
import getOptions from '../utils/getOptions';

// actions 
//==================
const RequestFetchFetching = 'RequestFetchFetching';
const RequestFetchInvalid = 'RequestFetchInvalid';
const RequestFetchFetchSuccess = 'RequestFetchFetchSuccess';
const RequestFetchFetchFail = 'RequestFetchFetchFail';
let requestFetch = (request, options)=>app=>{
  if(!app.network){ request.onChangeError('no network plugin'); return; }

  app.actions.requestFetching(request.uuid);
  request.onFetching(true, options.blocking);

  app.network.fetch(options).then(
    (result)=>{
      request.onFetching(false, options.blocking);
      let ret = request.onWillChange(result); 
      if(ret)result = ret;
      if(ret===false) return;
      app.actions.requestFetchSuccess(request.uuid,result,options.initData,options.append,options.appendField);
      request.onDidChange(result);
    },
    (error)=>{
      request.onFetching(false, options.blocking);
      app.actions.requestFetchFail(request.uuid,error);
      request.onChangeError(error); 
    }
  ).catch((error)=>{
    request.onFetching(false, options.blocking);
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


// action state class
//==================
/**
 * 为app 扩展state 类型，提供网络请求与网络请求数据的管理
 * **插件** 该类为插件类扩展了App 的能力
 * app.actionStates.request: states 的工厂函数
 * @class
 * @example
 * **使用**
 * // container
 * container.states.data = app.actionStates.data({});
 * container.states.xxx = app.actionStates.request({
 *   resource: 'xxx',
 * });
 * // page - 使用数据
 * this.props.state_xxx
 */
class ActionStateRequest {
  static maps = {};

  constructor(app, uuid, options){
    this.app = app;
    this.uuid = uuid;
    this.options = options;
    this.options.defaultData = this.options.defaultData||{};
    this.options.initData = this.options.initData || this.options.defaultData;
    this.options.trackState = Boolean(this.options.trackState);
    this.options.noticeChangeError = this.options.noticeChangeError !== false;

    ActionStateRequest.maps[uuid] = this;
  }

  // interface
  // -------------------------
  get data() {
    let state = this.app.getState('request',{});
    return (state.fetchResult && state.fetchResult[this.uuid] && state.fetchResult[this.uuid].result)||this.options.initData;
  }
  get state() { //bnorth use
    return this.data;
  }
  get states() { //bnorth use
    return {
      state: this._getState(),
    };
  }
 
  update(aoptions={},append=null){
    let options = Object.assign( {},
      getOptions(this.options),
      getOptions(aoptions),
      (append===true||append===false)?{append}:{},
    )
    if(this.options.onWillUpdate && this.options.onWillUpdate(options)===false) return;
    this.app.actions.requestFetch(this, options);
  }

  set(data) {
    app.actions.requestFetchSuccess(this.uuid,data||{},this.options.initData,this.options.append,this.options.appendField);
  }

  clear(){
    this.app.actions._requestFetchClear(this.uuid);
    delete ActionStateRequest.maps[this.uuid];
  }

  // state
  _getState() {
    let state = this.app.getState('request',{});
    return (state.fetchResult && state.fetchResult[this.uuid])||{};
  }
  getReady(){
    let state = this._getState();
    return state.fetching === false && !state.invalid;
  }
  getError(){
    let state = this._getState();
    return state.error;
  }

  // event
  //----------------------------------
  onStart() { //bnorth use
    if(!this.options.updateOnStart) return;
    this.update();
  }

  onResume() { //bnorth use
    if(!this.options.updateOnResume) return;
    this.update();
  }

  onStop() { //bnorth use
    if(this.options.clearOnStop===false) return;
    this.clear();
  }

  onFetching(show=true, blocking=false) {
    if(blocking){
      this.app.actions.noticeBlocking(show);
    }else{
      this.app.actions.noticeLoading(show);
    }
  }

  onWillChange(result) { 
    return this.options.onWillChange&&this.options.onWillChange(result);
  }

  onDidChange(result) { 
    return this.options.onDidChange&&this.options.onDidChange(result);
  }

  onChangeError(error, result){
    this.app.error(error);
    if(this.options.onChangeError&&this.options.onChangeError(error, result));
    this.app.actions.noticeMessage(error, {cTheme: 'alert'});
  }
}


// reducer 
//==================
export function reducerRequestFetch( state = {
  uuid: null,
  resource: null,
  fetchResult:{},
}, action) {
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


// export
//==================
export default {
  name: 'request',
  dependence: 'network',

  init(app) {
    app.actionStates.request = function(options={},uuid=null){
      if(typeof(options)==='string') uuid=options;
      uuid = uuid||getUuid();
      if(uuid&&ActionStateRequest.maps[uuid]) return ActionStateRequest.maps[uuid];
      return new ActionStateRequest(app, uuid, getOptions(options));
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

    app.reducers.request = reducerRequestFetch;
  },
}
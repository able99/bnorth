import { bindActionCreators } from 'redux';
import { Apis,Actions,Utils,ActionStore } from '../';

//===================================
// fetch
const HttpifFetchFetching = 'HttpifFetchFetching';
const HttpifFetchInvalid = 'HttpifFetchInvalid';
const HttpifFetchFetchSuccess = 'HttpifFetchFetchSuccess';
const HttpifFetchFetchFail = 'HttpifFetchFetchFail';
function actionHttpifFetch(uuid,options){
  return (dispatch)=>{
    options.blocking?Actions.actionNoticeBlock():Actions.actionNoticeLoading();
    dispatch(actionHttpifFetching(uuid));

    Apis.Netif.fetch(options)
    .then(
      (result)=>{
        options.blocking?Actions.actionNoticeBlockFinish():Actions.actionNoticeLoadingFinish();
        dispatch(actionHttpifFetchSuccess(uuid,result,options.append,options.appendField));
        if(options.success && typeof(options.success)==="function"){options.success(result)};
      },
      (error)=>{
        Apis.Log.err(error);
        options.blocking?Actions.actionNoticeBlockFinish():Actions.actionNoticeLoadingFinish();
        dispatch(actionHttpifFetchFail(uuid,error));
        if(error && options.error && typeof(options.error)==="function"){error = options.error(error)||error};
        if(error)Actions.actionNoticeMessage(error,'alert');
      }
    )
    .catch((error)=>{
      Apis.Log.err(error);
      if(error)Actions.actionNoticeMessage(error);
    });    
  }
}
function actionHttpifFetching(uuid){
  return {
    type: HttpifFetchFetching,
    uuid,
  };
}
function actionHttpifFetchInvalid(uuid){
  return {
    type: HttpifFetchInvalid,
    uuid,
  };
}
function actionHttpifFetchSuccess(uuid,result,append,appendField){
  return {
    type: HttpifFetchFetchSuccess,
    uuid,
    result,
    append,
    appendField,
  };
}
function actionHttpifFetchFail(uuid,error){
  return {
    type: HttpifFetchFetchFail,
    uuid,
    error,
  };
}

let actionsHttpifFetchObj = null;
export function actionsHttpifFetch(){
  if(actionsHttpifFetchObj)return actionsHttpifFetchObj;

  actionsHttpifFetchObj = bindActionCreators({
    actionHttpifFetch,
    actionHttpifFetchInvalid,
  },ActionStore.dispatch);
  return actionsHttpifFetchObj;
}

let actionsHttpifFetchWrapMap = {};
export function actionsHttpifFetchWrap(options={},uuid=null){
  uuid = (typeof(options)==='string')?options:uuid;
  uuid = uuid?uuid:Utils.Util.uuid();
  options = (typeof(options)==='string')?{}:options;
  if(actionsHttpifFetchWrapMap[uuid]) return actionsHttpifFetchWrapMap[uuid];

  let wrap = {
    clear(clearWrap=true){
      let reduxer = ActionStore.getState().ReduxerHttpifFetch;
      delete reduxer.fetchResult[uuid];
      if(clearWrap)delete actionsHttpifFetchWrapMap[uuid];
    },
    data(defaultValue={}){
      let reduxer = ActionStore.getState().ReduxerHttpifFetch;
      return (reduxer && reduxer.fetchResult && reduxer.fetchResult[uuid] && reduxer.fetchResult[uuid].result) || defaultValue;
    },
    update(options={},append=null){
      let wrap = actionsHttpifFetchWrapMap[uuid];
      actionsHttpifFetch().actionHttpifFetch(
        uuid, 
        Object.assign(
          {},
          typeof(wrap.options)==='function'?wrap.options():(wrap.options||{}),
          typeof(options)==='function'?options():options,
          {append: (append===true||append===false)?append:options.append,}
        )
      );
    },
  };

  wrap = Object.assign(wrap, options);
  wrap.uuid = uuid;
  wrap.initData = wrap.initData||{};
  wrap.clearOnStop = wrap.clearOnStop===undefined?true:wrap.clearOnStop;

  if(options.traceState){
    wrap.state=function(){
      let reduxer = ActionStore.getState().ReduxerHttpifFetch;
      return (reduxer && reduxer.fetchResult && reduxer.fetchResult[uuid]) || {};
    };
    wrap.ready=function(){
      let reduxer = ActionStore.getState().ReduxerHttpifFetch;
      let state = (reduxer && reduxer.fetchResult && reduxer.fetchResult[uuid]) || {};
      return state.fetching === false && !state.invalid;
    };
    wrap.error=function(){
      let reduxer = ActionStore.getState().ReduxerHttpifFetch;
      let state = (reduxer && reduxer.fetchResult && reduxer.fetchResult[uuid]) || {};
      return state.error;
    };
  }
  
  actionsHttpifFetchWrapMap[uuid] = wrap;
  return wrap;
}

let StateHttpifFetch = {
  uuid: null,
  resource: null,
  fetchResult:{},
};
export function ReduxerHttpifFetch(state = StateHttpifFetch, action) {
  switch (action.type) {
  case HttpifFetchFetching:
    return Object.assign({}, state, {
      uuid: action.uuid,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {
          fetching: true,
        }),
      }),
    });
  case HttpifFetchInvalid:
    return Object.assign({}, state, {
      uuid: action.uuid,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {
          invalid: true,
        }),
      }),
    });
  case HttpifFetchFetchSuccess:
    let data = state.fetchResult[action.uuid]&&state.fetchResult[action.uuid].result;
    if(action.append && data){
      if(Array.isArray(data)){
        data = Array.concat(data,action.result);
      }else{
        for(let field of action.appendField){
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
  case HttpifFetchFetchFail:
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



//===================================
// operaion
function actionOperateSubmit(options){
  return (dispatch)=>{
    if(options.blocking!==false)Actions.actionNoticeBlock();
    
    Apis.Netif.operate(options)
    .then(
      (result)=>{
        if(options.blocking!==false)Actions.actionNoticeBlockFinish();
        if(options.success && typeof(options.success)==="function"){options.success(result)};
      },
      (error)=>{
        if(options.blocking!==false)Actions.actionNoticeBlockFinish();
        if(error && options.error && typeof(options.error)==="function"){error = options.error(error)||error};
        if(error)Actions.actionNoticeMessage(error,'alert');
      }
    )
    .catch((error)=>{
      Actions.actionNoticeMessage(error);
    });  
  }
}

let actionsHttpifOperateObj = null;
export function actionsHttpifOperate(){
  if(actionsHttpifOperateObj)return actionsHttpifOperateObj;

  actionsHttpifOperateObj = bindActionCreators({actionOperateSubmit},ActionStore.dispatch);
  return actionsHttpifOperateObj;
}

import { bindActionCreators } from 'redux';

import Netif from '../apis/netif';
import Util from '../utils/util';
import { actionsNotice } from './notice';


//===================================
// fetch
const HttpifFetchFetching = 'HttpifFetchFetching';
const HttpifFetchInvalid = 'HttpifFetchInvalid';
const HttpifFetchFetchSuccess = 'HttpifFetchFetchSuccess';
const HttpifFetchFetchFail = 'HttpifFetchFetchFail';
function actionHttpifFetch(uuid,resource,cb=null,data={},header={}){
  return (dispatch)=>{
    actionsNotice().actionNoticeLoading();
    dispatch(actionHttpifFetching(uuid,resource));

    Netif.fetch(resource,data,header,null,(result)=>{
      actionsNotice().actionNoticeLoadingFinish();
      dispatch(actionHttpifFetchSuccess(uuid,resource,result));
      if(typeof(cb)==="function"){try{cb(result)}catch(e){actionsNotice().actionNoticeMessage(e)}};
    },(error)=>{
      actionsNotice().actionNoticeLoadingFinish();
      actionsNotice().actionNoticeMessage(error);
      dispatch(actionHttpifFetchFail(uuid,resource,error));
      if(typeof(cb)==="function"){try{cb({},error)}catch(e){actionsNotice().actionNoticeMessage(e)}};
    });
  }
}
function actionHttpifFetching(uuid,resource,data){
  return {
    type: HttpifFetchFetching,
    uuid,
    resource,
    data,
  };
}
function actionHttpifFetchInvalid(uuid,resource,data){
  return {
    type: HttpifFetchInvalid,
    uuid,
    resource,
    data,
  };
}
function actionHttpifFetchSuccess(uuid,resource,result,data){
  return {
    type: HttpifFetchFetchSuccess,
    uuid,
    resource,
    result,
    data,
  };
}
function actionHttpifFetchFail(uuid,resource,error,data){
  return {
    type: HttpifFetchFetchFail,
    uuid,
    resource,
    error,
    data,
  };
}

let actionsHttpifFetchObj = null;
export function actionsHttpifFetch(){
  if(actionsHttpifFetchObj)return actionsHttpifFetchObj;

  actionsHttpifFetchObj = bindActionCreators({
    actionHttpifFetch,
    actionHttpifFetchInvalid,
  },window.store.dispatch);
  return actionsHttpifFetchObj;
}

let actionsHttpifFetchWrapMap = {};
export function actionsHttpifFetchWrap(uuid=null,resource="/",data={},header={}){
  uuid = uuid?uuid:Util.uuid();
  if(actionsHttpifFetchWrapMap[uuid])return actionsHttpifFetchWrapMap[uuid];

  let wrap = {
    uuid,
    state(defaultValue={}){
      let reduxer = window.store.getState().ReduxerHttpifFetch;
      return reduxer.uuid===uuid&&reduxer.resource===resource?{
        [uuid]: (reduxer.fetchResult[uuid+resource]?reduxer.fetchResult[uuid+resource].result:defaultValue),
      }:{
      }; 
    },
    update(cb,adata=null,aheader=null){
      data=adata||data;
      header=aheader||header;
      actionsHttpifFetch().actionHttpifFetch(uuid, resource, cb, data, header);
    },
    data(defaultValue={}){
      let reduxer = window.store.getState().ReduxerHttpifFetch;
      return (reduxer && reduxer.fetchResult && reduxer.fetchResult[uuid+resource] && reduxer.fetchResult[uuid+resource].result) || defaultValue;
    },
    clear(){
      let reduxer = window.store.getState().ReduxerHttpifFetch;
      reduxer.fetchResult[uuid+resource] = null;
      delete actionsHttpifFetchWrapMap[uuid];
    },
  };

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
      resource: action.resource,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid+action.resource]:Object.assign({}, state.fetchResult[action.uuid+action.resource], {
          fetching: true,
        }),
      }),
    });
  case HttpifFetchInvalid:
    return Object.assign({}, state, {
      uuid: action.uuid,
      resource: action.resource,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid+action.resource]:Object.assign({}, state.fetchResult[action.uuid+action.resource], {
          invalid: true,
        }),
      }),
    });
  case HttpifFetchFetchSuccess:
    return Object.assign({}, state, {
      uuid: action.uuid,
      resource: action.resource,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid+action.resource]:Object.assign({}, state.fetchResult[action.uuid+action.resource], {
          invalid: false,
          fetching: false,
          result: action.result,
        }),
      }),
    });
  case HttpifFetchFetchFail:
    return Object.assign({}, state, {
      uuid: action.uuid,
      resource: action.resource,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid+action.resource]:Object.assign({}, state.fetchResult[action.uuid+action.resource], {
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

function actionOperationSubmit(cb,resource,data={},method="post",header={},block=true,notice=true){
  return (dispatch)=>{
    if(block)actionsNotice().actionNoticeBlock();
    
    Netif.operation(resource,data,header,method,(result)=>{
      if(block)actionsNotice().actionNoticeBlockFinish();
      if(typeof(cb)==="function"){try{cb(result)}catch(e){actionsNotice().actionNoticeMessage(e)}};
    },(error)=>{
      actionsNotice().actionNoticeBlockFinish();
      actionsNotice().actionNoticeMessage(error);
      if(typeof(cb)==="function"){try{cb({},error)}catch(e){actionsNotice().actionNoticeMessage(e)}};
    });
  }
}

let actionsHttpifOperationObj = null;
export function actionsHttpifOperation(){
  if(actionsHttpifOperationObj)return actionsHttpifOperationObj;

  actionsHttpifOperationObj = bindActionCreators({actionOperationSubmit},window.store.dispatch);
  return actionsHttpifOperationObj;
}

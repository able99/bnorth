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
function actionHttpifFetch(uuid,options){
  return (dispatch)=>{
    actionsNotice().actionNoticeLoading();
    dispatch(actionHttpifFetching(uuid));

    Netif.fetch(options)
    .then((result)=>{
      actionsNotice().actionNoticeLoadingFinish();
      dispatch(actionHttpifFetchSuccess(uuid,result));
      if(options.success && typeof(options.success)==="function"){options.success(result)};
    })
    .catch((error)=>{
      actionsNotice().actionNoticeLoadingFinish();
      actionsNotice().actionNoticeMessage(error);
      dispatch(actionHttpifFetchFail(uuid,error));
      if(options.error && typeof(options.error)==="function"){options.error(error)};
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
function actionHttpifFetchSuccess(uuid,result){
  return {
    type: HttpifFetchFetchSuccess,
    uuid,
    result,
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
  },window.store.dispatch);
  return actionsHttpifFetchObj;
}

let actionsHttpifFetchWrapMap = {};
export function actionsHttpifFetchWrap(uuid=null,options={}){
  uuid = uuid?uuid:Util.uuid();
  if(actionsHttpifFetchWrapMap[uuid])return actionsHttpifFetchWrapMap[uuid];

  let wrap = {
    uuid,
    clear(){
      let reduxer = window.store.getState().ReduxerHttpifFetch;
      delete reduxer.fetchResult[uuid];
      delete actionsHttpifFetchWrapMap[uuid];
    },
    state(){
      let reduxer = window.store.getState().ReduxerHttpifFetch;
      return { [uuid]: reduxer.fetchResult[uuid]||{}, };
    },
    data(defaultValue={}){
      let reduxer = window.store.getState().ReduxerHttpifFetch;
      return (reduxer && reduxer.fetchResult && reduxer.fetchResult[uuid] && reduxer.fetchResult[uuid].result) || defaultValue;
    },
    update(aoptions={}){
      actionsHttpifFetch().actionHttpifFetch(uuid, Object.assign({},options.aoptions));
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
    return Object.assign({}, state, {
      uuid: action.uuid,
      fetchResult: Object.assign({}, state.fetchResult, {
        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {
          invalid: false,
          fetching: false,
          result: action.result,
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
    actionsNotice().actionNoticeBlock();
    
    Netif.operate(options)
    .then((result)=>{
      actionsNotice().actionNoticeBlockFinish();
      if(options.success && typeof(options.success)==="function"){options.success(result)};
    })
    .catch((error)=>{
      actionsNotice().actionNoticeBlockFinish();
      actionsNotice().actionNoticeMessage(error);
      if(options.error && typeof(options.error)==="function"){options.error(error)};
    });  
  }
}

let actionsHttpifOperateObj = null;
export function actionsHttpifOperate(){
  if(actionsHttpifOperateObj)return actionsHttpifOperateObj;

  actionsHttpifOperateObj = bindActionCreators({actionOperateSubmit},window.store.dispatch);
  return actionsHttpifOperateObj;
}

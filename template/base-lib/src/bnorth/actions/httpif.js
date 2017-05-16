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
    Actions.actionNoticeLoading();
    dispatch(actionHttpifFetching(uuid));

    Apis.Netif.fetch(options)
    .then(
      (result)=>{
        Actions.actionNoticeLoadingFinish();
        dispatch(actionHttpifFetchSuccess(uuid,result,options.append));
        if(options.success && typeof(options.success)==="function"){options.success(result)};
      },
      (error)=>{
        Actions.actionNoticeLoadingFinish();
        if(error)Actions.actionNoticeMessage(error);
        dispatch(actionHttpifFetchFail(uuid,error));
        if(error && options.error && typeof(options.error)==="function"){options.error(error)};
      }
    )
    .catch((error)=>{
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
function actionHttpifFetchSuccess(uuid,result,append){
  return {
    type: HttpifFetchFetchSuccess,
    uuid,
    result,
    append,
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
export function actionsHttpifFetchWrap(uuid=null,options={}){
  uuid = uuid?uuid:Utils.Util.uuid();
  if(actionsHttpifFetchWrapMap[uuid])return actionsHttpifFetchWrapMap[uuid];

  let wrap = {
    clear(){
      let reduxer = ActionStore.getState().ReduxerHttpifFetch;
      delete reduxer.fetchResult[uuid];
      delete actionsHttpifFetchWrapMap[uuid];
    },
    data(defaultValue={}){
      let reduxer = ActionStore.getState().ReduxerHttpifFetch;
      return (reduxer && reduxer.fetchResult && reduxer.fetchResult[uuid] && reduxer.fetchResult[uuid].result) || defaultValue;
    },
    update(options={}){
      actionsHttpifFetch().actionHttpifFetch(uuid, Object.assign({},this.options,options));
    },
  };

  wrap.uuid = uuid;
  wrap = Object.assign(wrap,wrap,options);
  wrap.initData = wrap.initData||{};
  wrap.clearOnStop = wrap.clearOnStop===undefined?true:wrap.clearOnStop;
  
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
    let data = action.append
    ?((state.fetchResult[action.uuid]&&state.fetchResult[action.uuid].result)||[]).concat(action.result)
    :action.result;
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
    Actions.actionNoticeBlock();
    
    Apis.Netif.operate(options)
    .then(
      (result)=>{
        Actions.actionNoticeBlockFinish();
        if(options.success && typeof(options.success)==="function"){options.success(result)};
      },
      (error)=>{
        Actions.actionNoticeBlockFinish();
        if(error)Actions.actionNoticeMessage(error);
        if(error && options.error && typeof(options.error)==="function"){options.error(error)};
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

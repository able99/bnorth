import { bindActionCreators } from 'redux';

import { Utils,ActionStore } from '../';

const DataInit = 'DataInit';
const DataUpdate = 'DataUpdate';
function actionDataInit(uuid,data){
  return {
    type: DataInit,
    uuid,
    data,
  };
}
function actionDataUpdate(uuid,data){
  return {
    type: DataUpdate,
    uuid,
    data,
  };
}



let actionsDataObj = null;
export function actionsData(){
  if(actionsDataObj)return actionsDataObj;

  actionsDataObj = bindActionCreators({actionDataInit,actionDataUpdate},ActionStore.dispatch);
  return actionsDataObj;
}

let actionsWrapDataMap = {};
export function actionsDataWrap(uuid=null, options={}){
  uuid = uuid?uuid:Utils.Util.uuid();
  if(actionsWrapDataMap[uuid])return actionsWrapDataMap[uuid];
  
  let wrap = {
    clear: ()=>{
      let reduxer = ActionStore.getState().ReduxerData;
      delete reduxer.datas[uuid];
      delete actionsWrapDataMap[uuid]; 
    },
    data: ()=>{
      let reduxer = ActionStore.getState().ReduxerData;
      return (reduxer && reduxer.datas && reduxer.datas[uuid]) || {};
    },

    init: (data)=>{
      actionsData().actionDataInit(uuid, data);
    },
    update: (data)=>{
      if(options.onChange){
        data = options.onChange(data);
      }
      actionsData().actionDataUpdate(uuid, data);
    },
  }

  wrap.uuid = uuid;
  wrap = Object.assign(wrap,wrap,options);
  wrap.initData = wrap.initData || {};
  //actionsData().actionDataInit(uuid, wrap.initData);
  wrap.clearOnStop = wrap.clearOnStop===undefined?true:wrap.clearOnStop;
  ActionStore.getState().ReduxerData.datas[uuid] = wrap.initData;

  actionsWrapDataMap[uuid] = wrap;
  return wrap;
}


let StateData = {
  uuid: null,
  datas:{},
};
export function ReduxerData(state = StateData, action) {
  switch (action.type) {
  case DataInit:
    return Object.assign({}, state, {
      uuid: action.uuid,
      datas: Object.assign({}, state.datas, {
        [action.uuid]: action.data,
      }),
    });

  case DataUpdate:
    let data = null;
    if(Array.isArray(action.data)){
      data = Array.from(state.datas[action.uuid]);
      data = data.concat(action.data);
    }else{
      data = Object.assign({}, state.datas[action.uuid], action.data);
    }
    return Object.assign({}, state, {
      uuid: action.uuid,
      datas: Object.assign({}, state.datas, {
        [action.uuid]:data,
      }),
    });

  default:
    return state;
  }
}
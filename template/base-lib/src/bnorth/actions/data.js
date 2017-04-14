import { bindActionCreators } from 'redux';
import Util from '../utils/util';


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

  actionsDataObj = bindActionCreators({actionDataInit,actionDataUpdate},window.store.dispatch);
  return actionsDataObj;
}

let actionsWrapDataMap = {};
export function actionsDataWrap(uuid=null, initData=null, onChange=null){
  uuid = uuid?uuid:Util.uuid();
  if(actionsWrapDataMap[uuid])return actionsWrapDataMap[uuid];

  let wrap = {
    uuid,
    clear: ()=>{
      let reduxer = window.store.getState().ReduxerData;
      reduxer.datas = null;
      actionsWrapDataMap[uuid] = null; 
    },

    state: ()=>{
      let reduxer = window.store.getState().ReduxerData;
      return reduxer.uuid===uuid?{
        ["data-"+uuid]: reduxer.datas[uuid]||{},
      }:{}; 
    },
    data: ()=>{
      let reduxer = window.store.getState().ReduxerData;
      return (reduxer && reduxer.datas && reduxer.datas[uuid]) || {};
    },

    init: (data)=>{
      actionsData().actionDataInit(uuid, data);
    },
    update: (data)=>{
      if(onChange){
        data = onChange(data);
      }
      actionsData().actionDataUpdate(uuid, data);
    },
    setOnChange: (cb)=>{
      onChange=cb;
    },
  }

  actionsWrapDataMap[uuid] = wrap;
  if(typeof(initData)==="object" && !Array.isArray(initData)) actionsData().actionDataInit(uuid, initData);
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
    return Object.assign({}, state, {
      uuid: action.uuid,
      datas: Object.assign({}, state.datas, {
        [action.uuid]:Object.assign({}, state.datas[action.uuid], action.data),
      }),
    });

  default:
    return state;
  }
}
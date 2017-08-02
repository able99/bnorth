import { bindActionCreators } from 'redux';

import { Utils,ActionStore,Actions } from '../';

const DataInit = 'DataInit';
const DataUpdate = 'DataUpdate';
function actionDataInit(uuid,data){
  return {
    type: DataInit,
    uuid,
    data,
  };
}
function actionDataUpdate(uuid,data,merge){
  return {
    type: DataUpdate,
    uuid,
    data,
    merge,
  };
}



let actionsDataObj = null;
export function actionsData(){
  if(actionsDataObj)return actionsDataObj;

  actionsDataObj = bindActionCreators({actionDataInit,actionDataUpdate},ActionStore.dispatch);
  return actionsDataObj;
}

let actionsWrapDataMap = {};
export function actionsDataWrap(options,uuid){
  uuid = (typeof(options)==='string')?options:uuid;
  uuid = uuid?uuid:Utils.Util.uuid();
  options = (typeof(options)==='string')?{}:options;
  if(actionsWrapDataMap[uuid]) return actionsWrapDataMap[uuid];
  
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

    init: (data, merge=false)=>{
      let wrap = actionsWrapDataMap[uuid];
      let originData = wrap.data();

      actionsData().actionDataInit(uuid, merge?(Object.assign({},wrap.initData,data||{})):data||wrap.initData);
      wrap.onDidChange&&wrap.onDidChange(data||{},originData||{});
    },

    update: (data, merge=true)=>{
      let wrap = actionsWrapDataMap[uuid];

      let originData = wrap.data();
      let res = wrap.checkUpdate(data,originData);

      data = (wrap.onWillChange&&wrap.onWillChange(data||{},originData||{}))||data;
      actionsData().actionDataUpdate(uuid, data||{}, merge);
      wrap.onDidChange&&wrap.onDidChange(data||{},originData||{});

      return res;
    },

    check: (keys=null)=>{
      let wrap = actionsWrapDataMap[uuid];
      if(wrap&&wrap.rules){
        let rules={};
        if(Array.isArray(keys)){
          keys.forEach((v)=>{
            rules[v] = wrap.rules[v];
          });
        }else if(typeof(keys)==='string') {
          rules[keys] = wrap.rules[keys];
        }else{
          rules = wrap.rules;
        }

        return Utils.Format.check(
          rules,
          wrap.data()
        );
      }else{
        return false;
      }
    },

    validate: (...args)=>{
      let wrap = actionsWrapDataMap[uuid];
      return Boolean(wrap.check(...args));
    },

    checkUpdate: (data,originData)=>{
      let wrap = actionsWrapDataMap[uuid];
      if(data&&wrap.rules&&wrap.changeRules){
        for(let key of Object.keys(data)){
          if(wrap.changeRules.indexOf(key)>=0&&wrap.rules[key]){
            let res = Utils.Format.checkItem(key, wrap.rules[key], data, true);
            if(res) {
              if(wrap.changeError) wrap.changeError(res, key, data[key]);
              data[key] = originData[key]||'';
              return res;
            }
          }
        }
      }
      return false;
    },

    changeError: function(message, field, val){
      if(message)Actions.actionNoticeMessage(message);
    },
  }

  Object.assign(wrap, options);
  wrap.uuid = uuid;
  wrap.initData = wrap.initData || {};
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
        [action.uuid]: Array.isArray(action.data)?Array.concat(action.data):action.data,
      }),
    });

  case DataUpdate:
    let data = null;
    if(action.merge){
      if(Array.isArray(action.data)){
        data = Array.from(state.datas[action.uuid]);
        data = data.concat(action.data);
      }else{
        data = Object.assign({}, state.datas[action.uuid], action.data);
      }
    }else{
      data = Array.from(action.data);
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
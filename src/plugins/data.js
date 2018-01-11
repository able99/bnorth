/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import jspath from '../utils/jspath'
import getUuid from '../utils/uuid';
import getOptions from '../utils/getOptions';
import { checkObject, checkObjectItem } from '../utils/validator';


// actions
//==================
const DataInit = 'DataInit';
function _dataInit(uuid,data){
  return {
    type: DataInit,
    uuid,
    data,
  };
}
const DataUpdate = 'DataUpdate';
function _dataUpdate(uuid,data,merge,initData){
  return {
    type: DataUpdate,
    uuid,
    data,
    merge,
    initData,
  };
}
let _dataClear = (uuid)=>(app)=>{
  let state = app.getState('data',{});
  delete state.datas[uuid];
}

// action state class
//==================
/**
 * 为app 扩展state 类型，提供页面数据的管理
 * @class
 * @example
 * **使用**
 * // container
 * container.states.data = app.actionStates.data({});
 * // page - 使用数据
 * this.props.state_data
 * // page - 修改数据
 * this.props.states.data.setValue('x',xxx);
 * **hook**
 * 参见Browser hook说明
 */
class ActionStateData{
  static maps = {};

  constructor(app, uuid, options){
    this.app = app;
    this.uuid = uuid;
    this.options = options;
    this.options.defaultData = this.options.defaultData||{};
    this.options.initData = this.options.initData || this.options.defaultData;

    ActionStateData.maps[uuid] = this;
  }

  // interface
  // -------------------------
  get data() {
    let state = this.app.getState('data',{});
    return (state.datas && state.datas[this.uuid]) || this.options.initData;
  }

  get state() { //bnorth use
    return this.data;
  }
  get states() { //bnorth use
    return null;
  }

  init(data, merge=false) {
    try{
      let originData = this.data;
      data = data||this.options.defaultData;
      let changeData = merge?Object.assign({},this.options.initData,data):data;

      changeData = this.onWillChange(changeData,originData)||changeData||this.options.defaultData;
      this.app.actions._dataInit(this.uuid, changeData);
      this.onDidChange(changeData,originData);
    }catch(e){
      this.app.errorNotice(e);
    }
  }

  update(data, key=null, merge=true) {
    try{
      let originData = this.data;
      let changeData = data||this.options.defaultData;

      changeData = this.onWillChange(changeData,originData,key)||changeData||this.options.defaultData;
      let invalidate = key&&this.checkChangeItem(key, changeData);
      this.app.actions._dataUpdate(this.uuid, invalidate?originData:changeData, merge, this.options.initData);
      if(!invalidate)this.onDidChange(changeData,originData,key);
      return true;
    }catch(e){
      this.app.errorNotice(e);
      return false;
    }
  }

  getValue(key) {
    return jspath.getValue(this.data, key);
  }

  setValue(key, value) {
    if(!key) return false;
    let originData = this.data;
    let changeData = jspath.setValue(Object.assign({}, originData), key, value);

    return this.update(changeData, key);
  }

  clear(onlyData){
    this.app.actions._dataClear(this.uuid);
    delete ActionStateData.maps[this.uuid];
  }

  // validate
  // ----------------------
  validate(keys){
    if(!this.options.rules) return false;

    let rules={};
    if(Array.isArray(keys)){
      keys.forEach((v)=>{
        rules[v] = this.options.rules[v];
      });
    }else if(typeof(keys)==='string') {
      rules[keys] = this.options.rules[keys];
    }else{
      rules = this.options.rules;
    }

    return checkObject(this.data, rules, {checkErrorMessage: this.options.checkErrorMessage});
  }

  checkChangeItem(key, data) {
    if(!key||!this.options.rules||!this.options.checkOnInputKeys||this.options.checkOnInputKeys.indexOf(key)<0) return false;
    let ret = checkObjectItem(data, key, this.options.rules[key], {checkErrorMessage:this.options.checkErrorMessage});

    if(ret){
      if(this.options.noticeChangeError) this.onChangeError(ret, key);
      return ret;
    }else{
      return null;
    }
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

  onWillChange(originData, changeData, key) { 
    return this.options.onWillChange&&this.options.onWillChange(originData, changeData, key);
  }

  onDidChange(originData, changeData, key) { 
    return this.options.onDidChange&&this.options.onDidChange(originData, changeData, key);
  }

  onChangeError(message, field){
    if(this.options.noticeChangeError)this.app.errorNotice(message);
  }
}


// reducer
//==================
export function reducerData(
  state = {
    uuid: null,
    datas: {},
  }, 
  action
) {
  switch (action.type) {
  case DataInit:
    return Object.assign({}, state, {
      uuid: action.uuid,
      datas: Object.assign({}, state.datas, {
        [action.uuid]: Array.isArray(action.data)?Array.from(action.data):action.data,
      }),
    });

  case DataUpdate:
    let data = null;
    if(action.merge){
      if(Array.isArray(action.data)){
        data = Array.from(state.datas[action.uuid]||action.initData);
        data = data.concat(action.data);
      }else{
        data = Object.assign({}, state.datas[action.uuid]||action.initData, action.data);
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


//==================
// export
//==================
export default {
  init(app) {
    app.actionStates.data = function(options,uuid) {
      if(typeof(options)==='string') uuid=options;
      uuid = uuid||getUuid();
      if(ActionStateData.maps[uuid]) return ActionStateData.maps[uuid];
      return new ActionStateData(app, uuid, getOptions(options));
    }
  },

  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      _dataInit,
      _dataUpdate,
      _dataClear,
    });

    app.reducers.data = reducerData;
  },
}
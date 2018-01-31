/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import BaseActionState from '../app/BaseActionState';
import jspath from '../utils/jspath'

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
 * 为app 扩展state 类型，提供页面数据的管理与校验
 * **插件** 该类为插件类扩展了App 的能力
 * app.actionStates.data: states 的工厂函数
 * @class
 * @example
 * **使用**
 * // container
 * container.states.data = app.actionStates.data({});
 * // page - 使用数据
 * this.props.state_data
 * // page - 修改数据
 * this.props.states.data.setValue('x',xxx);
 */
class ActionStateData extends BaseActionState{
  static stateName = 'data';

  /**
   * 构造数据管理state
   * `工厂函数` 该构造函数为工厂模式
   * 使用工厂函数构造state
   * ```js
   * container.states.data = app.actionStates.data({});
   * ```
   * @constructor
   * @param {object} [options] - 参数对象<br />
   * **defaultData**
   * **initData**
   * **rules**
   * **checkErrorMessage**
   * **checkOnInputKeys** 
   * **noticeChangeError**
   * **updateOnStart** 
   * **updateOnResume** 
   * **clearOnStop**
   * **onWillChange**
   * **onDidChange**
   * @param {string} uuid 
   */
  constructor(app, uuid, options){
    super(app, uuid);

    this.options = options;
    this.options.defaultData = this.options.defaultData||{};
    this.options.initData = this.options.initData || this.options.defaultData;
  }

  // interface
  // -------------------------
  /**
   * @property [*] data 管理的数据
   * @readonly
   */
  get data() {
    let state = this.app.getState('data',{});
    return (state.datas && state.datas[this.uuid]) || this.options.initData;
  }

  get state() { //bnorth use
    return this.data;
  }

  /**
   * 初始化所管理的数据
   * @method 
   * @param {*} [data] - 如果设置该参数，则初始化为该数据，否则初始化为起始数据 
   * @param {boolean} [merge=false] - 是否合并之前数据，默认不合并
   */
  init(data, merge=false) {
    try{
      let originData = this.data;
      data = data||this.options.defaultData;
      let changeData = merge?Object.assign({},this.options.initData,data):data;

      changeData = this.trigger('onWillChange', changeData,originData)||changeData||this.options.defaultData;
      this.app.actions._dataInit(this.uuid, changeData);
      this.trigger('onDidChange', changeData,originData);
    }catch(e){
      this.app.errorNotice(e);
    }
  }

  /**
   * 修改管理的数据
   * @method
   * @param {*} data - 数据
   * @param {string[]} [key] - 需要校验的字段名 
   * @param {boolean} [merge=true] 是否合并之前的数据
   */
  update(data, key=null, merge=true) {
    try{
      let originData = this.data;
      let changeData = data||this.options.defaultData;

      changeData = this.trigger('onWillChange', changeData,originData,key)||changeData||this.options.defaultData;
      let invalidate = key&&this.checkChangeItem(key, changeData);
      this.app.actions._dataUpdate(this.uuid, invalidate?originData:changeData, merge, this.options.initData);
      if(!invalidate)this.trigger('onDidChange',changeData,originData,key);
      return true;
    }catch(e){
      this.app.errorNotice(e);
      return false;
    }
  }

  /**
   * 使用jspath 格式获取数据中的内容
   * @method
   * @param {string} key - 键名或jspath 字符串
   */
  getValue(key) {
    return jspath.getValue(this.data, key);
  }

  /**
   * 使用jspath 格式设置数据中的内容
   * @method
   * @param {string} key - 键名或jspath 字符串
   * @param {*} value - 数据
   */
  setValue(key, value) {
    if(!key) return false;
    let originData = this.data;
    let changeData = jspath.setValue(Object.assign({}, originData), key, value);

    return this.update(changeData, key);
  }

  /**
   * 清除数据和当前对象
   * @method
   * @param {boolean} onlyData - 仅仅清除数据
   */
  clear(onlyData){
    this.app.actions._dataClear(this.uuid);
    delete ActionStateData.maps[this.uuid];
  }

  // validate
  // ----------------------

  /**
   * 根据设置的规则进行校验
   * @method
   * @param {string|string[]} [keys] - 要检查的字段名列表，默认检查全部字段
   * @returns {boolean} - true: 校验出问题
   */
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
      if(this.options.noticeChangeError) this.trigger('onChangeError', ret, key);
      return ret;
    }else{
      return null;
    }
  }

  // event
  //----------------------------------
  /*!
   * 页面启动时触发
   * @callback
   */
  onStart() { //bnorth use
    if(!this.options.updateOnStart) return;
    this.update();
  }

  /*!
   * 页面获取焦点时触发
   * @callback
   */
  onResume() { //bnorth use
    if(!this.options.updateOnResume) return;
    this.update();
  }

  /*!
   * 页面终止时触发
   * @callback
   */
  onStop() { //bnorth use
    if(this.options.clearOnStop===false) return;
    this.clear();
  }

  /*!
   * 数据将要改变时触发
   * @callback
   * @param {*} originData 
   * @param {*} changeData 
   * @param {*} key 
   */
  onWillChange(originData, changeData, key) { 
    return this.options.onWillChange&&this.options.onWillChange(originData, changeData, key);
  }

  /*!
   * 数据修改后触发
   * @callback
   * @param {*} originData 
   * @param {*} changeData 
   * @param {*} key 
   */
  onDidChange(originData, changeData, key) { 
    return this.options.onDidChange&&this.options.onDidChange(originData, changeData, key);
  }

  /*!
   * 数据校验错误时触发
   * @callback
   * @param {*} message 
   * @param {*} field 
   */
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
      data = action.data;
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


// export
//==================
export default {
  name: 'data',

  init(app) {
    app.actionStates.data = function(options,uuid) {
      return BaseActionState.instance(ActionStateData, app, uuid, options);
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
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import { ActionState } from '../app/container';
import jspath from '../utils/jspath'
import getOptions from '../utils/getOptions';
import { checkObject, checkObjectItem } from '../utils/validator';


// ActionState
// --------------------------------------
/**
 * data 数据管理器的构造参数
 * @class ActionStateDataOptions
 * @property {object|array} [defaultData={}] - 默认数据 
 * @property {object|array} [initData={}] - 初始化数据 
 * @property {object.<string, Rule>} [rules] - 规则键值对
 * @property {string|string[]} [checkOnInputKeys] - 在update 时需要校验的字段列表
 * @property {object|array} [checkErrorMessage] - 检验错误时的提示信息
 * @property {boolean} [noticeInvalidate=falae] - 是否检验错误时，显示错误信息
 * @property {boolean} [clearOnStop=true] - 是否在container 停止时，清除数据管理器
 */
/** 
 * 数据将要改变时触发
 * @callback onWillChange
 * @param {object|array} originData - 原始数据
 * @param {object|array} changeData - 更厚的数据
 * @param {string|string[]} key - 需要检验的字段 
 * @return {object|array} - 如果返回则替换为返回的数据 
 */
/**
 * 数据修改后触发
 * @callback onDidChange
 * @param {object|array} originData - 原始数据
 * @param {object|array} changeData - 更厚的数据
 * @param {string|string[]} key - 需要检验的字段 
 */

/**
 * 页面数据的管理与校验
 * @class
 */
class ActionStateData extends ActionState{
  static stateName = 'data';

  /**
   * @constructor
   * @param {App} app - App 的单实例
   * @param {string} uuid - 数据管理器的唯一id
   * @param {ActionStateDataOptions} [options] - 参数对象<br />
   */
  constructor(app, uuid, options){
    super(app, uuid);

    /**
     * @property {ActionStateDataOptions} options - 数据管理器配置参数
     */
    this.options = options;
    this.options.defaultData = this.options.defaultData||{};
    this.options.initData = this.options.initData || this.options.defaultData;
  }

  // interface
  // -------------------------
  /**
   * @property {*} data - 管理的数据
   * @readonly
   */
  get data() {
    let state = this.app.getState('data',{});
    return (state.datas && state.datas[this.uuid]) || this.options.initData;
  }

  /*!
   * @property {*} state - return data for container state
   * @override
   */
  get state() { 
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
   * @param {object|array} data - 更新的数据
   * @param {boolean} [merge=true] - 是否合并之前的数据
   * @param {string|string[]|boolean} [key] - 更新时需要校验的字段名, false 标示不校验
   */
  update(data, merge=true, keys) {
    try{
      let originData = this.data;
      let changeData = data||this.options.defaultData;

      changeData = this.trigger('onWillChange', changeData,originData, key)||changeData;
      let validate = keys!==false && this.validate(keys, true);
      if(validate) this.trigger('onInvalidate', ret, key);
      this.app.actions._dataUpdate(this.uuid, invalidate?originData:changeData, merge, this.options.initData);
      if(!invalidate)this.trigger('onDidChange',changeData,originData,key);
      return !validate;
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
   * @param {boolean} [noValidate=false] - 是否不做输入校验
   */
  setValue(key, value, needValidate) {
    if(!key) return false;
    let originData = this.data;
    let changeData = jspath.setValue(Object.assign({}, originData), key, value);

    return this.update(changeData, true, noValidate?false:key);
  }

  /**
   * 清除数据和当前对象
   * @method
   * @param {boolean} onlyData - 仅仅清除数据
   */
  clear(onlyData){
    this.app.actions._dataClear(this.uuid);
    ActionStateData.deleteInstance[this.uuid];
  }

  // validate
  // ----------------------
  /**
   * 根据设置的规则进行校验
   * @method
   * @param {string|string[]} [keys] - 要检查的字段名列表，默认检查全部字段
   * @param {boolean} [input=false] - 是否是输入过程中校验
   * @return {string|boolean} - string: 校验出问题 false: 校验无误
   */
  validate(keys, input){
    if(!this.options.rules || !app.validate || !app.validate.validate) return false;

    let rules={};
    if(input){
      if(!this.options.checkOnInputKeys||this.options.checkOnInputKeys.indexOf(keys)<0) return false;
      rules[keys] = this.options.rules[keys];
    }else{
      if(Array.isArray(keys)){
        keys.forEach((v)=>{
          rules[v] = this.options.rules[v];
        });
      }else if(typeof(keys)==='string') {
        rules[keys] = this.options.rules[keys];
      }else{
        rules = this.options.rules;
      }
    }

    return app.validate.validate(this.data, rules, {message: this.options.checkErrorMessage});
  }

  // event
  //----------------------------------
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
   * @param {object|array} originData - 原始数据
   * @param {object|array} changeData - 更厚的数据
   * @param {string|string[]} key - 需要检验的字段 
   * @return {object|array} - 如果返回则替换为返回的数据 
   */
  onWillChange(originData, changeData, key) { 
    return this.options.onWillChange&&this.options.onWillChange(originData, changeData, key);
  }

  /*!
   * 数据修改后触发
   * @callback
   * @param {object|array} originData - 原始数据
   * @param {object|array} changeData - 更厚的数据
   * @param {string|string[]} key - 需要检验的字段 
   */
  onDidChange(originData, changeData, key) { 
    return this.options.onDidChange&&this.options.onDidChange(originData, changeData, key);
  }

  /*!
   * 数据校验错误时触发
   * @callback
   * @param {Error|string} message - 错误信息
   * @param {string} field - 错误字段名
   */
  onInvalidate(message, field){
    if(this.options.noticeInvalidate)this.app.errorNotice(message);
  }
}


// plugin
// ------------------------------------
/**
 * **plugin** name: data dependence: none
 * 页面数据管理器插件，扩展app 的action state 类型，提供页面数据的管理与校验
 * @class dataPlugin
 * @example
 * **使用**
 * // containerCreator
 * container.states.data = app.actionStates.data({});
 * // page - 使用数据
 * this.props.state_data
 * // page - 修改数据
 * this.props.states.data.setValue('x',xxx);
 */


const DataInit = 'DataInit';
/**
 * 数据初始化
 * @method app.actions._dataInit
 * @param {string} uuid - 数据的uuid
 * @param {object} data - 初始化为该对象
 */
function _dataInit(uuid,data){
  return {
    type: DataInit,
    uuid,
    data,
  };
}

const DataUpdate = 'DataUpdate';
/**
 * 数据更新
 * @method app.actions._dataUpdate
 * @param {string} uuid - 数据的uuid 
 * @param {object} data - 要更新的数据
 * @param {boolean} merge - 更新是否为合并操作
 * @param {object} initData - 在合并操作时，如果原数据为空，采用该初始数据
 */
function _dataUpdate(uuid,data,merge,initData){
  return {
    type: DataUpdate,
    uuid,
    data,
    merge,
    initData,
  };
}

/**
 * @method
 * @param {string} uuid - 数据的uuid
 */
let _dataClear = (uuid)=>(app)=>{
  let state = app.getState('data',{});
  delete state.datas[uuid];
}

/*!
 * reduxer for action state data
 * @function 
 */
function reduxerData(state = {uuid: null, datas: {}}, action) {
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


/**
 * **plugin** name: data dependence: validate
 * 提供页面数据管理与数据校验的功能
 * @class dataPlugin
 * @property {class} app.Network - Network 类
 * @property {Network} app.network - Network 类实例
 */
export default {
  name: 'data',
  dependences: 'validate',

  init(app) {
    /**
     * @method app.actionStates.data
     * @param {ActionStateDataOptions|function} options - 参数，参见ActionStateData 的构造函数
     * @param {string} [uuid=uuid()] - 指定uuid
     */
    app.actionStates.data = function(options,uuid) {
      return ActionState.instance(ActionStateData, app, uuid, options);
    }
  },

  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      _dataInit,
      _dataUpdate,
      _dataClear,
    });

    app.reduxers.data = reduxerData;
  },
}
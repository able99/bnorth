/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


/**
 * 校验配置参数
 * @class ValidateOptions
 * @property {string} [message] - 校验错误信息
 * @property {string} [ruleMessages] - 各个规则分别对应的错误信息
 * @property {boolean} [bail=true] - 对于对象批量校验时，遇到错误不再继续检查其他字段
 * @property {boolean} [input=false] - 是否是输入中状态，对于非空校验，输入中状态不会进行校验
 */


/**
 * 数据校验功能类
 * @class
 */
class Validate {
  constructor(app){
    this.app = app;

    /**
     * @property {string} [checkErrorMessage='error'] - 校验错误的默认字符串
     */
    this.ruleMessages = {
      default: '无效数据',
      required: '不可为空',
      number: '不是有效数字',
      positive: '不是有效正数',
    }
  }

  /**
   * **rule**: 非空校验
   * @method
   * @param {ValidateOptions} [options] - 校验参数
   * @param {*} val - 要校验的数据
   * @param {*} [check0=false] - 是否将0 视为空
   * @return {boolean} - true: 校验无误 false: 校验错误
   */
  required(options, val, check0){
    if(options&&options.input) return true;
    if(val===undefined||val===null) return false;
    if(typeof(val)==='string'&&!val.length) return false;
    if((check0==='true'||check0===true)&&Number(val)===0) return false;
    return true;
  }
  
  /**
   * **rule**: 数字有效性校验
   * @method
   * @param {ValidateOptions} [options] - 校验参数
   * @param {*} val - 要校验的数据
   * @return {boolean} - true: 校验无误 false: 校验错误
   */
  number(options, val){
    return !isNaN(val) || ((options&&options.input) && (val==='.'||val==='0'||val==='0.'));
  }

  /**
   * **rule**: 正数有效性校验
   * @method
   * @param {ValidateOptions} [options] - 校验参数
   * @param {*} val - 要校验的数据
   * @return {boolean} - true: 校验无误 false: 校验错误
   */
  positive(options, val) {
    return this.number(options, val) && Number(val) > 0;
  };

  /**
   * 对数据进行校验
   * @method
   * @param {*} val - 校验的数据 
   * @param {object.<rule, params, message>|string|function|array.<object.<rule, params, message>|string|function>} rule - 规则
   * function: 参数为(options, val, ...params), 校验无误返回false, 校验失败返回错误信息
   * string: Validate 类的 `校验规则` 成员函数的名字，参数用 `|` 分隔，首字！标示取反
   * @param {ValidateOptions} [options] - 校验参数
   * @param {string} [name] - 校验数据的字段名称
   * @return {string|boolean} - 如果有错误，返回错误信息，没有没有错误，返回false
   * @example
   * rule
   * 1. 'required'
   * 1. '!required'
   * 1. 'required|true'
   * 1. function(options, val, ...params) { return val?false:'error' }
   * 1. {rule: '!required', params: [true], message: 'error'}
   * 1. ['required', {rule: 'number'}]
   */
  validate(val, rules, options, name) {
    let message = (options&&options.message)||this.message;
    let ruleMessages = Object.assign({}, this.ruleMessages, (options&&options.ruleMessages)||{});
    let params = [];
    let ret;
  
    for(let rule of Array.isArray(rules)?rules:[rules]) {
      if(rule && typeof(rule)==='object'){
        rule = rule.rule;
        if(rule.params) params = rule.params;
        if(rule.message) message = rule.message;
      }else if(typeof(rule)==='string'){
        rule = rule;
      }
    
      if(rule && typeof(rule)==='function'){
        ret = rule(options, val, ...params);
      }else if(rule && typeof(rule)==='string') {
        let ruleSplit = rule.split('|');
        let getNot = false;
        rule = ruleSplit[0];
        params = params.concat(ruleSplit.slice(1));
        if(rule[0]==='!'){ getNot = true; rule = rule.slice(1); }
  
        let checker = this[rule];
        ret = checker&&checker(options, val, ...params);
        ret = (getNot&&ret)||(!getNot&&!ret)?(ruleMessages[rule]||ruleMessages.default):false;
      }else{
        continue;
      }
  
      if(ret && name && !message) {
        return name + ret;
      }else if(ret && message) {
        message = message.replace('${name}', name);
        message = message.replace('${error}', ret);
        return message;
      }else if(ret) {
        return ret;
      }
    }

    return false;
  }

  /**
   * 对数据对象进行批量校验
   * @method
   * @param {*} val - 校验的对象 
   * @param {*} rule - 规则， 同上
   * @param {ValidateOptions} [options] - 校验参数
   * @param {object} [result] - 如果传递该参数，则将该对象修改为字段名与错误信息的键值对
   * @return {string|boolean} - 如果有错误，返回错误信息，没有没有错误，返回false
   */
  validateObject(obj, rules, options, result) {
    if(!obj||typeof(obj)!=='object') return;
    let message = false;
  
    for(let [key, rule] of Object.entries(rules||{})) {
      let val = obj[key];
      message = false;

      if(Array.isArray(rule)){
        for(let ruleItem of rule){
          message = this.validate(val, ruleItem, options, key);
          if(message) break;
        }
      }else{
        message = this.validate(val, rule, options, key);
      }

      if(message) {
        result && (result[key] = message);
        if(!options||!options.bail) break;
      }
    }
  
    return message;
  } 
}


/**
 * **plugin** name: validate dependence: none
 * 提供数据校验的功能扩展
 * @class validatePlugin
 * @property {class} app.Validate - Validate 类
 * @property {Validate} app.validate - Validate 类实例
 */
export default {
  name: 'validate',
  
  init(app) {
    app.Validate = Validate;
    app.validate = new Validate(app);
  }
}
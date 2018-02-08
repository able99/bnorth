/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import { timeInit, time, timeFrom } from '../utils/time';
import { check, checkObject, checkObjectItem } from '../utils/validator';


/**
 * 格式化输出与数据校验功能类
 * @class
 */
class Format {
  constructor(app){
    this.app = app;

    /**
     * @property {string} [moneyDefault='0.00'] - 金额默认字符串
     */
    this.moneyDefault = '0.00';

    /**
     * @property {string} [timeFormat='YYYY-MM-DD HH:mm:ss'] - 时间默认的格式化字符串
     */
    this.timeFormat = "YYYY-MM-DD HH:mm:ss";

    /**
     * @property {string} [byteSizeG='G'] - 文件大小默认字符串
     */
    this.byteSizeG = 'G';
    /**
     * @property {string} [byteSizeM='M'] - 文件大小默认字符串
     */
    this.byteSizeM = 'M';
    /**
     * @property {string} [byteSizeK='K'] - 文件大小默认字符串
     */
    this.byteSizeK = 'K';
    /**
     * @property {string} [byteSizeB='B'] - 文件大小默认字符串
     */
    this.byteSizeB = 'B';

    /**
     * @property {string} [checkErrorMessage='error'] - 校验错误的默认字符串
     */
    this.checkErrorMessage = 'error';
  }

  /**
   * 格式化金额
   * @method
   * @param {number|string} val - 金额
   */
  money(val){
    return !isNaN(val)?Number(val).toFixed(2):this.moneyDefault;
  }

  /**
   * 计算折扣并格式化
   * @method
   * @param {number|string} value - 金额
   * @param {number|string} discount - 折扣
   * @param {number|string} [min=0.01] - 最小金额
   */
  discount(value, discount, min=0.01) {
    if(isNaN(value)||Number(value)===0) return 0;
    if(isNaN(discount)) return value;

    return Math.max(Math.round(value*100*discount)/100, min);
  }

  /**
   * 初始化时间格式化，由于moment 体积较大，分离初始化
   * @method
   */
  timeInit() {
    return timeInit();
  }

  /**
   * 格式化时间
   * @method
   * @param {*} val 
   * @param {*} options 
   */
  time(val, options){
    options = options||{};
    options.format = options.format || this.timeFormat;
    return time(val, options);
  }

  /**
   * 格式化时间比较
   * @method
   * @param {*} val 
   * @param {*} options 
   */
  timeFrom(val, options){
    return timeFrom(val, options);
  }

  /**
   * 格式化文件尺寸
   * @method
   * @param {number} size - 文件大小
   * @param {number} [fixed=2] - 小数点位数 
   */
  byteSize(size=0, fixed=2){
    if(size>1024*1024*1024){
      return (size/1024/1024/1024).toFixed(fixed)+this.byteSizeG;
    }else if(size>1024*1024){
      return (size/1024/1024).toFixed(fixed)+this.byteSizeM;
    }else if(size>1024){
      return (size/1024).toFixed(fixed)+this.byteSizeK;
    }else{
      return (size?size:0)+this.byteSizeB;
    }
  }

  /**
   * 校验数据的有效性
   * @method
   * @param {object} val - 数据
   * @param {Rule} rule - 规则
   * @param {object} options - 校验配置信息 
   * @param {string} errorMessage - 错误信息
   */
  check(val, rule, options, errorMessage) {
    return check(val, rule, options, this.checkErrorMessage);
  }

  /**
   * 检验数据对象中指定字段的有效性
   * @method
   * @param {object} obj - 需要检验的对象
   * @param {string} key - 字段名
   * @param {Rule|Rule[]} rules - 验证规则或列表
   * @param {object} [options] - 检验配置信息
   */
  checkObjectItem(obj, key, rules, options)  {
    return checkObjectItem(obj, key, rules, options);
  }

  /**
   * 检验数据对象的有效性
   * @method
   * @param {object} obj - 需要检验的对象
   * @param {object.<string, Rule>} rules - 规则键值对
   * @param {object} [options] - 检验配置信息
   */
  checkObject(obj, rules, options)  {
    return checkObject(obj, rules, options);
  }
}


/**
 * **plugin** name: format dependence: none
 * 提供格式化输出与数据校验的功能扩展
 * @class formatPlugin
 * @property {class} app.Format - Format 类
 * @property {Format} app.format - Format 类实例
 */
export default {
  name: 'format',
  
  init(app) {
    app.Format = Format;
    app.format = new Format(app);
  }
}
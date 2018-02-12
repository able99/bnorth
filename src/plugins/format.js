/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


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
   * 格式化时间
   * @method
   * @param {date|number|string} date - 需要格式化的时间
   * @param {string} [format=app.format.timeFormat] - 格式化字符串<br />
   * YYYY|YY: 年
   * MM|M: 月
   * DD|D: 日
   * HH|H: 时
   * mm|m: 分
   * ss|s: 秒
   * S: 毫秒
   * Q: 季度
   * @return {string} - 格式化后的时间字符串
   */
  time(date, format){
    date = date instanceof Date ? date : new Date(date);
    format = format||this.timeFormat;
    let o = {   
      "M+" : date.getMonth()+1,
      "D+" : date.getDate(),
      "H+" : date.getHours(), 
      "m+" : date.getMinutes(), 
      "s+" : date.getSeconds(), 
      "Q+" : Math.floor((date.getMonth()+3)/3), 
      "S"  : date.getMilliseconds(),
    };   

    if(/(Y+)/.test(format))   
      format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
      if(new RegExp("("+ k +")").test(format))   
        format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return format; 
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
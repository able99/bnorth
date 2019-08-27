/**
 * @module
 */


/**
 * 插件参数，扩展了默认的插件参数
 * @typedef PluginOptions
 * @extends package:core:plugin~PluginDefine
 * @type {object}
 * @property {string} moneyDefault - 默认金额
 * @property {string} timeFormat - 默认时间格式化字符串
 * @property {string} byteSizeG - 大小单位 G
 * @property {string} byteSizeM - 大小单位 M
 * @property {string} byteSizeK - 大小单位 K
 * @property {string} byteSizeB - 大小单位 B
 */

/**
 * 浏览器操作对象，由插件构造，挂载在 app 上
 */
class Format {
  constructor(app, _id, options={}){
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 所属插件的实例的 id
     * @type {string}
     */
    this._id = _id;
    /**
     * 所属插件的实例的 options
     * @type {module:index~PluginOptions}
     */
    this.options = {...Format.options, ...options}
  }

  /**
   * 格式化金额
   * @method
   * @param {number|string} - 金额
   * @param {object} - 临时替换配置参数，{moneyDefault: 默认值}
   * @returns {string|number} 格式化后金额
   */
  money(val, options){
    options = this.app.utils.getOptions(this.options, options);
    return !isNaN(val)&&(!options.zeroDefault||val>0)?Number(val).toFixed(2):options.moneyDefault;
  }

  /**
   * 计算折扣并格式化
   * @method
   * @param {number|string} - 金额
   * @param {number|string} - 折扣率
   * @param {number|string} - 最小金额
   * @returns {number} 格式化后金额
   */
  discount(value, discount, min=0.01) {
    if(isNaN(value)||Number(value)===0) return 0;
    if(isNaN(discount)) return value;

    return Math.max(Math.round(value*100*discount)/100, min);
  }

  /**
   * 格式化时间
   * @method
   * @param {date|number|string} 需要格式化的时间
   * @param {string} [format=app.format.timeFormat] - 格式化字符串
   * 
   * - YYYY|YY: 年
   * - MM|M: 月
   * - DD|D: 日
   * - HH|H: 时
   * - mm|m: 分
   * - ss|s: 秒
   * - S: 毫秒
   * - Q: 季度
   * 
   * @return {string} - 格式化后的时间字符串
   */
  time(date, format=this.options.timeFormat){
    date = date instanceof Date ? date : new Date(date);
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
        format = format.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return format; 
  }

  /**
   * 格式化文件尺寸
   * @method
   * @param {number} - 文件尺寸
   * @param {number} - 小数点位数 
   * @returns {number} 尺寸
   */
  byteSize(size=0, fixed=2){
    if(size>1024*1024*1024){
      return (size/1024/1024/1024).toFixed(fixed)+this.options.byteSizeG;
    }else if(size>1024*1024){
      return (size/1024/1024).toFixed(fixed)+this.options.byteSizeM;
    }else if(size>1024){
      return (size/1024).toFixed(fixed)+this.options.byteSizeK;
    }else{
      return (size?size:0)+this.options.byteSizeB;
    }
  }
}

/**
 * Format 默认的参数配置
 * @type {module:index~PluginOptions}
 */
Format.options = {
  /**
   * 货币默认值
   * @type {string}
   */
  moneyDefault: '0.00',
  timeFormat: "YYYY-MM-DD HH:mm:ss",
  byteSizeG: 'G',
  byteSizeM: 'M',
  byteSizeK: 'K',
  byteSizeB: 'B',
}


/**
 * 为 App 实例增加格式化模块，提供了格式化功能
 * @plugin 
 * @exportdefault
 */
let format = {
  _id: 'format',

  _onStart(app, plugin, options) {
    /**
     * 为 App 实例增加格式化操作类
     * @memberof module:index.format
     * @type {module:index~Foramt}
     * @mount app.Foramt
     */
    app.Foramt = Format;
    /**
     * 为 App 实例增加格式化操作类
     * @memberof module:index.format
     * @type {module:index~Foramt}
     * @mount app.format
     */
    app.format = new Format(app, plugin._id, options);
  },

  _onStop(app) {
    delete app.Foramt;
    delete app.format;
  },
}


export default format;

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import md5 from '../utils/md5';
import uuid from '../utils/uuid';
import { base64decode, base64encode } from '../utils/base64';


/**
 * 为app 提供一些工具函数，如md5 等功能
 * @class
 * **插件** 该类为插件类扩展了App 的能力
 * app.Utils: 该类的原型
 * app.utils: 该类的实例
 */

class Utils {
  /**
   * 获取uuid
   * @method
   * @param {number} [len=8] - 长度
   * @param {number} [radix=16] - 
   */
  uuid(...args){
    return uuid(...args);
  }

  /**
   * base64解码
   * @method
   * @param {string} data - 数据
   */
  base64encode(...args){
    return base64encode(...args);
  }

  /**
   * base64编码
   * @method
   * @param {string} data - 数据
   * @return {string} - base64 编码字符串
   */
  base64decode(...args){
    return base64decode(...args);
  }

  /**
   * MD5 编码
   * @method
   * @param {string} data - 数据
   * @return {string} - MD5 编码字符串
   */
  md5(...args) {
    return md5(...args);
  }
}


export default {
  init(app) {
    app.Utils = Utils;
    app.utils = new Utils(app);
  }
}

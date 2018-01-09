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
 * @example
 * **使用**
 * app.util.xxx
 * **hook**
 * 参见Browser hook说明
 */

class Utils {
  uuid(...args){
    return uuid(...args);
  }

  base64encode(...args){
    return base64encode(...args);
  }

  base64decode(...args){
    return base64decode(...args);
  }

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

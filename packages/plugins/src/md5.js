/**
 * @module
 */
import jsmd5 from 'js-md5';


/**
 * 扩展了 App utils 模块，提供了 md5 编解码的工具函数
 * @plugin 
 * @exportdefault
 */
let md5 = {
  _id: 'md5',

  _onStart(app) {
    /**
     * md5 编码
     * @memberof module:index.md5
     * @mount app.utils.md5
     * @param {string} - 字符串
     * @returns {string} 编码后的字符串
     */
    app.utils.md5 = (str)=>jsmd5(str);
  },

  _onStop(app) {
    delete app.utils.md5;
  },
}


export default md5;
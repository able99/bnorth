/**
 * @module
 */
import hibase64 from 'hi-base64';


/**
 * 扩展了 App utils 模块，提供了 base64 编解码的工具函数
 * @plugin 
 * @exportdefault
 */
let base64 = {
  _id: 'base64',

  _onStart(app) {
    /**
     * base64 编码
     * @memberof module:index.base64
     * @mount app.utils.base64encode
     * @param {string} - 字符串
     * @returns {string} 编码后的字符串
     */
    app.utils.base64encode = (str, asciiOnly)=>hibase64.encode(str, asciiOnly);
    /**
     * base64 解码
     * @memberof module:index.base64
     * @mount app.utils.base64decode
     * @param {string} - 字符串
     * @returns {string} 解码后的字符串
     */
    app.utils.base64decode = (str, asciiOnly)=>hibase64.decode(str, asciiOnly);
  },

  _onStop(app) {
    delete app.utils.base64encode;
    delete app.utils.base64decode;
  },
}

export default base64;
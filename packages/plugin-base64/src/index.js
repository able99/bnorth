/**
 * @module
 */
import base64 from 'hi-base64';


/**
 * 扩展了 App utils 模块，提供了 base64编解码的工具函数
 * @plugin base64
 * @exportdefault
 */
let base64 = {
  _id: 'base64',

  onPluginMount(app) {
    /**
     * base64 编码
     * @memberof module:index.base64
     * @mount app.utils.base64encode
     * @param {string} - 字符串
     * @returns {string} 编码后的字符串
     */
    app.utils.base64encode = (str, asciiOnly)=>base64.encode(str, asciiOnly);
    /**
     * base64 解码
     * @memberof module:index.base64
     * @mount app.utils.base64decode
     * @param {string} - 字符串
     * @returns {string} 解码后的字符串
     */
    app.utils.base64decode = (str, asciiOnly)=>base64.decode(str, asciiOnly);
  },

  onPluginUnmount(app) {
    delete app.utils.base64encode;
    delete app.utils.base64decode;
  },
}

export default base64;
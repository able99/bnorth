"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hiBase = _interopRequireDefault(require("hi-base64"));

/**
 * @module
 */

/**
 * 扩展了 App utils 模块，提供了 base64 编解码的工具函数
 * @plugin 
 * @exportdefault
 */
var base64 = {
  _id: 'base64',
  _onStart: function _onStart(app) {
    /**
     * base64 编码
     * @memberof module:index.base64
     * @mount app.utils.base64encode
     * @param {string} - 字符串
     * @returns {string} 编码后的字符串
     */
    app.utils.base64encode = function (str, asciiOnly) {
      return _hiBase.default.encode(str, asciiOnly);
    };
    /**
     * base64 解码
     * @memberof module:index.base64
     * @mount app.utils.base64decode
     * @param {string} - 字符串
     * @returns {string} 解码后的字符串
     */


    app.utils.base64decode = function (str, asciiOnly) {
      return _hiBase.default.decode(str, asciiOnly);
    };
  },
  _onStop: function _onStop(app) {
    delete app.utils.base64encode;
    delete app.utils.base64decode;
  }
};
var _default = base64;
exports.default = _default;
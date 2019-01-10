"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsMd = _interopRequireDefault(require("js-md5"));

/**
 * @module
 */

/**
 * 扩展了 App utils 模块，提供了 md5 编解码的工具函数
 * @plugin 
 * @exportdefault
 */
var md5 = {
  _id: 'md5',
  onPluginMount: function onPluginMount(app) {
    /**
     * md5 编码
     * @memberof module:index.md5
     * @mount app.utils.md5
     * @param {string} - 字符串
     * @returns {string} 编码后的字符串
     */
    app.utils.md5 = function (str) {
      return (0, _jsMd.default)(str);
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.utils.md5;
  }
};
var _default = md5;
exports.default = _default;
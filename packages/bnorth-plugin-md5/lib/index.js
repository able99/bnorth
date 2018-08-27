"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsMd = _interopRequireDefault(require("js-md5"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var _default = {
  _id: 'md5',
  onPluginMount: function onPluginMount(app) {
    app.utils.md5 = function (str) {
      return (0, _jsMd.default)(str);
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.utils.md5;
  }
};
exports.default = _default;
module.exports = exports["default"];
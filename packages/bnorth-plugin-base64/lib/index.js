"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hiBase = _interopRequireDefault(require("hi-base64"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var _default = {
  // plugin 
  // --------------------------------
  pluginName: 'base64',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.utils.base64encode = function (str, asciiOnly) {
      return _hiBase.default.encode(str, asciiOnly);
    };

    app.utils.base64decode = function (str, asciiOnly) {
      return _hiBase.default.decode(str, asciiOnly);
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.utils.base64encode;
    delete app.utils.base64decode;
  }
};
exports.default = _default;
module.exports = exports["default"];
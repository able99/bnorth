"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

/**
 * 背景
 * @module
 */

/**
 * 样式生成函数：背景
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncBackground(_ref) {
  var utilColors = _ref.utilColors,
      mainColors = _ref.mainColors,
      opacityColors = _ref.opacityColors;
  return Object.assign(
  /**
   * 设置背景颜色，与 bg-color 互斥，需要开关
   * @classname bg-color-
   * @param {module:config~GenConfig#utilColors|module:config~GenConfig#mainColors|module:config~GenConfig#opacityColors} color - 颜色
   */
  (0, _utils.genClassObjects)('.bg-color', {
    styleKey: 'background-color',
    styleValueSet: (0, _objectSpread2.default)({}, utilColors, mainColors, opacityColors)
  }),
  /**
   * 设置无背景
   * @classname bg-none-
   */
  (0, _utils.genClassObjects)('.bg-none-', {
    styleObjectMap: {
      'background': 'none'
    }
  }));
}

var _default = genFuncBackground;
exports.default = _default;
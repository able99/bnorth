"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _utils = require("../utils");

/**
 * 边距
 * @module
 */

/**
 * 样式生成函数：边距
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncSpacing(_ref) {
  var directionEdge = _ref.directionEdge,
      spacing = _ref.spacing;
  var styleValueSet = (0, _utils.getStyleValueSet)(spacing);
  return (0, _assign.default)(
  /**
   * 设置外边距
   * @classname margin
   * @param {module:config~GenConfig#directionEdge} edge - 位置
   * @param {module:config~gen#spacing} spacing - 边距
   */
  (0, _utils.genClassObjects)('.margin', {
    styleKey: true,
    styleKeySet: directionEdge,
    styleValueSet: styleValueSet
  }),
  /**
   * 设置内边距
   * @classname padding
   * @param {module:config~GenConfig#directionEdge} edge - 位置
   * @param {module:config~gen#spacing} spacing - 样式开关
   */
  (0, _utils.genClassObjects)('.padding', {
    styleKey: true,
    styleKeySet: directionEdge,
    styleValueSet: styleValueSet
  }));
}

var _default = genFuncSpacing;
exports.default = _default;
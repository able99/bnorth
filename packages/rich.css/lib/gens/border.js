"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _utils = require("../utils");

var _compatibleBorder = _interopRequireDefault(require("../compatibles/compatibleBorder"));

/**
 * @module
 */

/**
 * 生成边框相关样式表
 * @exportdefault
 * @param {ClassNamesConfig} - class names 生成配置对象
 * @returns {object} class names 中间对象，由 cssGen 调用
 */
function genFuncBorder(_ref) {
  var utilColors = _ref.utilColors,
      mainColors = _ref.mainColors,
      directionEdge = _ref.directionEdge,
      directionCorner = _ref.directionCorner,
      borderStyle = _ref.borderStyle,
      borderWidth = _ref.borderWidth,
      borderRadius = _ref.borderRadius;
  var colors = (0, _objectSpread2.default)({
    '-': utilColors.border
  }, utilColors, mainColors);
  return Object.assign(
  /**
   * 设置边框
   * @classname border-set
   * @param {string} edge - 边框的位置
   * @param {string=} color - 边框的颜色
   * @example
   * ```jsx
   * <div className="border-set-a-">
   * ```
   */
  (0, _utils.genClassObjects)('.border-set', {
    styleKey: 'border',
    styleKeySet: directionEdge,
    styleValueSet: colors,
    styleValueMap: function styleValueMap(val) {
      return "1px solid ".concat(val);
    }
  }), (0, _utils.genClassObjects)('.border-color', {
    styleKey: 'border',
    styleKeyExt: 'color',
    styleKeySet: directionEdge,
    styleValueSet: colors
  }), (0, _utils.genClassObjects)('.border-style', {
    styleKey: 'border',
    styleKeyExt: 'style',
    styleKeySet: directionEdge,
    styleValueSet: (0, _utils.getStyleValueSet)(borderStyle)
  }), (0, _utils.genClassObjects)('.border-width', {
    styleKey: 'border',
    styleKeyExt: 'width',
    styleKeySet: directionEdge,
    styleValueSet: (0, _utils.getStyleValueSet)(borderWidth)
  }), (0, _utils.genClassObjects)('.border-none', {
    selectorExt: '-',
    styleKey: 'border',
    styleKeySet: directionEdge,
    styleValueMap: function styleValueMap() {
      return 'none';
    }
  }), (0, _utils.genClassObjects)('.border-radius', {
    styleKey: 'border',
    styleKeyExt: 'radius',
    styleKeySet: directionCorner,
    styleValueSet: (0, _utils.getStyleValueSet)(borderRadius),
    styleObjectCompatible: _compatibleBorder.default
  }));
}

var _default = genFuncBorder;
exports.default = _default;
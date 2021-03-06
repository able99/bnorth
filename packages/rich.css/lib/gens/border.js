"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _utils = require("../utils");

var _compatibleBorder = _interopRequireDefault(require("../compatibles/compatibleBorder"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 样式生成函数：边框
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncBorder(_ref) {
  var utilColors = _ref.utilColors,
      mainColors = _ref.mainColors,
      directionEdge = _ref.directionEdge,
      directionCorner = _ref.directionCorner,
      borderStyle = _ref.borderStyle,
      borderWidth = _ref.borderWidth,
      borderRadius = _ref.borderRadius;

  var colors = _objectSpread({
    '-': utilColors.border
  }, utilColors, {}, mainColors);

  return (0, _assign.default)(
  /**
   * 设置边框，可指定边框位置和颜色，实线样式和 1 像素宽度固定
   * @classname border-set
   * @param {module:config~GenConfig#directionEdge} edge - 位置
   * @param {module:config~GenConfig#utilColors|module:config~GenConfig#mainColors} [color=utilColors.border] - 颜色
   */
  (0, _utils.genClassObjects)('.border-set', {
    styleKey: 'border',
    styleKeySet: directionEdge,
    styleValueSet: colors,
    styleValueMap: function styleValueMap(val) {
      return "1px solid ".concat(val);
    }
  }),
  /**
   * 设置边框的颜色
   * @classname border-color
   * @param {module:config~GenConfig#directionEdge} edge - 位置
   * @param {module:config~GenConfig#utilColors|module:config~GenConfig#mainColors} [color=utilColors.border] - 颜色
   */
  (0, _utils.genClassObjects)('.border-color', {
    styleKey: 'border',
    styleKeyExt: 'color',
    styleKeySet: directionEdge,
    styleValueSet: colors
  }),
  /**
   * 设置边框的风格
   * @classname border-style
   * @param {module:config~GenConfig#directionEdge} edge - 位置
   * @param {module:config~GenConfig#borderStyle} style - 样式
   */
  (0, _utils.genClassObjects)('.border-style', {
    styleKey: 'border',
    styleKeyExt: 'style',
    styleKeySet: directionEdge,
    styleValueSet: (0, _utils.getStyleValueSet)(borderStyle)
  }),
  /**
   * 设置边框的宽度
   * @classname border-width
   * @param {module:config~GenConfig#directionEdge} edge - 位置
   * @param {module:config~GenConfig#borderWidth} width - 宽度
   */
  (0, _utils.genClassObjects)('.border-width', {
    styleKey: 'border',
    styleKeyExt: 'width',
    styleKeySet: directionEdge,
    styleValueSet: (0, _utils.getStyleValueSet)(borderWidth)
  }),
  /**
   * 设置无边框，因各个方向可以同时设置，需要设置开关
   * @classname border-none
   * @param {module:config~GenConfig#directionEdge} edge - 位置
   * @param {module:config~gen#StyleSwitcher} switcher - 样式开关
   */
  (0, _utils.genClassObjects)('.border-none', {
    selectorExt: '-',
    styleKey: 'border',
    styleKeySet: directionEdge,
    styleValueMap: function styleValueMap() {
      return 'none';
    }
  }),
  /**
   * 设置边框圆角
   * @classname border-radius
   * @param {module:config~GenConfig#directionCorner} edge - 圆角位置
   * @param {module:config~GenConfig#borderRadius} width - 圆角半径
   */
  (0, _utils.genClassObjects)('.border-radius', {
    styleKey: 'border',
    styleKeyExt: 'radius',
    styleKeySet: directionCorner,
    styleValueSet: (0, _utils.getStyleValueSet)(borderRadius),
    styleObjectCompatible: _compatibleBorder.default
  }));
}

var _default = genFuncBorder;
exports.default = _default;
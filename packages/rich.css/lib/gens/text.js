"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.number.constructor");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

/**
 * 文本样式
 * @module
 */

/**
 * 样式生成函数：文本
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncText(_ref) {
  var utilColors = _ref.utilColors,
      mainColors = _ref.mainColors,
      textColors = _ref.textColors,
      textFontFamily = _ref.textFontFamily,
      textSize = _ref.textSize,
      textWeight = _ref.textWeight,
      textStyle = _ref.textStyle,
      textDecoration = _ref.textDecoration,
      textAlign = _ref.textAlign,
      textVerticalAligns = _ref.textVerticalAligns,
      textWhiteSpaces = _ref.textWhiteSpaces,
      lineHeight = _ref.lineHeight,
      textTruncate = _ref.textTruncate;
  lineHeight = (0, _utils.getStyleValueSet)(lineHeight);
  return Object.assign(
  /**
   * 设置文本尺寸
   * @classname text-size
   * @param {module:config~GenConfig#textSize} size - 文本尺寸
   */
  (0, _utils.genClassObjects)('.text-size', {
    styleKey: 'font-size',
    styleValueSet: (0, _utils.getStyleValueSet)(textSize)
  }),
  /**
   * 设置文本粗度
   * @classname text-weight
   * @param {module:config~GenConfig#textWeight} weight - 文本粗度
   */
  (0, _utils.genClassObjects)('.text-weight', {
    styleKey: 'font-weight',
    styleValueSet: (0, _utils.getStyleValueSet)(textWeight)
  }),
  /**
   * 设置文本样色
   * @classname text-color
   * @param {module:config~GenConfig#utilColors|module:config~GenConfig#mainColors|module:config~GenConfig#textColors} [color=textColors.normal] - 文本粗度
   */
  (0, _utils.genClassObjects)('.text-color', {
    styleKey: 'color',
    styleValueSet: (0, _objectSpread2.default)({
      '-': textColors.normal
    }, utilColors, mainColors, textColors)
  }),
  /**
   * 设置文本样式
   * @classname text-style
   * @param {module:config~GenConfig#textStyle} style - 文本样式
   */
  (0, _utils.genClassObjects)('.text-style', {
    styleKey: 'font-style',
    styleValueSet: (0, _utils.getStyleValueSet)(textStyle)
  }),
  /**
   * 设置文本装饰
   * @classname text-decoration
   * @param {module:config~GenConfig#textDecoration} style - 文本装饰
   */
  (0, _utils.genClassObjects)('.text-decoration', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(textDecoration)
  }),
  /**
   * 设置对齐方式
   * @classname text-align
   * @param {module:config~GenConfig#textAlign} align - 对齐方式
   */
  (0, _utils.genClassObjects)('.text-align', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(textAlign)
  }),
  /**
   * 设置垂直对齐方式
   * @classname text-vertical-align
   * @param {module:config~GenConfig#textVerticalAligns} verticalAlign - 垂直对齐方式
   */
  (0, _utils.genClassObjects)('.text-vertical-align', {
    styleKey: 'vertical-align',
    styleValueSet: (0, _utils.getStyleValueSet)(textVerticalAligns)
  }),
  /**
   * 设置空白样式
   * @classname text-white-space
   * @param {module:config~GenConfig#textWhiteSpaces} whiteSpaces - 空白样式
   */
  (0, _utils.genClassObjects)('.text-white-space', {
    styleKey: 'white-space',
    styleValueSet: (0, _utils.getStyleValueSet)(textWhiteSpaces)
  }),
  /**
   * 设置文本字体
   * @classname text-family
   * @param {module:config~GenConfig#textFontFamily} family - 字体
   */
  (0, _utils.genClassObjects)('.text-family', {
    styleKey: 'font-family',
    styleValueSet: textFontFamily
  }),
  /**
   * 设置文本溢出时省略显示
   * @classname text-truncate-
   */
  (0, _utils.genClassObjects)('.text-truncate-', {
    styleObjectMap: {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    }
  }),
  /**
   * 设置文本溢出时省略显示，line-clamp 方式，可设置行数，但是 ie 不兼容
   * @classname text-decoration
   * @param {module:config~GenConfig#textTruncate} line - 文本行数
   */
  (0, _utils.genClassObjects)('.text-truncate', {
    styleValueSet: (0, _utils.getStyleValueSet)(textTruncate),
    styleObjectMap: function styleObjectMap(styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue) {
      return {
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': styleValueSetValue,
        'line-height': (0, _utils.getStyleValueSetDefault)(lineHeight),
        'max-height': (Number((0, _utils.getStyleValueSetDefault)(lineHeight)) * Number(styleValueSetValue)).toFixed(1) + 'em'
      };
    }
  }),
  /**
   * 设置文本溢出时省略显示，不足设置行数时，保留行高度
   * @classname text-truncate
   * @classnameext placeholder
   * @param {module:config~GenConfig#textTruncate} line - 文本行数
   */
  (0, _utils.genClassObjects)('.text-truncate', {
    selectorExt: 'placeholder',
    styleValueSet: (0, _utils.getStyleValueSet)(textTruncate),
    styleObjectMap: function styleObjectMap(styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue) {
      return {
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': styleValueSetValue,
        'line-height': (0, _utils.getStyleValueSetDefault)(lineHeight),
        'max-height': (Number((0, _utils.getStyleValueSetDefault)(lineHeight)) * Number(styleValueSetValue)).toFixed(1) + 'em',
        'min-height': (Number((0, _utils.getStyleValueSetDefault)(lineHeight)) * Number(styleValueSetValue)).toFixed(1) + 'em'
      };
    }
  }));
}

var _default = genFuncText;
exports.default = _default;
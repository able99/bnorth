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
 * @module
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
  return Object.assign((0, _utils.genClassObjects)('.text-size', {
    styleKey: 'font-size',
    styleValueSet: (0, _utils.getStyleValueSet)(textSize)
  }), (0, _utils.genClassObjects)('.text-weight', {
    styleKey: 'font-weight',
    styleValueSet: (0, _utils.getStyleValueSet)(textWeight)
  }), (0, _utils.genClassObjects)('.text-color', {
    styleKey: 'color',
    styleValueSet: (0, _objectSpread2.default)({
      '-': textColors.normal
    }, utilColors, mainColors, textColors)
  }), (0, _utils.genClassObjects)('.text-style', {
    styleKey: 'font-style',
    styleValueSet: (0, _utils.getStyleValueSet)(textStyle)
  }), (0, _utils.genClassObjects)('.text-decoration', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(textDecoration)
  }), (0, _utils.genClassObjects)('.text-align', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(textAlign)
  }), (0, _utils.genClassObjects)('.text-vertical-align', {
    styleKey: 'vertical-align',
    styleValueSet: (0, _utils.getStyleValueSet)(textVerticalAligns)
  }), (0, _utils.genClassObjects)('.text-white-space', {
    styleKey: 'white-space',
    styleValueSet: (0, _utils.getStyleValueSet)(textWhiteSpaces)
  }), (0, _utils.genClassObjects)('.text-family', {
    styleKey: 'font-family',
    styleValueSet: textFontFamily
  }), (0, _utils.genClassObjects)('.text-truncate', {
    selectorExt: '-',
    styleObjectMap: {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    }
  }), (0, _utils.genClassObjects)('.text-truncate', {
    selectorExt: '-',
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
  }), (0, _utils.genClassObjects)('.text-truncate', {
    selectorExt: 'placeholder-',
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
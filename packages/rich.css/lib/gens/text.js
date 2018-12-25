"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genTextSizes = genTextSizes;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _utils = require("../utils");

/**
 * @module
 */
var Styles = {
  '-': 'normal',
  'italic': true,
  'oblique': true,
  'inherit': true
};
var Decorations = {
  '-': 'none',
  'underline': true,
  'overline': true,
  'linethrough': 'line-through',
  'blink': true,
  'inherit': true
};
var Aligns = {
  '-': 'left',
  'left': true,
  'center': true,
  'right': true,
  'justify': true
};
var VerticalAligns = {
  '-': 'baseline',
  'baseline': true,
  'sub': true,
  'super': true,
  'top': true,
  'text-top': true,
  'middle': true,
  'bottom': true,
  'textbottom': 'text-bottom',
  'inherit': true
};
var WhiteSpaces = {
  '-': 'normal',
  'normal': true,
  'inherit': true,
  'pre': true,
  'nowrap': true,
  'prewrap': 'pre-wrap',
  'preline': 'pre-line'
};
var baseSelector = 'text';
var baseStyleSelector = 'font';
/**
 * 设置文本字体尺寸
 * @classname text-size
 * @param {font=} size - 字体尺寸
 * @example
 * ```jsx
 * <div className="text-size-lg">
 * ```
 */

function genTextSizes(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('font', config);
  var func = 'size';
  var selector = "".concat(baseSelector, "-").concat(func);
  var styleSelector = "".concat(baseStyleSelector, "-").concat(func);
  Object.entries(sizes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return ret[(0, _utils.getSelector)(selector, k.trim())] = (0, _utils.getStyleSet)(styleSelector, v);
  });
  return ret;
}
/**
 * 设置文本字体粗度
 * @classname text-weight
 * @param {fontWeight=} size - 字体粗度
 */


function genTextWeights(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('fontWeight', config);
  var func = 'weight';
  var selector = "".concat(baseSelector, "-").concat(func);
  var styleSelector = "".concat(baseStyleSelector, "-").concat(func);
  Object.entries(sizes).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(styleSelector, v);
  });
  return ret;
}

function genTextColors(_ref5) {
  var utilColors = _ref5.utilColors,
      mainColors = _ref5.mainColors,
      textColors = _ref5.textColors;
  var ret = {};
  var func = 'color';
  var colors = (0, _objectSpread2.default)({
    '-': textColors.normal
  }, utilColors, mainColors, textColors);
  var selector = "".concat(baseSelector, "-").concat(func);
  Object.entries(colors).forEach(function (_ref6) {
    var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
        k = _ref7[0],
        v = _ref7[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(func, v);
  });
  return ret;
}

function genTextStyles() {
  var ret = {};
  var func = 'style';
  var selector = "".concat(baseSelector, "-").concat(func);
  var styleSelector = "".concat(baseStyleSelector, "-").concat(func);
  Object.entries(Styles).forEach(function (_ref8) {
    var _ref9 = (0, _slicedToArray2.default)(_ref8, 2),
        k = _ref9[0],
        v = _ref9[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(styleSelector, v, {
      key: k
    });
  });
  return ret;
}

function genTextDecorations() {
  var ret = {};
  var func = 'decoration';
  var selector = "".concat(baseSelector, "-").concat(func);
  Object.entries(Decorations).forEach(function (_ref10) {
    var _ref11 = (0, _slicedToArray2.default)(_ref10, 2),
        k = _ref11[0],
        v = _ref11[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(selector, v, {
      key: k
    });
  });
  return ret;
}

function genTextAligns() {
  var ret = {};
  var func = 'align';
  var selector = "".concat(baseSelector, "-").concat(func);
  Object.entries(Aligns).forEach(function (_ref12) {
    var _ref13 = (0, _slicedToArray2.default)(_ref12, 2),
        k = _ref13[0],
        v = _ref13[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(selector, v, {
      key: k
    });
  });
  return ret;
}

function genTextVerticalAligns() {
  var ret = {};
  var func = 'vertical-align';
  var selector = "".concat(baseSelector, "-").concat(func);
  Object.entries(VerticalAligns).forEach(function (_ref14) {
    var _ref15 = (0, _slicedToArray2.default)(_ref14, 2),
        k = _ref15[0],
        v = _ref15[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(func, v, {
      key: k
    });
  });
  return ret;
}

function genTextWhiteSpaces() {
  var ret = {};
  var func = 'white-space';
  var selector = "".concat(baseSelector, "-").concat(func);
  Object.entries(WhiteSpaces).forEach(function (_ref16) {
    var _ref17 = (0, _slicedToArray2.default)(_ref16, 2),
        k = _ref17[0],
        v = _ref17[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(func, v, {
      key: k
    });
  });
  return ret;
}

function genLineHeight(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('lineHeight', config);
  var selector = 'line-height';
  Object.entries(sizes).forEach(function (_ref18) {
    var _ref19 = (0, _slicedToArray2.default)(_ref18, 2),
        k = _ref19[0],
        v = _ref19[1];

    return ret[(0, _utils.getSelector)(selector, k.trim())] = (0, _utils.getStyleSet)(selector, v);
  });
  return ret;
}

function genFamily(_ref20) {
  var fontFamilys = _ref20.fontFamilys;
  var ret = {};
  var func = 'family';
  var selector = "".concat(baseSelector, "-").concat(func);
  Object.entries(fontFamilys).forEach(function (_ref21) {
    var _ref22 = (0, _slicedToArray2.default)(_ref21, 2),
        k = _ref22[0],
        v = _ref22[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)('font-family', v);
  });
  return ret;
}

function genTruncate(_ref23) {
  var textTruncateSet = _ref23.textTruncateSet,
      lineHeightSizeBase = _ref23.lineHeightSizeBase;
  var ret = {};
  var func = 'truncate';
  var selector = "".concat(baseSelector, "-").concat(func);
  ret[(0, _utils.getSelector)(selector, '-')] = {
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap'
  };
  (textTruncateSet || []).forEach(function (v) {
    ret[(0, _utils.getSelector)(selector, v)] = {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': v,
      'line-height': lineHeightSizeBase,
      'max-height': (lineHeightSizeBase * v).toFixed(1) + 'em'
    };
    ret[(0, _utils.getSelector)(selector, v, 'placeholder')] = (0, _objectSpread2.default)({}, ret[(0, _utils.getSelector)(selector, v)], {
      'min-height': ret[(0, _utils.getSelector)(selector, v)]['max-height']
    });
  });
  return ret;
}
/**
 * 生成 文字相关 class names
 * @exportdefault
 * @param {ClassNamesConfig} - class names 生成配置对象
 * @returns {object} class names 中间对象，由 cssGen 调用
 */


function genFunctionText(config) {
  return (0, _objectSpread2.default)({}, genTextSizes(config), genTextWeights(config), genTextColors(config), genTextStyles(config), genTextDecorations(config), genTextAligns(config), genTextVerticalAligns(config), genTextWhiteSpaces(config), genLineHeight(config), genFamily(config), genTruncate(config));
}

var _default = genFunctionText;
exports.default = _default;
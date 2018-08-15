"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genTextSizes = genTextSizes;
exports.genTextWeights = genTextWeights;
exports.genTextColors = genTextColors;
exports.genTextStyles = genTextStyles;
exports.genTextDecorations = genTextDecorations;
exports.genTextAligns = genTextAligns;
exports.genTextVerticalAligns = genTextVerticalAligns;
exports.genTextWhiteSpaces = genTextWhiteSpaces;
exports.genLineHeight = genLineHeight;
exports.genFamily = genFamily;
exports.genTruncate = genTruncate;
exports.default = gen;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var Styles = {
  '': 'normal',
  'italic': true,
  'oblique': true,
  'inherit': true
};
var Decorations = {
  '': 'none',
  'underline': true,
  'overline': true,
  'line-through': true,
  'blink': true,
  'inherit': true
};
var Aligns = {
  'left': true,
  'center': true,
  'right': true,
  'justify': true
};
var VerticalAligns = {
  'baseline': true,
  'sub': true,
  'super': true,
  'top': true,
  'text-top': true,
  'middle': true,
  'bottom': true,
  'text-bottom': true,
  'inherit': true
};
var WhiteSpaces = {
  '': 'normal',
  'normal': true,
  'inherit': true,
  'pre': true,
  'nowrap': true,
  'pre-wrap': true,
  'pre-line': true
};
var baseSelector = 'text';
var baseStyleSelector = 'font';

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
    '': textColors.normal
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
  (textTruncateSet || []).forEach(function (v) {
    if (Number(v) === 1) {
      ret[(0, _utils.getSelector)(selector)] = {
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      };
    } else {
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
    }
  });
  return ret;
}

function gen(config) {
  return (0, _objectSpread2.default)({}, genTextSizes(config), genTextWeights(config), genTextColors(config), genTextStyles(config), genTextDecorations(config), genTextAligns(config), genTextVerticalAligns(config), genTextWhiteSpaces(config), genLineHeight(config), genFamily(config), genTruncate(config));
}
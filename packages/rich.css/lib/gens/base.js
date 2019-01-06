"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.bold");

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

function genFuncBase(_ref) {
  var textColors = _ref.textColors,
      utilColors = _ref.utilColors,
      textSize = _ref.textSize,
      hMapTextSize = _ref.hMapTextSize,
      textFontFamily = _ref.textFontFamily,
      textWeight = _ref.textWeight,
      bodyBackground = _ref.bodyBackground,
      lineHeight = _ref.lineHeight,
      transitionTime = _ref.transitionTime;
  textSize = (0, _utils.getStyleValueSet)(textSize);
  textWeight = (0, _utils.getStyleValueSet)(textWeight);
  lineHeight = (0, _utils.getStyleValueSet)(lineHeight);
  return Object.assign((0, _utils.genClassObjects)('html', {
    styleObjectMap: {
      'font-size': (0, _utils.getStyleValueSetDefault)(textSize)
    }
  }), (0, _utils.genClassObjects)('body', {
    styleObjectMap: {
      'font-size': (0, _utils.getStyleValueSetDefault)(textSize),
      'color': textColors.normal,
      'font-family': (0, _utils.getStyleValueSetDefault)(textFontFamily),
      'font-weight': (0, _utils.getStyleValueSetDefault)(textWeight),
      'line-height': (0, _utils.getStyleValueSetDefault)(lineHeight),
      'background': bodyBackground
    }
  }), (0, _utils.genClassObjects)('h', {
    styleValueSet: (0, _utils.getStyleValueSet)(hMapTextSize),
    styleObjectMap: function styleObjectMap(styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue) {
      return {
        'font-weight': textWeight.bold,
        'font-size': textSize[styleValueSetValue]
      };
    }
  }), (0, _utils.genClassObjects)('strong', {
    styleObjectMap: {
      'font-weight': textWeight.bold
    }
  }), (0, _utils.genClassObjects)('hr', {
    styleObjectMap: {
      'border': "1px solid ".concat(utilColors.border),
      'border-width': '1 0 0',
      'clear': 'both',
      'height': 0
    }
  }), (0, _utils.genClassObjects)('.transition-set', {
    styleKey: 'transition',
    styleValueSet: (0, _utils.getStyleValueSet)(transitionTime),
    styleValueMap: function styleValueMap(val) {
      return "".concat(val, " ease-out");
    },
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.line-height', {
    styleKey: true,
    styleValueSet: lineHeight
  }), (0, _utils.genClassObjects)('.outline-none-', {
    styleObjectMap: {
      'outline': 'none'
    }
  }), (0, _utils.genClassObjects)('.appearance-none-', {
    styleObjectMap: {
      'appearance': 'none',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none'
    }
  }), (0, _utils.genClassObjects)('.backface-hidden-', {
    styleObjectMap: {
      'backface-visibility': 'hidden'
    }
  }), (0, _utils.genClassObjects)('.force-hardware-acceleration-', {
    styleObjectMap: {
      'transform': 'translateZ(0)',
      'backface-visibility': 'hidden',
      'perspective': '1000'
    },
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.font-smoothing-antialiased-', {
    styleObjectMap: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale'
    }
  }));
}

var _default = genFuncBase;
exports.default = _default;
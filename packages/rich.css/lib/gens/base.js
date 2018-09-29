"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gen;

require("core-js/modules/es6.string.bold");

var _utils = require("../utils");

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

function gen(config) {
  var textColors = config.textColors,
      utilColors = config.utilColors,
      fontSizeBase = config.fontSizeBase,
      fontFamilys = config.fontFamilys,
      fontWeightSizeBase = config.fontWeightSizeBase,
      fontWeightSizeSet = config.fontWeightSizeSet,
      bodyBackground = config.bodyBackground,
      lineHeightSizeBase = config.lineHeightSizeBase;
  var ret = {};
  ret['html'] = {
    'font-size': "".concat(fontSizeBase, "px")
  };
  ret['body'] = {
    'font-size': "".concat(fontSizeBase, "px"),
    'color': textColors.normal,
    'font-family': fontFamilys['sans-serif'],
    'font-weight': fontWeightSizeBase,
    'line-height': lineHeightSizeBase,
    'background': bodyBackground
  };
  var sizes = (0, _utils.getSizeSet)('font', config);
  ret['h1'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['xxl']
  };
  ret['h2'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['xl']
  };
  ret['h3'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['lg']
  };
  ret['h4'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['']
  };
  ret['h5'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['sm']
  };
  ret['h6'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['xs']
  };
  ret['strong'] = {
    'font-weight': fontWeightSizeSet.bold
  };
  ret['hr'] = {
    'border': "1px solid ".concat(utilColors.border),
    'border-width': '1 0 0',
    'clear': 'both',
    'height': 0
  };
  ret[(0, _utils.getSelector)('transition-set-')] = (0, _compatibleAnimation.default)({
    'transition': '.15s ease-out'
  });
  ret[(0, _utils.getSelector)('line-height-0')] = {
    'line-height': '0'
  };
  ret[(0, _utils.getSelector)('line-height-1')] = {
    'line-height': '1'
  };
  ret[(0, _utils.getSelector)('line-height-1em')] = {
    'line-height': '1em'
  };
  ret[(0, _utils.getSelector)('outline-none-')] = {
    'outline': 'none'
  };
  ret[(0, _utils.getSelector)('appearance-none-')] = {
    'appearance': 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none'
  };
  ret[(0, _utils.getSelector)('backface-hidden-')] = {
    'backface-visibility': 'hidden'
  };
  ret[(0, _utils.getSelector)('force-hardware-acceleration-')] = (0, _compatibleAnimation.default)({
    'transform': 'translateZ(0)',
    'backface-visibility': 'hidden',
    'perspective': '1000'
  });
  ret[(0, _utils.getSelector)('font-smoothing-antialiased-')] = {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  };
  return ret;
}
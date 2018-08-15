"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genBgColor = genBgColor;
exports.genBgNone = genBgNone;
exports.default = gen;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _utils = require("../utils");

function genBgColor(_ref) {
  var utilColors = _ref.utilColors,
      mainColors = _ref.mainColors,
      opacityColors = _ref.opacityColors;
  var ret = {};
  var colors = (0, _objectSpread2.default)({}, utilColors, mainColors, opacityColors);
  var func = 'color';
  var selector = "bg-".concat(func);
  var styleSelector = "background-".concat(func);
  Object.entries(colors).forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(styleSelector, v);
  });
  return ret;
}

function genBgNone() {
  var ret = {};
  ret[(0, _utils.getSelector)('bg', 'none')] = {
    'background': 'none'
  };
  return ret;
}

function gen(config) {
  return (0, _objectSpread2.default)({}, genBgColor(config), genBgNone(config));
}
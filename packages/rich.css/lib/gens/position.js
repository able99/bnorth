"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genPosition = genPosition;
exports.genOffset = genOffset;
exports.genTranslate = genTranslate;
exports.default = gen;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

var Positions = {
  'initial': true,
  'relative': true,
  'absolute': true,
  'fixed': true
};
var Offsets = {
  'left': true,
  'right': true,
  'top': true,
  'bottom': true
};

function genPosition() {
  var ret = {};
  var selector = 'position';
  Object.entries(Positions).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(selector, v, {
      key: k
    });
  });
  return ret;
}

function genOffset() {
  var ret = {};
  var selector = 'offset';
  var func;
  func = 'start';
  Object.entries(Offsets).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return ret[(0, _utils.getSelector)(selector, k, func)] = (0, _utils.getStyleSet)(k, 0);
  });
  func = 'center';
  Object.entries(Offsets).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    return ret[(0, _utils.getSelector)(selector, k, func)] = (0, _utils.getStyleSet)(k, '50%');
  });
  func = 'end';
  Object.entries(Offsets).forEach(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        k = _ref8[0],
        v = _ref8[1];

    return ret[(0, _utils.getSelector)(selector, k, func)] = (0, _utils.getStyleSet)(k, '100%');
  });
  return ret;
}

function genTranslate() {
  var ret = {};
  var selector = 'translate';
  var func = 'center';
  ret[(0, _utils.getSelector)(selector, func, 'a')] = (0, _compatibleAnimation.default)({
    'transform': 'translate3d(-50%, -50%, 0)'
  });
  ret[(0, _utils.getSelector)(selector, func, 'x')] = (0, _compatibleAnimation.default)({
    'transform': 'translate3d(-50%, 0, 0)'
  });
  ret[(0, _utils.getSelector)(selector, func, 'y')] = (0, _compatibleAnimation.default)({
    'transform': 'translate3d(0, -50%, 0)'
  });
  return ret;
}

function gen(config) {
  return (0, _objectSpread2.default)({}, genPosition(config), genOffset(config), genTranslate(config));
}
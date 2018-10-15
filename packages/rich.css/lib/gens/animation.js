"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genTransitionProperty = genTransitionProperty;
exports.genTransitionDuration = genTransitionDuration;
exports.genTransitionDelay = genTransitionDelay;
exports.genTransitionTimingFunction = genTransitionTimingFunction;
exports.genAnimationCount = genAnimationCount;
exports.genAnimationDirection = genAnimationDirection;
exports.genAnimationPlayState = genAnimationPlayState;
exports.genAnimationDuration = genAnimationDuration;
exports.genAnimationDelay = genAnimationDelay;
exports.default = gen;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _utils = require("../utils");

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

var TimingFunctions = {
  'ease': true,
  'linear': true,
  'easein': 'ease-in',
  'easeout': 'ease-out',
  'easeinout': 'ease-in-out',
  'cubicbezier': 'cubic-bezier'
};
var Directions = {
  'normal': true,
  'reverse': true,
  'alternate': true,
  'alternatereverse': 'alternate-reverse'
};
var PlayStates = {
  'running': true,
  'paused': true
};
var baseSelectorTransition = 'transition';
var baseSelectorAnimation = 'animation';

function genTransitionProperty(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('animationProperty', config);
  var func = 'property';
  var selector = "".concat(baseSelectorTransition, "-").concat(func);
  Object.entries(sizes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v));
  });
  return ret;
}

function genTransitionDuration(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('animationTime', config);
  var func = 'duration';
  var selector = "".concat(baseSelectorTransition, "-").concat(func);
  Object.entries(sizes).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v));
  });
  return ret;
}

function genTransitionDelay(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('animationTime', config);
  var func = 'delay';
  var selector = "".concat(baseSelectorTransition, "-").concat(func);
  Object.entries(sizes).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v));
  });
  return ret;
}

function genTransitionTimingFunction(config) {
  var ret = {};
  var func = 'timing-function';
  var selector = "".concat(baseSelectorTransition, "-").concat(func);
  Object.entries(TimingFunctions).forEach(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        k = _ref8[0],
        v = _ref8[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v, {
      key: k
    }));
  });
  return ret;
}

function genAnimationCount(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('animationCount', config);
  var func = 'iteration-count';
  var selector = "".concat(baseSelectorAnimation, "-").concat(func);
  Object.entries(sizes).forEach(function (_ref9) {
    var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
        k = _ref10[0],
        v = _ref10[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v));
  });
  return ret;
}

function genAnimationDirection(config) {
  var ret = {};
  var func = 'direction';
  var selector = "".concat(baseSelectorAnimation, "-").concat(func);
  Object.entries(Directions).forEach(function (_ref11) {
    var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
        k = _ref12[0],
        v = _ref12[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v, {
      key: k
    }));
  });
  return ret;
}

function genAnimationPlayState(config) {
  var ret = {};
  var func = 'play-state';
  var selector = "".concat(baseSelectorAnimation, "-").concat(func);
  Object.entries(PlayStates).forEach(function (_ref13) {
    var _ref14 = (0, _slicedToArray2.default)(_ref13, 2),
        k = _ref14[0],
        v = _ref14[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v, {
      key: k
    }));
  });
  return ret;
}

function genAnimationDuration(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('animationTime', config);
  var func = 'duration';
  var selector = "".concat(baseSelectorAnimation, "-").concat(func);
  Object.entries(sizes).forEach(function (_ref15) {
    var _ref16 = (0, _slicedToArray2.default)(_ref15, 2),
        k = _ref16[0],
        v = _ref16[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v));
  });
  return ret;
}

function genAnimationDelay(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('animationTime', config);
  var func = 'delay';
  var selector = "".concat(baseSelectorAnimation, "-").concat(func);
  Object.entries(sizes).forEach(function (_ref17) {
    var _ref18 = (0, _slicedToArray2.default)(_ref17, 2),
        k = _ref18[0],
        v = _ref18[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _compatibleAnimation.default)((0, _utils.getStyleSet)(selector, v));
  });
  return ret;
}

function gen(config) {
  return (0, _objectSpread2.default)({}, genTransitionProperty(config), genTransitionDuration(config), genTransitionDelay(config), genTransitionTimingFunction(config), genAnimationCount(config), genAnimationDirection(config), genAnimationPlayState(config), genAnimationDuration(config), genAnimationDelay(config));
}
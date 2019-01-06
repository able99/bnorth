"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

function genFuncAnimation(_ref) {
  var animationProperty = _ref.animationProperty,
      animationTime = _ref.animationTime,
      animationTimingFunction = _ref.animationTimingFunction,
      animationCount = _ref.animationCount,
      animationDirection = _ref.animationDirection,
      animationPlayState = _ref.animationPlayState;
  return Object.assign((0, _utils.genClassObjects)('.transition-property', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationProperty),
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.transition-duration', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationTime),
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.transition-delay', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationTime),
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.transition-timing-function', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationTimingFunction),
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.animation-iteration-count', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationCount),
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.animation-direction', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationDirection),
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.animation-play-state', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationPlayState),
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.animation-duration', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationTime),
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.animation-delay', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationTime),
    styleObjectCompatible: _compatibleAnimation.default
  }));
}

var _default = genFuncAnimation;
exports.default = _default;
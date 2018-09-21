"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Transition = _interopRequireDefault(require("react-transition-group/Transition"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _props = require("./utils/props");

var _event = require("./utils/event");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Fade = function Fade(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$in = _genCommonProps.in,
      isIn = _genCommonProps$in === void 0 ? true : _genCommonProps$in,
      _genCommonProps$timeo = _genCommonProps.timeout,
      timeout = _genCommonProps$timeo === void 0 ? 100 : _genCommonProps$timeo,
      onTransitionFinished = _genCommonProps.onTransitionFinished,
      _genCommonProps$trans = _genCommonProps.transitionProps,
      transitionProps = _genCommonProps$trans === void 0 ? {} : _genCommonProps$trans,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["in", "timeout", "onTransitionFinished", "transitionProps"]);

  return _react.default.createElement(_Transition.default, (0, _extends2.default)({
    appear: true
  }, transitionProps, {
    in: isIn,
    timeout: timeout,
    onExited: (0, _event.createChainedFunction)(transitionProps.onExited, onTransitionFinished)
  }), function (state) {
    return _react.default.createElement(Fade._Component, (0, _extends2.default)({
      isIn: isIn,
      timeout: timeout
    }, props, {
      animationState: state
    }));
  });
};

Fade._Component = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      isIn = _genCommonProps2.isIn,
      timeout = _genCommonProps2.timeout,
      animationState = _genCommonProps2.animationState,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'div' : _genCommonProps2$comp,
      style = _genCommonProps2.style,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["isIn", "timeout", "animationState", "component", "style", "className", "children"]);

  var classSet = "opacity-".concat(animationState === 'entered' ? '100' : '0');
  var styleSet = (0, _objectSpread2.default)({}, style, (0, _animation.transiton)("".concat(timeout, "ms"), {
    property: 'opacity'
  }));
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: styleSet,
    className: (0, _props.cxm)(classSet, className)
  }, props), children);
};

var _default = Fade;
exports.default = _default;
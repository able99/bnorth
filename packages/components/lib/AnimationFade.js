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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _dom = require("./utils/dom");

var _props = _interopRequireDefault(require("./utils/props"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var AnimationFade = function AnimationFade(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      _parseProps$in = _parseProps.in,
      isIn = _parseProps$in === void 0 ? true : _parseProps$in,
      _parseProps$timeout = _parseProps.timeout,
      timeout = _parseProps$timeout === void 0 ? 100 : _parseProps$timeout,
      onTransitionFinished = _parseProps.onTransitionFinished,
      _parseProps$transitio = _parseProps.transitionProps,
      transitionProps = _parseProps$transitio === void 0 ? {} : _parseProps$transitio,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["in", "timeout", "onTransitionFinished", "transitionProps"]);

  return _react.default.createElement(_Transition.default, (0, _extends2.default)({
    appear: true
  }, transitionProps, {
    in: isIn,
    timeout: timeout,
    onExited: (0, _dom.chainedFuncs)(transitionProps.onExited, onTransitionFinished)
  }), function (state) {
    return _react.default.createElement(AnimationFade._Component, (0, _extends2.default)({
      isIn: isIn,
      timeout: timeout
    }, props, {
      animationState: state
    }));
  });
};

AnimationFade._Component = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops),
      isIn = _parseProps2.isIn,
      timeout = _parseProps2.timeout,
      animationState = _parseProps2.animationState,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? 'div' : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      style = _parseProps2.style,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isIn", "timeout", "animationState", "component", "componentPanel", "style", "className", "children"]);

  var classSet = "opacity-".concat(animationState === 'entered' ? '100' : '5');
  var styleSet = (0, _objectSpread2.default)({}, style, (0, _animation.transiton)("".concat(timeout, "ms"), {
    property: 'opacity'
  }));
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: styleSet,
    className: (0, _classes.default)(classSet, className)
  }, props), children);
};

var _default = AnimationFade;
exports.default = _default;
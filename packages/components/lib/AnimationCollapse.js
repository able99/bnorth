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

var _dom = require("./utils/dom");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
function handleEnter(aprops, elem) {
  var _ref = aprops || {},
      _ref$dimension = _ref.dimension,
      dimension = _ref$dimension === void 0 ? 'height' : _ref$dimension;

  elem.style[dimension] = '0';
}

function handleEntering(aprops, elem) {
  var _ref2 = aprops || {},
      _ref2$dimension = _ref2.dimension,
      dimension = _ref2$dimension === void 0 ? 'height' : _ref2$dimension;

  elem.style[dimension] = (0, _dom.domGetScrollDimensionValue)(elem, dimension);
}

function handleEntered(aprops, elem) {
  var _ref3 = aprops || {},
      _ref3$dimension = _ref3.dimension,
      dimension = _ref3$dimension === void 0 ? 'height' : _ref3$dimension;

  elem.style[dimension] = null;
}

function handleExit(aprops, elem) {
  var _ref4 = aprops || {},
      _ref4$dimension = _ref4.dimension,
      dimension = _ref4$dimension === void 0 ? 'height' : _ref4$dimension;

  elem.style[dimension] = (0, _dom.domGetDimensionValue)(elem, dimension) + 'px';
  (0, _dom.domTriggerBrowserReflow)(elem);
}

function handleExiting(aprops, elem) {
  var _ref5 = aprops || {},
      _ref5$dimension = _ref5.dimension,
      dimension = _ref5$dimension === void 0 ? 'height' : _ref5$dimension;

  elem.style[dimension] = '0';
}

var Collapse = function Collapse(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$in = _genCommonProps.in,
      isIn = _genCommonProps$in === void 0 ? true : _genCommonProps$in,
      _genCommonProps$timeo = _genCommonProps.timeout,
      timeout = _genCommonProps$timeo === void 0 ? 100 : _genCommonProps$timeo,
      onTransitionFinished = _genCommonProps.onTransitionFinished,
      _genCommonProps$trans = _genCommonProps.transitionProps,
      transitionProps = _genCommonProps$trans === void 0 ? {} : _genCommonProps$trans,
      onEnter = _genCommonProps.onEnter,
      onEntering = _genCommonProps.onEntering,
      onEntered = _genCommonProps.onEntered,
      onExit = _genCommonProps.onExit,
      onExiting = _genCommonProps.onExiting,
      onExited = _genCommonProps.onExited,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["in", "timeout", "onTransitionFinished", "transitionProps", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"]);

  return _react.default.createElement(_Transition.default, (0, _extends2.default)({
    appear: true
  }, transitionProps, {
    in: isIn,
    timeout: timeout,
    onEnter: (0, _event.createChainedFunction)(handleEnter.bind(null, aprops), transitionProps.onEnter),
    onEntering: (0, _event.createChainedFunction)(handleEntering.bind(null, aprops), transitionProps.onEntering),
    onEntered: (0, _event.createChainedFunction)(handleEntered.bind(null, aprops), transitionProps.onEntered),
    onExit: (0, _event.createChainedFunction)(handleExit.bind(null, aprops), transitionProps.onExit),
    onExiting: (0, _event.createChainedFunction)(handleExiting.bind(null, aprops), transitionProps.onExiting),
    onExited: (0, _event.createChainedFunction)(transitionProps.onExited, onTransitionFinished)
  }), function (state) {
    return _react.default.createElement(Collapse._Component, (0, _extends2.default)({
      isIn: isIn,
      timeout: timeout
    }, props, {
      animationState: state
    }));
  });
};

Collapse._Component = function (aprops) {
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

  var classSet = {
    'overflow-a-hidden': true,
    'display-none': !isIn & animationState === 'exited'
  };
  var styleSet = (0, _objectSpread2.default)({}, style, (0, _animation.transiton)("".concat(timeout, "ms"), {
    property: 'height'
  }));
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: styleSet,
    className: (0, _props.cxm)(classSet, className)
  }, props), children);
};

var _default = Collapse;
exports.default = _default;
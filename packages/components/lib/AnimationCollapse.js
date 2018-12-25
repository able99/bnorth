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

var _props = _interopRequireDefault(require("./utils/props"));

var _dom = require("./utils/dom");

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
  var _parseProps = (0, _props.default)(aprops),
      _parseProps$in = _parseProps.in,
      isIn = _parseProps$in === void 0 ? true : _parseProps$in,
      _parseProps$timeout = _parseProps.timeout,
      timeout = _parseProps$timeout === void 0 ? 100 : _parseProps$timeout,
      onTransitionFinished = _parseProps.onTransitionFinished,
      _parseProps$transitio = _parseProps.transitionProps,
      transitionProps = _parseProps$transitio === void 0 ? {} : _parseProps$transitio,
      onEnter = _parseProps.onEnter,
      onEntering = _parseProps.onEntering,
      onEntered = _parseProps.onEntered,
      onExit = _parseProps.onExit,
      onExiting = _parseProps.onExiting,
      onExited = _parseProps.onExited,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["in", "timeout", "onTransitionFinished", "transitionProps", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"]);

  return _react.default.createElement(_Transition.default, (0, _extends2.default)({
    appear: true
  }, transitionProps, {
    in: isIn,
    timeout: timeout,
    onEnter: (0, _dom.chainedFuncs)(handleEnter.bind(null, aprops), transitionProps.onEnter),
    onEntering: (0, _dom.chainedFuncs)(handleEntering.bind(null, aprops), transitionProps.onEntering),
    onEntered: (0, _dom.chainedFuncs)(handleEntered.bind(null, aprops), transitionProps.onEntered),
    onExit: (0, _dom.chainedFuncs)(handleExit.bind(null, aprops), transitionProps.onExit),
    onExiting: (0, _dom.chainedFuncs)(handleExiting.bind(null, aprops), transitionProps.onExiting),
    onExited: (0, _dom.chainedFuncs)(transitionProps.onExited, onTransitionFinished)
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
  var _parseProps2 = (0, _props.default)(aprops),
      isIn = _parseProps2.isIn,
      timeout = _parseProps2.timeout,
      animationState = _parseProps2.animationState,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? 'div' : _parseProps2$componen,
      style = _parseProps2.style,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isIn", "timeout", "animationState", "component", "style", "className", "children"]);

  var classSet = {
    'overflow-a-hidden': true,
    'display-none': !isIn & animationState === 'exited'
  };
  var styleSet = (0, _objectSpread2.default)({}, style, (0, _animation.transiton)("".concat(timeout, "ms"), {
    property: 'height'
  }));
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: styleSet,
    className: (0, _classes.default)(classSet, className)
  }, props), children);
};

var _default = Collapse;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
      _genCommonProps$trans = _genCommonProps.transitonProps;

  _genCommonProps$trans = _genCommonProps$trans === void 0 ? {} : _genCommonProps$trans;
  var _genCommonProps$trans2 = _genCommonProps$trans.appear,
      appear = _genCommonProps$trans2 === void 0 ? true : _genCommonProps$trans2,
      onExitedTransition = _genCommonProps$trans.onExited,
      transitonProps = (0, _objectWithoutProperties2.default)(_genCommonProps$trans, ["appear", "onExited"]),
      _genCommonProps$in = _genCommonProps.in,
      isIn = _genCommonProps$in === void 0 ? true : _genCommonProps$in,
      _genCommonProps$timeo = _genCommonProps.timeout,
      timeout = _genCommonProps$timeo === void 0 ? 100 : _genCommonProps$timeo,
      onExited = _genCommonProps.onExited,
      onEnter = _genCommonProps.onEnter,
      onEntering = _genCommonProps.onEntering,
      onEntered = _genCommonProps.onEntered,
      onExit = _genCommonProps.onExit,
      onExiting = _genCommonProps.onExiting,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      style = _genCommonProps.style,
      className = _genCommonProps.className,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["transitonProps", "in", "timeout", "onExited", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "component", "style", "className", "containerClassName", "containerStyle", "children"]);
  var styleSet = (0, _objectSpread2.default)({}, containerStyle, (0, _animation.transiton)("".concat(timeout, "ms"), {
    property: 'height'
  }));

  var classSet = function classSet(state) {
    return {
      'overflow-hidden': true,
      'display-none': !isIn & state === 'exited'
    };
  };

  return _react.default.createElement(_Transition.default, (0, _extends2.default)({
    onEnter: (0, _event.createChainedFunction)(handleEnter.bind(null, aprops), onEnter),
    onEntering: (0, _event.createChainedFunction)(handleEntering.bind(null, aprops), onEntering),
    onEntered: (0, _event.createChainedFunction)(handleEntered.bind(null, aprops), onEntered),
    onExit: (0, _event.createChainedFunction)(handleExit.bind(null, aprops), onExit),
    onExiting: (0, _event.createChainedFunction)(handleExiting.bind(null, aprops), onExiting)
  }, transitonProps, {
    in: isIn,
    timeout: timeout,
    appear: appear,
    onExited: (0, _event.createChainedFunction)(onExitedTransition, onExited),
    className: containerClassName
  }), function (state) {
    return _react.default.createElement(Component, (0, _extends2.default)({
      style: styleSet,
      className: (0, _props.cx)(classSet(state), className)
    }, props), children);
  });
};

var _default = Collapse;
exports.default = _default;
module.exports = exports["default"];
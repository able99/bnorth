"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      style = _genCommonProps.style,
      className = _genCommonProps.className,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["transitonProps", "in", "timeout", "onExited", "component", "style", "className", "containerClassName", "containerStyle", "children"]);
  var styleSet = (0, _objectSpread2.default)({}, containerStyle, (0, _animation.transiton)("".concat(timeout, "ms"), {
    property: 'opacity'
  }));

  var classSet = function classSet(state) {
    return (0, _defineProperty2.default)({}, "opacity-".concat(state === 'entered' ? '100' : '0'), true);
  };

  return _react.default.createElement(_Transition.default, (0, _extends2.default)({}, transitonProps, {
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

var _default = Fade;
exports.default = _default;
module.exports = exports["default"];
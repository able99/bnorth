"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _AnimationCollapse = _interopRequireDefault(require("./AnimationCollapse"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Notification = function Notification(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      titleProps = _parseProps.titleProps,
      hasClose = _parseProps.hasClose,
      closeProps = _parseProps.closeProps,
      iconProps = _parseProps.iconProps,
      onDoClose = _parseProps.onDoClose,
      _parseProps$transitio = _parseProps.transition,
      Transition = _parseProps$transitio === void 0 ? _AnimationCollapse.default : _parseProps$transitio,
      transitionProps = _parseProps.transitionProps,
      onTransitionFinished = _parseProps.onTransitionFinished,
      _parseProps$component = _parseProps.component,
      component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["titleProps", "hasClose", "closeProps", "iconProps", "onDoClose", "transition", "transitionProps", "onTransitionFinished", "component", "className", "children"]);

  var classStr = 'flex-display-block flex-align-center padding-a- position-absolute offset-top-start offset-left-top width-full';
  return _react.default.createElement(Transition, (0, _extends2.default)({
    component: component,
    transitionProps: transitionProps,
    onTransitionFinished: onTransitionFinished,
    "b-style": "solid",
    "b-theme": "mask",
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(Notification._Title, (0, _extends2.default)({
    title: children
  }, titleProps)), hasClose ? _react.default.createElement(Notification._Close, (0, _extends2.default)({
    hasClose: hasClose,
    onDoClose: onDoClose
  }, closeProps)) : null);
};

Notification._Title = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops),
      title = _parseProps2.title,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["title", "component", "className", "children"]);

  var classStr = 'text-weight- text-size-lg flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props), title, children);
};

Notification._Close = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops),
      hasClose = _parseProps3.hasClose,
      onDoClose = _parseProps3.onDoClose,
      iconProps = _parseProps3.iconProps,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Button.default : _parseProps3$componen,
      className = _parseProps3.className,
      children = _parseProps3.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["hasClose", "onDoClose", "iconProps", "component", "className", "children"]);

  var classStr = 'padding-h-sm padding-v-0 flex-sub-flex-none';
  return hasClose !== true ? hasClose : _react.default.createElement(Component, (0, _extends2.default)({
    "b-style": "plain",
    "b-theme": "white",
    onClick: onDoClose,
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(_Icon.default, (0, _extends2.default)({
    name: "close",
    defaultName: "x"
  }, iconProps)), children);
};

var _default = Notification;
exports.default = _default;
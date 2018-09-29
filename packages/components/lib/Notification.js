"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

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
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      titleProps = _genCommonProps.titleProps,
      hasClose = _genCommonProps.hasClose,
      closeProps = _genCommonProps.closeProps,
      iconProps = _genCommonProps.iconProps,
      onDoClose = _genCommonProps.onDoClose,
      _genCommonProps$trans = _genCommonProps.transition,
      Transition = _genCommonProps$trans === void 0 ? _AnimationCollapse.default : _genCommonProps$trans,
      transitionProps = _genCommonProps.transitionProps,
      onTransitionFinished = _genCommonProps.onTransitionFinished,
      _genCommonProps$compo = _genCommonProps.component,
      component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      className = _genCommonProps.className,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["titleProps", "hasClose", "closeProps", "iconProps", "onDoClose", "transition", "transitionProps", "onTransitionFinished", "component", "className", "children"]);

  var classStr = 'flex-display-block flex-align-center padding-a- position-absolute offset-top-start offset-left-top width-full';
  return _react.default.createElement(Transition, (0, _extends2.default)({
    component: component,
    transitionProps: transitionProps,
    onTransitionFinished: onTransitionFinished,
    "b-style": "solid",
    "b-theme": "mask",
    className: (0, _props.cxm)(classStr, className)
  }, props), _react.default.createElement(Notification._Title, (0, _extends2.default)({
    title: children
  }, titleProps)), hasClose ? _react.default.createElement(Notification._Close, (0, _extends2.default)({
    hasClose: hasClose,
    onDoClose: onDoClose
  }, closeProps)) : null);
};

Notification._Title = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      title = _genCommonProps2.title,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Panel.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["title", "component", "className", "children"]);

  var classStr = 'text-weight- text-size-lg flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), title, children);
};

Notification._Close = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      hasClose = _genCommonProps3.hasClose,
      onDoClose = _genCommonProps3.onDoClose,
      iconProps = _genCommonProps3.iconProps,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Button.default : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["hasClose", "onDoClose", "iconProps", "component", "className", "children"]);

  var classStr = 'padding-h-sm padding-v-0 flex-sub-flex-none';
  return hasClose !== true ? hasClose : _react.default.createElement(Component, (0, _extends2.default)({
    "b-style": "plain",
    "b-theme": "white",
    onClick: onDoClose,
    className: (0, _props.cxm)(classStr, className)
  }, props), _react.default.createElement(_Icon.default, (0, _extends2.default)({
    name: "close",
    nameDefault: "x"
  }, iconProps)), children);
};

var _default = Notification;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

var _AnimationCollapse = _interopRequireDefault(require("./AnimationCollapse"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Notification = function Notification(aprops) {
  var _classSetContaienr;

  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      title = _genCommonProps.title,
      hasClose = _genCommonProps.hasClose,
      _genCommonProps$close = _genCommonProps.closeProps;

  _genCommonProps$close = _genCommonProps$close === void 0 ? {} : _genCommonProps$close;
  var closeClassName = _genCommonProps$close.closeClassName,
      _genCommonProps$close2 = _genCommonProps$close.closeTheme,
      closeTheme = _genCommonProps$close2 === void 0 ? "white" : _genCommonProps$close2,
      _genCommonProps$close3 = _genCommonProps$close.closeStyle,
      closeStyle = _genCommonProps$close3 === void 0 ? "plain" : _genCommonProps$close3,
      closeProps = (0, _objectWithoutProperties2.default)(_genCommonProps$close, ["closeClassName", "closeTheme", "closeStyle"]),
      onClose = _genCommonProps.onClose,
      transitonProps = _genCommonProps.transitonProps,
      _genCommonProps$in = _genCommonProps.in,
      isIn = _genCommonProps$in === void 0 ? true : _genCommonProps$in,
      timeout = _genCommonProps.timeout,
      onExited = _genCommonProps.onExited,
      _genCommonProps$Trans = _genCommonProps.Transition,
      Transition = _genCommonProps$Trans === void 0 ? _AnimationCollapse.default : _genCommonProps$Trans,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      ontainerClassName = _genCommonProps.ontainerClassName,
      containerStyle = _genCommonProps.containerStyle,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["title", "hasClose", "closeProps", "onClose", "transitonProps", "in", "timeout", "onExited", "Transition", "component", "className", "ontainerClassName", "containerStyle", "cTheme", "cStyle", "cSize", "children"]);
  var classSetContaienr = (_classSetContaienr = {
    'flex-display-flex': true,
    'flex-align-center': true,
    'padding': true,
    'position-relative': true,
    'width-full': true
  }, (0, _defineProperty2.default)(_classSetContaienr, 'text-size' + cSize, cSize), (0, _defineProperty2.default)(_classSetContaienr, 'bg-color-white', cStyle === 'hollow'), (0, _defineProperty2.default)(_classSetContaienr, 'border-color-' + (cTheme || 'component'), cStyle === 'hollow'), (0, _defineProperty2.default)(_classSetContaienr, 'text-color-' + (cTheme || 'normal'), cStyle === 'hollow'), (0, _defineProperty2.default)(_classSetContaienr, 'bg-color-' + (cTheme || 'mask'), cStyle !== 'hollow'), (0, _defineProperty2.default)(_classSetContaienr, 'text-color-white', cStyle !== 'hollow'), _classSetContaienr);
  var classSet = {
    'flex-sub-flex-extend': true
  };
  var classSetClose = {
    'padding-xs': true,
    'flex-sub-flex-none': true
  };
  return _react.default.createElement(Transition, (0, _extends2.default)({
    className: (0, _props.cx)(classSetContaienr, ontainerClassName),
    transitonProps: transitonProps,
    in: isIn,
    timeout: timeout,
    onExited: onExited
  }, props), _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), title && typeof title === 'string' ? _react.default.createElement("big", null, _react.default.createElement("strong", null, title)) : title, children), hasClose ? _react.default.createElement(_Button.default, (0, _extends2.default)({
    cTheme: closeTheme,
    cStyle: closeStyle,
    className: (0, _props.cx)(classSetClose, closeClassName),
    onClick: onClose
  }, closeProps), _react.default.createElement(_Icon.default, {
    name: _Icon.default.getName('close', 'x')
  })) : null);
};

var _default = Notification;
exports.default = _default;
module.exports = exports["default"];
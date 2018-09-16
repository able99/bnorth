"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _touchable = _interopRequireDefault(require("./hocs/touchable"));

var _props = require("./utils/props");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Panel = function Panel(aprops) {
  var _classSet;

  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      main = _genCommonProps.main,
      inline = _genCommonProps.inline,
      aspect = _genCommonProps.aspect,
      aspectProps = _genCommonProps.aspectProps,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      style = _genCommonProps.style,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["main", "inline", "aspect", "aspectProps", "component", "className", "style", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'position-relative';
  var classSet = (_classSet = {
    'scrollable': main,
    'flex-sub-flex-extend': main,
    'display-block-inline': inline
  }, (0, _defineProperty2.default)(_classSet, 'text-size-' + (bSize === true ? '' : bSize), bSize), (0, _defineProperty2.default)(_classSet, 'text-color-' + (bTheme === true ? '' : bTheme), bTheme), _classSet);
  var styleSet = {
    paddingBottom: "".concat(aspect * 100, "%")
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), aspect && children ? _react.default.createElement(Panel.Aspect, aspectProps, children) : children);
};

Panel.Aspect = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      main = _genCommonProps2.main,
      aspect = _genCommonProps2.aspect,
      aspectProps = _genCommonProps2.aspectProps,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'div' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      style = _genCommonProps2.style,
      _genCommonProps2$bTh = _genCommonProps2['b-theme'],
      bTheme = _genCommonProps2$bTh === void 0 ? 'view' : _genCommonProps2$bTh,
      bStyle = _genCommonProps2['b-style'],
      bSize = _genCommonProps2['b-size'],
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["main", "aspect", "aspectProps", "component", "className", "style", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'position-absolute offset-left-start offset-top-start square-full';
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: style,
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

Panel.Touchable = (0, _touchable.default)(Panel);
var _default = Panel;
exports.default = _default;
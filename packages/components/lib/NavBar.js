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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Icon"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var NavBar = function NavBar(aprops) {
  var _parseProps = (0, _props.default)(aprops, NavBar.props),
      statusbarOverlay = _parseProps.statusbarOverlay,
      hidden = _parseProps.hidden,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      _parseProps$component2 = _parseProps.componentPanel,
      componentPanel = _parseProps$component2 === void 0 ? 'nav' : _parseProps$component2,
      className = _parseProps.className,
      style = _parseProps.style,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["statusbarOverlay", "hidden", "component", "componentPanel", "className", "style"]);

  if (hidden) return null;
  var classStr = 'flex-display-block flex-justify-around flex-align-center width-full padding-v-sm border-set-bottom-';
  var styleSet = {};
  if (statusbarOverlay) styleSet.paddingTop = statusbarOverlay === true ? 20 : statusbarOverlay;
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props));
};

NavBar.Title = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, NavBar.Title.props),
      isFullOrCenter = _parseProps2.isFullOrCenter,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isFullOrCenter", "component", "componentPanel", "className", "children"]);

  var classStr = 'text-align-center flex-sub-flex-extend text-weight-bold text-size-xl';
  return isFullOrCenter ? _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    inline: true,
    className: (0, _classes.default)(classStr, className)
  }, props), children) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    inline: true,
    className: (0, _classes.default)(classStr, className, 'position-absolute')
  }, props), children), _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    inline: true,
    className: (0, _classes.default)(classStr, className, 'visibility-hide')
  }, props), "0"));
};

NavBar.Item = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops, NavBar.Item.props),
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default.Icon : _parseProps3$componen,
      componentPanel = _parseProps3.componentPanel,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["component", "componentPanel", "className"]);

  var classStr = 'padding-h-sm flex-sub-flex-none cursor-pointer status-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

var _default = NavBar;
exports.default = _default;
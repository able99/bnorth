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

var _props = require("./utils/props");

var _Panel = _interopRequireDefault(require("./Panel.Icon"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var NavBar = function NavBar(aprops) {
  if (NavBar.hidden) return null;

  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$statu = _genCommonProps.statusbarOverlay,
      statusbarOverlay = _genCommonProps$statu === void 0 ? NavBar.statusbarOverlay : _genCommonProps$statu,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      _genCommonProps$compo2 = _genCommonProps.componentPanel,
      componentPanel = _genCommonProps$compo2 === void 0 ? 'nav' : _genCommonProps$compo2,
      className = _genCommonProps.className,
      style = _genCommonProps.style,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["statusbarOverlay", "component", "componentPanel", "className", "style", "children"]);

  var classStr = 'flex-display-block flex-justify-around flex-align-center width-full padding-v-sm border-set-bottom-';
  var styleSet = {};
  if (statusbarOverlay) styleSet.paddingTop = statusbarOverlay === true ? 20 : statusbarOverlay;
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _props.cxm)(classStr, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props), children);
};

var NavBarTitle = function NavBarTitle(aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Panel.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["component", "className", "children"]);

  var classStr = 'text-align-center flex-sub-flex-extend text-weight-bold text-size-xl';
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Component, (0, _extends2.default)({
    inline: true,
    className: (0, _props.cxm)(classStr, className, 'position-absolute')
  }, props), children), _react.default.createElement(Component, (0, _extends2.default)({
    inline: true,
    className: (0, _props.cxm)(classStr, className, 'visibility-hide')
  }, props), "0"));
};

var NavBarItem = function NavBarItem(aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Panel.default.Icon : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["component", "className", "children"]);

  var classStr = 'padding-h-sm cursor-pointer line-height-0 status';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

NavBar.Title = NavBarTitle;
NavBar.Item = NavBarItem;
var _default = NavBar;
exports.default = _default;
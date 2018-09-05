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

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var NavBar = function NavBar(aprops) {
  var _classSet;

  if (NavBar.hidden) return null;

  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'nav' : _genCommonProps$compo,
      className = _genCommonProps.className,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      _genCommonProps$statu = _genCommonProps.statusbar,
      statusbar = _genCommonProps$statu === void 0 ? NavBar.statusbar : _genCommonProps$statu,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      _genCommonProps$style = _genCommonProps.style,
      style = _genCommonProps$style === void 0 ? {} : _genCommonProps$style,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["component", "className", "containerClassName", "containerStyle", "statusbar", "cTheme", "cStyle", "cSize", "style", "children"]);

  var classSet = (_classSet = {
    'flex-display-flex': true,
    'flex-justify-around': true,
    'flex-align-center': true,
    'width-full': true,
    'padding-v-sm': !(0, _props.hascx)(className, 'padding'),
    'border-set-bottom-border': !cStyle && !(0, _props.hascx)(className, 'border')
  }, (0, _defineProperty2.default)(_classSet, 'text-size-' + cSize, cSize), (0, _defineProperty2.default)(_classSet, "bg-color-".concat(cTheme || 'component'), cStyle !== 'hollow'), (0, _defineProperty2.default)(_classSet, 'bg-color-white', cStyle === 'hollow'), (0, _defineProperty2.default)(_classSet, 'border-set-' + cTheme || 'border', cStyle === 'hollow'), (0, _defineProperty2.default)(_classSet, 'text-color-white', cStyle === 'solid'), (0, _defineProperty2.default)(_classSet, 'text-color-' + (cTheme || 'normal'), cStyle !== 'solid'), _classSet);
  if (statusbar) style.paddingTop = 20;
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className),
    style: style
  }, props), children);
};

var NavBarTitle = function NavBarTitle(aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'span' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      cTheme = _genCommonProps2.cTheme,
      cStyle = _genCommonProps2.cStyle,
      cSize = _genCommonProps2.cSize,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["component", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = {
    'text-align-center': !(0, _props.hascx)(className, 'text-align'),
    'flex-sub-flex-extend': !(0, _props.hascx)(className, 'flex-sub-flex')
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className, 'position-absolute')
  }, props), typeof children === 'string' ? _react.default.createElement("big", null, _react.default.createElement("big", null, _react.default.createElement("strong", null, children))) : children), _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className, 'visibility-hide')
  }, props), typeof children === 'string' ? _react.default.createElement("big", null, _react.default.createElement("big", null, _react.default.createElement("strong", null, children))) : children));
};

var NavBarItem = function NavBarItem(aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      title = _genCommonProps3.title,
      icon = _genCommonProps3.icon,
      src = _genCommonProps3.src,
      badge = _genCommonProps3.badge,
      _genCommonProps3$icon = _genCommonProps3.iconProps,
      iconProps = _genCommonProps3$icon === void 0 ? {} : _genCommonProps3$icon,
      _genCommonProps3$titl = _genCommonProps3.titleProps,
      titleProps = _genCommonProps3$titl === void 0 ? {} : _genCommonProps3$titl,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? 'span' : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      containerClassName = _genCommonProps3.containerClassName,
      containerStyle = _genCommonProps3.containerStyle,
      cTheme = _genCommonProps3.cTheme,
      cStyle = _genCommonProps3.cStyle,
      cSize = _genCommonProps3.cSize,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["title", "icon", "src", "badge", "iconProps", "titleProps", "component", "className", "containerClassName", "containerStyle", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = {
    'text-align-center': !(0, _props.hascx)(className, 'text-align'),
    'padding-h-sm': !(0, _props.hascx)(className, 'padding'),
    'cursor-pointer': true
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), icon || src ? _react.default.createElement(_Icon.default, (0, _extends2.default)({}, iconProps, {
    name: icon,
    src: src
  })) : null, title ? _react.default.createElement("span", titleProps, title) : null, children);
};

NavBar.Title = NavBarTitle;
NavBar.Item = NavBarItem;
var _default = NavBar;
exports.default = _default;
module.exports = exports["default"];
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

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
_Panel.default.Icon = function (aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      titleProps = _genCommonProps.titleProps,
      _genCommonProps$iconP = _genCommonProps.iconPosition,
      iconPosition = _genCommonProps$iconP === void 0 ? 'left' : _genCommonProps$iconP,
      selected = _genCommonProps.selected,
      icon = _genCommonProps.icon,
      iconSelected = _genCommonProps.iconSelected,
      src = _genCommonProps.src,
      srcSelected = _genCommonProps.srcSelected,
      iconProps = _genCommonProps.iconProps,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      className = _genCommonProps.className,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["titleProps", "iconPosition", "selected", "icon", "iconSelected", "src", "srcSelected", "iconProps", "component", "className", "children"]);

  var classStr = 'flex-display-block flex-justify-center flex-align-center';
  var classSet = [];
  if (iconPosition === 'top' || iconPosition === 'bottom') classSet.push('flex-direction-v');
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), iconPosition === 'right' || iconPosition === 'bottom' ? _react.default.createElement(_Panel.default.Icon._Title, (0, _extends2.default)({
    iconPosition: iconPosition
  }, titleProps), children) : null, _react.default.createElement(_Panel.default.Icon._Icon, (0, _extends2.default)({
    selected: selected,
    icon: icon,
    iconSelected: iconSelected,
    src: src,
    srcSelected: srcSelected
  }, iconProps)), iconPosition === 'left' || iconPosition === 'top' ? _react.default.createElement(_Panel.default.Icon._Title, (0, _extends2.default)({
    iconPosition: iconPosition
  }, titleProps), children) : null);
};

_Panel.default.Icon._Icon = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      selected = _genCommonProps2.selected,
      icon = _genCommonProps2.icon,
      iconSelected = _genCommonProps2.iconSelected,
      src = _genCommonProps2.src,
      srcSelected = _genCommonProps2.srcSelected,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Icon.default : _genCommonProps2$comp,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["selected", "icon", "iconSelected", "src", "srcSelected", "component"]);

  return icon || src ? _react.default.createElement(Component, (0, _extends2.default)({
    name: selected && iconSelected ? iconSelected : icon,
    src: selected && srcSelected ? srcSelected : src
  }, props)) : null;
};

_Panel.default.Icon._Title = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      iconPosition = _genCommonProps3.iconPosition,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Panel.default : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["iconPosition", "component", "className", "children"]);

  var classStr = 'text-truncate position-relative';
  var classSet = [];
  if (iconPosition === 'top' || iconPosition === 'bottom') classSet.push('text-align-center');
  return children ? _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), children) : null;
};

var _default = _Panel.default;
exports.default = _default;
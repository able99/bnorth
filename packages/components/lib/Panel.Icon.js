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

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
_Panel.default.Icon = function (aprops) {
  var _parseProps = (0, _props.default)(aprops),
      titleProps = _parseProps.titleProps,
      _parseProps$iconPosit = _parseProps.iconPosition,
      iconPosition = _parseProps$iconPosit === void 0 ? 'left' : _parseProps$iconPosit,
      selected = _parseProps.selected,
      icon = _parseProps.icon,
      iconSelected = _parseProps.iconSelected,
      src = _parseProps.src,
      srcSelected = _parseProps.srcSelected,
      iconProps = _parseProps.iconProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["titleProps", "iconPosition", "selected", "icon", "iconSelected", "src", "srcSelected", "iconProps", "component", "className", "children"]);

  var classStr = 'flex-display-block flex-justify-center flex-align-center';
  var classSet = [];
  if (iconPosition === 'top' || iconPosition === 'bottom') classSet.push('flex-direction-v');
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, classSet, className)
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
  var _parseProps2 = (0, _props.default)(aprops),
      selected = _parseProps2.selected,
      icon = _parseProps2.icon,
      iconSelected = _parseProps2.iconSelected,
      src = _parseProps2.src,
      srcSelected = _parseProps2.srcSelected,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Icon.default : _parseProps2$componen,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["selected", "icon", "iconSelected", "src", "srcSelected", "component"]);

  return icon || src ? _react.default.createElement(Component, (0, _extends2.default)({
    name: selected && iconSelected ? iconSelected : icon,
    src: selected && srcSelected ? srcSelected : src
  }, props)) : null;
};

_Panel.default.Icon._Title = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops),
      iconPosition = _parseProps3.iconPosition,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      className = _parseProps3.className,
      children = _parseProps3.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["iconPosition", "component", "className", "children"]);

  var classStr = 'text-truncate position-relative';
  var classSet = [];
  if (iconPosition === 'top' || iconPosition === 'bottom') classSet.push('text-align-center');
  return children ? _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props), children) : null;
};

var _default = _Panel.default;
exports.default = _default;
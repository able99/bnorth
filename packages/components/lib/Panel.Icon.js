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
  var _parseProps = (0, _props.default)(aprops, _Panel.default.Icon.props),
      _parseProps$position = _parseProps.position,
      position = _parseProps$position === void 0 ? 'left' : _parseProps$position,
      selected = _parseProps.selected,
      icon = _parseProps.icon,
      iconSelected = _parseProps.iconSelected,
      src = _parseProps.src,
      srcSelected = _parseProps.srcSelected,
      shape = _parseProps.shape,
      shapeSelected = _parseProps.shapeSelected,
      char = _parseProps.char,
      charSelected = _parseProps.charSelected,
      iconProps = _parseProps.iconProps,
      titleProps = _parseProps.titleProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["position", "selected", "icon", "iconSelected", "src", "srcSelected", "shape", "shapeSelected", "char", "charSelected", "iconProps", "titleProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'flex-display-block flex-justify-center flex-align-center';
  var classSet = position === 'top' || position === 'bottom' ? 'flex-direction-v' : '';
  var ctitle = children ? _react.default.createElement(_Panel.default.Icon._Title, (0, _extends2.default)({
    position: position
  }, titleProps), children) : null;
  var cicon = position ? _react.default.createElement(_Panel.default.Icon._Icon, (0, _extends2.default)({
    name: selected && iconSelected ? iconSelected : icon,
    src: selected && srcSelected ? srcSelected : src,
    shape: selected && shapeSelected ? shapeSelected : shape,
    char: selected && charSelected ? charSelected : char
  }, iconProps)) : null;
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    selected: selected,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), position === 'right' || position === 'bottom' ? ctitle : null, cicon, position === 'left' || position === 'top' ? ctitle : null);
};

_Panel.default.Icon._Icon = _Icon.default;

_Panel.default.Icon._Title = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Panel.default.Icon._Title.porps),
      position = _parseProps2.position,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["position", "component", "componentPanel", "className"]);

  var classStr = 'text-truncate position-relative';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

var _default = _Panel.default;
exports.default = _default;
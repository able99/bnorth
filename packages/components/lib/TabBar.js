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
var TabBar = function TabBar(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      onAction = _genCommonProps.onAction,
      onClick = _genCommonProps.onClick,
      itemProps = _genCommonProps.itemProps,
      _genCommonProps$itemG = _genCommonProps.itemGetClassName,
      itemGetClassName = _genCommonProps$itemG === void 0 ? TabBar.itemGetClassName : _genCommonProps$itemG,
      _genCommonProps$itemG2 = _genCommonProps.itemGetStyle,
      itemGetStyle = _genCommonProps$itemG2 === void 0 ? TabBar.itemGetStyle : _genCommonProps$itemG2,
      _genCommonProps$itemG3 = _genCommonProps.itemGetProps,
      itemGetProps = _genCommonProps$itemG3 === void 0 ? TabBar.itemGetProps : _genCommonProps$itemG3,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'nav' : _genCommonProps$compo,
      className = _genCommonProps.className,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["onAction", "onClick", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", 'b-theme', 'b-style', 'b-size', "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  });
  var classStr = 'flex-display-block flex-justify-around flex-align-stretch width-full padding-v-sm border-set-top-border';
  var classSet = [];
  if (bSize) classSet.push('text-size-' + (bSize === true ? '' : bSize));
  if (bStyle === 'solid') classSet.push('bg-color-' + (bTheme === true ? '' : bTheme || 'component'));
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), children.map(function (v, i, a) {
    return _react.default.createElement(TabBar.Item, (0, _extends2.default)({
      key: i,
      "b-theme": bTheme,
      "b-style": bStyle,
      "b-size": bSize
    }, (0, _props.getSubComponentProps)(i, a.length, aprops, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps)));
  }));
};

TabBar.Item = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      selected = _genCommonProps2.selected,
      eventKey = _genCommonProps2.eventKey,
      title = _genCommonProps2.title,
      titleProps = _genCommonProps2.titleProps,
      icon = _genCommonProps2.icon,
      iconSelected = _genCommonProps2.iconSelected,
      src = _genCommonProps2.src,
      srcSelected = _genCommonProps2.srcSelected,
      iconProps = _genCommonProps2.iconProps,
      _genCommonProps2$colo = _genCommonProps2.colorUnactive,
      colorUnactive = _genCommonProps2$colo === void 0 ? 'disable' : _genCommonProps2$colo,
      _genCommonProps2$colo2 = _genCommonProps2.colorActiveOnTheme,
      colorActiveOnTheme = _genCommonProps2$colo2 === void 0 ? 'white' : _genCommonProps2$colo2,
      colorUnactiveOnTheme = _genCommonProps2.colorUnactiveOnTheme,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'span' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      bTheme = _genCommonProps2['b-theme'],
      bStyle = _genCommonProps2['b-style'],
      bSize = _genCommonProps2['b-size'],
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["selected", "eventKey", "title", "titleProps", "icon", "iconSelected", "src", "srcSelected", "iconProps", "colorUnactive", "colorActiveOnTheme", "colorUnactiveOnTheme", "component", "className", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'position-relative cursor-pointer text-align-center flex-display-block flex-direction-v flex-justify-around flex-align-center flex-sub-flex-extend status-';
  var classSet = [];
  if (bSize) classSet.push('text-size-' + (bSize === true ? '' : bSize));

  if (bStyle === 'solid' && bTheme) {
    if (selected && colorActiveOnTheme) classSet.push('text-color-' + (colorActiveOnTheme === true ? '' : colorActiveOnTheme));
    if (!selected && colorUnactiveOnTheme) classSet.push('text-color-' + (colorUnactiveOnTheme === true ? '' : colorUnactiveOnTheme));
  } else if (bStyle === 'solid' && !bTheme) {
    if (!selected) classSet.push('text-color-' + (colorUnactive === true ? '' : colorUnactive));
  } else if (bTheme) {
    if (selected) classSet.push('text-color-' + (bTheme === true ? '' : bTheme));
    if (!selected && colorUnactiveOnTheme) classSet.push('text-color-' + (colorUnactiveOnTheme === true ? '' : colorUnactiveOnTheme));
  } else {
    if (!selected) classSet.push('text-color-' + (colorUnactive === true ? '' : colorUnactive));
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), _react.default.createElement(TabBar.Item.Icon, (0, _extends2.default)({
    selected: selected,
    icon: icon,
    iconSelected: iconSelected,
    src: src,
    srcSelected: srcSelected
  }, iconProps)), _react.default.createElement(TabBar.Item.Title, (0, _extends2.default)({
    selected: selected,
    title: title
  }, titleProps)), children);
};

TabBar.Item.Icon = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      selected = _genCommonProps3.selected,
      icon = _genCommonProps3.icon,
      iconSelected = _genCommonProps3.iconSelected,
      src = _genCommonProps3.src,
      srcSelected = _genCommonProps3.srcSelected,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Icon.default : _genCommonProps3$comp,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["selected", "icon", "iconSelected", "src", "srcSelected", "component"]);

  return icon || src ? _react.default.createElement(Component, (0, _extends2.default)({
    name: selected && iconSelected ? iconSelected : icon,
    src: selected && srcSelected ? srcSelected : src
  }, props)) : null;
};

TabBar.Item.Title = function (aprops) {
  var _genCommonProps4 = (0, _props.genCommonProps)(aprops),
      selected = _genCommonProps4.selected,
      title = _genCommonProps4.title,
      _genCommonProps4$comp = _genCommonProps4.component,
      Component = _genCommonProps4$comp === void 0 ? _Panel.default : _genCommonProps4$comp,
      className = _genCommonProps4.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["selected", "title", "component", "className"]);

  var classStr = 'text-truncate position-relative';
  return title ? _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), title) : null;
};

var _default = TabBar;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Container"));

require("./Panel.Icon");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var TabBar = function TabBar(aprops) {
  var _parseProps = (0, _props.default)(aprops, TabBar.props),
      colorUnselected = _parseProps.colorUnselected,
      colorSelectedOnTheme = _parseProps.colorSelectedOnTheme,
      colorUnselectedOnTheme = _parseProps.colorUnselectedOnTheme,
      _parseProps$type = _parseProps.type,
      type = _parseProps$type === void 0 ? "justify" : _parseProps$type,
      _parseProps$itemCompo = _parseProps.itemComponent,
      itemComponent = _parseProps$itemCompo === void 0 ? _Panel.default.Icon : _parseProps$itemCompo,
      itemProps = _parseProps.itemProps,
      _parseProps$itemGetCl = _parseProps.itemGetClassName,
      itemGetClassName = _parseProps$itemGetCl === void 0 ? TabBar._itemGetClassName : _parseProps$itemGetCl,
      _parseProps$itemGetSt = _parseProps.itemGetStyle,
      itemGetStyle = _parseProps$itemGetSt === void 0 ? TabBar._itemGetStyle : _parseProps$itemGetSt,
      _parseProps$itemGetPr = _parseProps.itemGetProps,
      itemGetProps = _parseProps$itemGetPr === void 0 ? TabBar._itemGetProps : _parseProps$itemGetPr,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default.Container : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["colorUnselected", "colorSelectedOnTheme", "colorUnselectedOnTheme", "type", "itemComponent", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "componentPanel", "className"]);

  var classStr = 'width-full padding-top-sm padding-bottom-xs border-set-top-border';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    type: type,
    containerProps: aprops,
    itemComponent: itemComponent,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

TabBar._itemGetProps = function (i, length, containerProps) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      selected = _ref.selected;

  var _TabBar$props$contain = (0, _objectSpread2.default)({}, TabBar.props, containerProps),
      bStyle = _TabBar$props$contain['b-style'],
      bTheme = _TabBar$props$contain['b-theme'],
      _TabBar$props$contain2 = _TabBar$props$contain.colorUnselected,
      colorUnselected = _TabBar$props$contain2 === void 0 ? 'disable' : _TabBar$props$contain2,
      _TabBar$props$contain3 = _TabBar$props$contain.colorSelectedOnTheme,
      colorSelectedOnTheme = _TabBar$props$contain3 === void 0 ? 'white' : _TabBar$props$contain3,
      _TabBar$props$contain4 = _TabBar$props$contain.colorUnselectedOnTheme,
      colorUnselectedOnTheme = _TabBar$props$contain4 === void 0 ? 'disable' : _TabBar$props$contain4;

  var theme;

  if (bStyle === 'solid') {
    if (bTheme) {
      if (selected && colorSelectedOnTheme) theme = colorSelectedOnTheme;
      if (!selected && colorUnselectedOnTheme) theme = colorUnselectedOnTheme;
    } else {
      if (!selected && colorUnselected) theme = colorUnselected;
    }
  } else {
    if (bTheme) {
      if (selected) theme = bTheme;
      if (!selected && colorUnselectedOnTheme) theme = colorUnselectedOnTheme;
    } else {
      if (!selected) theme = colorUnselected;
    }
  }

  return {
    iconPosition: 'top',
    'bc-cursor-pointer': true,
    'bc-status-': true,
    'b-theme': theme
  };
};

TabBar.Item = _Panel.default.Container.Item;
var _default = TabBar;
exports.default = _default;
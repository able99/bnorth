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

var _Panel = _interopRequireDefault(require("./Panel.Container"));

require("./Panel.Icon");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var TabBar = function TabBar(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      colorUnselected = _genCommonProps.colorUnselected,
      colorSelectedOnTheme = _genCommonProps.colorSelectedOnTheme,
      colorUnselectedOnTheme = _genCommonProps.colorUnselectedOnTheme,
      _genCommonProps$type = _genCommonProps.type,
      type = _genCommonProps$type === void 0 ? "justify" : _genCommonProps$type,
      _genCommonProps$itemC = _genCommonProps.itemComponent,
      itemComponent = _genCommonProps$itemC === void 0 ? _Panel.default.Icon : _genCommonProps$itemC,
      _genCommonProps$itemP = _genCommonProps.itemProps,
      itemProps = _genCommonProps$itemP === void 0 ? {} : _genCommonProps$itemP,
      _genCommonProps$itemG = _genCommonProps.itemGetClassName,
      itemGetClassName = _genCommonProps$itemG === void 0 ? TabBar.itemGetClassName : _genCommonProps$itemG,
      _genCommonProps$itemG2 = _genCommonProps.itemGetStyle,
      itemGetStyle = _genCommonProps$itemG2 === void 0 ? TabBar.itemGetStyle : _genCommonProps$itemG2,
      _genCommonProps$itemG3 = _genCommonProps.itemGetProps,
      itemGetProps = _genCommonProps$itemG3 === void 0 ? TabBar.itemGetProps : _genCommonProps$itemG3,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Panel.default.Container : _genCommonProps$compo,
      className = _genCommonProps.className,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["colorUnselected", "colorSelectedOnTheme", "colorUnselectedOnTheme", "type", "itemComponent", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", "children"]);

  var classStr = 'width-full padding-top-sm padding-bottom-xs border-set-top-border';
  itemProps.iconPosition = 'top';
  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  });
  return _react.default.createElement(Component, (0, _extends2.default)({
    type: type,
    containerProps: aprops,
    itemComponent: itemComponent,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

TabBar.itemGetProps = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      bStyle = _ref['b-style'],
      bTheme = _ref['b-theme'],
      _ref$colorUnselected = _ref.colorUnselected,
      colorUnselected = _ref$colorUnselected === void 0 ? 'disable' : _ref$colorUnselected,
      _ref$colorSelectedOnT = _ref.colorSelectedOnTheme,
      colorSelectedOnTheme = _ref$colorSelectedOnT === void 0 ? 'white' : _ref$colorSelectedOnT,
      colorUnselectedOnTheme = _ref.colorUnselectedOnTheme;

  var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      selected = _ref2.selected;

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
    'b-theme': theme
  };
};

TabBar.Item = _Panel.default.Container.Item;
var _default = TabBar;
exports.default = _default;
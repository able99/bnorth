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

var _Panel = _interopRequireDefault(require("./Panel.Container"));

require("./Panel.Icon");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var TabBar = function TabBar(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      colorUnselected = _parseProps.colorUnselected,
      colorSelectedOnTheme = _parseProps.colorSelectedOnTheme,
      colorUnselectedOnTheme = _parseProps.colorUnselectedOnTheme,
      _parseProps$type = _parseProps.type,
      type = _parseProps$type === void 0 ? "justify" : _parseProps$type,
      _parseProps$itemCompo = _parseProps.itemComponent,
      itemComponent = _parseProps$itemCompo === void 0 ? _Panel.default.Icon : _parseProps$itemCompo,
      _parseProps$itemProps = _parseProps.itemProps,
      itemProps = _parseProps$itemProps === void 0 ? {} : _parseProps$itemProps,
      _parseProps$itemGetCl = _parseProps.itemGetClassName,
      itemGetClassName = _parseProps$itemGetCl === void 0 ? TabBar.itemGetClassName : _parseProps$itemGetCl,
      _parseProps$itemGetSt = _parseProps.itemGetStyle,
      itemGetStyle = _parseProps$itemGetSt === void 0 ? TabBar.itemGetStyle : _parseProps$itemGetSt,
      _parseProps$itemGetPr = _parseProps.itemGetProps,
      itemGetProps = _parseProps$itemGetPr === void 0 ? TabBar.itemGetProps : _parseProps$itemGetPr,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default.Container : _parseProps$component,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["colorUnselected", "colorSelectedOnTheme", "colorUnselectedOnTheme", "type", "itemComponent", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", "children"]);

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
    className: (0, _classes.default)(classStr, className)
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
      _ref$colorUnselectedO = _ref.colorUnselectedOnTheme,
      colorUnselectedOnTheme = _ref$colorUnselectedO === void 0 ? 'disable' : _ref$colorUnselectedO;

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
    'bc-cursor-pointer': true,
    'b-theme': theme
  };
};

TabBar.Item = _Panel.default.Container.Item;
var _default = TabBar;
exports.default = _default;
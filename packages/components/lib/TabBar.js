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
 * @module
 */
// TabBar
// -----------------------

/**
 * 标签页导航条组件
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer
 * @exportdefault
 */
var TabBar = function TabBar(aprops) {
  var _parseProps = (0, _props.default)(aprops, TabBar.props),
      _parseProps$type = _parseProps.type,
      type = _parseProps$type === void 0 ? "justify" : _parseProps$type,
      itemProps = _parseProps.itemProps,
      _parseProps$itemGetCl = _parseProps.itemGetClassName,
      itemGetClassName = _parseProps$itemGetCl === void 0 ? TabBar.itemGetClassName : _parseProps$itemGetCl,
      _parseProps$itemGetSt = _parseProps.itemGetStyle,
      itemGetStyle = _parseProps$itemGetSt === void 0 ? TabBar.itemGetStyle : _parseProps$itemGetSt,
      _parseProps$itemGetPr = _parseProps.itemGetProps,
      itemGetProps = _parseProps$itemGetPr === void 0 ? TabBar.itemGetProps : _parseProps$itemGetPr,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default.Container : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["type", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "componentPanel", "className"]);

  var classStr = 'width-full border-set-top-border';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    type: type,
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

TabBar.defaultProps = {};
/*
 * 组件的排列类型
 */

TabBar.defaultProps.type = 'justify';
/*
 * 设置映射组件
 */

TabBar.defaultProps.component = _Panel.default.Container;
var _default = TabBar; // TabBar Item
// -----------------------

/**
 * 标签页导航条组件的项目子组件
 * @component 
 * @augments BaseComponent
 * @mount TabBar.Item
 */

exports.default = _default;

var _Item = function Item(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Item.props),
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default.Icon : _parseProps2$componen,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["component", "className"]);

  var classStr = 'padding-top-sm padding-bottom-xs cursor-pointer status- transition-set-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    position: "top",
    hasSelection: true,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(TabBar, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.defaultProps = {};
/**
 * 设置映射组件
 */

_Item.defaultProps.component = _Panel.default.Icon;
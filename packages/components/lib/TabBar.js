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
  var _parseProps = (0, _props.default)(aprops, TabBar.props),
      _parseProps$type = _parseProps.type,
      type = _parseProps$type === void 0 ? "justify" : _parseProps$type,
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

TabBar.Item = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, TabBar.Item.props),
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

var _default = TabBar;
exports.default = _default;
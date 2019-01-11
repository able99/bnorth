"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Icon"));

/**
 * 标题栏组件
 * @module 
 */
// NarBar
// --------------------------

/**
 * 标题栏组件
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
var NavBar = function NavBar(aprops) {
  var _parseProps = (0, _props.default)(aprops, NavBar.props),
      statusbarOverlay = _parseProps.statusbarOverlay,
      hidden = _parseProps.hidden,
      Component = _parseProps.component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      style = _parseProps.style,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["statusbarOverlay", "hidden", "component", "componentPanel", "className", "style"]);

  if (hidden) return null;
  var classStr = 'flex-display-block flex-justify-around flex-align-center width-full padding-v-sm border-set-bottom-';
  var styleSet = {};
  if (statusbarOverlay) styleSet.paddingTop = statusbarOverlay === true ? 20 : statusbarOverlay;
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props));
};

NavBar.defaultProps = {};
/**
 * 设置标题栏顶部覆盖状态栏的高度，当值为 true 时，取 20 作为默认值
 * @attribute module:NavBar.NavBar.statusbarOverlay
 * @type {boolean|number}
 */

/**
 * 设置隐藏组件
 * @attribute module:NavBar.NavBar.hidden
 * @type {boolean}
 */

/**
 * 设置映射组件
 */

NavBar.defaultProps.component = _Panel.default;
/**
 * 设置映射组件的映射组件，
 */

NavBar.defaultProps.componentPanel = 'nav';
var _default = NavBar; // NavBar Title
// ---------------------

/**
 * 标题栏组件的标题子组件
 * @component
 * @augments BaseComponent
 * @mount NavBar.Title
 */

exports.default = _default;

var _Title = function Title(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Title.props),
      isFullOrCenter = _parseProps2.isFullOrCenter,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isFullOrCenter", "component", "componentPanel", "className", "children"]);

  var classStr = 'text-align-center flex-sub-flex-extend text-weight-bold text-size-xl';
  return isFullOrCenter ? _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    inline: true,
    className: (0, _classes.default)(classStr, className)
  }, props), children) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    inline: true,
    className: (0, _classes.default)(classStr, className, 'position-absolute')
  }, props), children), _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    inline: true,
    className: (0, _classes.default)(classStr, className, 'visibility-hide')
  }, props), "0"));
};

Object.defineProperty(NavBar, "Title", {
  get: function get() {
    return _Title;
  },
  set: function set(val) {
    _Title = val;
  }
});
_Title.defaultProps = {};
/**
 * 设置标题组件铺满小组件之外空间，或者按需设置宽度并居中
 * @attribute module:NavBar~Title.isFullOrCenter
 * @type {boolean}
 */

/**
 * 设置映射组件
 */

_Title.defaultProps.component = _Panel.default; // NavBar Item
// ---------------------

/**
 * 标题栏组件的上的小组件
 * @component
 * @augments BaseComponent
 * @mount NavBar.Item
 */

var _Item = function Item(aprops) {
  var _parseProps3 = (0, _props.default)(aprops, _Item.props),
      Component = _parseProps3.component,
      componentPanel = _parseProps3.componentPanel,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["component", "componentPanel", "className"]);

  var classStr = 'padding-h-sm flex-sub-flex-none cursor-pointer status-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(NavBar, "Item", {
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
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

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @module
 */
var _default = _Panel.default;
exports.default = _default;
var positionToDirection = {
  left: 'h',
  right: 'hv',
  top: 'v',
  bottom: 'vv' // Panel Icon
  // ---------------------

  /**
   * 图标小面板组件，扩展小面板组件，提供图标组件与面板内容混排的能力
   * @component
   * @mount Panel.Icon
   * @augments BaseComponent
   */

};

var _PanelIcon = function PanelIcon(aprops) {
  var _parseProps = (0, _props.default)(aprops, _PanelIcon.props),
      position = _parseProps.position,
      selected = _parseProps.selected,
      icon = _parseProps.icon,
      src = _parseProps.src,
      char = _parseProps.char,
      shape = _parseProps.shape,
      selectedIcon = _parseProps.selectedIcon,
      iconProps = _parseProps.iconProps,
      contentProps = _parseProps.contentProps,
      Component = _parseProps.component,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["position", "selected", "icon", "src", "char", "shape", "selectedIcon", "iconProps", "contentProps", "component", "children"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    type: "flex",
    direction: positionToDirection[position],
    justify: "center",
    align: "center",
    selected: selected
  }, props), position ? _react.default.createElement(_Icon.default, (0, _extends2.default)({
    name: icon && (selected && selectedIcon ? selectedIcon : icon),
    src: src && (selected && selectedIcon ? selectedIcon : src),
    char: char && (selected && selectedIcon ? selectedIcon : char),
    shape: shape && (selected && selectedIcon ? selectedIcon : shape)
  }, iconProps)) : null, children ? _react.default.createElement(_Content, (0, _extends2.default)({
    position: position
  }, contentProps), children) : null);
};

Object.defineProperty(_Panel.default, "Icon", {
  get: function get() {
    return _PanelIcon;
  },
  set: function set(val) {
    _PanelIcon = val;
  }
});
_PanelIcon.defaultProps = {};
/**
 * 设置图标相对于内容的位置，包括 left，right，top，bottom 4 个位置
 * @type {string}
 */

_PanelIcon.defaultProps.position = 'left';
/**
 * 参见 Panel
 * @attribute Panel.module:Icon~PanelIcon.selected
 */

/**
 * 参见 Icon 的 name 属性
 * @attribute Panel.module:Icon~PanelIcon.icon
 */

/**
 * 参见 Icon
 * @attribute Panel.module:Icon~PanelIcon.src
 */

/**
 * 参见 Icon
 * @attribute Panel.module:Icon~PanelIcon.char
 */

/**
 * 参见 Icon
 * @attribute Panel.module:Icon~PanelIcon.shape
 */

/**
 * 设置 icon，src，char 或 shape 在选中时的对应属性，不设置则选中不选中没有区别
 * @attribute Panel.module:Icon~PanelIcon.selectedIcon
 * @type {*}
 */

/**
 * 设置图标子组件的属性
 * @attribute Panel.module:Icon~PanelIcon.iconProps
 * @type {object}
 */

/**
 * 设置内容子组件的属性
 * @attribute Panel.module:Icon~PanelIcon.contentProps
 * @type {object}
 */

/**
 * 参见 BaseComponent
 */

_PanelIcon.defaultProps.component = _Panel.default.Container; // Panel Icon Icon
// ------------------

/**
 * 图标小面板组件的内部图标组件
 * @component
 * @name Panel.module:Icon~Icon
 * @mount Panel.Icon.Icon
 * @private 
 * @augments BaseComponent
 * @see module:Icon.Icon
 */

Object.defineProperty(_Panel.default.Icon, "Icon", {
  get: function get() {
    return _Icon.default;
  },
  set: function set(val) {
    _Icon.default = (val, function () {
      throw new Error('"' + "Icon" + '" is read-only.');
    }());
  }
}); // Panel Icon Content
// ------------------

/**
 * 图标小面板组件的内部内容组件
 * @component
 * @mount Panel.Icon.Content
 * @private 
 * @augments BaseComponent
 */

var _Content = function Content(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Content.porps),
      position = _parseProps2.position,
      Component = _parseProps2.component,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["position", "component", "className"]);

  var classStr = 'text-truncate-1- position-relative';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(_Panel.default.Icon, "Content", {
  get: function get() {
    return _Content;
  },
  set: function set(val) {
    _Content = val;
  }
});
_Content.defaultProps = {};
/**
 * 参见 Panel.Icon
 * @attribute Panel.module:Icon~Content.position
 */

/**
 * 参见 BaseComponent
 */

_Content.defaultProps.component = _Panel.default;
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

/**
 * 按钮和按钮组
 * @module
 */
// Button
// ----------------------------

/**
 * 按钮组件
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
var Button = function Button(aprops) {
  var _parseProps = (0, _props.default)(aprops, Button.props),
      Component = _parseProps.component,
      panelComponent = _parseProps.panelComponent,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["component", "panelComponent", "className"]);

  var classStr = 'outline-none- appearance-none- font-smoothing-antialiased- transition-set- vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: panelComponent,
    "b-style": "solid",
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Button.defaultProps = {};
/**
 * 设置映射组件
 */

Button.defaultProps.component = _Panel.default;
/**
 * 设置映射组件的映射组件
 */

Button.defaultProps.panelComponent = 'button';
var _default = Button; // Button Group
// ---------------------------

/**
 * 按钮组组件
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer
 * @mount Button.Group
 */

exports.default = _default;

var _Group = function Group(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Group.props),
      stacked = _parseProps2.stacked,
      justify = _parseProps2.justify,
      separator = _parseProps2.separator,
      separatorProps = _parseProps2.separatorProps,
      itemProps = _parseProps2.itemProps,
      _parseProps2$itemGetC = _parseProps2.itemGetClassName,
      itemGetClassName = _parseProps2$itemGetC === void 0 ? _Group.itemGetClassName : _parseProps2$itemGetC,
      _parseProps2$itemGetS = _parseProps2.itemGetStyle,
      itemGetStyle = _parseProps2$itemGetS === void 0 ? _Group.itemGetStyle : _parseProps2$itemGetS,
      _parseProps2$itemGetP = _parseProps2.itemGetProps,
      itemGetProps = _parseProps2$itemGetP === void 0 ? _Group.itemGetProps : _parseProps2$itemGetP,
      Component = _parseProps2.component,
      panelComponent = _parseProps2.panelComponent,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["stacked", "justify", "separator", "separatorProps", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "panelComponent", "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).reduce(function (v1, v2, i, a) {
    if (!separator || stacked) return a;
    if (i > 0) v1.push(_react.default.createElement(_Separator, (0, _extends2.default)({
      key: 'sep' + i,
      notItem: true
    }, separatorProps)));
    v1.push(v2);
    return v1;
  }, []);
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: panelComponent,
    type: justify ? "justify" : "",
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps
  }, props), children);
};

Object.defineProperty(Button, "Group", {
  get: function get() {
    return _Group;
  },
  set: function set(val) {
    _Group = val;
  }
});
_Group.defaultProps = {};
/**
 * 是否堆叠方式摆放按钮
 * @attribute module:Button~Group.stacked
 * @type {boolean}
 */

/**
 * 是否平分展开按钮
 * @attribute module:Button~Group.justify
 * @type {boolean}
 */

/**
 * 按钮之间是否有分隔条
 * @attribute module:Button~Group.separator
 * @type {boolean}
 */

/**
 * 分隔条属性
 * @attribute module:Button~Group.separatorProps
 * @type {object}
 */

/**
 * 设置映射组件
 */

_Group.defaultProps.component = _Panel.default.Container;

_Group.itemGetClassName = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      separator = _ref.separator,
      stacked = _ref.stacked,
      justify = _ref.justify;

  return {
    'border-none-right-': separator || stacked || i >= length - 1,
    'border-none-bottom-': separator || !stacked || i >= length - 1,
    'flex-sub-flex-extend': justify,
    'width-full': stacked,
    'border-none-top-': true,
    'border-none-left-': true,
    'bg-none-': separator
  };
}; // Button Group Separator
// -------------------------

/**
 * 按钮组的分隔条组件
 * @component
 * @augments BaseComponent
 * @mount Button.Group.Separator
 * @private
 */


var _Separator = function Separator(aprops) {
  var _parseProps3 = (0, _props.default)(aprops, _Separator.props),
      Component = _parseProps3.component,
      panelComponent = _parseProps3.panelComponent,
      notItem = _parseProps3.notItem,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["component", "panelComponent", "notItem", "className"]);

  var classStr = 'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: panelComponent,
    inline: true,
    "b-theme": "border",
    "b-size": "lg",
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement("span", null, "|"));
};

Object.defineProperty(Button.Group, "Separator", {
  get: function get() {
    return _Separator;
  },
  set: function set(val) {
    _Separator = val;
  }
});
_Separator.defaultProps = {};
/**
 * 设置映射组件
 */

_Separator.defaultProps.component = _Panel.default;
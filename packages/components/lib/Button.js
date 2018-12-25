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

/**
 * 按钮组件
 * @component
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

Button.defaultProps = {
  /**
   * 渲染为该组件
   * @type {component|element}
   * @default Panel
   */
  component: _Panel.default,

  /**
   * Panel 的渲染组件，仅当 component 设置为 Panel 时有效
   * @type {component|element}
   * @default 'button'
   */
  panelComponent: 'button'
  /**
   * 按钮组组件
   * @component
   */

};

Button.Group = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, Button.Group.props),
      stacked = _parseProps2.stacked,
      justify = _parseProps2.justify,
      separator = _parseProps2.separator,
      separatorProps = _parseProps2.separatorProps,
      itemProps = _parseProps2.itemProps,
      itemGetClassName = _parseProps2.itemGetClassName,
      itemGetStyle = _parseProps2.itemGetStyle,
      itemGetProps = _parseProps2.itemGetProps,
      Component = _parseProps2.component,
      panelComponent = _parseProps2.panelComponent,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["stacked", "justify", "separator", "separatorProps", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "panelComponent", "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).reduce(function (v1, v2, i, a) {
    if (!separator || stacked) return a;
    if (i > 0) v1.push(_react.default.createElement(Button.Group._Separator, (0, _extends2.default)({
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

Button.Group.defaultProps = {
  /**
   * 是否堆叠方式摆放按钮
   * @type {boolean}
   */
  stacked: false,

  /**
   * 是否平分展开按钮
   * @type {boolean}
   */
  justify: false,

  /**
   * 按钮之间是否有分隔条
   * @type {boolean}
   */
  separator: false,

  /**
   * 分隔条属性
   * @type {object}
   */
  separatorProps: {},

  /**
   * 设置包含所有按钮的属性
   * @type {object}
   */
  itemProps: undefined,

  /**
   * 设置包含所有按钮的 class name 生成函数
   * @type {function}
   */
  itemGetClassName: Button.Group._itemGetClassName,

  /**
   * 设置包含所有按钮的样式生成函数
   * @type {function}
   * @default Button.Group._itemGetStyle
   */
  itemGetStyle: Button.Group._itemGetStyle,

  /**
   * 设置包含所有按钮的属性生成函数
   * @type {function}
   * @default Button.Group._itemGetProps
   */
  itemGetProps: Button.Group._itemGetProps,

  /**
   * 渲染为该组件
   * @type {component|element}
   * @default Panel.Container
   */
  component: _Panel.default.Container,

  /**
   * Panel 的渲染组件，仅当 component 设置为 Panel 时有效
   * @type {component|element}
   */
  panelComponent: undefined
  /**
   * 按钮组默认的设置包含所有按钮的 class name 生成函数，该函数处理了边框和对堆叠，平分的属性的处理
   * @component
   * @private
   */

};

Button.Group._itemGetClassName = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      separator = _ref.separator,
      stacked = _ref.stacked,
      justify = _ref.justify;

  return {
    'border-none-right-': stacked || i >= length - 1,
    'border-none-bottom-': !stacked || i >= length - 1,
    'flex-sub-flex-extend': justify,
    'width-full': stacked,
    'border-none-top-': true,
    'border-none-left-': true,
    'bg-none-': separator
  };
};
/**
 * 按钮组的分隔条组件
 * @component
 * @private
 */


Button.Group._Separator = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops, Button.Group._Separator.props),
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
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
/**
 * 按钮组的条目
 * @component
 * @see module:Button.Button
 */


Button.Group.Item = Button;
var _default = Button;
exports.default = _default;
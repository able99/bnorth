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

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */

/**
 * 页面的根组件，也可以不使用该组件作为根组件
 * @component 
 * @exportdefault
 */
var View = function View(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      landscape = _parseProps.landscape,
      container = _parseProps.container,
      Component = _parseProps.component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      style = _parseProps.style,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["landscape", "container", "component", "componentPanel", "className", "style", "children"]);

  var classStr = 'position-relative offset-a-start square-full overflow-a-hidden flex-display-block flex-direction-v bg-color-view';
  var styleSet = {};

  if (landscape && container.clientHeight > container.clientWidth) {
    styleSet = (0, _objectSpread2.default)({
      width: container.clientHeight,
      height: container.clientWidth,
      top: (container.clientHeight - container.clientWidth) / 2,
      left: (container.clientWidth - container.clientHeight) / 2
    }, (0, _animation.transform)('rotate', '90deg'));
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "data-container": true,
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _classes.default)(classStr, className)
  }, props), children);
};

View.defaultProps = {
  /**
   * 开启横屏模式
   * @type {boolean}
   */
  landscape: undefined,

  /**
   * 页面的容器，为横屏时计算宽度使用
   * @type {element}
   * @default document.body
   */
  container: document.body,

  /**
   * 实际对应组件
   * @type {element|component}
   * @default Panel
   */
  component: _Panel.default,

  /**
   * 当实际组件为 panel 时，设置 panel 的对应组件
   * @type {(element|component)}
   */
  componentPanel: undefined
};
var _default = View;
exports.default = _default;
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

var _AnimationFade = _interopRequireDefault(require("./AnimationFade"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */

/**
 * 背景组件
 * 
 * Backdrop 会填满具有 relative，absolute 或 fixed 位置属性的父元素，并提供背景样式和点击操作等
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
var Backdrop = function Backdrop(aprops) {
  var _parseProps = (0, _props.default)(aprops, Backdrop.props),
      mask = _parseProps.mask,
      Transition = _parseProps.transition,
      isIn = _parseProps.in,
      transitionProps = _parseProps.transitionProps,
      onTransitionFinished = _parseProps.onTransitionFinished,
      component = _parseProps.component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["mask", "transition", "in", "transitionProps", "onTransitionFinished", "component", "componentPanel", "className", "children"]);

  var classStr = 'position-absolute square-full offset-a-start overflow-a-hidden';
  var classSet = mask ? "bg-color-".concat(mask === true ? 'mask' : mask) : '';
  return _react.default.createElement(Transition, (0, _extends2.default)({
    in: isIn,
    transitionProps: transitionProps,
    onTransitionFinished: onTransitionFinished,
    component: component,
    componentPanel: componentPanel,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), children);
};

Backdrop.defaultProps = {};
/**
 * 设置背景的主题色，true 表示设置默认主题 mask
 * @type {boolean|string}
 */

Backdrop.defaultProps.mask = true;
/**
 * 设置背景显示的进入和离开动画组件
 * @type {component}
 */

Backdrop.defaultProps.transition = _AnimationFade.default;
/**
 * 参见 AnimationFade
 * @attribute module:Backdrop.Backdrop.in
 */

/**
 * 参见 AnimationFade
 * @attribute module:Backdrop.Backdrop.transitionProps
 */

/**
 * 参见 AnimationFade
 * @attribute module:Backdrop.Backdrop.onTransitionFinished
 */

/**
 * 参见 BaseComponent
 */

Backdrop.defaultProps.component = _Panel.default;
var _default = Backdrop;
exports.default = _default;
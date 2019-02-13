"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Animation = _interopRequireDefault(require("./Animation"));

/**
 * @module
 */

/**
 * 背景组件
 * 
 * Backdrop 会填满具有 relative，absolute 或 fixed 位置属性的父元素，并提供背景样式和点击操作等
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
var Backdrop = function Backdrop(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, Backdrop),
      mask = _BaseComponent.mask,
      Transition = _BaseComponent.transition,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["mask", "transition"]);

  var classNamePre = (0, _defineProperty2.default)({
    'position-absolute square-full offset-a-start overflow-a-hidden': true
  }, 'bg-color-' + (mask === true ? 'mask' : mask), mask);
  return _react.default.createElement(Transition, (0, _extends2.default)({
    type: "fade",
    classNamePre: classNamePre
  }, props));
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

Backdrop.defaultProps.transition = _Animation.default;
/**
 * 动画参数，参见 Animation
 * @attribute module:Backdrop.Backdrop.transition*
 */

var _default = Backdrop;
exports.default = _default;
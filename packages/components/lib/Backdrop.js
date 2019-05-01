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

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Animation = _interopRequireDefault(require("./Animation"));

/**
 * @module
 */

/**
 * 背景组件
 * 
 * Backdrop 会填满第一个具有 relative，absolute 或 fixed 位置属性的上级元素，并提供背景样式和点击操作等
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments module:Animation.Animation
 */
var _Backdrop = function Backdrop(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Backdrop),
      classNamePre = _BaseComponent.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["classNamePre"]);

  classNamePre = (0, _objectSpread2.default)({
    'position-absolute square-full offset-a-start overflow-a-hidden': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    type: "fade",
    "b-style": "mask",
    btn: false,
    component: _Animation.default,
    classNamePre: classNamePre
  }, props));
};

_Backdrop.defaultProps = {};
Object.defineProperty(_Backdrop, "Backdrop", {
  get: function get() {
    return _Backdrop;
  },
  set: function set(val) {
    _Backdrop = val;
  }
});
_Backdrop.isBnorth = true;
_Backdrop.defaultProps['b-precast'] = {};
var _default = _Backdrop;
exports.default = _default;
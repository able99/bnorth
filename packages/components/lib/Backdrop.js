"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent = _interopRequireDefault(require("./BaseComponent"));

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
  var props = (0, _BaseComponent.default)(aprops, _Backdrop);
  var classNamePre = {
    'position-absolute square-full offset-a-start overflow-a-hidden': true
  };
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    componentTransform: _Animation.default,
    type: "fade",
    "b-style": "mask",
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
var _default = _Backdrop;
exports.default = _default;
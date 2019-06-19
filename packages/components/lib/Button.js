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

/**
 * 按钮和按钮组
 * @module
 */

/**
 * 按钮组件
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments button
 * @exportdefault
 */
var _Button = function Button(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Button),
      classNamePre = _BaseComponent.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["classNamePre"]);

  classNamePre = (0, _objectSpread2.default)({
    'outline-none appearance-none font-smoothing-antialiased vertical-align-middle line-height-1 text-align-center padding-a-': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "button",
    "b-style": "solid",
    classNamePre: classNamePre
  }, props));
};

_Button.defaultProps = {};
Object.defineProperty(_Button, "Button", {
  get: function get() {
    return _Button;
  },
  set: function set(val) {
    _Button = val;
  }
});
_Button.isBnorth = true;
_Button.defaultProps['b-precast'] = {};
var _default = _Button;
exports.default = _default;
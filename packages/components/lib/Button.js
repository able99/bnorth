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
var Button = function Button(aprops) {
  var props = (0, _BaseComponent.default)(aprops, Button);
  var classNamePre = 'outline-none- appearance-none- font-smoothing-antialiased- transition-set- vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "b-style": "solid",
    classNamePre: classNamePre
  }, props));
};

Button.defaultProps = {};
Button.defaultProps.component = 'button';
var _default = Button;
exports.default = _default;
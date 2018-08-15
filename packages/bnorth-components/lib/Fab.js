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

var _props = require("./utils/props");

var _Button = _interopRequireDefault(require("./Button"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Fab = function Fab(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$x = _genCommonProps.x,
      x = _genCommonProps$x === void 0 ? 8 : _genCommonProps$x,
      _genCommonProps$y = _genCommonProps.y,
      y = _genCommonProps$y === void 0 ? 8 : _genCommonProps$y,
      _genCommonProps$h = _genCommonProps.h,
      h = _genCommonProps$h === void 0 ? 'end' : _genCommonProps$h,
      _genCommonProps$v = _genCommonProps.v,
      v = _genCommonProps$v === void 0 ? 'end' : _genCommonProps$v,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Button.default : _genCommonProps$compo,
      className = _genCommonProps.className,
      style = _genCommonProps.style,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["x", "y", "h", "v", "component", "className", "style", "children"]);

  var classSet = {
    'position-fixed': true,
    'translate-center-x': h === 'center',
    'translate-center-y': v === 'center',
    'offset-center-x': h === 'center',
    'offset-center-y': v === 'center'
  };
  var styleSet = {};
  if (h === 'start') styleSet['left'] = x;
  if (h === 'center') styleSet['left'] = '50%';
  if (h === 'end') styleSet['right'] = x;
  if (v === 'start') styleSet['top'] = y;
  if (v === 'center') styleSet['top'] = '50%';
  if (v === 'end') styleSet['bottom'] = y;
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props), children);
};

var _default = Fab;
exports.default = _default;
module.exports = exports["default"];
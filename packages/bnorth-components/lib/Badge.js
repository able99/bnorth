"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Badge = function Badge(aprops) {
  var _classSet;

  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$paddi = _genCommonProps.paddingSquare,
      paddingSquare = _genCommonProps$paddi === void 0 ? 0.25 : _genCommonProps$paddi,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'span' : _genCommonProps$compo,
      className = _genCommonProps.className,
      style = _genCommonProps.style,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["paddingSquare", "component", "className", "style", "containerClassName", "containerStyle", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = (_classSet = {
    'text-family-monospace': true,
    'line-height-1': true,
    'white-space-nowrap': true
  }, (0, _defineProperty2.default)(_classSet, 'text-size' + cSize, cSize), (0, _defineProperty2.default)(_classSet, 'display-inline-block', !(0, _props.hascx)(className, 'display')), _classSet);

  if (cStyle === 'hollow') {
    classSet['bg-none'] = true;

    if (cTheme) {
      classSet['border-set-' + cTheme] = true;
      classSet['text-color-' + cTheme] = true;
    } else {
      classSet['border-set-border'] = true;
    }
  } else {
    if (cTheme) {
      classSet['bg-color-' + cTheme] = true;
      classSet['border-set-' + cTheme] = true;
      classSet['text-color-white'] = true;
    } else {
      classSet['bg-color-component'] = true;
      classSet['border-set-component'] = true;
    }
  }

  var styleSet = {
    'padding': "".concat(paddingSquare, "em ").concat((16 - 9.609) / 32 + paddingSquare, "em")
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props), children);
};

var _default = Badge;
exports.default = _default;
module.exports = exports["default"];
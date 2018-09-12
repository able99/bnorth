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

var _props = require("./utils/props");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Spacing = function Spacing(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$count = _genCommonProps.count,
      count = _genCommonProps$count === void 0 ? 1 : _genCommonProps$count,
      stacked = _genCommonProps.stacked,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'pre' : _genCommonProps$compo,
      className = _genCommonProps.className,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["count", "stacked", "component", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = (0, _defineProperty2.default)({
    'display-inline-block': !stacked
  }, 'text-size-' + cSize, cSize);

  if (cStyle === 'hollow') {
    classSet['bg-color-white'] = true;
    classSet['border-set-' + (cTheme || 'component')] = true;
  } else if (cStyle === 'solid') {
    classSet['bg-color-' + (cTheme || 'component')] = true;
    classSet['border-set-' + (cTheme || 'component')] = true;
  } else {
    classSet['bg-color-' + cTheme] = cTheme;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), Array(count).fill(stacked ? '\n' : ' '), children);
};

var _default = Spacing;
exports.default = _default;
module.exports = exports["default"];
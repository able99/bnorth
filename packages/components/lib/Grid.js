"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _flex = require("@bnorth/rich.css/lib/styles/flex");

var _props = require("./utils/props");

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Grid = function Grid() {
  var _classSet;

  var aprops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      border = _genCommonProps.border,
      avg = _genCommonProps.avg,
      align = _genCommonProps.align,
      justify = _genCommonProps.justify,
      _genCommonProps$wrap = _genCommonProps.wrap,
      wrap = _genCommonProps$wrap === void 0 ? avg ? 'nowrap' : 'wrap' : _genCommonProps$wrap,
      _genCommonProps$total = _genCommonProps.total,
      total = _genCommonProps$total === void 0 ? 12 : _genCommonProps$total,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["border", "avg", "align", "justify", "wrap", "total", "component", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = (_classSet = {
    'position-relative': true,
    'overflow-a-hidden': true,
    'backface-hidden': true,
    'flex-display-flex': true
  }, (0, _defineProperty2.default)(_classSet, "flex-wrap-".concat(wrap), wrap), (0, _defineProperty2.default)(_classSet, "flex-align-".concat(align), align), (0, _defineProperty2.default)(_classSet, "flex-justify-".concat(justify), justify), _classSet);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).map(function (v, i, arr) {
    return (0, _react.cloneElement)(v, (0, _objectSpread2.default)({
      cTheme: cTheme,
      cStyle: cStyle,
      cSize: cSize,
      i: i,
      count: arr.length,
      avg: avg,
      total: total,
      border: border
    }, props));
  }));
};

var GridItem = function GridItem(aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      i = _genCommonProps2.i,
      count = _genCommonProps2.count,
      cols = _genCommonProps2.cols,
      offset = _genCommonProps2.offset,
      shrink = _genCommonProps2.shrink,
      _genCommonProps2$tota = _genCommonProps2.total,
      total = _genCommonProps2$tota === void 0 ? 12 : _genCommonProps2$tota,
      border = _genCommonProps2.border,
      avg = _genCommonProps2.avg,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'div' : _genCommonProps2$comp,
      style = _genCommonProps2.style,
      className = _genCommonProps2.className,
      cTheme = _genCommonProps2.cTheme,
      cStyle = _genCommonProps2.cStyle,
      cSize = _genCommonProps2.cSize,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["i", "count", "cols", "offset", "shrink", "total", "border", "avg", "component", "style", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = {
    'padding': !(0, _props.hascx)(className, 'padding'),
    'flex-sub-flex-extend': avg,
    'flex-sub-flex-none': !avg && (shrink || cols),
    'border-set-right': border,
    'border-set-bottom': border
  };
  var styleSet = (0, _objectSpread2.default)({}, cols && (0, _flex.styleFlexSubBasis)(100 * cols / total));

  if (offset) {
    styleSet.marginLeft = "".concat(offset * (100 * cols / total), "%");
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cx)(classSet, className)
  }, props), children);
};

Grid.Item = GridItem;
var _default = Grid;
exports.default = _default;
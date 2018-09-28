"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Loader = function Loader(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$type = _genCommonProps.type,
      type = _genCommonProps$type === void 0 ? 'circle' : _genCommonProps$type,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["type", 'b-theme', 'b-style', 'b-size']);

  var Component = Loader['_' + type];
  if (!Component) return null;
  var classSet = [];
  if (bSize) classSet.push('text-size-' + (bSize === true ? '' : bSize));
  if (bTheme) classSet.push('text-color-' + (bTheme === true ? '' : bTheme));
  return _react.default.createElement(Component, (0, _extends2.default)({
    classSet: classSet
  }, props));
};

Loader._line = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      isProgress = _genCommonProps2.isProgress,
      _genCommonProps2$prog = _genCommonProps2.progress,
      progress = _genCommonProps2$prog === void 0 ? 0 : _genCommonProps2$prog,
      _genCommonProps2$time = _genCommonProps2.timeout,
      timeout = _genCommonProps2$time === void 0 ? '2s' : _genCommonProps2$time,
      _genCommonProps2$colo = _genCommonProps2.color,
      color = _genCommonProps2$colo === void 0 ? "currentColor" : _genCommonProps2$colo,
      _genCommonProps2$colo2 = _genCommonProps2.colorReverse,
      colorReverse = _genCommonProps2$colo2 === void 0 ? 'lightgray' : _genCommonProps2$colo2,
      classSet = _genCommonProps2.classSet,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["isProgress", "progress", "timeout", "color", "colorReverse", "classSet", "className", "children"]);

  var classStr = 'width-full height-1em';
  return _react.default.createElement("svg", (0, _extends2.default)({
    preserveAspectRatio: "none",
    viewBox: "0 0 100 5",
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), _react.default.createElement("line", {
    x1: "0",
    y1: "2",
    x2: "100",
    y2: "2",
    strokeWidth: "5",
    stroke: colorReverse,
    fill: "none"
  }), _react.default.createElement("line", {
    x1: "0",
    y1: "2",
    x2: "100",
    y2: "2",
    strokeWidth: "5",
    stroke: color,
    fill: "none",
    className: isProgress ? "transition-set-" : null,
    strokeDasharray: isProgress ? "".concat(progress, ",100") : '10,100'
  }, !isProgress ? _react.default.createElement("animate", {
    attributeName: "stroke-dashoffset",
    values: "0;-90;0",
    dur: timeout,
    repeatCount: "indefinite"
  }) : null), children);
};

Loader._circle = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      isProgress = _genCommonProps3.isProgress,
      progress = _genCommonProps3.progress,
      _genCommonProps3$time = _genCommonProps3.timeout,
      timeout = _genCommonProps3$time === void 0 ? '2s' : _genCommonProps3$time,
      _genCommonProps3$colo = _genCommonProps3.color,
      color = _genCommonProps3$colo === void 0 ? "currentColor" : _genCommonProps3$colo,
      _genCommonProps3$colo2 = _genCommonProps3.colorReverse,
      colorReverse = _genCommonProps3$colo2 === void 0 ? 'lightgray' : _genCommonProps3$colo2,
      classSet = _genCommonProps3.classSet,
      className = _genCommonProps3.className,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["isProgress", "progress", "timeout", "color", "colorReverse", "classSet", "className", "children"]);

  var classStr = 'width-1em height-1em';
  return _react.default.createElement("svg", (0, _extends2.default)({
    viewBox: "0 0 100 100",
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), _react.default.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "40",
    strokeWidth: "20",
    stroke: colorReverse,
    fill: "none"
  }), _react.default.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "40",
    strokeWidth: "20",
    stroke: color,
    fill: "none",
    transform: "matrix(0,-1,1,0,0,100)",
    className: isProgress ? "transition-set-" : null,
    strokeDasharray: isProgress ? "".concat(2.51 * (progress || 0), ",251") : "50,251"
  }, !isProgress ? _react.default.createElement("animate", {
    attributeName: "stroke-dashoffset",
    from: "0",
    to: "-251",
    dur: timeout,
    repeatCount: "indefinite"
  }) : null), children);
};

var _default = Loader;
exports.default = _default;
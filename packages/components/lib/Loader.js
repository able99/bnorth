"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var Loader = function Loader(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      _parseProps$type = _parseProps.type,
      type = _parseProps$type === void 0 ? 'circle' : _parseProps$type,
      _parseProps$timeout = _parseProps.timeout,
      timeout = _parseProps$timeout === void 0 ? aprops.isProgress ? '250ms' : '2s' : _parseProps$timeout,
      bTheme = _parseProps['b-theme'],
      bStyle = _parseProps['b-style'],
      bSize = _parseProps['b-size'],
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["type", "timeout", 'b-theme', 'b-style', 'b-size']);

  var Component = Loader['_' + type];
  if (!Component) return null;
  var classSet = [];
  if (bSize) classSet.push('text-size-' + (bSize === true ? '' : bSize));
  if (bTheme) classSet.push('text-color-' + (bTheme === true ? '' : bTheme));
  return _react.default.createElement(Component, (0, _extends2.default)({
    timeout: timeout,
    classSet: classSet
  }, props));
};

Loader._line = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops),
      isProgress = _parseProps2.isProgress,
      _parseProps2$progress = _parseProps2.progress,
      progress = _parseProps2$progress === void 0 ? 0 : _parseProps2$progress,
      timeout = _parseProps2.timeout,
      _parseProps2$color = _parseProps2.color,
      color = _parseProps2$color === void 0 ? "currentColor" : _parseProps2$color,
      _parseProps2$colorRev = _parseProps2.colorReverse,
      colorReverse = _parseProps2$colorRev === void 0 ? 'lightgray' : _parseProps2$colorRev,
      classSet = _parseProps2.classSet,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isProgress", "progress", "timeout", "color", "colorReverse", "classSet", "className", "children"]);

  var classStr = 'width-full height-1em';
  return _react.default.createElement("svg", (0, _extends2.default)({
    preserveAspectRatio: "none",
    viewBox: "0 0 100 5",
    className: (0, _classes.default)(classStr, classSet, className)
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
    style: isProgress ? (0, _animation.transiton)(timeout) : null,
    strokeDasharray: isProgress ? "".concat(progress, ",100") : '10,100'
  }, !isProgress ? _react.default.createElement("animate", {
    attributeName: "stroke-dashoffset",
    values: "0;-90;0",
    dur: timeout,
    repeatCount: "indefinite"
  }) : null), children);
};

Loader._circle = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops),
      isProgress = _parseProps3.isProgress,
      progress = _parseProps3.progress,
      _parseProps3$timeout = _parseProps3.timeout,
      timeout = _parseProps3$timeout === void 0 ? '2s' : _parseProps3$timeout,
      _parseProps3$color = _parseProps3.color,
      color = _parseProps3$color === void 0 ? "currentColor" : _parseProps3$color,
      _parseProps3$colorRev = _parseProps3.colorReverse,
      colorReverse = _parseProps3$colorRev === void 0 ? 'lightgray' : _parseProps3$colorRev,
      classSet = _parseProps3.classSet,
      className = _parseProps3.className,
      children = _parseProps3.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["isProgress", "progress", "timeout", "color", "colorReverse", "classSet", "className", "children"]);

  var classStr = 'width-1em height-1em';
  return _react.default.createElement("svg", (0, _extends2.default)({
    viewBox: "0 0 100 100",
    className: (0, _classes.default)(classStr, classSet, className)
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
    transform: "rotate(-90,50,50)",
    style: isProgress ? (0, _animation.transiton)(timeout) : null,
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
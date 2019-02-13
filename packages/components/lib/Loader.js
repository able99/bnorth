"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelLoader = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _BaseComponent5 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */
// Loader
// -------------------

/**
 * 进度显示组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
var Loader = function Loader(aprops) {
  var _BaseComponent = (0, _BaseComponent5.default)(aprops, Loader),
      type = _BaseComponent.type,
      timeoutTransition = _BaseComponent.timeoutTransition,
      timeoutAnimation = _BaseComponent.timeoutAnimation,
      isProgress = _BaseComponent.isProgress,
      progress = _BaseComponent.progress,
      color = _BaseComponent.color,
      colorReverse = _BaseComponent.colorReverse,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "timeoutTransition", "timeoutAnimation", "isProgress", "progress", "color", "colorReverse"]);

  var Component = Loader[type];
  if (!Component) return null;
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    timeout: isProgress ? timeoutTransition : timeoutAnimation,
    isProgress: isProgress,
    progress: progress,
    color: color,
    colorReverse: colorReverse,
    component: Component
  }, props));
};

Loader.defaultProps = {};
/**
 * 显示的样式，默认支持 line 和 circle，可以通过给 Loader.xxx 赋值，增加新的样式
 * @type {string}
 */

Loader.defaultProps.type = 'circle';
/**
 * 作为进度条时，进度改变时的渐变动画时间
 * @type {string}
 */

Loader.defaultProps.timeoutTransition = '250ms';
/**
 * 作为加载中等待动画时，帧动画时间
 * @type {string}
 */

Loader.defaultProps.timeoutAnimation = '2s';
/**
 * 设置为进度条或者是加载中等待动画
 * @type {boolean}
 */

Loader.defaultProps.isProgress = false;
/**
 * 作为进度条时，进度的百分比， 0-100
 * @type {number}
 */

Loader.defaultProps.progress = 0;
/**
 * 设置主颜色，一般不用设置，可以设置主题色
 * @type {string}
 */

Loader.defaultProps.color = 'currentColor';
/**
 * 设置辅助色，进度条的反色颜色，取值为 css 颜色
 * @type {string}
 */

Loader.defaultProps.colorReverse = 'lightgray';
var _default = Loader; // Loader Line
// -------------------

/**
 * 进度显示组件的线性样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */

exports.default = _default;

Loader.line = function (aprops) {
  var _BaseComponent2 = (0, _BaseComponent5.default)(aprops, Loader.line),
      isProgress = _BaseComponent2.isProgress,
      progress = _BaseComponent2.progress,
      timeout = _BaseComponent2.timeout,
      color = _BaseComponent2.color,
      colorReverse = _BaseComponent2.colorReverse,
      className = _BaseComponent2.className,
      children = _BaseComponent2.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["isProgress", "progress", "timeout", "color", "colorReverse", "className", "children"]);

  var classStr = 'width-full height-1em';
  return _react.default.createElement("svg", (0, _extends2.default)({
    preserveAspectRatio: "none",
    viewBox: "0 0 100 5",
    className: (0, _classes.default)(classStr, className)
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
}; // Loader Circle
// -------------------

/**
 * 进度显示组件的圆环样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */


Loader.circle = function (aprops) {
  var _BaseComponent3 = (0, _BaseComponent5.default)(aprops, Loader.circle),
      isProgress = _BaseComponent3.isProgress,
      progress = _BaseComponent3.progress,
      timeout = _BaseComponent3.timeout,
      color = _BaseComponent3.color,
      colorReverse = _BaseComponent3.colorReverse,
      className = _BaseComponent3.className,
      children = _BaseComponent3.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["isProgress", "progress", "timeout", "color", "colorReverse", "className", "children"]);

  var classStr = 'width-1em height-1em';
  return _react.default.createElement("svg", (0, _extends2.default)({
    viewBox: "0 0 100 100",
    className: (0, _classes.default)(classStr, className)
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
}; // Panel Loader
// ---------------------

/**
 * 加载动画小面板组件，扩展小面板组件，提供加载动画组件与面板内容混排的能力
 * @component
 * @mount Panel.Loader
 * @augments BaseComponent
 * @augments Panel.module:Container~Container
 */


var PanelLoader = function PanelLoader(aprops) {
  var _BaseComponent4 = (0, _BaseComponent5.default)(aprops, PanelLoader, {
    isContainer: true
  }),
      isProgress = _BaseComponent4.isProgress,
      progress = _BaseComponent4.progress,
      loaderProps = _BaseComponent4.loaderProps,
      title = _BaseComponent4.title,
      titleProps = _BaseComponent4.titleProps,
      children = _BaseComponent4.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["isProgress", "progress", "loaderProps", "title", "titleProps", "children"]);

  return _react.default.createElement(_Panel.default.Container, (0, _extends2.default)({
    type: "flex",
    position: "left",
    justify: "center",
    align: "center"
  }, props), _react.default.createElement(Loader, (0, _extends2.default)({
    isProgress: isProgress,
    progress: progress
  }, loaderProps)), title || children ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-text-truncate-1-": true
  }, titleProps), title, children) : null);
};

exports.PanelLoader = PanelLoader;
PanelLoader.defaultProps = {};
/**
 * Loader 的属性, 参见 Loader
 * @attribute Panel.module:Loader~PanelLoader.loader*
 * @type {*}
 */

/**
 * 设置图标子组件的属性
 * @attribute Panel.module:Loader~PanelLoader.loaderProps
 * @type {object}
 */

/**
 * 设置文字，也可以使用 children
 * @attribute Panel.module:Loader~PanelLoader.title
 * @type {string}
 */

/**
 * 设置内容子组件的属性
 * @attribute Panel.module:Loader~PanelLoader.titleProps
 * @type {object}
 */
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

var _shadow = require("rich.css/lib/styles/shadow");

var _animation = require("rich.css/lib/styles/animation");

var _timable = require("./hocs/timable");

var _props = require("./utils/props");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var ProgressBar = function ProgressBar(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      sum = _genCommonProps.sum,
      isOver = _genCommonProps.isOver,
      timeout = _genCommonProps.timeout,
      intervalTime = _genCommonProps.intervalTime,
      onStop = _genCommonProps.onStop,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      _genCommonProps$cThem = _genCommonProps.cTheme,
      cTheme = _genCommonProps$cThem === void 0 ? 'link' : _genCommonProps$cThem,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["sum", "isOver", "timeout", "intervalTime", "onStop", "component", "className", "cTheme", "cStyle", "cSize", "children"]);

  var percent = (isOver ? 100 : sum * 100 / timeout) % 101;
  isOver && onStop && setTimeout(function () {
    return onStop();
  }, intervalTime);
  var classSet = {
    'position-fixed': true,
    'offset-left': true,
    'offset-right': true,
    'offset-top': true,
    'width-full': true
  };
  var classSetBar = (0, _defineProperty2.default)({}, 'bg-color-' + cTheme, true);
  var styleSetBar = (0, _objectSpread2.default)({
    height: 2,
    width: (percent < 0 ? 0 : percent) + '%'
  }, (0, _animation.transiton)("".concat(intervalTime, "ms"), {
    property: 'width'
  }), (0, _shadow.shadow)());
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), _react.default.createElement("div", {
    className: (0, _props.cx)(classSetBar),
    style: styleSetBar
  }));
};

var _default = (0, _timable.timable)(ProgressBar, {
  defaultProps: {
    timeout: 200 * 100,
    intervalTime: 200,
    autoStop: false
  }
});

exports.default = _default;
module.exports = exports["default"];
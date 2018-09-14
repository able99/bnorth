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

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _props = require("./utils/props");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var View = function View(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      landscape = _genCommonProps.landscape,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      style = _genCommonProps.style,
      className = _genCommonProps.className,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["landscape", "component", "style", "className", "children"]);

  var classSet = {
    'position-relative': true,
    'offset-start-left': true,
    'offset-start-top': true,
    'offset-start-right': true,
    'offset-start-bottom': true,
    'square-full': true,
    'overflow-hidden': true,
    'bg-color-view': !(0, _props.hascx)(className, 'bg-color'),
    'flex-display-flex': !(0, _props.hascx)(className, 'flex-display'),
    'flex-direction-v': !(0, _props.hascx)(className, 'flex-direction')
  };
  var styleLandscape = {};

  if (landscape && window.innerHeight > window.innerWidth) {
    styleLandscape = (0, _objectSpread2.default)({
      width: window.innerHeight,
      height: window.innerWidth,
      top: (window.innerHeight - window.innerWidth) / 2,
      left: (window.innerWidth - window.innerHeight) / 2
    }, (0, _animation.transform)('rotate', '90deg'));
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleLandscape, style),
    className: (0, _props.cx)(classSet, className)
  }, props), children);
};

var _default = View;
exports.default = _default;
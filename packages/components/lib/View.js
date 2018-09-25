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
      _genCommonProps$conta = _genCommonProps.container,
      container = _genCommonProps$conta === void 0 ? window : _genCommonProps$conta,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      style = _genCommonProps.style,
      _genCommonProps$bThe = _genCommonProps['b-theme'],
      bTheme = _genCommonProps$bThe === void 0 ? 'view' : _genCommonProps$bThe,
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["landscape", "container", "component", "className", "style", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'position-relative offset-left-start offset-right-start offset-top-start offset-bottom-start square-full overflow-a-hidden';
  classStr += ' flex-display-block flex-direction-v';
  var classSet = ['bg-color-' + bTheme];
  var styleSet = {};

  if (landscape && container.innerHeight > container.innerWidth) {
    styleSet = (0, _objectSpread2.default)({
      width: container.innerHeight,
      height: container.innerWidth,
      top: (container.innerHeight - container.innerWidth) / 2,
      left: (container.innerWidth - container.innerHeight) / 2
    }, (0, _animation.transform)('rotate', '90deg'));
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), children);
};

var _default = View;
exports.default = _default;
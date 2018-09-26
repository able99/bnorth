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

var _Panel = _interopRequireDefault(require("./Panel"));

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
      Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      className = _genCommonProps.className,
      style = _genCommonProps.style,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["landscape", "container", "component", "className", "style", "children"]);

  var classStr = 'position-relative offset-a-start square-full overflow-a-hidden flex-display-block flex-direction-v';
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
    "bc-bg-color": "view",
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

var _default = View; // :TODO
// container

exports.default = _default;
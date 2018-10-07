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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var View = function View(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      landscape = _parseProps.landscape,
      _parseProps$container = _parseProps.container,
      container = _parseProps$container === void 0 ? window : _parseProps$container,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      className = _parseProps.className,
      style = _parseProps.style,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["landscape", "container", "component", "className", "style", "children"]);

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
    className: (0, _classes.default)(classStr, className),
    "data-container": true
  }, props), children);
};

var _default = View; // :TODO
// container

exports.default = _default;
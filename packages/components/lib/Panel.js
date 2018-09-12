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

var _touchable = _interopRequireDefault(require("./hocs/touchable"));

var _props = require("./utils/props");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Panel = function Panel(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      main = _genCommonProps.main,
      aspect = _genCommonProps.aspect,
      aspectClassName = _genCommonProps.aspectClassName,
      aspectStyle = _genCommonProps.aspectStyle,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      style = _genCommonProps.style,
      className = _genCommonProps.className,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["main", "aspect", "aspectClassName", "aspectStyle", "component", "style", "className", "containerClassName", "containerStyle", "children"]);

  var classSet = {
    'position-relative': true,
    'scrollable': main && !(0, _props.hascx)(className, 'scrollable'),
    'flex-sub-flex-extend': main && !(0, _props.hascx)(className, 'flex-sub-flex')
  };
  var styleSet = {
    paddingBottom: "".concat(aspect * 100, "%")
  };
  var classSetAspect = {
    'position-absolute': true,
    'offset-left': true,
    'offset-top': true,
    'square-full': true
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cx)(classSet, className)
  }, props), aspect && children ? _react.default.createElement("div", {
    style: aspectStyle,
    className: (0, _props.cx)(classSetAspect, aspectClassName)
  }, children) : children);
};

Panel.Touchable = (0, _touchable.default)(Panel);
var _default = Panel;
exports.default = _default;
module.exports = exports["default"];
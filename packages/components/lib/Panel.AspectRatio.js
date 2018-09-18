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

var _props = require("./utils/props");

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
_Panel.default.AspectRatio = function (aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      ratio = _genCommonProps.ratio,
      aspectRatioProps = _genCommonProps.aspectRatioProps,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      style = _genCommonProps.style,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["ratio", "aspectRatioProps", "component", "style", "children"]);

  var styleSet = ratio ? {
    paddingBottom: "".concat(ratio * 100, "%")
  } : {};
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props), _react.default.createElement(_Panel.default.AspectRatio._Inner, (0, _extends2.default)({
    ratio: ratio
  }, aspectRatioProps), children));
};

_Panel.default.AspectRatio._Inner = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      ratio = _genCommonProps2.ratio,
      aspectRatioProps = _genCommonProps2.aspectRatioProps,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'div' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["ratio", "aspectRatioProps", "component", "className"]);

  var classStr = 'position-absolute offset-left-start offset-top-start square-full';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props));
};

var _default = _Panel.default;
exports.default = _default;
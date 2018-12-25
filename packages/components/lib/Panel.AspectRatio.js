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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

_Panel.default.AspectRatio = function (aprops) {
  var _parseProps = (0, _props.default)(aprops),
      ratio = _parseProps.ratio,
      aspectRatioProps = _parseProps.aspectRatioProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      style = _parseProps.style,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["ratio", "aspectRatioProps", "component", "style", "children"]);

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
  var _parseProps2 = (0, _props.default)(aprops),
      ratio = _parseProps2.ratio,
      aspectRatioProps = _parseProps2.aspectRatioProps,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? 'div' : _parseProps2$componen,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["ratio", "aspectRatioProps", "component", "className"]);

  var classStr = 'position-absolute offset-left-start offset-top-start square-full';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

var _default = _Panel.default;
exports.default = _default;
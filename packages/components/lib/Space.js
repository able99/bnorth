"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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
var Spacing = function Spacing(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$count = _genCommonProps.count,
      count = _genCommonProps$count === void 0 ? 1 : _genCommonProps$count,
      stacked = _genCommonProps.stacked,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["count", "stacked", "component", "children"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    inline: true
  }, props), _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, Array(count).fill(stacked ? '\n' : ' ')), children);
};

var _default = Spacing;
exports.default = _default;
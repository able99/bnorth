"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.array.fill");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

var Spacing = function Spacing(aprops) {
  var _parseProps = (0, _props.default)(aprops, Spacing.props),
      _parseProps$count = _parseProps.count,
      count = _parseProps$count === void 0 ? 1 : _parseProps$count,
      stacked = _parseProps.stacked,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["count", "stacked", "component", "children"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    inline: true
  }, props), _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, Array(Number(count)).fill(stacked ? '\n' : ' ')), children);
};

var _default = Spacing;
exports.default = _default;
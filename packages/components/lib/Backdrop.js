"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _default = function _default(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      mask = _parseProps.mask,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["mask", "component", "className"]);

  var classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-a-hidden';
  var classSet = (0, _defineProperty2.default)({}, 'bg-color-' + (mask === true ? 'mask' : mask), mask);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

exports.default = _default;
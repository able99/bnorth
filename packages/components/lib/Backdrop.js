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

var _props = require("./utils/props");

var _Panel = _interopRequireDefault(require("./Panel"));

var _default = function _default(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      mask = _genCommonProps.mask,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      className = _genCommonProps.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["mask", "component", "className"]);

  var classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-hidden';
  var classSet = (0, _defineProperty2.default)({}, 'bg-color-' + (mask === true ? 'mask' : mask), mask);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props));
};

exports.default = _default;
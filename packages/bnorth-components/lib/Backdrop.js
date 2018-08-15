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

var _default = function _default(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      mask = _genCommonProps.mask,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["component", "className", "mask"]);

  var classSet = {
    'position-absolute': true,
    'square-full': true,
    'offset-start-left': true,
    'offset-start-top': true,
    'bg-color-mask': mask,
    'overflow-hidden': true
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props));
};

exports.default = _default;
module.exports = exports["default"];
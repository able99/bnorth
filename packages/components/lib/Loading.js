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

var _Loader = _interopRequireDefault(require("./Loader"));

var _default = function _default(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      progress = _genCommonProps.progress,
      _genCommonProps$heigh = _genCommonProps.height,
      height = _genCommonProps$heigh === void 0 ? 3 : _genCommonProps$heigh,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Loader.default : _genCommonProps$compo,
      className = _genCommonProps.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["progress", "height", "component", "className"]);

  var classStr = 'position-absolute offset-left-start offset-top-start offset-right-start width-full';
  return _react.default.createElement(Component, (0, _extends2.default)({
    type: "line",
    isProgress: true,
    progress: progress,
    className: (0, _props.cxm)(classStr, className),
    "bs-height": height
  }, props));
};

exports.default = _default;
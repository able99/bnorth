"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Loader = _interopRequireDefault(require("./Loader"));

var _default = function _default(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      progress = _parseProps.progress,
      _parseProps$height = _parseProps.height,
      height = _parseProps$height === void 0 ? 3 : _parseProps$height,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Loader.default : _parseProps$component,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["progress", "height", "component", "className"]);

  var classStr = 'position-absolute offset-left-start offset-top-start offset-right-start width-full';
  return _react.default.createElement(Component, (0, _extends2.default)({
    type: "line",
    isProgress: true,
    progress: progress,
    className: (0, _classes.default)(classStr, className),
    "bs-height": height
  }, props));
};

exports.default = _default;
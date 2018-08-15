"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactWaypoint = _interopRequireDefault(require("react-waypoint"));

var _props = require("./utils/props");

var _Loader = _interopRequireDefault(require("./Loader"));

var _this = void 0;

var InfiniteScroll = function InfiniteScroll(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      isLoading = _genCommonProps.isLoading,
      onLoading = _genCommonProps.onLoading,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Loader.default : _genCommonProps$compo,
      children = _genCommonProps.children,
      className = _genCommonProps.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["isLoading", "onLoading", "component", "children", "className"]);

  if (!isLoading) {
    return _react.default.createElement(_reactWaypoint.default, {
      onEnter: onLoading && onLoading.bind(_this)
    });
  } else {
    var classSet = {
      "text-align-center": className.indexOf('text-align') < 0,
      "margin": className.indexOf('margin') < 0
    };
    return _react.default.createElement(Component, (0, _extends2.default)({
      className: (0, _props.cx)(classSet, className)
    }, props), children);
  }
};

var _default = InfiniteScroll;
exports.default = _default;
module.exports = exports["default"];
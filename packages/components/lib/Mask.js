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

var _AnimationFade = _interopRequireDefault(require("./AnimationFade"));

var _default = function _default(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      transitonProps = _genCommonProps.transitonProps,
      _genCommonProps$in = _genCommonProps.in,
      isIn = _genCommonProps$in === void 0 ? true : _genCommonProps$in,
      timeout = _genCommonProps.timeout,
      onExited = _genCommonProps.onExited,
      _genCommonProps$Trans = _genCommonProps.Transition,
      Transition = _genCommonProps$Trans === void 0 ? _AnimationFade.default : _genCommonProps$Trans,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Loader.default : _genCommonProps$compo,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      cTheme = _genCommonProps.cTheme,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["transitonProps", "in", "timeout", "onExited", "Transition", "component", "containerClassName", "containerStyle", "cTheme"]);

  var classSetContainer = {
    'position-absolute': true,
    'square-full': true,
    'offset-start-left': true,
    'offset-start-top': true,
    'bg-color-mask': true,
    'overflow-hidden': true,
    'flex-display-flex': true,
    'flex-direction-v': true,
    'flex-justify-center': true,
    'flex-align-center': true
  };
  return _react.default.createElement(Transition, {
    transitonProps: transitonProps,
    in: isIn,
    timeout: timeout,
    onExited: onExited,
    className: (0, _props.cx)(classSetContainer, containerClassName)
  }, _react.default.createElement(Component, (0, _extends2.default)({
    cTheme: cTheme || 'white'
  }, props)));
};

exports.default = _default;
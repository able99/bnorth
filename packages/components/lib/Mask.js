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

var _Loader = _interopRequireDefault(require("./Loader"));

var _AnimationFade = _interopRequireDefault(require("./AnimationFade"));

var _default = function _default(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$mask = _genCommonProps.mask,
      mask = _genCommonProps$mask === void 0 ? true : _genCommonProps$mask,
      _genCommonProps$hasLo = _genCommonProps.hasLoader,
      hasLoader = _genCommonProps$hasLo === void 0 ? true : _genCommonProps$hasLo,
      _genCommonProps$compo = _genCommonProps.componentLoad,
      ComponnetLoader = _genCommonProps$compo === void 0 ? _Loader.default : _genCommonProps$compo,
      loaderProps = _genCommonProps.loaderProps,
      title = _genCommonProps.title,
      _genCommonProps$compo2 = _genCommonProps.componnetTitle,
      ComponentTitle = _genCommonProps$compo2 === void 0 ? _Panel.default : _genCommonProps$compo2,
      titleProps = _genCommonProps.titleProps,
      _genCommonProps$trans = _genCommonProps.transition,
      Transition = _genCommonProps$trans === void 0 ? _AnimationFade.default : _genCommonProps$trans,
      transitionProps = _genCommonProps.transitionProps,
      onTransitionFinished = _genCommonProps.onTransitionFinished,
      _genCommonProps$compo3 = _genCommonProps.component,
      component = _genCommonProps$compo3 === void 0 ? _Panel.default : _genCommonProps$compo3,
      className = _genCommonProps.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["mask", "hasLoader", "componentLoad", "loaderProps", "title", "componnetTitle", "titleProps", "transition", "transitionProps", "onTransitionFinished", "component", "className"]);

  var classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-hidden flex-display-block flex-direction-v flex-justify-center flex-align-center';
  return _react.default.createElement(Transition, (0, _extends2.default)({
    "b-style": "solid",
    "b-theme": mask === true ? 'mask' : mask,
    component: component,
    transitionProps: transitionProps,
    onTransitionFinished: onTransitionFinished,
    className: (0, _props.cxm)(classStr, className)
  }, props), hasLoader ? _react.default.createElement(ComponnetLoader, loaderProps) : null, title ? _react.default.createElement(ComponentTitle, (0, _extends2.default)({}, titleProps, {
    children: title
  })) : null);
};

exports.default = _default;
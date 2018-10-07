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

var _AnimationFade = _interopRequireDefault(require("./AnimationFade"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Loader = _interopRequireDefault(require("./Loader"));

var _default = function _default(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      _parseProps$mask = _parseProps.mask,
      mask = _parseProps$mask === void 0 ? true : _parseProps$mask,
      _parseProps$hasLoader = _parseProps.hasLoader,
      hasLoader = _parseProps$hasLoader === void 0 ? true : _parseProps$hasLoader,
      _parseProps$component = _parseProps.componentLoad,
      ComponnetLoader = _parseProps$component === void 0 ? _Loader.default : _parseProps$component,
      loaderProps = _parseProps.loaderProps,
      title = _parseProps.title,
      _parseProps$componnet = _parseProps.componnetTitle,
      ComponentTitle = _parseProps$componnet === void 0 ? _Panel.default : _parseProps$componnet,
      titleProps = _parseProps.titleProps,
      _parseProps$transitio = _parseProps.transition,
      Transition = _parseProps$transitio === void 0 ? _AnimationFade.default : _parseProps$transitio,
      transitionProps = _parseProps.transitionProps,
      onTransitionFinished = _parseProps.onTransitionFinished,
      _parseProps$component2 = _parseProps.component,
      component = _parseProps$component2 === void 0 ? _Panel.default : _parseProps$component2,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["mask", "hasLoader", "componentLoad", "loaderProps", "title", "componnetTitle", "titleProps", "transition", "transitionProps", "onTransitionFinished", "component", "className"]);

  var classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-a-hidden flex-display-block flex-direction-v flex-justify-center flex-align-center';
  return _react.default.createElement(Transition, (0, _extends2.default)({
    "b-style": "solid",
    "b-theme": mask === true ? 'mask' : mask,
    component: component,
    transitionProps: transitionProps,
    onTransitionFinished: onTransitionFinished,
    className: (0, _classes.default)(classStr, className)
  }, props), hasLoader ? _react.default.createElement(ComponnetLoader, loaderProps) : null, title ? _react.default.createElement(ComponentTitle, (0, _extends2.default)({}, titleProps, {
    children: title
  })) : null);
};

exports.default = _default;
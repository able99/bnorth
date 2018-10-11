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

var Backdrop = function Backdrop(aprops) {
  var _parseProps = (0, _props.default)(aprops, Backdrop.props),
      _parseProps$mask = _parseProps.mask,
      mask = _parseProps$mask === void 0 ? true : _parseProps$mask,
      _parseProps$transitio = _parseProps.transition,
      Transition = _parseProps$transitio === void 0 ? _AnimationFade.default : _parseProps$transitio,
      isIn = _parseProps.in,
      transitionProps = _parseProps.transitionProps,
      onTransitionFinished = _parseProps.onTransitionFinished,
      _parseProps$component = _parseProps.component,
      component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["mask", "transition", "in", "transitionProps", "onTransitionFinished", "component", "componentPanel", "className", "children"]);

  var classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-a-hidden';
  var classSet = mask ? "bg-color-".concat(mask === true ? 'mask' : mask) : '';
  return _react.default.createElement(Transition, (0, _extends2.default)({
    in: isIn,
    transitionProps: transitionProps,
    onTransitionFinished: onTransitionFinished,
    component: component,
    componentPanel: componentPanel,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), children);
};

var _default = Backdrop;
exports.default = _default;
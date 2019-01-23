"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Transition = _interopRequireDefault(require("react-transition-group/Transition"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _dom = require("./utils/dom");

var _props = _interopRequireDefault(require("./utils/props"));

/**
 * 淡入淡出动画
 * @module
 */
// Animation Fade
// --------------------------

/**
 * 淡入淡出动画组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 * @see {@link https://reactcommunity.org/react-transition-group/transition} react-transition-group
 */
var AnimationFade = function AnimationFade(aprops) {
  var _parseProps = (0, _props.default)(aprops, AnimationFade.props),
      isIn = _parseProps.in,
      timeout = _parseProps.timeout,
      onTransitionFinished = _parseProps.onTransitionFinished,
      _parseProps$transitio = _parseProps.transitionProps,
      transitionProps = _parseProps$transitio === void 0 ? {} : _parseProps$transitio,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["in", "timeout", "onTransitionFinished", "transitionProps"]);

  return _react.default.createElement(_Transition.default, (0, _extends2.default)({
    appear: true
  }, transitionProps, {
    in: isIn,
    timeout: timeout,
    onExited: (0, _dom.chainedFuncs)(transitionProps.onExited, onTransitionFinished)
  }), function (state) {
    return _react.default.createElement(AnimationFade.Content, (0, _extends2.default)({
      in: isIn,
      timeout: timeout
    }, props, {
      animationState: state
    }));
  });
};

AnimationFade.defaultProps = {};
/**
 * 设置是否进入动画
 * @type {boolean}
 */

AnimationFade.defaultProps.in = true;
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */

AnimationFade.defaultProps.timeout = 350;
/**
 * 设置动画完成时的回调函数
 * @attribute module:AnimationFade.AnimationFade.onTransitionFinished
 * @type {function}
 */

/**
 * 设置动画组件的属性
 * @attribute module:AnimationFade.AnimationFade.transitionProps
 * @type {object}
 */

var _default = AnimationFade; // Animation Fade Content
// --------------------------

/**
 * 淡入淡出动画组件的内容组件，用来包裹具体淡入淡出内容
 * @component 
 * @private
 * @augments BaseComponent
 * @mount AnimationFade.Content
 */

exports.default = _default;

var _Content = function Content(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Content.props),
      isIn = _parseProps2.in,
      timeout = _parseProps2.timeout,
      animationState = _parseProps2.animationState,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? 'div' : _parseProps2$componen,
      style = _parseProps2.style,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["in", "timeout", "animationState", "component", "style", "className", "children"]);

  var classSet = "opacity-".concat(animationState === 'entered' || animationState === 'entering' ? '100' : isIn ? '50' : '0');
  var styleSet = (0, _objectSpread2.default)({}, style, (0, _animation.transiton)("".concat(timeout, "ms"), {
    property: 'opacity'
  }));
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: styleSet,
    className: (0, _classes.default)(classSet, className)
  }, props), children);
};

_Content.defaultProps = {};
/**
 * 参见 AnimationFade
 * @attribute module:AnimationFade~Content.in
 */

/**
 * 参见 AnimationFade
 * @attribute module:AnimationFade~Content.timeout
 */

/**
 * 参见 AnimationFade
 * @attribute module:AnimationFade~Content.dimension
 */

/**
 * 动画状态，entering，entered，exiting，exited
 * @attribute module:AnimationFade~Content.animationState
 * @type {string}
 */

/**
 * 参见 BaseComponent
 */

_Content.defaultProps.component = 'div';
Object.defineProperty(AnimationFade, "Content", {
  get: function get() {
    return _Content;
  },
  set: function set(val) {
    _Content = val;
  }
});
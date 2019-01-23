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

var _props = _interopRequireDefault(require("./utils/props"));

var _dom = require("./utils/dom");

/**
 * @module
 */
// Animation Collapse
// --------------------------

/**
 * 折叠动画组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 * @see {@link https://reactcommunity.org/react-transition-group/transition} react-transition-group
 */
var AnimationCollapse = function AnimationCollapse(aprops) {
  var _parseProps = (0, _props.default)(aprops, AnimationCollapse.props),
      isIn = _parseProps.in,
      timeout = _parseProps.timeout,
      dimension = _parseProps.dimension,
      onTransitionFinished = _parseProps.onTransitionFinished,
      _parseProps$transitio = _parseProps.transitionProps,
      transitionProps = _parseProps$transitio === void 0 ? {} : _parseProps$transitio,
      onEnter = _parseProps.onEnter,
      onEntering = _parseProps.onEntering,
      onEntered = _parseProps.onEntered,
      onExit = _parseProps.onExit,
      onExiting = _parseProps.onExiting,
      onExited = _parseProps.onExited,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["in", "timeout", "dimension", "onTransitionFinished", "transitionProps", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"]);

  return _react.default.createElement(_Transition.default, (0, _extends2.default)({
    appear: true
  }, transitionProps, {
    in: isIn,
    timeout: timeout,
    onEnter: (0, _dom.chainedFuncs)(AnimationCollapse.handleEnter.bind(null, {
      dimension: dimension
    }), transitionProps.onEnter),
    onEntering: (0, _dom.chainedFuncs)(AnimationCollapse.handleEntering.bind(null, {
      dimension: dimension
    }), transitionProps.onEntering),
    onEntered: (0, _dom.chainedFuncs)(AnimationCollapse.handleEntered.bind(null, {
      dimension: dimension
    }), transitionProps.onEntered),
    onExit: (0, _dom.chainedFuncs)(AnimationCollapse.handleExit.bind(null, {
      dimension: dimension
    }), transitionProps.onExit),
    onExiting: (0, _dom.chainedFuncs)(AnimationCollapse.handleExiting.bind(null, {
      dimension: dimension
    }), transitionProps.onExiting),
    onExited: (0, _dom.chainedFuncs)(AnimationCollapse.handleExited.bind(null, {
      dimension: dimension
    }), transitionProps.onExited, onTransitionFinished)
  }), function (state) {
    return _react.default.createElement(_Content, (0, _extends2.default)({
      isIn: isIn,
      timeout: timeout,
      dimension: dimension
    }, props, {
      animationState: state
    }));
  });
};

AnimationCollapse.defaultProps = {};
/**
 * 设置是否进入动画
 * @type {boolean}
 */

AnimationCollapse.defaultProps.in = true;
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */

AnimationCollapse.defaultProps.timeout = 350;
/**
 * 设置折叠的方向，width 与 height
 * @type {string}
 */

AnimationCollapse.defaultProps.dimension = "height";
/**
 * 设置动画完成时的回调函数
 * @attribute module:AnimationCollapse.AnimationCollapse.onTransitionFinished
 * @type {function}
 */

/**
 * 设置动画组件的属性
 * @attribute module:AnimationCollapse.AnimationCollapse.transitionProps
 * @type {object}
 */

/**
 * 动画各个阶段回调函数
 * @callback animationCallback
 * @param {object} props - 动画组件的属性
 * @param {element} element - 动画组件内容的 dom 元素
 */

/**
 * 动画处理函数：动画开始进入
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */

AnimationCollapse.handleEnter = function (aprops, elem) {
  var dimension = aprops.dimension;
  elem.style[dimension] = '0';
};
/**
 * 动画处理函数：动画进入中
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */


AnimationCollapse.handleEntering = function (aprops, elem) {
  var dimension = aprops.dimension;
  elem.style[dimension] = (0, _dom.domGetScrollDimensionValue)(elem, dimension);
};
/**
 * 动画处理函数：动画进入完成
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */


AnimationCollapse.handleEntered = function (aprops, elem) {
  var dimension = aprops.dimension;
  elem.style[dimension] = null;
};
/**
 * 动画处理函数：动画开始退出
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */


AnimationCollapse.handleExit = function (aprops, elem) {
  var dimension = aprops.dimension;
  elem.style[dimension] = (0, _dom.domGetDimensionValue)(elem, dimension) + 'px';
  (0, _dom.domTriggerBrowserReflow)(elem);
};
/**
 * 动画处理函数：动画退出中
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */


AnimationCollapse.handleExiting = function (aprops, elem) {
  var dimension = aprops.dimension;
  elem.style[dimension] = '0';
};
/**
 * 动画处理函数：动画退出完成
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */


AnimationCollapse.handleExited = function (aprops, elem) {};

var _default = AnimationCollapse; // Animation Collapse Content
// --------------------------

/**
 * 折叠动画组件的内容组件，用来包裹具体折叠内容
 * @component 
 * @private
 * @augments BaseComponent
 * @mount AnimationCollapse.Content
 */

exports.default = _default;

var _Content = function Content(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Content.props),
      isIn = _parseProps2.isIn,
      timeout = _parseProps2.timeout,
      dimension = _parseProps2.dimension,
      animationState = _parseProps2.animationState,
      Component = _parseProps2.component,
      style = _parseProps2.style,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isIn", "timeout", "dimension", "animationState", "component", "style", "className", "children"]);

  var classSet = {
    'overflow-a-hidden': true,
    'text-white-space-nowrap': true,
    'display-none': !isIn & animationState === 'exited'
  };
  var styleSet = (0, _objectSpread2.default)({}, style, (0, _animation.transiton)("".concat(timeout, "ms"), {
    property: dimension
  }));
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: styleSet,
    className: (0, _classes.default)(classSet, className)
  }, props), children);
};

_Content.defaultProps = {};
/**
 * 参见 AnimationCollapse
 * @attribute module:AnimationCollapse~Content.in
 */

/**
 * 参见 AnimationCollapse
 * @attribute module:AnimationCollapse~Content.timeout
 */

/**
 * 参见 AnimationCollapse
 * @attribute module:AnimationCollapse~Content.dimension
 */

/**
 * 动画状态，entering，entered，exiting，exited
 * @attribute module:AnimationCollapse~Content.animationState
 * @type {string}
 */

/**
 * 参见 BaseComponent
 */

_Content.defaultProps.component = 'div';
Object.defineProperty(AnimationCollapse, "Content", {
  get: function get() {
    return _Content;
  },
  set: function set(val) {
    _Content = val;
  }
});
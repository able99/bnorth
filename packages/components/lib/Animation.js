"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _BaseComponent2 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */

/**
 * 折叠动画组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
var Animation = function Animation(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, Animation),
      type = _BaseComponent.type,
      onFinished = _BaseComponent.onFinished,
      _BaseComponent$transi = _BaseComponent.transitionProps;

  _BaseComponent$transi = _BaseComponent$transi === void 0 ? {} : _BaseComponent$transi;
  var onEnter = _BaseComponent$transi.onEnter,
      onEntering = _BaseComponent$transi.onEntering,
      onEntered = _BaseComponent$transi.onEntered,
      onExit = _BaseComponent$transi.onExit,
      onExiting = _BaseComponent$transi.onExiting,
      onExited = _BaseComponent$transi.onExited,
      transitionProps = (0, _objectWithoutProperties2.default)(_BaseComponent$transi, ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"]),
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "onFinished", "transitionProps"]);
  type = Animation.types[type] || Animation.types['none'];
  return _react.default.createElement(_Transition.default, (0, _extends2.default)({
    appear: true,
    in: props.in,
    timeout: props.timeout,
    onEnter: (0, _BaseComponent2.chainedFuncs)(type.onEnter && type.onEnter.bind(null, props), onEnter && onEnter.bind(null, props)),
    onEntering: (0, _BaseComponent2.chainedFuncs)(type.onEntering && type.onEntering.bind(null, props), onEntering && onEntering.bind(null, props)),
    onEntered: (0, _BaseComponent2.chainedFuncs)(type.onEntered && type.onEntered.bind(null, props), onEntered && onEntered.bind(null, props)),
    onExit: (0, _BaseComponent2.chainedFuncs)(type.onExit && type.onExit.bind(null, props), onExit && onExit.bind(null, props)),
    onExiting: (0, _BaseComponent2.chainedFuncs)(type.onExiting && type.onExiting.bind(null, props), onExiting && onExiting.bind(null, props)),
    onExited: (0, _BaseComponent2.chainedFuncs)(type.onExited && type.onExited.bind(null, props), onExited && onExited.bind(null, props), onFinished)
  }, transitionProps), function (state) {
    return _react.default.createElement(_Panel.default, type.getProps ? type.getProps(state, props) : props);
  });
};

Animation.defaultProps = {};
/**
 * 设置动画的类型
 * @type {boolean}
 */

Animation.defaultProps.type = 'fade';
/**
 * 设置是否进入动画
 * @type {boolean}
 */

Animation.defaultProps.in = true;
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */

Animation.defaultProps.timeout = 350;
/**
 * 设置折叠动画的方向，width 与 height
 * @type {string}
 */

Animation.defaultProps.dimension = "height";
/**
 * 设置动画完成时的回调函数
 * @attribute module:Animation.Animation.onFinished
 * @type {function}
 */

/**
 * 设置动画组件的属性
 * @attribute module:Animation.Animation.transitionProps
 * @see {@link https://reactcommunity.org/react-transition-group/transition} react-transition-group
 * @type {object}
 */

Animation.types = {
  none: {
    getProps: function getProps(state, props) {
      delete props.in;
      delete props.timeout;
      return props;
    }
  },
  fade: {
    getProps: function getProps(state, aprops) {
      var isIn = aprops.in,
          timeout = aprops.timeout,
          props = (0, _objectWithoutProperties2.default)(aprops, ["in", "timeout"]);
      props.classNamePre = "opacity-".concat(state === 'entered' || state === 'entering' ? '100' : isIn ? '50' : '0');
      props.stylePre = (0, _objectSpread2.default)({}, (0, _animation.transiton)("".concat(timeout, "ms"), {
        property: 'opacity'
      }));
      return props;
    }
  },
  collapse: {
    getProps: function getProps(state, aprops) {
      var isIn = aprops.in,
          timeout = aprops.timeout,
          dimension = aprops.dimension,
          props = (0, _objectWithoutProperties2.default)(aprops, ["in", "timeout", "dimension"]);
      props.classNamePre = {
        'overflow-a-hidden': true,
        'text-white-space-nowrap': true,
        'display-none': !isIn & state === 'exited'
      };
      props.stylePre = (0, _objectSpread2.default)({}, (0, _animation.transiton)("".concat(timeout, "ms"), {
        property: dimension
      }));
      return props;
    },
    onEnter: function onEnter(props, elem) {
      var dimension = props.dimension;
      elem.style[dimension] = '0';
    },
    onEntering: function onEntering(props, elem) {
      var dimension = props.dimension;
      elem.style[dimension] = (0, _BaseComponent2.domGetScrollDimensionValue)(elem, dimension);
    },
    onEntered: function onEntered(props, elem) {
      var dimension = props.dimension;
      elem.style[dimension] = null;
    },
    onExit: function onExit(props, elem) {
      var dimension = props.dimension;
      elem.style[dimension] = (0, _BaseComponent2.domGetDimensionValue)(elem, dimension) + 'px';
      (0, _BaseComponent2.domTriggerBrowserReflow)(elem);
    },
    onExiting: function onExiting(props, elem) {
      var dimension = props.dimension;
      elem.style[dimension] = '0';
    }
  }
};
var _default = Animation;
exports.default = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Transition = _interopRequireDefault(require("react-transition-group/Transition"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _BaseComponent2 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 折叠动画组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @see {@link https://reactcommunity.org/react-transition-group/transition} react-transition-group
 */
var _Animation = function Animation(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Animation),
      type = _BaseComponent.type,
      types = _BaseComponent.types,
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
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "types", "onFinished", "transitionProps"]);
  type = types[type] || types['none'];
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
    return _react.default.createElement(_Panel.default, (0, _extends2.default)({
      btn: false
    }, type.getProps ? type.getProps(state, props) : props));
  });
};

_Animation.defaultProps = {};
/**
 * 设置动画的类型
 * @type {boolean}
 */

_Animation.defaultProps.type = 'fade';
/**
 * 设置是否进入动画
 * @type {boolean}
 */

_Animation.defaultProps.in = true;
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */

_Animation.defaultProps.timeout = 350;
/**
 * 设置折叠动画的方向，width 与 height
 * @type {string}
 */

_Animation.defaultProps.dimension = "height";
/**
 * 设置动画完成时的回调函数
 * @attribute module:Animation.Animation.onFinished
 * @type {function}
 */

/**
 * 设置动画组件的属性
 * @attribute module:Animation.Animation.transitionProps
 * @type {object}
 */

_Animation.defaultProps.types = {
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
          dimension = aprops.dimension,
          classNamePre = aprops.classNamePre,
          stylePre = aprops.stylePre,
          props = (0, _objectWithoutProperties2.default)(aprops, ["in", "timeout", "dimension", "classNamePre", "stylePre"]);
      props.classNamePre = _objectSpread((0, _defineProperty3.default)({}, "opacity-".concat(state === 'entered' || state === 'entering' ? '100' : isIn ? '50' : '0'), true), classNamePre);
      props.stylePre = _objectSpread({}, (0, _animation.transiton)("".concat(timeout, "ms"), {
        property: 'opacity'
      }), {}, stylePre);
      return props;
    }
  },
  collapse: {
    getProps: function getProps(state, aprops) {
      var isIn = aprops.in,
          timeout = aprops.timeout,
          dimension = aprops.dimension,
          classNamePre = aprops.classNamePre,
          stylePre = aprops.stylePre,
          props = (0, _objectWithoutProperties2.default)(aprops, ["in", "timeout", "dimension", "classNamePre", "stylePre"]);
      props.classNamePre = _objectSpread({
        'overflow-a-hidden text-white-space-nowrap': true,
        'display-none': !isIn & state === 'exited'
      }, classNamePre);
      props.stylePre = _objectSpread({}, (0, _animation.transiton)("".concat(timeout, "ms"), {
        property: dimension
      }), {}, stylePre);
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
(0, _defineProperty2.default)(_Animation, "Animation", {
  get: function get() {
    return _Animation;
  },
  set: function set(val) {
    _Animation = val;
  }
});
_Animation.isBnorth = true;
_Animation.defaultProps['b-precast'] = {};
var _default = _Animation;
exports.default = _default;
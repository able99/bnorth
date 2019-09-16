"use strict";

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

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _animationFrame = require("@bnorth/rich.css/lib/styles/animationFrame");

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _AnimationFrame = _interopRequireDefault(require("./AnimationFrame"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 背景组件
 * 
 * Backdrop 会填满第一个具有 relative，absolute 或 fixed 位置属性的上级元素，并提供背景样式和点击操作等
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments module:Animation.Animation
 */
var _Backdrop = function Backdrop(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Backdrop),
      play = _BaseComponent.play,
      rewind = _BaseComponent.rewind,
      frameFunc = _BaseComponent.frameFunc,
      _BaseComponent$params = _BaseComponent.params,
      params = _BaseComponent$params === void 0 ? {} : _BaseComponent$params,
      onFinished = _BaseComponent.onFinished,
      duration = _BaseComponent.duration,
      classNamePre = _BaseComponent.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["play", "rewind", "frameFunc", "params", "onFinished", "duration", "classNamePre"]);

  classNamePre = _objectSpread({
    'position-absolute square-full offset-a-start overflow-a-hidden': true
  }, classNamePre);
  return _react.default.createElement(_AnimationFrame.default, {
    play: play,
    rewind: rewind,
    frameFunc: frameFunc,
    params: params,
    onFinished: onFinished
  }, _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "b-style": "mask",
    clickable: false,
    classNamePre: classNamePre
  }, props)));
};

_Backdrop.defaultProps = {};
_Backdrop.defaultProps.frameFunc = _animationFrame.afFade;
(0, _defineProperty2.default)(_Backdrop, "Backdrop", {
  get: function get() {
    return _Backdrop;
  },
  set: function set(val) {
    _Backdrop = val;
  }
});
_Backdrop.isBnorth = true;
_Backdrop.defaultProps['b-precast'] = {};
var _default = _Backdrop;
exports.default = _default;
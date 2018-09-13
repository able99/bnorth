"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _props = require("./utils/props");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Loader = function Loader(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$timeo = _genCommonProps.timeout,
      timeout = _genCommonProps$timeo === void 0 ? '1.5s' : _genCommonProps$timeo,
      _genCommonProps$delay = _genCommonProps.delay,
      delay = _genCommonProps$delay === void 0 ? 0.2 : _genCommonProps$delay,
      _genCommonProps$keyfr = _genCommonProps.keyframe,
      keyframe = _genCommonProps$keyfr === void 0 ? 'bouncedelay' : _genCommonProps$keyfr,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'span' : _genCommonProps$compo,
      className = _genCommonProps.className,
      style = _genCommonProps.style,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["timeout", "delay", "keyframe", "component", "className", "style", "containerClassName", "containerStyle", "cTheme", "cStyle", "cSize", "children"]);

  var classSetItem = function classSetItem(i) {
    return (0, _objectSpread3.default)({
      'width-em': true,
      'height-em': true,
      'margin-left-sm': i,
      'display-inline-block': true
    }, cStyle !== 'hollow' ? (0, _defineProperty2.default)({}, 'bg-color-' + (cTheme || 'component'), !(0, _props.hascx)(className, 'bg-color')) : (0, _defineProperty2.default)({
      'bg-color-white': !(0, _props.hascx)(className, 'bg-color')
    }, 'border-set-' + (cTheme || 'component'), !(0, _props.hascx)(className, 'border')), (0, _defineProperty2.default)({}, 'text-size-' + cSize, cSize));
  };

  var styleSetItem = function styleSetItem(i) {
    return (0, _objectSpread3.default)({}, (0, _animation.animation)(keyframe, timeout, {
      delay: "".concat(delay * i, "s")
    }), style);
  };

  var classSet = {
    'text-align-center': true
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, containerClassName)
  }, props), Array(3).fill(0).map(function (v, i) {
    return _react.default.createElement("div", {
      key: i,
      style: styleSetItem(i),
      className: (0, _props.cx)(classSetItem(i), className)
    });
  }), children);
};

var _default = Loader;
exports.default = _default;
module.exports = exports["default"];
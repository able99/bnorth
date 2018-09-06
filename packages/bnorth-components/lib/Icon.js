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

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Icon = function Icon(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      name = _genCommonProps.name,
      src = _genCommonProps.src,
      _genCommonProps$imgPr = _genCommonProps.imgProps;

  _genCommonProps$imgPr = _genCommonProps$imgPr === void 0 ? {} : _genCommonProps$imgPr;
  var imgClassName = _genCommonProps$imgPr.className,
      imgProps = (0, _objectWithoutProperties2.default)(_genCommonProps$imgPr, ["className"]),
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'span' : _genCommonProps$compo,
      className = _genCommonProps.className,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["name", "src", "imgProps", "component", "className", "cTheme", "cStyle", "cSize", "children"]);
  var classSet = {
    'font-smoothing-antialiased': true,
    'text-decoration-none': true,
    'line-height-1': true,
    'display-inline-block': !(0, _props.hascx)(className, 'display') && !(0, _props.hascx)(className, 'flex-display'),
    'overflow-hidden': true
  };

  if (cStyle === 'hollow') {
    classSet['padding-xxs'] = !(0, _props.hascx)(className, 'padding');
    classSet['bg-color-white'] = true;

    if (cTheme) {
      classSet['border-set-' + cTheme] = true;
      classSet['text-color-' + cTheme] = true;
    } else {
      classSet['border-set-border'] = true;
    }
  } else if (cStyle === 'solid') {
    classSet['padding-xxs'] = !(0, _props.hascx)(className, 'padding');

    if (cTheme) {
      classSet['bg-color-' + cTheme] = true;
      classSet['border-set-' + cTheme] = true;
      classSet['text-color-white'] = !(0, _props.hascx)(className, 'text-color');
    } else {
      classSet['bg-color-component'] = true;
      classSet['border-set-component'] = true;
    }
  } else {
    classSet['text-color-' + cTheme] = cTheme;
  }

  classSet['text-size-' + cSize] = cSize;
  if (name) props['data-icon-name'] = Icon.getCode(name);
  var classSetImg = {
    'width-auto': true,
    'height-em': true,
    'min-height-em': true,
    'display-block': true
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)('icon', classSet, className)
  }, props), src ? _react.default.createElement("img", (0, _extends2.default)({
    alt: "",
    src: src,
    className: (0, _props.cx)(classSetImg, imgClassName)
  }, imgProps)) : null, children);
};

Icon.names = {};
Icon.codes = {};

Icon.getName = function (name, defval) {
  return Icon.names[name] || defval;
};

Icon.getCode = function (name) {
  return Icon.codes[name] || name;
};

var _default = Icon;
exports.default = _default;
module.exports = exports["default"];
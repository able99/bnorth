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

var _react = _interopRequireWildcard(require("react"));

var _props = require("./utils/props");

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Button = function Button(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      selected = _genCommonProps.selected,
      _genCommonProps$under = _genCommonProps.underLineProps,
      underLineProps = _genCommonProps$under === void 0 ? {} : _genCommonProps$under,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'button' : _genCommonProps$compo,
      className = _genCommonProps.className,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["selected", "underLineProps", "component", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = {
    'outline-none': true,
    'appearance-none': true,
    'font-smoothing-antialiased': true,
    'vertical-align-middle': true,
    'position-relative': !(0, _props.hascx)(className, 'position'),
    'transition': true,
    'line-height-1': true,
    'cursor-pointer': true,
    'text-align-center': !(0, _props.hascx)(className, 'text-align'),
    'padding-xl': !(0, _props.hascx)(className, 'padding'),
    'button-active': cStyle === 'underline'
  };
  classSet["text-size-".concat(cSize)] = cSize;

  if (cStyle === 'hollow') {
    classSet['bg-none'] = !(0, _props.hascx)(className, 'bg-color');

    if (cTheme) {
      classSet['border-set-' + cTheme] = true;
      classSet['text-color-' + cTheme] = true;
    } else {
      classSet['border-set-border'] = true;
      classSet['text-color-normal'] = true;
    }
  } else if (cStyle === 'underline') {
    classSet['border-none'] = true;
    classSet['text-color-' + cTheme] = cTheme;
  } else if (cStyle === 'plain') {
    classSet['bg-none'] = true;
    classSet['border-none'] = true;

    if (cTheme) {
      classSet['text-color-' + cTheme] = true;
    }
  } else {
    if (cTheme) {
      classSet['bg-color-' + cTheme] = true;
      classSet['border-set-' + cTheme] = true;
      classSet['text-color-white'] = true;
    } else {
      classSet['bg-color-component'] = true;
      classSet['border-set-component'] = true;
      classSet['text-color-normal'] = true;
    }
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), children, _react.default.createElement(Button.UnderLine, (0, _extends2.default)({
    selected: selected,
    cTheme: cTheme,
    cStyle: cStyle,
    cSize: cSize
  }, underLineProps)));
};

Button.UnderLine = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      selected = _genCommonProps2.selected,
      cTheme = _genCommonProps2.cTheme,
      cStyle = _genCommonProps2.cStyle,
      cSize = _genCommonProps2.cSize,
      style = _genCommonProps2.style,
      className = _genCommonProps2.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["selected", "cTheme", "cStyle", "cSize", "style", "className"]);

  var classSet = {};
  classSet['position-absolute'] = true;
  classSet['offset-start-left'] = true;
  classSet['offset-start-right'] = true;
  classSet['offset-start-bottom'] = true;
  classSet['bg-color-' + (cTheme || 'component')] = true;
  classSet['transition'] = true;
  classSet['pointer-events-none'] = true;
  classSet['opacity-' + (selected ? '1' : '0')] = true;
  var styleSet = {
    height: 2
  };
  return _react.default.createElement("div", (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cx)(classSet, className)
  }, props));
};

var ButtonGroup = function ButtonGroup(aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      stacked = _genCommonProps3.stacked,
      justify = _genCommonProps3.justify,
      separator = _genCommonProps3.separator,
      _genCommonProps3$sepa = _genCommonProps3.separatorProps,
      separatorProps = _genCommonProps3$sepa === void 0 ? {} : _genCommonProps3$sepa,
      _genCommonProps3$butt = _genCommonProps3.buttonProps,
      buttonProps = _genCommonProps3$butt === void 0 ? {} : _genCommonProps3$butt,
      _genCommonProps3$getB = _genCommonProps3.getButtonClassName,
      getButtonClassName = _genCommonProps3$getB === void 0 ? function (i, size, componentProps, className) {
    return {
      'border-none-right': !stacked && !i >= size - 1,
      'border-none-left': separator && !i === 0,
      'border-none-bottom': stacked && !i >= size - 1,
      'flex-sub-flex-extend': justify,
      'width-full': stacked
    };
  } : _genCommonProps3$getB,
      getButtonProps = _genCommonProps3.getButtonProps,
      getButtonStyle = _genCommonProps3.getButtonStyle,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? 'span' : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      cTheme = _genCommonProps3.cTheme,
      cSize = _genCommonProps3.cSize,
      cStyle = _genCommonProps3.cStyle,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["stacked", "justify", "separator", "separatorProps", "buttonProps", "getButtonClassName", "getButtonProps", "getButtonStyle", "component", "className", "cTheme", "cSize", "cStyle", "children"]);

  var classSet = {
    'flex-display-flex': justify && !(0, _props.hascx)(className, 'flex-display'),
    'flex-align-stretch': justify && !(0, _props.hascx)(className, 'flex-align'),
    'display-inline-block': stacked && !(0, _props.hascx)(className, 'display')
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).map(function (v, i, arr) {
    return (0, _react.cloneElement)(v, (0, _objectSpread2.default)({
      cTheme: cTheme,
      cSize: cSize,
      cStyle: cStyle
    }, (0, _props.genItemProps)(i, arr.length, v.props, buttonProps, getButtonClassName, getButtonProps, getButtonStyle)));
  }).reduce(function (v1, v2, i, arr) {
    if (!separator || stacked) return arr;
    if (i > 0) v1.push(_react.default.createElement(ButtonGroup.Separator, (0, _extends2.default)({
      key: 'sep' + i,
      i: i
    }, separatorProps)));
    v1.push(v2);
    return v1;
  }, []));
};

ButtonGroup.Separator = function (aprops) {
  var _genCommonProps4 = (0, _props.genCommonProps)(aprops),
      i = _genCommonProps4.i,
      className = _genCommonProps4.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["i", "className"]);

  var classSet = {
    'width-1': true,
    'display-inline-block': true,
    'flex-sub-flex-none': true,
    'bg-color-border': className.startsWith('bg-color') < 0,
    'margin-v-xl': className.indexOf('margin') < 0
  };
  return _react.default.createElement("span", (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), "\xA0");
};

Button.Group = ButtonGroup;
var _default = Button;
exports.default = _default;
module.exports = exports["default"];
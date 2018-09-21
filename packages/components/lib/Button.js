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
      _genCommonProps$color = _genCommonProps.colorOnTheme,
      colorOnTheme = _genCommonProps$color === void 0 ? 'white' : _genCommonProps$color,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'button' : _genCommonProps$compo,
      className = _genCommonProps.className,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["selected", "underLineProps", "colorOnTheme", "component", "className", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = ' outline-none- appearance-none- font-smoothing-antialiased- transition-set-';
  classStr += ' vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-xl';
  var classSet = [];
  if (bSize !== undefined) classSet.push('text-size-' + (bSize === true ? '' : bSize));

  if (bStyle === 'hollow' && bTheme) {
    classSet.push('bg-none-a-');
    classSet.push('border-set-' + (bTheme === true ? 'primary' : bTheme));
    classSet.push('text-color-' + (bTheme === true ? 'primary' : bTheme));
  } else if (bStyle === 'hollow' && !bTheme) {
    classSet.push('bg-none-a-');
    classSet.push('border-set-');
  } else if (bStyle === 'underline') {
    classSet.push('border-none-a-');
    if (bTheme) classSet.push('text-color-' + (bTheme === true ? 'primary' : bTheme));
    classSet.push('button-active');
  } else if (bStyle === 'plain') {
    classSet.push('bg-none-a-');
    classSet.push('border-none-a-');
    if (bTheme) classSet.push('text-color-' + (bTheme === true ? 'primary' : bTheme));
  } else if (bTheme) {
    classSet.push('bg-color-' + (bTheme === true ? 'primary' : bTheme));
    classSet.push('border-set-' + (bTheme === true ? 'primary' : bTheme));
    if (colorOnTheme) classSet.push('text-color-' + (colorOnTheme === true ? '' : colorOnTheme));
  } else {
    classSet.push('bg-color-component');
    classSet.push('border-set-component');
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), children, bStyle === 'underline' ? _react.default.createElement(Button.UnderLine, (0, _extends2.default)({
    selected: selected,
    "b-theme": bTheme,
    "b-style": bStyle,
    "b-size": bSize
  }, underLineProps)) : null);
};

Button.UnderLine = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      selected = _genCommonProps2.selected,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'div' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      style = _genCommonProps2.style,
      _genCommonProps2$bTh = _genCommonProps2['b-theme'],
      bTheme = _genCommonProps2$bTh === void 0 ? 'component' : _genCommonProps2$bTh,
      bStyle = _genCommonProps2['b-style'],
      bSize = _genCommonProps2['b-size'],
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["selected", "component", "className", "style", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'position-absolute offset-left-start offset-right-start offset-bottom-start transition-set- pointer-events-none';
  var styleSet = {};
  styleSet.height = 2;
  var classSet = [];
  classSet.push('opacity-' + (selected ? '1' : '0'));
  classSet.push('bg-color-' + (bTheme === true ? '' : bTheme));
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props));
};

Button.Group = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      stacked = _genCommonProps3.stacked,
      justify = _genCommonProps3.justify,
      separator = _genCommonProps3.separator,
      _genCommonProps3$sepa = _genCommonProps3.separatorProps,
      separatorProps = _genCommonProps3$sepa === void 0 ? {} : _genCommonProps3$sepa,
      _genCommonProps3$butt = _genCommonProps3.buttonProps,
      buttonProps = _genCommonProps3$butt === void 0 ? {} : _genCommonProps3$butt,
      _genCommonProps3$butt2 = _genCommonProps3.buttonGetClassName,
      buttonGetClassName = _genCommonProps3$butt2 === void 0 ? Button.Group.buttonGetClassName : _genCommonProps3$butt2,
      _genCommonProps3$butt3 = _genCommonProps3.buttonGetStyle,
      buttonGetStyle = _genCommonProps3$butt3 === void 0 ? Button.Group.buttonGetStyle : _genCommonProps3$butt3,
      _genCommonProps3$butt4 = _genCommonProps3.buttonGetProps,
      buttonGetProps = _genCommonProps3$butt4 === void 0 ? Button.Group.getButtonProps : _genCommonProps3$butt4,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? 'div' : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      bTheme = _genCommonProps3['b-theme'],
      bStyle = _genCommonProps3['b-style'],
      bSize = _genCommonProps3['b-size'],
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["stacked", "justify", "separator", "separatorProps", "buttonProps", "buttonGetClassName", "buttonGetStyle", "buttonGetProps", "component", "className", 'b-theme', 'b-style', 'b-size', "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  });
  var classSet = {
    'flex-display-block': justify,
    'flex-align-stretch': justify,
    'display-inline-block': stacked
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classSet, className)
  }, props), children.map(function (v, i, a) {
    return _react.default.createElement(Button, (0, _extends2.default)({
      key: i
    }, (0, _props.getSubComponentProps)(i, a.length, aprops, v.props, buttonProps, buttonGetClassName, buttonGetStyle, buttonGetProps)));
  }).reduce(function (v1, v2, i, a) {
    if (!separator || stacked) return a;
    if (i > 0) v1.push(_react.default.createElement(Button.Group.Separator, (0, _extends2.default)({
      key: 'sep' + i,
      i: i,
      length: a.length
    }, separatorProps)));
    v1.push(v2);
    return v1;
  }, []));
};

Button.Group.buttonGetClassName = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      stacked = _ref.stacked,
      justify = _ref.justify,
      separator = _ref.separator;

  var subPropsEach = arguments.length > 3 ? arguments[3] : undefined;
  var subProps = arguments.length > 4 ? arguments[4] : undefined;
  return {
    'border-none-right': !stacked && !i >= length - 1,
    'border-none-left': separator && !i === 0,
    'border-none-bottom': stacked && !i >= length - 1,
    'flex-sub-flex-extend': justify,
    'width-full': stacked
  };
};

Button.Group.Separator = function (aprops) {
  var _genCommonProps4 = (0, _props.genCommonProps)(aprops),
      _genCommonProps4$comp = _genCommonProps4.component,
      Component = _genCommonProps4$comp === void 0 ? 'span' : _genCommonProps4$comp,
      className = _genCommonProps4.className,
      style = _genCommonProps4.style,
      bTheme = _genCommonProps4['b-theme'],
      bStyle = _genCommonProps4['b-style'],
      bSize = _genCommonProps4['b-size'],
      children = _genCommonProps4.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["component", "className", "style", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'display-inline-block lex-sub-flex-none bg-color-border margin-v-xl';
  var styleSet = {};
  styleSet.width = 1;
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cxm)(classStr, className)
  }, props), "\xA0");
};

var _default = Button;
exports.default = _default;
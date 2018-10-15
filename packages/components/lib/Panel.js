"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Panel = function Panel(aprops) {
  var _parseProps = (0, _props.default)(aprops, Panel.props),
      main = _parseProps.main,
      inline = _parseProps.inline,
      selected = _parseProps.selected,
      status = _parseProps.status,
      hasBg = _parseProps.hasBg,
      hasSelection = _parseProps.hasSelection,
      _parseProps$textTheme = _parseProps.textThemeOnBg,
      textThemeOnBg = _parseProps$textTheme === void 0 ? 'white' : _parseProps$textTheme,
      _parseProps$bgThemeOn = _parseProps.bgThemeOnHollow,
      bgThemeOnHollow = _parseProps$bgThemeOn === void 0 ? 'white' : _parseProps$bgThemeOn,
      _parseProps$textTheme2 = _parseProps.textThemeOnBgSelected,
      textThemeOnBgSelected = _parseProps$textTheme2 === void 0 ? 'white' : _parseProps$textTheme2,
      _parseProps$textTheme3 = _parseProps.textThemeOnBgUnselected,
      textThemeOnBgUnselected = _parseProps$textTheme3 === void 0 ? 'disable' : _parseProps$textTheme3,
      _parseProps$textTheme4 = _parseProps.textThemeUnselected,
      textThemeUnselected = _parseProps$textTheme4 === void 0 ? 'disable' : _parseProps$textTheme4,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? 'div' : _parseProps$component,
      className = _parseProps.className,
      style = _parseProps.style,
      bTheme = _parseProps['b-theme'],
      bStyle = _parseProps['b-style'],
      bSize = _parseProps['b-size'],
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["main", "inline", "selected", "status", "hasBg", "hasSelection", "textThemeOnBg", "bgThemeOnHollow", "textThemeOnBgSelected", "textThemeOnBgUnselected", "textThemeUnselected", "component", "className", "style", 'b-theme', 'b-style', 'b-size']);

  if (hasBg === undefined) hasBg = bStyle === 'solid' && bTheme;
  if (hasSelection === undefined) hasSelection = bStyle === 'underline';
  var classStr = 'position-relative';
  var classSet = {
    'scrollable-a-': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline,
    'status-': status
  };
  var styleSet = {};
  var textTheme;
  if (hasSelection) textTheme = hasBg ? selected ? textThemeOnBgSelected : textThemeOnBgUnselected : selected ? bTheme || false : textThemeUnselected;
  if (!hasSelection) textTheme = hasBg ? textThemeOnBg : bTheme;
  textTheme = textTheme ? textTheme === true ? '' : textTheme : false;
  classSet['text-color-' + textTheme] = textTheme !== false;
  classSet['text-size-' + (bSize === 'true' ? '' : bSize)] = bSize;

  if (bStyle === 'solid') {
    var theme = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : 'component';
    classSet['bg-color-' + theme] = theme !== false;
    classSet['border-set-a-' + theme] = theme !== false;
  } else if (bStyle === 'hollow') {
    var _theme = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : '';

    classSet['border-set-a-' + _theme] = _theme !== false;
    classSet[bgThemeOnHollow === false ? 'bg-none-' : 'bg-color-' + (bgThemeOnHollow === true ? '' : bgThemeOnHollow)] = true;
  } else if (bStyle === 'underline') {
    var _theme2 = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : '';

    classSet['bg-none-'] = true;
    classSet['border-none-top-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;
    classSet['border-width-bottom-2'] = true;
    classSet['border-set-bottom-' + _theme2] = _theme2 !== false;
    if (!selected) styleSet['borderColor'] = 'transparent';
  } else if (bStyle === 'plain') {
    classSet['border-none-a-'] = true;
    classSet['bg-none-'] = true;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props));
};

var _default = Panel;
exports.default = _default;
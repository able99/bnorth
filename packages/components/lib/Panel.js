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
      _parseProps$colorOnTh = _parseProps.colorOnTheme,
      colorOnTheme = _parseProps$colorOnTh === void 0 ? 'white' : _parseProps$colorOnTh,
      _parseProps$colorOnHo = _parseProps.colorOnHollow,
      colorOnHollow = _parseProps$colorOnHo === void 0 ? 'white' : _parseProps$colorOnHo,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? 'div' : _parseProps$component,
      className = _parseProps.className,
      style = _parseProps.style,
      bTheme = _parseProps['b-theme'],
      bStyle = _parseProps['b-style'],
      bSize = _parseProps['b-size'],
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["main", "inline", "selected", "status", "colorOnTheme", "colorOnHollow", "component", "className", "style", 'b-theme', 'b-style', 'b-size']);

  var classStr = 'position-relative';
  var classSet = {
    'scrollable-a-': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline,
    'status-': status
  };
  var styleSet = {};
  if (bSize) classSet['text-size-' + (bSize === 'true' ? '' : bSize)] = true;

  if (bStyle === 'solid') {
    if (bTheme) {
      classSet['bg-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
      classSet['border-set-a-' + (bTheme === 'true' ? '' : bTheme)] = true;
      classSet['text-color-' + (colorOnTheme === 'true' ? '' : colorOnTheme)] = true;
    } else {
      classSet['bg-color-component'] = true;
      classSet['border-set-a-component'] = true;
    }
  } else if (bStyle === 'hollow') {
    if (bTheme) {
      classSet['border-set-a-' + (bTheme === 'true' ? '' : bTheme)] = true;
      classSet['text-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
    } else {
      classSet['border-set-a-'] = true;

      if (colorOnHollow === false) {
        classSet['bg-none-'] = true;
      } else {
        classSet['bg-color-' + (colorOnHollow === true ? '' : colorOnHollow)] = true;
      }
    }
  } else if (bStyle === 'underline') {
    classSet['bg-none-'] = true;
    classSet['border-none-top-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;

    if (selected) {
      if (bTheme) classSet['text-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
      classSet['border-set-bottom-' + (bTheme === 'true' ? '' : bTheme)] = true;
      classSet['border-width-bottom-2'] = true;
    } else {
      classSet['border-set-bottom-'] = true;
      classSet['border-width-bottom-2'] = true;
      styleSet['borderColor'] = 'transparent';
    }
  } else if (bStyle === 'plain') {
    classSet['border-none-a-'] = true;
    classSet['bg-none-'] = true;
    if (bTheme) classSet['text-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
  } else {
    if (bTheme) classSet['text-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props));
};

var _default = Panel;
exports.default = _default;
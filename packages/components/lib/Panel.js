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
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Panel = function Panel(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      main = _genCommonProps.main,
      inline = _genCommonProps.inline,
      selected = _genCommonProps.selected,
      _genCommonProps$color = _genCommonProps.colorOnTheme,
      colorOnTheme = _genCommonProps$color === void 0 ? 'white' : _genCommonProps$color,
      _genCommonProps$color2 = _genCommonProps.colorOnHollow,
      colorOnHollow = _genCommonProps$color2 === void 0 ? 'white' : _genCommonProps$color2,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["main", "inline", "selected", "colorOnTheme", "colorOnHollow", "component", "className", 'b-theme', 'b-style', 'b-size']);

  var classStr = 'position-relative';
  var classSet = {
    'scrollable-a-': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline
  };
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
    if (bTheme) classSet['text-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
    classSet['border-none-top-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;

    if (selected) {
      classSet['border-set-bottom-' + (bTheme === 'true' ? '' : bTheme)] = true;
      classSet['border-width-bottom-2'] = true;
    } else {
      classSet['border-none-bottom-'] = true;
    }
  } else if (bStyle === 'plain') {
    classSet['border-none-a-'] = true;
    classSet['bg-none-'] = true;
    if (bTheme) classSet['text-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
  } else {
    if (bTheme) classSet['text-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props));
};

var _default = Panel;
exports.default = _default;
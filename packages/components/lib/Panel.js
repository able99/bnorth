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
      _genCommonProps$color = _genCommonProps.colorOnTheme,
      colorOnTheme = _genCommonProps$color === void 0 ? 'white' : _genCommonProps$color,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["main", "inline", "colorOnTheme", "component", "className", 'b-theme', 'b-style', 'b-size']);

  var classStr = 'position-relative';
  var classSet = {
    'scrollable': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline
  };
  if (bSize) classSet['text-size+' + (bSize === 'true' ? '' : bSize)] = true;

  if (bStyle === 'solid' && bTheme) {
    classSet['bg-color-' + (bTheme === 'true' ? '' : bTheme)] = true;
    classSet['text-color-' + (colorOnTheme === 'true' ? '' : colorOnTheme)] = true;
  } else if (bStyle === 'solid' && !bTheme) {
    classSet['bg-color-component'] = true;
  } else if (bStyle === 'hollow' && bTheme) {
    classSet['border-set-a-' + (bTheme === 'true' ? '' : bTheme)] = true;
    classSet['text-color+' + (bTheme === 'true' ? '' : bTheme)] = true;
  } else if (bStyle === 'hollow' && !bTheme) {
    classSet['border-set-a-'] = true;
  }

  {
    if (bTheme) classSet['text-color+' + (bTheme === 'true' ? '' : bTheme)] = true;
  }
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props));
};

var _default = Panel;
exports.default = _default;
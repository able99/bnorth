"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _props = require("./utils/props");

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Views = function Views(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$viewP = _genCommonProps.viewProps,
      viewProps = _genCommonProps$viewP === void 0 ? {} : _genCommonProps$viewP,
      viewGetClassName = _genCommonProps.viewGetClassName,
      viewGetStyle = _genCommonProps.viewGetStyle,
      viewGetProps = _genCommonProps.viewGetProps,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      style = _genCommonProps.style,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["viewProps", "viewGetClassName", "viewGetStyle", "viewGetProps", "component", "className", "style", 'b-theme', 'b-style', 'b-size', "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  });
  var classStr = 'position-relative overflow-hidden';
  var classSet = [];
  if (bSize) classSet.push('text-size-' + (bSize === true ? '' : bSize));

  if (bStyle === 'hollow') {
    classSet.push('border-set-' + (bTheme === true ? '' : bTheme));
  } else if (bStyle === 'plain') {
    if (bTheme) classSet.push('text-color-' + (bTheme === true ? '' : bTheme));
  } else {
    classSet.push('bg-color-' + (bTheme === true ? '' : bTheme || 'view'));
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    style: style,
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), children.map(function (v, i, a) {
    return (0, _react.cloneElement)(v, (0, _props.getSubComponentProps)(i, a.length, aprops, v.props, viewProps, viewGetClassName, viewGetStyle, viewGetProps));
  }).find(function (v) {
    return v.props.selected;
  }));
};

Views.Item = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'div' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      bTheme = _genCommonProps2['b-theme'],
      bStyle = _genCommonProps2['b-style'],
      bSize = _genCommonProps2['b-size'],
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["component", "className", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'position-relative offset-left-start offset-right-start offset-top-start offset-bottom-start square-full overflow-hidden';
  var classSet = [];
  if (bSize) classSet.push('text-size-' + (bSize === true ? '' : bSize));
  if (bTheme) classSet.push('text-color-' + (bTheme === true ? '' : bTheme));
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), children);
};

var _default = Views;
exports.default = _default;
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
      _genCommonProps$itemP = _genCommonProps.itemProps,
      itemProps = _genCommonProps$itemP === void 0 ? {} : _genCommonProps$itemP,
      getItemClassName = _genCommonProps.getItemClassName,
      getItemProps = _genCommonProps.getItemProps,
      getItemStyle = _genCommonProps.getItemStyle,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
      className = _genCommonProps.className,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["itemProps", "getItemClassName", "getItemProps", "getItemStyle", "component", "className", "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  });
  var classSet = {
    'position-relative': true,
    'overflow-hidden': true,
    'bg-color-view': !(0, _props.hascx)(className, 'bg-color')
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).map(function (v, i, arr) {
    return (0, _react.cloneElement)(v, (0, _props.genItemProps)(i, arr.length, v.props, itemProps, getItemClassName, getItemProps, getItemStyle));
  }).find(function (v) {
    return v.props.selected;
  }));
};

Views.Item = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'div' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["component", "className", "children"]);

  var classSet = {
    'position-relative': !(0, _props.hascx)(className, 'position'),
    'offset-start-left': true,
    'offset-start-top': true,
    'offset-start-right': true,
    'offset-start-bottom': true,
    'square-full': true,
    'overflow-hidden': true
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), children);
};

var _default = Views;
exports.default = _default;
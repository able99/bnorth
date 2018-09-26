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

var _Panel = _interopRequireDefault(require("./Panel.Container"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Button = function Button(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      _genCommonProps$panel = _genCommonProps.panelComponent,
      panelComponent = _genCommonProps$panel === void 0 ? 'button' : _genCommonProps$panel,
      className = _genCommonProps.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["component", "panelComponent", "className"]);

  var classStr = 'outline-none- appearance-none- font-smoothing-antialiased- transition-set- vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-style": "solid",
    component: panelComponent,
    className: (0, _props.cxm)(classStr, className)
  }, props));
};

Button.Group = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      stacked = _genCommonProps2.stacked,
      justify = _genCommonProps2.justify,
      separator = _genCommonProps2.separator,
      _genCommonProps2$sepa = _genCommonProps2.separatorProps,
      separatorProps = _genCommonProps2$sepa === void 0 ? {} : _genCommonProps2$sepa,
      _genCommonProps2$item = _genCommonProps2.itemComponent,
      itemComponent = _genCommonProps2$item === void 0 ? Button : _genCommonProps2$item,
      itemProps = _genCommonProps2.itemProps,
      _genCommonProps2$item2 = _genCommonProps2.itemGetClassName,
      itemGetClassName = _genCommonProps2$item2 === void 0 ? Button.Group.itemGetClassName : _genCommonProps2$item2,
      _genCommonProps2$item3 = _genCommonProps2.itemGetStyle,
      itemGetStyle = _genCommonProps2$item3 === void 0 ? Button.Group.itemGetStyle : _genCommonProps2$item3,
      _genCommonProps2$item4 = _genCommonProps2.itemGetProps,
      itemGetProps = _genCommonProps2$item4 === void 0 ? Button.Group.itemGetProps : _genCommonProps2$item4,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Panel.default.Container : _genCommonProps2$comp,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["stacked", "justify", "separator", "separatorProps", "itemComponent", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).map(function (v, i) {
    return _react.default.createElement(Component.Item, (0, _extends2.default)({
      key: v.key || i
    }, v.props));
  }).reduce(function (v1, v2, i, a) {
    if (!separator || stacked) return a;
    if (i > 0) v1.push(_react.default.createElement(Button.Group.Separator, (0, _extends2.default)({
      key: 'sep' + i
    }, separatorProps)));
    v1.push(v2);
    return v1;
  }, []);
  return _react.default.createElement(Component, (0, _extends2.default)({
    type: justify ? "justify" : "",
    containerProps: aprops,
    itemComponent: itemComponent,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps
  }, props), children);
};

Button.Group.itemGetClassName = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      stacked = _ref.stacked,
      justify = _ref.justify;

  return {
    'border-none-right-': !stacked && !i >= length - 1,
    'border-none-bottom-': stacked && !i >= length - 1,
    'flex-sub-flex-extend': justify,
    'width-full': stacked
  };
};

Button.Group.Separator = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Panel.default : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      style = _genCommonProps3.style,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["component", "className", "style"]);

  var classStr = 'flex-sub-flex-none bg-color-border margin-v-xl';
  var styleSet = {};
  styleSet.width = 1;
  return _react.default.createElement(Component, (0, _extends2.default)({
    inline: true,
    "b-style": "solid",
    "b-theme": "border",
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _props.cxm)(classStr, className)
  }, props), "\xA0");
};

var _default = Button;
exports.default = _default;
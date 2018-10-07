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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Container"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Button = function Button(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      _parseProps$panelComp = _parseProps.panelComponent,
      panelComponent = _parseProps$panelComp === void 0 ? 'button' : _parseProps$panelComp,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["component", "panelComponent", "className"]);

  var classStr = 'outline-none- appearance-none- font-smoothing-antialiased- transition-set- vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-style": "solid",
    component: panelComponent,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Button.Group = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops),
      stacked = _parseProps2.stacked,
      justify = _parseProps2.justify,
      separator = _parseProps2.separator,
      _parseProps2$separato = _parseProps2.separatorProps,
      separatorProps = _parseProps2$separato === void 0 ? {} : _parseProps2$separato,
      _parseProps2$itemComp = _parseProps2.itemComponent,
      itemComponent = _parseProps2$itemComp === void 0 ? Button : _parseProps2$itemComp,
      itemProps = _parseProps2.itemProps,
      _parseProps2$itemGetC = _parseProps2.itemGetClassName,
      itemGetClassName = _parseProps2$itemGetC === void 0 ? Button.Group.itemGetClassName : _parseProps2$itemGetC,
      _parseProps2$itemGetS = _parseProps2.itemGetStyle,
      itemGetStyle = _parseProps2$itemGetS === void 0 ? Button.Group.itemGetStyle : _parseProps2$itemGetS,
      _parseProps2$itemGetP = _parseProps2.itemGetProps,
      itemGetProps = _parseProps2$itemGetP === void 0 ? Button.Group.itemGetProps : _parseProps2$itemGetP,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default.Container : _parseProps2$componen,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["stacked", "justify", "separator", "separatorProps", "itemComponent", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "children"]);

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
  var _parseProps3 = (0, _props.default)(aprops),
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      className = _parseProps3.className,
      style = _parseProps3.style,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["component", "className", "style"]);

  var classStr = 'flex-sub-flex-none bg-color-border margin-v-xl';
  var styleSet = {};
  styleSet.width = 1;
  return _react.default.createElement(Component, (0, _extends2.default)({
    inline: true,
    "b-style": "solid",
    "b-theme": "border",
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _classes.default)(classStr, className)
  }, props), "\xA0");
};

var _default = Button;
exports.default = _default;
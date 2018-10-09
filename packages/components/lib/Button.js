"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
  var _parseProps = (0, _props.default)(aprops, Button.props),
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      _parseProps$panelComp = _parseProps.panelComponent,
      panelComponent = _parseProps$panelComp === void 0 ? 'button' : _parseProps$panelComp,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["component", "panelComponent", "className"]);

  var classStr = 'outline-none- appearance-none- font-smoothing-antialiased- transition-set- vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: panelComponent,
    "b-style": "solid",
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Button.Group = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, Button.Group.props),
      stacked = _parseProps2.stacked,
      justify = _parseProps2.justify,
      separator = _parseProps2.separator,
      _parseProps2$separato = _parseProps2.separatorProps,
      separatorProps = _parseProps2$separato === void 0 ? {} : _parseProps2$separato,
      _parseProps2$itemComp = _parseProps2.itemComponent,
      itemComponent = _parseProps2$itemComp === void 0 ? Button : _parseProps2$itemComp,
      itemProps = _parseProps2.itemProps,
      _parseProps2$itemGetC = _parseProps2.itemGetClassName,
      itemGetClassName = _parseProps2$itemGetC === void 0 ? Button.Group._itemGetClassName : _parseProps2$itemGetC,
      _parseProps2$itemGetS = _parseProps2.itemGetStyle,
      itemGetStyle = _parseProps2$itemGetS === void 0 ? Button.Group._itemGetStyle : _parseProps2$itemGetS,
      _parseProps2$itemGetP = _parseProps2.itemGetProps,
      itemGetProps = _parseProps2$itemGetP === void 0 ? Button.Group._itemGetProps : _parseProps2$itemGetP,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default.Container : _parseProps2$componen,
      panelComponent = _parseProps2.panelComponent,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["stacked", "justify", "separator", "separatorProps", "itemComponent", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "panelComponent", "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).map(function (v, i) {
    return _react.default.createElement(Component.Item, (0, _extends2.default)({
      key: v.key || i
    }, v.props));
  }).reduce(function (v1, v2, i, a) {
    if (!separator || stacked) return a;
    if (i > 0) v1.push(_react.default.createElement(Button.Group._Separator, (0, _extends2.default)({
      key: 'sep' + i,
      notItem: true
    }, separatorProps)));
    v1.push(v2);
    return v1;
  }, []);
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: panelComponent,
    type: justify ? "justify" : "",
    containerProps: aprops,
    itemComponent: itemComponent,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps
  }, props), children);
};

Button.Group._itemGetClassName = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      separator = _ref.separator,
      stacked = _ref.stacked,
      justify = _ref.justify;

  return {
    'border-none-right-': !stacked && !(i >= length - 1),
    'border-none-bottom-': stacked && !(i >= length - 1),
    'flex-sub-flex-extend': justify,
    'width-full': stacked,
    'border-none-a-': separator,
    'bg-none-': separator
  };
};

Button.Group._Separator = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops, Button.Group._Separator.props),
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      panelComponent = _parseProps3.panelComponent,
      notItem = _parseProps3.notItem,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["component", "panelComponent", "notItem", "className"]);

  var classStr = 'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: panelComponent,
    inline: true,
    "b-theme": "border",
    "b-size": "lg",
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement("span", null, "|"));
};

var _default = Button;
exports.default = _default;
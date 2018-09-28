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

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Field = function Field(aprops) {
  var type = aprops.type,
      _aprops$value = aprops.value,
      value = _aprops$value === void 0 ? aprops.value === undefined && aprops.hasOwnProperty('value') ? '' : aprops.value : _aprops$value,
      containerProps = aprops.containerProps,
      before = aprops.before,
      after = aprops.after,
      label = aprops.label,
      beforeProps = aprops.beforeProps,
      afterProps = aprops.afterProps,
      props = (0, _objectWithoutProperties2.default)(aprops, ["type", "value", "containerProps", "before", "after", "label", "beforeProps", "afterProps"]);
  var ComponentField = Field._Types[type || 'text'];
  if (!ComponentField) return null;
  ComponentField = _react.default.createElement(ComponentField, (0, _extends2.default)({
    "b-style": before || after,
    "bc-flex-sub-flex-extend": (before || after) && true,
    type: type,
    value: value
  }, props));
  if (!before && !after) return ComponentField;
  return _react.default.createElement(Field._Container, (0, _extends2.default)({
    before: before,
    after: after,
    label: label,
    beforeProps: beforeProps,
    afterProps: afterProps
  }, containerProps), ComponentField);
};

Field._Container = function (aprops) {
  var inline = aprops.inline,
      before = aprops.before,
      after = aprops.after,
      label = aprops.label,
      beforeProps = aprops.beforeProps,
      afterProps = aprops.afterProps,
      _aprops$component = aprops.component,
      Component = _aprops$component === void 0 ? _Panel.default : _aprops$component,
      _aprops$componentPane = aprops.componentPanel,
      componentPanel = _aprops$componentPane === void 0 ? label && 'label' : _aprops$componentPane,
      className = aprops.className,
      children = aprops.children,
      props = (0, _objectWithoutProperties2.default)(aprops, ["inline", "before", "after", "label", "beforeProps", "afterProps", "component", "componentPanel", "className", "children"]);
  var classStr = 'flex-align-center';
  var classSet = inline ? 'flex-display-inline' : 'flex-display-block';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), before ? _react.default.createElement(Field._Container._Content, beforeProps, before) : null, children, after ? _react.default.createElement(Field._Container._Content, afterProps, after) : null);
};

Field._Container._Content = function (aprops) {
  var _aprops$component2 = aprops.component,
      Component = _aprops$component2 === void 0 ? _Panel.default : _aprops$component2,
      className = aprops.className,
      props = (0, _objectWithoutProperties2.default)(aprops, ["component", "className"]);
  var classStr = 'flex-sub-flex-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props));
};

Field._Normal = function (aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      type = _genCommonProps.type,
      value = _genCommonProps.value,
      onPressEnter = _genCommonProps.onPressEnter,
      onKeyPress = _genCommonProps.onKeyPress,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
      _genCommonProps$compo2 = _genCommonProps.componentPanel,
      componentPanel = _genCommonProps$compo2 === void 0 ? "input" : _genCommonProps$compo2,
      className = _genCommonProps.className,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["type", "value", "onPressEnter", "onKeyPress", "component", "componentPanel", "className", "children"]);

  var classStr = 'field transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle bg-none- border-none-a-';

  var handleKeyPress = function handleKeyPress(e) {
    if (onPressEnter && e.charCode === 13) {
      e.stopPropagation();
      e.preventDefault();
      onPressEnter(e.target.value);
    } else {
      onKeyPress && onKeyPress(e);
    }
  };

  if (Field._Normal._maps.includes(type)) {
    componentPanel = type;
    type = null;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    onKeyPress: handleKeyPress,
    type: type,
    value: value,
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

Field._Normal._maps = ['progress', 'select', 'textarea'];

Field._Static = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      type = _genCommonProps2.type,
      value = _genCommonProps2.value,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Panel.default : _genCommonProps2$comp,
      _genCommonProps2$comp2 = _genCommonProps2.componentPanel,
      componentPanel = _genCommonProps2$comp2 === void 0 ? "span" : _genCommonProps2$comp2,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["type", "value", "component", "componentPanel", "className", "children"]);

  var classStr = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _props.cxm)(classStr, className)
  }, props), value || _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, " "));
};

Field._HiddenInput = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? 'input' : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["component", "className"]);

  var classStr = 'visibility-hide display-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props));
};

Field._Switch = function (aprops) {
  var _genCommonProps4 = (0, _props.genCommonProps)(aprops),
      type = _genCommonProps4.type,
      value = _genCommonProps4.value,
      defaultValue = _genCommonProps4.defaultValue,
      domValue = _genCommonProps4.domValue,
      _onClick = _genCommonProps4.onClick,
      Content = _genCommonProps4.Content,
      labelProps = _genCommonProps4.labelProps,
      inputProps = _genCommonProps4.inputProps,
      innerProps = _genCommonProps4.innerProps,
      _genCommonProps4$comp = _genCommonProps4.component,
      Component = _genCommonProps4$comp === void 0 ? _Panel.default : _genCommonProps4$comp,
      _genCommonProps4$comp2 = _genCommonProps4.componentPanel,
      componentPanel = _genCommonProps4$comp2 === void 0 ? 'label' : _genCommonProps4$comp2,
      className = _genCommonProps4.className,
      children = _genCommonProps4.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["type", "value", "defaultValue", "domValue", "onClick", "Content", "labelProps", "inputProps", "innerProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'switch-status transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle bg-none- flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    onClick: function onClick(e) {
      e.stopPropagation();
      _onClick && _onClick(e);
    },
    className: (0, _props.cxm)(classStr, className)
  }, labelProps), _react.default.createElement(Field._HiddenInput, (0, _extends2.default)({
    type: type,
    checked: value,
    defaultChecked: defaultValue,
    value: domValue
  }, inputProps)), _react.default.createElement(Field._Switch._Inner, innerProps, _react.default.createElement(Field._Switch._Content, (0, _extends2.default)({
    component: Content
  }, props, {
    type: type,
    isOn: true
  }), "X"), _react.default.createElement(Field._Switch._Content, (0, _extends2.default)({
    component: Content
  }, props, {
    type: type
  }), "-")));
};

Field._Switch._Inner = function (aprops) {
  var _genCommonProps5 = (0, _props.genCommonProps)(aprops),
      _genCommonProps5$comp = _genCommonProps5.component,
      Component = _genCommonProps5$comp === void 0 ? _Panel.default : _genCommonProps5$comp,
      _genCommonProps5$comp2 = _genCommonProps5.componentPanel,
      componentPanel = _genCommonProps5$comp2 === void 0 ? 'span' : _genCommonProps5$comp2,
      className = _genCommonProps5.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps5, ["component", "componentPanel", "className"]);

  var classStr = 'status- position-relative';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _props.cxm)(classStr, className)
  }, props));
};

Field._Switch._Content = function (aprops) {
  var _genCommonProps6 = (0, _props.genCommonProps)(aprops),
      isOn = _genCommonProps6.isOn,
      _genCommonProps6$comp = _genCommonProps6.component,
      Component = _genCommonProps6$comp === void 0 ? _Panel.default : _genCommonProps6$comp,
      className = _genCommonProps6.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps6, ["isOn", "component", "className"]);

  var classStr = 'position-relative';
  var classSet = [isOn ? 'on-' : 'off-'];
  return _react.default.createElement(Component, (0, _extends2.default)({
    inline: true,
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props, {
    isOn: isOn
  }));
};

Field._Types = {};
Field._Types.text = Field._Normal;
Field._Types.textarea = Field._Normal;
Field._Types.select = Field._Normal;
Field._Types.progress = Field._Normal;
Field._Types.static = Field._Static;

Field._SwitchContentCheckRadio = function (aprops) {
  var type = aprops.type,
      isOn = aprops.isOn,
      _aprops$name = aprops.name,
      name = _aprops$name === void 0 ? aprops.isOn ? 'check' : ' ' : _aprops$name,
      _aprops$nameDefault = aprops.nameDefault,
      nameDefault = _aprops$nameDefault === void 0 ? aprops.isOn ? 'X' : ' ' : _aprops$nameDefault,
      _aprops$component3 = aprops.component,
      Component = _aprops$component3 === void 0 ? _Icon.default : _aprops$component3,
      props = (0, _objectWithoutProperties2.default)(aprops, ["type", "isOn", "name", "nameDefault", "component"]);
  console.log(1111, isOn, name, type, props);
  return _react.default.createElement(Component, (0, _extends2.default)({
    "bc-border-radius-rounded": !Boolean(type === 'checkbox'),
    type: type,
    name: name,
    nameDefault: nameDefault
  }, props, {
    "b-style": "hollow"
  }));
};

Field._Types.checkbox = function (aprops) {
  return _react.default.createElement(Field._Switch, (0, _extends2.default)({
    Content: Field._SwitchContentCheckRadio
  }, aprops));
};

Field._Types.radio = Field._Types.checkbox;

Field._SwitchContentSwitch = function (aprops) {
  var _aprops$component4 = aprops.component,
      Component = _aprops$component4 === void 0 ? _Panel.default : _aprops$component4,
      className = aprops.className,
      children = aprops.children,
      props = (0, _objectWithoutProperties2.default)(aprops, ["component", "className", "children"]);
  var classStr = 'border-radius-rounded line-height-0';
  return _react.default.createElement(Component, {
    "b-style": "hollow",
    className: (0, _props.cxm)(classStr, className)
  }, _react.default.createElement(Field._SwitchContentSwitch.Item, (0, _extends2.default)({}, props, {
    isPositive: true
  })), _react.default.createElement(Field._SwitchContentSwitch.Item, props));
};

Field._SwitchContentSwitch.Item = function (aprops) {
  var isOn = aprops.isOn,
      isPositive = aprops.isPositive,
      _aprops$component5 = aprops.component,
      Component = _aprops$component5 === void 0 ? _Panel.default : _aprops$component5,
      _aprops$bTheme = aprops['b-theme'],
      bTheme = _aprops$bTheme === void 0 ? 'component' : _aprops$bTheme,
      className = aprops.className,
      children = aprops.children,
      props = (0, _objectWithoutProperties2.default)(aprops, ["isOn", "isPositive", "component", 'b-theme', "className", "children"]);
  var classStr = 'border-radius-rounded width-1em height-1em';
  return _react.default.createElement(Component, (0, _extends2.default)({}, props, {
    inline: true,
    "b-style": "solid",
    "b-theme": isPositive ? isOn ? bTheme : 'white' : isOn ? 'white' : 'component',
    className: (0, _props.cxm)(classStr, className)
  }));
};

Field._Types.switch = function (aprops) {
  return _react.default.createElement(Field._Switch, (0, _extends2.default)({
    Content: Field._SwitchContentSwitch
  }, aprops, {
    type: "checkbox"
  }));
};

Field._Types.file = function (aprops) {
  var _genCommonProps7 = (0, _props.genCommonProps)(aprops),
      type = _genCommonProps7.type,
      value = _genCommonProps7.value,
      inputProps = _genCommonProps7.inputProps,
      _genCommonProps7$comp = _genCommonProps7.component,
      Component = _genCommonProps7$comp === void 0 ? _Panel.default : _genCommonProps7$comp,
      _genCommonProps7$comp2 = _genCommonProps7.componentPanel,
      componentPanel = _genCommonProps7$comp2 === void 0 ? "label" : _genCommonProps7$comp2,
      className = _genCommonProps7.className,
      children = _genCommonProps7.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps7, ["type", "value", "inputProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _props.cxm)(classStr, className)
  }, props), _react.default.createElement(Field._HiddenInput, (0, _extends2.default)({
    type: type,
    value: value
  }, inputProps)), children);
};

var _default = Field;
exports.default = _default;
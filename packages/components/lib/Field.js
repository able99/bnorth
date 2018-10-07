"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

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
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), before ? _react.default.createElement(Field._Container._Content, beforeProps, before) : null, children, after ? _react.default.createElement(Field._Container._Content, afterProps, after) : null);
};

Field._Container._Content = function (aprops) {
  var _aprops$component2 = aprops.component,
      Component = _aprops$component2 === void 0 ? _Panel.default : _aprops$component2,
      className = aprops.className,
      props = (0, _objectWithoutProperties2.default)(aprops, ["component", "className"]);
  var classStr = 'flex-sub-flex-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Field._Normal = function (aprops) {
  var _parseProps = (0, _props.default)(aprops),
      type = _parseProps.type,
      value = _parseProps.value,
      onPressEnter = _parseProps.onPressEnter,
      onKeyPress = _parseProps.onKeyPress,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      _parseProps$component2 = _parseProps.componentPanel,
      componentPanel = _parseProps$component2 === void 0 ? "input" : _parseProps$component2,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["type", "value", "onPressEnter", "onKeyPress", "component", "componentPanel", "className", "children"]);

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
    className: (0, _classes.default)(classStr, className)
  }, props), children);
};

Field._Normal._maps = ['progress', 'select', 'textarea'];

Field._Static = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops),
      type = _parseProps2.type,
      value = _parseProps2.value,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      _parseProps2$componen2 = _parseProps2.componentPanel,
      componentPanel = _parseProps2$componen2 === void 0 ? "span" : _parseProps2$componen2,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["type", "value", "component", "componentPanel", "className", "children"]);

  var classStr = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props), value || _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, " "));
};

Field._HiddenInput = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops),
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? 'input' : _parseProps3$componen,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["component", "className"]);

  var classStr = 'visibility-hide display-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Field._Switch = function (aprops) {
  var _parseProps4 = (0, _props.default)(aprops),
      type = _parseProps4.type,
      value = _parseProps4.value,
      defaultValue = _parseProps4.defaultValue,
      domValue = _parseProps4.domValue,
      _onClick = _parseProps4.onClick,
      Content = _parseProps4.Content,
      labelProps = _parseProps4.labelProps,
      inputProps = _parseProps4.inputProps,
      innerProps = _parseProps4.innerProps,
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? _Panel.default : _parseProps4$componen,
      _parseProps4$componen2 = _parseProps4.componentPanel,
      componentPanel = _parseProps4$componen2 === void 0 ? 'label' : _parseProps4$componen2,
      className = _parseProps4.className,
      children = _parseProps4.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["type", "value", "defaultValue", "domValue", "onClick", "Content", "labelProps", "inputProps", "innerProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'switch-status transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle bg-none- flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    onClick: function onClick(e) {
      e.stopPropagation();
      _onClick && _onClick(e);
    },
    className: (0, _classes.default)(classStr, className)
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
  var _parseProps5 = (0, _props.default)(aprops),
      _parseProps5$componen = _parseProps5.component,
      Component = _parseProps5$componen === void 0 ? _Panel.default : _parseProps5$componen,
      _parseProps5$componen2 = _parseProps5.componentPanel,
      componentPanel = _parseProps5$componen2 === void 0 ? 'span' : _parseProps5$componen2,
      className = _parseProps5.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps5, ["component", "componentPanel", "className"]);

  var classStr = 'status- position-relative';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Field._Switch._Content = function (aprops) {
  var _parseProps6 = (0, _props.default)(aprops),
      isOn = _parseProps6.isOn,
      _parseProps6$componen = _parseProps6.component,
      Component = _parseProps6$componen === void 0 ? _Panel.default : _parseProps6$componen,
      className = _parseProps6.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps6, ["isOn", "component", "className"]);

  var classStr = 'position-relative';
  var classSet = [isOn ? 'on-' : 'off-'];
  return _react.default.createElement(Component, (0, _extends2.default)({
    inline: true,
    className: (0, _classes.default)(classStr, classSet, className)
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
    className: (0, _classes.default)(classStr, className)
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
    className: (0, _classes.default)(classStr, className)
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
  var _parseProps7 = (0, _props.default)(aprops),
      type = _parseProps7.type,
      value = _parseProps7.value,
      inputProps = _parseProps7.inputProps,
      _parseProps7$componen = _parseProps7.component,
      Component = _parseProps7$componen === void 0 ? _Panel.default : _parseProps7$componen,
      _parseProps7$componen2 = _parseProps7.componentPanel,
      componentPanel = _parseProps7$componen2 === void 0 ? "label" : _parseProps7$componen2,
      className = _parseProps7.className,
      children = _parseProps7.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps7, ["type", "value", "inputProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(Field._HiddenInput, (0, _extends2.default)({
    type: type,
    value: value
  }, inputProps)), children);
};

var _default = Field;
exports.default = _default;
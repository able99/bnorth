"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _dom = require("./utils/dom");

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
  var ComponentField = Field._Types[type || 'text'] || Field._Normal;
  if (!ComponentField) return null;
  ComponentField = _react.default.createElement(ComponentField, (0, _extends2.default)({
    "b-style": (before || after) && 'plain',
    "bc-flex-sub-flex-extend": Boolean(before || after),
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
  var _parseProps = (0, _props.default)(aprops, Field._Container.props),
      inline = _parseProps.inline,
      before = _parseProps.before,
      after = _parseProps.after,
      label = _parseProps.label,
      beforeProps = _parseProps.beforeProps,
      afterProps = _parseProps.afterProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      _parseProps$component2 = _parseProps.componentPanel,
      componentPanel = _parseProps$component2 === void 0 ? label && 'label' : _parseProps$component2,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["inline", "before", "after", "label", "beforeProps", "afterProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'flex-align-center';
  var classSet = inline ? 'flex-display-inline' : 'flex-display-block';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), before ? _react.default.createElement(Field._Container._Content, beforeProps, before) : null, children, after ? _react.default.createElement(Field._Container._Content, afterProps, after) : null);
};

Field._Container._Content = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, Field._Container._Content.props),
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["component", "componentPanel", "className"]);

  var classStr = 'flex-sub-flex-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};
/*
 * @compatible ime wrong on chrome and wrong cursor pos, cause by state controll input, it is ok on setState
 */


Field._Normal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck2.default)(this, _class);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
  }

  (0, _createClass2.default)(_class, [{
    key: "_updateValue",
    value: function _updateValue() {
      this.input.value = this.props.value;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.input = (0, _dom.domFindNode)(this);

      this._updateValue();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.value !== prevProps.value) this._updateValue();
    }
  }, {
    key: "render",
    value: function render() {
      var _parseProps3 = (0, _props.default)(this.props, Field._Normal.props),
          type = _parseProps3.type,
          value = _parseProps3.value,
          onPressEnter = _parseProps3.onPressEnter,
          onKeyPress = _parseProps3.onKeyPress,
          _parseProps3$componen = _parseProps3.component,
          Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
          _parseProps3$componen2 = _parseProps3.componentPanel,
          componentPanel = _parseProps3$componen2 === void 0 ? "input" : _parseProps3$componen2,
          className = _parseProps3.className,
          children = _parseProps3.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps3, ["type", "value", "onPressEnter", "onKeyPress", "component", "componentPanel", "className", "children"]);

      var classStr = 'field transition outline-none appearance-none- line-height-1 font-smoothing-antialiased vertical-align-middle';
      var classSet = this.props['b-style'] ? '' : 'bg-none- border-none-a-';

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
      } else {
        children = undefined;
      }

      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        onKeyPress: handleKeyPress,
        type: type,
        className: (0, _classes.default)(classStr, classSet, className)
      }, props), children);
    }
  }]);
  return _class;
}(_react.default.Component);

Field._Normal._maps = ['progress', 'select', 'textarea'];

Field._Static = function (aprops) {
  var _parseProps4 = (0, _props.default)(aprops),
      type = _parseProps4.type,
      value = _parseProps4.value,
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? _Panel.default : _parseProps4$componen,
      _parseProps4$componen2 = _parseProps4.componentPanel,
      componentPanel = _parseProps4$componen2 === void 0 ? "span" : _parseProps4$componen2,
      className = _parseProps4.className,
      children = _parseProps4.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["type", "value", "component", "componentPanel", "className", "children"]);

  var classStr = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props), value || _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, " "));
};

Field._HiddenInput = function (aprops) {
  var _parseProps5 = (0, _props.default)(aprops, Field._HiddenInput.props),
      _parseProps5$componen = _parseProps5.component,
      Component = _parseProps5$componen === void 0 ? 'input' : _parseProps5$componen,
      className = _parseProps5.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps5, ["component", "className"]);

  var classStr = 'visibility-hide display-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Field._Switch = function (aprops) {
  var _parseProps6 = (0, _props.default)(aprops, Field._Switch.props),
      type = _parseProps6.type,
      value = _parseProps6.value,
      defaultValue = _parseProps6.defaultValue,
      domValue = _parseProps6.domValue,
      disabled = _parseProps6.disabled,
      _onClick = _parseProps6.onClick,
      onChange = _parseProps6.onChange,
      Content = _parseProps6.Content,
      labelProps = _parseProps6.labelProps,
      inputProps = _parseProps6.inputProps,
      innerProps = _parseProps6.innerProps,
      _parseProps6$componen = _parseProps6.component,
      Component = _parseProps6$componen === void 0 ? _Panel.default : _parseProps6$componen,
      _parseProps6$componen2 = _parseProps6.componentPanel,
      componentPanel = _parseProps6$componen2 === void 0 ? 'label' : _parseProps6$componen2,
      className = _parseProps6.className,
      children = _parseProps6.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps6, ["type", "value", "defaultValue", "domValue", "disabled", "onClick", "onChange", "Content", "labelProps", "inputProps", "innerProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'switch-status transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle bg-none-';
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
    value: domValue,
    disabled: disabled,
    onChange: onChange
  }, inputProps)), _react.default.createElement(Field._Switch._Inner, innerProps, _react.default.createElement(Field._Switch._Content, (0, _extends2.default)({
    component: Content
  }, props, {
    type: type,
    disabled: disabled,
    isOn: true
  }), "X"), _react.default.createElement(Field._Switch._Content, (0, _extends2.default)({
    component: Content
  }, props, {
    type: type,
    disabled: disabled
  }), "-")));
};

Field._Switch._Inner = function (aprops) {
  var _parseProps7 = (0, _props.default)(aprops, Field._Switch._Inner.props),
      _parseProps7$componen = _parseProps7.component,
      Component = _parseProps7$componen === void 0 ? _Panel.default : _parseProps7$componen,
      _parseProps7$componen2 = _parseProps7.componentPanel,
      componentPanel = _parseProps7$componen2 === void 0 ? 'span' : _parseProps7$componen2,
      className = _parseProps7.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps7, ["component", "componentPanel", "className"]);

  var classStr = 'status- position-relative';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Field._Switch._Content = function (aprops) {
  var _parseProps8 = (0, _props.default)(aprops, Field._Switch._Content.props),
      isOn = _parseProps8.isOn,
      _parseProps8$componen = _parseProps8.component,
      Component = _parseProps8$componen === void 0 ? _Panel.default : _parseProps8$componen,
      className = _parseProps8.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps8, ["isOn", "component", "className"]);

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
  var _parseProps9 = (0, _props.default)(aprops, Field._SwitchContentCheckRadio.props),
      type = _parseProps9.type,
      isOn = _parseProps9.isOn,
      disabled = _parseProps9.disabled,
      _parseProps9$name = _parseProps9.name,
      name = _parseProps9$name === void 0 ? aprops.isOn ? 'check' : ' ' : _parseProps9$name,
      _parseProps9$defaultN = _parseProps9.defaultName,
      defaultName = _parseProps9$defaultN === void 0 ? aprops.isOn ? 'X' : ' ' : _parseProps9$defaultN,
      _parseProps9$componen = _parseProps9.component,
      Component = _parseProps9$componen === void 0 ? _Icon.default : _parseProps9$componen,
      bTheme = _parseProps9['b-theme'],
      bStyle = _parseProps9['b-style'],
      props = (0, _objectWithoutProperties2.default)(_parseProps9, ["type", "isOn", "disabled", "name", "defaultName", "component", 'b-theme', 'b-style']);

  if (!bStyle) bStyle = 'hollow';

  if (!isOn) {
    bTheme = undefined;
    bStyle = 'hollow';
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    "bc-border-radius-rounded": !Boolean(type === 'checkbox'),
    type: type,
    name: name,
    defaultName: defaultName,
    "b-style": bStyle,
    "b-theme": bTheme,
    "bc-bg-color-component": disabled
  }, props));
};

Field._Types.checkbox = function (aprops) {
  aprops = (0, _props.default)(aprops, Field._Types.checkbox.props);
  return _react.default.createElement(Field._Switch, (0, _extends2.default)({
    Content: Field._SwitchContentCheckRadio
  }, aprops));
};

Field._Types.radio = function (aprops) {
  aprops = (0, _props.default)(aprops, Field._Types.radio.props);
  return _react.default.createElement(Field._Switch, (0, _extends2.default)({
    Content: Field._SwitchContentCheckRadio
  }, aprops));
};

Field._SwitchContentSwitch = function (aprops) {
  var _parseProps10 = (0, _props.default)(aprops, Field._SwitchContentSwitch.props),
      _parseProps10$compone = _parseProps10.component,
      Component = _parseProps10$compone === void 0 ? _Panel.default : _parseProps10$compone,
      className = _parseProps10.className,
      children = _parseProps10.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps10, ["component", "className", "children"]);

  var classStr = 'border-radius-rounded line-height-0';
  return _react.default.createElement(Component, {
    "b-style": "hollow",
    className: (0, _classes.default)(classStr, className)
  }, _react.default.createElement(Field._SwitchContentSwitch.Item, (0, _extends2.default)({}, props, {
    isPositive: true
  })), _react.default.createElement(Field._SwitchContentSwitch.Item, props));
};

Field._SwitchContentSwitch.Item = function (aprops) {
  var _parseProps11 = (0, _props.default)(aprops, Field._SwitchContentSwitch.Item.props),
      isOn = _parseProps11.isOn,
      isPositive = _parseProps11.isPositive,
      _parseProps11$compone = _parseProps11.component,
      Component = _parseProps11$compone === void 0 ? _Panel.default : _parseProps11$compone,
      _parseProps11$bTheme = _parseProps11['b-theme'],
      bTheme = _parseProps11$bTheme === void 0 ? 'component' : _parseProps11$bTheme,
      className = _parseProps11.className,
      children = _parseProps11.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps11, ["isOn", "isPositive", "component", 'b-theme', "className", "children"]);

  var classStr = 'border-radius-rounded width-1em height-1em';
  return _react.default.createElement(Component, (0, _extends2.default)({}, props, {
    inline: true,
    "b-style": "solid",
    "b-theme": isPositive ? isOn ? bTheme : 'white' : isOn ? 'white' : 'component',
    className: (0, _classes.default)(classStr, className)
  }));
};

Field._Types.switch = function (aprops) {
  aprops = (0, _props.default)(aprops, Field._Types.switch.props);
  return _react.default.createElement(Field._Switch, (0, _extends2.default)({
    Content: Field._SwitchContentSwitch
  }, aprops, {
    type: "checkbox"
  }));
};

Field._Types.file = function (aprops) {
  var _parseProps12 = (0, _props.default)(aprops, Field._Types.file.props),
      type = _parseProps12.type,
      value = _parseProps12.value,
      inputProps = _parseProps12.inputProps,
      disabled = _parseProps12.disabled,
      onClick = _parseProps12.onClick,
      onChange = _parseProps12.onChange,
      _parseProps12$compone = _parseProps12.component,
      Component = _parseProps12$compone === void 0 ? _Panel.default : _parseProps12$compone,
      _parseProps12$compone2 = _parseProps12.componentPanel,
      componentPanel = _parseProps12$compone2 === void 0 ? "label" : _parseProps12$compone2,
      className = _parseProps12.className,
      children = _parseProps12.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps12, ["type", "value", "inputProps", "disabled", "onClick", "onChange", "component", "componentPanel", "className", "children"]);

  var classStr = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className),
    disabled: disabled
  }, props), _react.default.createElement(Field._HiddenInput, (0, _extends2.default)({
    type: type,
    value: value,
    disabled: disabled,
    onClick: onClick,
    onChange: onChange
  }, inputProps)), children);
};

var _default = Field;
exports.default = _default;
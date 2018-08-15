"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _props = require("./utils/props");

var _Icon = _interopRequireDefault(require("./Icon"));

var _Button = _interopRequireDefault(require("./Button"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Field = function Field(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      type = _genCommonProps.type,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      before = _genCommonProps.before,
      after = _genCommonProps.after,
      label = _genCommonProps.label,
      beforeProps = _genCommonProps.beforeProps,
      afterProps = _genCommonProps.afterProps,
      _genCommonProps$conta = _genCommonProps.containerProps,
      containerProps = _genCommonProps$conta === void 0 ? {} : _genCommonProps$conta,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["type", "cTheme", "cStyle", "cSize", "before", "after", "label", "beforeProps", "afterProps", "containerProps"]);

  var _genCommonProps2 = (0, _props.genCommonProps)(containerProps),
      _genCommonProps2$comp = _genCommonProps2.component,
      ContainerComponent = _genCommonProps2$comp === void 0 ? 'label' : _genCommonProps2$comp,
      containerClassName = _genCommonProps2.className,
      acontainerProps = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["component", "className"]);

  var hasContainer = before || after || label;
  var Component;

  if (type === 'switch') {
    Component = Field.TypeSwitch;
  } else if (type === 'checkbox' || type === 'radio') {
    Component = Field.TypeCheckRadio;
  } else if (type === 'static') {
    Component = Field.TypeStatic;
  } else if (type === 'number') {
    Component = Field.TypeNumber;
  } else if (type === 'file') {
    Component = Field.TypeFile;
  } else {
    Component = Field.TypeNormal;
  }

  var field = _react.default.createElement(Component, (0, _extends2.default)({
    type: type,
    hasContainer: hasContainer,
    cTheme: cTheme,
    cStyle: cStyle,
    cSize: cSize
  }, props));

  if (hasContainer) {
    var classSetContainer = (0, _defineProperty2.default)({
      'overflow-hidden': true,
      'flex-display-flex': !(0, _props.hascx)(containerClassName, 'flex-display'),
      'flex-align-center': !(0, _props.hascx)(containerClassName, 'flex-align')
    }, 'text-size' + cSize, cSize);

    if (cStyle === 'solid') {
      classSetContainer['bg-color-' + (cTheme || 'component')] = true;
      classSetContainer['border-set-' + (cTheme || 'component')] = true;
    } else if (cStyle === 'hollow') {
      classSetContainer['bg-none'] = true;
      classSetContainer['border-set-' + (cTheme || 'component')] = true;
    } else if (cStyle === 'underline') {
      classSetContainer['border-set-bottom-' + (cTheme || 'component')] = true;
    } else {
      classSetContainer['text-color-' + cTheme] = cTheme;
    }

    return _react.default.createElement(ContainerComponent, (0, _extends2.default)({
      className: (0, _props.cx)(classSetContainer, containerClassName)
    }, acontainerProps), before, field, after);
  } else {
    return field;
  }
};

Field.TypeNormal = function (aprops) {
  var _classSet;

  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      hasContainer = _genCommonProps3.hasContainer,
      _genCommonProps3$type = _genCommonProps3.type,
      type = _genCommonProps3$type === void 0 ? 'text' : _genCommonProps3$type,
      _genCommonProps3$valu = _genCommonProps3.value,
      value = _genCommonProps3$valu === void 0 ? aprops.value === undefined && aprops.hasOwnProperty('value') ? '' : aprops.value : _genCommonProps3$valu,
      onPressEnter = _genCommonProps3.onPressEnter,
      _onKeyPress = _genCommonProps3.onKeyPress,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? 'input' : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      cTheme = _genCommonProps3.cTheme,
      cStyle = _genCommonProps3.cStyle,
      cSize = _genCommonProps3.cSize,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["hasContainer", "type", "value", "onPressEnter", "onKeyPress", "component", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = (_classSet = {
    'field': true,
    'transition': true,
    'outline-none': true,
    'appearance-none': true,
    'line-height-1': true,
    'font-smoothing-antialiased': true,
    'vertical-align-middle': true,
    'bg-none': !(0, _props.hascx)(className, 'bg-color'),
    'flex-sub-flex-extend': hasContainer
  }, (0, _defineProperty2.default)(_classSet, 'text-size-' + cSize, cSize), (0, _defineProperty2.default)(_classSet, 'border-none', !(0, _props.hascx)(className, 'border')), _classSet);

  if (type === 'progress' || type === 'select' || type === 'textarea') {
    Component = type;
    type = null;
  } // border : 'select','progress', 'file'


  return _react.default.createElement(Component, (0, _extends2.default)({
    onKeyPress: function onKeyPress(e) {
      if (onPressEnter && e.charCode === 13) {
        e.stopPropagation();
        e.preventDefault();
        onPressEnter(e.target.value);
      } else {
        _onKeyPress && _onKeyPress(e);
      }
    },
    type: type,
    value: value,
    className: (0, _props.cx)(classSet, className)
  }, props), children);
};

Field.TypeStatic = function (aprops) {
  var _genCommonProps4 = (0, _props.genCommonProps)(aprops),
      hasContainer = _genCommonProps4.hasContainer,
      value = _genCommonProps4.value,
      _genCommonProps4$comp = _genCommonProps4.component,
      Component = _genCommonProps4$comp === void 0 ? 'span' : _genCommonProps4$comp,
      className = _genCommonProps4.className,
      cTheme = _genCommonProps4.cTheme,
      cStyle = _genCommonProps4.cStyle,
      cSize = _genCommonProps4.cSize,
      children = _genCommonProps4.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["hasContainer", "value", "component", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = (0, _defineProperty2.default)({
    'line-height-1': true,
    'font-smoothing-antialiased': true,
    'vertical-align-middle': true,
    'flex-sub-flex-extend': hasContainer
  }, 'text-size-' + cSize, cSize);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), value, children);
};

Field.TypeFile = function (aprops) {
  var _classSet3;

  var _genCommonProps5 = (0, _props.genCommonProps)(aprops),
      hasContainer = _genCommonProps5.hasContainer,
      value = _genCommonProps5.value,
      _genCommonProps5$comp = _genCommonProps5.component,
      Component = _genCommonProps5$comp === void 0 ? 'label' : _genCommonProps5$comp,
      className = _genCommonProps5.className,
      style = _genCommonProps5.style,
      cTheme = _genCommonProps5.cTheme,
      cStyle = _genCommonProps5.cStyle,
      cSize = _genCommonProps5.cSize,
      children = _genCommonProps5.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps5, ["hasContainer", "value", "component", "className", "style", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = (_classSet3 = {
    'transition': true,
    'line-height-1': true,
    'font-smoothing-antialiased': true,
    'vertical-align-middle': true,
    'bg-none': !(0, _props.hascx)(className, 'bg-color'),
    'flex-sub-flex-extend': hasContainer
  }, (0, _defineProperty2.default)(_classSet3, 'text-size-' + cSize, cSize), (0, _defineProperty2.default)(_classSet3, 'border-none', !(0, _props.hascx)(className, 'border')), (0, _defineProperty2.default)(_classSet3, 'position-relative', !(0, _props.hascx)(className, 'position')), _classSet3);
  var classSetInput = {
    'outline-none': true,
    'appearance-none': true,
    'position-absolute': true,
    'visibility-hide': true,
    'display-none': true
  };
  var styleSetInput = {
    left: 0,
    top: 0
  };
  return _react.default.createElement(Component, {
    className: (0, _props.cx)(classSet, className),
    style: style
  }, children, _react.default.createElement("input", (0, _extends2.default)({
    type: "file",
    className: (0, _props.cx)(classSetInput),
    style: styleSetInput
  }, props)));
};

Field.TypeNumber = function (aprops) {
  var _classSet4, _classSetInner, _classSetButton;

  var _genCommonProps6 = (0, _props.genCommonProps)(aprops),
      hasContainer = _genCommonProps6.hasContainer,
      value = _genCommonProps6.value,
      _onChange = _genCommonProps6.onChange,
      max = _genCommonProps6.max,
      min = _genCommonProps6.min,
      _genCommonProps6$comp = _genCommonProps6.component,
      Component = _genCommonProps6$comp === void 0 ? 'input' : _genCommonProps6$comp,
      className = _genCommonProps6.className,
      cTheme = _genCommonProps6.cTheme,
      cStyle = _genCommonProps6.cStyle,
      cSize = _genCommonProps6.cSize,
      children = _genCommonProps6.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps6, ["hasContainer", "value", "onChange", "max", "min", "component", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = (_classSet4 = {
    'line-height-1': true,
    'font-smoothing-antialiased': true,
    'vertical-align-middle': true,
    'flex-sub-flex-extend': true,
    'width-full': true
  }, (0, _defineProperty2.default)(_classSet4, 'text-size-' + cSize, cSize), (0, _defineProperty2.default)(_classSet4, 'border-none', true), (0, _defineProperty2.default)(_classSet4, 'text-align-center', true), _classSet4);
  var classSetInner = (_classSetInner = {
    'flex-display-flex': true,
    'flex-sub-flex-extend': hasContainer
  }, (0, _defineProperty2.default)(_classSetInner, 'text-size-' + cSize, cSize), (0, _defineProperty2.default)(_classSetInner, 'border-set', true), _classSetInner);
  var classSetButton = (_classSetButton = {
    'flex-sub-flex-none': true
  }, (0, _defineProperty2.default)(_classSetButton, 'text-size-' + cSize, cSize), (0, _defineProperty2.default)(_classSetButton, 'padding-v-xs', true), (0, _defineProperty2.default)(_classSetButton, 'padding-h', true), _classSetButton);

  var sub = function sub() {
    var ret = Math.max(value - 1 || 0, min || 0);
    if (_onChange && ret !== value) _onChange(ret);
  };

  var add = function add() {
    var ret = Math.min(value + 1 || 1, max !== undefined || max !== null ? max : Number.MAX_SAFE_INTEGER);
    if (_onChange && ret !== value) _onChange(ret);
  };

  return _react.default.createElement("span", {
    className: (0, _props.cx)(classSetInner)
  }, _react.default.createElement(_Button.default, {
    className: (0, _props.cx)(classSetButton),
    onClick: function onClick() {
      return sub();
    }
  }, "-"), _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props, {
    value: value,
    onChange: function onChange(e) {
      return _onChange && _onChange(e.target.value);
    }
  })), _react.default.createElement(_Button.default, {
    className: (0, _props.cx)(classSetButton),
    onClick: function onClick() {
      return add();
    }
  }, "+"));
};

Field.TypeCheckRadio = function (aprops) {
  var _genCommonProps7 = (0, _props.genCommonProps)(aprops),
      hasContainer = _genCommonProps7.hasContainer,
      type = _genCommonProps7.type,
      defaultValue = _genCommonProps7.defaultValue,
      _genCommonProps7$valu = _genCommonProps7.value,
      value = _genCommonProps7$valu === void 0 ? aprops.value === undefined ? aprops.value : Boolean(aprops.value) : _genCommonProps7$valu,
      domValue = _genCommonProps7.domValue,
      contentOn = _genCommonProps7.contentOn,
      contentOff = _genCommonProps7.contentOff,
      _onClick = _genCommonProps7.onClick,
      contentOnProps = _genCommonProps7.contentOnProps,
      contentOffProps = _genCommonProps7.contentOffProps,
      _genCommonProps7$comp = _genCommonProps7.component,
      Component = _genCommonProps7$comp === void 0 ? 'input' : _genCommonProps7$comp,
      style = _genCommonProps7.style,
      className = _genCommonProps7.className,
      cTheme = _genCommonProps7.cTheme,
      cStyle = _genCommonProps7.cStyle,
      cSize = _genCommonProps7.cSize,
      children = _genCommonProps7.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps7, ["hasContainer", "type", "defaultValue", "value", "domValue", "contentOn", "contentOff", "onClick", "contentOnProps", "contentOffProps", "component", "style", "className", "cTheme", "cStyle", "cSize", "children"]);

  var classSetLabel = (0, _defineProperty2.default)({
    'switch-status': true,
    'transition': true,
    'outline-none': true,
    'appearance-none': true,
    'line-height-1': true,
    'font-smoothing-antialiased': true,
    'vertical-align-middle': true,
    'bg-none': !(0, _props.hascx)(className, 'bg-color'),
    'flex-sub-flex-extend': hasContainer
  }, 'text-size-' + cSize, cSize);
  var classSetInput = {
    'visibility-hide': true,
    'display-none': true
  };
  var classSetInner = {
    'status': true,
    'position-relative': true,
    'padding-xs': true
  };
  return _react.default.createElement("label", {
    onClick: function onClick(e) {
      e.stopPropagation();
      _onClick && _onClick(e);
    },
    style: style,
    className: (0, _props.cx)(classSetLabel, className)
  }, _react.default.createElement(Component, (0, _extends2.default)({
    type: type,
    defaultChecked: defaultValue,
    checked: value,
    value: domValue,
    className: (0, _props.cx)(classSetInput)
  }, props)), _react.default.createElement("span", {
    className: (0, _props.cx)(classSetInner)
  }, _react.default.createElement(Field.TypeCheckRadio.On, (0, _extends2.default)({
    content: contentOn
  }, contentOnProps)), _react.default.createElement(Field.TypeCheckRadio.Off, (0, _extends2.default)({
    content: contentOff
  }, contentOffProps))));
};

Field.TypeCheckRadio.On = function (aprops) {
  var content = aprops.content,
      _aprops$component = aprops.component,
      Component = _aprops$component === void 0 ? _Icon.default : _aprops$component,
      _aprops$name = aprops.name,
      name = _aprops$name === void 0 ? _Icon.default.getName('check', 'X') : _aprops$name,
      _aprops$rounded = aprops.rounded,
      rounded = _aprops$rounded === void 0 ? true : _aprops$rounded,
      className = aprops.className,
      cTheme = aprops.cTheme,
      _aprops$cStyle = aprops.cStyle,
      cStyle = _aprops$cStyle === void 0 ? 'hollow' : _aprops$cStyle,
      props = (0, _objectWithoutProperties2.default)(aprops, ["content", "component", "name", "rounded", "className", "cTheme", "cStyle"]);

  if (content) {
    return (0, _react.cloneElement)(content, Object.assign({}, content.props, {
      className: (0, _props.cx)('on', content.props.className)
    }));
  } else {
    var classSet = {
      'padding-sm': true
    };
    return _react.default.createElement(Component, (0, _extends2.default)({
      name: name,
      rounded: rounded,
      cTheme: cTheme,
      cStyle: cStyle,
      className: (0, _props.cx)('on', classSet)
    }, props));
  }
};

Field.TypeCheckRadio.Off = function (aprops) {
  var content = aprops.content,
      _aprops$component2 = aprops.component,
      Component = _aprops$component2 === void 0 ? _Icon.default : _aprops$component2,
      _aprops$name2 = aprops.name,
      name = _aprops$name2 === void 0 ? _Icon.default.getName('check', 'X') : _aprops$name2,
      _aprops$rounded2 = aprops.rounded,
      rounded = _aprops$rounded2 === void 0 ? true : _aprops$rounded2,
      style = aprops.style,
      className = aprops.className,
      _aprops$cTheme = aprops.cTheme,
      cTheme = _aprops$cTheme === void 0 ? 'border' : _aprops$cTheme,
      _aprops$cStyle2 = aprops.cStyle,
      cStyle = _aprops$cStyle2 === void 0 ? 'hollow' : _aprops$cStyle2,
      props = (0, _objectWithoutProperties2.default)(aprops, ["content", "component", "name", "rounded", "style", "className", "cTheme", "cStyle"]);

  if (content) {
    return (0, _react.cloneElement)(content, Object.assign({}, content.props, {
      className: (0, _props.cx)('off', content.props.className)
    }));
  } else {
    var classSet = {
      'padding-sm': true
    };
    var styleSet = (0, _objectSpread2.default)({
      'color': 'transparent'
    }, style);
    return _react.default.createElement(Component, (0, _extends2.default)({
      name: name,
      rounded: rounded,
      cTheme: cTheme,
      cStyle: cStyle,
      style: styleSet,
      className: (0, _props.cx)('off', classSet)
    }, props));
  }
};

Field.TypeSwitch = function (aprops) {
  var _classSetStatusOnCont, _classSetStatusOn;

  var cTheme = aprops.cTheme;
  var classSetStatusOffContent = {
    'off': true,
    'bg-color-white': true,
    'border-radius-rounded': true,
    'border-set-component': true,
    'width-em': true,
    'height-em': true
  };
  var classSetStatusOnContent = (_classSetStatusOnCont = {
    'on': true,
    'bg-color-white': true
  }, (0, _defineProperty2.default)(_classSetStatusOnCont, 'border-' + (cTheme || 'component'), true), (0, _defineProperty2.default)(_classSetStatusOnCont, 'border-radius-rounded', true), (0, _defineProperty2.default)(_classSetStatusOnCont, 'width-em', true), (0, _defineProperty2.default)(_classSetStatusOnCont, 'height-em', true), _classSetStatusOnCont);
  var classSetStatusOn = (_classSetStatusOn = {
    'on': true,
    'width-em-2-0': true,
    'height-em': true
  }, (0, _defineProperty2.default)(_classSetStatusOn, 'bg-color-' + (cTheme || 'component'), true), (0, _defineProperty2.default)(_classSetStatusOn, 'border-radius-rounded', true), (0, _defineProperty2.default)(_classSetStatusOn, 'text-align-right', true), _classSetStatusOn);
  var classSetStatusOff = {
    'off': true,
    'width-em-2-0': true,
    'height-em': true,
    'bg-color-component': true,
    'border-radius-rounded': true,
    'text-align-left': true
  };
  return _react.default.createElement(Field.TypeCheckRadio, (0, _extends2.default)({}, aprops, {
    contentOn: _react.default.createElement("span", {
      className: (0, _props.cx)(classSetStatusOn)
    }, _react.default.createElement("span", {
      className: (0, _props.cx)(classSetStatusOnContent)
    })),
    contentOff: _react.default.createElement("span", {
      className: (0, _props.cx)(classSetStatusOff)
    }, _react.default.createElement("span", {
      className: (0, _props.cx)(classSetStatusOffContent)
    })),
    type: "checkbox"
  }));
};

var _default = Field;
exports.default = _default;
module.exports = exports["default"];
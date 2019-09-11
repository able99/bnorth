"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

require("core-js/modules/es6.regexp.constructor");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent10 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireWildcard(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty3.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 表单控件组件，是对 input 的包装，除 Field 属性外支持 input 标准属性
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
var _Field = function Field(aprops) {
  var _BaseComponent = (0, _BaseComponent10.default)(aprops, _Field),
      types = _BaseComponent.types,
      before = _BaseComponent.before,
      after = _BaseComponent.after,
      label = _BaseComponent.label,
      beforeProps = _BaseComponent.beforeProps,
      afterProps = _BaseComponent.afterProps,
      containerProps = _BaseComponent.containerProps,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["types", "before", "after", "label", "beforeProps", "afterProps", "containerProps"]);

  if (props.hasOwnProperty('value') && props.value === undefined) props.value = '';
  var ComponentField = types[aprops.type] || types.text;
  if (!ComponentField) return null;

  if (before || after) {
    props['b-style'] = 'plain';
    props['panelItemSelected'] = true;
  }

  var component = _react.default.createElement(ComponentField, props);

  if (!before && !after) return component;
  return _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    component: label && 'label',
    ctype: "primary"
  }, containerProps), before ? _react.default.createElement(_Panel.default, beforeProps, before) : null, component, after ? _react.default.createElement(_Panel.default, afterProps, after) : null);
};

_Field.defaultProps = {};
/**
 * 设置控件组件的类型，支持 html input type 以及自定义的类型，参见 Field 的成员，默认使用 text 对应的类型
 * @attribute module:Field.Field.type
 * @type {string}
 */

/**
 * 设置前置内容，将开启组模式，在容器中显示前置后置内容和表单控件组件
 * @attribute module:Field.Field.before
 * @type {component|element|string|number}
 */

/**
 * 设置后置内容，将开启组模式，在容器中显示前置后置内容和表单控件组件
 * @attribute module:Field.Field.after
 * @type {component|element|string|number}
 */

/**
 * 设置容器为 label 元素
 * @attribute module:Field.Field.label
 * @type {boolean}
 */

/**
 * 设置前置内容的组件的属性
 * @attribute module:Field.Field.beforeProps
 * @type {object}
 */

/**
 * 设置后置内容的组件的属性
 * @attribute module:Field.Field.afterProps
 * @type {object}
 */

/**
 * 设置容器组件的属性
 * @attribute module:Field.Field.containerProps
 * @type {object}
 */

(0, _defineProperty3.default)(_Field, "Field", {
  get: function get() {
    return _Field;
  },
  set: function set(val) {
    _Field = val;
  }
});
_Field.isBnorth = true;
_Field.defaultProps['b-precast'] = {};
var _default = _Field;
/**
 * 表单控件的一般类型组件
 * @component
 * @mount Field.Normal
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments input
 * @private
 */

exports.default = _default;

var _Normal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Normal, _React$Component);

  function Normal() {
    (0, _classCallCheck2.default)(this, Normal);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Normal).apply(this, arguments));
  }

  (0, _createClass2.default)(Normal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.input = (0, _BaseComponent10.domFindNode)(this);
      this.input.value = this.props.value || '';
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.value !== this.input.value) this.input.value = this.props.value || '';
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent2 = (0, _BaseComponent10.default)(this.props, _Normal),
          type = _BaseComponent2.type,
          value = _BaseComponent2.value,
          typesToElement = _BaseComponent2.typesToElement,
          onChange = _BaseComponent2.onChange,
          pattern = _BaseComponent2.pattern,
          patterns = _BaseComponent2.patterns,
          patternName = _BaseComponent2.patternName,
          onEnterPress = _BaseComponent2.onEnterPress,
          _onKeyPress = _BaseComponent2.onKeyPress,
          _BaseComponent2$compo = _BaseComponent2.component,
          component = _BaseComponent2$compo === void 0 ? "input" : _BaseComponent2$compo,
          classNamePre = _BaseComponent2.classNamePre,
          children = _BaseComponent2.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["type", "value", "typesToElement", "onChange", "pattern", "patterns", "patternName", "onEnterPress", "onKeyPress", "component", "classNamePre", "children"]);

      if (typesToElement.includes(type)) {
        component = type;
        type = null;
      } else {
        children = undefined;
      }

      if (patternName) pattern = patterns[patternName];
      classNamePre = _objectSpread({
        'field transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle': true,
        'bg-none- border-none-a-': !this.props['b-style']
      }, classNamePre);
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        type: type,
        onChange: this.props.hasOwnProperty('value') && onChange && pattern && function (e) {
          if (!RegExp(pattern).test(e.target.value)) e.target.value = value;
          onChange(e);
        } || onChange,
        onKeyPress: function onKeyPress(e) {
          if (onEnterPress && e.charCode === 13) {
            e.stopPropagation();
            e.preventDefault();
            onEnterPress(e.target.value);
          } else {
            _onKeyPress && _onKeyPress(e);
          }
        },
        component: component,
        classNamePre: classNamePre
      }, props), children);
    }
  }]);
  return Normal;
}(_react.default.Component);

_Normal.defaultProps = {};
/**
 * 当控件在焦点情况下输入回车时触发
 * @attribute module:Field~Normal.onEnterPress
 * @type {function}
 */

/**
 * 映射数组，数组内的 input type 直接映射为对应元素，例如：
 * <Field type="textarea" /> => <textarea></textarea>
 */

_Normal.defaultProps.typesToElement = ['progress', 'select', 'textarea'];
_Normal.defaultProps.patterns = {
  number: "^\\d*$",
  float: '^\\d*(.\\d*)?$',
  float2: '/^\\d*(.\\d{0,2})?$/'
};
/* eslint-disable no-useless-escape */

(0, _defineProperty3.default)(_Field, "Normal", {
  get: function get() {
    return _Normal;
  },
  set: function set(val) {
    _Normal = val;
  }
});
_Normal.isBnorth = true;
_Normal.defaultProps['b-precast'] = {};
/**
 * 表单控件的显示静态文本的组件，用于与其他表单组件达到一致样式
 * @component
 * @mount Field.Static
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments input
 * @private
 */

var _Static = function Static(aprops) {
  var _BaseComponent3 = (0, _BaseComponent10.default)(aprops, _Static),
      type = _BaseComponent3.type,
      value = _BaseComponent3.value,
      classNamePre = _BaseComponent3.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["type", "value", "classNamePre"]);

  classNamePre = _objectSpread({
    'line-height-1 vertical-align-middle': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "span",
    classNamePre: classNamePre
  }, props), value || _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, " "));
};

_Static.defaultProps = {};
(0, _defineProperty3.default)(_Field, "Static", {
  get: function get() {
    return _Static;
  },
  set: function set(val) {
    _Static = val;
  }
});
_Static.isBnorth = true;
_Static.defaultProps['b-precast'] = {};
/**
 * 表单控件的隐藏组件，使用 label 组件套住该组件，用于改变默认组件的样式
 * @component
 * @mount Field.HiddenInput
 * @augments BaseComponent
 * @private
 */

var _HiddenInput = function HiddenInput(aprops) {
  var _BaseComponent4 = (0, _BaseComponent10.default)(aprops, _HiddenInput),
      classNamePre = _BaseComponent4.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["classNamePre"]);

  classNamePre = _objectSpread({
    'visibility-hide display-none': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "input",
    classNamePre: classNamePre
  }, props));
};

_HiddenInput.defaultProps = {};
(0, _defineProperty3.default)(_Field, "HiddenInput", {
  get: function get() {
    return _HiddenInput;
  },
  set: function set(val) {
    _HiddenInput = val;
  }
});
_HiddenInput.isBnorth = true;
_HiddenInput.defaultProps['b-precast'] = {};
/**
 * 表单控件组件的文件选择控件实现的组件
 * @component
 * @mount Field.File
 * @augments BaseComponent
 * @private
 */

var _File = function File(aprops) {
  var _BaseComponent5 = (0, _BaseComponent10.default)(aprops, _File),
      type = _BaseComponent5.type,
      value = _BaseComponent5.value,
      inputProps = _BaseComponent5.inputProps,
      disabled = _BaseComponent5.disabled,
      onClick = _BaseComponent5.onClick,
      onChange = _BaseComponent5.onChange,
      classNamePre = _BaseComponent5.classNamePre,
      children = _BaseComponent5.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent5, ["type", "value", "inputProps", "disabled", "onClick", "onChange", "classNamePre", "children"]);

  classNamePre = _objectSpread({
    'line-height-1 vertical-align-middle': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    disabled: disabled,
    component: "label",
    classNamePre: classNamePre
  }, props), _react.default.createElement(_HiddenInput, (0, _extends2.default)({
    type: type,
    value: value,
    disabled: disabled,
    onClick: onClick,
    onChange: onChange
  }, inputProps)), children);
};

_File.defaultProps = {};
/**
 * 设置隐藏的 input 的容器的属性
 * @attribute module:Field~File.inputProps
 * @type {object}
 */

(0, _defineProperty3.default)(_Field, "File", {
  get: function get() {
    return _File;
  },
  set: function set(val) {
    _File = val;
  }
});
_Field.isBnorth = true;
_Field.defaultProps['b-precast'] = {};
/**
 * 表单控件的2态组件，用于实现 checkbox 等具有 checked 属性类型的组件，实现了2种状态切换的功能
 * 
 * 对该组件设置的其他属性，将设置到 content 组件上
 * @component
 * @mount Field.CheckState
 * @augments BaseComponent
 * @private
 */

var _CheckState = function CheckState(aprops) {
  var _BaseComponent6 = (0, _BaseComponent10.default)(aprops, _CheckState),
      type = _BaseComponent6.type,
      value = _BaseComponent6.value,
      defaultValue = _BaseComponent6.defaultValue,
      domValue = _BaseComponent6.domValue,
      disabled = _BaseComponent6.disabled,
      onClick = _BaseComponent6.onClick,
      onChange = _BaseComponent6.onChange,
      inputProps = _BaseComponent6.inputProps,
      innerProps = _BaseComponent6.innerProps,
      statusProps = _BaseComponent6.statusProps,
      statusCheckedProps = _BaseComponent6.statusCheckedProps,
      statusUncheckedProps = _BaseComponent6.statusUncheckedProps,
      classNamePre = _BaseComponent6.classNamePre,
      children = _BaseComponent6.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent6, ["type", "value", "defaultValue", "domValue", "disabled", "onClick", "onChange", "inputProps", "innerProps", "statusProps", "statusCheckedProps", "statusUncheckedProps", "classNamePre", "children"]);

  classNamePre = _objectSpread({
    'check-status line-height-0 display-inlineblock vertical-align-middle': true
  }, classNamePre);
  var classNamePreInner = {
    'check-status-inner position-relative line-height-0 display-inlineblock': true
  };
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "label",
    classNamePre: classNamePre
  }, props), _react.default.createElement(_HiddenInput, (0, _extends2.default)({
    type: type,
    checked: value,
    defaultChecked: defaultValue,
    value: domValue,
    disabled: disabled,
    onChange: onChange
  }, inputProps)), _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "span",
    classNamePre: classNamePreInner
  }, innerProps), _react.default.createElement(_Panel.default, (0, _extends2.default)({
    type: type,
    disabled: disabled,
    classNameExt: "check-status-checked"
  }, statusProps, statusCheckedProps)), _react.default.createElement(_Panel.default, (0, _extends2.default)({
    type: type,
    disabled: disabled,
    classNameExt: "check-status-unchecked"
  }, statusProps, statusUncheckedProps))), children);
};

_CheckState.defaultProps = {};
/**
 * 
 * @attribute module:Field~CheckState.value
 * @type {boolean}
 */

/**
 * 
 * @attribute module:Field~CheckState.defaultValue
 * @type {boolean}
 */

/**
 * 设置 input dom 的 value 属性
 * @attribute module:Field~CheckState.domValue
 * @type {string}
 */

/**
 * 设置隐藏的 input 的容器的属性
 * @attribute module:Field~CheckState.inputProps
 * @type {object}
 */

/**
 * 设置2态内容的容器的属性
 * @attribute module:Field~CheckState.innerProps
 * @type {object}
 */

(0, _defineProperty3.default)(_Field, "CheckState", {
  get: function get() {
    return _CheckState;
  },
  set: function set(val) {
    _CheckState = val;
  }
});
_CheckState.isBnorth = true;
_CheckState.defaultProps['b-precast'] = {};
/**
 * 表单控件的对应的 checkbox 组件，基于2态组件实现
 * @component
 * @mount Field.Checkbox
 * @augments BaseComponent
 * @private
 */

var _Checkbox = function Checkbox(aprops) {
  var _BaseComponent7 = (0, _BaseComponent10.default)(aprops, _Checkbox),
      disabled = _BaseComponent7.disabled,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent7, ["disabled"]);

  return _react.default.createElement(_CheckState, (0, _extends2.default)({
    "b-style": "hollow",
    "bg-color-component": disabled,
    "bp-status-component": _Icon.default,
    "bp-statusChecked-name": "check:X",
    "bp-statusUnchecked-name": " ",
    disabled: disabled
  }, props));
};

_Checkbox.defaultProps = {};
(0, _defineProperty3.default)(_Field, "Checkbox", {
  get: function get() {
    return _Checkbox;
  },
  set: function set(val) {
    _Checkbox = val;
  }
});
_Checkbox.isBnorth = true;
_Checkbox.defaultProps['b-precast'] = {};
/**
 * 表单控件的对应的 radio 组件，基于2态组件实现
 * @component
 * @mount Field.Radio
 * @augments BaseComponent
 * @private
 */

var _Radio = function Radio(aprops) {
  var _BaseComponent8 = (0, _BaseComponent10.default)(aprops, _Radio),
      disabled = _BaseComponent8.disabled,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent8, ["disabled"]);

  return _react.default.createElement(_CheckState, (0, _extends2.default)({
    "b-style": "hollow",
    "bg-color-component": disabled,
    "bc-border-radius-rounded": true,
    "bp-status-component": _Icon.default,
    "bp-statusChecked-name": "check:X",
    "bp-statusUnchecked-name": " ",
    disabled: disabled
  }, props));
};

_Radio.defaultProps = {};
(0, _defineProperty3.default)(_Field, "Radio", {
  get: function get() {
    return _Radio;
  },
  set: function set(val) {
    _Radio = val;
  }
});
_Radio.isBnorth = true;
_Radio.defaultProps['b-precast'] = {};
/**
 * 表单控件的开关组件，基于2态组件实现
 * @component
 * @mount Field.Switch
 * @augments BaseComponent
 * @private
 */

var _Switch = function Switch(aprops) {
  var _BaseComponent9 = (0, _BaseComponent10.default)(aprops, _Switch),
      disabled = _BaseComponent9.disabled,
      _BaseComponent9$bThe = _BaseComponent9['b-theme'],
      bTheme = _BaseComponent9$bThe === void 0 ? 'component' : _BaseComponent9$bThe,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent9, ["disabled", "b-theme"]);

  var classNamePreItem = {
    'border-radius-rounded width-1em height-1em': true
  };
  return _react.default.createElement(_CheckState, (0, _extends2.default)({
    "b-style": "hollow",
    "bg-color-component": disabled,
    "bc-border-radius-rounded": true,
    "bp-statusChecked-children": _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": bTheme,
      classNamePre: classNamePreItem,
      "bs-zIndex": "10"
    }), _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": "white",
      classNamePre: classNamePreItem,
      "bs-marginLeft": "-0.3em"
    })),
    "bp-statusUnchecked-children": _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": "white",
      classNamePre: classNamePreItem
    }), _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": "component",
      classNamePre: classNamePreItem,
      "bs-marginLeft": "-0.3em"
    })),
    disabled: disabled
  }, props, {
    type: "checkbox"
  }));
};

_Switch.defaultProps = {};
(0, _defineProperty3.default)(_Field, "Switch", {
  get: function get() {
    return _Switch;
  },
  set: function set(val) {
    _Switch = val;
  }
});
_Switch.isBnorth = true;
_Switch.defaultProps['b-precast'] = {};
_Field.defaultProps.types = {
  text: _Normal,
  static: _Static,
  file: _File,
  checkbox: _Checkbox,
  radio: _Radio,
  switch: _Switch
};
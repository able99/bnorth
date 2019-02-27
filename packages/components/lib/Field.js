"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _BaseComponent8 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireWildcard(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @module
 */

/**
 * 表单控件组件，是对 input 的包装，除 Field 属性外支持 input 标准属性
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
var Field = function Field(aprops) {
  var types = aprops.types,
      before = aprops.before,
      after = aprops.after,
      label = aprops.label,
      beforeProps = aprops.beforeProps,
      afterProps = aprops.afterProps,
      containerProps = aprops.containerProps,
      props = (0, _objectWithoutProperties2.default)(aprops, ["types", "before", "after", "label", "beforeProps", "afterProps", "containerProps"]);
  if (props.hasOwnProperty('value') && props.value === undefined) props.value = '';
  var ComponentField = types[aprops.type] || types.text;
  if (!ComponentField) return null;

  var component = _react.default.createElement(ComponentField, (0, _extends2.default)({
    "b-style": (before || after) && 'plain',
    itemSelected: Boolean(before || after)
  }, props));

  if (!before && !after) return component;
  return _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    component: label && 'label',
    type: "primary"
  }, containerProps), before ? _react.default.createElement(_Panel.default, beforeProps, before) : null, component, after ? _react.default.createElement(_Panel.default, afterProps, after) : null);
};

Field.defaultProps = {};
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

Object.defineProperty(Field, "Field", {
  get: function get() {
    return Field;
  },
  set: function set(val) {
    Field = val;
  }
});
var _default = Field;
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
      this.input = (0, _BaseComponent8.domFindNode)(this);
      this.input.value = this.props.value || '';
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.value !== prevProps.value) this.input.value = this.props.value || '';
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent = (0, _BaseComponent8.default)(this.props, _Normal),
          type = _BaseComponent.type,
          value = _BaseComponent.value,
          typesToElement = _BaseComponent.typesToElement,
          onPressEnter = _BaseComponent.onPressEnter,
          _onKeyPress = _BaseComponent.onKeyPress,
          _BaseComponent$compon = _BaseComponent.component,
          component = _BaseComponent$compon === void 0 ? "input" : _BaseComponent$compon,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "value", "typesToElement", "onPressEnter", "onKeyPress", "component", "children"]);

      if (typesToElement.includes(type)) {
        component = type;
        type = null;
      } else {
        children = undefined;
      }

      var classNamePre = {
        'field transition outline-none appearance-none- line-height-1 font-smoothing-antialiased vertical-align-middle': true,
        'bg-none- border-none-a-': !this.props['b-style']
      };
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: component,
        type: type,
        onKeyPress: function onKeyPress(e) {
          if (onPressEnter && e.charCode === 13) {
            e.stopPropagation();
            e.preventDefault();
            onPressEnter(e.target.value);
          } else {
            _onKeyPress && _onKeyPress(e);
          }
        },
        classNamePre: classNamePre
      }, props), children);
    }
  }]);
  return Normal;
}(_react.default.Component);

_Normal.defaultProps = {};
/**
 * 当控件在焦点情况下输入回车时触发
 * @attribute module:Field~Normal.onPressEnter
 * @type {function}
 */

/**
 * 映射数组，数组内的 input type 直接映射为对应元素，例如：
 * <Field type="textarea" /> => <textarea></textarea>
 */

_Normal.defaultProps.typesToElement = ['progress', 'select', 'textarea'];
Object.defineProperty(Field, "Normal", {
  get: function get() {
    return _Normal;
  },
  set: function set(val) {
    _Normal = val;
  }
});
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
  var _BaseComponent2 = (0, _BaseComponent8.default)(aprops, _Static),
      type = _BaseComponent2.type,
      value = _BaseComponent2.value,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["type", "value"]);

  var classNamePre = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "span",
    classNamePre: classNamePre
  }, props), value || _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, " "));
};

_Static.defaultProps = {};
Object.defineProperty(Field, "Static", {
  get: function get() {
    return _Static;
  },
  set: function set(val) {
    _Static = val;
  }
});
/**
 * 表单控件的隐藏组件，使用 label 组件套住该组件，用于改变默认组件的样式
 * @component
 * @mount Field.HiddenInput
 * @augments BaseComponent
 * @private
 */

var _HiddenInput = function HiddenInput(aprops) {
  var props = (0, _BaseComponent8.default)(aprops, _HiddenInput);
  var classNamePre = 'visibility-hide display-none';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "input",
    classNamePre: classNamePre
  }, props));
};

_HiddenInput.defaultProps = {};
Object.defineProperty(Field, "HiddenInput", {
  get: function get() {
    return _HiddenInput;
  },
  set: function set(val) {
    _HiddenInput = val;
  }
});
/**
 * 表单控件组件的文件选择控件实现的组件
 * @component
 * @mount Field.File
 * @augments BaseComponent
 * @private
 */

var _File = function File(aprops) {
  var _BaseComponent3 = (0, _BaseComponent8.default)(aprops, _File),
      type = _BaseComponent3.type,
      value = _BaseComponent3.value,
      inputProps = _BaseComponent3.inputProps,
      disabled = _BaseComponent3.disabled,
      onClick = _BaseComponent3.onClick,
      onChange = _BaseComponent3.onChange,
      children = _BaseComponent3.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["type", "value", "inputProps", "disabled", "onClick", "onChange", "children"]);

  var classNamePre = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "label",
    classNamePre: classNamePre,
    disabled: disabled
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

Object.defineProperty(Field, "File", {
  get: function get() {
    return _File;
  },
  set: function set(val) {
    _File = val;
  }
});
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
  var _BaseComponent4 = (0, _BaseComponent8.default)(aprops, _CheckState),
      type = _BaseComponent4.type,
      value = _BaseComponent4.value,
      defaultValue = _BaseComponent4.defaultValue,
      domValue = _BaseComponent4.domValue,
      disabled = _BaseComponent4.disabled,
      onClick = _BaseComponent4.onClick,
      onChange = _BaseComponent4.onChange,
      inputProps = _BaseComponent4.inputProps,
      innerProps = _BaseComponent4.innerProps,
      statusProps = _BaseComponent4.statusProps,
      statusCheckedProps = _BaseComponent4.statusCheckedProps,
      statusUncheckedProps = _BaseComponent4.statusUncheckedProps,
      children = _BaseComponent4.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["type", "value", "defaultValue", "domValue", "disabled", "onClick", "onChange", "inputProps", "innerProps", "statusProps", "statusCheckedProps", "statusUncheckedProps", "children"]);

  var classNamePre = 'check-status line-height-0 display-inlineblock vertical-align-middle bg-none-';
  var classNamePreInner = 'check-status-inner position-relative line-height-0 display-inlineblock';
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

Object.defineProperty(Field, "CheckState", {
  get: function get() {
    return _CheckState;
  },
  set: function set(val) {
    _CheckState = val;
  }
});
/**
 * 表单控件的对应的 checkbox 组件，基于2态组件实现
 * @component
 * @mount Field.Checkbox
 * @augments BaseComponent
 * @private
 */

var _Checkbox = function Checkbox(aprops) {
  var _BaseComponent5 = (0, _BaseComponent8.default)(aprops, _Checkbox),
      disabled = _BaseComponent5.disabled,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent5, ["disabled"]);

  return _react.default.createElement(_CheckState, (0, _extends2.default)({
    "b-style": "hollow",
    "bg-color-component": disabled,
    "bp-status-component": _Icon.default,
    "bp-statusChecked-name": "check:X",
    "bp-statusUnchecked-name": " ",
    disabled: disabled
  }, props));
};

Object.defineProperty(Field, "Checkbox", {
  get: function get() {
    return _Checkbox;
  },
  set: function set(val) {
    _Checkbox = val;
  }
});
/**
 * 表单控件的对应的 radio 组件，基于2态组件实现
 * @component
 * @mount Field.Radio
 * @augments BaseComponent
 * @private
 */

var _Radio = function Radio(aprops) {
  var _BaseComponent6 = (0, _BaseComponent8.default)(aprops, _Radio),
      disabled = _BaseComponent6.disabled,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent6, ["disabled"]);

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

Object.defineProperty(Field, "Radio", {
  get: function get() {
    return _Radio;
  },
  set: function set(val) {
    _Radio = val;
  }
});
/**
 * 表单控件的开关组件，基于2态组件实现
 * @component
 * @mount Field.Switch
 * @augments BaseComponent
 * @private
 */

var _Switch = function Switch(aprops) {
  var _BaseComponent7 = (0, _BaseComponent8.default)(aprops, _Switch),
      disabled = _BaseComponent7.disabled,
      _BaseComponent7$bThe = _BaseComponent7['b-theme'],
      bTheme = _BaseComponent7$bThe === void 0 ? 'component' : _BaseComponent7$bThe,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent7, ["disabled", 'b-theme']);

  var classNamePreItem = 'border-radius-rounded width-1em height-1em';
  return _react.default.createElement(_CheckState, (0, _extends2.default)({
    "b-style": "hollow",
    "bg-color-component": disabled,
    "bc-border-radius-rounded": true,
    "bp-statusChecked-children": _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": bTheme,
      classNamePre: classNamePreItem
    }), _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": "white",
      classNamePre: classNamePreItem
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
      classNamePre: classNamePreItem
    })),
    disabled: disabled
  }, props, {
    type: "checkbox"
  }));
};

Object.defineProperty(Field, "Switch", {
  get: function get() {
    return _Switch;
  },
  set: function set(val) {
    _Switch = val;
  }
});
Field.defaultProps.types = {
  text: _Normal,
  static: _Static,
  file: _File,
  checkbox: _Checkbox,
  radio: _Radio,
  switch: _Switch
};
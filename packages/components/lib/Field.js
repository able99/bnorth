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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

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
  var before = aprops.before,
      after = aprops.after,
      label = aprops.label,
      beforeProps = aprops.beforeProps,
      afterProps = aprops.afterProps,
      containerProps = aprops.containerProps,
      props = (0, _objectWithoutProperties2.default)(aprops, ["before", "after", "label", "beforeProps", "afterProps", "containerProps"]);
  if (props.hasOwnProperty('value') && props.value === undefined) props.value = '';
  var ComponentField = Field[aprops.type] || Field.text;
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


var _default = Field;
/**
 * 表单控件的一般类型组件
 * @component
 * @mount Field.Normal
 * @augments BaseComponent
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
    key: "_updateValue",
    value: function _updateValue() {
      this.input.value = this.props.value || '';
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(e) {
      var _this$props = this.props,
          onPressEnter = _this$props.onPressEnter,
          onKeyPress = _this$props.onKeyPress;

      if (onPressEnter && e.charCode === 13) {
        e.stopPropagation();
        e.preventDefault();
        onPressEnter(e.target.value);
      } else {
        onKeyPress && onKeyPress(e);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.input = (0, _BaseComponent8.domFindNode)(this);

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
      var _BaseComponent = (0, _BaseComponent8.default)(this.props, _Normal),
          type = _BaseComponent.type,
          value = _BaseComponent.value,
          onPressEnter = _BaseComponent.onPressEnter,
          onKeyPress = _BaseComponent.onKeyPress,
          component = _BaseComponent.component,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "value", "onPressEnter", "onKeyPress", "component", "children"]);

      var classNamePre = {
        'field transition outline-none appearance-none- line-height-1 font-smoothing-antialiased vertical-align-middle': true,
        'bg-none- border-none-a-': !this.props['b-style']
      };

      if (_Normal.typesToElement && _Normal.typesToElement.includes(type)) {
        component = type;
        type = null;
      } else {
        children = undefined;
      }

      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: component,
        type: type,
        onKeyPress: this.handleKeyPress,
        classNamePre: classNamePre
      }, props), children);
    }
  }]);
  return Normal;
}(_react.default.Component);

_Normal.defaultProps = {};
/**
 * 参见 Field
 * @attribute module:Field~Normal.type
 */

/**
 * 控件的值
 * @attribute module:Field~Normal.value
 * @type {string}
 */

/**
 * 当控件在焦点情况下输入回车时触发
 * @attribute module:Field~Normal.onPressEnter
 * @type {function}
 */

_Normal.defaultProps.component = 'input';
/**
 * 映射数组，数组内的 input type 直接映射为对应元素，例如：
 * <Field type="textarea" /> => <textarea></textarea>
 * @member
 */

_Normal.typesToElement = ['progress', 'select', 'textarea'];
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
 * @augments BaseComponent
 * @private
 */

var _Static = function Static(aprops) {
  var _BaseComponent2 = (0, _BaseComponent8.default)(aprops, _Static),
      type = _BaseComponent2.type,
      value = _BaseComponent2.value,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["type", "value"]);

  var classNamePre = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    classNamePre: classNamePre
  }, props), value || _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, " "));
};

Object.defineProperty(Field, "Static", {
  get: function get() {
    return _Static;
  },
  set: function set(val) {
    _Static = val;
  }
});
_Static.defaultProps = {};
/**
 * 参见 Field
 * @attribute module:Field~Static.type
 */

/**
 * 显示的静态文本
 * @attribute module:Field~Static.value
 * @type {string}
 */

_Static.defaultProps.component = 'span';
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
_HiddenInput.defaultProps.component = 'input';
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
 * 浏览器的文件对象
 * @attribute module:Field~File.value
 * @type {file}
 */

/**
 * 设置隐藏的 input 的容器的属性
 * @attribute module:Field~File.inputProps
 * @type {object}
 */

_File.defaultProps = {};
_File.defaultProps.component = 'label';
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
      content = _BaseComponent4.content,
      domValue = _BaseComponent4.domValue,
      disabled = _BaseComponent4.disabled,
      onClick = _BaseComponent4.onClick,
      onChange = _BaseComponent4.onChange,
      CheckStateProps = _BaseComponent4.CheckStateProps,
      statusCheckedProps = _BaseComponent4.statusCheckedProps,
      statusUncheckedProps = _BaseComponent4.statusUncheckedProps,
      inputProps = _BaseComponent4.inputProps,
      innerProps = _BaseComponent4.innerProps,
      children = _BaseComponent4.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["type", "value", "defaultValue", "content", "domValue", "disabled", "onClick", "onChange", "CheckStateProps", "statusCheckedProps", "statusUncheckedProps", "inputProps", "innerProps", "children"]);

  var classNamePre = 'check-status line-height-1 vertical-align-middle bg-none-';
  var classNamePreInner = 'check-status-inner position-relative';
  var classNamePreContent = 'position-relative';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "label",
    classNamePre: classNamePre
  }, CheckStateProps), _react.default.createElement(_HiddenInput, (0, _extends2.default)({
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
    classNamePre: classNamePreContent,
    classNameExt: "check-status-checked",
    children: "X1"
  }, props, statusCheckedProps)), _react.default.createElement(_Panel.default, (0, _extends2.default)({
    type: type,
    disabled: disabled,
    classNamePre: classNamePreContent,
    classNameExt: "check-status-unchecked",
    children: "-1"
  }, props, statusUncheckedProps))), children);
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
 * 设置2态内容
 * @attribute module:Field~CheckState.content
 * @type {string}
 */

/**
 * 设置设置2态组件的属性
 * @attribute module:Field~CheckState.labelProps
 * @type {object}
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

  props.component = _Icon.default;
  props.CheckStateProps = {
    'b-style': 'hollow',
    'bc-bg-color-component': disabled
  };
  props['bp-statusChecked-name'] = 'check';
  props['bp-statusUnchecked-name'] = ' ';
  return _react.default.createElement(_CheckState, (0, _extends2.default)({
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

  props.component = _Icon.default;
  props.CheckStateProps = {
    'b-style': 'hollow',
    'bc-bg-color-component': disabled,
    'bc-border-radius-rounded': true
  };
  props['bp-statusChecked-name'] = 'check';
  props['bp-statusUnchecked-name'] = ' ';
  return _react.default.createElement(_CheckState, (0, _extends2.default)({
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

  props.CheckStateProps = {
    'b-style': 'hollow',
    'bc-bg-color-component': disabled,
    'bc-border-radius-rounded': true,
    'line-height-0': true
  };
  var classNamePre = 'border-radius-rounded width-1em height-1em';
  props.statusCheckedProps = {
    children: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": bTheme,
      classNamePre: classNamePre
    }), _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": "white",
      classNamePre: classNamePre
    }))
  };
  props.statusUncheckedProps = {
    children: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": "white",
      classNamePre: classNamePre
    }), _react.default.createElement(_Panel.default, {
      inline: true,
      "b-style": "solid",
      "b-theme": bTheme,
      classNamePre: classNamePre
    }))
  };
  return _react.default.createElement(_CheckState, (0, _extends2.default)({
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
/**
 * 控件组件支持的的类型，对应一般的类型以及默认类型
 * @member module:Field.Field.text
 * @default Field.Normal
 */

Object.defineProperty(Field, "text", {
  get: function get() {
    return Field.Normal;
  }
});
/**
 * 控件组件支持的的类型，对应静态类型，该类型为表单组提供一致的组件和样式
 * @member module:Field.Field.static
 * @default Field.Static
 */

Object.defineProperty(Field, "static", {
  get: function get() {
    return Field.Static;
  }
});
/**
 * 控件组件支持的的类型，对应 input checkbox 标准类型
 * @member module:Field.Field.checkbox
 * @default Field.Checkbox
 */

Object.defineProperty(Field, "checkbox", {
  get: function get() {
    return Field.Checkbox;
  }
});
/**
 * 控件组件支持的的类型，对应 switch 类型，实现了开关按钮
 * @member module:Field.Field.radio
 * @default Field.Radio
 */

Object.defineProperty(Field, "radio", {
  get: function get() {
    return Field.Radio;
  }
});
/**
 * 控件组件支持的的类型，对应 input switch 标准类型
 * @member module:Field.Field.switch
 * @default Field.Switch
 */

Object.defineProperty(Field, "switch", {
  get: function get() {
    return Field.Switch;
  }
});
/**
 * 控件组件支持的的类型，对应 input file 标准类型
 * @member module:Field.Field.file
 * @default Field.File
 */

Object.defineProperty(Field, "file", {
  get: function get() {
    return Field.File;
  }
});
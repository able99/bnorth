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

var _Panel = _interopRequireDefault(require("./Panel.Container"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @module
 */
// Filed
// ------------------

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
  return _react.default.createElement(_Container, (0, _extends2.default)({
    before: before,
    after: after,
    label: label,
    beforeProps: beforeProps,
    afterProps: afterProps
  }, containerProps), _react.default.createElement(ComponentField, (0, _extends2.default)({
    "b-style": (before || after) && 'plain',
    subTypePrimary: Boolean(before || after)
  }, props)));
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
 * 控件组件支持的的类型，对应一般的类型以及默认类型
 * @member module:Field.Field.text
 * @default Field.Normal
 */

exports.default = _default;
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
/**
 * 表单控件组件的容器，只有设置了 before 或者 after 属性时，才会启动容器模式
 * @component
 * @mount Field.Container
 * @augments BaseComponent
 * @private
 */

var _Container = function Container(aprops) {
  if (!aprops.before && !aprops.after) return aprops.children;

  var _parseProps = (0, _props.default)(aprops, _Container.props),
      before = _parseProps.before,
      after = _parseProps.after,
      label = _parseProps.label,
      beforeProps = _parseProps.beforeProps,
      afterProps = _parseProps.afterProps,
      Component = _parseProps.component,
      _parseProps$component = _parseProps.componentPanel,
      componentPanel = _parseProps$component === void 0 ? label && 'label' : _parseProps$component,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["before", "after", "label", "beforeProps", "afterProps", "component", "componentPanel", "children"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    type: "primary"
  }, props), before ? _react.default.createElement(_Content, beforeProps, before) : null, children, after ? _react.default.createElement(_Content, afterProps, after) : null);
};

Object.defineProperty(Field, "Container", {
  get: function get() {
    return _Container;
  },
  set: function set(val) {
    _Container = val;
  }
});
_Container.defaultProps = {};
/**
 * 设置容器是否使用 inline 模式
 * @attribute module:Field~Container.inline
 * @type {boolean}
 */

/**
 * 参见 Field
 * @attribute module:Field~Container.before
 */

/**
 * 参见 Field
 * @attribute module:Field~Container.after
 */

/**
 * 参见 Field
 * @attribute module:Field~Container.label
 */

/**
 * 参见 Field
 * @attribute module:Field~Container.beforeProps
*/

/**
 * 参见 Field
 * @attribute module:Field~Container.afterProps
 */

/**
 * 参见 BaseComponent
 */

_Container.defaultProps.component = _Panel.default.Container;
/**
 * 表单控件组件的容器的前置和后置的内容组件
 * @component
 * @mount Field.Container.Content
 * @augments BaseComponent
 * @private
 */

var _Content = function Content(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Content.props),
      Component = _parseProps2.component,
      componentPanel = _parseProps2.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props));
};

Object.defineProperty(Field.Container, "Content", {
  get: function get() {
    return _Content;
  },
  set: function set(val) {
    _Content = val;
  }
});
_Content.defaultProps = {};
/**
 * 参见 BaseContainer
 */

_Content.defaultProps.component = _Panel.default; // Type: Normal
// --------------------

/**
 * 表单控件的一般类型组件
 * @component
 * @mount Field.Normal
 * @augments BaseComponent
 * @private
 */

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
      var _parseProps3 = (0, _props.default)(this.props, _Normal.props),
          type = _parseProps3.type,
          value = _parseProps3.value,
          onPressEnter = _parseProps3.onPressEnter,
          onKeyPress = _parseProps3.onKeyPress,
          Component = _parseProps3.component,
          componentPanel = _parseProps3.componentPanel,
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

      if (_Normal.typesToElement && _Normal.typesToElement.includes(type)) {
        componentPanel = type;
        type = null;
      } else {
        children = undefined;
      }

      return _react.default.createElement(Component, (0, _extends2.default)({
        type: type,
        onKeyPress: handleKeyPress,
        component: componentPanel,
        className: (0, _classes.default)(classStr, classSet, className)
      }, props), children);
    }
  }]);
  return Normal;
}(_react.default.Component);

Object.defineProperty(Field, "Normal", {
  get: function get() {
    return _Normal;
  },
  set: function set(val) {
    _Normal = val;
  }
});
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

/**
 * 参见 BaseComponent
 */

_Normal.defaultProps.component = _Panel.default;
/**
 * 参见 BaseComponent
 */

_Normal.defaultProps.componentPanel = 'input';
/**
 * 映射数组，数组内的 input type 直接映射为对应元素，例如：
 * <Field type="textarea" /> => <textarea></textarea>
 * @member
 */

_Normal.typesToElement = ['progress', 'select', 'textarea']; // Type: Static
// --------------------

/**
 * 表单控件的显示静态文本的组件，用于与其他表单组件达到一致样式
 * @component
 * @mount Field.Static
 * @augments BaseComponent
 * @private
 */

var _Static = function Static(aprops) {
  var _parseProps4 = (0, _props.default)(aprops, _Static.props),
      type = _parseProps4.type,
      value = _parseProps4.value,
      Component = _parseProps4.component,
      componentPanel = _parseProps4.componentPanel,
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

/**
 * 参见 BaseComponent
 */

_Static.defaultProps.component = _Panel.default;
/**
 * 参见 BaseComponent
 */

_Static.defaultProps.componentPanel = 'span'; // Type: Hidden 
// --------------------

/**
 * 表单控件的隐藏组件，使用 label 组件套住该组件，用于改变默认组件的样式
 * @component
 * @mount Field.HiddenInput
 * @augments BaseComponent
 * @private
 */

var _HiddenInput = function HiddenInput(aprops) {
  var _parseProps5 = (0, _props.default)(aprops, _HiddenInput.props),
      Component = _parseProps5.component,
      className = _parseProps5.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps5, ["component", "className"]);

  var classStr = 'visibility-hide display-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(Field, "HiddenInput", {
  get: function get() {
    return _HiddenInput;
  },
  set: function set(val) {
    _HiddenInput = val;
  }
});
_HiddenInput.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_HiddenInput.defaultProps.component = 'input'; // Type: CheckState 
// --------------------

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
  var _parseProps6 = (0, _props.default)(aprops, _CheckState.props),
      type = _parseProps6.type,
      value = _parseProps6.value,
      defaultValue = _parseProps6.defaultValue,
      content = _parseProps6.content,
      domValue = _parseProps6.domValue,
      disabled = _parseProps6.disabled,
      _onClick = _parseProps6.onClick,
      onChange = _parseProps6.onChange,
      CheckStateProps = _parseProps6.CheckStateProps,
      inputProps = _parseProps6.inputProps,
      innerProps = _parseProps6.innerProps,
      _parseProps6$componen = _parseProps6.component,
      Component = _parseProps6$componen === void 0 ? _Panel.default : _parseProps6$componen,
      _parseProps6$componen2 = _parseProps6.componentPanel,
      componentPanel = _parseProps6$componen2 === void 0 ? 'label' : _parseProps6$componen2,
      className = _parseProps6.className,
      children = _parseProps6.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps6, ["type", "value", "defaultValue", "content", "domValue", "disabled", "onClick", "onChange", "CheckStateProps", "inputProps", "innerProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'check-status transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle bg-none-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    onClick: function onClick(e) {
      e.stopPropagation();
      _onClick && _onClick(e);
    },
    className: (0, _classes.default)(classStr, className)
  }, CheckStateProps), _react.default.createElement(_HiddenInput, (0, _extends2.default)({
    type: type,
    checked: value,
    defaultChecked: defaultValue,
    value: domValue,
    disabled: disabled,
    onChange: onChange
  }, inputProps)), _react.default.createElement(_CheckStateInner, innerProps, _react.default.createElement(_CheckStateContent, (0, _extends2.default)({
    component: content
  }, props, {
    type: type,
    disabled: disabled,
    isChecked: true
  }), "X"), _react.default.createElement(_CheckStateContent, (0, _extends2.default)({
    component: content
  }, props, {
    type: type,
    disabled: disabled
  }), "-")));
};

Object.defineProperty(Field, "CheckState", {
  get: function get() {
    return _CheckState;
  },
  set: function set(val) {
    _CheckState = val;
  }
});
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

/**
 * 参见 BaseComponent
 */

_CheckState.defaultProps.component = _Panel.default;
/**
 * 参见 BaseComponent
 */

_CheckState.defaultProps.componentPanel = 'label';
/**
 * 表单控件的2态组件的状态内容的容器组件
 * @component
 * @mount Field.CheckState.Inner
 * @augments BaseComponent
 * @private
 */

var _CheckStateInner = function CheckStateInner(aprops) {
  var _parseProps7 = (0, _props.default)(aprops, _CheckStateInner.props),
      Component = _parseProps7.component,
      _parseProps7$componen = _parseProps7.componentPanel,
      componentPanel = _parseProps7$componen === void 0 ? 'span' : _parseProps7$componen,
      className = _parseProps7.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps7, ["component", "componentPanel", "className"]);

  var classStr = 'check-status-inner position-relative';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(Field.CheckState, "Inner", {
  get: function get() {
    return _CheckStateInner;
  },
  set: function set(val) {
    _CheckStateInner = val;
  }
});
_CheckStateInner.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_CheckStateInner.defaultProps.component = _Panel.default;
/**
 * 参见 BaseComponent
 */

_CheckStateInner.defaultProps.componentPanel = 'span';
/**
 * 表单控件的2态组件的状态内容组件
 * @component
 * @mount Field.CheckState.Content
 * @augments BaseComponent
 * @private
 */

var _CheckStateContent = function CheckStateContent(aprops) {
  var _parseProps8 = (0, _props.default)(aprops, _CheckStateContent.props),
      isChecked = _parseProps8.isChecked,
      _parseProps8$componen = _parseProps8.component,
      Component = _parseProps8$componen === void 0 ? _Panel.default : _parseProps8$componen,
      className = _parseProps8.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps8, ["isChecked", "component", "className"]);

  var classStr = 'position-relative';
  var classSet = [isChecked ? 'check-status-checked' : 'check-status-unchecked'];
  return _react.default.createElement(Component, (0, _extends2.default)({
    inline: true,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props, {
    isChecked: isChecked
  }));
};

Object.defineProperty(Field.CheckState, "Content", {
  get: function get() {
    return _CheckStateContent;
  },
  set: function set(val) {
    _CheckStateContent = val;
  }
});
_CheckStateContent.defaultProps = {};
/**
 * 指示是否是2种状态中的开启状态
 * @attribute module:Field~CheckStateContent.isChecked
 */

/**
 * 参见 BaseComponent
 */

_CheckStateContent.defaultProps.component = _Panel.default; // radio checkbox
// ----------------------

/**
 * 表单控件的 checkbox 和 radio 的2态组件内容
 * @component
 * @mount Field.CheckStateContentCheckRadio
 * @augments BaseComponent
 * @private
 */

var _CheckStateContentCheckRadio = function CheckStateContentCheckRadio(aprops) {
  var _parseProps9 = (0, _props.default)(aprops, _CheckStateContentCheckRadio.props),
      type = _parseProps9.type,
      isChecked = _parseProps9.isChecked,
      disabled = _parseProps9.disabled,
      name = _parseProps9.name,
      nameChecked = _parseProps9.nameChecked,
      defaultName = _parseProps9.defaultName,
      defaultNameChecked = _parseProps9.defaultNameChecked,
      Component = _parseProps9.component,
      bTheme = _parseProps9['b-theme'],
      bStyle = _parseProps9['b-style'],
      props = (0, _objectWithoutProperties2.default)(_parseProps9, ["type", "isChecked", "disabled", "name", "nameChecked", "defaultName", "defaultNameChecked", "component", 'b-theme', 'b-style']);

  if (!bStyle) bStyle = 'hollow';

  if (!isChecked) {
    bTheme = undefined;
    bStyle = 'hollow';
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    type: type,
    name: isChecked ? nameChecked : name,
    defaultName: isChecked ? defaultNameChecked : defaultName,
    "bc-border-radius-rounded": !Boolean(type === 'checkbox'),
    "bc-bg-color-component": disabled,
    "b-style": bStyle,
    "b-theme": bTheme
  }, props));
};

Object.defineProperty(Field, "CheckStateContentCheckRadio", {
  get: function get() {
    return _CheckStateContentCheckRadio;
  },
  set: function set(val) {
    _CheckStateContentCheckRadio = val;
  }
});
_CheckStateContentCheckRadio.defaultProps = {};
/**
 * 指示是否是选择状态的内容组件
 * @attribute module:Field~CheckStateContentCheckRadio.isChecked
 * @type {boolean}
 */

/**
 * 设置未选中时的图标名称
 * @type {string}
 */

_CheckStateContentCheckRadio.defaultProps.name = ' ';
/**
 * 设置选中时的图标名称
 * @type {string}
 */

_CheckStateContentCheckRadio.defaultProps.nameChecked = 'check';
/**
 * 设置未选中时的图标默认名称
 * @type {string}
 */

_CheckStateContentCheckRadio.defaultProps.defaultName = ' ';
/**
 * 设置选中时的图标默认名称
 * @type {string}
 */

_CheckStateContentCheckRadio.defaultProps.defaultNameChecked = 'x';
/**
 * 参见 BaseComponent
 */

_CheckStateContentCheckRadio.defaultProps.component = _Icon.default;
/**
 * 表单控件的对应的 checkbox 组件，基于2态组件实现
 * @component
 * @mount Field.Checkbox
 * @augments BaseComponent
 * @private
 */

var _Checkbox = function Checkbox(aprops) {
  aprops = (0, _props.default)(aprops, _Checkbox.props);
  return _react.default.createElement(_CheckState, (0, _extends2.default)({
    content: Field.CheckStateContentCheckRadio
  }, aprops));
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
  aprops = (0, _props.default)(aprops, _Radio.props);
  return _react.default.createElement(_CheckState, (0, _extends2.default)({
    content: Field.CheckStateContentCheckRadio
  }, aprops));
};

Object.defineProperty(Field, "Radio", {
  get: function get() {
    return _Radio;
  },
  set: function set(val) {
    _Radio = val;
  }
}); // switch
// ----------------------

/**
 * 表单控件用于开关组件的2态内容
 * @component
 * @mount Field.CheckStateContentSwitch
 * @augments BaseComponent
 * @private
 */

var _CheckStateContentSwitch = function CheckStateContentSwitch(aprops) {
  var _parseProps10 = (0, _props.default)(aprops, _CheckStateContentSwitch.props),
      Component = _parseProps10.component,
      className = _parseProps10.className,
      children = _parseProps10.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps10, ["component", "className", "children"]);

  var classStr = 'border-radius-rounded line-height-0';
  return _react.default.createElement(Component, {
    "b-style": "hollow",
    className: (0, _classes.default)(classStr, className)
  }, _react.default.createElement(_CheckStateContentSwitchItem, (0, _extends2.default)({}, props, {
    isOn: true
  })), _react.default.createElement(_CheckStateContentSwitchItem, props));
};

Object.defineProperty(Field, "CheckStateContentSwitch", {
  get: function get() {
    return _CheckStateContentSwitch;
  },
  set: function set(val) {
    _CheckStateContentSwitch = val;
  }
});
_CheckStateContentSwitch.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_CheckStateContentSwitch.defaultProps.component = _Panel.default;
/**
 * 表单控件用于开关组件的2态内容的子组件，现实了开关的圆按钮
 * @component
 * @mount Field.CheckStateContentSwitchItem
 * @augments BaseComponent
 * @private
 */

var _CheckStateContentSwitchItem = function CheckStateContentSwitchItem(aprops) {
  var _parseProps11 = (0, _props.default)(aprops, _CheckStateContentSwitchItem.props),
      isChecked = _parseProps11.isChecked,
      isOn = _parseProps11.isOn,
      Component = _parseProps11.component,
      _parseProps11$bTheme = _parseProps11['b-theme'],
      bTheme = _parseProps11$bTheme === void 0 ? 'component' : _parseProps11$bTheme,
      className = _parseProps11.className,
      children = _parseProps11.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps11, ["isChecked", "isOn", "component", 'b-theme', "className", "children"]);

  var classStr = 'border-radius-rounded width-1em height-1em';
  return _react.default.createElement(Component, (0, _extends2.default)({}, props, {
    inline: true,
    "b-style": "solid",
    "b-theme": isOn ? isChecked ? bTheme : 'white' : isChecked ? 'white' : 'component',
    className: (0, _classes.default)(classStr, className)
  }));
};

Object.defineProperty(Field.CheckStateContentSwitch, "Item", {
  get: function get() {
    return _CheckStateContentSwitchItem;
  },
  set: function set(val) {
    _CheckStateContentSwitchItem = val;
  }
});
_CheckStateContentSwitchItem.defaultProps = {};
/**
 * 指示是否是2种状态中的开启状态
 * @attribute module:Field~CheckStateContentSwitchItem.isChecked
 */

/**
 * 指示是开启状态的子组件还是关闭状态的子组件
 * @attribute module:Field~CheckStateContentSwitchItem.isOn
 */

/**
 * 参见 BaseComponent
 */

_CheckStateContentSwitchItem.defaultProps.component = _Panel.default;
/**
 * 表单控件的开关组件，基于2态组件实现
 * @component
 * @mount Field.Switch
 * @augments BaseComponent
 * @private
 */

var _Switch = function Switch(aprops) {
  aprops = (0, _props.default)(aprops, _Switch.props);
  return _react.default.createElement(_CheckState, (0, _extends2.default)({
    content: Field.CheckStateContentSwitch
  }, aprops, {
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
}); // file
// ----------------------

/**
 * 表单控件组件的文件选择控件实现的组件
 * @component
 * @mount Field.File
 * @augments BaseComponent
 * @private
 */

var _File = function File(aprops) {
  var _parseProps12 = (0, _props.default)(aprops, _File.props),
      type = _parseProps12.type,
      value = _parseProps12.value,
      inputProps = _parseProps12.inputProps,
      disabled = _parseProps12.disabled,
      onClick = _parseProps12.onClick,
      onChange = _parseProps12.onChange,
      Component = _parseProps12.component,
      componentPanel = _parseProps12.componentPanel,
      className = _parseProps12.className,
      children = _parseProps12.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps12, ["type", "value", "inputProps", "disabled", "onClick", "onChange", "component", "componentPanel", "className", "children"]);

  var classStr = 'line-height-1 vertical-align-middle';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className),
    disabled: disabled
  }, props), _react.default.createElement(_HiddenInput, (0, _extends2.default)({
    type: type,
    value: value,
    disabled: disabled,
    onClick: onClick,
    onChange: onChange
  }, inputProps)), children);
};

Object.defineProperty(Field, "File", {
  get: function get() {
    return _File;
  },
  set: function set(val) {
    _File = val;
  }
});
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
/**
 * 参见 BaseComponent
 */

_File.defaultProps.component = _Panel.default;
/**
 * 参见 BaseComponent
 */

_File.defaultProps.componentPanel = 'label';
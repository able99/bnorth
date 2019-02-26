"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelContainerItem = exports.PanelContainer = exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.array.find-index");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _BaseComponent6 = _interopRequireDefault(require("./BaseComponent"));

var _Touchable = _interopRequireDefault(require("./Touchable"));

/**
 * @module
 */
// Panel
// ------------------------------

/**
 * 小面板组件，基本的布局单位，其他组件一般使用该组件做基本组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 */
var _Panel = function Panel(aprops) {
  if (aprops.componentTranform) {
    var ComponentTranform = aprops.componentTranform;
    return _react.default.createElement(ComponentTranform, (0, _objectSpread6.default)({}, aprops, {
      componentTranform: undefined
    }));
  }

  var _BaseComponent = (0, _BaseComponent6.default)(aprops, _Panel),
      main = _BaseComponent.main,
      page = _BaseComponent.page,
      full = _BaseComponent.full,
      inline = _BaseComponent.inline,
      itemIndex = _BaseComponent.itemIndex,
      itemCount = _BaseComponent.itemCount,
      itemSelected = _BaseComponent.itemSelected,
      itemPlain = _BaseComponent.itemPlain,
      containerProps = _BaseComponent.containerProps,
      selected = _BaseComponent.selected,
      status = _BaseComponent.status,
      hasBg = _BaseComponent.hasBg,
      hasSelection = _BaseComponent.hasSelection,
      textThemeOnBg = _BaseComponent.textThemeOnBg,
      bgThemeOnHollow = _BaseComponent.bgThemeOnHollow,
      textThemeOnBgSelected = _BaseComponent.textThemeOnBgSelected,
      textThemeOnBgUnselected = _BaseComponent.textThemeOnBgUnselected,
      textThemeUnselected = _BaseComponent.textThemeUnselected,
      bTheme = _BaseComponent['b-theme'],
      bStyle = _BaseComponent['b-style'],
      bSize = _BaseComponent['b-size'],
      _BaseComponent$compon = _BaseComponent.component,
      Component = _BaseComponent$compon === void 0 ? "div" : _BaseComponent$compon,
      className = _BaseComponent.className,
      style = _BaseComponent.style,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["main", "page", "full", "inline", "itemIndex", "itemCount", "itemSelected", "itemPlain", "containerProps", "selected", "status", "hasBg", "hasSelection", "textThemeOnBg", "bgThemeOnHollow", "textThemeOnBgSelected", "textThemeOnBgUnselected", "textThemeUnselected", 'b-theme', 'b-style', 'b-size', "component", "className", "style"]);

  if (hasBg === undefined) hasBg = bStyle === 'solid' && bTheme;
  if (hasSelection === undefined) hasSelection = bStyle === 'underline';
  if (page) props['data-container'] = true;
  var classSet = {
    'position-relative': true,
    'offset-a-start square-full overflow-a-hidden': full,
    'display-inlineblock': inline,
    'flex-display-block flex-direction-v bg-color-view': page,
    'scrollable-a- flex-sub-flex-extend': main,
    'status-': status
  };
  var styleSet = {};
  var textTheme;
  if (hasSelection) textTheme = hasBg ? selected ? textThemeOnBgSelected : textThemeOnBgUnselected : selected ? bTheme || false : textThemeUnselected;
  if (!hasSelection) textTheme = hasBg ? textThemeOnBg : bTheme;
  textTheme = textTheme ? textTheme === true ? '' : textTheme : false;
  classSet['text-color-' + textTheme] = textTheme !== false;
  classSet['text-size-' + (bSize === 'true' ? '' : bSize)] = bSize;

  if (bStyle === 'solid') {
    var theme = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : 'component';
    classSet['bg-color-' + theme] = theme !== false;
    classSet['border-set-a-' + theme] = theme !== false;
  } else if (bStyle === 'hollow') {
    var _theme = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : '';

    classSet['border-set-a-' + _theme] = _theme !== false;
    classSet[bgThemeOnHollow === false ? 'bg-none-' : 'bg-color-' + (bgThemeOnHollow === true ? '' : bgThemeOnHollow)] = true;
  } else if (bStyle === 'underline') {
    var _theme2 = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : '';

    classSet['border-none-top- border-none-left- border-none-right- bg-none-'] = true;
    classSet['border-width-bottom-2'] = true;
    classSet['border-set-bottom-' + _theme2] = _theme2 !== false;
    if (!selected) styleSet['borderColor'] = 'transparent';
  } else if (bStyle === 'plain') {
    classSet['border-none-top- border-none-bottom- border-none-left- border-none-right- bg-none-'] = true;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classSet, className),
    style: (0, _objectSpread6.default)({}, styleSet, style)
  }, props));
};

_Panel.defaultProps = {};
/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.page
 * @type {boolean}
 */

/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.main
 * @type {boolean}
 */

/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.full
 * @type {boolean}
 */

/**
 * 设为为 inline 模式，将开启 display inline 样式
 * @attribute module:Panel.Panel.inline
 * @type {boolean}
 */

/**
 * 设置为选中状态，
 * @attribute module:Panel.Panel.selected
 * @type {boolean}
 */

/**
 * 设置为响应点击状态
 * @attribute module:Panel.Panel.status
 * @type {boolean}
 */

/**
 * 设置为有背景状态
 * @attribute module:Panel.Panel.hasBg
 * @type {boolean}
 */

/**
 * 设置为有响应选中状态
 * @attribute module:Panel.Panel.hasSelection
 * @type {boolean}
 */

/**
 * 设置文本主题，在有背景的面板上时
 * @type {string}
 */

_Panel.defaultProps.textThemeOnBg = 'white';
/**
 * 设置背景主题，在镂空样式时
 * @type {string}
 */

_Panel.defaultProps.bgThemeOnHollow = 'white';
/**
 * 设置文本主题，在有背景和在选择状态下
 * @type {string}
 */

_Panel.defaultProps.textThemeOnBgSelected = 'white';
/**
 * 设置文本主题，在有背景和在未选择状态下
 * @type {string}
 */

_Panel.defaultProps.textThemeOnBgUnselected = 'disable';
/**
 * 设置文本主题，在无背景和在未选择状态下
 * @type {string}
 */

_Panel.defaultProps.textThemeUnselected = 'disable';
/**
 * 设置样式主题，根据 richcss color 的设置
 * @attribute module:Panel.Panel.b-theme
 * @type {string}
 */

/**
 * 设置样式风格，包括 plain，solid，hollow，underline
 * @attribute module:Panel.Panel.b-style
 * @type {string}
 */

/**
 * 设置样式尺寸，设置文本的字体大小，根据 richcss textSize 的配置
 * @attribute module:Panel.Panel.b-size
 * @type {string}
 */

Object.defineProperty(_Panel, "Panel", {
  get: function get() {
    return _Panel;
  },
  set: function set(val) {
    _Panel = val;
  }
});
var _default = _Panel; // Container
// --------------------

exports.default = _default;
var positionToDirection = {
  left: 'h',
  right: 'hv',
  top: 'v',
  bottom: 'vv'
  /**
   * 扩展小面板组件，提供了容器的能力，可管理子组件,
   * 
   * 容器内的子组件会被容器进行属性设置，如果希望特殊子组件不接受容器组件设置，子组件需要包含 itemPlain 属性
   * @component
   * @augments module:BaseComponent.BaseComponent
   * @augments module:Panel.Panel
   */

};

var _PanelContainer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PanelContainer, _React$Component);

  function PanelContainer() {
    (0, _classCallCheck2.default)(this, PanelContainer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PanelContainer).apply(this, arguments));
  }

  (0, _createClass2.default)(PanelContainer, [{
    key: "render",
    value: function render() {
      var _this = this,
          _objectSpread5;

      var _BaseComponent2 = (0, _BaseComponent6.default)(this.props, _PanelContainer),
          type = _BaseComponent2.type,
          inline = _BaseComponent2.inline,
          position = _BaseComponent2.position,
          direction = _BaseComponent2.direction,
          justify = _BaseComponent2.justify,
          align = _BaseComponent2.align,
          wrap = _BaseComponent2.wrap,
          _BaseComponent2$selec = _BaseComponent2.selectedIndex,
          selectedIndex = _BaseComponent2$selec === void 0 ? 0 : _BaseComponent2$selec,
          _BaseComponent2$count = _BaseComponent2.countToShow,
          countToShow = _BaseComponent2$count === void 0 ? 1 : _BaseComponent2$count,
          onSelectedChange = _BaseComponent2.onSelectedChange,
          SeparatorComponent = _BaseComponent2.separator,
          separatorProps = _BaseComponent2.separatorProps,
          noOverlap = _BaseComponent2.noOverlap,
          itemProps = _BaseComponent2.itemProps,
          itemGetProps = _BaseComponent2.itemGetProps,
          itemGetClassName = _BaseComponent2.itemGetClassName,
          itemGetStyle = _BaseComponent2.itemGetStyle,
          Component = _BaseComponent2.component,
          className = _BaseComponent2.className,
          children = _BaseComponent2.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["type", "inline", "position", "direction", "justify", "align", "wrap", "selectedIndex", "countToShow", "onSelectedChange", "separator", "separatorProps", "noOverlap", "itemProps", "itemGetProps", "itemGetClassName", "itemGetStyle", "component", "className", "children"]);

      if (SeparatorComponent === true) SeparatorComponent = _Separator;
      var classSet = {
        'position-relative overflow-a-hidden': true
      };
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      children = !SeparatorComponent ? children : children.reduce(function (v1, v2, i, a) {
        if (!SeparatorComponent) return a;
        if (i > 0) v1.push(_react.default.createElement(SeparatorComponent, (0, _extends2.default)({
          key: 'sep' + i,
          itemPlain: true
        }, separatorProps)));
        v1.push(v2);
        return v1;
      }, []);
      var aindex = children.findIndex(function (v) {
        return (0, _typeof2.default)(v) === 'object' && v.props.itemSelected;
      });
      selectedIndex = aindex >= 0 ? aindex : selectedIndex;
      var itemCount = children.filter(function (v) {
        return (0, _typeof2.default)(v) === 'object' && !v.props.itemPlain;
      }).length;
      var itemIndex = -1;
      children = _react.default.Children.toArray(children).map(function (v) {
        return (0, _typeof2.default)(v) !== 'object' || v.props.itemPlain ? v : _react.default.createElement(_PanelContainerItem, _PanelContainer.genSubProps(type, selectedIndex, _this.props, ++itemIndex, itemCount, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps), v);
      });

      if (type === 'single') {
        children = children.filter(function (v) {
          return v.props.itemSelected;
        });
        props.inline = inline;
      } else if (type === 'justify') {
        var _objectSpread2;

        classSet = (0, _objectSpread6.default)({}, classSet, (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty2.default)(_objectSpread2, 'flex-justify-around flex-align-stretch', true), _objectSpread2));
      } else if (type === 'primary') {
        var _objectSpread3;

        classSet = (0, _objectSpread6.default)({}, classSet, (_objectSpread3 = {}, (0, _defineProperty2.default)(_objectSpread3, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty2.default)(_objectSpread3, 'flex-align-center', true), _objectSpread3));
      } else if (type === 'flex') {
        classSet = (0, _objectSpread6.default)({}, classSet, (0, _defineProperty2.default)({}, 'flex-display-' + (inline ? 'inline' : 'block'), true));
      } else if (type === 'scroll') {
        var childrenPlain = children.filter(function (v) {
          return (0, _typeof2.default)(v) === 'object' && v.props.itemPlain;
        });
        var childrenItem = children.filter(function (v) {
          return (0, _typeof2.default)(v) === 'object' && !v.props.itemPlain;
        });
        children = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_InnerScroll, {
          countToShow: countToShow,
          selectedIndex: selectedIndex,
          onSelectedChange: onSelectedChange
        }, childrenItem), childrenPlain);
      }

      if (position) direction = positionToDirection[position];
      classSet = (0, _objectSpread6.default)({}, classSet, (_objectSpread5 = {}, (0, _defineProperty2.default)(_objectSpread5, 'flex-direction-' + direction, direction), (0, _defineProperty2.default)(_objectSpread5, 'flex-justify-' + justify, justify), (0, _defineProperty2.default)(_objectSpread5, 'flex-align-' + align, align), (0, _defineProperty2.default)(_objectSpread5, 'flex-wrap-' + wrap, wrap), _objectSpread5));
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classes.default)(classSet, className)
      }, props), children);
    }
  }]);
  return PanelContainer;
}(_react.default.Component);

exports.PanelContainer = _PanelContainer;
_PanelContainer.defaultProps = {};
/**
 * 设置子组件的排列类型，包括：
 * 
 * - single： 仅 selected 属性为真的子组件显示
 * - justify： 平分组件
 * - primary: 仅 subTypePrimary 属性的子组件扩展，其他组件保持不延展不压缩
 * - flex: 普通 flex 布局
 * 
 * @attribute module:Panel~PanelContainer.type
 * @type {string}
 */

/**
 * 设置组件的 flex direction 属性，参见 rich.css
 * @attribute module:Panel~PanelContainer.direction
 * @type {string}
 */

/**
 * 设置组件的 flex justify 属性，参见 rich.css
 * @attribute module:Panel~PanelContainer.justify
 * @type {string}
 */

/**
 * 设置组件的 flex align 属性，参见 rich.css
 * @attribute module:Panel~PanelContainer.align
 * @type {string}
 */

/**
 * 设置组件的 flex wrap 属性，参见 rich.css
 * @attribute module:Panel~PanelContainer.wrap
 * @type {string}
 */

/**
 * 统一设置子组件的属性
 * @attribute module:Panel~PanelContainer.itemProps
 * @type {object}
 */

/**
 * 获取子组件样式类的回调函数
 * @callback ItemGetClassNameCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {string|object|array} 样式字符串，样式对象或者样式类数组，具体参见 rich.css classes 函数
 */

/**
 * 设置获取子组件的样式类的回到函数
 * @attribute module:Panel~PanelContainer.itemGetClassName
 * @type {module:Panel~ItemGetClassNameCallback}
 */

/**
 * 设置默认的获取子组件的样式类的回到函数
 * @member module:Panel~PanelContainer.itemGetClassName
 * @type {module:Panel~ItemGetClassNameCallback}
 */

/**
 * 获取子组件样式对象的回调函数
 * @callback ItemGetStyleCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {object} 样式表对象
 */

/**
 * 设置子组件的样式对象的回调函数
 * @attribute module:Panel~PanelContainer.itemGetStyle
 * @type {module:Panel~ItemGetStyleCallback}
 */

/**
 * 设置默认的子组件的样式对象的回调函数
 * @member module:Panel~PanelContainer.itemGetStyle
 * @type {module:Panel~ItemGetStyleCallback}
 */

/**
 * 获取子组件属性的回调函数
 * @callback ItemGetPropsCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {object} 属性对象
 */

/**
 * 设置获取子组件的属性的回调函数
 * @attribute module:Panel~PanelContainer.itemGetProps
 * @type {module:Panel~ItemGetPropsCallback}
 */

/**
 * 设置默认的获取子组件的属性的回调函数
 * @member module:Panel~PanelContainer.itemGetProps
 * @type {module:Panel~ItemGetPropsCallback}
 * @static
 */

_PanelContainer.defaultProps.component = _Panel;
/**
 * 子组件属性计算函数
 * @member
 */

_PanelContainer.genSubProps = function (type, selectedIndex, containerProps, itemIndex, itemCount) {
  var _ref = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {},
      key = _ref.key,
      className = _ref.className,
      style = _ref.style,
      componentProps = (0, _objectWithoutProperties2.default)(_ref, ["key", "className", "style"]);

  var _ref2 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
      itemClassName = _ref2.className,
      itemStyle = _ref2.style,
      itemProps = (0, _objectWithoutProperties2.default)(_ref2, ["className", "style"]);

  var itemGetClassName = arguments.length > 7 ? arguments[7] : undefined;
  var itemGetStyle = arguments.length > 8 ? arguments[8] : undefined;
  var itemGetProps = arguments.length > 9 ? arguments[9] : undefined;
  var ret = (0, _objectSpread6.default)({
    key: key || itemIndex,
    type: type,
    containerProps: containerProps.containerProps,
    itemIndex: itemIndex,
    itemCount: itemCount,
    itemSelected: selectedIndex === itemIndex
  }, componentProps, itemProps);
  ret.style = (0, _objectSpread6.default)({}, itemGetStyle && itemGetStyle(ret, containerProps) || {}, itemStyle, style);
  ret.className = (0, _classes.default)(itemGetClassName && itemGetClassName(ret, containerProps), itemClassName, className);
  return (0, _objectSpread6.default)({}, ret, itemGetProps && itemGetProps(ret, containerProps) || {});
};

Object.defineProperty(_Panel, "Container", {
  get: function get() {
    return _PanelContainer;
  },
  set: function set(val) {
    exports.PanelContainer = _PanelContainer = val;
  }
}); // Panel Container Item
// ------------------------------

/**
 * 带容器能力的小面板组件的子组件
 * @component 
 */

var _PanelContainerItem = function PanelContainerItem(aprops) {
  var _BaseComponent3 = (0, _BaseComponent6.default)(aprops, _PanelContainerItem),
      type = _BaseComponent3.type,
      _BaseComponent3$conta = _BaseComponent3.containerProps,
      containerProps = _BaseComponent3$conta === void 0 ? {} : _BaseComponent3$conta,
      itemIndex = _BaseComponent3.itemIndex,
      itemCount = _BaseComponent3.itemCount,
      itemSelected = _BaseComponent3.itemSelected,
      itemPlain = _BaseComponent3.itemPlain,
      className = _BaseComponent3.className,
      children = _BaseComponent3.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["type", "containerProps", "itemIndex", "itemCount", "itemSelected", "itemPlain", "className", "children"]);

  if (itemPlain) return children;
  var classSet = [];
  if (type === 'single') classSet.push('position-relative offset-a-start square-full overflow-a-hidden');
  if (type === 'justify') classSet.push('flex-sub-flex-extend');
  if (type === 'primary') classSet.push(itemSelected ? 'flex-sub-flex-extend' : 'flex-sub-flex-none');
  if (type === 'scroll') classSet.push('flex-sub-flex-extend height-full');
  if (containerProps.noOverlap && itemIndex < itemCount - 1) classSet.push('border-none-right-');
  if (containerProps.separator) classSet.push('border-none-a- bg-none-');
  return (0, _react.cloneElement)(children, (0, _objectSpread6.default)({
    className: (0, _classes.default)(classSet, className),
    containerProps: containerProps,
    itemIndex: itemIndex,
    itemCount: itemCount,
    itemSelected: itemSelected,
    itemPlain: itemPlain
  }, props));
};

exports.PanelContainerItem = _PanelContainerItem;
_PanelContainerItem.defaultProps = {};
/**
 * 容器组件的组织类型
 * @attribute module:Panel~PanelContainerItem.type
 */

/**
 * 容器组件是否有分隔要求 
 * @attribute module:Panel~PanelContainerItem.separator
 */

/**
 * 组件在容器中的索引
 * @attribute module:Panel~PanelContainerItem.itemIndex
 * @type {number}
 */

/**
 * 容器中子组件的数量
 * @attribute module:Panel~PanelContainerItem.itemCount
 * @type {number}
 */

/**
 * 组件为容器中选中组件
 * @attribute module:Panel~PanelContainerItem.itemSelected
 * @type {boolean}
 */

/**
 * 组件不接受容器管理
 * @attribute module:Panel~PanelContainerItem.itemPlain
 * @type {boolean}
 */

/**
 * 容器组件的属性
 * @attribute module:Panel~PanelContainerItem.containerProps
 * @type {object}
 */

Object.defineProperty(_Panel, "ContainerItem", {
  get: function get() {
    return _PanelContainerItem;
  },
  set: function set(val) {
    exports.PanelContainerItem = _PanelContainerItem = val;
  }
}); // Inner Scroll
// ------------------------

/**
 * 容器内部的滑动组件
 * @component 
 * @private
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments module:Touchable.Touchable
 */

var _InnerScroll =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(InnerScroll, _React$Component2);

  function InnerScroll() {
    (0, _classCallCheck2.default)(this, InnerScroll);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InnerScroll).apply(this, arguments));
  }

  (0, _createClass2.default)(InnerScroll, [{
    key: "handlePanStart",
    value: function handlePanStart(event, element) {
      var _this$props = this.props,
          countToShow = _this$props.countToShow,
          children = _this$props.children;
      this.size = element.clientWidth * countToShow / children.length;
    }
  }, {
    key: "handlePan",
    value: function handlePan(event, element) {
      this.setState({
        offset: event.deltaX
      });
    }
  }, {
    key: "handlePanEnd",
    value: function handlePanEnd(event, element) {
      var _this$props2 = this.props,
          selectedIndex = _this$props2.selectedIndex,
          countToShow = _this$props2.countToShow,
          onSelectedChange = _this$props2.onSelectedChange,
          children = _this$props2.children;
      this.setState({
        offset: undefined
      }, function () {
        if (onSelectedChange) {
          var aindex = selectedIndex - Math.round(event.deltaX * children.length / (countToShow * element.clientWidth));
          aindex = Math.min(aindex, children.length - 1);
          aindex = Math.max(aindex, 0);
          if (selectedIndex !== aindex) onSelectedChange(aindex);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent4 = (0, _BaseComponent6.default)(this.props, _InnerScroll),
          countToShow = _BaseComponent4.countToShow,
          selectedIndex = _BaseComponent4.selectedIndex,
          Component = _BaseComponent4.component,
          className = _BaseComponent4.className,
          style = _BaseComponent4.style,
          children = _BaseComponent4.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["countToShow", "selectedIndex", "component", "className", "style", "children"]);

      var _ref3 = this.state || {},
          offset = _ref3.offset;

      children = _react.default.Children.toArray(children);
      var classStr = 'flex-display-block flex-align-stretch height-full transition-set-';
      var styleSet = (0, _objectSpread6.default)({
        width: "".concat(100 / countToShow * children.length, "%")
      }, (0, _animation.transform)('translateX', isNaN(offset) ? -100 / children.length * (selectedIndex % children.length) + '%' : -(this.size / countToShow) * (selectedIndex % children.length) + (offset || 0) + 'px'), style);
      return _react.default.createElement(Component, (0, _extends2.default)({
        direction: "horizontal",
        recognizers: {
          'pan': {
            enable: true
          }
        },
        onPanStart: this.handlePanStart.bind(this),
        onPan: this.handlePan.bind(this),
        onPanEnd: this.handlePanEnd.bind(this),
        onPanCancel: this.handlePanEnd.bind(this),
        className: (0, _classes.default)(classStr, className),
        style: styleSet
      }, props), children);
    }
  }]);
  return InnerScroll;
}(_react.default.Component);

_InnerScroll.defaultProps = {};
_InnerScroll.defaultProps.component = _Touchable.default;
Object.defineProperty(_Panel, "InnerScroll", {
  get: function get() {
    return _InnerScroll;
  },
  set: function set(val) {
    _InnerScroll = val;
  }
}); // Separator
// -------------------------

/**
 * 分隔条组件
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @private
 */

var _Separator = function Separator(aprops) {
  var _BaseComponent5 = (0, _BaseComponent6.default)(aprops, _Separator),
      Component = _BaseComponent5.component,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent5, ["component"]);

  var classNamePre = 'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center';
  return _react.default.createElement(_Panel, (0, _extends2.default)({
    inline: true,
    "b-theme": "border",
    "b-size": "lg",
    classNamePre: classNamePre
  }, props), _react.default.createElement("span", null, "|"));
};

Object.defineProperty(_Panel, "Separator", {
  get: function get() {
    return _Separator;
  },
  set: function set(val) {
    _Separator = val;
  }
});
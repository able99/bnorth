"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
 * @augments BaseComponent
 */
var Panel = function Panel(aprops) {
  if (aprops.componentTranform) {
    var ComponentTranform = aprops.componentTranform;
    return _react.default.createElement(ComponentTranform, (0, _objectSpread2.default)({}, aprops, {
      componentTranform: undefined
    }));
  }

  var _BaseComponent = (0, _BaseComponent6.default)(aprops, Panel),
      main = _BaseComponent.main,
      inline = _BaseComponent.inline,
      selected = _BaseComponent.selected,
      status = _BaseComponent.status,
      hasBg = _BaseComponent.hasBg,
      hasSelection = _BaseComponent.hasSelection,
      itemIndex = _BaseComponent.itemIndex,
      itemCount = _BaseComponent.itemCount,
      itemSelect = _BaseComponent.itemSelect,
      itemPlain = _BaseComponent.itemPlain,
      textThemeOnBg = _BaseComponent.textThemeOnBg,
      bgThemeOnHollow = _BaseComponent.bgThemeOnHollow,
      textThemeOnBgSelected = _BaseComponent.textThemeOnBgSelected,
      textThemeOnBgUnselected = _BaseComponent.textThemeOnBgUnselected,
      textThemeUnselected = _BaseComponent.textThemeUnselected,
      _BaseComponent$compon = _BaseComponent.component,
      Component = _BaseComponent$compon === void 0 ? "div" : _BaseComponent$compon,
      className = _BaseComponent.className,
      style = _BaseComponent.style,
      bTheme = _BaseComponent['b-theme'],
      bStyle = _BaseComponent['b-style'],
      bSize = _BaseComponent['b-size'],
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["main", "inline", "selected", "status", "hasBg", "hasSelection", "itemIndex", "itemCount", "itemSelect", "itemPlain", "textThemeOnBg", "bgThemeOnHollow", "textThemeOnBgSelected", "textThemeOnBgUnselected", "textThemeUnselected", "component", "className", "style", 'b-theme', 'b-style', 'b-size']);

  if (hasBg === undefined) hasBg = bStyle === 'solid' && bTheme;
  if (hasSelection === undefined) hasSelection = bStyle === 'underline';
  var classStr = 'position-relative';
  var classSet = {
    'scrollable-a-': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline,
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

    classSet['bg-none-'] = true;
    classSet['border-none-top-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;
    classSet['border-width-bottom-2'] = true;
    classSet['border-set-bottom-' + _theme2] = _theme2 !== false;
    if (!selected) styleSet['borderColor'] = 'transparent';
  } else if (bStyle === 'plain') {
    classSet['border-none-top-'] = true;
    classSet['border-none-bottom-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;
    classSet['bg-none-'] = true;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props));
};

Panel.defaultProps = {};
/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.main
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

Panel.defaultProps.textThemeOnBg = 'white';
/**
 * 设置背景主题，在镂空样式时
 * @type {string}
 */

Panel.defaultProps.bgThemeOnHollow = 'white';
/**
 * 设置文本主题，在有背景和在选择状态下
 * @type {string}
 */

Panel.defaultProps.textThemeOnBgSelected = 'white';
/**
 * 设置文本主题，在有背景和在未选择状态下
 * @type {string}
 */

Panel.defaultProps.textThemeOnBgUnselected = 'disable';
/**
 * 设置文本主题，在无背景和在未选择状态下
 * @type {string}
 */

Panel.defaultProps.textThemeUnselected = 'disable';
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

var _default = Panel; // Container
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
   * 容器内的子组件会被容器进行属性设置，如果希望特殊子组件不接受容器组件设置，子组件需要包含 noItem 属性
   * @component
   * @mount Panel.Container
   * @augments BaseComponent
   * @augments module:Panel.Panel
   */

};

var _Container =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Container, _React$Component);

  function Container() {
    (0, _classCallCheck2.default)(this, Container);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Container).apply(this, arguments));
  }

  (0, _createClass2.default)(Container, [{
    key: "render",
    value: function render() {
      var _classSetFlex;

      var _BaseComponent2 = (0, _BaseComponent6.default)(this.props, _Container),
          type = _BaseComponent2.type,
          containerProps = _BaseComponent2.containerProps,
          inline = _BaseComponent2.inline,
          position = _BaseComponent2.position,
          direction = _BaseComponent2.direction,
          justify = _BaseComponent2.justify,
          align = _BaseComponent2.align,
          wrap = _BaseComponent2.wrap,
          content = _BaseComponent2.content,
          _BaseComponent2$selec = _BaseComponent2.selectedIndex,
          selectedIndex = _BaseComponent2$selec === void 0 ? 0 : _BaseComponent2$selec,
          _BaseComponent2$count = _BaseComponent2.countToShow,
          countToShow = _BaseComponent2$count === void 0 ? 1 : _BaseComponent2$count,
          onSelect = _BaseComponent2.onSelect,
          SeparatorComponent = _BaseComponent2.separator,
          separatorProps = _BaseComponent2.separatorProps,
          itemProps = _BaseComponent2.itemProps,
          _BaseComponent2$itemG = _BaseComponent2.itemGetProps,
          itemGetProps = _BaseComponent2$itemG === void 0 ? _Container.itemGetProps : _BaseComponent2$itemG,
          _BaseComponent2$itemG2 = _BaseComponent2.itemGetClassName,
          itemGetClassName = _BaseComponent2$itemG2 === void 0 ? _Container.itemGetClassName : _BaseComponent2$itemG2,
          _BaseComponent2$itemG3 = _BaseComponent2.itemGetStyle,
          itemGetStyle = _BaseComponent2$itemG3 === void 0 ? _Container.itemGetStyle : _BaseComponent2$itemG3,
          Component = _BaseComponent2.component,
          className = _BaseComponent2.className,
          children = _BaseComponent2.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["type", "containerProps", "inline", "position", "direction", "justify", "align", "wrap", "content", "selectedIndex", "countToShow", "onSelect", "separator", "separatorProps", "itemProps", "itemGetProps", "itemGetClassName", "itemGetStyle", "component", "className", "children"]);

      var classStr = 'position-relative overflow-a-hidden';
      var classSet = {};
      if (SeparatorComponent === true) SeparatorComponent = _Separator;
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
        if ((0, _typeof2.default)(v) !== 'object' || v.props.itemPlain) return v;
        itemIndex++;
        return _react.default.createElement(_Item, (0, _extends2.default)({
          separator: SeparatorComponent
        }, getSubComponentProps(type, selectedIndex, containerProps || {}, itemIndex, itemCount, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps)), v);
      });

      if (type === 'single') {
        children = children.filter(function (v) {
          return v.props.itemSelected;
        });
        props.inline = inline;
      } else if (type === 'justify') {
        var _classSet;

        classSet = (_classSet = {}, (0, _defineProperty2.default)(_classSet, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty2.default)(_classSet, 'flex-justify-around', true), (0, _defineProperty2.default)(_classSet, 'flex-align-stretch', true), _classSet);
      } else if (type === 'primary') {
        var _classSet2;

        classSet = (_classSet2 = {}, (0, _defineProperty2.default)(_classSet2, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty2.default)(_classSet2, 'flex-align-center', true), _classSet2);
      } else if (type === 'flex') {
        classSet = (0, _defineProperty2.default)({}, 'flex-display-' + (inline ? 'inline' : 'block'), true);
      } else if (type === 'scroll') {
        var childrenPlain = children.filter(function (v) {
          return (0, _typeof2.default)(v) === 'object' && v.props.itemPlain;
        });
        var childrenItem = children.filter(function (v) {
          return (0, _typeof2.default)(v) === 'object' && !v.props.itemPlain;
        });
        children = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(InnerScroll, {
          countToShow: countToShow,
          selectedIndex: selectedIndex,
          onSelect: onSelect
        }, childrenItem), childrenPlain);
      }

      if (position) direction = positionToDirection[position];
      var classSetFlex = (_classSetFlex = {}, (0, _defineProperty2.default)(_classSetFlex, 'flex-direction-' + direction, direction), (0, _defineProperty2.default)(_classSetFlex, 'flex-justify-' + justify, justify), (0, _defineProperty2.default)(_classSetFlex, 'flex-align-' + align, align), (0, _defineProperty2.default)(_classSetFlex, 'flex-wrap-' + wrap, wrap), _classSetFlex);
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classes.default)(classStr, classSet, classSetFlex, className)
      }, props), children);
    }
  }]);
  return Container;
}(_react.default.Component);

Object.defineProperty(Panel, "Container", {
  get: function get() {
    return _Container;
  },
  set: function set(val) {
    _Container = val;
  }
});
_Container.defaultProps = {};
/**
 * 设置子组件的排列类型，包括：
 * 
 * - single： 仅 selected 属性为真的子组件显示
 * - justify： 平分组件
 * - primary: 仅 subTypePrimary 属性的子组件扩展，其他组件保持不延展不压缩
 * - flex: 普通 flex 布局
 * 
 * @attribute Panel.module:Container~Container.type
 * @type {string}
 */

/**
 * 设置组件的 flex direction 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.direction
 * @type {string}
 */

/**
 * 设置组件的 flex justify 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.justify
 * @type {string}
 */

/**
 * 设置组件的 flex align 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.align
 * @type {string}
 */

/**
 * 设置组件的 flex wrap 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.wrap
 * @type {string}
 */

/**
 * 统一设置子组件的属性
 * @attribute Panel.module:Container~Container.itemProps
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
 * @attribute Panel.module:Container~Container.itemGetClassName
 * @type {Panel.module:Container~ItemGetClassNameCallback}
 */

/**
 * 设置默认的获取子组件的样式类的回到函数
 * @member Panel.module:Container~Container.itemGetClassName
 * @type {Panel.module:Container~ItemGetClassNameCallback}
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
 * @attribute Panel.module:Container~Container.itemGetStyle
 * @type {Panel.module:Container~ItemGetStyleCallback}
 */

/**
 * 设置默认的子组件的样式对象的回调函数
 * @member Panel.module:Container~Container.itemGetStyle
 * @type {Panel.module:Container~ItemGetStyleCallback}
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
 * @attribute Panel.module:Container~Container.itemGetProps
 * @type {Panel.module:Container~ItemGetPropsCallback}
 */

/**
 * 设置默认的获取子组件的属性的回调函数
 * @member Panel.module:Container~Container.itemGetProps
 * @type {Panel.module:Container~ItemGetPropsCallback}
 * @static
 */

_Container.defaultProps.component = Panel; // Panel Container Item
// ------------------------------

function getSubComponentProps(type, selectedIndex, containerProps, itemIndex, itemCount) {
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
  return (0, _objectSpread2.default)({
    key: key || itemIndex,
    type: type,
    itemIndex: itemIndex,
    itemCount: itemCount,
    itemSelected: selectedIndex === itemIndex,
    style: (0, _objectSpread2.default)({}, itemGetStyle && itemGetStyle(itemIndex, itemCount, containerProps, componentProps, itemProps) || {}, itemStyle, style),
    className: (0, _classes.default)(itemGetClassName && itemGetClassName(itemIndex, itemCount, containerProps, componentProps, itemProps), itemClassName, className)
  }, itemGetProps && itemGetProps(itemIndex, itemCount, containerProps, componentProps, itemProps) || {}, itemProps, componentProps);
}
/**
 * 带容器能力的小面板组件的子组件
 * @component 
 * @mount Panel.Container.Item
 * @augments BaseComponent
 */


var _Item = function Item(aprops) {
  var _BaseComponent3 = (0, _BaseComponent6.default)(aprops, _Item),
      type = _BaseComponent3.type,
      separator = _BaseComponent3.separator,
      itemSelected = _BaseComponent3.itemSelected,
      itemPlain = _BaseComponent3.itemPlain,
      index = _BaseComponent3.index,
      size = _BaseComponent3.size,
      containerProps = _BaseComponent3.containerProps,
      className = _BaseComponent3.className,
      children = _BaseComponent3.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["type", "separator", "itemSelected", "itemPlain", "index", "size", "containerProps", "className", "children"]);

  var classStr = '';
  var classSet = {};

  if (type === 'single') {
    classStr = 'position-relative offset-a-start square-full overflow-a-hidden';
  } else if (type === 'justify') {
    classStr = 'flex-sub-flex-extend';
  } else if (type === 'primary') {
    classStr = itemSelected ? 'flex-sub-flex-extend' : 'flex-sub-flex-none';
  } else if (type === 'scroll') {
    classStr = 'flex-sub-flex-extend height-full';
  }

  classSet = {
    'border-none-right-': index < size - 1,
    'border-none-a-': separator,
    'bg-none-': separator
  };
  return (0, _react.cloneElement)(children, (0, _objectSpread2.default)({
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Object.defineProperty(Panel.Container, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.defaultProps = {};
/**
 * 参见 Container
 * @attribute Panel.module:Container~Item.type
 */

/**
 * 组件在容器中的索引
 * @attribute Panel.module:Container~Item.index
 * @type {number}
 */

/**
 * 容器中子组件的数量
 * @attribute Panel.module:Container~Item.size
 * @type {number}
 */

/**
 * 容器组件的属性
 * @attribute Panel.module:Container~Item.containerProps
 * @type {object}
 */
// Inner Scroll
// ------------------------

/**
 * 淡入淡出动画组件的内容组件，用来包裹具体淡入淡出内容
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Panel.Panel
 * @mount AnimationSlider.InnerScroll
 */

var InnerScroll =
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
          onSelect = _this$props2.onSelect,
          children = _this$props2.children;
      this.setState({
        offset: undefined
      }, function () {
        if (onSelect) {
          var aindex = selectedIndex - Math.round(event.deltaX * children.length / (countToShow * element.clientWidth));
          aindex = Math.min(aindex, children.length - 1);
          aindex = Math.max(aindex, 0);
          if (selectedIndex !== aindex) onSelect(aindex);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent4 = (0, _BaseComponent6.default)(this.props, InnerScroll),
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
      var styleSet = (0, _objectSpread2.default)({
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

InnerScroll.defaultProps = {};
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~InnerScroll.countToShow
 */

/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~InnerScroll.selectedIndex
 */

InnerScroll.defaultProps.component = _Touchable.default; // Button Group Separator
// -------------------------

/**
 * 按钮组的分隔条组件
 * @component
 * @augments BaseComponent
 * @mount Button.Group.Separator
 * @private
 */

var _Separator = function Separator(aprops) {
  var _BaseComponent5 = (0, _BaseComponent6.default)(aprops, _Separator),
      Component = _BaseComponent5.component,
      panelComponent = _BaseComponent5.panelComponent,
      subTypeNotItem = _BaseComponent5.subTypeNotItem,
      className = _BaseComponent5.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent5, ["component", "panelComponent", "subTypeNotItem", "className"]);

  var classStr = 'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: panelComponent,
    inline: true,
    "b-theme": "border",
    "b-size": "lg",
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement("span", null, "|"));
};

Object.defineProperty(Panel.Container, "Separator", {
  get: function get() {
    return _Separator;
  },
  set: function set(val) {
    _Separator = val;
  }
});
_Separator.defaultProps = {};
/**
 * 设置映射组件
 */

_Separator.defaultProps.component = Panel;
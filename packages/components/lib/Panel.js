"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.PanelItem = exports.PanelContainer = exports.default = void 0;

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

require("core-js/modules/es6.array.find-index");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _BaseComponent5 = _interopRequireWildcard(require("./BaseComponent"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 小面板组件，基本的布局单位，其他组件一般使用该组件做基本组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 */
var _Panel = function Panel(aprops) {
  var _classSetPre;

  if (aprops.component && aprops.component.isBnorth) {
    var _Component = aprops.component,
        _props = (0, _objectWithoutProperties2.default)(aprops, ["component"]);

    return _react.default.createElement(_Component, _props);
  }

  var _BaseComponent = (0, _BaseComponent5.default)(aprops, _Panel),
      main = _BaseComponent.main,
      page = _BaseComponent.page,
      full = _BaseComponent.full,
      inline = _BaseComponent.inline,
      panelContainerProps = _BaseComponent.panelContainerProps,
      panelItemIndex = _BaseComponent.panelItemIndex,
      panelItemCount = _BaseComponent.panelItemCount,
      panelItemSelected = _BaseComponent.panelItemSelected,
      panelItemPlain = _BaseComponent.panelItemPlain,
      bTheme = _BaseComponent['b-theme'],
      bStyle = _BaseComponent['b-style'],
      bSize = _BaseComponent['b-size'],
      classNameBase = _BaseComponent.classNameBase,
      styleBase = _BaseComponent.styleBase,
      classNameBaseProps = _BaseComponent.classNameBaseProps,
      styleBaseProps = _BaseComponent.styleBaseProps,
      classNamePre = _BaseComponent.classNamePre,
      stylePre = _BaseComponent.stylePre,
      classNameExt = _BaseComponent.classNameExt,
      styleExt = _BaseComponent.styleExt,
      className = _BaseComponent.className,
      style = _BaseComponent.style,
      _BaseComponent$panelT = _BaseComponent.panelThemeProps,
      sensitiveBg = _BaseComponent$panelT.sensitiveBg,
      sensitiveSelect = _BaseComponent$panelT.sensitiveSelect,
      textOnBg = _BaseComponent$panelT.textOnBg,
      bgOnHollow = _BaseComponent$panelT.bgOnHollow,
      textOnBgSelected = _BaseComponent$panelT.textOnBgSelected,
      textOnBgUnselected = _BaseComponent$panelT.textOnBgUnselected,
      textUnselected = _BaseComponent$panelT.textUnselected,
      _BaseComponent$compon = _BaseComponent.component,
      Component = _BaseComponent$compon === void 0 ? aprops.componentPanel || "div" : _BaseComponent$compon,
      componentPanel = _BaseComponent.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["main", "page", "full", "inline", "panelContainerProps", "panelItemIndex", "panelItemCount", "panelItemSelected", "panelItemPlain", "b-theme", "b-style", "b-size", "classNameBase", "styleBase", "classNameBaseProps", "styleBaseProps", "classNamePre", "stylePre", "classNameExt", "styleExt", "className", "style", "panelThemeProps", "component", "componentPanel"]);

  if (sensitiveBg === undefined) sensitiveBg = bStyle === 'solid' && bTheme;
  if (sensitiveSelect === undefined) sensitiveSelect = bStyle === 'underline';
  if (page) props['data-dock'] = true;
  if (main && !props['data-b-edge-shadow']) props['data-b-edge-shadow'] = 'false';
  var classSetPre = (_classSetPre = {
    'offset-a-start square-full overflow-a-hidden': full
  }, (0, _defineProperty3.default)(_classSetPre, page ? 'flex-display-inline' : 'display-inlineblock', inline), (0, _defineProperty3.default)(_classSetPre, (!inline ? 'flex-display-block' : '') + ' flex-direction-v bg-color-view', page), (0, _defineProperty3.default)(_classSetPre, 'scrollable-a- flex-sub-flex-extend', main), _classSetPre);
  var styleSetPre = {};
  var classSet = {};
  var styleSet = {};
  var textTheme;
  if (sensitiveSelect) textTheme = sensitiveBg ? classNameBase.selected ? textOnBgSelected : textOnBgUnselected : classNameBase.selected ? bTheme || '' : textUnselected;
  if (!sensitiveSelect) textTheme = sensitiveBg ? textOnBg : bTheme;
  textTheme = textTheme ? textTheme === true ? '' : textTheme : false;
  classSetPre['text-color-' + textTheme] = textTheme !== false;
  classSetPre['text-size-' + (bSize === 'true' ? '' : bSize)] = bSize;

  if (bStyle === 'solid') {
    var theme = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : 'component';
    classSetPre['bg-color-' + theme] = theme !== false;
    classSetPre['border-set-a-' + theme] = theme !== false;
  } else if (bStyle === 'hollow') {
    var _theme = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : '';

    classSetPre['border-set-a-' + _theme] = _theme !== false;
    classSetPre[bgOnHollow === false ? 'bg-none-' : 'bg-color-' + (bgOnHollow === true ? '' : bgOnHollow)] = true;
  } else if (bStyle === 'underline') {
    var _theme2 = bTheme ? bTheme === true ? '' : bTheme : bTheme === false ? false : '';

    classSetPre['border-none-top- border-none-left- border-none-right- bg-none-'] = true;
    classSetPre['border-width-bottom-2'] = true;
    classSetPre['border-set-bottom-' + _theme2] = _theme2 !== false;
    if (!classNameBase.selected) styleSetPre['borderColor'] = 'transparent';
  } else if (bStyle === 'white') {
    classSetPre['bg-color-white'] = true;
  } else if (bStyle === 'mask') {
    classSetPre['bg-color-mask'] = true;
  } else if (bStyle === 'plain') {
    classSetPre['border-none-top- border-none-bottom- border-none-left- border-none-right- bg-none-'] = true;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classNameBase, classSetPre, classNamePre, classSet, classNameBaseProps, className, classNameExt),
    style: _objectSpread({}, styleBase, {}, styleSetPre, {}, stylePre, {}, styleSet, {}, styleBaseProps, {}, style, {}, styleExt)
  }, props));
};

_Panel.defaultProps = {};
_Panel.defaultProps.panelThemeProps = {
  sensitiveBg: undefined,
  // 设置为有背景状态
  sensitiveSelect: undefined,
  // 设置为字体主题响应是否选中状态 
  textUnselected: 'disable',
  // 设置文本主题，在无背景和在未选择状态下
  textOnBg: 'white',
  // 设置文本主题，在有背景的面板上时 
  textOnBgSelected: 'white',
  // 设置文本主题，在有背景和在选择状态下 
  textOnBgUnselected: 'disable',
  // 设置文本主题，在有背景和在未选择状态下
  bgOnHollow: 'white' // 设置背景主题，在镂空样式时

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

};
(0, _defineProperty2.default)(_Panel, "Panel", {
  get: function get() {
    return _Panel;
  },
  set: function set(val) {
    _Panel = val;
  }
});
var _default = _Panel;
exports.default = _default;
var positionToDirection = {
  left: 'h',
  right: 'hv',
  top: 'v',
  bottom: 'vv'
  /**
   * 扩展小面板组件，提供了容器的能力，可管理子组件,
   * 
   * 容器内的子组件会被容器进行属性设置，如果希望特殊子组件不接受容器组件设置，子组件需要包含 panelItemPlain 属性
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
      var _objectSpread5;

      var _BaseComponent2 = (0, _BaseComponent5.default)(this.props, _PanelContainer),
          ctype = _BaseComponent2.ctype,
          selectedIndex = _BaseComponent2.selectedIndex,
          countToShow = _BaseComponent2.countToShow,
          onSelectedChange = _BaseComponent2.onSelectedChange,
          panelContainerProps = _BaseComponent2.panelContainerProps,
          inline = _BaseComponent2.inline,
          position = _BaseComponent2.position,
          direction = _BaseComponent2.direction,
          justify = _BaseComponent2.justify,
          align = _BaseComponent2.align,
          wrap = _BaseComponent2.wrap,
          separator = _BaseComponent2.separator,
          separatorProps = _BaseComponent2.separatorProps,
          noOverlap = _BaseComponent2.noOverlap,
          genPanelItemProps = _BaseComponent2.genPanelItemProps,
          panelItemProps = _BaseComponent2.panelItemProps,
          getPanelItemProps = _BaseComponent2.getPanelItemProps,
          getPanelItemClassName = _BaseComponent2.getPanelItemClassName,
          getPanelItemStyle = _BaseComponent2.getPanelItemStyle,
          classNamePre = _BaseComponent2.classNamePre,
          children = _BaseComponent2.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["ctype", "selectedIndex", "countToShow", "onSelectedChange", "panelContainerProps", "inline", "position", "direction", "justify", "align", "wrap", "separator", "separatorProps", "noOverlap", "genPanelItemProps", "panelItemProps", "getPanelItemProps", "getPanelItemClassName", "getPanelItemStyle", "classNamePre", "children"]);

      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      children = !separator ? children : children.reduce(function (v1, v2, i, a) {
        if (i > 0) v1.push(_react.default.createElement(_Panel, (0, _extends2.default)({
          key: 'sep' + i,
          panelItemPlain: true,
          inline: true,
          "b-theme": "border",
          "b-size": "lg",
          classNamePre: 'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center'
        }, separatorProps), _react.default.createElement("span", null, "|")));
        v1.push(v2);
        return v1;
      }, []);
      var aindex = children.findIndex(function (v) {
        return (0, _typeof2.default)(v) === 'object' && v.props.panelItemSelected;
      });
      selectedIndex = aindex >= 0 ? aindex : selectedIndex;
      var panelItemCount = children.filter(function (v) {
        return (0, _typeof2.default)(v) === 'object' && !v.props.panelItemPlain;
      }).length;
      var panelItemIndex = -1;
      children = children.map(function (v) {
        return (0, _typeof2.default)(v) !== 'object' || v.props.panelItemPlain ? v : _react.default.createElement(_PanelItem, genPanelItemProps(ctype, selectedIndex, panelContainerProps, ++panelItemIndex, panelItemCount, v.props, panelItemProps, getPanelItemClassName, getPanelItemStyle, getPanelItemProps), v);
      });
      var classSetPre = {
        'overflow-a-hidden': true
      };

      if (ctype === 'single') {
        children = children.filter(function (v) {
          return v.props.panelItemSelected;
        });
        props.inline = inline;
      } else if (ctype === 'justify') {
        var _objectSpread2;

        classSetPre = _objectSpread({}, classSetPre, (_objectSpread2 = {}, (0, _defineProperty3.default)(_objectSpread2, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty3.default)(_objectSpread2, 'flex-justify-around flex-align-stretch', true), _objectSpread2));
      } else if (ctype === 'primary') {
        var _objectSpread3;

        classSetPre = _objectSpread({}, classSetPre, (_objectSpread3 = {}, (0, _defineProperty3.default)(_objectSpread3, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty3.default)(_objectSpread3, 'flex-align-center', true), _objectSpread3));
      } else if (ctype === 'flex') {
        classSetPre = _objectSpread({}, classSetPre, (0, _defineProperty3.default)({}, 'flex-display-' + (inline ? 'inline' : 'block'), true));
      } else if (ctype === 'scroll') {
        children = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_InnerScroll, {
          countToShow: countToShow,
          selectedIndex: selectedIndex,
          onSelectedChange: onSelectedChange
        }, children.filter(function (v) {
          return (0, _typeof2.default)(v) === 'object' && !v.props.panelItemPlain;
        })), children.filter(function (v) {
          return (0, _typeof2.default)(v) === 'object' && v.props.panelItemPlain;
        }));
      }

      if (position) direction = positionToDirection[position];
      classSetPre = _objectSpread({}, classSetPre, (_objectSpread5 = {}, (0, _defineProperty3.default)(_objectSpread5, 'flex-direction-' + direction, direction), (0, _defineProperty3.default)(_objectSpread5, 'flex-justify-' + justify, justify), (0, _defineProperty3.default)(_objectSpread5, 'flex-align-' + align, align), (0, _defineProperty3.default)(_objectSpread5, 'flex-wrap-' + wrap, wrap), _objectSpread5));
      return _react.default.createElement(_Panel, (0, _extends2.default)({
        classNamePre: (0, _classes.default)(classSetPre, classNamePre)
      }, props), children);
    }
  }]);
  return PanelContainer;
}(_react.default.Component);

exports.PanelContainer = _PanelContainer;
_PanelContainer.isBnorth = true;
_PanelContainer.defaultProps = {};
/**
 * 设置子组件的排列类型，包括：
 * 
 * - single： 仅 selected 属性为真的子组件显示
 * - justify： 平分组件
 * - primary: 仅 subTypePrimary 属性的子组件扩展，其他组件保持不延展不压缩
 * - flex: 普通 flex 布局
 * - scroll: 滑动布局
 * 
 * @attribute module:Panel~PanelContainer.ctype
 * @type {string}
 */

_PanelContainer.defaultProps.selectedIndex = 0;
_PanelContainer.defaultProps.countToShow = 1;
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
 * @attribute module:Panel~PanelContainer.panelItemProps
 * @type {object}
 */

/**
 * 获取子组件样式类的回调函数
 * @callback ItemGetClassNameCallback
 * @param {object} panelItemProps - 子组件属性
 * @param {object} containerProps - 容器组件的属
 * @returns {string|object|array} 样式字符串，样式对象或者样式类数组，具体参见 rich.css classes 函数
 */

/**
 * 设置获取子组件的样式类的回到函数
 * @attribute module:Panel~PanelContainer.getPanelItemClassName
 * @type {module:Panel~ItemGetClassNameCallback}
 */

/**
 * 获取子组件样式对象的回调函数
 * @callback ItemGetStyleCallback
 * @param {object} panelItemProps - 子组件属性
 * @param {object} containerProps - 容器组件的属
 * @returns {object} 样式表对象
 */

/**
 * 设置子组件的样式对象的回调函数
 * @attribute module:Panel~PanelContainer.getPanelItemStyle
 * @type {module:Panel~ItemGetStyleCallback}
 */

/**
 * 获取子组件属性的回调函数
 * @callback ItemGetPropsCallback
 * @param {object} panelItemProps - 子组件属性
 * @param {object} containerProps - 容器组件的属性
 * @returns {object} 属性对象
 */

/**
 * 设置获取子组件的属性的回调函数
 * @attribute module:Panel~PanelContainer.getPanelItemProps
 * @type {module:Panel~ItemGetPropsCallback}
 */

/**
 * 子组件属性计算函数
 * panelItemProps < props < |getPanelItemXXX<panelItemProps<props| < getPanelItemProps
 */

_PanelContainer.defaultProps.genPanelItemProps = function (type, selectedIndex, panelContainerProps, panelItemIndex, panelItemCount) {
  var _ref = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {},
      className = _ref.className,
      style = _ref.style,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "style"]);

  var _ref2 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
      panelItemClassName = _ref2.className,
      panelItemStyle = _ref2.style,
      panelItemProps = (0, _objectWithoutProperties2.default)(_ref2, ["className", "style"]);

  var getPanelItemClassName = arguments.length > 7 ? arguments[7] : undefined;
  var getPanelItemStyle = arguments.length > 8 ? arguments[8] : undefined;
  var getPanelItemProps = arguments.length > 9 ? arguments[9] : undefined;

  var ret = _objectSpread({
    key: panelItemIndex,
    panelContainerType: type,
    panelContainerProps: panelContainerProps,
    panelItemIndex: panelItemIndex,
    panelItemCount: panelItemCount,
    panelItemSelected: selectedIndex === panelItemIndex
  }, panelItemProps, {}, props);

  ret.style = _objectSpread({}, getPanelItemStyle && getPanelItemStyle(ret, panelContainerProps) || {}, {}, panelItemStyle, {}, style);
  ret.className = (0, _classes.default)(getPanelItemClassName && getPanelItemClassName(ret, panelContainerProps), panelItemClassName, className);
  return _objectSpread({}, ret, {}, getPanelItemProps && getPanelItemProps(ret, panelContainerProps) || {});
};

(0, _defineProperty2.default)(_Panel, "Container", {
  get: function get() {
    return _PanelContainer;
  },
  set: function set(val) {
    exports.PanelContainer = _PanelContainer = val;
  }
});
/**
 * 带容器能力的小面板组件的子组件
 * @component 
 */

var _PanelItem = function PanelItem(aprops) {
  var _BaseComponent3 = (0, _BaseComponent5.default)(aprops, _PanelItem),
      panelContainerType = _BaseComponent3.panelContainerType,
      _BaseComponent3$panel = _BaseComponent3.panelContainerProps,
      panelContainerProps = _BaseComponent3$panel === void 0 ? {} : _BaseComponent3$panel,
      panelItemIndex = _BaseComponent3.panelItemIndex,
      panelItemCount = _BaseComponent3.panelItemCount,
      panelItemSelected = _BaseComponent3.panelItemSelected,
      panelItemPlain = _BaseComponent3.panelItemPlain,
      className = _BaseComponent3.className,
      children = _BaseComponent3.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["panelContainerType", "panelContainerProps", "panelItemIndex", "panelItemCount", "panelItemSelected", "panelItemPlain", "className", "children"]);

  if (panelItemPlain) return children;
  var classSet = [];
  if (panelContainerType === 'single') classSet.push('offset-a-start square-full overflow-a-hidden');
  if (panelContainerType === 'justify') classSet.push('flex-sub-flex-extend');
  if (panelContainerType === 'primary') classSet.push(panelItemSelected ? 'flex-sub-flex-extend' : 'flex-sub-flex-none');
  if (panelContainerType === 'scroll') classSet.push('flex-sub-flex-extend height-full');
  if (panelContainerProps.noOverlap && panelItemIndex < panelItemCount - 1) classSet.push('border-none-right-');
  return (0, _react.cloneElement)(children, _objectSpread({
    className: (0, _classes.default)(classSet, className),
    panelContainerProps: panelContainerProps,
    panelItemIndex: panelItemIndex,
    panelItemCount: panelItemCount,
    panelItemSelected: panelItemSelected,
    panelItemPlain: panelItemPlain
  }, props));
};

exports.PanelItem = _PanelItem;
_PanelItem.isBnorth = true;
_PanelItem.defaultProps = {};
/**
 * 容器组件的组织类型
 * @attribute module:Panel~PanelItem.panelContainerType
 */

/**
 * 组件在容器中的索引
 * @attribute module:Panel~PanelItem.panelItemIndex
 * @type {number}
 */

/**
 * 容器中子组件的数量
 * @attribute module:Panel~PanelItem.panelItemCount
 * @type {number}
 */

/**
 * 组件为容器中选中组件
 * @attribute module:Panel~PanelItem.panelItemSelected
 * @type {boolean}
 */

/**
 * 组件不接受容器管理
 * @attribute module:Panel~PanelItem.panelItemPlain
 * @type {boolean}
 */

/**
 * 容器组件的属性
 * @attribute module:Panel~PanelItem.panelContainerProps
 * @type {object}
 */

(0, _defineProperty2.default)(_Panel, "ContainerItem", {
  get: function get() {
    return _PanelItem;
  },
  set: function set(val) {
    exports.PanelItem = _PanelItem = val;
  }
});
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      var _this$props = this.props,
          countToShow = _this$props.countToShow,
          selectedIndex = _this$props.selectedIndex,
          children = _this$props.children;
      var node = (0, _BaseComponent5.domFindNode)(this);
      this.size = node.clientWidth * countToShow / children.length;
      var val = -(this.size / countToShow) * (selectedIndex % children.length);
      node.scrollableLeft = -val;
      node.scrollableWidth = node.clientWidth;

      if (_BaseComponent5.domIsMouse) {
        (0, _BaseComponent5.domFindNode)(this).addEventListener("mousedown", function (event) {
          _this.mark = false;
        }, true);
        (0, _BaseComponent5.domFindNode)(this).addEventListener("click", function (event) {
          if (_this.mark) {
            event.stopPropagation();
            _this.mark = false;
          }
        }, true);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props2 = this.props,
          selectedIndex = _this$props2.selectedIndex,
          countToShow = _this$props2.countToShow,
          children = _this$props2.children;
      var node = (0, _BaseComponent5.domFindNode)(this);
      this.size = node.clientWidth * countToShow / children.length;
      var val = -(this.size / countToShow) * (selectedIndex % children.length);
      node.scrollableLeft = -val;
      node.scrollableWidth = node.clientWidth;
    }
  }, {
    key: "handleStart",
    value: function handleStart(e) {
      var _this2 = this;

      var _this$props3 = this.props,
          selectedIndex = _this$props3.selectedIndex,
          countToShow = _this$props3.countToShow,
          onSelectedChange = _this$props3.onSelectedChange,
          children = _this$props3.children;
      var node = (0, _BaseComponent5.domFindNode)(this);
      var x = _BaseComponent5.domIsMouse ? e.clientX : e.touches[0].clientX;
      var y = _BaseComponent5.domIsMouse ? e.clientY : e.touches[0].clientY;
      var offsetX, offsetY, moved, ignore;

      if (!node.scrollable) {
        node.scrollable = 'x';
        node.scrollableWidth = node.clientWidth * children.length;
        node.scrollableLeft = selectedIndex * node.clientWidth;
      }

      var handleMove = function handleMove(e) {
        offsetX = (_BaseComponent5.domIsMouse ? e.clientX : e.touches[0].clientX) - x;
        offsetY = (_BaseComponent5.domIsMouse ? e.clientY : e.touches[0].clientY) - y;

        if (ignore === undefined) {
          if (Math.abs(offsetY) > Math.abs(offsetX)) {
            handleEnd();
            return;
          }

          ignore = false;
        }

        moved = true;
        var val = -(_this2.size / countToShow) * (selectedIndex % children.length) + (offsetX || 0);
        val = Math.min(0, val);
        val = Math.max(-(children.length - 1) * _this2.size, val);
        var style = (0, _animation.transform)('translate3D', val + 'px', 0, 0);
        (0, _entries.default)(style).forEach(function (_ref3) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
              k = _ref4[0],
              v = _ref4[1];

          return node.style[k] = v;
        });
        node.scrollableLeft = -val;

        if (selectedIndex === 0 && offsetX > 0 || selectedIndex === children.length - 1 && offsetX < 0) {} else {
          e.stopPropagation(); // e.preventDefault();
        }
      };

      var handleEnd = function handleEnd(e) {
        node.removeEventListener(_BaseComponent5.domIsMouse ? 'mousemove' : 'touchmove', handleMove);
        node.removeEventListener(_BaseComponent5.domIsMouse ? 'mouseup' : 'touchend', handleEnd);
        !_BaseComponent5.domIsMouse && node.removeEventListener('touchcancel', handleEnd);
        if (!moved) return;
        var val = -(_this2.size / countToShow) * (selectedIndex % children.length);
        var style = (0, _animation.transform)('translate3D', val + 'px', 0, 0);
        (0, _entries.default)(style).forEach(function (_ref5) {
          var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
              k = _ref6[0],
              v = _ref6[1];

          return node.style[k] = v;
        });
        node.scrollableLeft = -val;

        if (onSelectedChange) {
          var aindex = selectedIndex - Math.round((offsetX || 0) * children.length / (countToShow * node.clientWidth));
          aindex = Math.min(aindex, children.length - 1);
          aindex = Math.max(aindex, 0);
          if (selectedIndex !== aindex) onSelectedChange(aindex, children[aindex].props);
        }

        if (_BaseComponent5.domIsMouse) _this2.mark = true;
      };

      var eventOption = (0, _BaseComponent5.domPassiveSupported)() ? {
        passive: true
      } : false;
      node.addEventListener(_BaseComponent5.domIsMouse ? 'mousemove' : 'touchmove', handleMove, eventOption);
      node.addEventListener(_BaseComponent5.domIsMouse ? 'mouseup' : 'touchend', handleEnd, eventOption);
      !_BaseComponent5.domIsMouse && node.addEventListener('touchcancel', handleEnd, eventOption);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _BaseComponent4 = (0, _BaseComponent5.default)(this.props, _InnerScroll),
          countToShow = _BaseComponent4.countToShow,
          selectedIndex = _BaseComponent4.selectedIndex,
          onSelectedChange = _BaseComponent4.onSelectedChange,
          children = _BaseComponent4.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["countToShow", "selectedIndex", "onSelectedChange", "children"]);

      children = _react.default.Children.toArray(children);
      var classNamePre = 'flex-display-block flex-align-stretch height-full transition-set- overflow-x-hidden';

      var stylePre = _objectSpread({
        width: "".concat(100 / countToShow * children.length, "%")
      }, (0, _animation.transform)('translateX', -(this.size / countToShow) * (selectedIndex % children.length) + 'px'));

      return _react.default.createElement(_Panel, (0, _extends2.default)({}, (0, _defineProperty3.default)({}, _BaseComponent5.domIsMouse ? 'onMouseDown' : 'onTouchStart', function (e) {
        return _this3.handleStart(e);
      }), {
        classNamePre: classNamePre,
        stylePre: stylePre
      }, props), children);
    }
  }]);
  return InnerScroll;
}(_react.default.Component);

_InnerScroll.isBnorth = true;
_InnerScroll.defaultProps = {};
(0, _defineProperty2.default)(_Panel, "InnerScroll", {
  get: function get() {
    return _InnerScroll;
  },
  set: function set(val) {
    _InnerScroll = val;
  }
});
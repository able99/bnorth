"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelItem = exports.PanelContainer = exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.array.find-index");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _BaseComponent5 = _interopRequireWildcard(require("./BaseComponent"));

var _Touchable = _interopRequireDefault(require("./Touchable"));

/**
 * @module
 */

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
      active = _BaseComponent.active,
      selected = _BaseComponent.selected,
      disabled = _BaseComponent.disabled,
      onClick = _BaseComponent.onClick,
      onTouchStart = _BaseComponent.onTouchStart,
      onTouchEnd = _BaseComponent.onTouchEnd,
      onTouchCancel = _BaseComponent.onTouchCancel,
      btn = _BaseComponent.btn,
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
      classNamePre = _BaseComponent.classNamePre,
      classNameExt = _BaseComponent.classNameExt,
      stylePre = _BaseComponent.stylePre,
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
      refWrap = _BaseComponent.refWrap,
      _BaseComponent$compon = _BaseComponent.component,
      Component = _BaseComponent$compon === void 0 ? aprops.componentPanel || "div" : _BaseComponent$compon,
      componentPanel = _BaseComponent.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["active", "selected", "disabled", "onClick", "onTouchStart", "onTouchEnd", "onTouchCancel", "btn", "main", "page", "full", "inline", "panelContainerProps", "panelItemIndex", "panelItemCount", "panelItemSelected", "panelItemPlain", 'b-theme', 'b-style', 'b-size', "classNamePre", "classNameExt", "stylePre", "styleExt", "className", "style", "panelThemeProps", "refWrap", "component", "componentPanel"]);

  if (sensitiveBg === undefined) sensitiveBg = bStyle === 'solid' && bTheme;
  if (sensitiveSelect === undefined) sensitiveSelect = bStyle === 'underline';
  if (page) props['data-dock'] = true;
  var classSetPre = (_classSetPre = {
    // 'position-relative': true,
    'offset-a-start square-full overflow-a-hidden': full
  }, (0, _defineProperty2.default)(_classSetPre, page ? 'flex-display-inline' : 'display-inlineblock', inline), (0, _defineProperty2.default)(_classSetPre, (!inline ? 'flex-display-block' : '') + ' flex-direction-v bg-color-view', page), (0, _defineProperty2.default)(_classSetPre, 'scrollable-a- flex-sub-flex-extend', main), _classSetPre);
  var styleSetPre = {};
  var classSet = {};
  var styleSet = {};
  var textTheme;
  if (sensitiveSelect) textTheme = sensitiveBg ? selected ? textOnBgSelected : textOnBgUnselected : selected ? bTheme || '' : textUnselected;
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
    if (!selected) styleSetPre['borderColor'] = 'transparent';
  } else if (bStyle === 'white') {
    classSetPre['bg-color-white'] = true;
  } else if (bStyle === 'mask') {
    classSetPre['bg-color-mask'] = true;
  } else if (bStyle === 'plain') {
    classSetPre['border-none-top- border-none-bottom- border-none-left- border-none-right- bg-none-'] = true;
  }

  Object.entries(props).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (k.startsWith('bs-')) {
      delete props[k];
      if (v === false || v === undefined || v === null) return;
      var name = k.slice(3);
      styleSet[name] = v;
    } else if (k.startsWith('bc-')) {
      delete props[k];
      if (v === false || v === undefined || v === null) return;

      var _name = k.slice(3);

      classSet[_name + (v === true ? '' : '-' + v)] = true;
    } else if (k.startsWith('bf-')) {
      delete props[k];
      if (!v) return;

      var _name2 = k.slice(3);

      _name2 = _BaseComponent5.default.styleFunctions[_name2];
      if (!_name2) return;
      Object.assign(styleSet, Array.isArray(v) ? _name2.apply(void 0, (0, _toConsumableArray2.default)(v)) : _name2(v));
    }
  });
  if (onClick) props.onClick = onClick;
  if (refWrap) props.ref = refWrap;
  if (active) classSet['active'] = true;
  if (selected) classSet['selected'] = true;
  if (disabled) classSet['disabled'] = true;
  if (onClick && btn !== false) classSet['cursor-pointer'] = true;
  if (onClick && !btn && btn !== false || btn === true) classSet['btn'] = true;

  if (onClick && btn !== false) {
    props['onTouchStart'] = function (e) {
      e.currentTarget.classList.add(!btn || btn === true ? 'active' : btn);
      onTouchStart && onTouchStart(e);
    };

    props['onTouchEnd'] = function (e) {
      e.currentTarget.classList.remove(!btn || btn === true ? 'active' : btn);
      onTouchEnd && onTouchEnd(e);
    };

    props['onTouchCancel'] = function (e) {
      e.currentTarget.classList.remove(!btn || btn === true ? 'active' : btn);
      onTouchCancel && onTouchCancel(e);
    };
  } else {
    if (aprops.hasOwnProperty('onTouchStart')) props.onTouchStart = onTouchStart;
    if (aprops.hasOwnProperty('onTouchEnd')) props.onTouchEnd = onTouchEnd;
    if (aprops.hasOwnProperty('onTouchCancel')) props.onTouchCancel = onTouchCancel;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classSetPre, classNamePre, classSet, className, classNameExt),
    style: (0, _objectSpread6.default)({}, styleSetPre, stylePre, styleSet, style, styleExt)
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
   * 设置为选中状态，
   * @attribute module:Panel.Panel.selected
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

  /**
   * 设置组件的样式对象，将属性名去掉 bs- 前缀，和属性值，追加到组件的样式对象中
   * 
   * @attribute module:Panel.Panel.bs-xxx
   * @type {number|string} 
   * @example
   * ```jsx
   * <Panel bs-width="50%" style={{height: '50%'}} /> // style: { widht: 50%, height: 50% }
   * ```
   */

  /**
   * 设置样式类
   * 
   * - 当属性值为 true 时，将当前属性名，去掉 bc- 前缀，追加到组件的样式类属性中
   * - 当属性值为数字或字符串时，将去掉 bc- 前缀的属性名和属性值用 - 连接后，追加到组件的样式类属性中
   * - 当属性值不为真时，没有任何作用
   * 
   * @attribute module:Panel.Panel.bc-xxx
   * @type {boolean|string|number} 
   * @example
   * ```jsx
   * <Panel bc-text-size="lg" bc-text-weight-={true} className="text-color-primary" /> // className: 'text-color-primary text-size-lg text-weight-'
   * ```
   */

  /**
   * 执行样式函数，并将结果设置到组件的样式对象。将属性名去掉 bs- 前缀作为函数名称，从样式函数集合中获取函数，将属性值(为数组时，作为展开参数)作为参数，执行并将结果追加到组件的样式对象中
   * 
   * @attribute module:Panel.Panel.bf-xxx
   * @type {number|string|array} 
   * @example
   * ```jsx
   * import { backgroundImage } from '@bnorth/rich.css/lib/styles/background';
   * import { addFunctions } from '@bnorth/components/lib/utils/props';
   * addFunctions({ backgroundImage });
   * 
   * export default props=>{
   *   return <Panel bf-background={'bg.jpg'} /> // style: {backgroundImage: url(bg.jpg)}
   * }
   * ```
   */

};
Object.defineProperty(_Panel, "Panel", {
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
        'position-relative overflow-a-hidden': true
      };

      if (ctype === 'single') {
        children = children.filter(function (v) {
          return v.props.panelItemSelected;
        });
        props.inline = inline;
      } else if (ctype === 'justify') {
        var _objectSpread2;

        classSetPre = (0, _objectSpread6.default)({}, classSetPre, (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty2.default)(_objectSpread2, 'flex-justify-around flex-align-stretch', true), _objectSpread2));
      } else if (ctype === 'primary') {
        var _objectSpread3;

        classSetPre = (0, _objectSpread6.default)({}, classSetPre, (_objectSpread3 = {}, (0, _defineProperty2.default)(_objectSpread3, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty2.default)(_objectSpread3, 'flex-align-center', true), _objectSpread3));
      } else if (ctype === 'flex') {
        classSetPre = (0, _objectSpread6.default)({}, classSetPre, (0, _defineProperty2.default)({}, 'flex-display-' + (inline ? 'inline' : 'block'), true));
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
      classSetPre = (0, _objectSpread6.default)({}, classSetPre, (_objectSpread5 = {}, (0, _defineProperty2.default)(_objectSpread5, 'flex-direction-' + direction, direction), (0, _defineProperty2.default)(_objectSpread5, 'flex-justify-' + justify, justify), (0, _defineProperty2.default)(_objectSpread5, 'flex-align-' + align, align), (0, _defineProperty2.default)(_objectSpread5, 'flex-wrap-' + wrap, wrap), _objectSpread5));
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
  var _ref3 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {},
      className = _ref3.className,
      style = _ref3.style,
      props = (0, _objectWithoutProperties2.default)(_ref3, ["className", "style"]);

  var _ref4 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
      panelItemClassName = _ref4.className,
      panelItemStyle = _ref4.style,
      panelItemProps = (0, _objectWithoutProperties2.default)(_ref4, ["className", "style"]);

  var getPanelItemClassName = arguments.length > 7 ? arguments[7] : undefined;
  var getPanelItemStyle = arguments.length > 8 ? arguments[8] : undefined;
  var getPanelItemProps = arguments.length > 9 ? arguments[9] : undefined;
  var ret = (0, _objectSpread6.default)({
    key: panelItemIndex,
    panelContainerType: type,
    panelContainerProps: panelContainerProps,
    panelItemIndex: panelItemIndex,
    panelItemCount: panelItemCount,
    panelItemSelected: selectedIndex === panelItemIndex
  }, panelItemProps, props);
  ret.style = (0, _objectSpread6.default)({}, getPanelItemStyle && getPanelItemStyle(ret, panelContainerProps) || {}, panelItemStyle, style);
  ret.className = (0, _classes.default)(getPanelItemClassName && getPanelItemClassName(ret, panelContainerProps), panelItemClassName, className);
  return (0, _objectSpread6.default)({}, ret, getPanelItemProps && getPanelItemProps(ret, panelContainerProps) || {});
};

Object.defineProperty(_Panel, "Container", {
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
  if (panelContainerType === 'single') classSet.push('position-relative offset-a-start square-full overflow-a-hidden');
  if (panelContainerType === 'justify') classSet.push('flex-sub-flex-extend');
  if (panelContainerType === 'primary') classSet.push(panelItemSelected ? 'flex-sub-flex-extend' : 'flex-sub-flex-none');
  if (panelContainerType === 'scroll') classSet.push('flex-sub-flex-extend height-full');
  if (panelContainerProps.noOverlap && panelItemIndex < panelItemCount - 1) classSet.push('border-none-right-');
  return (0, _react.cloneElement)(children, (0, _objectSpread6.default)({
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

Object.defineProperty(_Panel, "ContainerItem", {
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
          if (selectedIndex !== aindex) onSelectedChange(aindex, children[aindex].props);
        }
      });
      if (_BaseComponent5.domIsMouse) this.mark = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent4 = (0, _BaseComponent5.default)(this.props, _InnerScroll),
          countToShow = _BaseComponent4.countToShow,
          selectedIndex = _BaseComponent4.selectedIndex,
          onSelectedChange = _BaseComponent4.onSelectedChange,
          children = _BaseComponent4.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["countToShow", "selectedIndex", "onSelectedChange", "children"]);

      var _ref5 = this.state || {},
          offset = _ref5.offset;

      children = _react.default.Children.toArray(children);
      var classNamePre = 'flex-display-block flex-align-stretch height-full transition-set-';
      var stylePre = (0, _objectSpread6.default)({
        width: "".concat(100 / countToShow * children.length, "%")
      }, (0, _animation.transform)('translateX', isNaN(offset) ? -100 / children.length * (selectedIndex % children.length) + '%' : -(this.size / countToShow) * (selectedIndex % children.length) + (offset || 0) + 'px'));
      return _react.default.createElement(_Panel, (0, _extends2.default)({
        component: _Touchable.default,
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
        classNamePre: classNamePre,
        stylePre: stylePre
      }, props), children);
    }
  }]);
  return InnerScroll;
}(_react.default.Component);

_InnerScroll.isBnorth = true;
_InnerScroll.defaultProps = {};
Object.defineProperty(_Panel, "InnerScroll", {
  get: function get() {
    return _InnerScroll;
  },
  set: function set(val) {
    _InnerScroll = val;
  }
});
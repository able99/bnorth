"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

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
  var _parseProps = (0, _props.default)(aprops, Panel.props),
      main = _parseProps.main,
      inline = _parseProps.inline,
      selected = _parseProps.selected,
      status = _parseProps.status,
      hasBg = _parseProps.hasBg,
      hasSelection = _parseProps.hasSelection,
      textThemeOnBg = _parseProps.textThemeOnBg,
      bgThemeOnHollow = _parseProps.bgThemeOnHollow,
      textThemeOnBgSelected = _parseProps.textThemeOnBgSelected,
      textThemeOnBgUnselected = _parseProps.textThemeOnBgUnselected,
      textThemeUnselected = _parseProps.textThemeUnselected,
      Component = _parseProps.component,
      className = _parseProps.className,
      style = _parseProps.style,
      bTheme = _parseProps['b-theme'],
      bStyle = _parseProps['b-style'],
      bSize = _parseProps['b-size'],
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["main", "inline", "selected", "status", "hasBg", "hasSelection", "textThemeOnBg", "bgThemeOnHollow", "textThemeOnBgSelected", "textThemeOnBgUnselected", "textThemeUnselected", "component", "className", "style", 'b-theme', 'b-style', 'b-size']);

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

/**
 * 设置映射组件
 */

Panel.defaultProps.component = 'div';
var _default = Panel;
exports.default = _default;
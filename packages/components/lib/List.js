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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent3 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireWildcard(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty3.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 列表组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel~PanelContainer
 */
var List = function List(aprops) {
  var _BaseComponent = (0, _BaseComponent3.default)(aprops),
      separatorInset = _BaseComponent.separatorInset,
      header = _BaseComponent.header,
      footer = _BaseComponent.footer,
      headerProps = _BaseComponent.headerProps,
      footerProps = _BaseComponent.footerProps,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["separatorInset", "header", "footer", "headerProps", "footerProps", "children"]);

  return _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    panelContainerProps: aprops
  }, props), header ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-border-set-bottom-": true,
    "bc-padding-a-": true,
    panelItemPlain: true
  }, headerProps), header) : null, children, footer ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-border-set-top-": true,
    "bc-padding-a-": true,
    panelItemPlain: true
  }, footerProps), footer) : null);
};

List.defaultProps = {};
/**
 * 设置列表条目缩进，取值为 padding 的配置值，true 为使用默认配置值，参见 rich.css spacing
 * @attribute module:List.List.separatorInset
 * @type {boolean|string}
 */

/**
 * 设置列表的表头
 * @attribute module:List.List.header
 * @type {element|component}
 */

/**
 * 设置列表的脚注
 * @attribute module:List.List.footer
 * @type {element|component}
 */

/**
 * 设置列表的表头的属性
 * @attribute module:List.List.headerProps
 * @type {object}
 */

/**
 * 设置列表的脚注的属性
 * @attribute module:List.List.footerProps
 * @type {object}
 */

(0, _defineProperty3.default)(List, "List", {
  get: function get() {
    return List;
  },
  set: function set(val) {
    List = val;
  }
});
List.isBnorth = true;
List.defaultProps['b-precast'] = {};
var _default = List; // List Item
// ----------------

/**
 * 表格组件的条目，表格行组件,条目由多个部分组成
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel~PanelContainerItem
 * @private
 */

exports.default = _default;

var _Item = function Item(aprops) {
  var _objectSpread2;

  var _BaseComponent2 = (0, _BaseComponent3.default)(aprops, _Item),
      panelItemIndex = _BaseComponent2.panelItemIndex,
      panelItemCount = _BaseComponent2.panelItemCount,
      _BaseComponent2$panel = _BaseComponent2.panelContainerProps;

  _BaseComponent2$panel = _BaseComponent2$panel === void 0 ? {} : _BaseComponent2$panel;
  var separatorInset = _BaseComponent2$panel.separatorInset,
      onClick = _BaseComponent2.onClick,
      media = _BaseComponent2.media,
      mediaProps = _BaseComponent2.mediaProps,
      mainProps = _BaseComponent2.mainProps,
      title = _BaseComponent2.title,
      titleProps = _BaseComponent2.titleProps,
      subTitle = _BaseComponent2.subTitle,
      subTitleProps = _BaseComponent2.subTitleProps,
      desc = _BaseComponent2.desc,
      descProps = _BaseComponent2.descProps,
      after = _BaseComponent2.after,
      afterProps = _BaseComponent2.afterProps,
      arrow = _BaseComponent2.arrow,
      arrowProps = _BaseComponent2.arrowProps,
      _BaseComponent2$autoA = _BaseComponent2.autoArrow,
      autoArrow = _BaseComponent2$autoA === void 0 ? true : _BaseComponent2$autoA,
      classNamePre = _BaseComponent2.classNamePre,
      children = _BaseComponent2.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["panelItemIndex", "panelItemCount", "panelContainerProps", "onClick", "media", "mediaProps", "mainProps", "title", "titleProps", "subTitle", "subTitleProps", "desc", "descProps", "after", "afterProps", "arrow", "arrowProps", "autoArrow", "classNamePre", "children"]);
  classNamePre = _objectSpread((_objectSpread2 = {
    'padding-a-': true
  }, (0, _defineProperty2.default)(_objectSpread2, "margin-left-".concat(separatorInset && separatorInset !== true ? '-' + separatorInset : ''), separatorInset), (0, _defineProperty2.default)(_objectSpread2, 'padding-left-0', separatorInset), (0, _defineProperty2.default)(_objectSpread2, 'border-set-bottom-', panelItemIndex < panelItemCount - 1), _objectSpread2), classNamePre);
  return _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    ctype: "primary",
    align: "center",
    "b-style": "white",
    classNamePre: classNamePre,
    onClick: onClick
  }, props), media ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-line-height-0": true,
    "bc-margin-right-": true
  }, mediaProps), media === true ? undefined : media) : null, _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    panelItemSelected: true
  }, mainProps), title ? _react.default.createElement(_Panel.default, titleProps, title === true ? undefined : title) : null, subTitle ? _react.default.createElement(_Panel.default, subTitleProps, subTitle === true ? undefined : subTitle) : null, desc ? _react.default.createElement(_Panel.default, descProps, desc === true ? undefined : desc) : null, children), after ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-line-height-0": true,
    "bc-margin-left-": true
  }, afterProps), after === true ? undefined : after) : null, arrow || autoArrow && onClick ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: _Icon.default,
    name: "right:>"
  }, arrowProps), arrow === true ? undefined : arrow) : null);
};

_Item.defaultProps = {};
/**
 * 参见 List
 * @attribute module:List~Item.separatorInset
 */

/**
 * 设置条目的媒体部分
 * @attribute module:List~Item.media
 * @type {element|cmponent}
 */

/**
 * 设置条目的媒体部分的属性
 * @attribute module:List~Item.mediaProps
 * @type {object}
 */

/**
 * 设置条目的主体部分
 * @attribute module:List~Item.main
 * @type {element|cmponent}
 */

/**
 * 设置条目的主体部分的属性
 * @attribute module:List~Item.mainProps
 * @type {object}
 */

/**
 * 设置条目的标题部分
 * @attribute module:List~Item.title
 * @type {element|cmponent}
 */

/**
 * 设置条目的标题部分的属性
 * @attribute module:List~Item.titleProps
 * @type {object}
 */

/**
 * 设置条目的副标题部分
 * @attribute module:List~Item.subTitle
 * @type {element|cmponent}
 */

/**
 * 设置条目的副标题部分的属性
 * @attribute module:List~Item.subTitleProps
 * @type {object}
 */

/**
 * 设置条目的描述部分
 * @attribute module:List~Item.desc
 * @type {element|cmponent}
 */

/**
 * 设置条目的描述部分的属性
 * @attribute module:List~Item.descProps
 * @type {object}
 */

/**
 * 设置条目的尾部部分
 * @attribute module:List~Item.desc
 * @type {element|cmponent}
 */

/**
 * 设置条目的尾部部分的属性
 * @attribute module:List~Item.descProps
 * @type {object}
 */

/**
 * 设置条目的箭头部分
 * @attribute module:List~Item.arrow
 * @type {element|cmponent}
 */

/**
 * 设置箭头部分是否自动显示，如果设置为真，则在有 onClick 时，自动显示箭头部分
 * @type {boolean}
 */

_Item.defaultProps.autoArrow = true;
(0, _defineProperty3.default)(List, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.isBnorth = true;
_Item.defaultProps['b-precast'] = {
  'bp-subTitle-bc-text-size': 'sm',
  'bp-desc-bc-text-size': 'sm',
  'bp-desc-bc-text-color': 'light',
  'bp-after-bc-text-size': 'sm',
  'bp-after-bc-text-color': 'light',
  'bp-arrow-bc-text-color': 'light'
};
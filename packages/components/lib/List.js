"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _BaseComponent3 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @module
 */

/**
 * 列表组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
var List = function List(aprops) {
  var _BaseComponent = (0, _BaseComponent3.default)(aprops, List, {
    isContainer: true
  }),
      separatorInset = _BaseComponent.separatorInset,
      hasTheme = _BaseComponent.hasTheme,
      header = _BaseComponent.header,
      footer = _BaseComponent.footer,
      headerProps = _BaseComponent.headerProps,
      footerProps = _BaseComponent.footerProps,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["separatorInset", "hasTheme", "header", "footer", "headerProps", "footerProps", "children"]);

  props.itemProps = {
    separatorInset: separatorInset,
    hasTheme: hasTheme
  };
  return _react.default.createElement(_Panel.default.Container, props, header ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-border-set-bottom-": true,
    "bc-padding-a-": true,
    itemPlain: true
  }, headerProps), header) : null, children, footer ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-border-set-top-": true,
    "bc-padding-a-": true,
    itemPlain: true
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

/*
 * 设置是否 List 组件各个部分有主题设置
 * @type {boolean}
 */

List.defaultProps.hasTheme = true;
var _default = List; // List Item
// ----------------

/**
 * 表格组件的条目，表格行组件,条目由多个部分组成
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~Item
 * @mount List.Item 
 * @private
 */

exports.default = _default;

var _Item = function Item(aprops) {
  var _classSet;

  var _BaseComponent2 = (0, _BaseComponent3.default)(aprops, _Item),
      itemIndex = _BaseComponent2.itemIndex,
      itemCount = _BaseComponent2.itemCount,
      separatorInset = _BaseComponent2.separatorInset,
      hasTheme = _BaseComponent2.hasTheme,
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
      _BaseComponent2$compo = _BaseComponent2.component,
      Component = _BaseComponent2$compo === void 0 ? _Panel.default : _BaseComponent2$compo,
      componentPanel = _BaseComponent2.componentPanel,
      className = _BaseComponent2.className,
      children = _BaseComponent2.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["itemIndex", "itemCount", "separatorInset", "hasTheme", "onClick", "media", "mediaProps", "mainProps", "title", "titleProps", "subTitle", "subTitleProps", "desc", "descProps", "after", "afterProps", "arrow", "arrowProps", "autoArrow", "component", "componentPanel", "className", "children"]);

  var classSet = (_classSet = {
    'padding-a-': true,
    'bg-color-white': hasTheme,
    'status-': Boolean(onClick)
  }, (0, _defineProperty2.default)(_classSet, "margin-left-".concat(separatorInset && separatorInset !== true ? '-' + separatorInset : ''), separatorInset), (0, _defineProperty2.default)(_classSet, 'padding-left-0', separatorInset), (0, _defineProperty2.default)(_classSet, 'cursor-pointer', onClick || arrow), (0, _defineProperty2.default)(_classSet, 'border-set-bottom-', itemIndex < itemCount - 1), _classSet);
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    type: "primary",
    align: "center",
    className: (0, _classes.default)(classSet, className),
    onClick: onClick
  }, props), media ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-margin-right-": true
  }, mediaProps), media === true ? undefined : media) : null, _react.default.createElement(_Panel.default.Container, (0, _extends2.default)({
    itemSelected: true
  }, mainProps), title ? _react.default.createElement(_Panel.default, titleProps, title === true ? undefined : title) : null, subTitle ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "b-size": hasTheme && "sm"
  }, subTitleProps), subTitle === true ? undefined : subTitle) : null, desc ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "b-size": hasTheme && "sm",
    "b-theme": hasTheme && "light"
  }, descProps), desc === true ? undefined : desc) : null, children), after ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "b-size": hasTheme && "sm",
    "b-theme": hasTheme && "light"
  }, afterProps), after === true ? undefined : after) : null, arrow || autoArrow && onClick ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: _Icon.default,
    name: "right",
    nameDefault: ">",
    "b-size": hasTheme && "sm",
    "b-theme": hasTheme && "light"
  }, arrowProps), arrow === true ? undefined : arrow) : null);
};

Object.defineProperty(List, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
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
/**
 * 参见 BaseComponent
 */

_Item.defaultProps.component = _Panel.default.Container;
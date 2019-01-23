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

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Container"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @module
 */
// List
// ----------------

/**
 * 列表组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
var List = function List(aprops) {
  var _parseProps = (0, _props.default)(aprops, List.props),
      separatorInset = _parseProps.separatorInset,
      header = _parseProps.header,
      footer = _parseProps.footer,
      innerProps = _parseProps.innerProps,
      headerProps = _parseProps.headerProps,
      footerProps = _parseProps.footerProps,
      itemProps = _parseProps.itemProps,
      Component = _parseProps.component,
      componentPanel = _parseProps.componentPanel,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["separatorInset", "header", "footer", "innerProps", "headerProps", "footerProps", "itemProps", "component", "componentPanel", "children"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props), header ? _react.default.createElement(_Header, headerProps, header) : null, _react.default.createElement(_Inner, (0, _extends2.default)({
    separatorInset: separatorInset,
    itemProps: itemProps
  }, innerProps), children), footer ? _react.default.createElement(_Footer, footerProps, footer) : null);
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
 * 设置列表的条目容器的属性
 * @attribute module:List.List.innerProps
 * @type {object}
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

/**
 * 设置列表的条目的属性
 * @attribute module:List.List.itemProps
 * @type {object}
 */

/**
 * 参见 BaseComponent
 */

List.defaultProps.component = _Panel.default;
var _default = List; // List Header
// ----------------

/**
 * 表格组件的表格头部组件
 * @component
 * @augments BaseComponent
 * @mount List.Header 
 * @private
 */

exports.default = _default;

var _Header = function Header(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Header.props),
      Component = _parseProps2.component,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["component", "componentPanel", "className"]);

  var classStr = 'border-set-bottom- padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(List, "Header", {
  get: function get() {
    return _Header;
  },
  set: function set(val) {
    _Header = val;
  }
});
_Header.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Header.defaultProps.component = _Panel.default; // List Footer
// ----------------

/**
 * 表格组件的表格页脚组件
 * @component
 * @augments BaseComponent
 * @mount List.Footer 
 * @private
 */

var _Footer = function Footer(aprops) {
  var _parseProps3 = (0, _props.default)(aprops, _Footer.props),
      Component = _parseProps3.component,
      componentPanel = _parseProps3.componentPanel,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["component", "componentPanel", "className"]);

  var classStr = 'border-set-top- padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(List, "Footer", {
  get: function get() {
    return _Footer;
  },
  set: function set(val) {
    _Footer = val;
  }
});
_Footer.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Footer.defaultProps.component = _Panel.default; // List Inner
// ----------------

/**
 * 表格组件的表格行容器组件
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~Container
 * @mount List.Inner 
 * @private
 */

var _Inner = function Inner(aprops) {
  var _parseProps4 = (0, _props.default)(aprops, _Inner.props),
      separatorInset = _parseProps4.separatorInset,
      _parseProps4$itemProp = _parseProps4.itemProps,
      itemProps = _parseProps4$itemProp === void 0 ? {} : _parseProps4$itemProp,
      _parseProps4$itemGetC = _parseProps4.itemGetClassName,
      itemGetClassName = _parseProps4$itemGetC === void 0 ? _Inner.itemGetClassName : _parseProps4$itemGetC,
      _parseProps4$itemGetS = _parseProps4.itemGetStyle,
      itemGetStyle = _parseProps4$itemGetS === void 0 ? _Inner.itemGetStyle : _parseProps4$itemGetS,
      _parseProps4$itemGetP = _parseProps4.itemGetProps,
      itemGetProps = _parseProps4$itemGetP === void 0 ? _Inner.itemGetProps : _parseProps4$itemGetP,
      Component = _parseProps4.component,
      componentPanel = _parseProps4.componentPanel,
      className = _parseProps4.className,
      children = _parseProps4.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["separatorInset", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "componentPanel", "className", "children"]);

  var classSet = (0, _defineProperty2.default)({
    'bg-color-white': true
  }, "padding-left-".concat(separatorInset && separatorInset !== true ? '-' + separatorInset : ''), separatorInset);
  return _react.default.createElement(Component, (0, _extends2.default)({
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    component: componentPanel,
    className: (0, _classes.default)(classSet, className)
  }, props), children);
};

Object.defineProperty(List, "Inner", {
  get: function get() {
    return _Inner;
  },
  set: function set(val) {
    _Inner = val;
  }
});
_Inner.defaultProps = {};
/**
 * 参见 List
 * @attribute module:List~Inner.separatorInset
 */

/**
 * 参见 BaseComponent
 */

_Inner.defaultProps.component = _Panel.default.Container;
/**
 * 设置列表条目的属性
 */

_Inner.itemGetProps = function (index, size, containerProps, componentProps, itemProps) {
  return {
    part: 'item',
    first: index === 0,
    last: index === size - 1,
    separatorInset: containerProps.separatorInset
  };
}; // List Item
// ----------------

/**
 * 表格组件的条目，表格行组件,条目由多个部分组成
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~Item
 * @mount List.Item 
 * @private
 */


var _Item = function Item(aprops) {
  var _parseProps5 = (0, _props.default)(aprops, _Item.props),
      first = _parseProps5.first,
      last = _parseProps5.last,
      separatorInset = _parseProps5.separatorInset,
      onClick = _parseProps5.onClick,
      media = _parseProps5.media,
      mediaProps = _parseProps5.mediaProps,
      mainProps = _parseProps5.mainProps,
      title = _parseProps5.title,
      titleProps = _parseProps5.titleProps,
      subTitle = _parseProps5.subTitle,
      subTitleProps = _parseProps5.subTitleProps,
      desc = _parseProps5.desc,
      descProps = _parseProps5.descProps,
      after = _parseProps5.after,
      afterProps = _parseProps5.afterProps,
      arrow = _parseProps5.arrow,
      arrowProps = _parseProps5.arrowProps,
      _parseProps5$autoArro = _parseProps5.autoArrow,
      autoArrow = _parseProps5$autoArro === void 0 ? true : _parseProps5$autoArro,
      _parseProps5$componen = _parseProps5.component,
      Component = _parseProps5$componen === void 0 ? _Panel.default : _parseProps5$componen,
      componentPanel = _parseProps5.componentPanel,
      className = _parseProps5.className,
      children = _parseProps5.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps5, ["first", "last", "separatorInset", "onClick", "media", "mediaProps", "mainProps", "title", "titleProps", "subTitle", "subTitleProps", "desc", "descProps", "after", "afterProps", "arrow", "arrowProps", "autoArrow", "component", "componentPanel", "className", "children"]);

  var classStr = 'flex-display-block flex-align-stretch padding-a-';
  var classSet = {
    'status-': Boolean(onClick),
    'padding-left-0': separatorInset,
    'cursor-pointer': onClick || arrow,
    'border-set-bottom-': !last
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, classSet, className),
    onClick: onClick
  }, props), media ? _react.default.createElement(_Media, mediaProps, media === true ? undefined : media) : null, _react.default.createElement(_Main, mainProps, title ? _react.default.createElement(_Title, titleProps, title === true ? undefined : title) : null, subTitle ? _react.default.createElement(_SubTitle, subTitleProps, subTitle === true ? undefined : subTitle) : null, desc ? _react.default.createElement(_Desc, descProps, desc === true ? undefined : desc) : null, children), after ? _react.default.createElement(_After, afterProps, after === true ? undefined : after) : null, arrow || autoArrow && onClick ? _react.default.createElement(_Arrow, arrowProps, arrow === true ? undefined : arrow) : null);
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
 * 是否是第一个条目
 * @attribute module:List~Item.first
 * @type {boolean}
 */

/**
 * 是否是最后一个条目
 * @attribute module:List~Item.last
 * @type {boolean}
 */

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

_Item.defaultProps.component = _Panel.default; // List Item Media
// ---------------- 

/**
 * 表格组件的媒体部分组件
 * @component
 * @augments BaseComponent
 * @mount List.Item.Media 
 * @private
 */

var _Media = function Media(aprops) {
  var _parseProps6 = (0, _props.default)(aprops, _Media.porps),
      Component = _parseProps6.component,
      componentPanel = _parseProps6.componentPanel,
      className = _parseProps6.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps6, ["component", "componentPanel", "className"]);

  var classStr = 'flex-sub-align-center flex-sub-flex-none margin-right-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(List.Item, "Media", {
  get: function get() {
    return _Media;
  },
  set: function set(val) {
    _Media = val;
  }
});
_Media.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Media.defaultProps.component = _Panel.default; // List Item Main
// ---------------- 

/**
 * 表格组件的主体部分
 * @component
 * @augments BaseComponent
 * @mount List.Item.Main 
 * @private
 */

var _Main = function Main(aprops) {
  var _parseProps7 = (0, _props.default)(aprops, _Main.props),
      Component = _parseProps7.component,
      componentPanel = _parseProps7.componentPanel,
      className = _parseProps7.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps7, ["component", "componentPanel", "className"]);

  var classStr = 'width-full flex-sub-flex-extend flex-sub-align-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(List.Item, "Main", {
  get: function get() {
    return _Main;
  },
  set: function set(val) {
    _Main = val;
  }
});
_Main.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Main.defaultProps.component = _Panel.default; // List Item Title
// ---------------- 

/**
 * 表格组件的标题部分
 * @component
 * @augments BaseComponent
 * @mount List.Item.Title 
 * @private
 */

var _Title = function Title(aprops) {
  var _parseProps8 = (0, _props.default)(aprops, _Title.props),
      Component = _parseProps8.component,
      componentPanel = _parseProps8.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps8, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props));
};

Object.defineProperty(List.Item, "Title", {
  get: function get() {
    return _Title;
  },
  set: function set(val) {
    _Title = val;
  }
});
_Title.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Title.defaultProps.component = _Panel.default; // List Item SubTitle
// ---------------- 

/**
 * 表格组件的副标题部分
 * @component
 * @augments BaseComponent
 * @mount List.Item.SubTitle 
 * @private
 */

var _SubTitle = function SubTitle(aprops) {
  var _parseProps9 = (0, _props.default)(aprops, _SubTitle.props),
      Component = _parseProps9.component,
      componentPanel = _parseProps9.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps9, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props));
};

Object.defineProperty(List.Item, "SubTitle", {
  get: function get() {
    return _SubTitle;
  },
  set: function set(val) {
    _SubTitle = val;
  }
});
_SubTitle.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_SubTitle.defaultProps.component = _Panel.default; // List Item Desc
// ---------------- 

/**
 * 表格组件的描述部分
 * @component
 * @augments BaseComponent
 * @mount Lis.Itemt.Desc 
 * @private
 */

var _Desc = function Desc(aprops) {
  var _parseProps10 = (0, _props.default)(aprops, _Desc.props),
      Component = _parseProps10.component,
      componentPanel = _parseProps10.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps10, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "b-theme": "light"
  }, props));
};

Object.defineProperty(List.Item, "Desc", {
  get: function get() {
    return _Desc;
  },
  set: function set(val) {
    _Desc = val;
  }
});
_Desc.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Desc.defaultProps.component = _Panel.default; // List Item After
// ---------------- 

/**
 * 表格组件的行尾部分
 * @component
 * @augments BaseComponent
 * @mount Lis.Item.After 
 * @private
 */

var _After = function After(aprops) {
  var _parseProps11 = (0, _props.default)(aprops, _After.props),
      Component = _parseProps11.component,
      componentPanel = _parseProps11.componentPanel,
      className = _parseProps11.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps11, ["component", "componentPanel", "className"]);

  var classStr = 'flex-sub-align-center margin-left-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "b-theme": "light",
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(List.Item, "After", {
  get: function get() {
    return _After;
  },
  set: function set(val) {
    _After = val;
  }
});
_After.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_After.defaultProps.component = _Panel.default; // List Item Arrow
// ---------------- 

/**
 * 表格组件的指示箭头部分
 * @component
 * @augments BaseComponent
 * @mount Lis.Itemt.Arrow 
 * @private
 */

var _Arrow = function Arrow(aprops) {
  var _parseProps12 = (0, _props.default)(aprops, _Arrow.props),
      icon = _parseProps12.icon,
      iconDefault = _parseProps12.iconDefault,
      Component = _parseProps12.component,
      _parseProps12$compone = _parseProps12.componentPanel,
      componentPanel = _parseProps12$compone === void 0 ? _Icon.default : _parseProps12$compone,
      className = _parseProps12.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps12, ["icon", "iconDefault", "component", "componentPanel", "className"]);

  var classStr = 'flex-sub-align-center flex-sub-flex-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "b-theme": "light",
    name: icon,
    defaultName: iconDefault,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(List.Item, "Arrow", {
  get: function get() {
    return _Arrow;
  },
  set: function set(val) {
    _Arrow = val;
  }
});
_Arrow.defaultProps = {};
/**
 * 箭头的图标
 * @type {string}
 */

_Arrow.defaultProps.icon = 'right';
/**
 * 箭头的默认图标
 * @type {string}
 */

_Arrow.defaultProps.iconDefault = '>';
/**
 * 参见 BaseComponent
 */

_Arrow.defaultProps.component = _Panel.default;
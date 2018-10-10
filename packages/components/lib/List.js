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

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var List = function List(aprops) {
  var _parseProps = (0, _props.default)(aprops, List.props),
      separatorInset = _parseProps.separatorInset,
      _parseProps$innerProp = _parseProps.innerProps,
      innerProps = _parseProps$innerProp === void 0 ? {} : _parseProps$innerProp,
      headerProps = _parseProps.headerProps,
      footerProps = _parseProps.footerProps,
      itemProps = _parseProps.itemProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["separatorInset", "innerProps", "headerProps", "footerProps", "itemProps", "component", "componentPanel", "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  });
  var headers = children.filter(function (v) {
    return v.props.part === 'header';
  });
  var footers = children.filter(function (v) {
    return v.props.part === 'footer';
  });
  var items = children.filter(function (v) {
    return v.props.part === 'item' || !v.props.part;
  });
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props), headers.map(function (v, i, a) {
    return _react.default.createElement(List.Item, (0, _extends2.default)({
      key: v.key || "header".concat(i)
    }, v.props, {
      first: i === 0,
      last: i === a.length - 1
    }, headerProps));
  }), _react.default.createElement(List._Inner, (0, _extends2.default)({
    separatorInset: separatorInset
  }, innerProps), items.map(function (v, i, a) {
    return _react.default.createElement(List.Item, (0, _extends2.default)({
      key: v.key || i
    }, v.props, {
      part: "item",
      first: i === 0,
      last: i === a.length - 1,
      separatorInset: separatorInset
    }, itemProps));
  })), footers.map(function (v, i, a) {
    return _react.default.createElement(List.Item, (0, _extends2.default)({
      key: v.key || "footer".concat(i)
    }, v.props, {
      first: i === 0,
      last: i === a.length - 1
    }, footerProps));
  }));
};

List._Inner = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, List._Inner.props),
      separatorInset = _parseProps2.separatorInset,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["separatorInset", "component", "componentPanel", "className", "children"]);

  var classSet = (0, _defineProperty2.default)({
    'bg-color-white': true
  }, "padding-left-".concat(separatorInset && separatorInset !== true ? '-' + separatorInset : ''), separatorInset);
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classSet, className)
  }, props), children);
};

List.Item = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops, List.Item.props),
      first = _parseProps3.first,
      last = _parseProps3.last,
      part = _parseProps3.part,
      separatorInset = _parseProps3.separatorInset,
      onClick = _parseProps3.onClick,
      media = _parseProps3.media,
      mediaProps = _parseProps3.mediaProps,
      mainProps = _parseProps3.mainProps,
      title = _parseProps3.title,
      titleProps = _parseProps3.titleProps,
      subTitle = _parseProps3.subTitle,
      subTitleProps = _parseProps3.subTitleProps,
      desc = _parseProps3.desc,
      descProps = _parseProps3.descProps,
      after = _parseProps3.after,
      afterProps = _parseProps3.afterProps,
      arrow = _parseProps3.arrow,
      arrowProps = _parseProps3.arrowProps,
      _parseProps3$autoArro = _parseProps3.autoArrow,
      autoArrow = _parseProps3$autoArro === void 0 ? true : _parseProps3$autoArro,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      componentPanel = _parseProps3.componentPanel,
      className = _parseProps3.className,
      children = _parseProps3.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["first", "last", "part", "separatorInset", "onClick", "media", "mediaProps", "mainProps", "title", "titleProps", "subTitle", "subTitleProps", "desc", "descProps", "after", "afterProps", "arrow", "arrowProps", "autoArrow", "component", "componentPanel", "className", "children"]);

  var classStr = 'flex-display-block flex-align-stretch padding-a-';
  var classSet = {
    'status-': Boolean(onClick),
    'padding-left-0': separatorInset,
    'cursor-pointer': onClick || arrow,
    'border-set-bottom-': part === 'item' && !last || part === 'header' && (last || !first),
    'border-set-top-': part === 'footer' && (first || !last)
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, classSet, className),
    onClick: onClick
  }, props), media ? _react.default.createElement(List.Item._Media, mediaProps, media) : null, _react.default.createElement(List.Item._Main, mainProps, title ? _react.default.createElement(List.Item._Title, titleProps, title) : null, subTitle ? _react.default.createElement(List.Item._SubTitle, subTitleProps, subTitle) : null, desc ? _react.default.createElement(List.Item._Desc, descProps, desc) : null, children), after ? _react.default.createElement(List.Item._After, afterProps, after) : null, arrow || autoArrow && onClick ? _react.default.createElement(List.Item._Arrow, arrowProps, arrow) : null);
};

List.Item._Media = function (aprops) {
  var _parseProps4 = (0, _props.default)(aprops, List.Item._Media.porps),
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? _Panel.default : _parseProps4$componen,
      componentPanel = _parseProps4.componentPanel,
      className = _parseProps4.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["component", "componentPanel", "className"]);

  var classStr = 'flex-sub-align-center flex-sub-flex-none margin-right-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

List.Item._Main = function (aprops) {
  var _parseProps5 = (0, _props.default)(aprops, List.Item._Main.props),
      _parseProps5$componen = _parseProps5.component,
      Component = _parseProps5$componen === void 0 ? _Panel.default : _parseProps5$componen,
      componentPanel = _parseProps5.componentPanel,
      className = _parseProps5.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps5, ["component", "componentPanel", "className"]);

  var classStr = 'width-full flex-sub-flex-extend flex-sub-align-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

List.Item._Title = function (aprops) {
  var _parseProps6 = (0, _props.default)(aprops, List.Item._Title.props),
      _parseProps6$componen = _parseProps6.component,
      Component = _parseProps6$componen === void 0 ? _Panel.default : _parseProps6$componen,
      componentPanel = _parseProps6.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps6, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props));
};

List.Item._SubTitle = function (aprops) {
  var _parseProps7 = (0, _props.default)(aprops, List.Item._SubTitle.props),
      _parseProps7$componen = _parseProps7.component,
      Component = _parseProps7$componen === void 0 ? _Panel.default : _parseProps7$componen,
      componentPanel = _parseProps7.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps7, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props));
};

List.Item._Desc = function (aprops) {
  var _parseProps8 = (0, _props.default)(aprops, List.Item._Desc.props),
      _parseProps8$componen = _parseProps8.component,
      Component = _parseProps8$componen === void 0 ? _Panel.default : _parseProps8$componen,
      componentPanel = _parseProps8.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps8, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "b-theme": "light"
  }, props));
};

List.Item._After = function (aprops) {
  var _parseProps9 = (0, _props.default)(aprops),
      _parseProps9$componen = _parseProps9.component,
      Component = _parseProps9$componen === void 0 ? _Panel.default : _parseProps9$componen,
      componentPanel = _parseProps9.componentPanel,
      className = _parseProps9.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps9, ["component", "componentPanel", "className"]);

  var classStr = 'flex-sub-align-center margin-left-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "b-theme": "light",
    className: (0, _classes.default)(classStr, className)
  }, props));
};

List.Item._Arrow = function (aprops) {
  var _parseProps10 = (0, _props.default)(aprops),
      _parseProps10$compone = _parseProps10.component,
      Component = _parseProps10$compone === void 0 ? _Panel.default : _parseProps10$compone,
      _parseProps10$compone2 = _parseProps10.componentPanel,
      componentPanel = _parseProps10$compone2 === void 0 ? _Icon.default : _parseProps10$compone2,
      className = _parseProps10.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps10, ["component", "componentPanel", "className"]);

  var classStr = 'flex-sub-align-center flex-sub-flex-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "b-theme": "light",
    name: "right",
    defaultName: ">",
    className: (0, _classes.default)(classStr, className)
  }, props));
};

var _default = List;
exports.default = _default;
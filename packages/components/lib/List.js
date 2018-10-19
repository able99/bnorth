"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

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
      header = _parseProps.header,
      footer = _parseProps.footer,
      innerProps = _parseProps.innerProps,
      headerProps = _parseProps.headerProps,
      footerProps = _parseProps.footerProps,
      itemProps = _parseProps.itemProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["separatorInset", "header", "footer", "innerProps", "headerProps", "footerProps", "itemProps", "component", "componentPanel", "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).map(function (v, i, a) {
    return (0, _react.cloneElement)(v, (0, _objectSpread2.default)({
      key: v.key || i
    }, v.props, {
      part: 'item',
      first: i === 0,
      last: i === a.length - 1,
      separatorInset: separatorInset
    }, itemProps));
  });
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props), header ? _react.default.createElement(List._Header, headerProps, header) : null, _react.default.createElement(List._Inner, (0, _extends2.default)({
    separatorInset: separatorInset
  }, innerProps), children), footer ? _react.default.createElement(List._Footer, footerProps, footer) : null);
};

List._Header = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, List._Header.props),
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["component", "componentPanel", "className"]);

  var classStr = 'border-set-bottom- padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

List._Footer = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops, List._Footer.props),
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      componentPanel = _parseProps3.componentPanel,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["component", "componentPanel", "className"]);

  var classStr = 'border-set-top- padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

List._Inner = function (aprops) {
  var _parseProps4 = (0, _props.default)(aprops, List._Inner.props),
      separatorInset = _parseProps4.separatorInset,
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? _Panel.default : _parseProps4$componen,
      componentPanel = _parseProps4.componentPanel,
      className = _parseProps4.className,
      children = _parseProps4.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["separatorInset", "component", "componentPanel", "className", "children"]);

  var classSet = (0, _defineProperty2.default)({
    'bg-color-white': true
  }, "padding-left-".concat(separatorInset && separatorInset !== true ? '-' + separatorInset : ''), separatorInset);
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classSet, className)
  }, props), children);
};

List.Item = function (aprops) {
  var _parseProps5 = (0, _props.default)(aprops, List.Item.props),
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
  }, props), media ? _react.default.createElement(List.Item._Media, mediaProps, media === true ? undefined : media) : null, _react.default.createElement(List.Item._Main, mainProps, title ? _react.default.createElement(List.Item._Title, titleProps, title === true ? undefined : title) : null, subTitle ? _react.default.createElement(List.Item._SubTitle, subTitleProps, subTitle === true ? undefined : subTitle) : null, desc ? _react.default.createElement(List.Item._Desc, descProps, desc === true ? undefined : desc) : null, children), after ? _react.default.createElement(List.Item._After, afterProps, after === true ? undefined : after) : null, arrow || autoArrow && onClick ? _react.default.createElement(List.Item._Arrow, arrowProps, arrow === true ? undefined : arrow) : null);
};

List.Item._Media = function (aprops) {
  var _parseProps6 = (0, _props.default)(aprops, List.Item._Media.porps),
      _parseProps6$componen = _parseProps6.component,
      Component = _parseProps6$componen === void 0 ? _Panel.default : _parseProps6$componen,
      componentPanel = _parseProps6.componentPanel,
      className = _parseProps6.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps6, ["component", "componentPanel", "className"]);

  var classStr = 'flex-sub-align-center flex-sub-flex-none margin-right-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

List.Item._Main = function (aprops) {
  var _parseProps7 = (0, _props.default)(aprops, List.Item._Main.props),
      _parseProps7$componen = _parseProps7.component,
      Component = _parseProps7$componen === void 0 ? _Panel.default : _parseProps7$componen,
      componentPanel = _parseProps7.componentPanel,
      className = _parseProps7.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps7, ["component", "componentPanel", "className"]);

  var classStr = 'width-full flex-sub-flex-extend flex-sub-align-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

List.Item._Title = function (aprops) {
  var _parseProps8 = (0, _props.default)(aprops, List.Item._Title.props),
      _parseProps8$componen = _parseProps8.component,
      Component = _parseProps8$componen === void 0 ? _Panel.default : _parseProps8$componen,
      componentPanel = _parseProps8.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps8, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props));
};

List.Item._SubTitle = function (aprops) {
  var _parseProps9 = (0, _props.default)(aprops, List.Item._SubTitle.props),
      _parseProps9$componen = _parseProps9.component,
      Component = _parseProps9$componen === void 0 ? _Panel.default : _parseProps9$componen,
      componentPanel = _parseProps9.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps9, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel
  }, props));
};

List.Item._Desc = function (aprops) {
  var _parseProps10 = (0, _props.default)(aprops, List.Item._Desc.props),
      _parseProps10$compone = _parseProps10.component,
      Component = _parseProps10$compone === void 0 ? _Panel.default : _parseProps10$compone,
      componentPanel = _parseProps10.componentPanel,
      props = (0, _objectWithoutProperties2.default)(_parseProps10, ["component", "componentPanel"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "b-theme": "light"
  }, props));
};

List.Item._After = function (aprops) {
  var _parseProps11 = (0, _props.default)(aprops, List.Item._After.props),
      _parseProps11$compone = _parseProps11.component,
      Component = _parseProps11$compone === void 0 ? _Panel.default : _parseProps11$compone,
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

List.Item._Arrow = function (aprops) {
  var _parseProps12 = (0, _props.default)(aprops, List.Item._Arrow.props),
      _parseProps12$compone = _parseProps12.component,
      Component = _parseProps12$compone === void 0 ? _Panel.default : _parseProps12$compone,
      _parseProps12$compone2 = _parseProps12.componentPanel,
      componentPanel = _parseProps12$compone2 === void 0 ? _Icon.default : _parseProps12$compone2,
      className = _parseProps12.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps12, ["component", "componentPanel", "className"]);

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
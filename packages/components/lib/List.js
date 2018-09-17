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

var _props = require("./utils/props");

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var List = function List(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      separatorInset = _genCommonProps.separatorInset,
      _genCommonProps$inner = _genCommonProps.innerProps,
      innerProps = _genCommonProps$inner === void 0 ? {} : _genCommonProps$inner,
      _genCommonProps$itemP = _genCommonProps.itemProps,
      itemProps = _genCommonProps$itemP === void 0 ? {} : _genCommonProps$itemP,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'ul' : _genCommonProps$compo,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["separatorInset", "innerProps", "itemProps", "component", 'b-theme', 'b-style', 'b-size', "children"]);

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
  return _react.default.createElement(Component, props, headers.map(function (v, i, a) {
    return _react.default.createElement(List.Item, (0, _extends2.default)({
      key: v.key
    }, v.props, {
      first: i === 0,
      last: i === a.length - 1
    }, itemProps));
  }), _react.default.createElement(List._Inner, (0, _extends2.default)({
    separatorInset: true
  }, innerProps), items.map(function (v, i, a) {
    return _react.default.createElement(List.Item, (0, _extends2.default)({
      key: v.key
    }, v.props, {
      part: "item",
      first: i === 0,
      last: i === a.length - 1,
      separatorInset: true
    }, itemProps));
  })), footers.map(function (v, i, a) {
    return _react.default.createElement(List.Item, (0, _extends2.default)({
      key: v.key
    }, v.props, {
      first: i === 0,
      last: i === a.length - 1
    }, itemProps));
  }));
};

List._Inner = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      separatorInset = _genCommonProps2.separatorInset,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Panel.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["separatorInset", "component", "className", "children"]);

  var classStr = 'bg-color-white';
  var classSet = (0, _defineProperty2.default)({}, "padding-left".concat(separatorInset && separatorInset !== true ? '-' + separatorInset : ''), separatorInset);
  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), children);
};

List.Item = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      first = _genCommonProps3.first,
      last = _genCommonProps3.last,
      part = _genCommonProps3.part,
      separatorInset = _genCommonProps3.separatorInset,
      onClick = _genCommonProps3.onClick,
      _genCommonProps3$colo = _genCommonProps3.colorActiveOnTheme,
      colorActiveOnTheme = _genCommonProps3$colo === void 0 ? 'white' : _genCommonProps3$colo,
      media = _genCommonProps3.media,
      mediaProps = _genCommonProps3.mediaProps,
      mainProps = _genCommonProps3.mainProps,
      title = _genCommonProps3.title,
      titleProps = _genCommonProps3.titleProps,
      subTitle = _genCommonProps3.subTitle,
      subTitleProps = _genCommonProps3.subTitleProps,
      desc = _genCommonProps3.desc,
      descProps = _genCommonProps3.descProps,
      after = _genCommonProps3.after,
      afterProps = _genCommonProps3.afterProps,
      arrow = _genCommonProps3.arrow,
      arrowProps = _genCommonProps3.arrowProps,
      arrowIconProps = _genCommonProps3.arrowIconProps,
      _genCommonProps3$auto = _genCommonProps3.autoArrow,
      autoArrow = _genCommonProps3$auto === void 0 ? true : _genCommonProps3$auto,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? 'li' : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      bTheme = _genCommonProps3['b-theme'],
      bStyle = _genCommonProps3['b-style'],
      bSize = _genCommonProps3['b-size'],
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["first", "last", "part", "separatorInset", "onClick", "colorActiveOnTheme", "media", "mediaProps", "mainProps", "title", "titleProps", "subTitle", "subTitleProps", "desc", "descProps", "after", "afterProps", "arrow", "arrowProps", "arrowIconProps", "autoArrow", "component", "className", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'flex-display-block flex-align-stretch padding-a-';
  var classSet = {
    'status-': Boolean(onClick),
    'padding-left-0': separatorInset,
    'cursor-pointer': aprops.onClick || arrow,
    'border-set-bottom-': part === 'item' && !last || part === 'header' && (last || !first),
    'border-set-top-': part === 'footer' && (first || !last)
  };
  if (bSize) classSet['text-size-' + (bSize === true ? '' : bSize)] = true;

  if (bStyle === 'solid' && bTheme) {
    classSet['bg-color-' + (bTheme === true ? '' : bTheme)] = true;
    classSet['text-color-' + colorActiveOnTheme] = true;
  } else if (bStyle === 'solid' && !bTheme) {
    classSet['bg-color-component'] = true;
  } else {
    if (bTheme) classSet['text-color-' + (bTheme === true ? '' : bTheme)] = true;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className),
    onClick: onClick
  }, props), media ? _react.default.createElement(List.Item._Media, mediaProps, media) : null, _react.default.createElement(List.Item._Main, mainProps, title ? _react.default.createElement(List.Item._Title, titleProps, title) : null, subTitle ? _react.default.createElement(List.Item._SubTitle, subTitleProps, subTitle) : null, desc ? _react.default.createElement(List.Item._Desc, descProps, desc) : null, children), after ? _react.default.createElement(List.Item._After, afterProps, after) : null, arrow || autoArrow && aprops.onClick ? _react.default.createElement(List.Item._Arrow, (0, _extends2.default)({
    arrowIconProps: arrowIconProps
  }, afterProps), arrow) : null);
};

List.Item._Media = function (aprops) {
  var _genCommonProps4 = (0, _props.genCommonProps)(aprops),
      _genCommonProps4$comp = _genCommonProps4.component,
      Component = _genCommonProps4$comp === void 0 ? _Panel.default : _genCommonProps4$comp,
      className = _genCommonProps4.className,
      children = _genCommonProps4.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["component", "className", "children"]);

  var classStr = 'flex-sub-align-center flex-sub-flex-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

List.Item._Main = function (aprops) {
  var _genCommonProps5 = (0, _props.genCommonProps)(aprops),
      _genCommonProps5$comp = _genCommonProps5.component,
      Component = _genCommonProps5$comp === void 0 ? _Panel.default : _genCommonProps5$comp,
      className = _genCommonProps5.className,
      children = _genCommonProps5.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps5, ["component", "className", "children"]);

  var classStr = 'width-full flex-sub-flex-extend flex-sub-align-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

List.Item._Title = function (aprops) {
  var _genCommonProps6 = (0, _props.genCommonProps)(aprops),
      _genCommonProps6$comp = _genCommonProps6.component,
      Component = _genCommonProps6$comp === void 0 ? _Panel.default : _genCommonProps6$comp,
      children = _genCommonProps6.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps6, ["component", "children"]);

  return _react.default.createElement(Component, props, children);
};

List.Item._SubTitle = function (aprops) {
  var _genCommonProps7 = (0, _props.genCommonProps)(aprops),
      _genCommonProps7$comp = _genCommonProps7.component,
      Component = _genCommonProps7$comp === void 0 ? _Panel.default : _genCommonProps7$comp,
      children = _genCommonProps7.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps7, ["component", "children"]);

  return _react.default.createElement(Component, props, children);
};

List.Item._Desc = function (aprops) {
  var _genCommonProps8 = (0, _props.genCommonProps)(aprops),
      _genCommonProps8$comp = _genCommonProps8.component,
      Component = _genCommonProps8$comp === void 0 ? _Panel.default : _genCommonProps8$comp,
      children = _genCommonProps8.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps8, ["component", "children"]);

  return _react.default.createElement(Component, props, children);
};

List.Item._After = function (aprops) {
  var _genCommonProps9 = (0, _props.genCommonProps)(aprops),
      _genCommonProps9$comp = _genCommonProps9.component,
      Component = _genCommonProps9$comp === void 0 ? _Panel.default : _genCommonProps9$comp,
      className = _genCommonProps9.className,
      _genCommonProps9$bTh = _genCommonProps9['b-theme'],
      bTheme = _genCommonProps9$bTh === void 0 ? 'light' : _genCommonProps9$bTh,
      children = _genCommonProps9.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps9, ["component", "className", 'b-theme', "children"]);

  var classStr = 'flex-sub-align-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-theme": bTheme,
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

List.Item._Arrow = function (aprops) {
  var _genCommonProps10 = (0, _props.genCommonProps)(aprops),
      arrowIconProps = _genCommonProps10.arrowIconProps,
      _genCommonProps10$com = _genCommonProps10.component,
      Component = _genCommonProps10$com === void 0 ? _Panel.default : _genCommonProps10$com,
      className = _genCommonProps10.className,
      children = _genCommonProps10.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps10, ["arrowIconProps", "component", "className", "children"]);

  var classStr = 'flex-sub-align-center flex-sub-flex-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), !children || children === true ? _react.default.createElement(_Icon.default, (0, _extends2.default)({
    name: "right",
    nameDefault: ">"
  }, arrowIconProps)) : children);
};

var _default = List;
exports.default = _default;
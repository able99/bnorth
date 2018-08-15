"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _props = require("./utils/props");

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var List = function List(aprops) {
  var _classSetInner;

  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      separatorInset = _genCommonProps.separatorInset,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'ul' : _genCommonProps$compo,
      className = _genCommonProps.className,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["separatorInset", "component", "className", "containerClassName", "containerStyle", "cTheme", "cStyle", "cSize", "children"]);

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
  var classSet = {};
  var classSetInner = (_classSetInner = {}, (0, _defineProperty2.default)(_classSetInner, "padding-left".concat(separatorInset && separatorInset !== true ? '-' + separatorInset : ''), separatorInset), (0, _defineProperty2.default)(_classSetInner, 'bg-color-white', !(0, _props.hascx)(className, 'bg-color')), (0, _defineProperty2.default)(_classSetInner, 'border-set-v', items.length && !(0, _props.hascx)(className, 'border')), _classSetInner);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), headers.map(function (v, i, arr) {
    return (0, _react.cloneElement)(v, (0, _objectSpread2.default)({}, v.props, {
      first: i === 0,
      last: i === arr.length - 1
    }));
  }), _react.default.createElement("div", {
    className: (0, _props.cx)(classSetInner)
  }, items.map(function (v, i, arr) {
    return (0, _react.cloneElement)(v, (0, _objectSpread2.default)({}, v.props, {
      first: !headers.length && i === 0,
      last: !footers.length && i === arr.length - 1,
      separatorInset: separatorInset
    }));
  })), footers.map(function (v, i, arr) {
    return (0, _react.cloneElement)(v, (0, _objectSpread2.default)({}, v.props, {
      first: i === 0,
      last: i === arr.length - 1
    }));
  }));
};

var ListItem = function ListItem(aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      first = _genCommonProps2.first,
      last = _genCommonProps2.last,
      part = _genCommonProps2.part,
      separatorInset = _genCommonProps2.separatorInset,
      media = _genCommonProps2.media,
      title = _genCommonProps2.title,
      subTitle = _genCommonProps2.subTitle,
      desc = _genCommonProps2.desc,
      after = _genCommonProps2.after,
      arrow = _genCommonProps2.arrow,
      _genCommonProps2$auto = _genCommonProps2.autoArrow,
      autoArrow = _genCommonProps2$auto === void 0 ? true : _genCommonProps2$auto,
      mediaStyle = _genCommonProps2.mediaStyle,
      afterStyle = _genCommonProps2.afterStyle,
      mainStyle = _genCommonProps2.mainStyle,
      subTitleStyle = _genCommonProps2.subTitleStyle,
      descStyle = _genCommonProps2.descStyle,
      titleStyle = _genCommonProps2.titleStyle,
      arrayStyle = _genCommonProps2.arrayStyle,
      _genCommonProps2$medi = _genCommonProps2.mediaClassName,
      mediaClassName = _genCommonProps2$medi === void 0 ? '' : _genCommonProps2$medi,
      _genCommonProps2$afte = _genCommonProps2.afterClassName,
      afterClassName = _genCommonProps2$afte === void 0 ? '' : _genCommonProps2$afte,
      _genCommonProps2$main = _genCommonProps2.mainClassName,
      mainClassName = _genCommonProps2$main === void 0 ? '' : _genCommonProps2$main,
      _genCommonProps2$subT = _genCommonProps2.subTitleClassName,
      subTitleClassName = _genCommonProps2$subT === void 0 ? '' : _genCommonProps2$subT,
      _genCommonProps2$desc = _genCommonProps2.descClassName,
      descClassName = _genCommonProps2$desc === void 0 ? '' : _genCommonProps2$desc,
      _genCommonProps2$titl = _genCommonProps2.titleClassName,
      titleClassName = _genCommonProps2$titl === void 0 ? '' : _genCommonProps2$titl,
      _genCommonProps2$arra = _genCommonProps2.arrayClassName,
      arrayClassName = _genCommonProps2$arra === void 0 ? '' : _genCommonProps2$arra,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'li' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      containerClassName = _genCommonProps2.containerClassName,
      containerStyle = _genCommonProps2.containerStyle,
      cTheme = _genCommonProps2.cTheme,
      cStyle = _genCommonProps2.cStyle,
      cSize = _genCommonProps2.cSize,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["first", "last", "part", "separatorInset", "media", "title", "subTitle", "desc", "after", "arrow", "autoArrow", "mediaStyle", "afterStyle", "mainStyle", "subTitleStyle", "descStyle", "titleStyle", "arrayStyle", "mediaClassName", "afterClassName", "mainClassName", "subTitleClassName", "descClassName", "titleClassName", "arrayClassName", "component", "className", "containerClassName", "containerStyle", "cTheme", "cStyle", "cSize", "children"]);

  var classSetMeida = {
    'flex-sub-align-center': !mediaClassName.startsWith('flex-sub-align'),
    'margin-right': !mediaClassName.startsWith('margin')
  };
  var classSetMain = {
    'width-full': true,
    'flex-sub-flex-extend': true,
    'flex-sub-align-center': !mainClassName.startsWith('flex-sub-align')
  };
  var classSetAfter = {
    'flex-sub-align-center': !afterClassName.startsWith('flex-sub-align'),
    'margin-left': !afterClassName.startsWith('margin'),
    'text-color-light': !afterClassName.startsWith('text-color')
  };
  var classSetArray = {
    'flex-sub-align-center': !arrayClassName.startsWith('flex-sub-align')
  };
  var classSetTitle = {
    'flex-sub-flex-extend': true,
    'width-full': true
  };
  var classSetSubTitle = {};
  var classSetDesc = {};
  var classSet = {
    'flex-display-flex': true,
    'flex-align-stretch': true,
    'padding': !(0, _props.hascx)(className, 'padding'),
    'padding-left-0': separatorInset,
    'cursor-pointer': aprops.onClick || arrow,
    'border-set-bottom-border': part !== 'header' && part !== 'footer' && !last
  };

  if (cStyle === 'solid') {
    if (cTheme) {
      classSet['bg-color-' + cTheme] = true;
      classSet['text-color-white'] = true;
    }
  } else {
    if (cTheme) classSet['text-color-' + cTheme] = true;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), media ? _react.default.createElement("div", {
    style: mediaStyle,
    className: (0, _props.cx)(classSetMeida, mediaClassName)
  }, media) : null, _react.default.createElement("div", {
    style: mainStyle,
    className: (0, _props.cx)(classSetMain, mainClassName)
  }, title ? _react.default.createElement("div", {
    style: titleStyle,
    className: (0, _props.cx)(classSetTitle, titleClassName)
  }, title) : null, subTitle ? _react.default.createElement("div", {
    style: subTitleStyle,
    className: (0, _props.cx)(classSetSubTitle, subTitleClassName)
  }, subTitle) : null, desc ? _react.default.createElement("div", {
    style: descStyle,
    className: (0, _props.cx)(classSetDesc, descClassName)
  }, desc) : null, children), after ? _react.default.createElement("div", {
    style: afterStyle,
    className: (0, _props.cx)(classSetAfter, afterClassName)
  }, after) : null, arrow || autoArrow && aprops.onClick ? _react.default.createElement("div", {
    style: arrayStyle,
    className: (0, _props.cx)(classSetArray, arrayClassName)
  }, arrow && arrow !== true ? arrow : _react.default.createElement(_Icon.default, {
    cTheme: "light",
    name: _Icon.default.getName('right', '>')
  })) : null);
};

List.Item = ListItem;
var _default = List;
exports.default = _default;
module.exports = exports["default"];
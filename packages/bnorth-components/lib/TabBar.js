"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

var _Icon = _interopRequireDefault(require("./Icon"));

var _Badge = _interopRequireDefault(require("./Badge"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var TabBar = function TabBar(aprops) {
  var _classSet;

  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      onAction = _genCommonProps.onAction,
      onClick = _genCommonProps.onClick,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'nav' : _genCommonProps$compo,
      className = _genCommonProps.className,
      containerClassName = _genCommonProps.containerClassName,
      containerStyle = _genCommonProps.containerStyle,
      cTheme = _genCommonProps.cTheme,
      cStyle = _genCommonProps.cStyle,
      cSize = _genCommonProps.cSize,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["onAction", "onClick", "component", "className", "containerClassName", "containerStyle", "cTheme", "cStyle", "cSize", "children"]);

  var classSet = (_classSet = {
    'flex-display-flex': true,
    'flex-justify-around': true,
    'flex-align-stretch': true,
    'width-full': true,
    'padding-v-sm': !(0, _props.hascx)(className, 'padding'),
    'border-set-top-border': !(0, _props.hascx)(className, 'border')
  }, (0, _defineProperty2.default)(_classSet, "bg-color-".concat(cTheme || 'component'), cStyle === 'solid'), (0, _defineProperty2.default)(_classSet, 'bg-color-component', cStyle !== 'solid'), _classSet);

  var propsSetItem = function propsSetItem(i, aprops) {
    var eventKey = aprops.eventKey,
        onClick = aprops.onClick,
        props = (0, _objectWithoutProperties2.default)(aprops, ["eventKey", "onClick"]);
    var key = eventKey || i;
    var clickHandler = onClick || onAction;
    eventKey = eventKey || key;
    return (0, _objectSpread2.default)({
      key: key,
      eventKey: eventKey,
      cTheme: cTheme,
      cStyle: cStyle,
      cSize: cSize,
      onClick: clickHandler && clickHandler.bind(null, eventKey)
    }, props);
  };

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).map(function (v, i) {
    return _react.default.createElement(TabBar.Item, propsSetItem(i, v && v.props));
  }));
};

var TabBarItem = function TabBarItem(aprops) {
  var _classSet2;

  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      title = _genCommonProps2.title,
      badge = _genCommonProps2.badge,
      icon = _genCommonProps2.icon,
      iconSelected = _genCommonProps2.iconSelected,
      src = _genCommonProps2.src,
      srcSelected = _genCommonProps2.srcSelected,
      selected = _genCommonProps2.selected,
      eventKey = _genCommonProps2.eventKey,
      _genCommonProps2$icon = _genCommonProps2.iconProps,
      iconProps = _genCommonProps2$icon === void 0 ? {} : _genCommonProps2$icon,
      _genCommonProps2$titl = _genCommonProps2.titleProps,
      titleProps = _genCommonProps2$titl === void 0 ? {} : _genCommonProps2$titl,
      _genCommonProps2$bada = _genCommonProps2.badageProps,
      badageProps = _genCommonProps2$bada === void 0 ? {} : _genCommonProps2$bada,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'span' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      containerClassName = _genCommonProps2.containerClassName,
      containerStyle = _genCommonProps2.containerStyle,
      cTheme = _genCommonProps2.cTheme,
      _genCommonProps2$disa = _genCommonProps2.disableWithoutTheme,
      disableWithoutTheme = _genCommonProps2$disa === void 0 ? 'disable' : _genCommonProps2$disa,
      _genCommonProps2$disa2 = _genCommonProps2.disableWithTheme,
      disableWithTheme = _genCommonProps2$disa2 === void 0 ? 'normal' : _genCommonProps2$disa2,
      cStyle = _genCommonProps2.cStyle,
      cSize = _genCommonProps2.cSize,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["title", "badge", "icon", "iconSelected", "src", "srcSelected", "selected", "eventKey", "iconProps", "titleProps", "badageProps", "component", "className", "containerClassName", "containerStyle", "cTheme", "disableWithoutTheme", "disableWithTheme", "cStyle", "cSize", "children"]);

  var classSetBadge = {
    'position-absolute': true,
    'offset-start-top': true,
    'offset-start-right': true
  };
  var classSetTitle = {
    'text-truncate': true,
    'position-relative': true,
    'display-block': true
  };
  iconProps.cTheme = iconProps.cTheme;
  iconProps.cSize = cSize || 'xl';
  var classSet = (_classSet2 = {
    'position-relative': true,
    'cursor-pointer': true,
    'text-align-center': !(0, _props.hascx)(className, 'text-align'),
    'flex-display-flex': !(0, _props.hascx)(className, 'flex-display'),
    'flex-direction-v': !(0, _props.hascx)(className, 'flex-direction'),
    'flex-justify-around': !(0, _props.hascx)(className, 'flex-justify'),
    'flex-align-center': !(0, _props.hascx)(className, 'flex-align'),
    'flex-sub-flex-extend': true
  }, (0, _defineProperty2.default)(_classSet2, 'text-size-' + cSize, cSize), (0, _defineProperty2.default)(_classSet2, 'status', true), _classSet2);

  if (cStyle === 'solid') {
    if (cTheme) {
      classSet['text-color-' + (selected ? 'white' : disableWithoutTheme)] = true;
    } else {
      classSet['text-color-' + (selected ? 'normal' : disableWithoutTheme)] = true;
    }
  } else {
    if (cTheme) {
      classSet['text-color-' + (selected ? cTheme : disableWithTheme)] = true;
    } else {
      classSet['text-color-' + (selected ? 'normal' : disableWithoutTheme)] = true;
    }
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), icon || src ? _react.default.createElement(_Icon.default, (0, _extends2.default)({}, iconProps, {
    name: selected && iconSelected ? iconSelected : icon,
    src: selected && srcSelected ? srcSelected : src
  })) : null, title ? _react.default.createElement("span", (0, _extends2.default)({}, titleProps, {
    className: (0, _props.cx)(classSetTitle, titleProps.className)
  }), title) : null, badge ? _react.default.createElement(_Badge.default, (0, _extends2.default)({
    rounded: true
  }, badageProps, {
    className: (0, _props.cx)(classSetBadge, badageProps.className)
  }), badge) : null, children);
};

TabBar.Item = TabBarItem;
var _default = TabBar;
exports.default = _default;
module.exports = exports["default"];
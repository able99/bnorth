"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Icon = function Icon(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      name = _genCommonProps.name,
      src = _genCommonProps.src,
      imageProps = _genCommonProps.imageProps,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? 'span' : _genCommonProps$compo,
      className = _genCommonProps.className,
      bTheme = _genCommonProps['b-theme'],
      bStyle = _genCommonProps['b-style'],
      bSize = _genCommonProps['b-size'],
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["name", "src", "imageProps", "component", "className", 'b-theme', 'b-style', 'b-size', "children"]);

  var classStr = 'icon- font-smoothing-antialiased- text-decoration-none line-height-1 display-inline-block overflow-hidden';
  var classSet = [];
  if (bSize) classSet.push('text-size-' + (bSize === true ? '' : bSize)); // if(cStyle==='hollow'){
  //   classSet['padding-xxs'] = !hascx(className, 'padding');
  //   classSet['bg-color-white'] = true;
  //   if(cTheme){
  //     classSet['border-set-'+cTheme] = true;
  //     classSet['text-color-'+cTheme] = true;
  //   }else{
  //     classSet['border-set-border'] = true;
  //   }
  // }else if(cStyle==='solid'){
  //   classSet['padding-xxs'] = !hascx(className, 'padding');
  //   if(cTheme){
  //     classSet['bg-color-'+cTheme] = true;
  //     classSet['border-set-'+cTheme] = true;
  //     classSet['text-color-white'] = !hascx(className, 'text-color');
  //   }else{
  //     classSet['bg-color-component'] = true;
  //     classSet['border-set-component'] = true;
  //   }
  // }else{
  //   classSet['text-color-'+cTheme] = cTheme;
  // }

  if (name) props['data-icon-name'] = Icon.getCode(name);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), src ? _react.default.createElement(Icon._Image, (0, _extends2.default)({
    src: src
  }, imageProps)) : null, children);
};

Icon._Image = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      src = _genCommonProps2.src,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'img' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["src", "component", "className"]);

  var classStr = 'width-auto height-em min-height-em display-block';
  return _react.default.createElement(Component, (0, _extends2.default)({
    alt: "",
    src: src,
    className: cx(classStr, className)
  }, props));
};

Icon.names = {};
Icon.codes = {};

Icon.getName = function (name, defval) {
  return Icon.names[name] || defval;
};

Icon.getCode = function (name) {
  return Icon.codes[name] || name;
};

var _default = Icon;
exports.default = _default;
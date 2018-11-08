"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.array.from");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Icon = function Icon(aprops) {
  var _parseProps = (0, _props.default)(aprops, Icon.props),
      name = _parseProps.name,
      defaultName = _parseProps.defaultName,
      src = _parseProps.src,
      char = _parseProps.char,
      shape = _parseProps.shape,
      rotate = _parseProps.rotate,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      style = _parseProps.style,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["name", "defaultName", "src", "char", "shape", "rotate", "component", "componentPanel", "className", "style", "children"]);

  var classStr = 'display-inline';
  var classSet = ['width-1em', 'height-1em'];
  var styleSet = rotate ? (0, _animation.transform)('rotate', String(rotate) + 'deg') : {};
  if (shape) shape = Icon._shapes[shape];
  if (name) name = Icon._maps[name] || name;

  if (name && !Icon._names.includes(name)) {
    char = defaultName || name;
    name = undefined;
  }

  if (name) {
    if (!componentPanel) componentPanel = 'svg';
    styleSet.strokeWidth = 0;
    styleSet.stroke = 'currentColor';
    styleSet.fill = 'currentColor';
    props.dangerouslySetInnerHTML = {
      __html: "<use xlink:href=\"#".concat(name, "\"></use>")
    };
  } else if (src) {
    if (!componentPanel) componentPanel = 'img';
    props.src = src;
    props.alt = '';
  } else if (shape) {
    if (!componentPanel) componentPanel = 'svg';
    styleSet.strokeWidth = 0;
    styleSet.stroke = 'currentColor';
    styleSet.fill = 'currentColor';
    props.preserveAspectRatio = "none";
    props.viewBox = "0 0 100 100";
    props.children = typeof shape === 'function' ? shape() : _react.default.createElement("path", {
      d: shape
    });
  } else if (char) {
    if (!componentPanel) componentPanel = 'span';
    classSet.push('display-inlineblock text-align-center line-height-1em');
    props.children = char[0];
  } else {
    classSet = [];
    props.children = children;
  }

  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    style: (0, _objectSpread2.default)({}, styleSet, style),
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Icon._names = [];
Icon._maps = {};

Icon.appendSvgIcons = function (svgStr) {
  var x = document.createElement('x');
  x.innerHTML = svgStr;
  var svg = x.querySelector('svg');
  if (!svg) return;
  Icon._names = (0, _toConsumableArray2.default)(Icon._names).concat((0, _toConsumableArray2.default)(Array.from(svg.querySelectorAll('defs symbol')).map(function (v) {
    return v.id;
  })));
  return document.body.appendChild(svg);
};

Icon.appendMap = function (val, name) {
  if (!val) return;

  if ((0, _typeof2.default)(val) === 'object') {
    Icon._maps = (0, _objectSpread2.default)({}, Icon._maps, val);
  } else {
    Icon._maps[name] = val;
  }
};

Icon._shapes = {
  triangle: 'M50 10 L90 90 L10 90 Z'
};
var _default = Icon;
exports.default = _default;
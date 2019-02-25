"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelIcon = exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.array.from");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.split");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.function.name");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _BaseComponent3 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */

/**
 * 图标组件
 * 
 * 支持多种模式的图标和样式，包括 svg 字体库图标，图片图标，字符图标和形状图标，样式固定在字体大小的宽度和高度
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
var Icon = function Icon(aprops) {
  var _BaseComponent = (0, _BaseComponent3.default)(aprops, Icon),
      name = _BaseComponent.name,
      src = _BaseComponent.src,
      char = _BaseComponent.char,
      shape = _BaseComponent.shape,
      rotate = _BaseComponent.rotate,
      component = _BaseComponent.component,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["name", "src", "char", "shape", "rotate", "component"]);

  var classNamePre = ['display-inline', 'width-1em', 'height-1em'];
  var stylePre = rotate ? (0, _animation.transform)('rotate', String(rotate) + 'deg') : {};

  if (name) {
    var _name$split = name.split(':'),
        _name$split2 = (0, _slicedToArray2.default)(_name$split, 2),
        nameSvg = _name$split2[0],
        defaultNameSvg = _name$split2[1];

    nameSvg = Icon._maps[nameSvg] || nameSvg;

    if (!Icon._names.includes(nameSvg)) {
      char = defaultNameSvg || nameSvg;
      nameSvg = undefined;
    }

    name = nameSvg;
  }

  if (shape) {
    shape = Icon._shapes[shape] || shape;
  }

  if (name) {
    if (!component) component = 'svg';
    stylePre.strokeWidth = 0;
    stylePre.stroke = 'currentColor';
    stylePre.fill = 'currentColor';
    props.dangerouslySetInnerHTML = {
      __html: "<use xlink:href=\"#".concat(name, "\"></use>")
    };
  } else if (src) {
    if (!component) component = 'img';
    props.src = src;
    props.alt = '';
  } else if (shape) {
    if (!component) component = 'svg';
    stylePre.strokeWidth = 0;
    stylePre.stroke = 'currentColor';
    stylePre.fill = 'currentColor';
    props.preserveAspectRatio = "none";
    props.viewBox = "0 0 100 100";
    props.children = typeof shape === 'function' ? shape() : _react.default.createElement("path", {
      d: shape
    });
  } else if (char) {
    if (!component) component = 'span';
    classNamePre.push('display-inlineblock text-align-center line-height-1em');
    props.children = char[0];
  } else {
    classNamePre = [];
  }

  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: component,
    classNamePre: classNamePre,
    stylePre: stylePre
  }, props));
};

Icon.defaultProps = {};
/**
 * 设置 svg 字体库图标的图标映射名称，如果设置没有 svg 图标时的默认字符，使用 : 分隔符，比如 name="star:^"
 * @attribute module:Icon.Icon.name
 * @type {string}
 */

/**
 * 设置图片图片的图片路径
 * @attribute module:Icon.Icon.src
 * @type {string}
 */

/**
 * 设置字符图标的字符，需要是单字符
 * @attribute module:Icon.Icon.char
 * @type {string}
 */

/**
 * 设置图形图标的图形函数名称或者图形的 svg path 路径
 * @attribute module:Icon.Icon.shape
 * @type {string}
 */

/**
 * 设置浮动的容器。
 * @attribute module:Icon.Icon.rotate
 * @type {string}
 */

/**
 * svg 图标名字数组
 */

Icon._names = [];
/**
 * svg 图标的名称映射
 */

Icon._maps = {};
/**
 * 图形图标的图形函数与图形路径映射
 */

Icon._shapes = {
  triangle: 'M50 10 L90 90 L10 90 Z'
};
/**
 * 将 svg 字体库文件内容生成字体库元素和字体库名称数组
 * @param {string} - svg 字体库文件内容
 */

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
/**
 * 设置字体库名称映射
 * @param {string|object} - 字体库映射对象或者单个映射的值
 * @param {string} - 单个映射的名称，val 为 object 时，该参数无意义
 */


Icon.appendMap = function (val, name) {
  if (!val) return;

  if ((0, _typeof2.default)(val) === 'object') {
    Icon._maps = (0, _objectSpread2.default)({}, Icon._maps, val);
  } else {
    Icon._maps[name] = val;
  }
};

var _default = Icon;
/**
 * 图标小面板组件，扩展小面板组件，提供图标组件与面板内容混排的能力
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Container~Container
 */

exports.default = _default;

var PanelIcon = function PanelIcon(aprops) {
  var _BaseComponent2 = (0, _BaseComponent3.default)(aprops, PanelIcon, {
    isContainer: true
  }),
      selected = _BaseComponent2.selected,
      name = _BaseComponent2.name,
      src = _BaseComponent2.src,
      char = _BaseComponent2.char,
      shape = _BaseComponent2.shape,
      iconSelected = _BaseComponent2.iconSelected,
      rotate = _BaseComponent2.rotate,
      iconProps = _BaseComponent2.iconProps,
      title = _BaseComponent2.title,
      titleProps = _BaseComponent2.titleProps,
      children = _BaseComponent2.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["selected", "name", "src", "char", "shape", "iconSelected", "rotate", "iconProps", "title", "titleProps", "children"]);

  return _react.default.createElement(_Panel.default.Container, (0, _extends2.default)({
    type: "flex",
    position: "left",
    justify: "center",
    align: "center",
    selected: selected
  }, props), _react.default.createElement(Icon, (0, _extends2.default)({
    name: name && (selected && iconSelected ? iconSelected : name),
    src: src && (selected && iconSelected ? iconSelected : src),
    char: char && (selected && iconSelected ? iconSelected : char),
    shape: shape && (selected && iconSelected ? iconSelected : shape),
    rotate: rotate
  }, iconProps)), title || children ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-text-truncate-1-": true
  }, titleProps), title, children) : null);
};

exports.PanelIcon = PanelIcon;
PanelIcon.defaultProps = {};
/**
 * Icon 的属性，参见 Icon
 * @attribute module:Icon~PanelIcon.icon*
 * @type {string}
 */

/**
 * 设置 icon，src，char 或 shape 在选中时的对应属性，不设置则选中不选中没有区别
 * @attribute module:Icon~PanelIcon.iconSelected
 * @type {string}
 */

/**
 * 设置图标子组件的属性
 * @attribute module:Icon~PanelIcon.iconProps
 * @type {object}
 */

/**
 * 设置标题内容，也可以使用 children
 * @attribute module:Icon~PanelIcon.title
 * @type {string}
 */

/**
 * 设置标题内容子组件的属性
 * @attribute module:Icon~PanelIcon.titleProps
 * @type {object}
 */
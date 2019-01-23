"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Container"));

var _Loader = _interopRequireDefault(require("./Loader"));

/**
 * @module
 */
var _default = _Panel.default;
exports.default = _default;
var positionToDirection = {
  left: 'h',
  right: 'hv',
  top: 'v',
  bottom: 'vv' // Panel Loader
  // ---------------------

  /**
   * 加载动画小面板组件，扩展小面板组件，提供加载动画组件与面板内容混排的能力
   * @component
   * @mount Panel.Loader
   * @augments BaseComponent
   * @augments Panel.module:Container~Container
   */

};

var Loader = function Loader(aprops) {
  var _parseProps = (0, _props.default)(aprops, _Panel.default.Loader.props),
      position = _parseProps.position,
      isProgress = _parseProps.isProgress,
      progress = _parseProps.progress,
      loaderProps = _parseProps.loaderProps,
      contentProps = _parseProps.contentProps,
      Component = _parseProps.component,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["position", "isProgress", "progress", "loaderProps", "contentProps", "component", "children"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    type: "flex",
    direction: positionToDirection[position],
    justify: "center",
    align: "center"
  }, props), position ? _react.default.createElement(_Panel.default.Loader.Loader, (0, _extends2.default)({
    isProgress: isProgress,
    progress: progress
  }, loaderProps)) : null, children ? _react.default.createElement(_Panel.default.Loader.Content, (0, _extends2.default)({
    position: position
  }, contentProps), children) : null);
};

Object.defineProperty(_Panel.default, "Loader", {
  get: function get() {
    return Loader;
  },
  set: function set(val) {
    Loader = val;
  }
});
Loader.defaultProps = {};
/**
 * 设置加载动画相对于内容的位置，包括 left，right，top，bottom 4 个位置
 * @type {string}
 */

Loader.defaultProps.position = 'left';
/**
 * 参见 Loader 组件的 isProgress 属性
 * @attribute Panel.module:Loader~Loader.isProgress
 */

/**
 * 参见 Loader 组件的 progress 属性
 * @attribute Panel.module:Loader~Loader.progress
 */

/**
 * 设置加载动画子组件的属性
 * @attribute Panel.module:Loader~Loader.loaderProps
 * @type {object}
 */

/**
 * 设置内容子组件的属性
 * @attribute Panel.module:Loader~Loader.contentProps
 * @type {object}
 */

/**
 * 参见 BaseComponent
 */

Loader.defaultProps.component = _Panel.default.Container; // Panel Loader Loader
// ------------------

/**
 * 加载动画小面板组件的内部加载动画组件
 * @component
 * @name Panel.module:Loader~Icon
 * @mount Panel.Loader.Loader
 * @private 
 * @augments BaseComponent
 * @see module:Loader.Loader
 */

Object.defineProperty(_Panel.default.Loader, "Loader", {
  get: function get() {
    return _Loader.default;
  },
  set: function set(val) {
    _Loader.default = (val, function () {
      throw new Error('"' + "CLoader" + '" is read-only.');
    }());
  }
}); // Panel Loader Content
// ------------------

/**
 * 加载动画小面板组件的内部内容组件
 * @component
 * @mount Panel.Loader.Content
 * @private 
 * @augments BaseComponent
 */

var _Content = function Content(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Content.porps),
      position = _parseProps2.position,
      Component = _parseProps2.component,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["position", "component", "className"]);

  var classStr = 'text-truncate-1- position-relative';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(_Panel.default.Loader, "Content", {
  get: function get() {
    return _Content;
  },
  set: function set(val) {
    _Content = val;
  }
});
_Content.defaultProps = {};
/**
 * 参见 Panel.Loader
 * @attribute Panel.module:Loader~Content.position
 */

/**
 * 参见 BaseComponent
 */

_Content.defaultProps.component = _Panel.default;
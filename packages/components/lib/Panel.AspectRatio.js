"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */
var _default = _Panel.default; // Panel Container
// -----------------------

/**
 * 扩展小面板组件，提供了可以设置纵横比的能力
 * @component
 * @mount Panel.AspectRatio
 * @augments BaseComponent
 */

exports.default = _default;

var _AspectRatio = function AspectRatio(aprops) {
  var _parseProps = (0, _props.default)(aprops, _AspectRatio.props),
      ratio = _parseProps.ratio,
      innerProps = _parseProps.innerProps,
      Component = _parseProps.component,
      style = _parseProps.style,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["ratio", "innerProps", "component", "style", "children"]);

  var styleSet = ratio ? {
    paddingBottom: "".concat(ratio * 100, "%")
  } : {};
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props), _react.default.createElement(_Inner, (0, _extends2.default)({
    ratio: ratio
  }, innerProps), children));
};

Object.defineProperty(_Panel.default, "AspectRatio", {
  get: function get() {
    return _AspectRatio;
  },
  set: function set(val) {
    _AspectRatio = val;
  }
});
_AspectRatio.defaultProps = {};
/**
 * 设置纵横比
 * @attribute Panel.module:AspectRatio~AspectRatio.ratio
 * @type {number|string}
 */

/**
 * 设置组件实际显示内容的内部组件的属性
 * @attribute Panel.module:AspectRatio~AspectRatio.innerProps
 * @type {object}
 */

/**
 * 参见 BaseComponent
 */

_AspectRatio.defaultProps.component = _Panel.default; // Panel Container
// -----------------------

/**
 * 纵横比组件的内部内容组件，是实际显示内容的组件
 * @component
 * @mount Panel.AspectRatio.Inner
 * @private 
 * @augments BaseComponent
 */

var _Inner = function Inner(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Inner.props),
      Component = _parseProps2.component,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["component", "className"]);

  var classStr = 'position-absolute offset-a-start square-full overflow-a-hidden';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(_Panel.default.AspectRatio, "Inner", {
  get: function get() {
    return _Inner;
  },
  set: function set(val) {
    _Inner = val;
  }
});
_Inner.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Inner.defaultProps.component = _Panel.default;
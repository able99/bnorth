"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.array.fill");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */

/**
 * 留白组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
var _Space = function Space(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Space),
      count = _BaseComponent.count,
      stacked = _BaseComponent.stacked,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["count", "stacked", "children"]);

  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    inline: true
  }, props), _react.default.createElement("pre", {
    className: "margin-a-0 padding-a-0"
  }, Array(Number(count)).fill(stacked ? '\n' : ' ')), children);
};

_Space.defaultProps = {};
/**
 * 留白的数量，横向时为字符的数量，纵向时为行的数量
 * @type {number}
 */

_Space.defaultProps.count = 1;
/**
 * 设置为堆叠模式，即纵向留白
 * @attribute module:Space.Space.stacked
 * @type {boolean}
 */

Object.defineProperty(_Space, "Space", {
  get: function get() {
    return _Space;
  },
  set: function set(val) {
    _Space = val;
  }
});
_Space.isBnorth = true;
_Space.defaultProps['b-precast'] = {};
var _default = _Space;
exports.default = _default;
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

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */

/**
 * 设置纵横比，内容显示在 inner 中
 * @component
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
var _AspectRatio = function AspectRatio(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _AspectRatio),
      ratio = _BaseComponent.ratio,
      innerProps = _BaseComponent.innerProps,
      classNamePre = _BaseComponent.classNamePre,
      stylePre = _BaseComponent.stylePre,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["ratio", "innerProps", "classNamePre", "stylePre", "children"]);

  stylePre = ratio ? (0, _objectSpread2.default)({
    paddingBottom: String(ratio * 100) + '%'
  }, stylePre) : stylePre;
  classNamePre = (0, _objectSpread2.default)({
    'position-relative': true
  }, classNamePre);
  var innerClassNamePre = {
    'position-absolute offset-a-start square-full overflow-a-hidden': true
  };
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    classNamePre: classNamePre,
    stylePre: stylePre
  }, props), _react.default.createElement(_Panel.default, (0, _extends2.default)({
    classNamePre: innerClassNamePre
  }, innerProps), children));
};

_AspectRatio.defaultProps = {};
/**
 * 设置纵横比
 * @attribute module:AspectRatio.AspectRatio.ratio
 * @type {number|string}
 */

/**
 * 设置组件实际显示内容的内部组件的属性
 * @attribute module:AspectRatio.AspectRatio.innerProps
 * @type {object}
 */

Object.defineProperty(_AspectRatio, "AspectRatio", {
  get: function get() {
    return _AspectRatio;
  },
  set: function set(val) {
    _AspectRatio = val;
  }
});
_AspectRatio.isBnorth = true;
_AspectRatio.defaultProps['b-precast'] = {};
var _default = _AspectRatio;
exports.default = _default;
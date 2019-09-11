"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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

  stylePre = ratio ? _objectSpread({
    paddingBottom: String(ratio * 100) + '%'
  }, stylePre) : stylePre;
  classNamePre = _objectSpread({
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

(0, _defineProperty2.default)(_AspectRatio, "AspectRatio", {
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
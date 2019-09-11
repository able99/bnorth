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

var _BaseComponent4 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = require("./Icon");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 标题栏组件
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
var _NavBar = function NavBar(aprops) {
  var _BaseComponent = (0, _BaseComponent4.default)(aprops, _NavBar),
      overlay = _BaseComponent.overlay,
      hidden = _BaseComponent.hidden,
      classNamePre = _BaseComponent.classNamePre,
      _BaseComponent$styleP = _BaseComponent.stylePre,
      stylePre = _BaseComponent$styleP === void 0 ? {} : _BaseComponent$styleP,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["overlay", "hidden", "classNamePre", "stylePre"]);

  if (hidden) return null;
  classNamePre = _objectSpread({
    'flex-display-block flex-justify-around flex-align-center width-full padding-v-sm': true
  }, classNamePre);
  if (overlay) stylePre.paddingTop = overlay === true ? 20 : overlay;
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: "nav",
    classNamePre: classNamePre,
    stylePre: stylePre
  }, props));
};

_NavBar.defaultProps = {};
/**
 * 设置标题栏顶部覆盖状态栏的高度，当值为 true 时，取 20 作为默认值
 * @attribute module:NavBar.NavBar.overlay
 * @type {boolean|number}
 */

/**
 * 设置隐藏组件
 * @attribute module:NavBar.NavBar.hidden
 * @type {boolean}
 */

(0, _defineProperty2.default)(_NavBar, "NavBar", {
  get: function get() {
    return _NavBar;
  },
  set: function set(val) {
    _NavBar = val;
  }
});
_NavBar.isBnorth = true;
_NavBar.defaultProps['b-precast'] = {};
var _default = _NavBar;
/**
 * 标题栏组件的标题子组件
 * @component
 * @augments BaseComponent
 * @mount NavBar.Title
 */

exports.default = _default;

var _Title = function Title(aprops) {
  var _BaseComponent2 = (0, _BaseComponent4.default)(aprops, _Title),
      isFullOrCenter = _BaseComponent2.isFullOrCenter,
      classNamePre = _BaseComponent2.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["isFullOrCenter", "classNamePre"]);

  classNamePre = _objectSpread({
    'text-align-center flex-sub-flex-extend': true
  }, classNamePre);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Panel.default, (0, _extends2.default)({
    inline: true,
    classNamePre: classNamePre,
    "bc-position-absolute": Boolean(!isFullOrCenter)
  }, props)), !isFullOrCenter ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    inline: true,
    classNamePre: classNamePre,
    "bc-visibility-hide": true
  }, props), "0") : null);
};

_Title.defaultProps = {};
/**
 * 设置标题组件铺满小组件之外空间，或者按需设置宽度并居中
 * @attribute module:NavBar~Title.isFullOrCenter
 * @type {boolean}
 */

(0, _defineProperty2.default)(_NavBar, "Title", {
  get: function get() {
    return _Title;
  },
  set: function set(val) {
    _Title = val;
  }
});
_Title.isBnorth = true;
_Title.defaultProps['b-precast'] = {
  'bc-text-weight': 'bold',
  'bc-text-size': 'xl'
};
/**
 * 标题栏组件的上的小组件
 * @component
 * @augments BaseComponent
 * @mount NavBar.Item
 */

var _Item = function Item(aprops) {
  var _BaseComponent3 = (0, _BaseComponent4.default)(aprops, _Item),
      classNamePre = _BaseComponent3.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["classNamePre"]);

  classNamePre = _objectSpread({
    'padding-h-sm flex-sub-flex-none': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: _Icon.PanelIcon,
    classNamePre: classNamePre
  }, props));
};

_Item.defaultProps = {};
(0, _defineProperty2.default)(_NavBar, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.isBnorth = true;
_Item.defaultProps['b-precast'] = {};
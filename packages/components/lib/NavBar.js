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

var _BaseComponent4 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = require("./Icon");

/**
 * 标题栏组件
 * @module 
 */

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
  classNamePre = (0, _objectSpread2.default)({
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

Object.defineProperty(_NavBar, "NavBar", {
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

  classNamePre = (0, _objectSpread2.default)({
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

Object.defineProperty(_NavBar, "Title", {
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

  classNamePre = (0, _objectSpread2.default)({
    'padding-h-sm flex-sub-flex-none': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: _Icon.PanelIcon,
    classNamePre: classNamePre
  }, props));
};

_Item.defaultProps = {};
Object.defineProperty(_NavBar, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.isBnorth = true;
_Item.defaultProps['b-precast'] = {};
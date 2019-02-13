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

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */
// View
// ------------------------------

/**
 * 页面根组件，非强制使用作为根组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
var View = function View(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, View),
      landscape = _BaseComponent.landscape,
      container = _BaseComponent.container,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["landscape", "container"]);

  var classNamePre = 'position-relative offset-a-start square-full overflow-a-hidden flex-display-block flex-direction-v bg-color-view';
  var stylePre = landscape && container.clientHeight > container.clientWidth ? (0, _objectSpread2.default)({
    width: container.clientHeight,
    height: container.clientWidth,
    top: (container.clientHeight - container.clientWidth) / 2,
    left: (container.clientWidth - container.clientHeight) / 2
  }, (0, _animation.transform)('rotate', '90deg')) : {};
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "data-container": true,
    stylePre: stylePre,
    classNamePre: classNamePre
  }, props));
};

View.defaultProps = {};
/**
 * 设置为横屏模式
 * @attribute module:View.View.landscape
 * @type {boolean}
 */

/**
 * 设置页面的容器，横屏时以容器为参照横屏旋转
 * @type {element}
 */

View.defaultProps.container = document.body;
var _default = View;
exports.default = _default;
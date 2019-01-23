"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * 滑动动画
 * @module
 */
// Animation Slider
// --------------------------

/**
 * 滑动动画组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
var AnimationSlider = function AnimationSlider(aprops) {
  var _parseProps = (0, _props.default)(aprops, AnimationSlider.props),
      countToShow = _parseProps.countToShow,
      index = _parseProps.index,
      timeout = _parseProps.timeout,
      innerProps = _parseProps.innerProps,
      itemProps = _parseProps.itemProps,
      content = _parseProps.content,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["countToShow", "index", "timeout", "innerProps", "itemProps", "content", "component", "componentPanel", "className", "children"]);

  children = _react.default.Children.toArray(children).filter(function (v) {
    return v;
  }).map(function (v, i) {
    return (0, _react.cloneElement)(v, (0, _objectSpread2.default)({
      countToShow: countToShow,
      index: index,
      timeout: timeout,
      i: i
    }, itemProps, v.props));
  });
  var classStr = 'overflow-a-hidden position-relative';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(_Inner, (0, _extends2.default)({
    countToShow: countToShow,
    index: index,
    timeout: timeout
  }, innerProps), children), content);
};

AnimationSlider.defaultProps = {};
/**
 * 设置一组显示的条目的数量
 * @type {number}
 */

AnimationSlider.defaultProps.countToShow = 1;
/**
 * 设置当前显示的组索引
 * @attribute module:AnimationSlider.AnimationSlider.index
 * @type {number}
 */

/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */

AnimationSlider.defaultProps.timeout = 350;
/**
 * 设置内置容器的属性
 * @attribute module:AnimationSlider.AnimationSlider.innerProps
 * @type {object}
 */

/**
 * 统一设置各个条目的属性
 * @attribute module:AnimationSlider.AnimationSlider.itemProps
 * @type {object}
 */

/**
 * 设置除各个动画条目之外的内容
 * @attribute module:AnimationSlider.AnimationSlider.content
 * @type {component|element}
 */

/**
 * 参见 BaseComponent
 */

AnimationSlider.defaultProps.component = 'div';
var _default = AnimationSlider; // Animation Slider inner
// --------------------------

/**
 * 淡入淡出动画组件的内容组件，用来包裹具体淡入淡出内容
 * @component 
 * @private
 * @augments BaseComponent
 * @mount AnimationSlider.Inner
 */

exports.default = _default;

var _Inner = function Inner(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Inner.props),
      countToShow = _parseProps2.countToShow,
      index = _parseProps2.index,
      timeout = _parseProps2.timeout,
      Component = _parseProps2.component,
      className = _parseProps2.className,
      style = _parseProps2.style,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["countToShow", "index", "timeout", "component", "className", "style", "children"]);

  children = _react.default.Children.toArray(children);
  var classStr = 'flex-display-block flex-align-stretch';
  var styleSet = (0, _objectSpread2.default)({
    width: "".concat(100 / countToShow * children.length, "%")
  }, (0, _animation.transiton)(timeout), (0, _animation.transform)('translateX', "".concat(-100 / children.length * (index % children.length), "%")), style);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className),
    style: styleSet
  }, props), children);
};

_Inner.defaultProps = {};
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Inner.countToShow
 */

/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Inner.index
 */

/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Inner.timeout
 */

/**
 * 参见 BaseComponent
 */

_Inner.defaultProps.component = _Panel.default;
Object.defineProperty(AnimationSlider, "Inner", {
  get: function get() {
    return _Inner;
  },
  set: function set(val) {
    _Inner = val;
  }
}); // Animation Slider item
// --------------------------

/**
 * 淡入淡出动画组件的内容组件，用来包裹具体淡入淡出内容
 * @component 
 * @augments BaseComponent
 * @mount AnimationSlider.Item
 */

var _Item = function Item(aprops) {
  var _parseProps3 = (0, _props.default)(aprops, _Item.props),
      i = _parseProps3.i,
      timeout = _parseProps3.timeout,
      countToShow = _parseProps3.countToShow,
      index = _parseProps3.index,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      componentPanel = _parseProps3.componentPanel,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["i", "timeout", "countToShow", "index", "component", "componentPanel", "className"]);

  var classStr = 'overflow-a-hidden flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(AnimationSlider, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.defaultProps = {};
/**
 * 索引号
 * @attribute module:AnimationSlider~Item.i
 * @type {number}
 */

/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Item.countToShow
 */

/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Item.index
 */

/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Item.timeout
 */

/**
 * 参见 BaseComponent
 */

_Item.defaultProps.component = _Panel.default;
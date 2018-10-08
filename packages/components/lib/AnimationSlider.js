"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var AnimationSlider =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(AnimationSlider, _React$Component);

  function AnimationSlider() {
    (0, _classCallCheck2.default)(this, AnimationSlider);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AnimationSlider).apply(this, arguments));
  }

  (0, _createClass2.default)(AnimationSlider, [{
    key: "render",
    value: function render() {
      var _parseProps = (0, _props.default)(this.props),
          _parseProps$countToSh = _parseProps.countToShow,
          countToShow = _parseProps$countToSh === void 0 ? 1 : _parseProps$countToSh,
          index = _parseProps.index,
          _parseProps$timeout = _parseProps.timeout,
          timeout = _parseProps$timeout === void 0 ? 300 : _parseProps$timeout,
          innerProps = _parseProps.innerProps,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
          componentPanel = _parseProps.componentPanel,
          className = _parseProps.className,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["countToShow", "index", "timeout", "innerProps", "component", "componentPanel", "className", "children"]);

      children = _react.default.Children.toArray(children);

      var items = _react.default.Children.toArray(children).filter(function (v) {
        return (0, _typeof2.default)(v) === 'object' && v.type === AnimationSlider.Item;
      }).map(function (v, i) {
        return _react.default.createElement(AnimationSlider.Item, (0, _extends2.default)({
          key: v.key || i,
          countToShow: countToShow,
          index: index,
          timeout: timeout,
          i: i
        }, v.props));
      });

      children = children.filter(function (v) {
        return (0, _typeof2.default)(v) !== 'object' || v.type !== AnimationSlider.Item;
      });
      var classStr = 'overflow-a-hidden position-relative';
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        className: (0, _classes.default)(classStr, className)
      }, props), _react.default.createElement(AnimationSlider._Inner, (0, _extends2.default)({
        countToShow: countToShow,
        index: index,
        timeout: timeout
      }, innerProps), items), children);
    }
  }]);
  return AnimationSlider;
}(_react.default.Component);

AnimationSlider._Inner = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops),
      countToShow = _parseProps2.countToShow,
      index = _parseProps2.index,
      timeout = _parseProps2.timeout,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
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

AnimationSlider.Item = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops),
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

var _default = AnimationSlider;
exports.default = _default;
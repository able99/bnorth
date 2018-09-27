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

var _props = require("./utils/props");

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
      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          _genCommonProps$count = _genCommonProps.countToShow,
          countToShow = _genCommonProps$count === void 0 ? 1 : _genCommonProps$count,
          index = _genCommonProps.index,
          _genCommonProps$timeo = _genCommonProps.timeout,
          timeout = _genCommonProps$timeo === void 0 ? 300 : _genCommonProps$timeo,
          innerProps = _genCommonProps.innerProps,
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
          className = _genCommonProps.className,
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["countToShow", "index", "timeout", "innerProps", "component", "className", "children"]);

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
        className: (0, _props.cxm)(classStr, className)
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
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      countToShow = _genCommonProps2.countToShow,
      index = _genCommonProps2.index,
      timeout = _genCommonProps2.timeout,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Panel.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      style = _genCommonProps2.style,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["countToShow", "index", "timeout", "component", "className", "style", "children"]);

  children = _react.default.Children.toArray(children);
  var classStr = 'flex-display-block flex-align-stretch';
  var styleSet = (0, _objectSpread2.default)({
    width: "".concat(100 / countToShow * children.length, "%")
  }, (0, _animation.transiton)(timeout), (0, _animation.transform)('translateX', "".concat(-100 / children.length * (index % children.length), "%")), style);
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className),
    style: styleSet
  }, props), children);
};

AnimationSlider.Item = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      i = _genCommonProps3.i,
      timeout = _genCommonProps3.timeout,
      countToShow = _genCommonProps3.countToShow,
      index = _genCommonProps3.index,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Panel.default : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["i", "timeout", "countToShow", "index", "component", "className"]);

  var classStr = 'overflow-a-hidden flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props));
};

var _default = AnimationSlider;
exports.default = _default;
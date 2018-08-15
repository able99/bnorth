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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _animation = require("rich.css/lib/styles/animation");

var _props = require("./utils/props");

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
          _genCommonProps$inner = _genCommonProps.innerProps;

      _genCommonProps$inner = _genCommonProps$inner === void 0 ? {} : _genCommonProps$inner;
      var classNameInner = _genCommonProps$inner.className,
          styleInner = _genCommonProps$inner.style,
          innerProps = (0, _objectWithoutProperties2.default)(_genCommonProps$inner, ["className", "style"]),
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
          className = _genCommonProps.className,
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["countToShow", "index", "timeout", "innerProps", "component", "className", "children"]);

      var items = _react.default.Children.toArray(children).filter(function (v) {
        return v.type === AnimationSlider.Item;
      });

      children = _react.default.Children.toArray(children).filter(function (v) {
        return v.type !== AnimationSlider.Item;
      });
      var classSet = {
        'overflow-hidden': true,
        'position-relative': !(0, _props.hascx)(className, 'position')
      };
      var classSetInner = {
        'flex-display-flex': true,
        'flex-align-stretch': true
      };
      var styleSetInner = (0, _objectSpread2.default)({
        width: "".concat(100 / countToShow * items.length, "%")
      }, (0, _animation.transiton)(timeout), (0, _animation.transform)('translateX', "".concat(-100 / items.length * index, "%")), styleInner);
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _props.cx)(classSet, className)
      }, props), _react.default.createElement("div", (0, _extends2.default)({
        className: (0, _props.cx)(classSetInner, classNameInner),
        style: styleSetInner
      }, innerProps), items.map(function (v, i, arr) {
        return (0, _react.cloneElement)(v, (0, _objectSpread2.default)({}, v.props, {
          i: i,
          timeout: timeout,
          countToShow: countToShow,
          index: index
        }));
      })), children);
    }
  }]);
  return AnimationSlider;
}(_react.default.Component);

AnimationSlider.Item = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      i = _genCommonProps2.i,
      timeout = _genCommonProps2.timeout,
      countToShow = _genCommonProps2.countToShow,
      index = _genCommonProps2.index,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'div' : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["i", "timeout", "countToShow", "index", "component", "className"]);

  var classSet = {
    'overflow-hidden': true,
    'flex-sub-flex-extend': true
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props));
};

var _default = AnimationSlider;
exports.default = _default;
module.exports = exports["default"];
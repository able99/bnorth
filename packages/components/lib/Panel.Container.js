"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
function getSubComponentProps(i, length, containerProps) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      className = _ref.className,
      styletyle = _ref.styletyle,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "styletyle"]);

  var _ref2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
      subPropsClassName = _ref2.className,
      subPropsStyle = _ref2.style,
      subProps = (0, _objectWithoutProperties2.default)(_ref2, ["className", "style"]);

  var subGetClassName = arguments.length > 5 ? arguments[5] : undefined;
  var subGetStyle = arguments.length > 6 ? arguments[6] : undefined;
  var subGetProps = arguments.length > 7 ? arguments[7] : undefined;
  return (0, _objectSpread2.default)({
    style: (0, _objectSpread2.default)({}, subGetStyle && subGetStyle(i, length, containerProps, props, subProps) || {}, subPropsStyle, styletyle),
    className: (0, _props.cxm)(subGetClassName && subGetClassName(i, length, containerProps, props, subProps), subPropsClassName, className)
  }, subGetProps && subGetProps(i, length, containerProps, props, subProps) || {}, subProps, props);
}

var Container =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Container, _React$Component);

  function Container() {
    (0, _classCallCheck2.default)(this, Container);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Container).apply(this, arguments));
  }

  (0, _createClass2.default)(Container, [{
    key: "render",
    value: function render() {
      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          type = _genCommonProps.type,
          containerProps = _genCommonProps.containerProps,
          itemComponent = _genCommonProps.itemComponent,
          itemProps = _genCommonProps.itemProps,
          itemGetProps = _genCommonProps.itemGetProps,
          itemGetClassName = _genCommonProps.itemGetClassName,
          itemGetStyle = _genCommonProps.itemGetStyle,
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
          className = _genCommonProps.className,
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["type", "containerProps", "itemComponent", "itemProps", "itemGetProps", "itemGetClassName", "itemGetStyle", "component", "className", "children"]);

      var classStr = 'position-relative overflow-a-hidden';
      var ai = 0;
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      }).map(function (v, i, a) {
        if ((0, _typeof2.default)(v) !== 'object' || v.type !== Container.Item) return v;
        var itemObj = getSubComponentProps(ai++, a.length, containerProps, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps);
        return _react.default.createElement(Container.Item, (0, _extends2.default)({
          key: v.key || a,
          type: type,
          component: itemComponent
        }, itemObj));
      });

      if (type === 'single') {
        children = children.filter(function (v) {
          return v.props.selected;
        });
      } else if (type === 'justify') {
        classStr += ' flex-display-block flex-justify-around flex-align-stretch';
      } else {}

      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _props.cxm)(classStr, className)
      }, props), children);
    }
  }]);
  return Container;
}(_react.default.Component);

Container.Item = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      type = _genCommonProps2.type,
      itemProps = _genCommonProps2.itemProps,
      itemGetProps = _genCommonProps2.itemGetProps,
      itemGetClassName = _genCommonProps2.itemGetClassName,
      itemGetStyle = _genCommonProps2.itemGetStyle,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Panel.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["type", "itemProps", "itemGetProps", "itemGetClassName", "itemGetStyle", "component", "className"]);

  var classStr = '';

  if (type === 'single') {
    classStr += ' position-relative offset-a-start square-full overflow-a-hidden';
  } else if (type === 'justify') {
    classStr += ' flex-sub-flex-extend';
  } else {}

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props));
};

_Panel.default.Container = Container;
var _default = _Panel.default;
exports.default = _default;
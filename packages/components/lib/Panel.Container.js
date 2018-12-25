"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _react = _interopRequireWildcard(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

function getSubComponentProps(index, size, componentClassName, componentStyle, containerProps) {
  var _ref = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {},
      className = _ref.className,
      style = _ref.style,
      componentProps = (0, _objectWithoutProperties2.default)(_ref, ["className", "style"]);

  var _ref2 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
      itemClassName = _ref2.className,
      itemStyle = _ref2.style,
      itemProps = (0, _objectWithoutProperties2.default)(_ref2, ["className", "style"]);

  var itemGetClassName = arguments.length > 7 ? arguments[7] : undefined;
  var itemGetStyle = arguments.length > 8 ? arguments[8] : undefined;
  var itemGetProps = arguments.length > 9 ? arguments[9] : undefined;
  return (0, _objectSpread2.default)({
    style: (0, _objectSpread2.default)({}, componentStyle, itemGetStyle && itemGetStyle(index, size, containerProps, componentProps, itemProps) || {}, itemStyle, style),
    className: (0, _classes.default)(componentClassName, itemGetClassName && itemGetClassName(index, size, containerProps, componentProps, itemProps), itemClassName, className)
  }, itemGetProps && itemGetProps(index, size, containerProps, componentProps, itemProps) || {}, itemProps, componentProps);
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
      var _parseProps = (0, _props.default)(this.props, _Panel.default.Container.props),
          type = _parseProps.type,
          containerProps = _parseProps.containerProps,
          itemProps = _parseProps.itemProps,
          itemGetProps = _parseProps.itemGetProps,
          itemGetClassName = _parseProps.itemGetClassName,
          itemGetStyle = _parseProps.itemGetStyle,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
          className = _parseProps.className,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["type", "containerProps", "itemProps", "itemGetProps", "itemGetClassName", "itemGetStyle", "component", "className", "children"]);

      var classStr = 'position-relative overflow-a-hidden';
      var ai = 0;
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      }).map(function (v, i, a) {
        if ((0, _typeof2.default)(v) !== 'object' || v.props.notItem) return v;
        return _react.default.createElement(Container.Item, {
          key: v.key || a,
          type: type,
          index: ai++,
          size: a.length,
          containerProps: containerProps,
          componentProps: v.props,
          itemProps: itemProps,
          itemGetClassName: itemGetClassName,
          itemGetStyle: itemGetStyle,
          itemGetProps: itemGetProps
        }, v);
      });

      if (type === 'single') {// children = children.filter(v=>v.props.selected);
      } else if (type === 'justify') {
        classStr += ' flex-display-block flex-justify-around flex-align-stretch';
      }

      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classes.default)(classStr, className)
      }, props), children);
    }
  }]);
  return Container;
}(_react.default.Component);

Container.Item = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Panel.default.Container.Item.props),
      type = _parseProps2.type,
      index = _parseProps2.index,
      size = _parseProps2.size,
      containerProps = _parseProps2.containerProps,
      componentProps = _parseProps2.componentProps,
      itemProps = _parseProps2.itemProps,
      itemGetProps = _parseProps2.itemGetProps,
      itemGetClassName = _parseProps2.itemGetClassName,
      itemGetStyle = _parseProps2.itemGetStyle,
      children = _parseProps2.children;

  var classStr = '';

  if (type === 'single') {
    classStr += ' position-relative offset-a-start square-full overflow-a-hidden';
  } else if (type === 'justify') {
    classStr += ' flex-sub-flex-extend';
  }

  var itemObj = getSubComponentProps(index, size, classStr, null, containerProps, componentProps, itemProps, itemGetClassName, itemGetStyle, itemGetProps);
  if (type === 'single' && !itemObj.selected) return null;
  return (0, _react.cloneElement)(children, (0, _objectSpread2.default)({}, itemObj));
};

_Panel.default.Container = Container;
var _default = _Panel.default;
exports.default = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

/**
 * 扩展 Panel 组件，将组件挂载到 Panel 组件上
 * @module 
 */
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
} // Panel Container
// -----------------------

/**
 * 扩展小面板组件，提供了容器的能力，可管理子组件,
 * 
 * 容器内的子组件会被容器进行属性设置，如果希望特殊子组件不接受容器组件设置，子组件需要包含 noItem 属性
 * @component
 * @mount Panel.Container
 * @augments BaseComponent
 */


var _Container =
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
      var _classSetFlex;

      var _parseProps = (0, _props.default)(this.props, _Container.props),
          type = _parseProps.type,
          inline = _parseProps.inline,
          direction = _parseProps.direction,
          justify = _parseProps.justify,
          align = _parseProps.align,
          wrap = _parseProps.wrap,
          containerProps = _parseProps.containerProps,
          itemProps = _parseProps.itemProps,
          _parseProps$itemGetPr = _parseProps.itemGetProps,
          itemGetProps = _parseProps$itemGetPr === void 0 ? _Container.itemGetProps : _parseProps$itemGetPr,
          _parseProps$itemGetCl = _parseProps.itemGetClassName,
          itemGetClassName = _parseProps$itemGetCl === void 0 ? _Container.itemGetClassName : _parseProps$itemGetCl,
          _parseProps$itemGetSt = _parseProps.itemGetStyle,
          itemGetStyle = _parseProps$itemGetSt === void 0 ? _Container.itemGetStyle : _parseProps$itemGetSt,
          Component = _parseProps.component,
          className = _parseProps.className,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["type", "inline", "direction", "justify", "align", "wrap", "containerProps", "itemProps", "itemGetProps", "itemGetClassName", "itemGetStyle", "component", "className", "children"]);

      var classStr = 'position-relative overflow-a-hidden';
      var classSet = {};
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      var containerItemCount = children.filter(function (v) {
        return (0, _typeof2.default)(v) === 'object' && !v.props.subTypeNotItem;
      }).length;
      var containerItemIndex = -1;
      children = _react.default.Children.toArray(children).map(function (v, i, a) {
        if ((0, _typeof2.default)(v) !== 'object' || v.props.subTypeNotItem) return v;
        containerItemIndex++;
        var countProps = getSubComponentProps(containerItemIndex, containerItemCount, '', {}, containerProps, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps);
        return _react.default.createElement(_Item, (0, _extends2.default)({
          key: v.key || containerItemIndex,
          type: type,
          index: containerItemIndex,
          size: containerItemCount
        }, countProps), v);
      });

      if (type === 'single') {
        children = children.filter(function (v) {
          return v.props.selected;
        });
        props.inline = inline;
      } else if (type === 'justify') {
        var _classSet;

        classSet = (_classSet = {}, (0, _defineProperty2.default)(_classSet, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty2.default)(_classSet, 'flex-justify-around', true), (0, _defineProperty2.default)(_classSet, 'flex-align-stretch', true), _classSet);
      } else if (type === 'primary') {
        var _classSet2;

        classSet = (_classSet2 = {}, (0, _defineProperty2.default)(_classSet2, 'flex-display-' + (inline ? 'inline' : 'block'), true), (0, _defineProperty2.default)(_classSet2, 'flex-align-center', true), _classSet2);
      } else if (type === 'flex') {
        classSet = (0, _defineProperty2.default)({}, 'flex-display-' + (inline ? 'inline' : 'block'), true);
      }

      var classSetFlex = (_classSetFlex = {}, (0, _defineProperty2.default)(_classSetFlex, 'flex-direction-' + direction, direction), (0, _defineProperty2.default)(_classSetFlex, 'flex-justify-' + justify, justify), (0, _defineProperty2.default)(_classSetFlex, 'flex-align-' + align, align), (0, _defineProperty2.default)(_classSetFlex, 'flex-wrap-' + wrap, wrap), _classSetFlex);
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classes.default)(classStr, classSet, classSetFlex, className)
      }, props), children);
    }
  }]);
  return Container;
}(_react.default.Component);

Object.defineProperty(_Panel.default, "Container", {
  get: function get() {
    return _Container;
  },
  set: function set(val) {
    _Container = val;
  }
});
_Container.defaultProps = {};
/**
 * 设置子组件的排列类型，包括：
 * 
 * - single： 仅 selected 属性为真的子组件显示
 * - justify： 平分组件
 * - primary: 仅 subTypePrimary 属性的子组件扩展，其他组件保持不延展不压缩
 * - flex: 普通 flex 布局
 * 
 * @attribute Panel.module:Container~Container.type
 * @type {string}
 */

/**
 * 设置组件的 flex direction 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.direction
 * @type {string}
 */

/**
 * 设置组件的 flex justify 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.justify
 * @type {string}
 */

/**
 * 设置组件的 flex align 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.align
 * @type {string}
 */

/**
 * 设置组件的 flex wrap 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.wrap
 * @type {string}
 */

/**
 * 统一设置子组件的属性
 * @attribute Panel.module:Container~Container.itemProps
 * @type {object}
 */

/**
 * 获取子组件样式类的回调函数
 * @callback ItemGetClassNameCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {string|object|array} 样式字符串，样式对象或者样式类数组，具体参见 rich.css classes 函数
 */

/**
 * 设置获取子组件的样式类的回到函数
 * @attribute Panel.module:Container~Container.itemGetClassName
 * @type {Panel.module:Container~ItemGetClassNameCallback}
 */

/**
 * 设置默认的获取子组件的样式类的回到函数
 * @member Panel.module:Container~Container.itemGetClassName
 * @type {Panel.module:Container~ItemGetClassNameCallback}
 */

/**
 * 获取子组件样式对象的回调函数
 * @callback ItemGetStyleCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {object} 样式表对象
 */

/**
 * 设置子组件的样式对象的回调函数
 * @attribute Panel.module:Container~Container.itemGetStyle
 * @type {Panel.module:Container~ItemGetStyleCallback}
 */

/**
 * 设置默认的子组件的样式对象的回调函数
 * @member Panel.module:Container~Container.itemGetStyle
 * @type {Panel.module:Container~ItemGetStyleCallback}
 */

/**
 * 获取子组件属性的回调函数
 * @callback ItemGetPropsCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {object} 属性对象
 */

/**
 * 设置获取子组件的属性的回调函数
 * @attribute Panel.module:Container~Container.itemGetProps
 * @type {Panel.module:Container~ItemGetPropsCallback}
 */

/**
 * 设置默认的获取子组件的属性的回调函数
 * @member Panel.module:Container~Container.itemGetProps
 * @type {Panel.module:Container~ItemGetPropsCallback}
 * @static
 */

/**
 * 设置映射组件
 */

_Container.defaultProps.component = _Panel.default; // Panel Container Item
// ------------------------------

/**
 * 带容器能力的小面板组件的子组件
 * @component 
 * @mount Panel.Container.Item
 * @augments BaseComponent
 */

var _Item = function Item(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Item.props),
      type = _parseProps2.type,
      subTypePrimary = _parseProps2.subTypePrimary,
      subTypeNotItem = _parseProps2.subTypeNotItem,
      index = _parseProps2.index,
      size = _parseProps2.size,
      containerProps = _parseProps2.containerProps,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["type", "subTypePrimary", "subTypeNotItem", "index", "size", "containerProps", "className", "children"]);

  var classStr = '';

  if (type === 'single') {
    classStr = 'position-relative offset-a-start square-full overflow-a-hidden';
  } else if (type === 'justify') {
    classStr = 'flex-sub-flex-extend';
  } else if (type === 'primary') {
    classStr = subTypePrimary ? 'flex-sub-flex-extend' : 'flex-sub-flex-none';
  }

  return (0, _react.cloneElement)(children, (0, _objectSpread2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Object.defineProperty(_Panel.default.Container, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.defaultProps = {};
/**
 * 参见 Container
 * @attribute Panel.module:Container~Item.type
 */

/**
 * 组件在容器中的索引
 * @attribute Panel.module:Container~Item.index
 * @type {number}
 */

/**
 * 容器中子组件的数量
 * @attribute Panel.module:Container~Item.size
 * @type {number}
 */

/**
 * 容器组件的属性
 * @attribute Panel.module:Container~Item.containerProps
 * @type {object}
 */

var _default = _Panel.default;
exports.default = _default;
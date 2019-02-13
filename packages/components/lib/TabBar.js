"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = require("./Icon");

/**
 * @module
 */
// TabBar
// -------------------

/**
 * 标签页组件
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer 
 * @exportdefault
 */
var TabBar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(TabBar, _React$Component);

  function TabBar(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, TabBar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabBar).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_handleAction", function (i) {
      var _this$props = _this.props,
          onAction = _this$props.onAction,
          children = _this$props.children;

      _this.setState({
        selectedIndex: i
      });

      if (onAction) {
        children = _react.default.Children.toArray(children).filter(function (v) {
          return v;
        });
        var props = children[i] && children[i].props;
        onAction(i, props, props && props.event);
      }
    });
    _this.state = {
      selectedIndex: _props.selectedIndexDefault || 0
    };
    return _this;
  }

  (0, _createClass2.default)(TabBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, TabBar, {
        isContainer: true
      }),
          _BaseComponent$select = _BaseComponent.selectedIndex,
          selectedIndex = _BaseComponent$select === void 0 ? this.state.selectedIndex : _BaseComponent$select,
          selectedIndexDefault = _BaseComponent.selectedIndexDefault,
          onAction = _BaseComponent.onAction,
          navProps = _BaseComponent.navProps,
          containerProps = _BaseComponent.containerProps,
          Component = _BaseComponent.component,
          componentPanel = _BaseComponent.componentPanel,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["selectedIndex", "selectedIndexDefault", "onAction", "navProps", "containerProps", "component", "componentPanel", "children"]);

      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        type: "primary",
        position: "top",
        align: "stretch"
      }, props), _react.default.createElement(_Panel.default.Container, (0, _extends2.default)({
        type: "justify",
        selectedIndex: selectedIndex
      }, navProps), children.map(function (v, i) {
        var _v$props = v.props,
            event = _v$props.event,
            _onClick = _v$props.onClick,
            children = _v$props.children,
            props = (0, _objectWithoutProperties2.default)(_v$props, ["event", "onClick", "children"]);
        return _react.default.createElement(_Icon.PanelIcon, (0, _extends2.default)({
          key: v.key || i,
          selected: selectedIndex === i,
          hasSelection: true,
          onClick: function onClick(e) {
            _this2._handleAction(i);

            _onClick && _onClick(e);
          }
        }, props));
      })), _react.default.createElement(_Panel.default.Container, (0, _extends2.default)({
        itemSelected: true,
        selectedIndex: selectedIndex,
        onSelect: function onSelect(index) {
          return _this2._handleAction(index);
        }
      }, containerProps), children.map(function (v, i) {
        return _react.default.createElement(_Panel.default, {
          key: v.key || i
        }, v.props.children);
      })));
    }
  }]);
  return TabBar;
}(_react.default.Component);

TabBar.defaultProps = {};
/**
 * @callback TabBarActionCallback
 * @param {number} i - 标签的索引
 * @param {*} event - 标签的事件名称
 * @param {object} props - 标签的属性
 * @returns {boolean} 返回为真，将阻止导航条组件的点击事件
 */

/**
 * 设置标签页页面切换的动作回调函数
 * @attribute module:TabBar.TabBar.onAction
 * @type {module:TabBar~TabBarActionCallback}
 */

/**
 * 设置标签页当前选中索引
 * @attribute module:TabBar.TabBar.selectedIndex
 * @type {number}
 */

/**
 * 设置标签页默认的选中索引
 * @attribute module:TabBar.TabBar.selectedIndexDefault
 * @type {number}
 */

/**
 * 设置标签页的标签导航组件的属性
 * @attribute module:TabBar.TabBar.navProps
 * @type {object}
 */

/**
 * 设置标签页的标签内容容器组件的属性
 * @attribute module:TabBar.TabBar.containerProps
 * @type {object}
 */

/**
 * 设置映射组件，采用 Panel.Container 类型为 primary
 */

TabBar.defaultProps.component = _Panel.default.Container;
var _default = TabBar;
exports.default = _default;
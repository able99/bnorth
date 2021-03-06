"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireWildcard(require("./Panel"));

var _Icon = require("./Icon");

/**
 * @module
 */

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

  function TabBar(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TabBar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabBar).call(this, props));
    _this.state = {
      selectedIndex: props.selectedIndexDefault || 0
    };
    return _this;
  }

  (0, _createClass2.default)(TabBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var aprops = (0, _BaseComponent.default)(this.props);
      var _aprops$selectedIndex = aprops.selectedIndex,
          selectedIndex = _aprops$selectedIndex === void 0 ? this.state.selectedIndex : _aprops$selectedIndex,
          selectedIndexDefault = aprops.selectedIndexDefault,
          onWillChange = aprops.onWillChange,
          onAction = aprops.onAction,
          navProps = aprops.navProps,
          containerProps = aprops.containerProps,
          children = aprops.children,
          props = (0, _objectWithoutProperties2.default)(aprops, ["selectedIndex", "selectedIndexDefault", "onWillChange", "onAction", "navProps", "containerProps", "children"]);
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      return _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
        panelContainerProps: aprops,
        ctype: "primary",
        direction: "v",
        align: "stretch"
      }, props), _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
        panelContainerProps: navProps,
        ctype: "justify",
        selectedIndex: selectedIndex
      }, navProps), children.map(function (v, i) {
        var _v$props = v.props,
            event = _v$props.event,
            _onClick = _v$props.onClick,
            children = _v$props.children,
            props = (0, _objectWithoutProperties2.default)(_v$props, ["event", "onClick", "children"]);
        return _react.default.createElement(_Panel.default, (0, _extends2.default)({
          key: v.key || i,
          component: _Icon.PanelIcon,
          selected: selectedIndex === i,
          "bp-panelTheme-sensitiveSelect": true,
          onClick: function onClick(e) {
            if (onWillChange && onWillChange(i, v.props, event) === false) return;

            _this2.setState({
              selectedIndex: i
            }, function () {
              if (onAction) onAction(i, v.props, event);
              if (_onClick) _onClick(e);
            });
          }
        }, props));
      })), _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
        panelContainerProps: containerProps,
        panelItemSelected: true,
        ctype: "scroll",
        selectedIndex: selectedIndex,
        onSelectedChange: function onSelectedChange(i) {
          var props = children[i].props;
          if (onWillChange && onWillChange(i, props, props && props.event) === false) return;

          _this2.setState({
            selectedIndex: i
          }, function () {
            if (onAction) onAction(i, props, props && props.event);
          });
        }
      }, containerProps), children.map(function (v) {
        return _react.default.createElement(_Panel.default, {
          key: v.key,
          children: v.props.children
        });
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

(0, _defineProperty.default)(TabBar, "TabBar", {
  get: function get() {
    return TabBar;
  },
  set: function set(val) {
    TabBar = val;
  }
});
TabBar.isBnorth = true;
TabBar.defaultProps['b-precast'] = {};
var _default = TabBar;
/**
 * 标签页组件条目
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer 
 * @exportdefault
 */

exports.default = _default;

var _Item = function Item(aprops) {
  var props = (0, _BaseComponent.default)(aprops, _Item);
  return _react.default.createElement(_Panel.default, props);
};

_Item.defaultProps = {};
(0, _defineProperty.default)(TabBar, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.isBnorth = true;
_Item.defaultProps['b-precast'] = {};
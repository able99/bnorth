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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props2 = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Container"));

var _Button = _interopRequireDefault(require("./Button"));

/**
 * @module
 */
// Tabs
// -------------------

/**
 * 标签页组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
var Tabs =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Tabs, _React$Component);

  function Tabs(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tabs);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tabs).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_handleAction", function (i, event, props) {
      _this.setState({
        selected: i
      });

      _this.props.onAction && _this.props.onAction(i, event, props);
    });
    _this.state = {
      selected: _props.defaultSelected || 0
    };
    return _this;
  }

  (0, _createClass2.default)(Tabs, [{
    key: "render",
    value: function render() {
      var _parseProps = (0, _props2.default)(this.props, Tabs.props),
          onAction = _parseProps.onAction,
          _parseProps$selected = _parseProps.selected,
          selected = _parseProps$selected === void 0 ? this.state.selected : _parseProps$selected,
          defaultSelected = _parseProps.defaultSelected,
          navProps = _parseProps.navProps,
          containerProps = _parseProps.containerProps,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
          componentPanel = _parseProps.componentPanel,
          className = _parseProps.className,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["onAction", "selected", "defaultSelected", "navProps", "containerProps", "component", "componentPanel", "className", "children"]);

      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      var classStr = 'flex-display-block flex-direction-v flex-align-stretch';
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        className: (0, _classes.default)(classStr, className)
      }, props), _react.default.createElement(_Nav, (0, _extends2.default)({
        onAction: this._handleAction,
        selected: selected
      }, navProps), children), _react.default.createElement(_Container, (0, _extends2.default)({
        onAction: this._handleAction,
        selected: selected
      }, containerProps), children));
    }
  }]);
  return Tabs;
}(_react.default.Component);

Tabs.defaultProps = {};
/**
 * @callback TabsActionCallback
 * @param {number} i - 标签的索引
 * @param {*} event - 标签的事件名称
 * @param {object} props - 标签的属性
 * @returns {boolean} 返回为真，将阻止导航条组件的点击事件
 */

/**
 * 设置标签页页面切换的动作回调函数
 * @attribute module:Tabs.Tabs.onAction
 * @type {module:Tabs~TabsActionCallback}
 */

/**
 * 设置标签页当前选中索引
 * @attribute module:Tabs.Tabs.selected
 * @type {number}
 */

/**
 * 设置标签页默认的选中索引
 * @attribute module:Tabs.Tabs.defaultSelected
 * @type {number}
 */

/**
 * 设置标签页的标签导航组件的属性
 * @attribute module:Tabs.Tabs.navProps
 * @type {object}
 */

/**
 * 设置标签页的标签内容容器组件的属性
 * @attribute module:Tabs.Tabs.containerProps
 * @type {object}
 */

/**
 * 设置映射组件
 */

Tabs.defaultProps.component = _Panel.default;
var _default = Tabs; // Tabs Nav
// -------------------

/**
 * 标签页的导航条组件，标签页组件内部使用，不直接使用，可替换或者定制
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer
 * @mount Tabs.Nav 
 * @private
 */

exports.default = _default;

var _Nav = function Nav(aprops) {
  var _parseProps2 = (0, _props2.default)(aprops, _Nav.props),
      onAction = _parseProps2.onAction,
      selected = _parseProps2.selected,
      _parseProps2$itemProp = _parseProps2.itemProps,
      itemProps = _parseProps2$itemProp === void 0 ? {} : _parseProps2$itemProp,
      _parseProps2$itemGetC = _parseProps2.itemGetClassName,
      itemGetClassName = _parseProps2$itemGetC === void 0 ? _Nav._itemGetClassName : _parseProps2$itemGetC,
      _parseProps2$itemGetS = _parseProps2.itemGetStyle,
      itemGetStyle = _parseProps2$itemGetS === void 0 ? _Nav._itemGetStyle : _parseProps2$itemGetS,
      _parseProps2$itemGetP = _parseProps2.itemGetProps,
      itemGetProps = _parseProps2$itemGetP === void 0 ? _Nav._itemGetProps : _parseProps2$itemGetP,
      Component = _parseProps2.component,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["onAction", "selected", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'flex-sub-flex-none';
  itemProps.className = (0, _classes.default)('text-truncate', itemProps.className);
  itemProps['b-style'] = itemProps['b-style'] || 'underline';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    separator: true,
    justify: true,
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _classes.default)(classStr, className)
  }, props), children.map(function (v, i) {
    return _react.default.createElement(_Button.default, {
      key: v.key || i,
      selected: selected === i,
      onClick: function onClick(e) {
        return !(onAction && onAction(i, v.props.event, v.props)) && props.onClick && props.onClick(e);
      }
    }, v.props.title);
  }));
};

Object.defineProperty(Tabs, "Nav", {
  get: function get() {
    return _Nav;
  },
  set: function set(val) {
    _Nav = val;
  }
});
_Nav.defaultProps = {};
/**
 * 设置标签页页面切换的动作回调函数
 * @attribute module:Tabs~Nav.onAction
 * @type {module:Tabs~TabsActionCallback}
 */

/**
 * 设置标签页当前选中索引
 * @attribute module:Tabs~Nav.selected
 * @type {number}
 */

/**
 * 设置映射组件
 */

_Nav.defaultProps.component = _Button.default.Group; // Tabs Container
// ----------------------

/**
 * 标签页容器组件，标签页组件内部使用，不直接使用，可替换或者定制
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer
 * @mount Tabs.Container
 * @private
 */

var _Container = function Container(aprops) {
  var _parseProps3 = (0, _props2.default)(aprops, _Container.props),
      onAction = _parseProps3.onAction,
      type = _parseProps3.type,
      itemProps = _parseProps3.itemProps,
      _parseProps3$itemGetC = _parseProps3.itemGetClassName,
      itemGetClassName = _parseProps3$itemGetC === void 0 ? _Container.itemGetClassName : _parseProps3$itemGetC,
      _parseProps3$itemGetS = _parseProps3.itemGetStyle,
      itemGetStyle = _parseProps3$itemGetS === void 0 ? _Container.itemGetStyle : _parseProps3$itemGetS,
      _parseProps3$itemGetP = _parseProps3.itemGetProps,
      itemGetProps = _parseProps3$itemGetP === void 0 ? _Container.itemGetProps : _parseProps3$itemGetP,
      Component = _parseProps3.component,
      componentPanel = _parseProps3.componentPanel,
      className = _parseProps3.className,
      children = _parseProps3.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["onAction", "type", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    type: type,
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _classes.default)(classStr, className)
  }, props), children.map(function (v, i) {
    return _react.default.createElement(Item, (0, _extends2.default)({
      key: v.key || i
    }, v.props));
  }));
};

Object.defineProperty(Tabs, "Container", {
  get: function get() {
    return _Container;
  },
  set: function set(val) {
    _Container = val;
  }
});
_Container.defaultProps = {};
/**
 * 组件的排列类型
 */

_Container.defaultProps.type = 'single';
/**
 * 设置标签页页面切换的动作回调函数
 * @attribute module:Tabs~Container.onAction
 * @type {module:Tabs~TabsActionCallback}
 */

/**
 * 设置标签页当前选中索引
 * @attribute module:Tabs~Container.selected
 * @type {number}
 */

/*
 * 设置映射组件
 */

_Container.defaultProps.component = _Panel.default.Container;

_Container.itemGetProps = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      selected = _ref.selected;

  return {
    selected: selected === i
  };
}; // Tabs Container Item
// -------------------

/**
 * 标签页容器组件的子组件，标签页组件内部使用，不直接使用，可替换或者定制
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainerItem
 * @mount Tabs.Item
 */


var Item = function Item(aprops) {
  var title = aprops.title,
      event = aprops.event,
      Component = aprops.component,
      props = (0, _objectWithoutProperties2.default)(aprops, ["title", "event", "component"]);
  return _react.default.createElement(Component, props);
};

Object.defineProperty(Tabs, "Item", {
  get: function get() {
    return Item;
  },
  set: function set(val) {
    Item = val;
  }
});
Item.defaultProps = {};
/**
 * 设置标签页的标签的唯一的事件编码
 * @attribute module:Tabs~Item.event
 * @type {string}
 */

/**
 * 设置显示在标签页的导航组件的对应的标签中的内容
 * @attribute module:Tabs~Item.title
 * @type {string|component|element}
 */

/**
 * 设置显示在标签页的容器组件的对应的标签的内容
 * @attribute module:Tabs~Item.children
 * @type {string|component|element}
 */

/*
 * 设置映射组件
 */

Item.defaultProps.component = _Panel.default;
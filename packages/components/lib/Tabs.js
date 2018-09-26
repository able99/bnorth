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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

var _Button = _interopRequireDefault(require("./Button"));

var _Panel = _interopRequireDefault(require("./Panel.Container"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Tabs =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Tabs, _React$Component);

  function Tabs() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Tabs);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Tabs)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleAction", function (i) {
      _this.setState({
        selectedKey: i
      });

      _this.props.onAction && _this.props.onAction(i);
    });
    return _this;
  }

  (0, _createClass2.default)(Tabs, [{
    key: "render",
    value: function render() {
      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          onAction = _genCommonProps.onAction,
          _genCommonProps$selec = _genCommonProps.selectedKey,
          selectedKey = _genCommonProps$selec === void 0 ? this.state && this.state.selectedKey : _genCommonProps$selec,
          _genCommonProps$defau = _genCommonProps.defaultSelectedKey,
          defaultSelectedKey = _genCommonProps$defau === void 0 ? 0 : _genCommonProps$defau,
          navProps = _genCommonProps.navProps,
          containerProps = _genCommonProps.containerProps,
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? _Panel.default : _genCommonProps$compo,
          className = _genCommonProps.className,
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["onAction", "selectedKey", "defaultSelectedKey", "navProps", "containerProps", "component", "className", "children"]);

      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      var classStr = 'flex-display-block flex-direction-v flex-align-stretch';
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _props.cxm)(classStr, className)
      }, props), _react.default.createElement(Tabs.Nav, (0, _extends2.default)({
        onAction: this.handleAction,
        selectedKey: selectedKey,
        defaultSelectedKey: defaultSelectedKey
      }, navProps), children), _react.default.createElement(Tabs.Container, (0, _extends2.default)({
        onAction: this.handleAction,
        selectedKey: selectedKey,
        defaultSelectedKey: defaultSelectedKey
      }, containerProps), children));
    }
  }]);
  return Tabs;
}(_react.default.Component);

Tabs.Nav = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      onAction = _genCommonProps2.onAction,
      selectedKey = _genCommonProps2.selectedKey,
      defaultSelectedKey = _genCommonProps2.defaultSelectedKey,
      _genCommonProps2$item = _genCommonProps2.itemProps,
      itemProps = _genCommonProps2$item === void 0 ? {} : _genCommonProps2$item,
      _genCommonProps2$item2 = _genCommonProps2.itemGetClassName,
      itemGetClassName = _genCommonProps2$item2 === void 0 ? Tabs.Nav.itemGetClassName : _genCommonProps2$item2,
      _genCommonProps2$item3 = _genCommonProps2.itemGetStyle,
      itemGetStyle = _genCommonProps2$item3 === void 0 ? Tabs.Nav.itemGetStyle : _genCommonProps2$item3,
      _genCommonProps2$item4 = _genCommonProps2.itemGetProps,
      itemGetProps = _genCommonProps2$item4 === void 0 ? Tabs.Nav.itemGetProps : _genCommonProps2$item4,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Button.default.Group : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["onAction", "selectedKey", "defaultSelectedKey", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", "children"]);

  var classStr = 'flex-sub-flex-none';
  itemProps.className = (0, _props.cxm)(itemProps.className, 'text-truncate');
  itemProps['b-style'] = itemProps['b-style'] || 'underline';
  return _react.default.createElement(Component, (0, _extends2.default)({
    separator: true,
    justify: true,
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

Tabs.Nav.itemGetProps = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _onClick = _ref.onClick,
      onAction = _ref.onAction,
      selectedKey = _ref.selectedKey,
      defaultSelectedKey = _ref.defaultSelectedKey;

  var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      eventKey = _ref2.eventKey;

  var subProps = arguments.length > 4 ? arguments[4] : undefined;
  return {
    'data-bbb': i,
    'data-bbbc': selectedKey === undefined || selectedKey === null ? i === defaultSelectedKey : selectedKey === i,
    key: eventKey || i,
    selected: selectedKey === undefined || selectedKey === null ? i === defaultSelectedKey : selectedKey === i,
    onClick: function onClick(e) {
      return !(onAction && onAction(i, eventKey)) && _onClick && _onClick(e);
    }
  };
};

Tabs.Container = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      onAction = _genCommonProps3.onAction,
      selectedKey = _genCommonProps3.selectedKey,
      defaultSelectedKey = _genCommonProps3.defaultSelectedKey,
      _genCommonProps3$type = _genCommonProps3.type,
      type = _genCommonProps3$type === void 0 ? 'single' : _genCommonProps3$type,
      itemProps = _genCommonProps3.itemProps,
      itemComponent = _genCommonProps3.itemComponent,
      _genCommonProps3$item = _genCommonProps3.itemGetClassName,
      itemGetClassName = _genCommonProps3$item === void 0 ? Tabs.Container.itemGetClassName : _genCommonProps3$item,
      _genCommonProps3$item2 = _genCommonProps3.itemGetStyle,
      itemGetStyle = _genCommonProps3$item2 === void 0 ? Tabs.Container.itemGetStyle : _genCommonProps3$item2,
      _genCommonProps3$item3 = _genCommonProps3.itemGetProps,
      itemGetProps = _genCommonProps3$item3 === void 0 ? Tabs.Container.itemGetProps : _genCommonProps3$item3,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Panel.default.Container : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["onAction", "selectedKey", "defaultSelectedKey", "type", "itemProps", "itemComponent", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", "children"]);

  var classStr = 'flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    type: type,
    containerProps: aprops,
    itemComponent: itemComponent,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

Tabs.Container.itemGetProps = function (i, length) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      selectedKey = _ref3.selectedKey,
      defaultSelectedKey = _ref3.defaultSelectedKey;

  var _ref4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      eventKey = _ref4.eventKey;

  var subProps = arguments.length > 4 ? arguments[4] : undefined;
  return {
    key: eventKey || i,
    selected: selectedKey === undefined || selectedKey === null ? i === defaultSelectedKey : selectedKey === i
  };
};

Tabs.Item = _Panel.default.Container.Item;
var _default = Tabs;
exports.default = _default;
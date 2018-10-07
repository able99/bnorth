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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Container"));

var _Button = _interopRequireDefault(require("./Button"));

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
      var _parseProps = (0, _props.default)(this.props),
          onAction = _parseProps.onAction,
          _parseProps$selectedK = _parseProps.selectedKey,
          selectedKey = _parseProps$selectedK === void 0 ? this.state && this.state.selectedKey : _parseProps$selectedK,
          _parseProps$defaultSe = _parseProps.defaultSelectedKey,
          defaultSelectedKey = _parseProps$defaultSe === void 0 ? 0 : _parseProps$defaultSe,
          navProps = _parseProps.navProps,
          containerProps = _parseProps.containerProps,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
          className = _parseProps.className,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["onAction", "selectedKey", "defaultSelectedKey", "navProps", "containerProps", "component", "className", "children"]);

      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      var classStr = 'flex-display-block flex-direction-v flex-align-stretch';
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classes.default)(classStr, className)
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
  var _parseProps2 = (0, _props.default)(aprops),
      onAction = _parseProps2.onAction,
      selectedKey = _parseProps2.selectedKey,
      defaultSelectedKey = _parseProps2.defaultSelectedKey,
      _parseProps2$itemProp = _parseProps2.itemProps,
      itemProps = _parseProps2$itemProp === void 0 ? {} : _parseProps2$itemProp,
      _parseProps2$itemGetC = _parseProps2.itemGetClassName,
      itemGetClassName = _parseProps2$itemGetC === void 0 ? Tabs.Nav.itemGetClassName : _parseProps2$itemGetC,
      _parseProps2$itemGetS = _parseProps2.itemGetStyle,
      itemGetStyle = _parseProps2$itemGetS === void 0 ? Tabs.Nav.itemGetStyle : _parseProps2$itemGetS,
      _parseProps2$itemGetP = _parseProps2.itemGetProps,
      itemGetProps = _parseProps2$itemGetP === void 0 ? Tabs.Nav.itemGetProps : _parseProps2$itemGetP,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Button.default.Group : _parseProps2$componen,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["onAction", "selectedKey", "defaultSelectedKey", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", "children"]);

  var classStr = 'flex-sub-flex-none';
  itemProps.className = (0, _classes.default)('text-truncate', itemProps.className);
  itemProps['b-style'] = itemProps['b-style'] || 'underline';
  return _react.default.createElement(Component, (0, _extends2.default)({
    separator: true,
    justify: true,
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _classes.default)(classStr, className)
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

  return {
    key: eventKey || i,
    selected: selectedKey === undefined || selectedKey === null ? i === defaultSelectedKey : selectedKey === i,
    onClick: function onClick(e) {
      return !(onAction && onAction(i, eventKey)) && _onClick && _onClick(e);
    }
  };
};

Tabs.Container = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops),
      onAction = _parseProps3.onAction,
      selectedKey = _parseProps3.selectedKey,
      defaultSelectedKey = _parseProps3.defaultSelectedKey,
      _parseProps3$type = _parseProps3.type,
      type = _parseProps3$type === void 0 ? 'single' : _parseProps3$type,
      itemProps = _parseProps3.itemProps,
      itemComponent = _parseProps3.itemComponent,
      _parseProps3$itemGetC = _parseProps3.itemGetClassName,
      itemGetClassName = _parseProps3$itemGetC === void 0 ? Tabs.Container.itemGetClassName : _parseProps3$itemGetC,
      _parseProps3$itemGetS = _parseProps3.itemGetStyle,
      itemGetStyle = _parseProps3$itemGetS === void 0 ? Tabs.Container.itemGetStyle : _parseProps3$itemGetS,
      _parseProps3$itemGetP = _parseProps3.itemGetProps,
      itemGetProps = _parseProps3$itemGetP === void 0 ? Tabs.Container.itemGetProps : _parseProps3$itemGetP,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default.Container : _parseProps3$componen,
      className = _parseProps3.className,
      children = _parseProps3.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["onAction", "selectedKey", "defaultSelectedKey", "type", "itemProps", "itemComponent", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", "children"]);

  var classStr = 'flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    type: type,
    containerProps: aprops,
    itemComponent: itemComponent,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _classes.default)(classStr, className)
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
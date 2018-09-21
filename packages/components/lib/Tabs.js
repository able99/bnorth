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

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

var _Views = _interopRequireDefault(require("./Views"));

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
    (0, _classCallCheck2.default)(this, Tabs);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tabs).apply(this, arguments));
  }

  (0, _createClass2.default)(Tabs, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          onAction = _genCommonProps.onAction,
          _genCommonProps$selec = _genCommonProps.selectedKey,
          selectedKey = _genCommonProps$selec === void 0 ? this.state && this.state.selectedKey : _genCommonProps$selec,
          _genCommonProps$defau = _genCommonProps.defaultSelectedKey,
          defaultSelectedKey = _genCommonProps$defau === void 0 ? 0 : _genCommonProps$defau,
          _genCommonProps$butto = _genCommonProps.buttonGroupProps,
          buttonGroupProps = _genCommonProps$butto === void 0 ? {} : _genCommonProps$butto,
          _genCommonProps$views = _genCommonProps.viewsProps,
          viewsProps = _genCommonProps$views === void 0 ? {} : _genCommonProps$views,
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
          className = _genCommonProps.className,
          bTheme = _genCommonProps['b-theme'],
          bStyle = _genCommonProps['b-style'],
          bSize = _genCommonProps['b-size'],
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["onAction", "selectedKey", "defaultSelectedKey", "buttonGroupProps", "viewsProps", "component", "className", 'b-theme', 'b-style', 'b-size', "children"]);

      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      var classStr = 'flex-display-block flex-direction-v flex-align-stretch';

      var handleAction = function handleAction(i) {
        _this.setState({
          selectedKey: i
        });

        onAction && onAction(i);
      };

      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _props.cxm)(classStr, className)
      }, props), _react.default.createElement(Tabs.ButtonGroup, (0, _extends2.default)({
        onAction: handleAction,
        selectedKey: selectedKey,
        defaultSelectedKey: defaultSelectedKey
      }, buttonGroupProps), children), _react.default.createElement(Tabs.Views, (0, _extends2.default)({
        selectedKey: selectedKey,
        defaultSelectedKey: defaultSelectedKey
      }, viewsProps), children));
    }
  }]);
  return Tabs;
}(_react.default.Component);

Tabs.ButtonGroup = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      onAction = _genCommonProps2.onAction,
      selectedKey = _genCommonProps2.selectedKey,
      defaultSelectedKey = _genCommonProps2.defaultSelectedKey,
      _genCommonProps2$butt = _genCommonProps2.buttonProps,
      buttonProps = _genCommonProps2$butt === void 0 ? {} : _genCommonProps2$butt,
      _genCommonProps2$butt2 = _genCommonProps2.buttonGetClassName,
      buttonGetClassName = _genCommonProps2$butt2 === void 0 ? Tabs.ButtonGroup.buttonGetClassName : _genCommonProps2$butt2,
      _genCommonProps2$butt3 = _genCommonProps2.buttonGetStyle,
      buttonGetStyle = _genCommonProps2$butt3 === void 0 ? Tabs.ButtonGroup.buttonGetStyle : _genCommonProps2$butt3,
      _genCommonProps2$butt4 = _genCommonProps2.buttonGetProps,
      buttonGetProps = _genCommonProps2$butt4 === void 0 ? Tabs.ButtonGroup.buttonGetProps : _genCommonProps2$butt4,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Button.default.Group : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["onAction", "selectedKey", "defaultSelectedKey", "buttonProps", "buttonGetClassName", "buttonGetStyle", "buttonGetProps", "component", "className", "children"]);

  var classStr = 'flex-sub-flex-none';
  buttonProps.className = (0, _props.cx)(buttonProps.className, 'text-truncate');
  buttonProps['b-style'] = buttonProps['b-style'] || 'underline';
  return _react.default.createElement(Component, (0, _extends2.default)({
    separator: true,
    justify: true,
    buttonProps: buttonProps,
    buttonGetClassName: buttonGetClassName,
    buttonGetStyle: buttonGetStyle,
    buttonGetProps: buttonGetProps,
    className: (0, _props.cxm)(classStr, className)
  }, props), children.map(function (v, i) {
    var _v$props = v.props,
        eventKey = _v$props.eventKey,
        title = _v$props.title,
        titleProps = _v$props.titleProps,
        _onClick = _v$props.onClick;
    return _react.default.createElement(_Button.default, (0, _extends2.default)({
      key: eventKey || i,
      selected: selectedKey === undefined || selectedKey === null ? i === defaultSelectedKey : selectedKey === i,
      onClick: function onClick(e) {
        return !(onAction && onAction(i, eventKey)) && _onClick && _onClick(e);
      }
    }, titleProps), title);
  }));
};

Tabs.Views = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      onAction = _genCommonProps3.onAction,
      selectedKey = _genCommonProps3.selectedKey,
      defaultSelectedKey = _genCommonProps3.defaultSelectedKey,
      _genCommonProps3$view = _genCommonProps3.viewProps,
      viewProps = _genCommonProps3$view === void 0 ? {} : _genCommonProps3$view,
      _genCommonProps3$view2 = _genCommonProps3.viewGetClassName,
      viewGetClassName = _genCommonProps3$view2 === void 0 ? Tabs.Views.viewGetClassName : _genCommonProps3$view2,
      _genCommonProps3$view3 = _genCommonProps3.viewGetStyle,
      viewGetStyle = _genCommonProps3$view3 === void 0 ? Tabs.Views.viewGetStyle : _genCommonProps3$view3,
      _genCommonProps3$view4 = _genCommonProps3.viewGetProps,
      viewGetProps = _genCommonProps3$view4 === void 0 ? Tabs.Views.viewGetProps : _genCommonProps3$view4,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Views.default : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      children = _genCommonProps3.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["onAction", "selectedKey", "defaultSelectedKey", "viewProps", "viewGetClassName", "viewGetStyle", "viewGetProps", "component", "className", "children"]);

  var classStr = 'flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    viewProps: viewProps,
    viewGetClassName: viewGetClassName,
    viewGetStyle: viewGetStyle,
    viewGetProps: viewGetProps,
    className: (0, _props.cxm)(classStr, className)
  }, props), children.map(function (v, i) {
    var _v$props2 = v.props,
        eventKey = _v$props2.eventKey,
        title = _v$props2.title,
        titleProps = _v$props2.titleProps,
        onClick = _v$props2.onClick,
        props = (0, _objectWithoutProperties2.default)(_v$props2, ["eventKey", "title", "titleProps", "onClick"]);
    return _react.default.createElement(_Views.default.Item, (0, _extends2.default)({
      key: eventKey || i,
      selected: selectedKey === undefined || selectedKey === null ? i === defaultSelectedKey : selectedKey === i
    }, viewProps, props));
  }));
};

Tabs.Item = _Views.default.Item;
var _default = Tabs;
exports.default = _default;
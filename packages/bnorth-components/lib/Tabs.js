"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _react = _interopRequireWildcard(require("react"));

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

  function Tabs(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tabs);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tabs).call(this, props));
    _this.state = {
      selectedKey: props.defaultSelectedKey || 0
    };
    return _this;
  }

  (0, _createClass2.default)(Tabs, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          _genCommonProps$navPr = _genCommonProps.navProps;

      _genCommonProps$navPr = _genCommonProps$navPr === void 0 ? {} : _genCommonProps$navPr;
      var navClassName = _genCommonProps$navPr.className,
          navProps = (0, _objectWithoutProperties2.default)(_genCommonProps$navPr, ["className"]),
          getNavItemStyle = _genCommonProps.getNavItemStyle,
          getNavItemClassName = _genCommonProps.getNavItemClassName,
          _genCommonProps$navIt = _genCommonProps.navItemProps,
          navItemProps = _genCommonProps$navIt === void 0 ? {
        className: "text-truncate"
      } : _genCommonProps$navIt,
          _genCommonProps$getNa = _genCommonProps.getNavItemProps,
          getNavItemProps = _genCommonProps$getNa === void 0 ? function (i, size, componentProps) {
        var _componentProps$event = componentProps.eventKey,
            eventKey = _componentProps$event === void 0 ? i : _componentProps$event;
        return {
          key: 'box-item-' + eventKey,
          onClick: function onClick() {
            _this2.setState({
              selectedKey: eventKey
            });

            onAction && onAction(eventKey);
          },
          selected: selectedKey === undefined ? i === defaultSelectedKey : selectedKey === eventKey,
          disabled: componentProps.disabled
        };
      } : _genCommonProps$getNa,
          _genCommonProps$views = _genCommonProps.viewsProps;
      _genCommonProps$views = _genCommonProps$views === void 0 ? {} : _genCommonProps$views;
      var viewsClassName = _genCommonProps$views.className,
          viewsProps = (0, _objectWithoutProperties2.default)(_genCommonProps$views, ["className"]),
          _genCommonProps$getVi = _genCommonProps.getViewsItemProps,
          getViewsItemProps = _genCommonProps$getVi === void 0 ? function (i, size, componentProps, parentProps) {
        var _componentProps$event2 = componentProps.eventKey,
            eventKey = _componentProps$event2 === void 0 ? i : _componentProps$event2;
        return {
          selected: selectedKey === undefined ? i === defaultSelectedKey : selectedKey === eventKey
        };
      } : _genCommonProps$getVi,
          onAction = _genCommonProps.onAction,
          _genCommonProps$selec = _genCommonProps.selectedKey,
          selectedKey = _genCommonProps$selec === void 0 ? this.state.selectedKey : _genCommonProps$selec,
          defaultSelectedKey = _genCommonProps.defaultSelectedKey,
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? 'div' : _genCommonProps$compo,
          className = _genCommonProps.className,
          cTheme = _genCommonProps.cTheme,
          _genCommonProps$cStyl = _genCommonProps.cStyle,
          cStyle = _genCommonProps$cStyl === void 0 ? 'underline' : _genCommonProps$cStyl,
          cSize = _genCommonProps.cSize,
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["navProps", "getNavItemStyle", "getNavItemClassName", "navItemProps", "getNavItemProps", "viewsProps", "getViewsItemProps", "onAction", "selectedKey", "defaultSelectedKey", "component", "className", "cTheme", "cStyle", "cSize", "children"]);
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      var classSet = {
        'flex-display-flex': true,
        'flex-direction-v': true,
        'flex-align-stretch': true
      };
      var classSetNav = {
        'flex-sub-flex-none': true
      };
      var classSetViews = {
        'flex-sub-flex-extend': true
      };
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _props.cx)(classSet, className)
      }, props), _react.default.createElement(_Button.default.Group, (0, _extends2.default)({
        cStyle: cStyle,
        cTheme: cTheme,
        cSize: cSize,
        separator: true,
        justify: true,
        className: (0, _props.cx)(classSetNav, navClassName)
      }, navProps), children.map(function (v, i, arr) {
        return _react.default.createElement(_Button.default, (0, _props.genItemProps)(i, arr.length, v.props, navItemProps, getNavItemClassName, getNavItemProps, getNavItemStyle), " ", v.props.title);
      })), _react.default.createElement(_Views.default, (0, _extends2.default)({
        className: (0, _props.cx)(classSetViews, viewsClassName)
      }, viewsProps), children.map(function (v, i, arr) {
        return (0, _react.cloneElement)(v, (0, _props.genItemProps)(i, arr.length, v.props, {}, null, getViewsItemProps, null));
      })));
    }
  }]);
  return Tabs;
}(_react.default.Component);

Tabs.Item = _Views.default.Item;
var _default = Tabs;
exports.default = _default;
module.exports = exports["default"];
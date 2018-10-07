"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.number.constructor");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _props = _interopRequireDefault(require("./utils/props"));

var _dom = require("./utils/dom");

var _ScrollSpy = _interopRequireDefault(require("./ScrollSpy"));

var _Fab = _interopRequireDefault(require("./Fab"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var BackTop =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(BackTop, _React$Component);

  function BackTop(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BackTop);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BackTop).call(this, props));
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(BackTop, [{
    key: "scrollToTop",
    value: function scrollToTop() {
      this.container && this.container.scrollTop && (this.container.scrollTop = 0);
    }
  }, {
    key: "isShow",
    value: function isShow() {
      return this.state.isShow;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.isShow() ? this.hide() : this.show();
    }
  }, {
    key: "show",
    value: function show() {
      !this.state.isShow && this.setState({
        isShow: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.state.isShow && this.setState({
        isShow: false
      });
    }
  }, {
    key: "_handleClick",
    value: function _handleClick() {
      var onClick = this.props.onClick;
      if (onClick && onClick.apply(void 0, arguments)) return;
      return this.scrollToTop();
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll(container, event) {
      this.container = container;
      var _this$props = this.props,
          triggerFunc = _this$props.triggerFunc,
          offset = _this$props.offset;
      triggerFunc(offset, container) ? this.show() : this.hide();
    }
  }, {
    key: "render",
    value: function render() {
      var _parseProps = (0, _props.default)(this.props),
          onClick = _parseProps.onClick,
          triggerFunc = _parseProps.triggerFunc,
          offset = _parseProps.offset,
          _parseProps$iconProps = _parseProps.iconProps,
          iconProps = _parseProps$iconProps === void 0 ? {} : _parseProps$iconProps,
          _parseProps$scrollSpy = _parseProps.scrollSpyProps,
          scrollSpyProps = _parseProps$scrollSpy === void 0 ? {} : _parseProps$scrollSpy,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Fab.default : _parseProps$component,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["onClick", "triggerFunc", "offset", "iconProps", "scrollSpyProps", "component", "children"]);

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, (0, _extends2.default)({
        onScrollPositionChange: this._handleScroll.bind(this)
      }, scrollSpyProps)), this.state.isShow ? _react.default.createElement(Component, (0, _extends2.default)({
        onClick: this._handleClick.bind(this)
      }, props), children ? children : _react.default.createElement(_Icon.default, (0, _extends2.default)({
        name: "backTop",
        nameDefault: "^"
      }, iconProps))) : null);
    }
  }]);
  return BackTop;
}(_react.default.Component);

exports.default = BackTop;
(0, _defineProperty2.default)(BackTop, "defaultProps", {
  triggerFunc: function triggerFunc(value, container) {
    if (!value) {
      return container.scrollTop >= (container ? (0, _dom.domOffset)(container).height : 0);
    } else if (!isNaN(value)) {
      return container.scrollTop >= value;
    } else if (typeof value === 'string' && value.test(/\d*%/)) {
      return container.scrollTop >= (container ? (0, _dom.domOffset)(container).height * Number(value.slice(0, -1)) / 100 : 0);
    }
  }
});
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

var _react = _interopRequireDefault(require("react"));

var _dom = require("./utils/dom");

var _props = _interopRequireDefault(require("./utils/props"));

var _ScrollSpy = _interopRequireDefault(require("./ScrollSpy"));

var _Fab = _interopRequireDefault(require("./Fab"));

var _Icon = _interopRequireDefault(require("./Icon"));

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
    key: "_handlePosChange",
    value: function _handlePosChange(event, el) {
      this.container = el;
      var _this$props = this.props,
          _this$props$trigger = _this$props.trigger,
          trigger = _this$props$trigger === void 0 ? BackTop._trigger : _this$props$trigger,
          offset = _this$props.offset;
      trigger(offset, this.container) ? this.show() : this.hide();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _parseProps = (0, _props.default)(this.props, BackTop.props),
          onClick = _parseProps.onClick,
          trigger = _parseProps.trigger,
          offset = _parseProps.offset,
          _parseProps$iconProps = _parseProps.iconProps,
          iconProps = _parseProps$iconProps === void 0 ? {} : _parseProps$iconProps,
          _parseProps$scrollSpy = _parseProps.scrollSpyProps,
          scrollSpyProps = _parseProps$scrollSpy === void 0 ? {} : _parseProps$scrollSpy,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Fab.default : _parseProps$component,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["onClick", "trigger", "offset", "iconProps", "scrollSpyProps", "component", "children"]);

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, (0, _extends2.default)({
        onPosChange: this._handlePosChange.bind(this)
      }, scrollSpyProps)), this.state.isShow ? _react.default.createElement(Component, (0, _extends2.default)({
        onClick: (0, _dom.chainedFuncs)(function () {
          return _this2.scrollToTop();
        }, onClick)
      }, props), children ? children : _react.default.createElement(_Icon.default, (0, _extends2.default)({
        name: "backTop",
        defaultName: "^"
      }, iconProps))) : null);
    }
  }]);
  return BackTop;
}(_react.default.Component);

exports.default = BackTop;

BackTop._trigger = function (value, container) {
  if (!value) {
    return container.scrollTop >= (container ? (0, _dom.domOffset)(container).height : 0);
  } else if (!isNaN(value)) {
    return container.scrollTop >= value;
  } else if (typeof value === 'string' && value.test(/\d*%/)) {
    return container.scrollTop >= (container ? (0, _dom.domOffset)(container).height * Number(value.slice(0, -1)) / 100 : 0);
  }
};
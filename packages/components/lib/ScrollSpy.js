"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _event = require("./utils/event");

var ScrollSpy =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ScrollSpy, _React$Component);

  function ScrollSpy() {
    (0, _classCallCheck2.default)(this, ScrollSpy);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ScrollSpy).apply(this, arguments));
  }

  (0, _createClass2.default)(ScrollSpy, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          onScrollPositionChange = _this$props.onScrollPositionChange,
          onScrollContainerChange = _this$props.onScrollContainerChange;
      if (!onScrollPositionChange && !onScrollContainerChange) return;
      this.container = this._getContainer();
      onScrollContainerChange && onScrollContainerChange(this.container);
      this.scrollEventListener = (0, _event.listen)(this.container, 'scroll', this._handleScrollPositionChange.bind(this), true);
      this.resizeEventListener = (0, _event.listen)(window, 'resize', this._handleScrollPositionChange.bind(this), true);

      this._handleScrollPositionChange();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var onScrollPositionChange = this.props.onScrollPositionChange;
      if (!onScrollPositionChange) return;

      this._handleScrollPositionChange();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var onScrollPositionChange = this.props.onScrollPositionChange;
      if (!onScrollPositionChange) return;
      this.scrollEventListener && this.scrollEventListener();
      this.resizeEventListener && this.resizeEventListener();
    }
  }, {
    key: "_getContainer",
    value: function _getContainer() {
      var _this$props2 = this.props,
          horizontal = _this$props2.horizontal,
          container = _this$props2.container;
      if (container) return _reactDom.default.findDOMNode(container);

      var node = _reactDom.default.findDOMNode(this);

      while (node.parentNode) {
        node = node.parentNode;
        if (node === document.body) return node;
        var style = window.getComputedStyle(node);
        var overflow = (horizontal ? style.getPropertyValue('overflow-x') : style.getPropertyValue('overflow-y')) || style.getPropertyValue('overflow');
        if (overflow === 'auto' || overflow === 'scroll') return node;
      }

      return document.body;
    }
  }, {
    key: "_handleScrollPositionChange",
    value: function _handleScrollPositionChange() {
      var onScrollPositionChange = this.props.onScrollPositionChange;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      onScrollPositionChange && onScrollPositionChange.apply(void 0, [this.container].concat(args));
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || _react.default.createElement("span", {
        style: {
          fontSize: 0
        }
      });
    }
  }]);
  return ScrollSpy;
}(_react.default.Component);

exports.default = ScrollSpy;
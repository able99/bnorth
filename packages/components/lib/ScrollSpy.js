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

var _dom = require("./utils/dom");

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
      this.container = (0, _dom.domFindScrollContainer)(this, this.props.container, this.props.horizontal);
      this.offScrollListener = (0, _dom.listen)(this.container, 'scroll', this._handlePosChange.bind(this), true);
      this.offResizeListener = (0, _dom.listen)(window, 'resize', this._handlePosChange.bind(this), true);

      this._handlePosChange();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.offScrollListener && this.offScrollListener();
      this.offResizeListener && this.offResizeListener();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._handlePosChange();
    }
  }, {
    key: "_handlePosChange",
    value: function _handlePosChange(event) {
      var onPosChange = this.props.onPosChange;
      onPosChange && onPosChange(event, this.container);
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
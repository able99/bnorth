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

var View =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(View, _React$Component);

  function View() {
    (0, _classCallCheck2.default)(this, View);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(View).apply(this, arguments));
  }

  (0, _createClass2.default)(View, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          app = _this$props.app,
          name = _this$props.name,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["app", "name", "children"]);
      app.log.info('view render', name);
      return _react.default.createElement("div", (0, _extends2.default)({
        "data-view": name
      }, props), children);
    }
  }]);
  return View;
}(_react.default.Component);

exports.default = View;
module.exports = exports["default"];
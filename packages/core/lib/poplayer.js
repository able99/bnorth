"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

/**
 * @module
 */
var PopLayer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PopLayer, _React$Component);

  function PopLayer() {
    (0, _classCallCheck2.default)(this, PopLayer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PopLayer).apply(this, arguments));
  }

  (0, _createClass2.default)(PopLayer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          app = _this$props.app,
          Component = _this$props.content,
          props = _this$props.props,
          _this$props$options = _this$props.options,
          _id = _this$props$options._id,
          states = _this$props$options.states,
          optionProps = _this$props$options.optionProps,
          options = (0, _objectWithoutProperties2.default)(_this$props$options, ["_id", "states", "optionProps"]);
      props['data-poplayer'] = _id;

      if (typeof Component === 'function') {
        var stateProps = app.router.getPopLayerStates(_id);
        if (typeof optionProps === 'function') props = (0, _objectSpread2.default)({}, props, optionProps(stateProps, props));
        return _react.default.createElement(Component, (0, _extends2.default)({}, stateProps, {
          app: app,
          _id: _id,
          props: props,
          options: options,
          states: states
        }));
      } else if ((0, _typeof2.default)(Component) === 'object' && Component.type) {
        return (0, _react.cloneElement)(Component, props);
      } else {
        props.style = (0, _objectSpread2.default)({
          position: 'absolute'
        }, props.style);
        return _react.default.createElement("div", (0, _extends2.default)({
          onClick: function onClick() {
            return app.router.removePopLayer(_id);
          }
        }, props), String(Component));
      }
    }
  }]);
  return PopLayer;
}(_react.default.Component);

var _default = PopLayer;
exports.default = _default;
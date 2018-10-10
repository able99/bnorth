"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/es6.promise");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _ScrollSpy = _interopRequireDefault(require("./ScrollSpy"));

var _Panel = _interopRequireDefault(require("./Panel.Loader"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Dropload =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Dropload, _React$Component);

  function Dropload() {
    (0, _classCallCheck2.default)(this, Dropload);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dropload).apply(this, arguments));
  }

  (0, _createClass2.default)(Dropload, [{
    key: "_handlePosChange",
    value: function _handlePosChange(event, target) {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          onLoad = _this$props.onLoad;
      if (isLoading || !onLoad) return;
      var distance = Math.abs(target.scrollTop + target.clientHeight - target.scrollHeight);

      if (distance < 35) {
        !this.trigger && Promise.resolve().then(function () {
          return onLoad();
        });
        this.trigger = true;
      } else {
        this.trigger = false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _parseProps = (0, _props.default)(this.props, Dropload.props),
          disabled = _parseProps.disabled,
          isLoading = _parseProps.isLoading,
          onLoad = _parseProps.onLoad,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default.Loader : _parseProps$component,
          componentPanel = _parseProps.componentPanel,
          className = _parseProps.className,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["disabled", "isLoading", "onLoad", "component", "componentPanel", "className"]);

      if (disabled) return null;
      var classStr = 'padding-a-';
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, {
        onPosChange: this._handlePosChange.bind(this)
      }), _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        position: "top",
        isProgress: !isLoading,
        className: (0, _classes.default)(classStr, className)
      }, props)));
    }
  }]);
  return Dropload;
}(_react.default.Component);

var _default = Dropload;
exports.default = _default;
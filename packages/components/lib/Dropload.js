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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _ScrollSpy = _interopRequireDefault(require("./ScrollSpy"));

var _Panel = _interopRequireDefault(require("./Panel"));

require("./Loader");

/**
 * @module
 */

/**
 * 无限加载组价，滑动到底部时触发加载
 * 
 * @component 
 * @exportdefault
 * @augments BaseComponent
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
          onLoad = _this$props.onLoad,
          _this$props$offset = _this$props.offset,
          offset = _this$props$offset === void 0 ? 35 : _this$props$offset;
      if (isLoading || !onLoad) return;
      var distance = Math.abs(target.scrollTop + target.clientHeight - target.scrollHeight);

      if (distance < offset) {
        !this.trigger && onLoad();
        this.trigger = true;
      } else {
        this.trigger = false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent = (0, _BaseComponent2.default)(this.props, Dropload),
          disabled = _BaseComponent.disabled,
          isLoading = _BaseComponent.isLoading,
          onLoad = _BaseComponent.onLoad,
          offset = _BaseComponent.offset,
          _BaseComponent$compon = _BaseComponent.component,
          Component = _BaseComponent$compon === void 0 ? _Panel.default.Loader : _BaseComponent$compon,
          className = _BaseComponent.className,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["disabled", "isLoading", "onLoad", "offset", "component", "className"]);

      if (disabled) return null;
      var classStr = 'padding-a-';
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, {
        onPosChange: this._handlePosChange.bind(this)
      }), _react.default.createElement(Component, (0, _extends2.default)({
        position: "top",
        isProgress: false,
        "bc-visibility-hide": !isLoading,
        className: (0, _classes.default)(classStr, className)
      }, props)));
    }
  }]);
  return Dropload;
}(_react.default.Component);

Dropload.defaultProps = {};
/**
 * 设置是否为可用状态
 * @attribute module:Dropload.Dropload.disabled
 * @type {boolean}
 */

/**
 * 设置是否正在加载中
 * @attribute module:Dropload.Dropload.isLoading
 * @type {boolean}
 */

/**
 * 设置触发加载的回调函数
 * @attribute module:Dropload.Dropload.onLoad
 * @type {function}
 */

/**
 * 设置距离底部的距离，当即将滚动到底部，小于该距离时触发加载
 * @type {number|string}
 */

Dropload.defaultProps.offset = 35;
/**
 * 参见 BaseComponent
 */

Dropload.defaultProps.component = _Panel.default.Loader;
var _default = Dropload;
exports.default = _default;
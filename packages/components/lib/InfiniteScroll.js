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

var _Panel = _interopRequireDefault(require("./Panel"));

var _Loader = _interopRequireDefault(require("./Loader"));

var _ScrollSpy = _interopRequireDefault(require("./ScrollSpy"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var InfiniteScroll =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(InfiniteScroll, _React$Component);

  function InfiniteScroll() {
    (0, _classCallCheck2.default)(this, InfiniteScroll);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InfiniteScroll).apply(this, arguments));
  }

  (0, _createClass2.default)(InfiniteScroll, [{
    key: "handleScrollPosChange",
    value: function handleScrollPosChange(target, event) {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          onLoading = _this$props.onLoading;
      if (isLoading || !onLoading) return;
      var distance = Math.abs(target.scrollTop + target.clientHeight - target.scrollHeight);

      if (distance < 35) {
        !this.trigger && onLoading();
        this.trigger = true;
      } else {
        this.trigger = false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          disabled = _genCommonProps.disabled,
          isLoading = _genCommonProps.isLoading,
          onLoading = _genCommonProps.onLoading,
          _genCommonProps$compo = _genCommonProps.componentLoader,
          ComponentLoader = _genCommonProps$compo === void 0 ? _Loader.default : _genCommonProps$compo,
          loaderProps = _genCommonProps.loaderProps,
          _genCommonProps$compo2 = _genCommonProps.componentTitle,
          ComponentTitle = _genCommonProps$compo2 === void 0 ? _Panel.default : _genCommonProps$compo2,
          titleProps = _genCommonProps.titleProps,
          _genCommonProps$compo3 = _genCommonProps.component,
          Component = _genCommonProps$compo3 === void 0 ? _Panel.default : _genCommonProps$compo3,
          children = _genCommonProps.children,
          className = _genCommonProps.className,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["disabled", "isLoading", "onLoading", "componentLoader", "loaderProps", "componentTitle", "titleProps", "component", "children", "className"]);

      if (disabled) return null;
      var classStr = 'flex-display-block flex-direction-v flex-justify-center flex-align-center padding-a-';
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, {
        onScrollPositionChange: this.handleScrollPosChange.bind(this)
      }), _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _props.cxm)(classStr, className)
      }, props), children ? children : _react.default.createElement(ComponentLoader, loaderProps), children ? children : _react.default.createElement(ComponentTitle, titleProps)));
    }
  }]);
  return InfiniteScroll;
}(_react.default.Component);

var _default = InfiniteScroll;
exports.default = _default;
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
        !this.trigger && Promise.resolve().then(onLoading());
        this.trigger = true;
      } else {
        this.trigger = false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _parseProps = (0, _props.default)(this.props),
          disabled = _parseProps.disabled,
          isLoading = _parseProps.isLoading,
          onLoading = _parseProps.onLoading,
          _parseProps$component = _parseProps.componentLoader,
          ComponentLoader = _parseProps$component === void 0 ? _Loader.default : _parseProps$component,
          loaderProps = _parseProps.loaderProps,
          _parseProps$component2 = _parseProps.componentTitle,
          ComponentTitle = _parseProps$component2 === void 0 ? _Panel.default : _parseProps$component2,
          titleProps = _parseProps.titleProps,
          _parseProps$component3 = _parseProps.component,
          Component = _parseProps$component3 === void 0 ? _Panel.default : _parseProps$component3,
          children = _parseProps.children,
          className = _parseProps.className,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["disabled", "isLoading", "onLoading", "componentLoader", "loaderProps", "componentTitle", "titleProps", "component", "children", "className"]);

      if (disabled) return null;
      var classStr = 'flex-display-block flex-direction-v flex-justify-center flex-align-center padding-a-';
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, {
        onScrollPositionChange: this.handleScrollPosChange.bind(this)
      }), _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classes.default)(classStr, className)
      }, props), children ? children : _react.default.createElement(ComponentLoader, loaderProps), children ? children : _react.default.createElement(ComponentTitle, titleProps)));
    }
  }]);
  return InfiniteScroll;
}(_react.default.Component);

var _default = InfiniteScroll;
exports.default = _default;
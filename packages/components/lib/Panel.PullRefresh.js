"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Touchable"));

require("./Panel.Loader");

var _class, _temp;

_Panel.default.PullRefresh = (_temp = _class =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PullRefresh, _React$Component);

  function PullRefresh(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PullRefresh);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PullRefresh).call(this, props));
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(PullRefresh, [{
    key: "handleMove",
    value: function handleMove(event, target) {
      if (target.scrollTop > 0) return;
      this.setState({
        offset: Math.max(event.deltaY, 0)
      });
      !this.props.isLoading && this.state.offset && event.preventDefault();
    }
  }, {
    key: "handleEnd",
    value: function handleEnd(event, target) {
      var _this$props = this.props,
          triggerOffset = _this$props.triggerOffset,
          onLoad = _this$props.onLoad;
      var offset = this.state.offset;
      this.setState({
        offset: 0
      });
      if (offset >= triggerOffset && onLoad) onLoad();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _parseProps = (0, _props.default)(this.props, _Panel.default.PullRefresh.porps),
          isLoading = _parseProps.isLoading,
          onLoad = _parseProps.onLoad,
          triggerOffset = _parseProps.triggerOffset,
          loaderProps = _parseProps.loaderProps,
          titleLoading = _parseProps.titleLoading,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["isLoading", "onLoad", "triggerOffset", "loaderProps", "titleLoading", "children"]);

      return _react.default.createElement(_Panel.default.Touchable, (0, _extends2.default)({
        direction: "vertical",
        onPan: this.handleMove.bind(this),
        onPanCancel: function onPanCancel(el, e) {
          return _this2.handleEnd(el, e);
        },
        onPanEnd: function onPanEnd(el, e) {
          return _this2.handleEnd(el, e);
        }
      }, props), _react.default.createElement(PullRefresh._Loader, (0, _extends2.default)({
        isLoading: isLoading,
        offset: this.state.offset,
        triggerOffset: triggerOffset
      }, loaderProps), titleLoading), children);
    }
  }]);
  return PullRefresh;
}(_react.default.Component), (0, _defineProperty2.default)(_class, "defaultProps", {
  triggerOffset: 60
}), _temp);

_Panel.default.PullRefresh._Loader = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Panel.default.PullRefresh._Loader.props),
      isLoading = _parseProps2.isLoading,
      offset = _parseProps2.offset,
      triggerOffset = _parseProps2.triggerOffset,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default.Loader : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      style = _parseProps2.style,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isLoading", "offset", "triggerOffset", "component", "componentPanel", "className", "style"]);

  var classStr = 'overflow-a-hidden transition-property-height';
  var styleSet = {
    height: 0
  };
  if (offset > 0) styleSet.height = offset;
  if (isLoading) styleSet.height = triggerOffset;
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    position: "top",
    isProgress: !isLoading,
    progress: offset * 100 / triggerOffset,
    className: (0, _classes.default)(classStr, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props));
};

var _default = _Panel.default;
exports.default = _default;
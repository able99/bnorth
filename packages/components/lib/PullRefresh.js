"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _BaseComponent2 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Touchable = _interopRequireDefault(require("./Touchable"));

var _Loader = require("./Loader");

/**
 * @module
 */
// PullRefresh
// ------------------------

/**
 * 支持滚动与下拉刷新的小面板
 * @component
 * @exportdefault
 * @augments BaseComponent
 */
var PullRefresh =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PullRefresh, _React$Component);

  function PullRefresh() {
    (0, _classCallCheck2.default)(this, PullRefresh);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PullRefresh).apply(this, arguments));
  }

  (0, _createClass2.default)(PullRefresh, [{
    key: "handleMove",
    value: function handleMove(event, element) {
      if (element.scrollTop > 0) return;
      this.setState({
        offset: Math.max(event.deltaY, 0)
      });
      !this.props.isLoading && this.state.offset && event.preventDefault();
    }
  }, {
    key: "handleEnd",
    value: function handleEnd(event, element) {
      var _this$props = this.props,
          triggerOffset = _this$props.triggerOffset,
          onLoad = _this$props.onLoad;

      var _ref = this.state || {},
          _ref$offset = _ref.offset,
          offset = _ref$offset === void 0 ? 0 : _ref$offset;

      if (offset) {
        this.setState({
          offset: 0
        });
        if (offset >= triggerOffset && onLoad) onLoad();
        this.mark = true;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      _BaseComponent2.domIsMouse && (0, _BaseComponent2.domFindNode)(this).addEventListener("click", function (event) {
        if (_this.mark) {
          event.stopPropagation();
          _this.mark = false;
        }
      }, true);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, PullRefresh),
          isLoading = _BaseComponent.isLoading,
          onLoad = _BaseComponent.onLoad,
          triggerOffset = _BaseComponent.triggerOffset,
          loaderProps = _BaseComponent.loaderProps,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["isLoading", "onLoad", "triggerOffset", "loaderProps", "children"]);

      var _ref2 = this.state || {},
          _ref2$offset = _ref2.offset,
          offset = _ref2$offset === void 0 ? 0 : _ref2$offset;

      var classNamePre = 'scrollable-y-';
      var classNamePreLoader = 'overflow-a-hidden transition-property-height';
      var stylePreLoader = {
        height: 0
      };
      if (offset > 0) stylePreLoader.height = offset;
      if (isLoading) stylePreLoader.height = triggerOffset;
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        componentTransform: _Touchable.default,
        recognizers: {
          pan: {
            enable: true
          }
        },
        direction: "vertical",
        options: {
          touchAction: 'pan-y'
        },
        onPan: this.handleMove.bind(this),
        onPanCancel: function onPanCancel(el, e) {
          return _this2.handleEnd(el, e);
        },
        onPanEnd: function onPanEnd(el, e) {
          return _this2.handleEnd(el, e);
        },
        classNamePre: classNamePre
      }, props), _react.default.createElement(_Panel.default, (0, _extends2.default)({
        componentTransform: _Loader.PanelLoader,
        position: "top",
        isProgress: !isLoading,
        progress: offset * 100 / triggerOffset,
        classNamePre: classNamePreLoader,
        stylePre: stylePreLoader
      }, loaderProps)), children);
    }
  }]);
  return PullRefresh;
}(_react.default.Component);

PullRefresh.defaultProps = {};
/**
 * 下拉触发刷新的长度
 * @type {number}
 */

PullRefresh.defaultProps.triggerOffset = 60;
/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:PullRefresh~PullRefresh.isLoading
 * @type {boolean}
 */

/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:PullRefresh~PullRefresh.onLoad
 * @type {function}
 */

/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:PullRefresh~PullRefresh.loaderProps
 * @type {object}
 */

var _default = PullRefresh;
exports.default = _default;
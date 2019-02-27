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

var _BaseComponent2 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Touchable = _interopRequireDefault(require("./Touchable"));

var _Loader = require("./Loader");

/**
 * @module
 */

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

      var _ref = this.state || {},
          _ref$offset = _ref.offset,
          offset = _ref$offset === void 0 ? 0 : _ref$offset;

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
        onPan: function onPan(event, element) {
          if (element.scrollTop > 0) return;

          _this2.setState({
            offset: Math.max(event.deltaY, 0)
          });

          !_this2.props.isLoading && _this2.state.offset && event.preventDefault();
        },
        onPanEnd: function onPanEnd() {
          if (offset) {
            _this2.setState({
              offset: 0
            }, function () {
              return offset >= triggerOffset && onLoad && onLoad();
            });

            _this2.mark = true;
          }
        },
        onPanCancel: function onPanCancel() {
          if (offset) {
            _this2.setState({
              offset: 0
            }, function () {
              return offset >= triggerOffset && onLoad && onLoad();
            });

            _this2.mark = true;
          }
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

Object.defineProperty(PullRefresh, "PullRefresh", {
  get: function get() {
    return PullRefresh;
  },
  set: function set(val) {
    PullRefresh = val;
  }
});
var _default = PullRefresh;
exports.default = _default;
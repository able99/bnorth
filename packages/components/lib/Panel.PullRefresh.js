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

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Touchable"));

require("./Panel.Loader");

var _dom = require("./utils/dom");

/**
 * @module
 */
var _default = _Panel.default; // PullRefresh
// ------------------------

/**
 * 支持滚动与下拉刷新的小面板
 * @component
 * @mount Panel.PullRefresh
 * @augments BaseComponent
 */

exports.default = _default;

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
      var offset = this.state && this.state.offset || 0;

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

      _dom.domIsMouse && (0, _dom.domFindNode)(this).addEventListener("click", function (event) {
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

      var _parseProps = (0, _props.default)(this.props, PullRefresh.porps),
          isLoading = _parseProps.isLoading,
          onLoad = _parseProps.onLoad,
          triggerOffset = _parseProps.triggerOffset,
          loaderProps = _parseProps.loaderProps,
          titleLoading = _parseProps.titleLoading,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["isLoading", "onLoad", "triggerOffset", "loaderProps", "titleLoading", "children"]);

      var offset = this.state && this.state.offset || 0;
      return _react.default.createElement(_Panel.default.Touchable, (0, _extends2.default)({
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
        }
      }, props), _react.default.createElement(_Refresh, (0, _extends2.default)({
        isLoading: isLoading,
        offset: offset,
        triggerOffset: triggerOffset
      }, loaderProps), titleLoading), children);
    }
  }]);
  return PullRefresh;
}(_react.default.Component);

Object.defineProperty(_Panel.default, "PullRefresh", {
  get: function get() {
    return PullRefresh;
  },
  set: function set(val) {
    PullRefresh = val;
  }
});
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

/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:PullRefresh~PullRefresh.titleLoading
 * @type {string|number|component|element}
 */
// Panel PushRefresh Refresh
// ------------------

/**
 * 支持滚动与下拉刷新的小面板的下拉进度组件
 * @component
 * @mount Panel.PushRefresh.Refresh
 * @private 
 * @augments BaseComponent
 */

var _Refresh = function Refresh(aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Refresh.props),
      isLoading = _parseProps2.isLoading,
      offset = _parseProps2.offset,
      triggerOffset = _parseProps2.triggerOffset,
      Component = _parseProps2.component,
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

Object.defineProperty(_Panel.default.PullRefresh, "Refresh", {
  get: function get() {
    return _Refresh;
  },
  set: function set(val) {
    _Refresh = val;
  }
});
_Refresh.defaultProps = {};
_Refresh.defaultProps.component = _Panel.default.Loader;
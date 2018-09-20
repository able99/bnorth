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

var _props = require("./utils/props");

var _Panel = _interopRequireDefault(require("./Panel.Touchable"));

var _Loader = _interopRequireDefault(require("./Loader"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var PullRefresh =
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
    value: function handleMove(el, e) {
      console.log(el, e);
      if (el.scrollTop > 0) return;
      this.setState({
        offset: Math.max(e.deltaY, 0)
      }); // let scrollTop = this.el?this.el.scrollTop:0;
      // let offset = to.y-from.y;
      // // console.log(11111,Math.max(offset-scrollTop, 0), offset, scrollTop);
      // this.setState({offset: Math.max(offset-scrollTop, 0)});

      !this.props.isLoading && this.state.offset && e.preventDefault(); // e.srcEvent.preventDefault();
      //  e.srcEvent.stopPropagation();
    }
  }, {
    key: "handleEnd",
    value: function handleEnd(el, e) {
      var offset = this.state.offset;
      this.setState({
        offset: 0
      });
      if (offset >= this.props.triggerOffset && this.props.onRefresh) this.props.onRefresh(); // e.preventDefault();
      // e.srcEvent.preventDefault();
      // e.srcEvent.stopPropagation()
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          isLoading = _genCommonProps.isLoading,
          triggerOffset = _genCommonProps.triggerOffset,
          refreshProps = _genCommonProps.refreshProps,
          loaderProps = _genCommonProps.loaderProps,
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["isLoading", "triggerOffset", "refreshProps", "loaderProps", "children"]);

      return _react.default.createElement(_Panel.default.Touchable, (0, _extends2.default)({
        options: {
          recognizers: {
            pan: {
              threshold: 3,
              direction: Hammer.DIRECTION_VERTICAL
            }
          }
        },
        onPan: function onPan(el, e) {
          return _this2.handleMove(el, e);
        },
        onPanCancel: function onPanCancel(el, e) {
          return _this2.handleEnd(el, e);
        },
        onPanEnd: function onPanEnd(el, e) {
          return _this2.handleEnd(el, e);
        }
      }, props), _react.default.createElement(PullRefresh._Loader, (0, _extends2.default)({
        isLoading: isLoading,
        offset: this.state.offset,
        triggerOffset: triggerOffset,
        loaderProps: loaderProps
      }, refreshProps)), children);
    }
  }]);
  return PullRefresh;
}(_react.default.Component);

(0, _defineProperty2.default)(PullRefresh, "defaultProps", {
  triggerOffset: 60
});

PullRefresh._Loader = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      isLoading = _genCommonProps2.isLoading,
      offset = _genCommonProps2.offset,
      triggerOffset = _genCommonProps2.triggerOffset,
      title = _genCommonProps2.title,
      loader = _genCommonProps2.loader,
      _genCommonProps2$load = _genCommonProps2.loaderProps,
      loaderProps = _genCommonProps2$load === void 0 ? {} : _genCommonProps2$load,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Panel.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      style = _genCommonProps2.style,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["isLoading", "offset", "triggerOffset", "title", "loader", "loaderProps", "component", "className", "style", "children"]);

  var classStr = 'overflow-hidden transition-property-height flex-display-block flex-direction-v flex-justify-center flex-align-center';
  var styleSet = {
    height: 0
  };
  if (offset > 0) styleSet.height = offset;
  if (isLoading) styleSet.height = triggerOffset;
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className),
    style: (0, _objectSpread2.default)({}, styleSet, style)
  }, props), !children && loader ? loader : null, !children && !loader ? _react.default.createElement(_Loader.default, (0, _extends2.default)({
    isProgress: !isLoading,
    progress: offset * 100 / triggerOffset
  }, loaderProps)) : null, !children && title ? title : null, children);
};

_Panel.default.PullRefresh = PullRefresh;
var _default = _Panel.default;
exports.default = _default;
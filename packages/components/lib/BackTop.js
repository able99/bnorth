"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.number.constructor");

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

var _ScrollSpy = _interopRequireDefault(require("./ScrollSpy"));

var _Fab = _interopRequireDefault(require("./Fab"));

var _Icon = require("./Icon");

/**
 * @module
 */

/**
 * 返回顶部的小组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 * @augments module:Fab.Fab
 */
var BackTop =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(BackTop, _React$Component);

  function BackTop() {
    (0, _classCallCheck2.default)(this, BackTop);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BackTop).apply(this, arguments));
  }

  (0, _createClass2.default)(BackTop, [{
    key: "scrollToTop",
    value: function scrollToTop() {
      this.container && this.container.scrollTop && (this.container.scrollTop = 0);
    }
  }, {
    key: "isShow",
    value: function isShow() {
      return this.state && this.state.isShow;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.isShow() ? this.hide() : this.show();
    }
  }, {
    key: "show",
    value: function show() {
      !this.isShow() && this.setState({
        isShow: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.isShow() && this.setState({
        isShow: false
      });
    }
  }, {
    key: "_handlePosChange",
    value: function _handlePosChange(event, el) {
      this.container = el;
      var _this$props = this.props,
          _this$props$calc = _this$props.calc,
          calc = _this$props$calc === void 0 ? BackTop.calc : _this$props$calc,
          param = _this$props.param;
      calc(param, this.container) ? this.show() : this.hide();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, BackTop),
          onClick = _BaseComponent.onClick,
          calc = _BaseComponent.calc,
          param = _BaseComponent.param,
          scrollSpyProps = _BaseComponent.scrollSpyProps,
          Content = _BaseComponent.content,
          contentProps = _BaseComponent.contentProps,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["onClick", "calc", "param", "scrollSpyProps", "content", "contentProps", "children"]);

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, (0, _extends2.default)({
        onPosChange: this._handlePosChange.bind(this)
      }, scrollSpyProps)), this.isShow() ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
        onClick: (0, _BaseComponent2.chainedFuncs)(function () {
          return _this.scrollToTop();
        }, onClick)
      }, props), _react.default.createElement(Content, (0, _extends2.default)({
        name: "backTop:^"
      }, contentProps), children)) : null);
    }
  }]);
  return BackTop;
}(_react.default.Component);

exports.default = BackTop;
BackTop.defaultProps = {};
/**
 * 设置出现时机的计算函数
 * @attribute module:BackTop.calc
 * @type {function}
 * @default module:BackTop.calc
 */

/**
 * 设置出现时机的计算参数
 * @type {number|string}
 */

BackTop.defaultProps.param = "100%";
/**
 * 设置滚动监控组件的属性
 * @attribute module:BackTop.scrollSpyProps
 * @type {object}
 */

/**
 * 设置内容的组件
 */

BackTop.defaultProps.content = _Icon.PanelIcon;
/**
 * 设置图标子组件的属性
 * @attribute module:BackTop.contentProps
 * @type {function}
 */

BackTop.defaultProps.componentTransform = _Fab.default;
/**
 * 默认的计算是否出现回到顶部按钮的函数
 * @member
 */

BackTop.calc = function (param, container) {
  if (!isNaN(param)) {
    return container.scrollTop >= param;
  } else if (typeof param === 'string' && /\d*%/.test(param)) {
    return container.scrollTop >= (container ? (0, _BaseComponent2.domOffset)(container).height * Number(param.slice(0, -1)) / 100 : 0);
  }
};
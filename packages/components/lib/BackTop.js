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
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Fab.Fab
 * @augments module:PanelIcon~PanelIcon
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
      if (this.dock) this.dock.scrollTop = 0;
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
    key: "render",
    value: function render() {
      var _this = this;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, BackTop),
          onClick = _BaseComponent.onClick,
          checkFunc = _BaseComponent.checkFunc,
          checkParam = _BaseComponent.checkParam,
          scrollSpyProps = _BaseComponent.scrollSpyProps,
          contentProps = _BaseComponent.contentProps,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["onClick", "checkFunc", "checkParam", "scrollSpyProps", "contentProps", "children"]);

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, (0, _extends2.default)({
        onPosChange: function onPosChange(event, el) {
          _this.dock = el;
          checkFunc(checkParam, _this.dock) ? _this.show() : _this.hide();
        }
      }, scrollSpyProps)), this.isShow() ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: _Fab.default,
        onClick: (0, _BaseComponent2.chainedFuncs)(function () {
          return _this.scrollToTop();
        }, onClick)
      }, props), _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: _Icon.PanelIcon,
        name: "backTop:^"
      }, contentProps), children)) : null);
    }
  }]);
  return BackTop;
}(_react.default.Component);

BackTop.defaultProps = {};
/**
 * 设置出现时机的计算函数
 * @type {function}
 */

BackTop.defaultProps.checkFunc = function (checkParam, dock) {
  if (!isNaN(checkParam)) {
    return dock.scrollTop >= checkParam;
  } else if (typeof checkParam === 'string' && /\d*%/.test(checkParam)) {
    return dock.scrollTop >= (dock ? (0, _BaseComponent2.domOffset)(dock).height * Number(checkParam.slice(0, -1)) / 100 : 0);
  }
};
/**
 * 设置出现时机的计算参数
 * @type {number|string}
 */


BackTop.defaultProps.checkParam = "100%";
/**
 * 设置滚动监控组件的属性
 * @attribute module:BackTop.scrollSpyProps
 * @type {object}
 */

/**
 * 设置内容的属性
 * @attribute module:BackTop.contentProps
 * @type {object}
 */

Object.defineProperty(BackTop, "BackTop", {
  get: function get() {
    return BackTop;
  },
  set: function set(val) {
    BackTop = val;
  }
});
BackTop.isBnorth = true;
BackTop.defaultProps['b-precast'] = {};
var _default = BackTop;
exports.default = _default;
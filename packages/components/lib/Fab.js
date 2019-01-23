"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _dom = require("./utils/dom");

var _Button = _interopRequireDefault(require("./Button"));

/**
 * @module
 */

/**
 * 浮动按钮组件
 * 
 * 浮动按钮组件是浮动在指定容器上的组件，可设置浮动的位置，边缘距离和浮动的映射组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
var Fab =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Fab, _React$Component);

  function Fab() {
    (0, _classCallCheck2.default)(this, Fab);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Fab).apply(this, arguments));
  }

  (0, _createClass2.default)(Fab, [{
    key: "_handleRef",
    value: function _handleRef(e) {
      this.container = (0, _dom.domFindContainer)(e, this.props.container);
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this,
          _classSet;

      var _parseProps = (0, _props.default)(this.props, Fab.props),
          h = _parseProps.h,
          v = _parseProps.v,
          margin = _parseProps.margin,
          container = _parseProps.container,
          Component = _parseProps.component,
          className = _parseProps.className,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["h", "v", "margin", "container", "component", "className"]);

      if ((container === true || typeof container === 'string') && !this.container) {
        return _react.default.createElement("span", {
          ref: function ref(e) {
            return e && _this._handleRef(e);
          },
          style: {
            fontSize: 0
          }
        });
      }

      var classStr = 'position-absolute';
      var classSet = (_classSet = {}, (0, _defineProperty2.default)(_classSet, "margin-top-".concat(margin !== true ? margin : ''), margin && v === 'start'), (0, _defineProperty2.default)(_classSet, "margin-left-".concat(margin !== true ? margin : ''), margin && h === 'start'), (0, _defineProperty2.default)(_classSet, "margin-bottom-".concat(margin !== true ? margin : ''), margin && v === 'end'), (0, _defineProperty2.default)(_classSet, "margin-right-".concat(margin !== true ? margin : ''), margin && h === 'end'), (0, _defineProperty2.default)(_classSet, 'translate-center-x', h === 'center' && v !== 'center'), (0, _defineProperty2.default)(_classSet, 'translate-center-y', h !== 'center' && v === 'center'), (0, _defineProperty2.default)(_classSet, 'translate-center-a', h === 'center' && v === 'center'), (0, _defineProperty2.default)(_classSet, 'offset-left-center', h === 'center'), (0, _defineProperty2.default)(_classSet, 'offset-top-center', v === 'center'), (0, _defineProperty2.default)(_classSet, 'offset-left-start', h === 'start'), (0, _defineProperty2.default)(_classSet, 'offset-right-start', h === 'end'), (0, _defineProperty2.default)(_classSet, 'offset-top-start', v === 'start'), (0, _defineProperty2.default)(_classSet, 'offset-bottom-start', v === 'end'), _classSet);

      var component = _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classes.default)(classStr, classSet, className)
      }, props));

      return this.container ? (0, _dom.domCreatePortal)(component, this.container) : component;
    }
  }]);
  return Fab;
}(_react.default.Component);

Fab.defaultProps = {};
/**
 * 设置组件在容器内容水平位置，取值为 start，center 和 end
 * @type {string}
 */

Fab.defaultProps.h = 'end';
/**
 * 设置组件在容器内容垂直位置，取值为 start，center 和 end
 * @type {string}
 */

Fab.defaultProps.v = 'end';
/**
 * 设置组件相对容器边缘的边距，true 为使用默认边距
 * @type {boolean|string}
 */

Fab.defaultProps.margin = true;
/**
 * 设置浮动的容器。
 * 
 * 不设置表示相对具有 relative，absolute 或 fixed 的 css position 属性的父元素。
 * 设置则作为 container 参数获取指定 container，参见 domFindContainer 函数
 * @attribute module:Fab.Fab.container
 * @type {boolean|string}
 */

/**
 * 参见 BaseComponent
 */

Fab.defaultProps.component = _Button.default;
var _default = Fab;
exports.default = _default;
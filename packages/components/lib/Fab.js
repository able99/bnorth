"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _BaseComponent2 = _interopRequireWildcard(require("./BaseComponent"));

var _Button = _interopRequireDefault(require("./Button"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */

/**
 * 浮动按钮组件
 * 
 * 浮动按钮组件是浮动在指定容器上的组件，可设置浮动的位置，边缘距离和浮动的映射组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments module:Button.Button
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
    key: "render",
    value: function render() {
      var _this = this,
          _classNamePre;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, Fab),
          h = _BaseComponent.h,
          v = _BaseComponent.v,
          margin = _BaseComponent.margin,
          container = _BaseComponent.container,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["h", "v", "margin", "container"]);

      if ((container === true || typeof container === 'string') && !this.container) {
        return _react.default.createElement("span", {
          ref: function ref(e) {
            if (!e) return;
            _this.container = (0, _BaseComponent2.domFindContainer)(e, _this.props.container);

            _this.forceUpdate();
          },
          style: {
            fontSize: 0
          }
        });
      }

      var classNamePre = (_classNamePre = {
        'position-absolute': true
      }, (0, _defineProperty2.default)(_classNamePre, "margin-top-".concat(margin !== true ? margin : ''), margin && v === 'start'), (0, _defineProperty2.default)(_classNamePre, "margin-left-".concat(margin !== true ? margin : ''), margin && h === 'start'), (0, _defineProperty2.default)(_classNamePre, "margin-bottom-".concat(margin !== true ? margin : ''), margin && v === 'end'), (0, _defineProperty2.default)(_classNamePre, "margin-right-".concat(margin !== true ? margin : ''), margin && h === 'end'), (0, _defineProperty2.default)(_classNamePre, 'translate-center-x', h === 'center' && v !== 'center'), (0, _defineProperty2.default)(_classNamePre, 'translate-center-y', h !== 'center' && v === 'center'), (0, _defineProperty2.default)(_classNamePre, 'translate-center-a', h === 'center' && v === 'center'), (0, _defineProperty2.default)(_classNamePre, 'offset-left-center', h === 'center'), (0, _defineProperty2.default)(_classNamePre, 'offset-top-center', v === 'center'), (0, _defineProperty2.default)(_classNamePre, 'offset-left-start', h === 'start'), (0, _defineProperty2.default)(_classNamePre, 'offset-right-start', h === 'end'), (0, _defineProperty2.default)(_classNamePre, 'offset-top-start', v === 'start'), (0, _defineProperty2.default)(_classNamePre, 'offset-bottom-start', v === 'end'), _classNamePre);

      var component = _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: _Button.default,
        classNamePre: classNamePre
      }, props));

      return this.container ? (0, _BaseComponent2.domCreatePortal)(component, this.container) : component;
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

Object.defineProperty(Fab, "Fab", {
  get: function get() {
    return Fab;
  },
  set: function set(val) {
    Fab = val;
  }
});
var _default = Fab;
exports.default = _default;
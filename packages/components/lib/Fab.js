"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireWildcard(require("./BaseComponent"));

var _Button = _interopRequireDefault(require("./Button"));

var _Panel = _interopRequireDefault(require("./Panel"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 浮动按钮组件
 * 
 * 浮动按钮组件是浮动在指定容器上的组件，可设置浮动的位置，边缘距离和浮动的映射组件
 * 
 * 对于滚动组件上的浮动按钮，需要设置滚动组件父组件的 dock 属性，使浮动组件悬浮在 dock 上保持滚动时位置固定
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.dock !== this.props.dock) {
        this.dock = undefined;
        this.forceUpdate();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this,
          _objectSpread2;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, Fab),
          h = _BaseComponent.h,
          v = _BaseComponent.v,
          margin = _BaseComponent.margin,
          dock = _BaseComponent.dock,
          classNamePre = _BaseComponent.classNamePre,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["h", "v", "margin", "dock", "classNamePre"]);

      if ((dock === true || typeof dock === 'string') && !this.dock) {
        return _react.default.createElement("span", {
          ref: function ref(e) {
            if (!e) return;
            _this.dock = (0, _BaseComponent2.domFindDock)(e, dock);

            _this.forceUpdate();
          },
          style: {
            fontSize: 0
          }
        });
      }

      classNamePre = _objectSpread((_objectSpread2 = {
        'position-absolute': true
      }, (0, _defineProperty3.default)(_objectSpread2, "margin-top-".concat(margin !== true ? margin : ''), margin && v === 'start'), (0, _defineProperty3.default)(_objectSpread2, "margin-left-".concat(margin !== true ? margin : ''), margin && h === 'start'), (0, _defineProperty3.default)(_objectSpread2, "margin-bottom-".concat(margin !== true ? margin : ''), margin && v === 'end'), (0, _defineProperty3.default)(_objectSpread2, "margin-right-".concat(margin !== true ? margin : ''), margin && h === 'end'), (0, _defineProperty3.default)(_objectSpread2, 'translate-center-x', h === 'center' && v !== 'center'), (0, _defineProperty3.default)(_objectSpread2, 'translate-center-y', h !== 'center' && v === 'center'), (0, _defineProperty3.default)(_objectSpread2, 'translate-center-a', h === 'center' && v === 'center'), (0, _defineProperty3.default)(_objectSpread2, 'offset-left-center', h === 'center'), (0, _defineProperty3.default)(_objectSpread2, 'offset-top-center', v === 'center'), (0, _defineProperty3.default)(_objectSpread2, 'offset-left-start', h === 'start'), (0, _defineProperty3.default)(_objectSpread2, 'offset-right-start', h === 'end'), (0, _defineProperty3.default)(_objectSpread2, 'offset-top-start', v === 'start'), (0, _defineProperty3.default)(_objectSpread2, 'offset-bottom-start', v === 'end'), _objectSpread2), classNamePre);

      var component = _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: _Button.default,
        classNamePre: classNamePre
      }, props));

      return this.dock ? (0, _BaseComponent2.domCreatePortal)(component, this.dock) : component;
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
 * 设置则作为 dock 参数获取指定 dock，参见 domFindDock 函数
 * @attribute module:Fab.Fab.dock
 * @type {boolean|string}
 */

(0, _defineProperty2.default)(Fab, "Fab", {
  get: function get() {
    return Fab;
  },
  set: function set(val) {
    Fab = val;
  }
});
Fab.isBnorth = true;
Fab.defaultProps['b-precast'] = {};
var _default = Fab;
exports.default = _default;
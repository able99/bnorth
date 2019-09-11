"use strict";

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

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _ScrollSpy = _interopRequireDefault(require("./ScrollSpy"));

var _Loader = require("./Loader");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 无限加载组价，滑动到底部时触发加载
 * 
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
var Dropload =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Dropload, _React$Component);

  function Dropload() {
    (0, _classCallCheck2.default)(this, Dropload);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dropload).apply(this, arguments));
  }

  (0, _createClass2.default)(Dropload, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, Dropload),
          disabled = _BaseComponent.disabled,
          isLoading = _BaseComponent.isLoading,
          onLoad = _BaseComponent.onLoad,
          offset = _BaseComponent.offset,
          classNamePre = _BaseComponent.classNamePre,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["disabled", "isLoading", "onLoad", "offset", "classNamePre"]);

      if (disabled) return null;
      classNamePre = _objectSpread({
        'padding-a-': true
      }, classNamePre);
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ScrollSpy.default, {
        onPosChange: function onPosChange(event, target) {
          if (isLoading || !onLoad) return;
          var distance = Math.abs(target.scrollTop + target.clientHeight - target.scrollHeight);

          if (distance < offset) {
            !_this.trigger && onLoad();
            _this.trigger = true;
          } else {
            _this.trigger = false;
          }
        }
      }), _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: _Loader.PanelLoader,
        position: "top",
        isProgress: false,
        "bc-visibility-hide": !isLoading,
        classNamePre: classNamePre
      }, props)));
    }
  }]);
  return Dropload;
}(_react.default.Component);

Dropload.defaultProps = {};
/**
 * 设置是否为可用状态
 * @attribute module:Dropload.Dropload.disabled
 * @type {boolean}
 */

/**
 * 设置是否正在加载中
 * @attribute module:Dropload.Dropload.isLoading
 * @type {boolean}
 */

/**
 * 设置触发加载的回调函数
 * @attribute module:Dropload.Dropload.onLoad
 * @type {function}
 */

/**
 * 设置距离底部的距离，当即将滚动到底部，小于该距离时触发加载
 * @type {number|string}
 */

Dropload.defaultProps.offset = 35;
(0, _defineProperty2.default)(Dropload, "Dropload", {
  get: function get() {
    return Dropload;
  },
  set: function set(val) {
    Dropload = val;
  }
});
Dropload.isBnorth = true;
Dropload.defaultProps['b-precast'] = {};
var _default = Dropload;
exports.default = _default;
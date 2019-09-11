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

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _BaseComponent2 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 横屏组件，需要有容器组件且，容器组件尺寸不能依赖横屏组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
var Landscape =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Landscape, _React$Component);

  function Landscape() {
    (0, _classCallCheck2.default)(this, Landscape);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Landscape).apply(this, arguments));
  }

  (0, _createClass2.default)(Landscape, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.dock = (0, _BaseComponent2.domFindDock)(this, this.props.dock);
      this.forceUpdate();
      this.offResizeListener = (0, _BaseComponent2.listen)(window, 'resize', function () {
        return _this.forceUpdate();
      }, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.offResizeListener && this.offResizeListener();
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.dock) return _react.default.createElement("span", {
        style: {
          fontSize: 0
        }
      });

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, Landscape),
          dock = _BaseComponent.dock,
          classNamePre = _BaseComponent.classNamePre,
          stylePre = _BaseComponent.stylePre,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["dock", "classNamePre", "stylePre"]);

      var width = this.dock.clientWidth;
      var height = this.dock.clientHeight;
      classNamePre = _objectSpread({
        'position-relative': true
      }, classNamePre);
      stylePre = this.dock && height > width ? _objectSpread({
        width: height,
        height: width,
        top: (height - width) / 2,
        left: (width - height) / 2
      }, (0, _animation.transform)('rotate', '90deg'), {}, stylePre) : {};
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        full: true,
        classNamePre: classNamePre,
        stylePre: stylePre
      }, props));
    }
  }]);
  return Landscape;
}(_react.default.Component);

Landscape.defaultProps = {};
/**
 * 设置容器，横屏时以容器为参照横屏旋转
 * @type {element}
 */

Landscape.defaultProps.dock = true;
(0, _defineProperty2.default)(Landscape, "Landscape", {
  get: function get() {
    return Landscape;
  },
  set: function set(val) {
    Landscape = val;
  }
});
Landscape.isBnorth = true;
Landscape.defaultProps['b-precast'] = {};
var _default = Landscape;
exports.default = _default;
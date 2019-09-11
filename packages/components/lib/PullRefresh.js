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

var _Panel = _interopRequireDefault(require("./Panel"));

var _Touchable = _interopRequireDefault(require("./Touchable"));

var _Loader = require("./Loader");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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

      if (_BaseComponent2.domIsMouse) {
        (0, _BaseComponent2.domFindNode)(this).addEventListener("mousedown", function (event) {
          _this.mark = false;
        }, true);
        (0, _BaseComponent2.domFindNode)(this).addEventListener("click", function (event) {
          if (_this.mark) {
            event.stopPropagation();
            _this.mark = false;
          }
        }, true);
      }
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
          classNamePre = _BaseComponent.classNamePre,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["isLoading", "onLoad", "triggerOffset", "loaderProps", "classNamePre", "children"]);

      var _ref = this.state || {},
          _ref$offset = _ref.offset,
          offset = _ref$offset === void 0 ? 0 : _ref$offset;

      classNamePre = _objectSpread({
        'scrollable-y-': true
      }, classNamePre);
      var classNamePreLoader = 'overflow-a-hidden transition-property-height';
      var stylePreLoader = {
        height: 0
      };
      if (offset > 0) stylePreLoader.height = offset;
      if (isLoading) stylePreLoader.height = triggerOffset;
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
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

            if (_BaseComponent2.domIsMouse) _this2.mark = true;
          }
        },
        onPanCancel: function onPanCancel() {
          if (offset) {
            _this2.setState({
              offset: 0
            }, function () {
              return offset >= triggerOffset && onLoad && onLoad();
            });

            if (_BaseComponent2.domIsMouse) _this2.mark = true;
          }
        },
        component: _Touchable.default,
        classNamePre: classNamePre
      }, props), _react.default.createElement(_Panel.default, (0, _extends2.default)({
        position: "top",
        isProgress: !isLoading,
        progress: offset * 100 / triggerOffset,
        component: _Loader.PanelLoader,
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

(0, _defineProperty2.default)(PullRefresh, "PullRefresh", {
  get: function get() {
    return PullRefresh;
  },
  set: function set(val) {
    PullRefresh = val;
  }
});
PullRefresh.isBnorth = true;
PullRefresh.defaultProps['b-precast'] = {};
var _default = PullRefresh;
exports.default = _default;
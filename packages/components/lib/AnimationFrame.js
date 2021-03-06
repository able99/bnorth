"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _animationFrame = _interopRequireDefault(require("@bnorth/rich.css/lib/styles/animationFrame"));

var _BaseComponent = require("./BaseComponent");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 动画组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
var AnimationFrame =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(AnimationFrame, _React$Component);

  function AnimationFrame() {
    (0, _classCallCheck2.default)(this, AnimationFrame);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AnimationFrame).apply(this, arguments));
  }

  (0, _createClass2.default)(AnimationFrame, [{
    key: "handleFinished",
    value: function handleFinished() {
      var _this$props = this.props,
          rewind = _this$props.rewind,
          params = _this$props.params,
          onFinished = _this$props.onFinished;
      onFinished && onFinished(params, rewind);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      var _this$props2 = this.props,
          play = _this$props2.play,
          rewind = _this$props2.rewind,
          duration = _this$props2.duration,
          frameFunc = _this$props2.frameFunc,
          params = _this$props2.params;
      var element = (0, _BaseComponent.domFindNode)(this);
      var ret = (0, _animationFrame.default)(element, frameFunc, _objectSpread({
        autoStart: play
      }, params, {
        rewind: rewind,
        duration: duration
      }), function () {
        return _this.handleFinished();
      });

      if (ret) {
        var _ret = (0, _slicedToArray2.default)(ret, 2),
            stop = _ret[0],
            start = _ret[1];

        this.stop = stop;
        this.start = start;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props3 = this.props,
          play = _this$props3.play,
          rewind = _this$props3.rewind;

      if (prevProps.play !== play && play) {
        play && this.start && this.start();
        !play && this.stop && this.stop();
      } else if (prevProps.rewind !== rewind) {
        this.start && this.start({
          reset: true,
          rewind: rewind
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.Children.only(this.props.children);
    }
  }]);
  return AnimationFrame;
}(_react.default.Component);

AnimationFrame.defaultProps = {};
/**
 * 设置动画的是否开始播放
 * @type {boolean}
 */

AnimationFrame.defaultProps.play = true;
/**
 * 设置动画倒叙播放
 * @attribute module:AnimationFrame.AnimationFrame.rewind
 * @type {func}
 */

/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */

AnimationFrame.defaultProps.duration = 200;
/**
 * 设置动画函数
 * @attribute module:AnimationFrame.AnimationFrame.frameFunc
 * @type {func}
 */

/**
 * 设置动画函数的参数
 * @attribute module:AnimationFrame.AnimationFrame.params
 * @type {object}
 */

/**
 * 设置动画完成时的回调函数
 * @attribute module:AnimationFrame.AnimationFrame.onFinished
 * @type {function}
 */

(0, _defineProperty2.default)(AnimationFrame, "AnimationFrame", {
  get: function get() {
    return AnimationFrame;
  },
  set: function set(val) {
    AnimationFrame = val;
  }
});
AnimationFrame.isBnorth = true;
AnimationFrame.defaultProps['b-precast'] = {};
var _default = AnimationFrame;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _animationFrame = _interopRequireDefault(require("@bnorth/rich.css/lib/styles/animationFrame"));

var _BaseComponent = require("./BaseComponent");

/**
 * @module
 */

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
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          play = _this$props.play,
          rewind = _this$props.rewind,
          duration = _this$props.duration,
          frameFunc = _this$props.frameFunc,
          params = _this$props.params,
          onFinished = _this$props.onFinished;
      var element = (0, _BaseComponent.domFindNode)(this);
      var ret = (0, _animationFrame.default)(element, frameFunc, (0, _objectSpread2.default)({
        autoStart: play
      }, params, {
        rewind: rewind,
        duration: duration
      }), function () {
        return onFinished && onFinished();
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
      var _this$props2 = this.props,
          play = _this$props2.play,
          rewind = _this$props2.rewind;

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

Object.defineProperty(AnimationFrame, "AnimationFrame", {
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
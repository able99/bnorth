"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _react = _interopRequireDefault(require("react"));

var _hammerjs = _interopRequireDefault(require("hammerjs"));

var _BaseComponent = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */
_hammerjs.default.defaults.inputClass = _BaseComponent.domIsTouch ? _hammerjs.default.TouchInput : _hammerjs.default.TouchMouseInput;

_hammerjs.default.defaults.preset.forEach(function (v) {
  !v[1] && v.push({});
  v[1].enable = false;
});

var handlerToEvent = {
  action: 'tap press',
  onDoubleTap: 'doubletap',
  onPan: 'pan',
  onPanCancel: 'pancancel',
  onPanEnd: 'panend',
  onPanStart: 'panstart',
  onPinch: 'pinch',
  onPinchCancel: 'pinchcancel',
  onPinchEnd: 'pinchend',
  onPinchIn: 'pinchin',
  onPinchOut: 'pinchout',
  onPinchStart: 'pinchstart',
  onPress: 'press',
  onPressUp: 'pressup',
  onRotate: 'rotate',
  onRotateCancel: 'rotatecancel',
  onRotateEnd: 'rotateend',
  onRotateMove: 'rotatemove',
  onRotateStart: 'rotatestart',
  onSwipe: 'swipe',
  onSwipeRight: 'swiperight',
  onSwipeLeft: 'swipeleft',
  onSwipeUp: 'swipeup',
  onSwipeDown: 'swipedown',
  onTap: 'tap'
};
var privateProps = {
  direction: true,
  options: true,
  recognizers: true,
  recognizeWith: true
};
(0, _keys.default)(handlerToEvent).forEach(function (v) {
  privateProps[v] = true;
});

function updateHammer(hammer, props) {
  (0, _entries.default)(props).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (k === 'direction') {
      // direaction
      var direction = 'DIRECTION_' + (v ? String(v).toUpperCase() : 'ALL');
      hammer.get('pan').set({
        direction: _hammerjs.default[direction]
      });
      hammer.get('swipe').set({
        direction: _hammerjs.default[direction]
      });
    } else if (k === 'options') {
      // options
      (0, _entries.default)(v).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            kk = _ref4[0],
            vv = _ref4[1];

        if (kk === 'recognizers') return;
        hammer.set((0, _defineProperty3.default)({}, kk, vv));
      });
    } else if (k === 'recognizers') {
      // recognizers
      (0, _entries.default)(v || {}).forEach(function (_ref5) {
        var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
            kk = _ref6[0],
            vv = _ref6[1];

        var recognizer = hammer.get(kk);
        recognizer.set(vv);
        if (vv.requireFailure) recognizer.requireFailure(vv.requireFailure);
      });
    } else if (k === 'recognizeWith') {
      // recognizeWith
      (0, _entries.default)(v || {}).forEach(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            kk = _ref8[0],
            vv = _ref8[1];

        var recognizer = hammer.get(kk);
        recognizer.recognizeWith(vv);
      });
    } else {
      // event
      k = handlerToEvent[k];
      if (!k) return;
      hammer.off(k);
      hammer.on(k, v && function (e) {
        return v(e, hammer.element);
      });
    }
  });
}
/**
 * 支持手势的小面板
 * @component
 * @mount Panel.Touchable
 * @augments BaseComponent
 * @see {@link https://hammerjs.github.io/} hammerjs
 */


var Touchable =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Touchable, _React$Component);

  function Touchable() {
    (0, _classCallCheck2.default)(this, Touchable);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Touchable).apply(this, arguments));
  }

  (0, _createClass2.default)(Touchable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var element = (0, _BaseComponent.domFindNode)(this);
      this.hammer = new _hammerjs.default(element);
      updateHammer(this.hammer, this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.hammer.stop();
      this.hammer.destroy();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      updateHammer(this.hammer, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var props = (0, _BaseComponent.default)(this.props, Touchable);
      (0, _keys.default)(props).forEach(function (v) {
        if (privateProps[v]) delete props[v];
      });
      return _react.default.createElement(_Panel.default, props);
    }
  }]);
  return Touchable;
}(_react.default.Component);

Touchable.defaultProps = {};
/**
 * 设置手势识别器的识别方向，none，left，right，up，down，horizontal，vertical，all
 * @attribute Panel.module:Touchable~Touchable.direction
 * @type {string}
 */

/**
 * 设置手势识别器的参数，比如 touchAction ：设置 touchAction
 * @attribute Panel.module:Touchable~Touchable.options
 * @type {object}
 */

/**
 * 设置指定手势识别器的参数，enable 为通用属性，如果想要打开某个识别器，需要设置为 true。
 * 识别器包括：tap<点>, doubletap<双点击>, press<按住>, 水平方位的pan<平移> 和 swipe<快速滑动>, 以及多触点的 pinch<捏放> 和 rotate<旋转>识别器
 * @attribute Panel.module:Touchable~Touchable.recognizers
 * @type {object}
 * @example
 * ```jsx
 * <Panel.Touchable direction="horizontal" recognizers={{'pan':{enable: true}}} onPan={e=>console.log(e.deltaY, e.deltaX)} />
 * ```
 */

/**
 * 设置关联触发的识别器
 * @attribute Panel.module:Touchable~Touchable.recognizeWith
 * @type {object}
 */

/**
 * 手势事件
 * @typedef RecognizerEvent
 * @type {object}
 * @property {string} type - 事件名称
 * @property {number} deltaX - x 轴移动距离
 * @property {number} deltaY - y 轴移动距离
 * @property {number} deltaTime - 事件时间（毫秒）
 * @property {number} distance - 移动距离
 * @property {number} angle - 移动角度
 * @property {number} velocityX - x 轴移动速率
 * @property {number} velocityY - y 轴移动速率
 * @property {number} volocity - 最高速率
 * @property {string} direction - 事件方向
 * @property {string} offsetDirection - 偏移方向
 * @property {number} scale - 缩放比率
 * @property {event} srcEvent - 源事件
 * @property {number} rotation - 旋转角度
 * @property {object} center - 多点的中心坐标，或者单点的点击坐标
 * @property {element} target - 事件目标
 * @property {boolean} isFirst - 交互为首次交互
 * @property {boolean} isFinal - 交互为最后一次交互
 * @property {function} preventDefault - 阻止默认事件处理
 */

/**
 * 手势事件回调函数
 * @callback RecognizerCallback
 * @param {Panel.module:Touchable~RecognizerEvent} event - 手势事件
 * @param {element} element - 手势识别的元素
 */

/**
 * 双击事件处理函数，对应手势 doubletap
 * @attribute Panel.module:Touchable~Touchable.onDoubleTap
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 平移事件处理函数，对应手势 pan
 * @attribute Panel.module:Touchable~Touchable.onPan
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 平移事件取消处理函数，对应手势 pancancel
 * @attribute Panel.module:Touchable~Touchable.onPanCancel
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 平移事件结束处理函数，对应手势 panend
 * @attribute Panel.module:Touchable~Touchable.onPanEnd
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 捏放事件处理函数，对应手势 pinch
 * @attribute Panel.module:Touchable~Touchable.onPinch
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 捏放事件取消处理函数，对应手势 pinchcancel
 * @attribute Panel.module:Touchable~Touchable.onPinchCancel
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 捏放事件结束处理函数，对应手势 pinchend
 * @attribute Panel.module:Touchable~Touchable.onPinchEnd
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 缩小事件处理函数，对应手势 pinchin
 * @attribute Panel.module:Touchable~Touchable.onPinchIn
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 放大事件处理函数，对应手势 pinchout
 * @attribute Panel.module:Touchable~Touchable.onPinchOut
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 捏放事件开始处理函数，对应手势 pinchstart
 * @attribute Panel.module:Touchable~Touchable.onPinchStart
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 按住事件处理函数，对应手势 press
 * @attribute Panel.module:Touchable~Touchable.onPress
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 按住并抬起事件处理函数，对应手势 pressup
 * @attribute Panel.module:Touchable~Touchable.onPressUp
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 旋转事件处理函数，对应手势 rotate
 * @attribute Panel.module:Touchable~Touchable.onRotate
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 旋转取消事件处理函数，对应手势 rotatecancel
 * @attribute Panel.module:Touchable~Touchable.onRotateCancel
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 旋转结束事件处理函数，对应手势 rotateend
 * @attribute Panel.module:Touchable~Touchable.onRotateEnd
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 旋转并移动事件处理函数，对应手势 rotatemove
 * @attribute Panel.module:Touchable~Touchable.onRotateMove
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 旋转开始事件处理函数，对应手势 rotatestart
 * @attribute Panel.module:Touchable~Touchable.onRotateStart
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 快速滑动事件处理函数，对应手势 swipe
 * @attribute Panel.module:Touchable~Touchable.onSwipe
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 快速右滑事件处理函数，对应手势 swiperight
 * @attribute Panel.module:Touchable~Touchable.onSwipeRight
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 快速左滑事件处理函数，对应手势 swipeleft
 * @attribute Panel.module:Touchable~Touchable.onSwipeLeft
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 快速上滑事件处理函数，对应手势 swipeup
 * @attribute Panel.module:Touchable~Touchable.onSwipeUp
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 快速下滑事件处理函数，对应手势 swipedown
 * @attribute Panel.module:Touchable~Touchable.onSwipeDown
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:Touchable~Touchable.onTap
 * @type {Panel.module:Touchable~RecognizerCallback}
 */

(0, _defineProperty2.default)(Touchable, "Touchable", {
  get: function get() {
    return Touchable;
  },
  set: function set(val) {
    Touchable = val;
  }
});
Touchable.isBnorth = true;
Touchable.defaultProps['b-precast'] = {};
var _default = Touchable;
exports.default = _default;
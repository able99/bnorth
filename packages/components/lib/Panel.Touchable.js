"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireDefault(require("react"));

var _hammerjs = _interopRequireDefault(require("hammerjs"));

var _dom = require("./utils/dom");

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
_hammerjs.default.defaults.inputClass = _dom.domIsTouch ? _hammerjs.default.TouchInput : _hammerjs.default.TouchMouseInput;
_hammerjs.default.defaults.touchAction = 'pan-y'; // :TODO 

var privateProps = {
  direction: true,
  options: true,
  recognizers: true,
  recognizeWith: true
};
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
Object.keys(handlerToEvent).forEach(function (v) {
  privateProps[v] = true;
});

function updateHammer(hammer, props) {
  Object.entries(props).forEach(function (_ref) {
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
      Object.entries(v).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            kk = _ref4[0],
            vv = _ref4[1];

        if (kk === 'recognizers') return;
        hammer.set({
          kk: kk,
          vv: vv
        });
      });
    } else if (k === 'recognizers') {
      // recognizers
      Object.entries(v || {}).forEach(function (_ref5) {
        var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
            kk = _ref6[0],
            vv = _ref6[1];

        var recognizer = hammer.get(kk);
        recognizer.set(vv);
        if (vv.requireFailure) recognizer.requireFailure(vv.requireFailure);
      });
    } else if (k === 'recognizeWith') {
      // recognizeWith
      Object.entries(v || {}).forEach(function (_ref7) {
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

_Panel.default.Touchable =
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
      var el = (0, _dom.domFindNode)(this);
      if (!el) throw new Error('panel.touchable: no el find');
      this.hammer = new _hammerjs.default(el);
      updateHammer(this.hammer, this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.hammer) return;
      this.hammer.stop();
      this.hammer.destroy();
      this.hammer = null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.hammer) return;
      updateHammer(this.hammer, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$component = _this$props.component,
          Component = _this$props$component === void 0 ? _Panel.default : _this$props$component,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["component"]);
      Object.keys(props).forEach(function (v) {
        if (privateProps[v]) delete props[v];
      });
      return _react.default.createElement(Component, props);
    }
  }]);
  return Touchable;
}(_react.default.Component);

var _default = _Panel.default;
exports.default = _default;
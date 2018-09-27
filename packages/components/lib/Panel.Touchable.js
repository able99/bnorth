"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Hammer", {
  enumerable: true,
  get: function get() {
    return _hammerjs.default;
  }
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _hammerjs = _interopRequireDefault(require("hammerjs"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
_hammerjs.default.defaults.inputClass = 'ontouchstart' in window ? _hammerjs.default.TouchInput : _hammerjs.default.TouchMouseInput;
_hammerjs.default.defaults.touchAction = 'pan-up';
//, domEvents: false, 
var privateProps = {
  direction: true,
  options: true,
  recognizeWith: true,
  vertical: true
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
Object.keys(handlerToEvent).forEach(function (i) {
  privateProps[i] = true;
});

function updateHammer(hammer, props) {
  if (props.hasOwnProperty('vertical')) {
    console.warn('vertical is deprecated, please use `direction` instead');
  }

  var directionProp = props.direction;

  if (directionProp || props.hasOwnProperty('vertical')) {
    var direction = directionProp ? directionProp : props.vertical ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL';
    hammer.get('pan').set({
      direction: _hammerjs.default[direction]
    });
    hammer.get('swipe').set({
      direction: _hammerjs.default[direction]
    });
  }

  if (props.options) {
    Object.keys(props.options).forEach(function (option) {
      if (option === 'recognizers') {
        Object.keys(props.options.recognizers).forEach(function (gesture) {
          var recognizer = hammer.get(gesture);
          recognizer.set(props.options.recognizers[gesture]);

          if (props.options.recognizers[gesture].requireFailure) {
            recognizer.requireFailure(props.options.recognizers[gesture].requireFailure);
          }
        }, this);
      } else {
        var key = option;
        var optionObj = {};
        optionObj[key] = props.options[option];
        hammer.set(optionObj);
      }
    }, this);
  }

  if (props.recognizeWith) {
    Object.keys(props.recognizeWith).forEach(function (gesture) {
      var recognizer = hammer.get(gesture);
      recognizer.recognizeWith(props.recognizeWith[gesture]);
    }, this);
  }

  Object.keys(props).forEach(function (p) {
    var e = handlerToEvent[p];

    if (e) {
      hammer.off(e);
      hammer.on(e, props[p] && props[p].bind(null, hammer));
    }
  });
}

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
      var el = _reactDom.default.findDOMNode(this.el);

      if (!el) throw new Error('touchable: no el find');
      this.hammer = new _hammerjs.default(el);
      updateHammer(this.hammer, this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.hammer) {
        this.hammer.stop();
        this.hammer.destroy();
        this.hammer = null;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.hammer && updateHammer(this.hammer, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var props = {};
      Object.keys(this.props).forEach(function (v) {
        if (!privateProps[v]) props[v] = _this.props[v];
      });
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        refWrap: function refWrap(e) {
          return e && (_this.el = e);
        }
      }, props));
    }
  }]);
  return Touchable;
}(_react.default.Component);

_Panel.default.Touchable = Touchable;
var _default = _Panel.default;
exports.default = _default;
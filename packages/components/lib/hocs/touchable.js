"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _hocHelper = _interopRequireDefault(require("../utils/hocHelper"));

var _dom = require("../utils/dom");

var _event = require("../utils/event");

var _default = function _default(WrappedComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var EnhancedComponent =
  /*#__PURE__*/
  function (_React$PureComponent) {
    (0, _inherits2.default)(EnhancedComponent, _React$PureComponent);

    function EnhancedComponent(props) {
      var _this;

      (0, _classCallCheck2.default)(this, EnhancedComponent);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnhancedComponent).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "reset", function () {
        _this.touch = {};
        _this.binded = false;
        _this.tapTimer = null;
        _this.swipeTimer = null;
        _this.moveStartTimer = null;
        _this.moveTimer = null;
        _this.moveEndTimer = null;
        _this.longTapTimer = null;
        _this.touchTimes = 0;
        _this.doubleTapTimer = null;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "down", function (event) {
        _this._processEvent(event);

        var touch = _this.touch;
        var _this$props = _this.props,
            tapLongDuration = _this$props.tapLongDuration,
            onMoveStart = _this$props.onMoveStart,
            onMove = _this$props.onMove,
            onMoveEnd = _this$props.onMoveEnd,
            onLongTap = _this$props.onLongTap;
        console.log(1111, event.target, event.touches);
        if (!event.touches) return;
        var primaryTouch = _dom.domIsTouch ? event.touches[0] : event;
        if (onMoveStart || onMove || onMoveEnd) event.preventDefault();
        if (_dom.domIsTouch && event.touches.length !== 1) return;

        if (!_this.binded) {
          (0, _event.on)(document, _dom.domTouchEventNameMaps.move, _this.move);
          (0, _event.on)(document, _dom.domTouchEventNameMaps.up, _this.up);
          (0, _event.on)(document, _dom.domTouchEventNameMaps.cancel, _this.cancel);
          (0, _event.on)(window, 'scroll', _this.cancel);
          _this.binded = true;
        }

        if (onLongTap) {
          if (_this.longTapTimer) clearTimeout(_this.longTapTimer);
          _this.longTapTimer = setTimeout(onLongTap, tapLongDuration);
        }

        if (onMoveStart) {
          _this.moveStartTimer = setTimeout(onMoveStart, 0);
        }

        touch.x1 = primaryTouch.pageX;
        touch.y1 = primaryTouch.pageY;
        _this.touchTimes += 1;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "move", function (event) {
        _this._processEvent(event);

        var onMove = _this.props.onMove;
        var touch = _this.touch;
        var x1 = touch.x1,
            y1 = touch.y1;
        var primaryTouch = _dom.domIsTouch ? event.touches[0] : event;
        var x2 = primaryTouch.pageX;
        var y2 = primaryTouch.pageY;
        if (_this.longTapTimer) clearTimeout(_this.longTapTimer);

        if (onMove) {
          _this.moveTimer = setTimeout(function () {
            return onMove({
              x: x1,
              y: y1
            }, {
              x: x2,
              y: y2
            });
          }, 0);
        }

        touch.x2 = x2;
        touch.y2 = y2;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "up", function (event) {
        _this._processEvent(event);

        var _this$props2 = _this.props,
            tapLimitDistance = _this$props2.tapLimitDistance,
            tapDoubleDuration = _this$props2.tapDoubleDuration,
            onTap = _this$props2.onTap,
            onDoubleTap = _this$props2.onDoubleTap,
            onSwipe = _this$props2.onSwipe,
            onMoveEnd = _this$props2.onMoveEnd;
        var _this$touch = _this.touch,
            x1 = _this$touch.x1,
            y1 = _this$touch.y1,
            x2 = _this$touch.x2,
            y2 = _this$touch.y2;
        if (_this.longTapTimer) clearTimeout(_this.longTapTimer); // Move

        if (onMoveEnd && x2) {
          _this.moveEndTimer = setTimeout(function () {
            return onMoveEnd({
              x: x1,
              y: y1
            }, {
              x: x2,
              y: y2
            });
          }, 0);
        }

        if (x2 && Math.abs(x1 - x2) > tapLimitDistance || y2 && Math.abs(y1 - y2) > tapLimitDistance) {
          // Swipe
          var direction = Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 > x2 ? 'Left' : 'Right' : y1 > y2 ? 'Up' : 'Down';

          var swipeFunc = _this.props["onSwipe".concat(direction)];

          _this.swipeTimer = setTimeout(function () {
            if (onSwipe) onSwipe();
            if (swipeFunc) swipeFunc();

            _this.cancel();
          }, 0);
        } else {
          // Tap
          if (onDoubleTap) {
            if (!_this.doubleTapTimer) {
              _this.doubleTapTimer = setTimeout(function () {
                if (_this.touchTimes === 2) {
                  onDoubleTap();
                } else if (onTap) {
                  onTap();
                }

                _this.cancel();
              }, tapDoubleDuration);
            }
          } else {
            _this.tapTimer = setTimeout(function () {
              if (onTap) onTap();

              _this.cancel();
            }, 0);
          }
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "cancel", function () {
        (0, _event.off)(document, _dom.domTouchEventNameMaps.move, _this.move);
        (0, _event.off)(document, _dom.domTouchEventNameMaps.up, _this.up);
        (0, _event.off)(document, _dom.domTouchEventNameMaps.cancel, _this.cancel);
        (0, _event.off)(window, 'scroll', _this.cancel);
        if (_this.tapTimer) clearTimeout(_this.tapTimer);
        if (_this.swipeTimer) clearTimeout(_this.swipeTimer);
        if (_this.moveStartTimer) clearTimeout(_this.moveStartTimer);
        if (_this.moveTimer) clearTimeout(_this.moveTimer);
        if (_this.moveEndTimer) clearTimeout(_this.moveEndTimer);
        if (_this.longTapTimer) clearTimeout(_this.longTapTimer);
        if (_this.doubleTapTimer) clearTimeout(_this.doubleTapTimer);

        _this.reset();
      });

      _this.reset();

      return _this;
    }

    (0, _createClass2.default)(EnhancedComponent, [{
      key: "_processEvent",
      value: function _processEvent(e) {
        this.props.onTap && e.stopPropagation();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.cancel();
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            onTouchStart = _this$props3.onTouchStart,
            onMouseDown = _this$props3.onMouseDown,
            tapLimitDistance = _this$props3.tapLimitDistance,
            tapLongDuration = _this$props3.tapLongDuration,
            tapDoubleDuration = _this$props3.tapDoubleDuration,
            onTap = _this$props3.onTap,
            onDoubleTap = _this$props3.onDoubleTap,
            onLongTap = _this$props3.onLongTap,
            onSwipe = _this$props3.onSwipe,
            onSwipeDown = _this$props3.onSwipeDown,
            onSwipeLeft = _this$props3.onSwipeLeft,
            onSwipeRight = _this$props3.onSwipeRight,
            onSwipeUp = _this$props3.onSwipeUp,
            onMoveStart = _this$props3.onMoveStart,
            onMove = _this$props3.onMove,
            onMoveEnd = _this$props3.onMoveEnd,
            rest = (0, _objectWithoutProperties2.default)(_this$props3, ["onTouchStart", "onMouseDown", "tapLimitDistance", "tapLongDuration", "tapDoubleDuration", "onTap", "onDoubleTap", "onLongTap", "onSwipe", "onSwipeDown", "onSwipeLeft", "onSwipeRight", "onSwipeUp", "onMoveStart", "onMove", "onMoveEnd"]);
        return _react.default.createElement(WrappedComponent, (0, _extends2.default)({
          onTouchStart: (0, _event.createChainedFunction)(this.down, onTouchStart),
          onMouseDown: (0, _event.createChainedFunction)(this.down, onMouseDown)
        }, rest));
      }
    }]);
    return EnhancedComponent;
  }(_react.default.PureComponent);

  (0, _defineProperty2.default)(EnhancedComponent, "defaultProps", {
    tapLimitDistance: 30,
    tapLongDuration: 750,
    tapDoubleDuration: 250
  });
  return (0, _hocHelper.default)(WrappedComponent, EnhancedComponent, options, 'Touchable');
};

exports.default = _default;
module.exports = exports["default"];
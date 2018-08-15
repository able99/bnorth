"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

var _AnimationSlider = _interopRequireDefault(require("./AnimationSlider"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Carousel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Carousel, _React$Component);

  function Carousel(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Carousel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Carousel).call(this, props));
    _this.state = {
      index: props.defaultIndex || 0,
      isForward: undefined
    };
    return _this;
  }

  (0, _createClass2.default)(Carousel, [{
    key: "prev",
    value: function prev() {
      var index = this.state.index - 1;
      this.setState({
        isForward: false,
        index: index >= 0 ? index : _react.default.Children.toArray(this.props.children).filter(function (v) {
          return v;
        }).length - 1
      });
      this.goNext();
    }
  }, {
    key: "next",
    value: function next() {
      this.setState({
        isForward: true,
        index: (this.state.index + 1) % _react.default.Children.toArray(this.props.children).filter(function (v) {
          return v;
        }).length
      });
      this.goNext();
    }
  }, {
    key: "pause",
    value: function pause() {
      this._isPaused = true;

      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = undefined;
      }
    }
  }, {
    key: "play",
    value: function play() {
      this._isPaused = false;
      this.goNext();
    }
  }, {
    key: "goNext",
    value: function goNext() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$autoPlay = _this$props.autoPlay,
          autoPlay = _this$props$autoPlay === void 0 ? true : _this$props$autoPlay,
          _this$props$interval = _this$props.interval,
          interval = _this$props$interval === void 0 ? 4000 : _this$props$interval;

      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = undefined;
      }

      if (autoPlay && !this._isPaused && interval) this._timeout = setTimeout(function () {
        return _this2.next();
      }, interval);
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      var pauseOnHover = this.props.pauseOnHover;

      if (pauseOnHover) {
        this.pause();
        this.setState({
          mouseOver: true
        });
      }
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      if (this._isPaused) {
        this.play();
        this.setState({
          mouseOver: false
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props$autoPlay2 = this.props.autoPlay,
          autoPlay = _this$props$autoPlay2 === void 0 ? true : _this$props$autoPlay2;
      autoPlay && this.goNext();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.interval !== this.props.interval) this.goNext();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this._timeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          defaultIndex = _this$props2.defaultIndex,
          _this$props2$controll = _this$props2.controller,
          controller = _this$props2$controll === void 0 ? true : _this$props2$controll,
          _this$props2$pager = _this$props2.pager,
          pager = _this$props2$pager === void 0 ? true : _this$props2$pager,
          interval = _this$props2.interval,
          timeout = _this$props2.timeout,
          autoPlay = _this$props2.autoPlay,
          loop = _this$props2.loop,
          pauseOnHover = _this$props2.pauseOnHover,
          pagerItemProps = _this$props2.pagerItemProps,
          controllerPrevProps = _this$props2.controllerPrevProps,
          controllerNextProps = _this$props2.controllerNextProps,
          className = _this$props2.className,
          children = _this$props2.children,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["defaultIndex", "controller", "pager", "interval", "timeout", "autoPlay", "loop", "pauseOnHover", "pagerItemProps", "controllerPrevProps", "controllerNextProps", "className", "children"]);
      var index = this.state.index;
      children = _react.default.Children.toArray(children);
      var classSet = {
        'overflow-hidden': true
      };
      return _react.default.createElement(_Panel.default.Touchable, (0, _extends2.default)({
        component: _AnimationSlider.default,
        className: (0, _props.cx)(classSet, className),
        index: index,
        onSwipeLeft: function onSwipeLeft(e) {
          return _this3.next();
        },
        onSwipeRight: function onSwipeRight(e) {
          return _this3.prev();
        },
        onFocus: function onFocus(e) {
          return _this3.handleFocus();
        },
        onBlur: function onBlur(e) {
          return _this3.handleBlur();
        }
      }, props), children, pager ? _react.default.createElement(Carousel.Pager, (0, _extends2.default)({
        onTap: function onTap(e) {
          return _this3.setState({
            index: e
          });
        },
        count: children.length,
        index: Math.round(index)
      }, pagerItemProps)) : null, controller ? _react.default.createElement(Carousel.Controller, (0, _extends2.default)({
        onTap: function onTap(e) {
          return _this3.prev();
        }
      }, controllerPrevProps)) : null, controller ? _react.default.createElement(Carousel.Controller, (0, _extends2.default)({
        onTap: function onTap(e) {
          return _this3.next();
        }
      }, controllerNextProps, {
        isForward: true
      })) : null);
    }
  }]);
  return Carousel;
}(_react.default.Component);

Carousel.Item = _AnimationSlider.default.Item;

Carousel.Controller = function (aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      isForward = _genCommonProps.isForward,
      component = _genCommonProps.component,
      _genCommonProps$name = _genCommonProps.name,
      name = _genCommonProps$name === void 0 ? aprops.isForward ? 'right' : 'left' : _genCommonProps$name,
      style = _genCommonProps.style,
      className = _genCommonProps.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["isForward", "component", "name", "style", "className"]);

  var classSet = {
    'bg-color-mask': true,
    'position-absolute': true,
    'text-color-white': true,
    'cursor-pointer': true,
    'padding': true,
    'translate-center-y': true,
    'text-weight-border': true,
    'corsor-pointer': true
  };
  var styleSet = (0, _objectSpread3.default)((0, _defineProperty2.default)({
    top: '50%'
  }, isForward ? 'right' : 'left', 0), style);
  return _react.default.createElement(_Panel.default.Touchable, (0, _extends2.default)({
    style: styleSet,
    className: (0, _props.cx)(classSet, className)
  }, props), component || _react.default.createElement(_Icon.default, {
    name: _Icon.default.getName(name, isForward ? '>' : '<')
  }));
};

Carousel.Pager = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      count = _genCommonProps2.count,
      index = _genCommonProps2.index,
      onTap = _genCommonProps2.onTap,
      itemProps = _genCommonProps2.itemProps,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? 'ol' : _genCommonProps2$comp,
      style = _genCommonProps2.style,
      className = _genCommonProps2.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["count", "index", "onTap", "itemProps", "component", "style", "className"]);

  var classSet = {
    'position-absolute': true,
    'flex-display-flex': true,
    'flex-justify-center': true,
    'flex-align-center': true,
    'bg-color-overlay': true,
    'padding-xs': true,
    'border-radius-rounded': true,
    'translate-center-x': true
  };
  var styleSet = (0, _objectSpread3.default)({
    left: '50%',
    bottom: '3%'
  }, style);
  return _react.default.createElement(Component, (0, _extends2.default)({
    style: styleSet,
    className: (0, _props.cx)(classSet, className)
  }, props), Array(count).fill(0).map(function (v, i) {
    return _react.default.createElement(Carousel.Pager.Item, (0, _extends2.default)({
      key: i,
      onTap: onTap,
      count: count,
      index: index,
      i: i
    }, itemProps));
  }));
};

Carousel.Pager.Item = function (aprops) {
  var count = aprops.count,
      index = aprops.index,
      i = aprops.i,
      _onTap = aprops.onTap,
      _aprops$component = aprops.component,
      component = _aprops$component === void 0 ? 'li' : _aprops$component,
      className = aprops.className,
      props = (0, _objectWithoutProperties2.default)(aprops, ["count", "index", "i", "onTap", "component", "className"]);
  var classSet = {
    'cursor-pointer': true,
    'margin-left-xxs': i > 0,
    'width-em-0-5': true,
    'height-em-0-5': true,
    'border-radius-rounded': true,
    'border-set-white': true,
    'bg-color-white': i === index,
    'bg-color-component': i === index
  };
  return _react.default.createElement(_Panel.default.Touchable, (0, _extends2.default)({
    onTap: function onTap(e) {
      return _onTap && _onTap(i);
    },
    component: component,
    className: (0, _props.cx)(classSet, className)
  }, props));
};

var _default = Carousel;
exports.default = _default;
module.exports = exports["default"];
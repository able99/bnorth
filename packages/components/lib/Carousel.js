"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

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

var _Panel = _interopRequireDefault(require("./Panel.Touchable"));

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

      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          defaultIndex = _genCommonProps.defaultIndex,
          _genCommonProps$contr = _genCommonProps.controller,
          controller = _genCommonProps$contr === void 0 ? true : _genCommonProps$contr,
          _genCommonProps$pager = _genCommonProps.pager,
          pager = _genCommonProps$pager === void 0 ? true : _genCommonProps$pager,
          interval = _genCommonProps.interval,
          timeout = _genCommonProps.timeout,
          autoPlay = _genCommonProps.autoPlay,
          loop = _genCommonProps.loop,
          pauseOnHover = _genCommonProps.pauseOnHover,
          pagerItemProps = _genCommonProps.pagerItemProps,
          controllerPrevProps = _genCommonProps.controllerPrevProps,
          controllerNextProps = _genCommonProps.controllerNextProps,
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? _Panel.default.Touchable : _genCommonProps$compo,
          _genCommonProps$compo2 = _genCommonProps.componentAnimation,
          componentAnimation = _genCommonProps$compo2 === void 0 ? _AnimationSlider.default : _genCommonProps$compo2,
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["defaultIndex", "controller", "pager", "interval", "timeout", "autoPlay", "loop", "pauseOnHover", "pagerItemProps", "controllerPrevProps", "controllerNextProps", "component", "componentAnimation", "children"]);

      var index = this.state.index;
      children = _react.default.Children.toArray(children);
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentAnimation,
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
      }, props), controller ? _react.default.createElement(Carousel.Controller, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.prev();
        }
      }, controllerPrevProps)) : null, controller ? _react.default.createElement(Carousel.Controller, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.next();
        }
      }, controllerNextProps, {
        isForward: true
      })) : null, pager ? _react.default.createElement(Carousel.Pager, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.setState({
            index: e
          });
        },
        count: children.length,
        index: Math.round(index)
      }, pagerItemProps)) : null, children);
    }
  }]);
  return Carousel;
}(_react.default.Component);

Carousel.Controller = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      isForward = _genCommonProps2.isForward,
      _genCommonProps2$name = _genCommonProps2.name,
      name = _genCommonProps2$name === void 0 ? aprops.isForward ? 'right' : 'left' : _genCommonProps2$name,
      _genCommonProps2$name2 = _genCommonProps2.nameDefault,
      nameDefault = _genCommonProps2$name2 === void 0 ? isForward ? '>' : '<' : _genCommonProps2$name2,
      _genCommonProps2$comp = _genCommonProps2.component,
      Component = _genCommonProps2$comp === void 0 ? _Icon.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["isForward", "name", "nameDefault", "component", "className"]);

  var classStr = 'bg-color-mask position-absolute text-color-white cursor-pointer margin-h-xxs offset-top-center translate-center-y text-weight-border';
  var classSet = ["offset-".concat(isForward ? 'right' : 'left', "-start")];
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-size": "xl",
    className: (0, _props.cxm)(classStr, classSet, className),
    name: name,
    nameDefault: nameDefault
  }, props));
};

Carousel.Pager = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      count = _genCommonProps3.count,
      index = _genCommonProps3.index,
      onClick = _genCommonProps3.onClick,
      itemProps = _genCommonProps3.itemProps,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? _Panel.default : _genCommonProps3$comp,
      _genCommonProps3$comp2 = _genCommonProps3.componnetPanel,
      componnetPanel = _genCommonProps3$comp2 === void 0 ? 'ol' : _genCommonProps3$comp2,
      className = _genCommonProps3.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["count", "index", "onClick", "itemProps", "component", "componnetPanel", "className"]);

  var classStr = 'position-absolute flex-display-block flex-justify-center flex-align-center bg-color-overlay padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componnetPanel,
    className: (0, _props.cxm)(classStr, className)
  }, props), Array.from({
    length: count
  }, function (v, k) {
    return k;
  }).map(function (v) {
    return _react.default.createElement(Carousel.Pager.Item, (0, _extends2.default)({
      key: v,
      onClick: onClick,
      count: count,
      index: index,
      i: v
    }, itemProps));
  }));
};

Carousel.Pager.Item = function (aprops) {
  var _genCommonProps4 = (0, _props.genCommonProps)(aprops),
      count = _genCommonProps4.count,
      index = _genCommonProps4.index,
      i = _genCommonProps4.i,
      _onClick = _genCommonProps4.onClick,
      _genCommonProps4$comp = _genCommonProps4.component,
      Component = _genCommonProps4$comp === void 0 ? _Panel.default : _genCommonProps4$comp,
      _genCommonProps4$comp2 = _genCommonProps4.componnetPanel,
      componnetPanel = _genCommonProps4$comp2 === void 0 ? 'li' : _genCommonProps4$comp2,
      className = _genCommonProps4.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["count", "index", "i", "onClick", "component", "componnetPanel", "className"]);

  var classStr = 'cursor-pointer width-0em5 height-0em5 border-radius-rounded border-set-a-white';
  var classSet = {
    'bg-color-white': i === index,
    'bg-color-component': i === index,
    'margin-left-xxs': i > 0
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    onClick: function onClick(e) {
      return _onClick && _onClick(i);
    },
    component: componnetPanel,
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props));
};

Carousel.Item = _AnimationSlider.default.Item;
var _default = Carousel;
exports.default = _default;
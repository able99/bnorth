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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

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

      var _parseProps = (0, _props.default)(this.props),
          defaultIndex = _parseProps.defaultIndex,
          _parseProps$controlle = _parseProps.controller,
          controller = _parseProps$controlle === void 0 ? true : _parseProps$controlle,
          _parseProps$pager = _parseProps.pager,
          pager = _parseProps$pager === void 0 ? true : _parseProps$pager,
          interval = _parseProps.interval,
          timeout = _parseProps.timeout,
          autoPlay = _parseProps.autoPlay,
          loop = _parseProps.loop,
          pauseOnHover = _parseProps.pauseOnHover,
          pagerItemProps = _parseProps.pagerItemProps,
          controllerPrevProps = _parseProps.controllerPrevProps,
          controllerNextProps = _parseProps.controllerNextProps,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default.Touchable : _parseProps$component,
          _parseProps$component2 = _parseProps.componentAnimation,
          componentAnimation = _parseProps$component2 === void 0 ? _AnimationSlider.default : _parseProps$component2,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["defaultIndex", "controller", "pager", "interval", "timeout", "autoPlay", "loop", "pauseOnHover", "pagerItemProps", "controllerPrevProps", "controllerNextProps", "component", "componentAnimation", "children"]);

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
  var _parseProps2 = (0, _props.default)(aprops),
      isForward = _parseProps2.isForward,
      _parseProps2$name = _parseProps2.name,
      name = _parseProps2$name === void 0 ? aprops.isForward ? 'right' : 'left' : _parseProps2$name,
      _parseProps2$nameDefa = _parseProps2.nameDefault,
      nameDefault = _parseProps2$nameDefa === void 0 ? isForward ? '>' : '<' : _parseProps2$nameDefa,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Icon.default : _parseProps2$componen,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isForward", "name", "nameDefault", "component", "className"]);

  var classStr = 'bg-color-mask position-absolute text-color-white cursor-pointer margin-h-xxs offset-top-center translate-center-y text-weight-border';
  var classSet = ["offset-".concat(isForward ? 'right' : 'left', "-start")];
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-size": "xl",
    className: (0, _classes.default)(classStr, classSet, className),
    name: name,
    nameDefault: nameDefault
  }, props));
};

Carousel.Pager = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops),
      count = _parseProps3.count,
      index = _parseProps3.index,
      onClick = _parseProps3.onClick,
      itemProps = _parseProps3.itemProps,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      _parseProps3$componne = _parseProps3.componnetPanel,
      componnetPanel = _parseProps3$componne === void 0 ? 'ol' : _parseProps3$componne,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["count", "index", "onClick", "itemProps", "component", "componnetPanel", "className"]);

  var classStr = 'position-absolute flex-display-block flex-justify-center flex-align-center bg-color-overlay padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componnetPanel,
    className: (0, _classes.default)(classStr, className)
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
  var _parseProps4 = (0, _props.default)(aprops),
      count = _parseProps4.count,
      index = _parseProps4.index,
      i = _parseProps4.i,
      _onClick = _parseProps4.onClick,
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? _Panel.default : _parseProps4$componen,
      _parseProps4$componne = _parseProps4.componnetPanel,
      componnetPanel = _parseProps4$componne === void 0 ? 'li' : _parseProps4$componne,
      className = _parseProps4.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["count", "index", "i", "onClick", "component", "componnetPanel", "className"]);

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
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Carousel.Item = _AnimationSlider.default.Item;
var _default = Carousel;
exports.default = _default;
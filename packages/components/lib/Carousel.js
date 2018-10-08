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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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
      selected: props.defaultSelected
    };
    return _this;
  }

  (0, _createClass2.default)(Carousel, [{
    key: "prev",
    value: function prev() {
      var selected = this.state.selected - 1;
      this.setState({
        selected: selected >= 0 ? selected : _react.default.Children.toArray(this.props.children).filter(function (v) {
          return v;
        }).length - 1
      });

      this._goNext();
    }
  }, {
    key: "next",
    value: function next() {
      this.setState({
        selected: (this.state.selected + 1) % _react.default.Children.toArray(this.props.children).filter(function (v) {
          return v;
        }).length
      });

      this._goNext();
    }
  }, {
    key: "pause",
    value: function pause() {
      this._isPaused = true;

      this._clearTimeoutNext();
    }
  }, {
    key: "play",
    value: function play() {
      this._isPaused = false;

      this._goNext();
    }
  }, {
    key: "_goNext",
    value: function _goNext() {
      var _this2 = this;

      var _this$props = this.props,
          autoPlay = _this$props.autoPlay,
          interval = _this$props.interval;

      this._clearTimeoutNext();

      if (autoPlay && !this._isPaused && interval) this._timeoutNext = setTimeout(function () {
        return _this2.next();
      }, interval);
    }
  }, {
    key: "_clearTimeoutNext",
    value: function _clearTimeoutNext() {
      if (this._timeoutNext) {
        clearTimeout(this._timeoutNext);
        this._timeoutNext = undefined;
      }
    }
  }, {
    key: "_handleFocus",
    value: function _handleFocus() {
      if (this.props.pauseOnHover) this.pause();
    }
  }, {
    key: "_handleBlur",
    value: function _handleBlur() {
      if (this._isPaused) this.play();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.autoPlay && this._goNext();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.interval !== this.props.interval || prevProps.autoPlay !== this.props.autoPlay) this._goNext();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._clearTimeoutNext();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _parseProps = (0, _props.default)(this.props, Carousel.props),
          defaultSelected = _parseProps.defaultSelected,
          Controller = _parseProps.controller,
          Pager = _parseProps.pager,
          interval = _parseProps.interval,
          timeout = _parseProps.timeout,
          autoPlay = _parseProps.autoPlay,
          pauseOnHover = _parseProps.pauseOnHover,
          pagerItemProps = _parseProps.pagerItemProps,
          controllerPrevProps = _parseProps.controllerPrevProps,
          controllerNextProps = _parseProps.controllerNextProps,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default.Touchable : _parseProps$component,
          _parseProps$component2 = _parseProps.componentPanel,
          componentPanel = _parseProps$component2 === void 0 ? _AnimationSlider.default : _parseProps$component2,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["defaultSelected", "controller", "pager", "interval", "timeout", "autoPlay", "pauseOnHover", "pagerItemProps", "controllerPrevProps", "controllerNextProps", "component", "componentPanel", "children"]);

      var selected = this.state.selected;
      children = _react.default.Children.toArray(children);
      if (Controller === true) Controller = Carousel._Controller;
      if (Pager === true) Pager = Carousel._Pager;
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        index: selected,
        onSwipeLeft: function onSwipeLeft(e) {
          return _this3.next();
        },
        onSwipeRight: function onSwipeRight(e) {
          return _this3.prev();
        },
        onMouseOver: function onMouseOver(e) {
          return _this3._handleFocus();
        },
        onMouseOut: function onMouseOut(e) {
          return _this3._handleBlur();
        }
      }, props), Controller ? _react.default.createElement(Controller, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.prev();
        }
      }, controllerPrevProps)) : null, Controller ? _react.default.createElement(Controller, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.next();
        }
      }, controllerNextProps, {
        isForward: true
      })) : null, Pager ? _react.default.createElement(Pager, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.setState({
            selected: e
          });
        },
        count: children.length,
        selected: Math.round(selected)
      }, pagerItemProps)) : null, children);
    }
  }]);
  return Carousel;
}(_react.default.Component);

(0, _defineProperty2.default)(Carousel, "defaultProps", {
  defaultSelected: 0,
  controller: true,
  pager: true,
  interval: 4000,
  autoPlay: true
});

Carousel._Controller = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, Carousel._Controller.props),
      isForward = _parseProps2.isForward,
      _parseProps2$name = _parseProps2.name,
      name = _parseProps2$name === void 0 ? aprops.isForward ? 'right' : 'left' : _parseProps2$name,
      _parseProps2$defaultN = _parseProps2.defaultName,
      defaultName = _parseProps2$defaultN === void 0 ? isForward ? '>' : '<' : _parseProps2$defaultN,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Icon.default : _parseProps2$componen,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isForward", "name", "defaultName", "component", "className"]);

  var classStr = 'bg-color-mask position-absolute text-color-white cursor-pointer margin-h-xxs offset-top-center translate-center-y text-weight-border';
  var classSet = ["offset-".concat(isForward ? 'right' : 'left', "-start")];
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-size": "xl",
    name: name,
    defaultName: defaultName,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Carousel._Pager = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops, Carousel._Pager.props),
      count = _parseProps3.count,
      selected = _parseProps3.selected,
      onClick = _parseProps3.onClick,
      itemProps = _parseProps3.itemProps,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      _parseProps3$componne = _parseProps3.componnetPanel,
      componnetPanel = _parseProps3$componne === void 0 ? 'ol' : _parseProps3$componne,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["count", "selected", "onClick", "itemProps", "component", "componnetPanel", "className"]);

  var classStr = 'position-absolute flex-display-block flex-justify-center flex-align-center bg-color-overlay padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componnetPanel,
    className: (0, _classes.default)(classStr, className)
  }, props), Array.from({
    length: count
  }, function (v, k) {
    return k;
  }).map(function (v) {
    return _react.default.createElement(Carousel._Pager._Item, (0, _extends2.default)({
      key: v,
      onClick: onClick,
      count: count,
      selected: selected,
      i: v
    }, itemProps));
  }));
};

Carousel._Pager._Item = function (aprops) {
  var _parseProps4 = (0, _props.default)(aprops, Carousel._Pager._Item.props),
      count = _parseProps4.count,
      selected = _parseProps4.selected,
      i = _parseProps4.i,
      _onClick = _parseProps4.onClick,
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? _Panel.default : _parseProps4$componen,
      _parseProps4$componne = _parseProps4.componnetPanel,
      componnetPanel = _parseProps4$componne === void 0 ? 'li' : _parseProps4$componne,
      className = _parseProps4.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["count", "selected", "i", "onClick", "component", "componnetPanel", "className"]);

  var classStr = 'cursor-pointer width-0em5 height-0em5 border-radius-rounded border-set-a-white';
  var classSet = {
    'bg-color-white': i === selected,
    'bg-color-component': i === selected,
    'margin-left-xxs': i > 0
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componnetPanel,
    onClick: function onClick(e) {
      return _onClick && _onClick(i);
    },
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Carousel.Item = _AnimationSlider.default.Item;
var _default = Carousel;
exports.default = _default;
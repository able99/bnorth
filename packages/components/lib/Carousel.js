"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.from");

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
 * @module
 */
// Carousel
// ------------------------------

/**
 * 轮播组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
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
          interval = _parseProps.interval,
          timeout = _parseProps.timeout,
          autoPlay = _parseProps.autoPlay,
          pauseOnHover = _parseProps.pauseOnHover,
          pagerProps = _parseProps.pagerProps,
          controllerPrevProps = _parseProps.controllerPrevProps,
          controllerNextProps = _parseProps.controllerNextProps,
          ControllerComponent = _parseProps.controller,
          PagerComponent = _parseProps.pager,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default.Touchable : _parseProps$component,
          _parseProps$component2 = _parseProps.componentPanel,
          componentPanel = _parseProps$component2 === void 0 ? _AnimationSlider.default : _parseProps$component2,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["defaultSelected", "interval", "timeout", "autoPlay", "pauseOnHover", "pagerProps", "controllerPrevProps", "controllerNextProps", "controller", "pager", "component", "componentPanel", "children"]);

      var selected = this.state.selected;
      children = _react.default.Children.toArray(children);
      if (ControllerComponent === true) ControllerComponent = _Controller;
      if (PagerComponent === true) PagerComponent = _Pager;

      var content = _react.default.createElement(_react.default.Fragment, null, _Controller ? _react.default.createElement(_Controller, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.prev();
        }
      }, controllerPrevProps)) : null, _Controller ? _react.default.createElement(_Controller, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.next();
        }
      }, controllerNextProps, {
        isNext: true
      })) : null, _Pager ? _react.default.createElement(_Pager, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.setState({
            selected: e
          });
        },
        size: children.length,
        selected: Math.round(selected)
      }, pagerProps)) : null);

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
        },
        content: content
      }, props), children);
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
var _default = Carousel; // Carousel Item
// ------------------------------

exports.default = _default;
Carousel.Item = _AnimationSlider.default.Item; // Carousel Controller
// ------------------------------

/**
 * 轮播组件内部使用的翻页控制组件
 * @component 
 * @private
 * @augments BaseComponent
 */

var _Controller = function Controller(aprops) {
  var _classSet;

  var _parseProps2 = (0, _props.default)(aprops, _Controller.props),
      isNext = _parseProps2.isNext,
      mask = _parseProps2.mask,
      icon = _parseProps2.icon,
      iconNext = _parseProps2.iconNext,
      defaultIcon = _parseProps2.defaultIcon,
      defaultIconNext = _parseProps2.defaultIconNext,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Icon.default : _parseProps2$componen,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["isNext", "mask", "icon", "iconNext", "defaultIcon", "defaultIconNext", "component", "className"]);

  var classStr = 'position-absolute text-color-white cursor-pointer margin-h-xxs padding-a-xxs offset-top-center translate-center-y text-weight-border';
  var classSet = (_classSet = {}, (0, _defineProperty2.default)(_classSet, "offset-".concat(isNext ? 'right' : 'left', "-start"), true), (0, _defineProperty2.default)(_classSet, 'bg-color-' + (mask === true ? 'overlay' : mask), mask), _classSet);
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-size": "xl",
    name: isNext ? iconNext : icon,
    defaultName: isNext ? defaultIconNext : defaultIcon,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Object.defineProperty(Carousel, "Controller", {
  get: function get() {
    return _Controller;
  },
  set: function set(val) {
    _Controller = val;
  }
});
_Controller.defaultProps = {};
/**
 * 是否是指示显示下一页的控制器
 * @attribute module:Carousel~Controller.isNext
 * @type {boolean}
 */

/**
 * 设置组件是否具有蒙层背景或者指定蒙层的主题，true 表示使用默认的 mask 主题蒙层
 * @attribute module:Carousel~Controller.mask
 * @type {boolean|string}
 */

/**
 * 设置控制器的图标
 * @type {string}
 */

_Controller.defaultProps.icon = 'left';
/**
 * 设置控制器为指向下一页时的图标
 * @type {string}
 */

_Controller.defaultProps.iconNext = 'right';
/**
 * 设置控制器的默认图标
 * @type {string}
 */

_Controller.defaultProps.defaultIcon = '<';
/**
 * 设置控制器为指向下一页时的默认图标
 * @type {string}
 */

_Controller.defaultProps.defaultIconNext = '>';
/**
 * 参见 BaseComponent
 */

_Controller.defaultProps.component = _Icon.default; // Carousel Pager
// ------------------------------

/**
 * 轮播组件内部使用的分页控制器
 * @component 
 * @private
 * @augments BaseComponent
 */

var _Pager = function Pager(aprops) {
  var _parseProps3 = (0, _props.default)(aprops, _Pager.props),
      size = _parseProps3.size,
      selected = _parseProps3.selected,
      onClick = _parseProps3.onClick,
      itemProps = _parseProps3.itemProps,
      mask = _parseProps3.mask,
      Component = _parseProps3.component,
      componnetPanel = _parseProps3.componnetPanel,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["size", "selected", "onClick", "itemProps", "mask", "component", "componnetPanel", "className"]);

  var classStr = 'position-absolute flex-display-block flex-justify-center flex-align-center padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';
  var classSet = [];
  if (mask) classSet.push('bg-color-' + (mask === true ? 'overlay' : mask));
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componnetPanel,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), Array.from({
    length: size
  }, function (v, k) {
    return k;
  }).map(function (v) {
    return _react.default.createElement(_Item, (0, _extends2.default)({
      key: v,
      onClick: onClick,
      size: size,
      selected: selected,
      index: v
    }, itemProps));
  }));
};

Object.defineProperty(Carousel, "Pager", {
  get: function get() {
    return _Pager;
  },
  set: function set(val) {
    _Pager = val;
  }
});
_Pager.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Pager.defaultProps.component = _Panel.default;
/**
 * 参见 BaseComponent
 */

_Pager.defaultProps.componentPanel = 'ol'; // Carousel Pager Item
// ------------------------------

/**
 * 轮播组件内部使用的分页控制器的条目
 * @component 
 * @private
 * @augments BaseComponent
 */

var _Item = function Item(aprops) {
  var _parseProps4 = (0, _props.default)(aprops, _Item.props),
      index = _parseProps4.index,
      size = _parseProps4.size,
      selected = _parseProps4.selected,
      _onClick = _parseProps4.onClick,
      Component = _parseProps4.component,
      componnetPanel = _parseProps4.componnetPanel,
      className = _parseProps4.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["index", "size", "selected", "onClick", "component", "componnetPanel", "className"]);

  var classStr = 'cursor-pointer width-0em5 height-0em5 border-radius-rounded border-set-a-white';
  var classSet = {
    'bg-color-white': index === selected,
    'bg-color-component': index === selected,
    'margin-left-xxs': index > 0
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componnetPanel,
    onClick: function onClick(e) {
      return _onClick && _onClick(index);
    },
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Object.defineProperty(Carousel.Pager, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.defaultProps = {};
/**
 * 参见 BaseComponent
 */

_Item.defaultProps.component = _Panel.default;
/**
 * 参见 BaseComponent
 */

_Item.defaultProps.componentPanel = 'li';
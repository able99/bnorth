"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.from");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent4 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireWildcard(require("./Panel"));

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
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel~PanelContainer
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
      selectedIndex: props.selectedIndexDefault
    };
    return _this;
  }

  (0, _createClass2.default)(Carousel, [{
    key: "prev",
    value: function prev() {
      var selectedIndex = this.state.selectedIndex;
      if (selectedIndex < 0) selectedIndex = _react.default.Children.toArray(this.props.children).filter(function (v) {
        return v;
      }).length - 1;
      this.setState({
        selectedIndex: selectedIndex
      });
      this.go();
    }
  }, {
    key: "next",
    value: function next() {
      var selectedIndex = this.state.selectedIndex;
      selectedIndex = ++selectedIndex % _react.default.Children.toArray(this.props.children).filter(function (v) {
        return v;
      }).length;
      this.setState({
        selectedIndex: selectedIndex
      });
      this.go();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPaused = true;
      this.stop();
    }
  }, {
    key: "play",
    value: function play() {
      this.isPaused = false;
      this.go();
    }
  }, {
    key: "go",
    value: function go() {
      var _this2 = this;

      var _this$props = this.props,
          autoPlay = _this$props.autoPlay,
          interval = _this$props.interval;
      this.stop();
      if (autoPlay && !this._isPaused && interval) this.timer = setTimeout(function () {
        return _this2.next();
      }, interval);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.go();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.interval !== this.props.interval || prevProps.autoPlay !== this.props.autoPlay) this.go();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _BaseComponent = (0, _BaseComponent4.default)(this.props, Carousel),
          selectedIndexDefault = _BaseComponent.selectedIndexDefault,
          interval = _BaseComponent.interval,
          autoPlay = _BaseComponent.autoPlay,
          pauseOnHover = _BaseComponent.pauseOnHover,
          ControllerComponent = _BaseComponent.controller,
          PagerComponent = _BaseComponent.pager,
          pagerProps = _BaseComponent.pagerProps,
          controllerPrevProps = _BaseComponent.controllerPrevProps,
          controllerNextProps = _BaseComponent.controllerNextProps,
          Component = _BaseComponent.component,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["selectedIndexDefault", "interval", "autoPlay", "pauseOnHover", "controller", "pager", "pagerProps", "controllerPrevProps", "controllerNextProps", "component", "children"]);

      var selectedIndex = this.state.selectedIndex;
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      if (ControllerComponent === true) ControllerComponent = _Controller;
      if (PagerComponent === true) PagerComponent = _Pager;
      return _react.default.createElement(Component, (0, _extends2.default)({
        type: "scroll",
        selectedIndex: selectedIndex,
        onSelect: function onSelect(selectedIndex) {
          return _this3.setState({
            selectedIndex: selectedIndex
          }, function () {
            return _this3.go();
          });
        },
        onMouseOver: function onMouseOver(e) {
          return pauseOnHover && _this3.pause();
        },
        onMouseOut: function onMouseOut(e) {
          return _this3.isPaused && _this3.play();
        }
      }, props), children, _Controller ? _react.default.createElement(_Controller, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.prev();
        }
      }, controllerPrevProps, {
        itemPlain: true
      })) : null, _Controller ? _react.default.createElement(_Controller, (0, _extends2.default)({
        onClick: function onClick(e) {
          return _this3.next();
        }
      }, controllerNextProps, {
        itemPlain: true,
        isNext: true
      })) : null, _Pager ? _react.default.createElement(_Pager, (0, _extends2.default)({
        onClick: function onClick(selectedIndex) {
          return _this3.setState({
            selectedIndex: selectedIndex
          }, function () {
            return _this3.go();
          });
        },
        itemCount: children.length,
        selectedIndex: selectedIndex
      }, pagerProps, {
        itemPlain: true
      })) : null);
    }
  }]);
  return Carousel;
}(_react.default.Component);

Carousel.defaultProps = {};
/**
 * 默认的轮播条目
 * @type {number}
 */

Carousel.defaultProps.selectedIndexDefault = 0;
/**
 * 轮播间隔
 * @type {number}
 */

Carousel.defaultProps.interval = 4000;
/**
 * 鼠标滑过时，是否暂停
 * @type { boolean}
 */

Carousel.defaultProps.pauseOnHover = false;
/**
 * 是否自动播放
 * @type { boolean}
 */

Carousel.defaultProps.autoPlay = true;
/**
 * 前进后退按钮，true 表示使用默认按钮
 * @type {boolean|component}
 */

Carousel.defaultProps.controller = true;
/**
 * 后退按钮属性
 * @attribute module:Carousel.Carousel.controllerPrevProps
 * @type {Object}
 */

/**
 * 前进按钮属性
 * @attribute module:Carousel.Carousel.controllerNextProps
 * @type {Object}
 */

/**
 * 分页器组件，true 表示使用默认分页器
 * @type {boolean|component}
 */

Carousel.defaultProps.pager = true;
/**
 * 分页器属性
 * @attribute module:Carousel.Carousel.pagerProps
 * @type {Object}
 */

Carousel.defaultProps.component = _Panel.PanelContainer;
var _default = Carousel; // Carousel Item
// ------------------------------

exports.default = _default;
Carousel.Item = _Panel.default; // Carousel Controller
// ------------------------------

/**
 * 轮播组件内部使用的翻页控制组件
 * @component 
 * @private
 * @augments module:BaseComponent.BaseComponent
 * @augments module:ICon.Icon
 */

var _Controller = function Controller(aprops) {
  var _classNamePre;

  var _BaseComponent2 = (0, _BaseComponent4.default)(aprops, _Controller),
      isNext = _BaseComponent2.isNext,
      mask = _BaseComponent2.mask,
      icon = _BaseComponent2.icon,
      iconNext = _BaseComponent2.iconNext,
      defaultIcon = _BaseComponent2.defaultIcon,
      defaultIconNext = _BaseComponent2.defaultIconNext,
      Component = _BaseComponent2.component,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["isNext", "mask", "icon", "iconNext", "defaultIcon", "defaultIconNext", "component"]);

  var classNamePre = (_classNamePre = {
    'position-absolute text-color-white cursor-pointer margin-h-xxs padding-a-xxs offset-top-center translate-center-y text-weight-border': true
  }, (0, _defineProperty2.default)(_classNamePre, "offset-".concat(isNext ? 'right' : 'left', "-start"), true), (0, _defineProperty2.default)(_classNamePre, 'bg-color-' + (mask === true ? 'overlay' : mask), mask), _classNamePre);
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-size": "xl",
    name: isNext ? iconNext : icon,
    defaultName: isNext ? defaultIconNext : defaultIcon,
    classNamePre: classNamePre
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
_Controller.defaultProps.component = _Icon.default; // Carousel Pager
// ------------------------------

/**
 * 轮播组件内部使用的分页控制器
 * @component 
 * @private
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel~PanelContainer
 */

var _Pager = function Pager(aprops) {
  var _BaseComponent3 = (0, _BaseComponent4.default)(aprops, _Pager, {
    isContainer: true
  }),
      itemCount = _BaseComponent3.itemCount,
      onClick = _BaseComponent3.onClick,
      mask = _BaseComponent3.mask,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["itemCount", "onClick", "mask"]);

  var classNamePre = (0, _defineProperty2.default)({
    'position-absolute padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x': true
  }, 'bg-color-' + (mask === true ? 'overlay' : mask), mask);
  return _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    type: "flex",
    itemCount: itemCount,
    classNamePre: classNamePre
  }, props), Array.from({
    length: itemCount
  }, function (v, k) {
    return k;
  }).map(function (v) {
    return _react.default.createElement(_Panel.default, {
      component: "li",
      key: v,
      onClick: onClick
    });
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
_Pager.defaultProps.component = 'ol';

_Pager.itemGetClassName = function (itemProps, containerProps) {
  return {
    'cursor-pointer width-0em5 height-0em5 border-radius-rounded border-set-a-white': true,
    'bg-color-white': itemProps.itemSelected,
    'bg-color-component': itemProps.itemSelected,
    'margin-left-xxs': itemProps.itemIndex > 0
  };
};
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

var _BaseComponent5 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

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
      selectedIndex: props.selectedIndexDefault
    };
    return _this;
  }

  (0, _createClass2.default)(Carousel, [{
    key: "prev",
    value: function prev() {
      var selectedIndex = this.state.selectedIndex;
      selectedIndex--;
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
      selectedIndex++;
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

      var _BaseComponent = (0, _BaseComponent5.default)(this.props, Carousel),
          selectedIndexDefault = _BaseComponent.selectedIndexDefault,
          interval = _BaseComponent.interval,
          timeout = _BaseComponent.timeout,
          autoPlay = _BaseComponent.autoPlay,
          pauseOnHover = _BaseComponent.pauseOnHover,
          ControllerComponent = _BaseComponent.controller,
          PagerComponent = _BaseComponent.pager,
          pagerProps = _BaseComponent.pagerProps,
          controllerPrevProps = _BaseComponent.controllerPrevProps,
          controllerNextProps = _BaseComponent.controllerNextProps,
          _BaseComponent$compon = _BaseComponent.component,
          Component = _BaseComponent$compon === void 0 ? _Panel.default.Container : _BaseComponent$compon,
          componentPanel = _BaseComponent.componentPanel,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["selectedIndexDefault", "interval", "timeout", "autoPlay", "pauseOnHover", "controller", "pager", "pagerProps", "controllerPrevProps", "controllerNextProps", "component", "componentPanel", "children"]);

      var selectedIndex = this.state.selectedIndex;
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      if (ControllerComponent === true) ControllerComponent = _Controller;
      if (PagerComponent === true) PagerComponent = _Pager;
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
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
        },
        type: "scroll"
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
        size: children.length,
        selectedIndex: Math.round(selectedIndex)
      }, pagerProps, {
        itemPlain: true
      })) : null);
    }
  }]);
  return Carousel;
}(_react.default.Component);

(0, _defineProperty2.default)(Carousel, "defaultProps", {
  selectedIndexDefault: 0,
  controller: true,
  pager: true,
  interval: 4000,
  autoPlay: true
});
var _default = Carousel; // Carousel Item
// ------------------------------

exports.default = _default;
Carousel.Item = _Panel.default; // Carousel Controller
// ------------------------------

/**
 * 轮播组件内部使用的翻页控制组件
 * @component 
 * @private
 * @augments BaseComponent
 */

var _Controller = function Controller(aprops) {
  var _classSet;

  var _BaseComponent2 = (0, _BaseComponent5.default)(aprops, _Controller),
      isNext = _BaseComponent2.isNext,
      mask = _BaseComponent2.mask,
      icon = _BaseComponent2.icon,
      iconNext = _BaseComponent2.iconNext,
      defaultIcon = _BaseComponent2.defaultIcon,
      defaultIconNext = _BaseComponent2.defaultIconNext,
      _BaseComponent2$compo = _BaseComponent2.component,
      Component = _BaseComponent2$compo === void 0 ? _Icon.default : _BaseComponent2$compo,
      className = _BaseComponent2.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["isNext", "mask", "icon", "iconNext", "defaultIcon", "defaultIconNext", "component", "className"]);

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
  var _BaseComponent3 = (0, _BaseComponent5.default)(aprops, _Pager),
      size = _BaseComponent3.size,
      selected = _BaseComponent3.selected,
      onClick = _BaseComponent3.onClick,
      itemProps = _BaseComponent3.itemProps,
      mask = _BaseComponent3.mask,
      Component = _BaseComponent3.component,
      componnetPanel = _BaseComponent3.componnetPanel,
      className = _BaseComponent3.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["size", "selected", "onClick", "itemProps", "mask", "component", "componnetPanel", "className"]);

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
  var _BaseComponent4 = (0, _BaseComponent5.default)(aprops, _Item),
      index = _BaseComponent4.index,
      size = _BaseComponent4.size,
      selected = _BaseComponent4.selected,
      _onClick = _BaseComponent4.onClick,
      Component = _BaseComponent4.component,
      componnetPanel = _BaseComponent4.componnetPanel,
      className = _BaseComponent4.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["index", "size", "selected", "onClick", "component", "componnetPanel", "className"]);

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
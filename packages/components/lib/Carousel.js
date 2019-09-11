"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireWildcard(require("./Panel"));

var _Icon = _interopRequireDefault(require("./Icon"));

/**
 * @module
 */

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
      var _classNamePreControll,
          _classNamePreControll2,
          _this3 = this;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, Carousel),
          selectedIndexDefault = _BaseComponent.selectedIndexDefault,
          interval = _BaseComponent.interval,
          autoPlay = _BaseComponent.autoPlay,
          pauseOnHover = _BaseComponent.pauseOnHover,
          controller = _BaseComponent.controller,
          pager = _BaseComponent.pager,
          pagerProps = _BaseComponent.pagerProps,
          controllerProps = _BaseComponent.controllerProps,
          controllerPrevProps = _BaseComponent.controllerPrevProps,
          controllerNextProps = _BaseComponent.controllerNextProps,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["selectedIndexDefault", "interval", "autoPlay", "pauseOnHover", "controller", "pager", "pagerProps", "controllerProps", "controllerPrevProps", "controllerNextProps", "children"]);

      var selectedIndex = this.state.selectedIndex;
      children = _react.default.Children.toArray(children).filter(function (v) {
        return v;
      });
      var classNameStrController = 'position-absolute margin-h-xxs padding-a-xxs offset-top-center translate-center-y text-weight-border';
      var classNamePreControllerPrev = (_classNamePreControll = {}, (0, _defineProperty3.default)(_classNamePreControll, classNameStrController, true), (0, _defineProperty3.default)(_classNamePreControll, "offset-left-start", true), _classNamePreControll);
      var classNamePreControllerNext = (_classNamePreControll2 = {}, (0, _defineProperty3.default)(_classNamePreControll2, classNameStrController, true), (0, _defineProperty3.default)(_classNamePreControll2, "offset-right-start", true), _classNamePreControll2);
      var classNamePrePager = 'position-absolute padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';
      return _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
        ctype: "scroll",
        selectedIndex: selectedIndex,
        onSelectedChange: function onSelectedChange(selectedIndex) {
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
      }, props), children, controller ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: _Icon.default,
        classNamePre: classNamePreControllerPrev,
        "b-size": "xl",
        "b-style": "solid",
        "b-theme": "mask",
        name: "left:<",
        onClick: function onClick(e) {
          return _this3.prev();
        },
        panelItemPlain: true
      }, controllerProps, controllerPrevProps)) : null, controller ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: _Icon.default,
        classNamePre: classNamePreControllerNext,
        "b-size": "xl",
        "b-style": "solid",
        "b-theme": "mask",
        name: "right:>",
        onClick: function onClick(e) {
          return _this3.next();
        },
        panelItemPlain: true
      }, controllerProps, controllerPrevProps)) : null, pager ? _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
        component: "ol",
        ctype: "flex",
        selectedIndex: selectedIndex,
        panelItemPlain: true,
        classNamePre: classNamePrePager,
        "b-theme": "mask",
        "b-style": "solid"
      }, pagerProps), (0, _from.default)({
        length: children.length
      }, function (v, k) {
        return k;
      }).map(function (v) {
        return _react.default.createElement(_Panel.default, {
          key: v,
          component: "li",
          classNamePre: "width-0em5 height-0em5 border-radius-rounded",
          "bc-margin-left-xxs": Boolean(v),
          "b-theme": "white",
          "b-style": selectedIndex === v ? 'solid' : 'hollow',
          "bp-panelTheme-bgOnHollow": false,
          onClick: function onClick() {
            return _this3.setState({
              selectedIndex: v
            }, function () {
              return _this3.go();
            });
          }
        });
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

(0, _defineProperty2.default)(Carousel, "Carousel", {
  get: function get() {
    return Carousel;
  },
  set: function set(val) {
    Carousel = val;
  }
});
Carousel.isBnorth = true;
Carousel.defaultProps['b-precast'] = {};
var _default = Carousel;
/**
 *  轮播组件条目
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer 
 * @exportdefault
 */

exports.default = _default;

var _Item = function Item(aprops) {
  var props = (0, _BaseComponent2.default)(aprops, _Item);
  return _react.default.createElement(_Panel.default, props);
};

_Item.defaultProps = {};
(0, _defineProperty2.default)(Carousel, "Item", {
  get: function get() {
    return _Item;
  },
  set: function set(val) {
    _Item = val;
  }
});
_Item.isBnorth = true;
_Item.defaultProps['b-precast'] = {};
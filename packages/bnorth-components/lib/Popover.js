"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _dom = require("./utils/dom");

var _event = require("./utils/event");

var _props = require("./utils/props");

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Popover =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Popover, _React$Component);

  function Popover(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Popover);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Popover).call(this, props, context));
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.props.defaultIsShow && setTimeout(function () {
        return _this2.show();
      }, 100);
    }
  }, {
    key: "show",
    value: function show() {
      this.setState({
        show: true,
        offsetTarget: (0, _dom.domOffset)(this)
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setState({
        show: false,
        offsetOverlay: undefined
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          defaultIsShow = _genCommonProps.defaultIsShow,
          trigger = _genCommonProps.trigger,
          onClick = _genCommonProps.onClick,
          onMouseOver = _genCommonProps.onMouseOver,
          overlay = _genCommonProps.overlay,
          overlayProps = _genCommonProps.overlayProps,
          mask = _genCommonProps.mask,
          maskProps = _genCommonProps.maskProps,
          _genCommonProps$calcP = _genCommonProps.calcPosition,
          calcPosition = _genCommonProps$calcP === void 0 ? Popover.calcPosition : _genCommonProps$calcP,
          placement = _genCommonProps.placement,
          container = _genCommonProps.container,
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? "div" : _genCommonProps$compo,
          children = _genCommonProps.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["defaultIsShow", "trigger", "onClick", "onMouseOver", "overlay", "overlayProps", "mask", "maskProps", "calcPosition", "placement", "container", "component", "children"]);

      var _this$state = this.state,
          show = _this$state.show,
          offsetOverlay = _this$state.offsetOverlay,
          offsetTarget = _this$state.offsetTarget;
      var triggerByTouch = trigger ? trigger === 'click' : _dom.domIsTouch;
      var triggerByHover = trigger ? trigger === 'hover' : !_dom.domIsTouch;
      var triggerProps = {
        onClick: triggerByTouch ? (0, _event.createChainedFunction)(onClick, function () {
          return _this3.state.show ? _this3.hide() : _this3.show();
        }) : onClick,
        onMouseOver: triggerByHover ? (0, _event.createChainedFunction)(onMouseOver, function (e) {
          return _this3.show();
        }) : onMouseOver
      };
      var closeProps = {
        onClick: triggerByTouch ? function () {
          return _this3.hide();
        } : null,
        onMouseMove: triggerByHover ? function (e) {
          var x = e.pageX;
          var y = e.pageY;
          var toffset = (0, _dom.domOffset)(_reactDom.default.findDOMNode(_this3));
          if (!(toffset.left <= x && x <= toffset.left + toffset.width && toffset.top <= y && y <= toffset.top + toffset.height)) _this3.hide();
        } : null
      };
      return _react.default.createElement(Component, (0, _extends2.default)({}, props, triggerProps), (Array.isArray(children) ? children : [children]).map(function (v) {
        return typeof v === 'function' ? v(show, _this3.state, _this3.props) : v;
      }), !show || !container ? null : _reactDom.default.createPortal(_react.default.createElement(_Backdrop.default, (0, _extends2.default)({
        mask: mask
      }, closeProps, maskProps), _react.default.createElement(Popover.Overlay, (0, _extends2.default)({
        calcPosition: calcPosition,
        placement: placement,
        offsetTarget: offsetTarget,
        offsetOverlay: offsetOverlay,
        ref: function ref(e) {
          return e && !offsetOverlay && _this3.setState({
            offsetOverlay: (0, _dom.domOffset)(e)
          });
        }
      }, overlayProps), overlay)), container));
    }
  }]);
  return Popover;
}(_react.default.Component);

Popover.calcPosition = function (offsetTarget, offsetOverlay, placement, main, cross) {
  var classSet = {
    'position-absolute': true
  };
  var styleSet = {};

  switch (placement) {
    case 'left':
      styleSet.left = offsetTarget.left - offsetOverlay.width;
      styleSet.top = offsetTarget.top;
      break;

    case 'right':
      styleSet.left = offsetTarget.left + offsetTarget.width;
      styleSet.top = offsetTarget.top;
      break;

    case 'top':
      styleSet.left = offsetTarget.left;
      styleSet.top = offsetTarget.top - offsetOverlay.height;
      break;

    case 'bottom':
      styleSet.left = offsetTarget.left;
      styleSet.top = offsetTarget.top + offsetTarget.height;
      break;

    default:
      styleSet.left = offsetTarget.left;
      styleSet.top = offsetTarget.top;
      break;
  }

  if (cross === 'full') {
    if (placement === 'top' || placement === 'bottom') {
      styleSet.width = '100%';
      styleSet.left = 0;
      styleSet.right = 0;
    }
  }

  if (cross === 'center') {
    if (placement === 'left' || placement === 'right') {
      styleSet.top -= Math.abs(offsetOverlay.height - offsetTarget.height) / 2;
    }

    if (placement === 'top' || placement === 'bottom') {
      styleSet.left -= Math.abs(offsetOverlay.width - offsetTarget.width) / 2;
    }
  }

  if (main === 'equal') {
    if (placement === 'left' || placement === 'right') {
      styleSet.width = offsetTarget.width;
    }

    if (placement === 'top' || placement === 'bottom') {
      styleSet.height = offsetTarget.height;
    }
  }

  if (main === 'full') {
    if (placement === 'bottom') {
      styleSet.bottom = 0;
    }
  }

  if (cross === 'equal') {
    if (placement === 'left' || placement === 'right') {
      styleSet.height = offsetTarget.height;
    }

    if (placement === 'top' || placement === 'bottom') {
      styleSet.width = offsetTarget.width;
    }
  }

  return [classSet, styleSet];
};

Popover.Overlay =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(_class, _React$Component2);

  function _class() {
    (0, _classCallCheck2.default)(this, _class);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
  }

  (0, _createClass2.default)(_class, [{
    key: "render",
    value: function render() {
      var _genCommonProps2 = (0, _props.genCommonProps)(this.props),
          container = _genCommonProps2.container,
          calcPosition = _genCommonProps2.calcPosition,
          offsetTarget = _genCommonProps2.offsetTarget,
          offsetOverlay = _genCommonProps2.offsetOverlay,
          placement = _genCommonProps2.placement,
          style = _genCommonProps2.style,
          className = _genCommonProps2.className,
          children = _genCommonProps2.children,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["container", "calcPosition", "offsetTarget", "offsetOverlay", "placement", "style", "className", "children"]);

      var classSet = {
        'position-absolute': true,
        'bg-color-white': !(0, _props.hascx)(className, 'bg-color'),
        'border': !(0, _props.hascx)(className, 'border')
      };
      var styleSet = {
        boxSizing: 'content-box'
      };

      var _ref = offsetOverlay ? calcPosition.apply(void 0, [offsetTarget, offsetOverlay].concat((0, _toConsumableArray2.default)(placement && placement.split('-') || []))) : [{
        'visibility-hidden': true
      }, {}],
          _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          classSetPosition = _ref2[0],
          styleSetPosition = _ref2[1];

      return _react.default.createElement("div", (0, _extends2.default)({
        onMouseMove: function onMouseMove(e) {
          return e.stopPropagation();
        },
        style: (0, _objectSpread2.default)({}, styleSet, styleSetPosition, style),
        className: (0, _props.cx)(classSet, classSetPosition, className)
      }, props), children);
    }
  }]);
  return _class;
}(_react.default.Component);

var _default = Popover;
exports.default = _default;
module.exports = exports["default"];
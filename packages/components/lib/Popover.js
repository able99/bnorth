"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.regexp.split");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/es6.promise");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _dom = require("./utils/dom");

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

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
    key: "show",
    value: function show() {
      this.setState({
        show: true,
        offsetTarget: (0, _dom.domOffset)(this, this.container)
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setState({
        show: false,
        offsetTarget: undefined,
        offsetOverlay: undefined
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.container = (0, _dom.domFindContainer)(this, this.props.container);
      if (this.props.defaultIsShow) Promise.resolve().then(function () {
        return _this2.show();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _parseProps = (0, _props.default)(this.props, Popover.props),
          defaultIsShow = _parseProps.defaultIsShow,
          trigger = _parseProps.trigger,
          onClick = _parseProps.onClick,
          onMouseOver = _parseProps.onMouseOver,
          overlay = _parseProps.overlay,
          overlayProps = _parseProps.overlayProps,
          _parseProps$mask = _parseProps.mask,
          mask = _parseProps$mask === void 0 ? false : _parseProps$mask,
          maskProps = _parseProps.maskProps,
          _parseProps$calcPosit = _parseProps.calcPosition,
          calcPosition = _parseProps$calcPosit === void 0 ? Popover.calcPosition : _parseProps$calcPosit,
          placement = _parseProps.placement,
          container = _parseProps.container,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
          componentPanel = _parseProps.componentPanel,
          children = _parseProps.children,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["defaultIsShow", "trigger", "onClick", "onMouseOver", "overlay", "overlayProps", "mask", "maskProps", "calcPosition", "placement", "container", "component", "componentPanel", "children"]);

      var _this$state = this.state,
          show = _this$state.show,
          offsetOverlay = _this$state.offsetOverlay,
          offsetTarget = _this$state.offsetTarget;
      var triggerByTouch = trigger ? trigger === 'click' : _dom.domIsTouch;
      var triggerByHover = trigger ? trigger === 'hover' : !_dom.domIsTouch;
      var triggerProps = {
        onClick: triggerByTouch ? (0, _dom.chainedFuncs)(onClick, function () {
          return _this3.state.show ? _this3.hide() : _this3.show();
        }) : onClick,
        onMouseOver: triggerByHover ? (0, _dom.chainedFuncs)(onMouseOver, function (e) {
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
          var toffset = _this3.state.offsetTarget || {};
          if (!(toffset.left <= x && x <= toffset.left + toffset.width && toffset.top <= y && y <= toffset.top + toffset.height)) _this3.hide();
        } : null
      };
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel
      }, triggerProps, props), typeof children === 'function' ? children(show, this.state, this.props) : children, !show ? null : (0, _dom.domCreatePortal)(_react.default.createElement(_Backdrop.default, (0, _extends2.default)({
        mask: mask
      }, closeProps, maskProps), _react.default.createElement(Popover.Overlay, (0, _extends2.default)({
        calcPosition: calcPosition,
        placement: placement,
        offsetTarget: offsetTarget,
        offsetOverlay: offsetOverlay,
        ref: function ref(e) {
          return e && !offsetOverlay && _this3.setState({
            offsetOverlay: (0, _dom.domOffset)(e, _this3.container)
          });
        }
      }, overlayProps), typeof overlay === 'function' ? overlay(this) : overlay)), this.container));
    }
  }]);
  return Popover;
}(_react.default.Component);

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
      var _parseProps2 = (0, _props.default)(this.props, Popover.Overlay.props),
          calcPosition = _parseProps2.calcPosition,
          offsetTarget = _parseProps2.offsetTarget,
          offsetOverlay = _parseProps2.offsetOverlay,
          placement = _parseProps2.placement,
          _parseProps2$componen = _parseProps2.component,
          Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
          componentPanel = _parseProps2.componentPanel,
          style = _parseProps2.style,
          className = _parseProps2.className,
          props = (0, _objectWithoutProperties2.default)(_parseProps2, ["calcPosition", "offsetTarget", "offsetOverlay", "placement", "component", "componentPanel", "style", "className"]);

      var classStr = 'position-absolute bg-color-white border-set-a-';
      var styleSet = {
        boxSizing: 'content-box'
      };

      var _ref = offsetOverlay ? calcPosition.apply(void 0, [offsetTarget, offsetOverlay].concat((0, _toConsumableArray2.default)(placement && placement.split('-') || []))) : [{
        'visibility-hidden': true
      }, {}],
          _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          classSetPosition = _ref2[0],
          styleSetPosition = _ref2[1];

      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        onMouseMove: function onMouseMove(e) {
          return e.stopPropagation();
        },
        style: (0, _objectSpread2.default)({}, styleSet, styleSetPosition, style),
        className: (0, _classes.default)(classStr, classSetPosition, className)
      }, props));
    }
  }]);
  return _class;
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

var _default = Popover;
exports.default = _default;
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

/**
 * @module
 */

/**
 * 弹出内容与目标组件的位置计算回调函数
 * @callback calcPositionCallBack
 * @param {module:utils/dom~ElementOffset} offsetTarget - 目标组件的坐标与尺寸
 * @param {module:utils/dom~ElementOffset} offsetOverlay - 弹出内容的坐标与尺寸
 * @param {string} placement - 弹出内容的位置，包括：left，right，top，bottom
 * @param {string} main - 弹出内容的主轴布局方式，full：填满 center：居中 equal：与目标组件相同 auto：默认
 * @param {string} cross - 弹出内容的侧轴布局方式，参见主轴
 */
// Popover
// --------------------

/**
 * 可弹出内容组件，可设置弹出内容相对于当前组件的位置
 * @component
 * @augments BaseComponent
 * @exportdefault
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
  /**
   * 显示弹出内容
   */


  (0, _createClass2.default)(Popover, [{
    key: "show",
    value: function show() {
      this.setState({
        show: true,
        offsetTarget: (0, _dom.domOffset)(this, this.container)
      });
    }
    /**
     * 关闭弹出内容
     */

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
          mask = _parseProps.mask,
          maskProps = _parseProps.maskProps,
          _parseProps$calcPosit = _parseProps.calcPosition,
          calcPosition = _parseProps$calcPosit === void 0 ? Popover.calcPosition : _parseProps$calcPosit,
          placement = _parseProps.placement,
          container = _parseProps.container,
          Component = _parseProps.component,
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
          var x = e.clientX;
          var y = e.clientY;
          var toffset = _this3.state.offsetTarget || {};
          console.log(1111, x, y, toffset); // if(!(toffset.left <= x && x <= toffset.left+toffset.width && toffset.top <= y && y <= toffset.top+toffset.height)) this.hide();
        } : null
      };
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel
      }, triggerProps, props), typeof children === 'function' ? children(show, this.state, this.props, this) : children, !show ? null : (0, _dom.domCreatePortal)(_react.default.createElement(_Backdrop.default, (0, _extends2.default)({
        mask: mask
      }, closeProps, maskProps), _react.default.createElement(_Overlay, (0, _extends2.default)({
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

Popover.defaultProps = {};
/**
 * 设置是否创建时为弹出状态
 * @attribute module:Popover.Popover.defaultIsShow
 * @type {boolean}
 */

/**
 * 弹出内容触发方式，包括，click：点击时弹出 hover：鼠标移过时弹出
 * @attribute module:Popover.Popover.trigger
 * @type {boolean}
 * @default 非触摸屏时：click，触摸屏时：hover
 */

/**
 * 弹出的内容
 * @attribute module:Popover.Popover.overlay
 * @type {element|component}
 */

/**
 * 弹出内容的属性
 * @attribute module:Popover.Popover.overlayProps
 * @type {object}
 */

/**
 * 弹出内容是否有蒙层，如果设置为真，则使用默认蒙层主题的蒙层
 * @attribute module:Popover.Popover.mask
 * @type {boolean|string}
 */

/**
 * 蒙层的属性
 * @attribute module:Popover.Popover.maskProps
 * @type {object}
 */

/**
 * 弹出内容与组件的相对位置计算函数
 * @attribute module:Popover.Popover.calcPosition
 * @type {module:Popover~calcPositionCallBack}
 */

Popover.defaultProps.calcPosition = Popover.calcPosition;
/**
 * 设置弹出内容与目标组件的相对位置与布局，格式为 placement-main-cross，参见 calcPositionCallBack
 * @attribute module:Popover.Popover.placement
 * @type {string}
 */

/**
 * 设置弹出内容的容器
 * @attribute module:Popover.Popover.container
 * @type {boolean}
 */

/**
 * 参见 BaseComponent
 */

Popover.defaultProps.component = _Panel.default;
var _default = Popover; // Calc Position
// --------------------

/**
 * 弹出层位置计算函数
 */

exports.default = _default;

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
}; // Overlay
// --------------------

/**
 * 弹出层组件
 * @component
 * @augments BaseComponent
 * @mount Popover.Overlay
 * @private
 */


var _Overlay =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(Overlay, _React$Component2);

  function Overlay() {
    (0, _classCallCheck2.default)(this, Overlay);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Overlay).apply(this, arguments));
  }

  (0, _createClass2.default)(Overlay, [{
    key: "render",
    value: function render() {
      var _parseProps2 = (0, _props.default)(this.props, _Overlay.props),
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
  return Overlay;
}(_react.default.Component);

_Overlay.defaultProps = {};
/**
 * 参见 calcPositionCallBack
 * @attribute module:Popover~Overlay.calcPosition
 */

/**
 * 参见 calcPositionCallBack
 * @attribute module:Popover~Overlay.offsetTarget
 */

/**
 * 参见 calcPositionCallBack
 * @attribute module:Popover~Overlay.offsetOverlay
 */

/**
 * 参见 calcPositionCallBack
 * @attribute module:Popover~Overlay.placement
 */

/**
 * 参见 BaseComponent
 */

_Overlay.defaultProps.component = _Panel.default;
Object.defineProperty(Popover, "Overlay", {
  get: function get() {
    return _Overlay;
  },
  set: function set(val) {
    _Overlay = val;
  }
});
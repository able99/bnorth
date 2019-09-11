"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

require("core-js/modules/es6.regexp.split");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent3 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty3.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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

  function Popover() {
    (0, _classCallCheck2.default)(this, Popover);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Popover).apply(this, arguments));
  }

  (0, _createClass2.default)(Popover, [{
    key: "show",

    /**
     * 显示弹出内容
     */
    value: function show() {
      this.setState({
        show: true,
        offsetTarget: (0, _BaseComponent3.domOffset)(this, this.dock)
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
      var _this = this;

      this.dock = (0, _BaseComponent3.domFindDock)(this, this.props.dock);
      if (this.props.defaultIsShow) _promise.default.resolve().then(function () {
        return _this.show();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _BaseComponent = (0, _BaseComponent3.default)(this.props, Popover),
          defaultIsShow = _BaseComponent.defaultIsShow,
          trigger = _BaseComponent.trigger,
          onClick = _BaseComponent.onClick,
          onMouseOver = _BaseComponent.onMouseOver,
          overlay = _BaseComponent.overlay,
          overlayProps = _BaseComponent.overlayProps,
          backdropProps = _BaseComponent.backdropProps,
          calcPosition = _BaseComponent.calcPosition,
          placement = _BaseComponent.placement,
          dock = _BaseComponent.dock,
          children = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["defaultIsShow", "trigger", "onClick", "onMouseOver", "overlay", "overlayProps", "backdropProps", "calcPosition", "placement", "dock", "children"]);

      var _ref = this.state || {},
          show = _ref.show,
          offsetOverlay = _ref.offsetOverlay,
          offsetTarget = _ref.offsetTarget;

      children = typeof children === 'function' ? children(show, this.state, this.props, this) : children;
      overlay = typeof overlay === 'function' ? overlay(this) : overlay;
      var triggerByTouch = trigger ? trigger === 'click' : _BaseComponent3.domIsTouch;
      var triggerByHover = trigger ? trigger === 'hover' : !_BaseComponent3.domIsTouch;
      var triggerProps = {
        onClick: triggerByTouch ? (0, _BaseComponent3.chainedFuncs)(onClick, function () {
          return show ? _this2.hide() : _this2.show();
        }) : onClick,
        onMouseOver: triggerByHover ? (0, _BaseComponent3.chainedFuncs)(onMouseOver, function (e) {
          return _this2.show();
        }) : onMouseOver
      };
      var closeProps = {
        onClick: triggerByTouch ? function () {
          return _this2.hide();
        } : null,
        onMouseMove: triggerByHover ? function (e) {
          var x = e.clientX;
          var y = e.clientY;
          var toffset = _this2.state.offsetTarget || {};
          if (!(toffset.left <= x && x <= toffset.left + toffset.width && toffset.top <= y && y <= toffset.top + toffset.height)) _this2.hide();
        } : null
      };
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({}, triggerProps, props), children, !show ? null : (0, _BaseComponent3.domCreatePortal)(_react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: _Backdrop.default
      }, closeProps, backdropProps), _react.default.createElement(_Overlay, (0, _extends2.default)({
        calcPosition: calcPosition,
        placement: placement,
        offsetTarget: offsetTarget,
        offsetOverlay: offsetOverlay,
        ref: function ref(e) {
          return e && !offsetOverlay && _this2.setState({
            offsetOverlay: (0, _BaseComponent3.domOffset)(e, _this2.dock)
          });
        }
      }, overlayProps), overlay)), this.dock));
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
 * 弹出内容与目标组件的位置计算回调函数
 * @callback calcPositionCallBack
 * @param {module:utils/dom~ElementOffset} offsetTarget - 目标组件的坐标与尺寸
 * @param {module:utils/dom~ElementOffset} offsetOverlay - 弹出内容的坐标与尺寸
 * @param {string} placement - 弹出内容的位置，包括：left，right，top，bottom
 * @param {string} main - 弹出内容的主轴布局方式，full：填满 center：居中 equal：与目标组件相同 auto：默认
 * @param {string} cross - 弹出内容的侧轴布局方式，参见主轴
 */

/**
 * 弹出内容与组件的相对位置计算函数
 * @attribute module:Popover.Popover.calcPosition
 * @type {module:Popover~calcPositionCallBack}
 */

Popover.defaultProps.calcPosition = function (offsetTarget, offsetOverlay, placement, main, cross) {
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
/**
 * 设置弹出内容与目标组件的相对位置与布局，格式为 placement-main-cross，参见 calcPositionCallBack
 * @attribute module:Popover.Popover.placement
 * @type {string}
 */

/**
 * 设置弹出内容的容器
 * @attribute module:Popover.Popover.dock
 * @type {boolean}
 */


(0, _defineProperty3.default)(Popover, "Popover", {
  get: function get() {
    return Popover;
  },
  set: function set(val) {
    Popover = val;
  }
});
Popover.isBnorth = true;
Popover.defaultProps['b-precast'] = {};
var _default = Popover;
/**
 * 弹出层组件
 * @component
 * @augments BaseComponent
 * @mount Popover.Overlay
 * @private
 */

exports.default = _default;

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
      var _BaseComponent2 = (0, _BaseComponent3.default)(this.props, _Overlay),
          calcPosition = _BaseComponent2.calcPosition,
          offsetTarget = _BaseComponent2.offsetTarget,
          offsetOverlay = _BaseComponent2.offsetOverlay,
          placement = _BaseComponent2.placement,
          classNamePre = _BaseComponent2.classNamePre,
          stylePre = _BaseComponent2.stylePre,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["calcPosition", "offsetTarget", "offsetOverlay", "placement", "classNamePre", "stylePre"]);

      var _ref2 = offsetOverlay ? calcPosition.apply(void 0, [offsetTarget, offsetOverlay].concat((0, _toConsumableArray2.default)(placement && placement.split('-') || []))) : [{
        'visibility-hidden': true
      }, {}],
          _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
          classNamePosition = _ref3[0],
          stylePosition = _ref3[1];

      classNamePre = _objectSpread({
        'position-absolute bg-color-white border-set-a-': true
      }, classNamePosition, {}, classNamePre);
      stylePre = _objectSpread({
        boxSizing: 'content-box'
      }, stylePosition, {}, stylePre);
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        onMouseMove: function onMouseMove(e) {
          return e.stopPropagation();
        },
        classNamePre: classNamePre,
        stylePre: stylePre
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

(0, _defineProperty3.default)(Popover, "Overlay", {
  get: function get() {
    return _Overlay;
  },
  set: function set(val) {
    _Overlay = val;
  }
});
_Overlay.isBnorth = true;
_Overlay.defaultProps['b-precast'] = {};
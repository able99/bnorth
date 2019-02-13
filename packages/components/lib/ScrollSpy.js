"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent = require("./BaseComponent");

/**
 * @module
 */

/**
 * 滚动监控组件
 * @component
 * @exportdefault
 */
var ScrollSpy =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ScrollSpy, _React$Component);

  function ScrollSpy(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ScrollSpy);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ScrollSpy).call(this, props));
    _this.relative = '';
    return _this;
  }

  (0, _createClass2.default)(ScrollSpy, [{
    key: "_getTargetOffset",
    value: function _getTargetOffset() {
      this.targetOffset = null;
      var _this$props = this.props,
          _this$props$target = _this$props.target,
          target = _this$props$target === void 0 ? true : _this$props$target,
          onRelativeChange = _this$props.onRelativeChange;
      if (!target || !onRelativeChange) return;

      if (target === true) {
        this.targetOffset = (0, _BaseComponent.domOffset)(this, this.container);
      } else if (target === 'parent') {
        var dom = (0, _BaseComponent.domFindNode)(this);
        if (!dom) return;
        dom = dom.parentNode;
        if (!dom) return;
        this.targetOffset = (0, _BaseComponent.domOffset)(dom, this.container);
      }

      if (this.targetOffset) this.targetOffset.bottom = this.targetOffset.top + this.targetOffset.height;
    }
  }, {
    key: "_getScrollOffset",
    value: function _getScrollOffset() {
      if (!this.container) return {};
      return {
        top: this.container.scrollTop,
        bottom: this.container.scrollTop + this.container.offsetHeight
      };
    }
  }, {
    key: "_getRelative",
    value: function _getRelative(targetOffset, scrollOffset) {
      // top is within the viewport
      if (targetOffset.top <= scrollOffset.top && scrollOffset.top <= targetOffset.bottom) {
        return 'above_inside';
      } // bottom is within the viewport


      if (targetOffset.top <= scrollOffset.bottom && scrollOffset.bottom <= targetOffset.bottom) {
        return 'below_inside';
      } // top is above the viewport and bottom is below the viewport


      if (scrollOffset.top <= targetOffset.top && targetOffset.bottom <= scrollOffset.bottom) {
        return 'inside';
      }

      if (targetOffset.bottom < scrollOffset.bottom) {
        return 'above';
      }

      if (scrollOffset.top < targetOffset.top) {
        return 'below';
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.container = (0, _BaseComponent.domFindScrollContainer)(this, this.props.container, this.props.horizontal);

      this._getTargetOffset();

      this.offScrollListener = (0, _BaseComponent.listen)(this.container, 'scroll', this._handlePosChange.bind(this), true);
      this.offResizeListener = (0, _BaseComponent.listen)(window, 'resize', this._handlePosChange.bind(this), true);

      this._handlePosChange();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.offScrollListener && this.offScrollListener();
      this.offResizeListener && this.offResizeListener();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._getTargetOffset();

      this._handlePosChange();
    }
  }, {
    key: "_handlePosChange",
    value: function _handlePosChange(event) {
      var _this$props2 = this.props,
          onPosChange = _this$props2.onPosChange,
          onRelativeChange = _this$props2.onRelativeChange;
      onPosChange && onPosChange(event, this.container);
      if (!onRelativeChange || !this.targetOffset) return;
      var targetOffset = this.targetOffset;

      var scrollOffset = this._getScrollOffset();

      var relative = this._getRelative(targetOffset, scrollOffset);

      if (relative !== this.relative) {
        onRelativeChange(relative, this.relative, event, this.container);
        this.relative = relative;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          Component = _this$props3.component,
          style = _this$props3.style,
          props = (0, _objectWithoutProperties2.default)(_this$props3, ["component", "style"]);
      return _react.default.createElement(Component, (0, _extends2.default)({
        style: (0, _objectSpread2.default)({
          fontSize: 0
        }, style)
      }, props));
    }
  }]);
  return ScrollSpy;
}(_react.default.Component);

ScrollSpy.defaultProps = {};
/**
 * TODO
 * @type {boolean|string}
 */

ScrollSpy.defaultProps.target = true;
/**
 * TODO
 * @attribute module:ScrollSpy.ScrollSpy.container
 * @type {boolean}
 */

/**
 * 监听横向滚动条，默认监听纵向滚动条
 * @attribute module:ScrollSpy.ScrollSpy.horizontal
 * @type {boolean}
 */

/**
 * 相对位置
 * 
 * - above_inside：
 * - below_inside：
 * - inside：
 * - above：
 * - below：
 * 
 * @typedef RelativeType
 * @type {string}
 */

/**
 * 相对位置改变回调函数
 * @callback onRelativeChangeCallback
 * @param {module:ScrollSpy~RelativeType} relative - 相对位置
 * @param {module:ScrollSpy~RelativeType} preRelative - 改变前的相对位置
 * @param {event} event - 引起改变的滚动事件
 * @param {element} container - 滚动对象的 dom 元素
 */

/**
 * 设置滚动位置改变时引起，监控组件与滚动组件相对位置改变的事件的回调函数
 * @attribute module:ScrollSpy.ScrollSpy.onRelativeChange
 * @type {module:ScrollSpy~onRelativeChangeCallback}
 */

/**
 * 滚动位置改变回调函数
 * @callback onPosChangeCallback
 * @param {event} event - 引起改变的滚动事件
 * @param {element} container - 滚动对象的 dom 元素
 */

/**
 * 设置滚动位置改变时触发事件的回调函数
 * @attribute module:ScrollSpy.ScrollSpy.onPosChange
 * @type {module:ScrollSpy~onPosChangeCallback}
 */

/**
 * 参见 BaseComponent
 */

ScrollSpy.defaultProps.component = 'span';
var _default = ScrollSpy;
exports.default = _default;
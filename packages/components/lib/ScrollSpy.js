"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _dom = require("./utils/dom");

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
        this.targetOffset = (0, _dom.domOffset)(this, this.container);
      } else if (target === 'parent') {
        var dom = (0, _dom.domFindNode)(this);
        if (!dom) return;
        dom = dom.parentNode;
        if (!dom) return;
        this.targetOffset = (0, _dom.domOffset)(dom, this.container);
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
      this.container = (0, _dom.domFindScrollContainer)(this, this.props.container, this.props.horizontal);

      this._getTargetOffset();

      this.offScrollListener = (0, _dom.listen)(this.container, 'scroll', this._handlePosChange.bind(this), true);
      this.offResizeListener = (0, _dom.listen)(window, 'resize', this._handlePosChange.bind(this), true);

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
      return this.props.children || _react.default.createElement("span", {
        style: {
          fontSize: 0
        }
      });
    }
  }]);
  return ScrollSpy;
}(_react.default.Component);

exports.default = ScrollSpy;
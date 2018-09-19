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

var _reactDom = _interopRequireDefault(require("react-dom"));

var _props = require("./utils/props");

var _Button = _interopRequireDefault(require("./Button"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Fab =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Fab, _React$Component);

  function Fab() {
    (0, _classCallCheck2.default)(this, Fab);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Fab).apply(this, arguments));
  }

  (0, _createClass2.default)(Fab, [{
    key: "handleRef",
    value: function handleRef(e) {
      var container = this.props.container;
      var el = e;

      while (el = el.parentElement) {
        if (el === document.body) {
          this.container = el;
          break;
        }

        ;

        if (el.getAttribute('data-container-page')) {
          this.container = el;
          break;
        }

        ;

        if (container === true && el.getAttribute('data-container') === 'true') {
          this.container = el;
          break;
        }

        ;

        if (container && el.getAttribute('data-container') === container) {
          this.container = el;
          break;
        }

        ;
      }

      if (!this.container) this.container = document.body;
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _genCommonProps = (0, _props.genCommonProps)(this.props),
          _genCommonProps$x = _genCommonProps.x,
          x = _genCommonProps$x === void 0 ? 8 : _genCommonProps$x,
          _genCommonProps$y = _genCommonProps.y,
          y = _genCommonProps$y === void 0 ? 8 : _genCommonProps$y,
          _genCommonProps$h = _genCommonProps.h,
          h = _genCommonProps$h === void 0 ? 'end' : _genCommonProps$h,
          _genCommonProps$v = _genCommonProps.v,
          v = _genCommonProps$v === void 0 ? 'end' : _genCommonProps$v,
          container = _genCommonProps.container,
          _genCommonProps$compo = _genCommonProps.component,
          Component = _genCommonProps$compo === void 0 ? _Button.default : _genCommonProps$compo,
          className = _genCommonProps.className,
          style = _genCommonProps.style,
          props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["x", "y", "h", "v", "container", "component", "className", "style"]);

      if ((container === true || typeof container === 'string') && !this.container) {
        return _react.default.createElement("span", {
          ref: function ref(e) {
            return e && _this.handleRef(e);
          },
          style: {
            fontSize: 0
          }
        });
      }

      var classStr = 'position-absolute';
      var classSet = {
        'translate-center-x': h === 'center',
        'translate-center-y': v === 'center',
        'offset-center-x': h === 'center',
        'offset-center-y': v === 'center'
      };
      var styleSet = {};
      if (h === 'start') styleSet['left'] = x;
      if (h === 'center') styleSet['left'] = '50%';
      if (h === 'end') styleSet['right'] = x;
      if (v === 'start') styleSet['top'] = y;
      if (v === 'center') styleSet['top'] = '50%';
      if (v === 'end') styleSet['bottom'] = y;

      var component = _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _props.cxm)(classStr, classSet, className),
        style: (0, _objectSpread2.default)({}, styleSet, style)
      }, props));

      return this.container || container ? _reactDom.default.createPortal(component, this.container || container) : component;
    }
  }]);
  return Fab;
}(_react.default.Component);

exports.default = Fab;
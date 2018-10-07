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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _dom = require("./utils/dom");

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
      this.container = (0, _dom.domFindContainer)(e, this.props.container);
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _parseProps = (0, _props.default)(this.props),
          _parseProps$x = _parseProps.x,
          x = _parseProps$x === void 0 ? 8 : _parseProps$x,
          _parseProps$y = _parseProps.y,
          y = _parseProps$y === void 0 ? 8 : _parseProps$y,
          _parseProps$h = _parseProps.h,
          h = _parseProps$h === void 0 ? 'end' : _parseProps$h,
          _parseProps$v = _parseProps.v,
          v = _parseProps$v === void 0 ? 'end' : _parseProps$v,
          container = _parseProps.container,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Button.default : _parseProps$component,
          className = _parseProps.className,
          style = _parseProps.style,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["x", "y", "h", "v", "container", "component", "className", "style"]);

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
        className: (0, _classes.default)(classStr, classSet, className),
        style: (0, _objectSpread2.default)({}, styleSet, style)
      }, props));

      return this.container || container ? _reactDom.default.createPortal(component, this.container || container) : component;
    }
  }]);
  return Fab;
}(_react.default.Component);

exports.default = Fab;
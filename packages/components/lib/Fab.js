"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

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
    key: "_handleRef",
    value: function _handleRef(e) {
      this.container = (0, _dom.domFindContainer)(e, this.props.container);
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _parseProps = (0, _props.default)(this.props, Fab.props),
          _parseProps$h = _parseProps.h,
          h = _parseProps$h === void 0 ? 'end' : _parseProps$h,
          _parseProps$v = _parseProps.v,
          v = _parseProps$v === void 0 ? 'end' : _parseProps$v,
          container = _parseProps.container,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Button.default : _parseProps$component,
          className = _parseProps.className,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["h", "v", "container", "component", "className"]);

      if ((container === true || typeof container === 'string') && !this.container) {
        return _react.default.createElement("span", {
          ref: function ref(e) {
            return e && _this._handleRef(e);
          },
          style: {
            fontSize: 0
          }
        });
      }

      var classStr = 'position-absolute margin-a-';
      var classSet = {
        'translate-center-x': h === 'center' && v !== 'center',
        'translate-center-y': h !== 'center' && v === 'center',
        'translate-center-a': h === 'center' && v === 'center',
        'offset-left-center': h === 'center',
        'offset-top-center': v === 'center',
        'offset-left-start': h === 'start',
        'offset-right-start': h === 'end',
        'offset-top-start': v === 'start',
        'offset-bottom-start': v === 'end'
      };

      var component = _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classes.default)(classStr, classSet, className)
      }, props));

      return this.container ? (0, _dom.domCreatePortal)(component, this.container) : component;
    }
  }]);
  return Fab;
}(_react.default.Component);

exports.default = Fab;
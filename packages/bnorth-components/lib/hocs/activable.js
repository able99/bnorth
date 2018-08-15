"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activable = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _event = require("../utils/event");

var _dom = require("../utils/dom");

var _hocHelper = _interopRequireDefault(require("../utils/hocHelper"));

var Activable =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Activable, _React$Component);

  function Activable(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, Activable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Activable).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getBindMethod", function (aprops) {
      if (_dom.domIsTouch) {
        var onTouchStart = aprops.onTouchStart,
            props = (0, _objectWithoutProperties2.default)(aprops, ["onTouchStart"]);
        return (0, _objectSpread2.default)({
          onTouchStart: (0, _event.createChainedFunction)(_this.down, onTouchStart)
        }, props);
      } else if (_dom.domIsMouse) {
        var onMouseDown = aprops.onMouseDown,
            _props2 = (0, _objectWithoutProperties2.default)(aprops, ["onMouseDown"]);

        return (0, _objectSpread2.default)({
          onMouseDown: (0, _event.createChainedFunction)(_this.down, onMouseDown)
        }, _props2);
      }

      return aprops;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "down", function (event) {
      if (_dom.domIsTouch) {
        _this.setState({
          active: true
        });

        var lisener = (0, _event.listen)(event.target, 'touchend', function () {
          _this.setState({
            active: false
          });

          lisener();
        });
      } else if (_dom.domIsMouse) {
        if (!(event.buttons & 1)) return;

        _this.setState({
          active: true
        });

        var _lisener = (0, _event.listen)(event.target, 'mouseup', function () {
          _this.setState({
            active: false
          });

          _lisener();

          lisener1();
        });

        var lisener1 = (0, _event.listen)(document, 'mouseup', function () {
          _this.setState({
            active: false
          });

          _lisener();

          lisener1();
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "up", function () {
      _this.setState({
        active: false
      });
    });
    _this.state = {
      active: false
    };
    return _this;
  }

  (0, _createClass2.default)(Activable, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var clonedChildren = (0, _react.cloneElement)(children, this.getBindMethod(this.props));
      return clonedChildren;
    }
  }]);
  return Activable;
}(_react.default.Component);

exports.default = Activable;

var activable = function activable(WrappedComponent) {
  var EnhancedComponent =
  /*#__PURE__*/
  function (_Activable) {
    (0, _inherits2.default)(EnhancedComponent, _Activable);

    function EnhancedComponent() {
      (0, _classCallCheck2.default)(this, EnhancedComponent);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnhancedComponent).apply(this, arguments));
    }

    (0, _createClass2.default)(EnhancedComponent, [{
      key: "render",
      value: function render() {
        var activeProps = this.props.active;
        var activeState = this.state.active;
        return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, this.getBindMethod(this.props), {
          active: activeProps === undefined ? activeState : activeProps
        }));
      }
    }]);
    return EnhancedComponent;
  }(Activable);

  return (0, _hocHelper.default)(WrappedComponent, EnhancedComponent, 'Activable');
};

exports.activable = activable;
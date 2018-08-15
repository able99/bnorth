"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timable = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _hocHelper = _interopRequireDefault(require("../utils/hocHelper"));

var timable = function timable(WrappedComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var EnhancedComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(EnhancedComponent, _React$Component);

    function EnhancedComponent(props) {
      var _this;

      (0, _classCallCheck2.default)(this, EnhancedComponent);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnhancedComponent).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentDidMount", function () {
        if (_this.props.autoStart) _this.start();
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentWillUnmount", function () {
        _this.stop();
      });
      _this.state = {
        sum: _this.props.defaultSum || 0,
        isOver: false
      };
      return _this;
    }

    (0, _createClass2.default)(EnhancedComponent, [{
      key: "increase",
      value: function increase(value) {
        var sum = this.state.sum;
        sum += value ? value : this.props.random ? Math.random() * this.props.intervalTime : this.props.intervalTime;
        var isOver = this.props.autoStop ? this.props.timeout && sum > this.props.timeout : this.props.isClose;
        this.setState({
          sum: sum,
          isOver: isOver
        });
        if (isOver) this.stop();
      }
    }, {
      key: "start",
      value: function start() {
        this.interval = setInterval(this.increase.bind(this), this.props.intervalTime);
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.interval) clearInterval(this.interval);
      }
    }, {
      key: "full",
      value: function full() {
        var sum = this.state.sum;
        this.increase(this.props.timeout - sum);
      }
    }, {
      key: "reset",
      value: function reset() {
        this.setState({
          sum: 0,
          isOver: false
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(nextProps) {
        if (!this.props.isClose && nextProps.isClose) {
          this.full();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            defaultSum = _this$props.defaultSum,
            autoStart = _this$props.autoStart,
            autoStop = _this$props.autoStop,
            isClose = _this$props.isClose,
            random = _this$props.random,
            props = (0, _objectWithoutProperties2.default)(_this$props, ["defaultSum", "autoStart", "autoStop", "isClose", "random"]);
        return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, props, this.state));
      }
    }]);
    return EnhancedComponent;
  }(_react.default.Component);

  (0, _defineProperty2.default)(EnhancedComponent, "defaultProps", {
    defaultSum: 0,
    autoStart: true,
    intervalTime: 1000,
    timeout: null,
    random: true,
    autoStop: true,
    isClose: false
  });
  return (0, _hocHelper.default)(WrappedComponent, EnhancedComponent, options, 'Timable');
};

exports.timable = timable;
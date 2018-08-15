"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var ContextComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ContextComponent, _React$Component);

  function ContextComponent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ContextComponent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ContextComponent).call(this, props));
    _this.app = props.app;
    _this.state = {};
    _this.app.context.provider = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ContextComponent, [{
    key: "update",
    value: function update(data) {
      this.setState((0, _objectSpread2.default)({}, this.state, data));
    }
  }, {
    key: "data",
    value: function data(name) {
      var data = this.state;
      return name ? data[name] : data;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(this.app.context.Provider, {
        value: (0, _objectSpread2.default)({}, this.state)
      }, this.props.children);
    }
  }]);
  return ContextComponent;
}(_react.default.Component);

var Context =
/*#__PURE__*/
function () {
  function Context(app) {
    var _this2 = this;

    (0, _classCallCheck2.default)(this, Context);
    this.app = app;
    this.app.event.on(this.app, 'onAppStartContext', function () {
      _this2.createStore();
    });
  }

  (0, _createClass2.default)(Context, [{
    key: "createStore",
    value: function createStore() {
      var _this3 = this;

      var _createContext = (0, _react.createContext)(),
          Provider = _createContext.Provider,
          Consumer = _createContext.Consumer;

      this.Provider = Provider;
      this.Consumer = Consumer;

      this.consumerHoc = function (Component) {
        return function (props) {
          return _react.default.createElement(_this3.Consumer, null, function (context) {
            return _react.default.createElement(Component, (0, _extends2.default)({
              context: context
            }, props));
          });
        };
      };

      this.app.render.component = _react.default.createElement(ContextComponent, {
        app: this.app
      }, this.app.render.component);
      this.app.Page = this.consumerHoc(this.app.Page);
    }
  }, {
    key: "stateInit",
    value: function stateInit(name, data) {
      var adata = this.provider.data();
      adata[name] = data;
      return this.provider.update(adata);
    }
  }, {
    key: "stateUpdate",
    value: function stateUpdate(name, data) {
      var adata = this.provider.data();
      adata[name] = this.app.utils.objectUpdate(adata[name], data);
      return this.provider.update(adata);
    }
  }, {
    key: "stateClean",
    value: function stateClean(name) {
      var data = this.provider.data();
      delete data[name];
      return this.provider.update(data);
    }
  }, {
    key: "stateData",
    value: function stateData(name, defualtValue) {
      return this.provider.data(name) || defualtValue;
    }
  }]);
  return Context;
}();

exports.default = Context;
module.exports = exports["default"];
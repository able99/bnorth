"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContextComponent = function (_React$Component) {
  (0, _inherits3.default)(ContextComponent, _React$Component);

  function ContextComponent(props) {
    (0, _classCallCheck3.default)(this, ContextComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContextComponent.__proto__ || Object.getPrototypeOf(ContextComponent)).call(this, props));

    _this.app = props.app;
    _this.state = {};
    _this.app.context.provider = _this;
    return _this;
  }

  (0, _createClass3.default)(ContextComponent, [{
    key: "update",
    value: function update(data) {
      this.setState((0, _extends3.default)({}, this.state, data));
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
      return _react2.default.createElement(
        this.app.context.Provider,
        { value: (0, _extends3.default)({}, this.state) },
        this.props.children
      );
    }
  }]);
  return ContextComponent;
}(_react2.default.Component);

var Context = function () {
  function Context(app) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Context);

    this.app = app;
    this.app.event.on(this.app, 'onAppStartContext', function () {
      _this2.createStore();
    });
  }

  (0, _createClass3.default)(Context, [{
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
          return _react2.default.createElement(
            _this3.Consumer,
            null,
            function (context) {
              return _react2.default.createElement(Component, (0, _extends3.default)({ context: context }, props));
            }
          );
        };
      };
      this.app.render.component = _react2.default.createElement(
        ContextComponent,
        { app: this.app },
        this.app.render.component
      );
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
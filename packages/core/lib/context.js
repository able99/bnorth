"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es6.function.name");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

/**
 * @module
 */
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
    value: function update(data, cb) {
      return this.setState((0, _objectSpread2.default)({}, this.state, data), cb);
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
/**
 * App 数据管理模块，提供数据仓库功能，实现数据管理
 * @see {@link https://able99.github.io/cbnorth/data.html} bnorth 数据流
 * @exportdefault
 */


var Context =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Context(app) {
    var _this2 = this;

    (0, _classCallCheck2.default)(this, Context);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.context';
    this.app.event.on(this.app._id, 'onAppStartContext', function () {
      _this2._createStore();
    });
  }

  (0, _createClass2.default)(Context, [{
    key: "_createStore",
    value: function _createStore() {
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
    /**
     * 清除指定 id 的数据块
     * @param {string} - 数据块 id
     * @param {function} - 完成时的回调函数 
     * @returns {promise} react state 操作 promise
     */

  }, {
    key: "clear",
    value: function clear(_id, cb) {
      var state = this.provider.data();
      delete state[_id];
      return this.provider.update(state, cb);
    }
    /**
     * 更新指定 id 的数据块，使用 `app.utils.objectUpdate` 更新策略
     * @param {string} - 数据块 id
     * @param {*} - 要更新的数据
     * @param {function} - 完成时的回调函数 
     * @returns {promise} react state 操作 promise
     */

  }, {
    key: "update",
    value: function update(_id, data, cb) {
      this.app.log.debug('context: update', _id);
      var state = this.provider.data();
      state[_id] = this.app.utils.objectUpdate(state[_id], data);
      return this.provider.update(state, cb);
    }
    /**
     * 设置指定 id 的数据块
     * @param {string} - 数据块 id
     * @param {*} - 要设置的数据
     * @param {function} - 完成时的回调函数 
     * @returns {promise} react state 操作 promise
     */

  }, {
    key: "set",
    value: function set(_id, data, cb) {
      this.app.log.debug('context: set', _id);
      var state = this.provider.data();
      state[_id] = data;
      return this.provider.update(state, cb);
    }
    /**
     * 设置指定 id 的数据块，使用 `app.utils.objectDelete`
     * @param {string} - 数据块 id
     * @param {*} - 删除标识
     * @returns {promise} react state 操作 promise
     */

  }, {
    key: "delete",
    value: function _delete(_id, _did, cb) {
      this.app.log.debug('context: delete', _id);
      var state = this.provider.data();
      state[_id] = this.app.utils.objectDelete(state[_id], _did);
      return this.provider.update(state, cb);
    }
    /**
     * 读取指定 id 的数据块
     * @param {string} - 数据块 id
     * @param {*} - 读取失败时的默认值 
     * @param {boolean} - 读取时是否深度复制，使用 `app.utils.objectCopy` 策略
     */

  }, {
    key: "data",
    value: function data(_id, defualtValue, deep) {
      var data = this.provider.data(_id);
      return this.app.utils.objectCopy(data === undefined ? defualtValue : data, deep);
    }
  }]);
  return Context;
}();

var _default = Context;
exports.default = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

require("core-js/modules/es6.function.name");

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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
    _this.app.context.provider = (0, _assertThisInitialized2.default)(_this);
    return _this;
  }

  (0, _createClass2.default)(ContextComponent, [{
    key: "init",
    value: function init(data, cb) {
      return this.setState(data, cb);
    }
  }, {
    key: "update",
    value: function update(data, cb) {
      this.state = _objectSpread({}, this.state, {}, data);
      return this.setState(this.state, cb);
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
        value: _objectSpread({}, this.state)
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
    this.Component = ContextComponent;

    var _createContext = (0, _react.createContext)(),
        Provider = _createContext.Provider,
        Consumer = _createContext.Consumer;

    this.Provider = Provider;
    this.Consumer = Consumer;

    this.consumerHoc = function (Component) {
      return function (props) {
        return _react.default.createElement(_this2.Consumer, null, function (context) {
          return _react.default.createElement(Component, (0, _extends2.default)({
            context: context
          }, props));
        });
      };
    };
  }
  /**
   * 清除指定 id 的数据块
   * @param {string} - 数据块 id
   * @param {function} - 完成时的回调函数 
   * @returns {promise} react state 操作 promise
   */


  (0, _createClass2.default)(Context, [{
    key: "clear",
    value: function clear(_id, cb) {
      var state = this.provider.data();
      delete state[_id];
      return this.provider.init(state, cb);
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
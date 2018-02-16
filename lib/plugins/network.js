'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOption(value, defaultValue) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var ret = typeof value === 'function' ? value.apply(undefined, args) : value;
  return ret || defaultValue;
}

/**
 * 网络请求参数
 * @class NetworkOptions
 * @property {string|function} [resource=''] - url 地址
 * @property {string} [baseUrl=app.config.network.baseUrl] - url 地址
 * @property {string} [apiUrl=app.config.network.apiUrl] - url 地址
 * @property {object|function} [params] - 请求url 的查询字符串对象
 * @property {object|function} [header] - 请求头
 * @property {string} [contentType='application/json'] - content type
 * @property {string} [method=isFetch?'get':'post'] - http 方法
 * @property {number} [timeout=app.config.networkTimeout] - 请求超时时间
 * @property {boolean} [noAuth=false] - 指示该请求无需登录信息，一般用户登录操作本身
 * @property {string} [responseType='json'] - 设定请求结果解析类型(arraybuffer,blob,document,json,text,stream)
 * @property {function|string|object|ArrayBuffer|FormData|File|Bold} [data] - 请求数据
 * @property {object} [options] - 直接传递给[axios](https://www.npmjs.com/package/axios) 的参数，比如withCredentials，auth，onDownloadProgress，onUploadProgress 等
 */

/**
 * 网络请求
 * @class
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var Network = function () {
  function Network(app) {
    (0, _classCallCheck3.default)(this, Network);

    this.app = app;
  }

  // event
  // ---------------------------
  /**
   * 处理网络请求状态的错误
   * @method
   * @param {number} status - 网络请求状态码
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @param {NetworkOptions} options - 请求参数
   */


  (0, _createClass3.default)(Network, [{
    key: '_handleStatusError',
    value: function _handleStatusError(status, isFetch, options) {
      switch (status) {
        case 401:
          this.app.user && this.app.user.toLogin(null, true);
          return true;
        default:
          return false;
      }
    }

    /**
     * 处理返回结果，对结果进行编辑，或者抛出异常，或者跳转
     * @method
     * @param {*} result - 请求结果
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @param {NetworkOptions} options - 请求参数
     */

  }, {
    key: '_handleResult',
    value: function _handleResult(result, isFetch, options) {
      return result;
    }

    /**
     * 处理请求异常
     * @method
     * @param {string|Error} error - 异常信息
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @param {NetworkOptions} options - 请求参数
     * @param {object} config - axios 本次请求的实例 
     */

  }, {
    key: '_handleError',
    value: function _handleError(error, isFetch, options, config) {}

    // format
    // ---------------------------
    /**
     * 返回请求头部对象
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {object} - 请求头部
     */

  }, {
    key: '_getRequestHeaders',
    value: function _getRequestHeaders(options, isFetch) {
      return {};
    }

    /**
     * 返回请求查询字符串对象
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {object} - 查询字符串对象
     */

  }, {
    key: '_getRequestParams',
    value: function _getRequestParams(options, isFetch) {
      return {};
    }

    /**
     * 返回请求content type
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {string} - content type
     */

  }, {
    key: '_getRequestContentType',
    value: function _getRequestContentType(options, isFetch) {
      return this.app.config.network.contentType;
    }

    /**
     * 返回请求方法
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {string} - 请求方法
     */

  }, {
    key: '_getRequestMethod',
    value: function _getRequestMethod(options, isFetch) {
      return isFetch ? 'GET' : 'POST';
    }

    /**
     * 返回请求数据
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {string|object|ArrayBuffer|FormData|File|Bold} - 请求数据
     */

  }, {
    key: '_getRequestData',
    value: function _getRequestData(options, isFetch) {
      return getOption(options.data, {}, options, isFetch);
    }

    /**
     * 格式化请求返回的数据
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {string|object|blob|Arraybuffer} - 返回的数据
     */

  }, {
    key: '_getResultData',
    value: function _getResultData(result, isFetch) {
      return result;
    }

    // fetch
    // ---------------------------
    /**
     * 获取网络数据
     * @method
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {Promise} - 请求返回promise-resolve(返回的数据)-reject(错误信息)
     */

  }, {
    key: 'fetch',
    value: function fetch() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return (0, _axios2.default)((0, _extends3.default)({
        url: options.apiUrl || this.app.config.network.apiUrl + getOption(options.resource, '', options, isFetch),
        baseURL: options.baseUrl || this.app.config.network.baseUrl,
        method: this._getRequestMethod(options, isFetch),
        headers: (0, _extends3.default)({}, this._getRequestHeaders(options, isFetch), getOption(options.headers, {}, options, isFetch), {
          "Content-Type": this._getRequestContentType(options, isFetch)
        }),
        params: Object.assign.apply(Object, [{}].concat((0, _toConsumableArray3.default)(this._getRequestParams(options, isFetch)), (0, _toConsumableArray3.default)(getOption(options.params, {}, options, isFetch)))),
        timeout: options.timeout || this.app.config.timeout,
        responseType: options.responseType || this.app.config.responseType,
        data: this._getRequestData(options, isFetch)
      }, getOption(options.options, {}, options, isFetch))).then(function (result) {
        result = _this._getResultData(result, isFetch);
        result = _this._handleResult(result, isFetch, options);
        return result;
      }, function (error) {
        if (error.response) {
          error = _this._handleStatusError(error.response.status, isFetch, error.response, options, error.config);
        } else {
          error = _this._handleError(error, isFetch, options, error.config);
        }
        if (error) throw error;
      }).then(function (result) {
        return result;
      }, function (error) {
        throw error;
      });
    }
  }]);
  return Network;
}();

/**
 * **plugin** name: network dependence: none
 * 提供网络访问的能力扩展
 * @class networkPlugin
 * @property {class} app.Network - Network 类
 * @property {Network} app.network - Network 类实例
 */


exports.default = {
  name: 'network',

  init: function init(app) {
    app.Network = Network;
    app.network = new Network(app);
  }
};
module.exports = exports['default'];
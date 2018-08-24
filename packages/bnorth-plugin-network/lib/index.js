"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

function getOption(value, defaultValue) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var ret = typeof value === 'function' ? value.apply(void 0, args) : value;
  return ret || defaultValue;
}

var Network =
/*#__PURE__*/
function () {
  // main
  // --------------------------------
  function Network(app) {
    (0, _classCallCheck2.default)(this, Network);
    this.app = app;
    this.baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port === 80 || window.location.port === 443 || window.location.port === "" ? "" : ":" + window.location.port) + "/";
    this.apiUrl = '';
  } // event
  // ---------------------------

  /**
   * 处理网络请求状态的错误
   * @method
   * @param {number} status - 网络请求状态码
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @param {NetworkOptions} options - 请求参数
   */


  (0, _createClass2.default)(Network, [{
    key: "_handleStatusError",
    value: function _handleStatusError(error, isFetch, options) {
      switch (error && error.response && error.response.status) {
        case 401:
          this.app.user && this.app.user.toLogin(null, true);
          return Promise.reject();

        default:
          return Promise.reject(error);
      }
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
    key: "_handleError",
    value: function _handleError(error, isFetch, options) {
      return Promise.reject(error);
    }
    /**
     * 处理返回结果
     * 1. 对结果进行编辑，并返回新的结果
     * 1. 抛出异常
     * 1. 跳转后，并返回true，将不再继续处理数据
     * @method
     * @param {*} result - 请求结果
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @param {NetworkOptions} options - 请求参数
     */

  }, {
    key: "_handleResult",
    value: function _handleResult(result, isFetch, options) {
      return result;
    } // format
    // ---------------------------

    /**
     * 返回请求头部对象
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {object} - 请求头部
     */

  }, {
    key: "_getRequestHeaders",
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
    key: "_getRequestParams",
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
    key: "_getRequestContentType",
    value: function _getRequestContentType(options, isFetch) {
      return this.contentType;
    }
    /**
     * 返回请求方法
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {string} - 请求方法
     */

  }, {
    key: "_getRequestMethod",
    value: function _getRequestMethod(options, isFetch) {
      return options.method || (isFetch ? 'GET' : 'POST');
    }
    /**
     * 返回请求数据
     * @method 
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {string|object|ArrayBuffer|FormData|File|Bold} - 请求数据
     */

  }, {
    key: "_getRequestData",
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
    key: "_getResultData",
    value: function _getResultData(result, isFetch) {
      return result;
    } // fetch
    // ---------------------------

    /**
     * 获取网络数据
     * @method
     * @param {NetworkOptions} options - 请求参数
     * @param {boolean} isFetch - 是获取请求还是操作请求
     * @return {Promise} - 请求返回promise-resolve(返回的数据)-reject(错误信息)
     */

  }, {
    key: "fetch",
    value: function fetch() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cancelTokenCB = arguments.length > 2 ? arguments[2] : undefined;
      return (0, _axios.default)((0, _objectSpread2.default)({
        url: options.apiUrl || this.apiUrl + getOption(options.url, '', options, isFetch),
        baseURL: options.baseUrl || this.baseUrl,
        method: this._getRequestMethod(options, isFetch),
        headers: (0, _objectSpread2.default)({}, this._getRequestHeaders(options, isFetch), getOption(options.headers, {}, options, isFetch), {
          "Content-Type": this._getRequestContentType(options, isFetch)
        }),
        params: (0, _objectSpread2.default)({}, this._getRequestParams(options, isFetch), getOption(options.params, {}, options, isFetch)),
        timeout: options.timeout || this.app.config.timeout,
        responseType: options.responseType || this.app.config.responseType,
        data: this._getRequestData(options, isFetch),
        cancelToken: cancelTokenCB ? new CancelToken(function (cancel) {
          return cancelTokenCB(cancel);
        }) : undefined
      }, getOption(options.options, {}, options, isFetch))).then(function (result) {
        var ret = _this._getResultData(result, isFetch, options, result);

        ret = _this._handleResult(ret, isFetch, options, result);
        return ret;
      }, function (error) {
        if (error.response) {
          return _this._handleStatusError(error, isFetch, options);
        } else {
          return _this._handleError(error, isFetch, options);
        }
      });
    }
  }]);
  return Network;
}(); // plugin 
// --------------------------------


var _default = {
  _id: 'network',
  onPluginMount: function onPluginMount(app) {
    app.Network = Network;
    app.network = new Network(app);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.Network = undefined;
    app.network = undefined;
  }
};
exports.default = _default;
module.exports = exports["default"];
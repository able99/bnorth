"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

/**
 * @module
 */

/**
 * 解析请求类参数的回调，可使用 this 指针，指向 PluginOptions 实例
 * @callback NetworkRequestOptionCallback
 * @property {module:app.App} app - App 的实例
 * @returns {*} 请求参数
 */

/**
 * 解析响应类参数的回调，可使用 this 指针，指向 PluginOptions 实例
 * @callback NetworkResponseOptionCallback
 * @property {module:app.App} app - App 的实例
 * @property {*} data -响应数据
 * @returns {*} 预处理后的响应数据
 */

/**
 * 处理响应成功的回调，可使用 this 指针，指向 PluginOptions 实例
 * @callback NetworkHandleSuccessOptionCallback
 * @property {module:app.App} app - App 的实例
 * @property {module:index~NetWorkResultSuccess} data -响应数据
 * @returns {module:index~NetWorkResultSuccess} 预处理后的响应数据
 */

/**
 * 处理响应错误的回调，可使用 this 指针，指向 PluginOptions 实例
 * @callback NetworkHandleErrorOptionCallback
 * @property {module:app.App} app - App 的实例
 * @property {module:index~NetWorkResultError} data -响应数据
 * @returns {module:index~NetWorkResultError} 预处理后的响应错误
 */

/**
 * 请求成功返回值
 * @typedef NetWorkResultSuccess
 * @type {object}
 * @property {string} config - axios请求配置
 * @property {*} data - 服务端返回的数据
 * @property {string} headers - 响应头
 * @property {string} request - dom 请求实例
 * @property {number} status - 服务端返回的状态码
 * @property {string} statusText - 服务端返回的状态信息
 */

/**
 * 请求失败返回值
 * @typedef NetWorkResultError
 * @type {Error}
 * @property {string} config - axios请求配置
 * @property {string} request - dom 请求实例
 * @property {module:index~NetWorkResultSuccess} response - 响应信息，如果网络错误该字段为空
 * @property {string} message - 错误信息
 * @property {string} stack - 错误栈
 */

/**
 * 浏览器插件参数，扩展了默认的插件参数
 * @typedef PluginOptions
 * @extends module:plugin~PluginDefine
 * @type {object}
 * @property {string} baseUrl - 请求地址的基地址
 * @property {string} apiUrl - 请求地址的基地址的补充
 * @property {string} url - 请求地址
 * @property {string} timeout - 请求超时时间
 * @property {string} responseType - 相应的内容的类型
 * @property {object} options - 请求参数键值对
 * @property {module:index~NetworkRequestOptionCallback} getRequestHeaders - 获取请求头
 * @property {module:index~NetworkRequestOptionCallback} getRequestParams - 获取请求查询字符串
 * @property {module:index~NetworkRequestOptionCallback} getRequestContentType - 获取请求内容的类型
 * @property {module:index~NetworkRequestOptionCallback} getRequestMethod - 获取请求的方法
 * @property {module:index~NetworkRequestOptionCallback} getRequestData - 获取请求数据
 * @property {module:index~NetworkResponseOptionCallback} getResponseData - 返回预处理的响应数据
 * @property {module:index~NetworkHandleErrorOptionCallback} handleStatusError - 预处理服务器的响应错误
 * @property {module:index~NetworkHandleErrorOptionCallback} handleError - 预处理运行时的响应错误
 * @property {module:index~NetworkHandleSuccessOptionCallback} handleResponse - 预处理响应成功信息，如果阻止运行，抛出异常
 */

/**
 * 网络通讯类，由插件构造，挂载在 app 上
 */
var Network =
/*#__PURE__*/
function () {
  function Network(app, _id, options) {
    (0, _classCallCheck2.default)(this, Network);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 所属插件的实例的 id
     * @type {string}
     */

    this._id = _id;
    /**
     * 所属插件的实例的 options
     * @type {module:index~PluginOptions}
     */

    this.options = (0, _objectSpread2.default)({}, Network.Options, options);
    this._axios = _axios.default;
  }

  (0, _createClass2.default)(Network, [{
    key: "_fetch",
    value: function _fetch(options) {
      return this._axios(options);
    }
    /**
     * 发起请求
     * @param {module:index~PluginOptions} - 请求参数，可临时替换默认参数 
     * @returns {promise} 返回 promise 实例
     * @returns {module:index~NetWorkResultSuccess} promise resolve 返回
     * @returns {module:index~NetWorkResultError} promise reject 返回
     */

  }, {
    key: "fetch",
    value: function fetch(options, request) {
      var app = this.app;
      options = app.utils.getOptions(this.options, options);
      var params = (0, _objectSpread2.default)({
        url: options.getUrl(),
        baseURL: options.getBaseUrl(),
        method: options.getRequestMethod(app),
        headers: (0, _objectSpread2.default)({
          "Content-Type": options.getRequestContentType(app)
        }, options.getRequestHeaders(app)),
        params: options.getRequestParams(app),
        timeout: options.timeout,
        responseType: options.responseType,
        data: options.getRequestData(app),
        cancelToken: options.getCancelCB && new this._axios.CancelToken(function (cancel) {
          return options.getCancelCB(cancel);
        })
      }, options.options);
      return this._fetch(params).then(function (result) {
        result = options.getResponseData(app, result);
        return options.handleResponse(app, result);
      }, function (error) {
        return error.response ? options.handleStatusError(app, error) : options.handleError(app, error);
      });
    }
  }]);
  return Network;
}();
/**
 * 网络请求类的默认参数
 * @type {index~PluginOptions}
 */


Network.Options = {
  baseUrl: '/',
  apiUrl: '',
  url: '',
  // timeout: 1000*60,
  // responseType: '',
  getBaseUrl: function getBaseUrl(app) {
    return this.baseUrl || '';
  },
  getUrl: function getUrl(app) {
    return (this.apiUrl || '') + ((typeof this.url === 'function' ? this.url() : this.url) || '');
  },
  getRequestHeaders: function getRequestHeaders(app) {
    return this.headers || {};
  },
  getRequestParams: function getRequestParams(app) {
    return this.params || {};
  },
  getRequestContentType: function getRequestContentType(app) {
    return this.contentType;
  },
  getRequestMethod: function getRequestMethod(app) {
    return this.method || (!this.isSubmit ? 'GET' : 'POST');
  },
  getRequestData: function getRequestData(app) {
    return (typeof this.data === 'function' ? this.data() : this.data) || {};
  },
  getResponseData: function getResponseData(app, data) {
    return data;
  },
  handleStatusError: function handleStatusError(app, data) {
    switch (data && data.response && data.response.status) {
      case 401:
        this.app.user && this.app.user.toLogin(null, true);
        return Promise.reject();

      default:
        return Promise.reject(data);
    }
  },
  handleError: function handleError(app, data) {
    return Promise.reject(data);
  },
  handleResponse: function handleResponse(app, data) {
    return data;
  }
};
/**
 * 为 App 实例增加网络通讯模块
 * @plugin 
 * @exportdefault
 */

var network = function network(app, plugin, options) {
  return {
    _id: 'network',
    _onStart: function _onStart() {
      /**
       * 为 App 实例增加网络通讯操作类
       * @memberof module:index.network
       * @type {module:index~Network}
       * @mount app.Network
       */
      app.Network = Network;
      /**
       * 为 App 实例增加网络通讯操作实例
       * @memberof module:index.network
       * @type {module:index~Network}
       * @mount app.network
       */

      app.network = new Network(app, plugin._id, options);
    },
    _onStop: function _onStop() {
      delete app.Network;
      delete app.network;
    }
  };
};

var _default = network;
exports.default = _default;
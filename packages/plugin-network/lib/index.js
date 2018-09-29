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

var Network =
/*#__PURE__*/
function () {
  function Network(app, _id, options) {
    (0, _classCallCheck2.default)(this, Network);
    this.app = app;
    this._id = _id;
    this.options = (0, _objectSpread2.default)({}, Network.Options, options);
  }

  (0, _createClass2.default)(Network, [{
    key: "fetch",
    value: function fetch(options, request) {
      var app = this.app;
      options = app.utils.getOptions(this.options, options);
      return (0, _axios.default)((0, _objectSpread2.default)({
        url: options.apiUrl + options.url,
        baseURL: options.baseUrl,
        method: options.getRequestMethod(app),
        headers: (0, _objectSpread2.default)({}, options.getRequestHeaders(app), {
          "Content-Type": options.getRequestContentType(app)
        }),
        params: options.getRequestParams(app),
        timeout: options.timeout,
        responseType: options.responseType,
        data: options.getRequestData(app),
        cancelToken: options.getCancelCB && new _axios.default.CancelToken(function (cancel) {
          return options.getCancelCB(cancel);
        })
      }, options.options || {})).then(function (result) {
        result = options.getResponseData(app, result);
        return options.handleResponse(app, result);
      }, function (error) {
        return error.response ? options.handleStatusError(app, error) : options.handleError(app, error);
      });
    }
  }]);
  return Network;
}();

Network.Options = {
  baseUrl: window.location.protocol + "//" + window.location.hostname + (window.location.port === 80 || window.location.port === 443 || window.location.port === "" ? "" : ":" + window.location.port) + "/",
  apiUrl: '',
  url: '',
  // timeout: 1000*60,
  // responseType: '',
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
  },
  getRequestHeaders: function getRequestHeaders(app, data) {
    return this.headers || {};
  },
  getRequestParams: function getRequestParams(app, data) {
    return this.params || {};
  },
  getRequestContentType: function getRequestContentType(app, data) {
    return this.contentType;
  },
  getRequestMethod: function getRequestMethod(app, data) {
    return this.method || (!this.isSubmit ? 'GET' : 'POST');
  },
  getRequestData: function getRequestData(app, data) {
    return (typeof this.data === 'function' ? this.data() : this.data) || {};
  },
  getResponseData: function getResponseData(app, data) {
    return data;
  }
};

var _default = function _default(app, options) {
  return {
    _id: 'network',
    onPluginMount: function onPluginMount(app, plugin) {
      app.Network = Network;
      app.network = new Network(app, plugin._id, options);
    },
    onPluginUnmount: function onPluginUnmount(app) {
      delete app.Network;
      delete app.network;
    }
  };
};

exports.default = _default;
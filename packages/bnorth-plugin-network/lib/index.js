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

var Network =
/*#__PURE__*/
function () {
  function Network(app) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, Network);
    this.app = app;
    this.options = (0, _objectSpread2.default)({}, Network.Options, options);
  }

  (0, _createClass2.default)(Network, [{
    key: "fetch",
    value: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cancelTokenCB = arguments.length > 2 ? arguments[2] : undefined;
      app = this.app;
      options = this.app.utils.getOptions(this.options, options);
      return (0, _axios.default)((0, _objectSpread2.default)({
        url: options.apiUrl + options.url,
        baseURL: options.baseUrl,
        method: options.getRequestMethod(app, isFetch),
        headers: (0, _objectSpread2.default)({}, options.getRequestHeaders(app, isFetch), {
          "Content-Type": options.getRequestContentType(app, isFetch)
        }),
        params: options.getRequestParams(app, isFetch),
        timeout: options.timeout,
        responseType: options.responseType,
        data: options.getRequestData(app, isFetch),
        cancelToken: cancelTokenCB ? new CancelToken(function (cancel) {
          return cancelTokenCB(cancel);
        }) : undefined
      }, options.options || {})).then(function (result) {
        result = options.getResponseData(app, isFetch, result);
        return options.handleResponse(app, isFetch, result);
      }, function (error) {
        return error.response ? options.handleStatusError(app, isFetch, error) : options.handleError(app, isFetch, error);
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
  handleStatusError: function handleStatusError(app, isFetch, data) {
    switch (data && data.response && data.response.status) {
      case 401:
        this.app.user && this.app.user.toLogin(null, true);
        return Promise.reject();

      default:
        return Promise.reject(data);
    }
  },
  handleError: function handleError(app, isFetch, data) {
    return Promise.reject(data);
  },
  handleResponse: function handleResponse(app, isFetch, data) {
    return data;
  },
  getRequestHeaders: function getRequestHeaders(app, isFetch, data) {
    return this.headers || {};
  },
  getRequestParams: function getRequestParams(app, isFetch, data) {
    return this.params || {};
  },
  getRequestContentType: function getRequestContentType(app, isFetch, data) {
    return this.contentType;
  },
  getRequestMethod: function getRequestMethod(app, isFetch, data) {
    return this.method || (isFetch ? 'GET' : 'POST');
  },
  getRequestData: function getRequestData(app, isFetch, data) {
    return (typeof this.data === 'function' ? this.data() : this.data) || {};
  },
  getResponseData: function getResponseData(app, isFetch, data) {
    return data;
  }
};
var _default = {
  _id: 'network',
  onPluginMount: function onPluginMount(app, plugin, options) {
    app.Network = Network;
    app.network = new Network(app, options);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.Network;
    delete app.network;
  }
};
exports.default = _default;
module.exports = exports["default"];
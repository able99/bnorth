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

var _urlParse = require("url-parse");

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchTimeout = function fetchTimeout(input, opts) {
  return new Promise(function (resolve, reject) {
    var timeoutId = setTimeout(function () {
      reject(new Error("fetch timeout"));
    }, opts.timeout || 90000);
    fetch(input, opts).then(function (res) {
      clearTimeout(timeoutId);
      resolve(res);
    }, function (err) {
      clearTimeout(timeoutId);
      reject(err);
    });
  });
};

/**
 * 为app 提供网络访问的能力扩展
 * @class
 * **插件** 该类为插件类扩展了App 的能力
 * app.Network: 该类的原型
 * app.network: 该类的实例
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
  //==================
  // cache
  //==================


  (0, _createClass3.default)(Network, [{
    key: "clearCache",
    value: function clearCache() {
      this.app.storage && this.app.storage.clear("^bnorth_netcache");
    }
  }, {
    key: "saveCache",
    value: function saveCache(item, data) {
      this.app.storage && this.app.storage.saveObj("bnorth_netcache_" + item, data);
    }
  }, {
    key: "getCache",
    value: function getCache(item) {
      return this.app.storage && this.app.storage.getObj("bnorth_netcache_" + item);
    }
  }, {
    key: "getCacheFetchKey",
    value: function getCacheFetchKey(options) {
      return options.resource;
    }
  }, {
    key: "getCacheOperateKey",
    value: function getCacheOperateKey(options) {
      return options.resource;
    }

    //==================
    // format
    //==================

  }, {
    key: "formatFetchResult",
    value: function formatFetchResult(result) {
      return result;
    }
  }, {
    key: "formatOperateResult",
    value: function formatOperateResult(result) {
      return result;
    }

    //==================
    // error handle
    //==================

  }, {
    key: "handleStatus",
    value: function handleStatus(status, isFetch, options) {
      switch (status) {
        case 401:
          this.app.user && this.app.user.toLogin(null, true);
          return true;
        default:
          return false;
      }
    }
  }, {
    key: "handleResult",
    value: function handleResult(result, isFetch, options) {
      return false;
    }

    //==================
    // param
    //==================
    //authorization

  }, {
    key: "paramAuthorization",
    value: function paramAuthorization(options) {
      if (options.noAuth) return {};
      return {
        "authorization": this.app.user && this.app.user.getToken() || ''
      };
    }
    //header

  }, {
    key: "paramFetchHeader",
    value: function paramFetchHeader(options) {
      return {};
    }
  }, {
    key: "paramOperateHeader",
    value: function paramOperateHeader(options) {
      return {};
    }
    //url

  }, {
    key: "paramFetchUrl",
    value: function paramFetchUrl(options) {
      var resource = typeof options.resource === 'function' ? options.resource() : options.resource;
      resource = (resource.indexOf("http") === 0 || resource.indexOf("//") === 0 ? '' : this.app.config.urls.base + this.app.config.urls.api) + resource;
      var uo = (0, _urlParse2.default)(resource, true);

      if (this.paramFetchMethod(options).toLowerCase() === 'get') {
        Object.assign(uo.query, this.paramFetchBodyPre(options), options.query || {});
      } else {
        Object.assign(uo.query, options.query || {});
      }

      if (options.params) {
        //todo
      }

      return uo.toString();
    }
  }, {
    key: "paramOperateUrl",
    value: function paramOperateUrl(options) {
      var resource = typeof options.resource === 'function' ? options.resource() : options.resource;
      resource = (resource.indexOf("http") === 0 || resource.indexOf("//") === 0 ? '' : this.app.config.urls.base + this.app.config.urls.api) + resource;
      var uo = (0, _urlParse2.default)(resource, true);

      Object.assign(uo.query, options.query || {});

      if (options.params) {
        //todo
      }

      return uo.toString();
    }
    //method

  }, {
    key: "paramFetchMethod",
    value: function paramFetchMethod(options) {
      return options.method || "get";
    }
  }, {
    key: "paramOperateMethod",
    value: function paramOperateMethod(options) {
      return options.method || "POST";
    }
    //body

  }, {
    key: "paramFetchBodyPre",
    value: function paramFetchBodyPre(options) {
      return (typeof options.data === 'function' ? options.data() : options.data) || {};
    }
  }, {
    key: "paramFetchBody",
    value: function paramFetchBody(options) {
      return JSON.stringify(this.paramFetchBodyPre(options));
    }
  }, {
    key: "paramOperateBodyPre",
    value: function paramOperateBodyPre(options) {
      return (typeof options.data === 'function' ? options.data() : options.data) || {};
    }
  }, {
    key: "paramOperateBody",
    value: function paramOperateBody(options) {
      return JSON.stringify(this.paramOperateBodyPre(options));
    }
    //contenttype

  }, {
    key: "paramFetchContentType",
    value: function paramFetchContentType(options) {
      return {};
    }
  }, {
    key: "paramOperateContentType",
    value: function paramOperateContentType(options) {
      return {
        "Content-Type": "application/json"
      };
    }

    //==================
    // main if
    //==================
    /**
     * 获取网络数据
     * @method
     * @param {object} options - 参数对象，具体包括：<br />
     * **resource**
     * **data**
     * **query**
     * **params**
     * **methods**
     * @return {Promise} - 
     */

  }, {
    key: "fetch",
    value: function fetch() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      options.resource = options.resource || "";
      var fetchScope = {};
      var fetchUrl = this.paramFetchUrl(options);
      var fetchOption = {
        method: this.paramFetchMethod(options),
        headers: (0, _extends3.default)({}, this.paramAuthorization(options), this.paramFetchHeader(options), this.paramFetchContentType(options)),
        credentials: 'include'
      };
      if (fetchOption.method && fetchOption.method.toString().toLowerCase() !== 'get') {
        fetchOption.body = this.paramFetchBody(options);
      }

      return fetchTimeout(fetchUrl, fetchOption).then(function (res) {
        fetchScope.res = res;
        return res.json();
      }, function (error) {
        return Promise.reject(error);
      }).then(function (result) {
        if (fetchScope.res && (fetchScope.res.ok || fetchScope.res.status >= 200 && fetchScope.res.status < 300)) {
          var handle = _this.handleResult(result, true, options, fetchScope.res);
          if (handle) return Promise.reject(handle === true ? null : handle);

          return result;
        } else {
          var _handle = _this.handleStatus(fetchScope.res.status, true, options, result, fetchScope.res);
          if (_handle) return Promise.reject(_handle === true ? null : _handle);

          return Promise.reject(Object.assign({ code: fetchScope.res.status, message: fetchScope.res.statusText || _this.app.config.strings.networkError }, result));
        }
      }, function (error) {
        if (!fetchScope.res) {
          error.message = _this.app.config.strings.networkError;
          return Promise.reject(error);
        }

        var handle = _this.handleStatus(fetchScope.res.status, true, options, null, fetchScope.res);
        if (handle) return Promise.reject(handle === true ? null : handle);

        return Promise.reject({ code: fetchScope.res.status, message: fetchScope.res.statusText || _this.app.config.strings.networkError });
      }).then(function (result) {
        result = _this.formatFetchResult(result);
        if (_this.app.config.networkCache) {
          _this.saveCache(_this.getCacheFetchKey(options), result);
        }
        return result;
      }, function (error) {
        if (_this.app.config.networkCache) {
          var cache = _this.getCache(_this.getCacheFetchKey(options));
          if (cache) {
            return Promise.resolve(cache);
          }
        } else {
          return Promise.reject(error);
        }
      });
    }

    /**
     * 提交网络数据
     * @method
     * @param {object} options - 参数对象，具体包括：<br />
     * **resource**
     * **data**
     * **query**
     * **params**
     * **methods**
     * @return {Promise} - 
     */

  }, {
    key: "operate",
    value: function operate() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      options.resource = options.resource || "";
      var fetchScope = {};
      var fetchUrl = this.paramOperateUrl(options);
      var fetchOption = {
        method: this.paramOperateMethod(options),
        headers: (0, _extends3.default)({}, this.paramAuthorization(options), this.paramOperateHeader(options), options.data && options.data instanceof FormData ? {} : this.paramOperateContentType(options)),
        credentials: 'include'
      };
      if (fetchOption.method && fetchOption.method.toString().toLowerCase() !== 'get') {
        var body = this.paramOperateBodyPre(options);
        fetchOption.body = body instanceof FormData ? body : this.paramOperateBody(options);
      }

      return fetchTimeout(fetchUrl, fetchOption).then(function (res) {
        fetchScope.res = res;
        return res.json();
      }, function (error) {
        return Promise.reject(error);
      }).then(function (result) {
        if (fetchScope.res && (fetchScope.res.ok || fetchScope.res.status >= 200 && fetchScope.res.status < 300)) {
          var handle = _this2.handleResult(result, false, options, fetchScope.res);
          if (handle) return Promise.reject(handle === true ? null : handle);

          return result;
        } else {
          var _handle2 = _this2.handleStatus(fetchScope.res.status, false, options, result, fetchScope.res);
          if (_handle2) return Promise.reject(_handle2 === true ? null : _handle2);

          return Promise.reject(Object.assign({ code: fetchScope.res.status, message: fetchScope.res.statusText || _this2.app.config.strings.networkError }, result));
        }
      }, function (error) {
        if (!fetchScope.res) {
          error.message = _this2.app.config.strings.networkError;
          return Promise.reject(error);
        }

        var handle = _this2.handleStatus(fetchScope.res.status, false, options, null, fetchScope.res);
        if (handle) return Promise.reject(handle === true ? null : handle);

        return Promise.reject({ code: fetchScope.res.status, message: fetchScope.res.statusText || _this2.app.config.strings.networkError });
      }).then(function (result) {
        return _this2.formatFetchResult(result);
      }, function (error) {
        return Promise.reject(error);
      });
    }
  }]);
  return Network;
}();

exports.default = {
  name: 'network',

  init: function init(app) {
    app.Network = Network;
    app.network = new Network(app);
  }
};
module.exports = exports["default"];
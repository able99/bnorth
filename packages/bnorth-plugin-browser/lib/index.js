"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _urlParse = _interopRequireDefault(require("url-parse"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Browser =
/*#__PURE__*/
function () {
  function Browser(app) {
    (0, _classCallCheck2.default)(this, Browser);
    this.app = app;

    this._uaInit();
  }

  (0, _createClass2.default)(Browser, [{
    key: "_uaInit",
    value: function _uaInit() {
      var ua = this.userAgent.toLowerCase();
      this.isMobile = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(ua);
      this.isiOS = /(?:iphone)/.test(ua);
      this.isAndroid = /(?:android)/.test(ua);
      this.isWeChat = /(?:micromessenger)/.test(ua);
      this.isAliPay = /alipayclient/.test(ua);
    } //title
    //------------------------------

  }, {
    key: "urlParse",
    value: function urlParse(url) {
      url = url || this.url;
      return (0, _urlParse.default)(url, true);
    }
  }, {
    key: "urlFormat",
    value: function urlFormat(url) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!url) return "/";
      if (!query && typeof url === 'string') return url;
      query = (0, _typeof2.default)(url) === 'object' && !(url instanceof _urlParse.default) ? (0, _objectSpread2.default)({}, url.query, query) : query;
      url = url instanceof _urlParse.default ? url : (0, _urlParse.default)((0, _typeof2.default)(url) === 'object' ? url.pathname : url, true);
      url.query = (0, _objectSpread2.default)({}, url.query, query);
      return url.toString();
    }
  }, {
    key: "queryParse",
    //parser
    //------------------------------
    value: function queryParse() {
      var _Url$qs;

      return (_Url$qs = _urlParse.default.qs).parse.apply(_Url$qs, arguments);
    }
  }, {
    key: "queryStringify",
    value: function queryStringify() {
      var _Url$qs2;

      return (_Url$qs2 = _urlParse.default.qs).stringify.apply(_Url$qs2, arguments);
    } // navi
    //------------------------------

  }, {
    key: "push",
    value: function push(url, query) {
      window.location.href = this.urlFormat(url, query);
    }
  }, {
    key: "replace",
    value: function replace(url, query) {
      window.location.replace(this.urlFormat(url, query));
    }
  }, {
    key: "back",
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      window.history.go(-step);
    }
  }, {
    key: "reload",
    value: function reload(delay) {
      delay ? setTimeout(function () {
        return window.location.reload();
      }, delay) : window.location.reload();
    }
  }, {
    key: "pushState",
    value: function pushState(url, state, title) {
      window.history.pushState(state, title, url);
    }
  }, {
    key: "replaceState",
    value: function replaceState(url, state, title) {
      window.history.replaceState(state, title, url);
    } // cookie
    //------------------------------

  }, {
    key: "setCookie",
    value: function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 86400000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    }
  }, {
    key: "getCookie",
    value: function getCookie(cname) {
      var ret = '';
      document.cookie.split(';').filter(function (v) {
        return v && v.indexOf('=') >= 0;
      }).forEach(function (v) {
        var vs = v.split('=');
        if (vs[0].trim() === cname) ret = vs[1];
      });
      return ret;
    }
  }, {
    key: "clearCookie",
    value: function clearCookie(name) {
      var _this = this;

      if (name) {
        this.setCookie(name, "", -1);
        return;
      }

      var keys = document.cookie.match(/[^ =;]+(?=\=)/g).forEach(function (v) {
        _this.clearCookie(v);
      });
    } //jsload
    //------------------------------

  }, {
    key: "loadjs",
    value: function loadjs(filename, nocache) {
      return new Promise(function (resolve, reject) {
        if (!filename) reject("js filename error");
        var version = nocache === false ? '' : nocache || Math.ceil(new Date().getTime() / (1000 * 60));
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", "".concat(filename).concat(filename.indexOf('?') ? '?' : '&', "version=").concat(version));

        fileref.onload = function () {
          resolve();
        };

        fileref.onerror = function (error) {
          reject(error);
        };

        document.getElementsByTagName("head")[0].appendChild(fileref);
      });
    }
  }, {
    key: "userAgent",
    //ua
    //------------------------------
    get: function get() {
      return window.navigator.userAgent;
    }
  }, {
    key: "title",
    get: function get() {
      return window.top.document.title;
    },
    set: function set(str) {
      return window.top.document.title = title;
    }
  }, {
    key: "icon",
    //ico
    //------------------------------
    get: function get() {
      var el = document.querySelector('link[rel="shortcut icon"]');
      return el && el.getAttribute('href');
    },
    set: function set(url) {
      var ico = document.createElement('link');
      ico.setAttribute("rel", "shortcut icon");
      ico.setAttribute("href", url);
      document.getElementsByTagName("head")[0].appendChild(ico);
    } //url
    //------------------------------

  }, {
    key: "url",
    get: function get() {
      return window.location.href;
    }
  }]);
  return Browser;
}();

var _default = {
  _id: 'browser',
  onPluginMount: function onPluginMount(app) {
    app.Browser = Browser;
    app.browser = new Browser(app);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.Browser;
    delete app.browser;
  }
};
exports.default = _default;
module.exports = exports["default"];
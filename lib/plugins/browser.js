'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _browser = require('../utils/browser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Browser = function () {
  function Browser(app) {
    (0, _classCallCheck3.default)(this, Browser);

    this.app = app;
    this.uaInit();
  }

  (0, _createClass3.default)(Browser, [{
    key: 'uaInit',
    value: function uaInit() {
      var ua = this.ua.toLowerCase();
      this.isMobile = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(ua);
      this.isiOS = /(?:iphone)/.test(ua);
      this.isAndroid = /(?:android)/.test(ua);
      this.isWeChat = /(?:micromessenger)/.test(ua);
      this.isAliPay = /alipayclient/.test(ua);
    }

    //title
    //------------------------------

  }, {
    key: 'url',


    //url
    //------------------------------
    value: function url() {
      return window.location.href;
    }
  }, {
    key: 'parseUrl',
    value: function parseUrl(url) {
      url = url || this.url();
      return (0, _urlParse2.default)(url, true);
    }
  }, {
    key: 'formatUrl',
    value: function formatUrl(url) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!url) return "/";
      if (!query && typeof url === 'string') return url;

      url = url instanceof _urlParse2.default ? url : (0, _urlParse2.default)((typeof url === 'undefined' ? 'undefined' : (0, _typeof3.default)(url)) === 'object' ? url.pathname : url, true);
      query = query || {};

      for (var key in query) {
        url.query[key] = query[key];
      }

      return url.toString();
    }
  }, {
    key: 'queryParse',


    //parser
    //------------------------------
    value: function queryParse() {
      var _Url$qs;

      return (_Url$qs = _urlParse2.default.qs).parse.apply(_Url$qs, arguments);
    }
  }, {
    key: 'queryStringify',
    value: function queryStringify() {
      var _Url$qs2;

      return (_Url$qs2 = _urlParse2.default.qs).stringify.apply(_Url$qs2, arguments);
    }

    //navi
    //------------------------------

  }, {
    key: 'push',
    value: function push(url, params) {
      if ((typeof url === 'undefined' ? 'undefined' : (0, _typeof3.default)(url)) === 'object') {
        params = Object.assign({}, url.state || {}, url.query || {});
        url = url.pathname || '/';
      }

      window.location.href = this.formatUrl(url, params);
    }
  }, {
    key: 'replace',
    value: function replace(url, params) {
      if ((typeof url === 'undefined' ? 'undefined' : (0, _typeof3.default)(url)) === 'object') {
        params = Object.assign({}, url.state || {}, url.query || {});
        url.pathname = url.pathname || '/';
      }

      url = this.formatUrl(url, params);
      window.location.replace(url);
    }
  }, {
    key: 'back',
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      window.history.go(-step);
    }
  }, {
    key: 'loadjs',


    //jsload
    //------------------------------
    value: function loadjs(filename, nocache) {
      return new Promise(function (resolve, reject) {
        if (!filename) {
          reject("js filename error");
        }
        var version = nocache === false ? '' : nocache || Math.ceil(new Date().getTime() / (1000 * 60));

        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", '' + filename + (filename.indexOf('?') ? '?' : '&') + 'version=' + version);
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
    key: 'ua',


    //ua
    //------------------------------
    get: function get() {
      return window.navigator.userAgent;
    }
  }, {
    key: 'title',
    get: function get() {
      return (0, _browser.getBrowserTitle)();
    },
    set: function set(str) {
      return (0, _browser.setBrowserTitle)(str);
    }
  }, {
    key: 'icon',


    //ico
    //------------------------------
    set: function set(url) {
      var ico = document.createElement('link');
      ico.setAttribute("rel", "shortcut icon");
      ico.setAttribute("href", url);
      document.getElementsByTagName("head")[0].appendChild(ico);
    }
  }]);
  return Browser;
}();

exports.default = {
  init: function init(app) {
    app.Browser = Browser;
    app.browser = new Browser(app);
  }
};
module.exports = exports['default'];
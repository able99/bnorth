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

/**
 * url 解析类，[参考地址](https://github.com/unshiftio/url-parse)
 * @class Url
 */

/**
 * 提供操作浏览器的功能c
 * @class
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var Browser = function () {
  function Browser(app) {
    (0, _classCallCheck3.default)(this, Browser);

    this.app = app;
    this.uaInit();
  }

  (0, _createClass3.default)(Browser, [{
    key: 'uaInit',


    /**
     * 在初始化时，计算浏览器类型的函数，包括
     * isMobile, isiOS, isAndroid, isWeChat, isAliPay
     * 可以hook该函数，增加更多的浏览器类型
     * ```js
     * this.isWeChat  = /(?:micromessenger)/.test(ua);
     * ```
     * @method
     */
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
    /**
     * @property {string} title 设置和读取浏览器标题栏的文字
     */

  }, {
    key: 'url',


    //url
    //------------------------------
    /**
     * 返回当前页面的url 地址
     * @method
     * @return {string} - url 地址
     */
    value: function url() {
      return window.location.href;
    }
  }, {
    key: 'parseUrl',


    /**
     * 返回解析后的url的类
     * @method
     * @param {string} [url=this.url()] - url 地址，如果为空获取当前地址
     * @return {Url} - url解析类
     */
    value: function parseUrl(url) {
      url = url || this.url();
      return (0, _urlParse2.default)(url, true);
    }
  }, {
    key: 'formatUrl',


    /**
     * 将url 对象格式化成url 字符串
     * @method
     * @param {Url|Path|location|string} url - Url解析对象或者bnorth path对象 
     * @param {object} [query=null] - 添加到url中的查询字符串 
     * @returns {string} - url字符串 
     */
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
    /**
     * 将query 字符串解析成键值对的对象
     * @method
     * @param {string} query - query 字符串 
     * @return {object} - query 键值对
     */
    value: function queryParse() {
      var _Url$qs;

      return (_Url$qs = _urlParse2.default.qs).parse.apply(_Url$qs, arguments);
    }

    /**
     * 将包含query 键值对的对象转换为query 字符串
     * @method
     * @param {object} obj - 包含query 键值对的对象 
     * @return {string} - query 字符串
     */

  }, {
    key: 'queryStringify',
    value: function queryStringify() {
      var _Url$qs2;

      return (_Url$qs2 = _urlParse2.default.qs).stringify.apply(_Url$qs2, arguments);
    }

    //navi
    //------------------------------
    /**
     * 浏览器跳转到指定地址，可返回当前地址
     * @method
     * @param {string|Url|Path|location} url - url地址，可以是字符串，Url 解析类，或者path 解析类，router location类
     * url，path，location 中的query 和 state 也会合并到查询字符串中
     * @param {object} [params=null] - 查询字符串
     */

  }, {
    key: 'push',
    value: function push(url, params) {
      if ((typeof url === 'undefined' ? 'undefined' : (0, _typeof3.default)(url)) === 'object') {
        params = Object.assign({}, url.state || {}, url.query || {}); // TODO:query state where is it used
        url = url.pathname || '/';
      }

      window.location.href = this.formatUrl(url, params);
    }
  }, {
    key: 'replace',

    /**
     * 浏览器替换当前地址到指定地址，无法再返回当前地址
     * 参数同push
     * @method
     */
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

    /**
     * 返回指定到之前数量的之前地址
     * @method
     * @param {number} step=1 - 返回级数
     */
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      window.history.go(-step);
    }
  }, {
    key: 'reload',

    /**
     * 重新加载当前页面
     * @param {number} delay - 延时的毫秒数
     */
    value: function reload(delay) {
      window.location.reload();
    }

    /**
     * history state replace
     * @param {string} url - 新的url
     * @param {object} state - 状态对象
     * @param {string} title - 新的标题
     */

  }, {
    key: 'replaceState',
    value: function replaceState(url, state, title) {
      window.history.replaceState(state, title, url);
    }

    /**
     * 
     */

  }, {
    key: 'setCookie',
    value: function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    }
  }, {
    key: 'getCookie',
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
    key: 'clearCookie',
    value: function clearCookie(name) {
      var _this = this;

      if (name) {
        this.setCookie(name, "", -1);return;
      }

      var keys = document.cookie.match(/[^ =;]+(?=\=)/g).forEach(function (v) {
        _this.clearCookie(v);
      });
    }

    //jsload
    //------------------------------
    /**
     * 异步加载js，返回promise
     * @method
     * @param {string} filename - js的文件地址
     * @param {boolean} nocache - 通过添加version，防止缓存
     * @return {Promise} - 异步加载结果
     */

  }, {
    key: 'loadjs',
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
    /**
     * @property {string} ua 浏览器的user agent
     */
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
    /**
     * @property {string} icon 设置和读取浏览器标题栏的图标
     */
    set: function set(url) {
      var ico = document.createElement('link');
      ico.setAttribute("rel", "shortcut icon");
      ico.setAttribute("href", url);
      document.getElementsByTagName("head")[0].appendChild(ico);
    }
  }]);
  return Browser;
}();

/**
 * **plugin** name: browser dependence: none
 * 浏览器相关操作插件
 * @class browserPlugin
 * @property {class} app.Browser - Browser 类
 * @property {Browser} app.browser - Browser 类实例
 */


exports.default = {
  name: 'browser',

  init: function init(app) {
    app.Browser = Browser;
    app.browser = new Browser(app);
  }
};
module.exports = exports['default'];
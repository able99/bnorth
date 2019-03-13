"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.to-string");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _urlParse = _interopRequireDefault(require("url-parse"));

/**
 * @module
 */

/**
 * 浏览器插件使用的路由声明对象，扩展了默认的路由声明对象
 * @typedef BrowserRouterOptions
 * @extends package:core:router~RouterDefine
 * @type {object}
 * @property {boolean|string} title - string 代表该路由的浏览器标题，false 代表路由不处理标题
 */

/**
 * 浏览器插件参数，扩展了默认的插件参数
 * @typedef PluginOptions
 * @extends package:core:plugin~PluginDefine
 * @type {object}
 * @property {boolean} autoTitle - 是否支持自动设置浏览器标题
 */

/**
 * url 对象
 * @typedef Url
 * @see {@link https://github.com/unshiftio/url-parse} npm package url-parse
 * @type {class}
 */

/**
 * 浏览器操作对象，由插件构造，挂载在 app 上
 */
var Browser =
/*#__PURE__*/
function () {
  function Browser(app, _id, options) {
    (0, _classCallCheck2.default)(this, Browser);

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

    this.options = options;

    this._uaInit();
  }

  (0, _createClass2.default)(Browser, [{
    key: "_uaInit",
    value: function _uaInit() {
      var ua = this.userAgent.toLowerCase();
      /**
       * 是否运行在移动端
       * @type {boolean}
       */

      this.isMobile = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(ua);
      /**
       * 是否运行在 ios 系统
       * @type {boolean}
       */

      this.isiOS = /iphone|ipad|ipod/.test(ua);
      /**
       * 是否运行在 android 系统
       * @type {boolean}
       */

      this.isAndroid = /(?:android)/.test(ua);
      /**
       * 是否运行在微信
       * @type {boolean}
       */

      this.isWeChat = /(?:micromessenger)/.test(ua);
      /**
       * 是否运行在支付宝
       * @type {boolean}
       */

      this.isAliPay = /alipayclient/.test(ua);
      /**
       * 是否运行在 cordova 应用
       * @type {boolean}
       */

      this.isCordova = /(?:cordova)/.test(ua) || /(?:Crosswalk)/.test(ua);
    }
    /**
     * 读取与设置浏览器标题
     * @type {string}
     */

  }, {
    key: "urlParse",
    //parser
    //------------------------------

    /**
     * 解析 url 地址
     * @param {string} - url 地址，默认是当前地址
     * @returns {module:index~Url} 返回 url 解析对象
     */
    value: function urlParse(url) {
      url = url || this.url;
      return (0, _urlParse.default)(url, true);
    }
  }, {
    key: "urlFormat",

    /**
     * 格式化 url 地址
     * @param {string|object|module:index~Url} - url 
     * @param {object} - 查询字符串对象
     * @returns {string} 返回 url 解析对象
     */
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

    /**
     * 解析查询字符串
     * @param  {string} - 查询字符串
     * @returns {object} 查询字符键值对
     */
    value: function queryParse(url) {
      return _urlParse.default.qs.parse(url);
    }
    /**
     * 字符串化查询字符串键值对
     * @param  {object} - 查询字符串
     * @returns {string} 查询字符键值对
     */

  }, {
    key: "queryStringify",
    value: function queryStringify(query) {
      return _urlParse.default.qs.stringify(query);
    } // navi
    //------------------------------

    /**
     * 跳转到地址
     * @param {@param {string|object|module:index~Url} - url } - url 地址 
     * @param {object} - 查询字符串键值对 
     */

  }, {
    key: "push",
    value: function push(url, query) {
      window.location.href = this.urlFormat(url, query);
    }
  }, {
    key: "replace",

    /**
     * 替换地址
     * @param {@param {string|object|module:index~Url} - url } - url 地址 
     * @param {object} - 查询字符串键值对 
     */
    value: function replace(url, query) {
      window.location.replace(this.urlFormat(url, query));
    }
  }, {
    key: "back",

    /**
     * 倒退浏览器历史
     * @param {number} - 倒退次数
     */
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      window.history.go(-step);
    }
  }, {
    key: "reload",

    /**
     * 刷新页面
     * @param {number} - 延时毫秒 
     */
    value: function reload(delay) {
      delay ? setTimeout(function () {
        return window.location.reload();
      }, delay) : window.location.reload();
    }
    /**
     * 推送浏览器状态
     * @param {string} - 地址 
     * @param {object} - 状态对象 
     * @param {string} - 浏览器标题 
     */

  }, {
    key: "pushState",
    value: function pushState(url, state, title) {
      window.history.pushState(state, title, url);
    }
    /**
     * 替换浏览器状态
     * @param {string} - 地址 
     * @param {object} - 状态对象 
     * @param {string} - 浏览器标题 
     */

  }, {
    key: "replaceState",
    value: function replaceState(url, state, title) {
      window.history.replaceState(state, title, url);
    } // cookie
    //------------------------------

    /**
     * 设置 cookie
     * @param {string} 名称 
     * @param {string} 值 
     * @param {number} - 有效期期天数 
     */

  }, {
    key: "setCookie",
    value: function setCookie(cname, cvalue) {
      var exdays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
      var d = new Date();
      d.setTime(d.getTime() + exdays * 86400000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    }
    /**
     * 获取 cookie 值
     * @param {stirng} - 名称
     * @returns {string} 值 
     */

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
    /**
     * 清除 cookie 
     * @param {string} - 需要清除的名，为空全部清除
     */

  }, {
    key: "clearCookie",
    value: function clearCookie(name) {
      var _this = this;

      if (name) {
        this.setCookie(name, "", -1);
        return;
      }

      document.cookie.match(/[^ =;]+(?==)/g).forEach(function (v) {
        return _this.clearCookie(v);
      });
    } //jsload
    //------------------------------

    /**
     * 动态加载 js 文件到 html
     * @param {string} - js 文件名 
     * @param {boolean} - 默认增加随机查询字符串，为 false 关闭机制
     * @returns {promise} js 加载状态
     */

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

    /**
     * 浏览器 user agent
     * @type {string}
     */
    get: function get() {
      return window.navigator.userAgent;
    }
  }, {
    key: "title",
    get: function get() {
      return window.top.document.title;
    },
    set: function set(str) {
      window.top.document.title = str;

      if (this.options.titleIframeSrc !== false && this.isiOS) {
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.setAttribute('src', this.options.titleIframeSrc);

        var iframeCallback = function iframeCallback() {
          setTimeout(function () {
            iframe.removeEventListener('load', iframeCallback);
            document.body.removeChild(iframe);
          }, 0);
        };

        iframe.addEventListener('load', iframeCallback);
        document.body.appendChild(iframe);
      }
    }
  }, {
    key: "icon",

    /**
     * 读取与设置浏览器图标
     * @type {string}
     */
    get: function get() {
      var el = document.querySelector('link[rel="shortcut icon"]');
      return el && el.getAttribute('href');
    },
    set: function set(url) {
      var el = document.querySelector('link[rel="shortcut icon"]');

      if (el) {
        el.setAttribute('href', url);
      } else {
        var ico = document.createElement('link');
        ico.setAttribute("rel", "shortcut icon");
        ico.setAttribute("href", url);
        document.getElementsByTagName("head")[0].appendChild(ico);
      }
    }
    /**
     * 读取浏览器当前 url
     * @type {boolean}
     * @readonly
     */

  }, {
    key: "url",
    get: function get() {
      return window.location.href;
    }
  }, {
    key: "location",

    /**
     * 读取浏览器当前地址信息
     * @type {object}
     * @readonly
     */
    get: function get() {
      return window.location;
    }
  }]);
  return Browser;
}();
/**
 * 为 App 实例增加浏览器模块，提供了浏览器操作功能
 * @plugin 
 * @exportdefault
 */


var browser = function browser(app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    _id: 'browser',
    onPluginMount: function onPluginMount(app, plugin) {
      /**
       * 为 App 实例增加浏览器操作类
       * @memberof module:index.browser
       * @type {module:index~Browser}
       * @mount app.Browser
       */
      app.Browser = Browser;
      /**
       * 为 App 实例增加浏览器操作实例
       * @memberof module:index.browser
       * @type {module:index~Browser}
       * @mount app.browser
       */

      app.browser = new Browser(app, plugin._id, options);
      if (options.titleIframeSrc !== false) options.titleIframeSrc = options.titleIframeSrc || 'logo.png';
      if (options.defaultTitle) app.browser._defaultTitle = options.defaultTitle;

      if (options.autoTitle) {
        app.event.on(app._id, 'onActivePageChange', function (_idPage) {
          if (!app.browser._defaultTitle) app.browser._defaultTitle = app.browser.title;
          var page = app.router.getPage(_idPage);
          if (page && page.props.route.title === false) return;
          app.browser.title = page && page.route.routeDefine.title || app.browser._defaultTitle;
        }, app.browser._id);
      }
    },
    onPluginUnmount: function onPluginUnmount(app) {
      app.event.off(app.browser._id);
      delete app.Browser;
      delete app.browser;
    }
  };
};

var _default = browser;
exports.default = _default;
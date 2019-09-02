"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.search");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.find");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _router = _interopRequireDefault(require("./router.component"));

var _router2 = _interopRequireDefault(require("./router.error"));

var _router3 = _interopRequireDefault(require("./router.loader"));

/**
 * @module
 */
var ParamSpe = ':';
/**
 * 路由声明对象
 * @typedef RouteDefine
 * @type {object}
 * @property {!component} component - 页面的 component
 * @property {module:page~PageControllerDefine?} controller - 页面的 controller
 * @property {(object|string[])?} subPageInfos - 嵌套的子页面，字符串数组表示子页面名称与页面路由名称相同
 * @property {function?} loader - 懒加载函数，如果路由声明对象包含此参数，则不显示页面，而是显示加载页面，并调用并同步等待懒加载函数返回，再刷新页面。用户需要在懒加载函数中，返回路由声明对象。
 * @property {*} xxx - 定制的路由属性
 * @example
 * ***懒加载***
 * ```js
 * {
 *   'dynamic': {
 *      loader: ()=>(new Promise((resolve)=>setTimeout(()=>resolve({
 *        component: ()=><div>dynamic page</div>,
 *      }) ,1000)));
 *   },
 * }
 * ```
 * @example
 * ***子页面***
 * ```js
 * {
 *   'home': { component: Home, subPageInfos: ['sub1', 'sub2']},
 *   'sub1': Sub1,
 *   'sub2': Sub2,
 * }
 * ```
 */

/**
 * 路径的描述信息
 * @typedef PathInfo
 * @type {object}
 * @property {string} pathname - 路径字符串
 * @property {object} state - 状态数据
 * @property {string} search - 查询字符串
 * @property {string} hash - 锚点字符串
 */

/**
 * 路径条目的描述信息
 * @typedef PathItem
 * @type {string|object|string[]}
 * @property {object} state - 状态数据
 * @property {object} query - 查询字符串键值对对象
 * @property {string} hash - 锚点字符串
 */

/**
 * 页面的描述信息
 * @typedef PageInfo
 * @type {object}
 * @property {string} _id - 页面 id
 * @property {string} _idPrev - 页面的前一页面的 id
 * @property {string} _idParent - 页面的父页面的 id
 * @property {string} pathName - 页面对应的路径字符串
 * @property {string} pageName - 页面的名称
 * @property {string} pagePathName - 页面的路径字符串的当前页面片段
 * @property {string[]} pageParams - 页面的路径字符串参数
 * @property {string} routeName - 路由的名称，路由名称上是包含参数定义的名称
 * @property {module:router~RouteDefine} routeDefine - 路由声明对象
 * @property {string[]} routeParams - 路由的配置参数
 * @property {object} state - 状态数据
 * @property {object} query - 查询字符串数据键值对
 * @property {string} hash - 页面的锚点字符串
 * @property {object} params - 页面参数键值对
 * @property {boolean} isSubPage - 是否是子页面
 * @property {module:router~PageInfo[]} subPageInfos - 子页面描述信息集合
 * @property {module:router~PoplayerInfo[]} popLayerInfos - 所欲页面的弹出层集合
 */

/**
 * 弹出层配置参数
 * @typedef PoplayerOptions
 * @type {object}
 * @property {string?} _id - 指定 id，代替默认 id 生成规则
 * @property {string?} _idPage - 指定页面 id，设置弹出层所属页面
 * @property {boolean?} isModal - 是否是模态，模态将获取键盘焦点
 * @property {boolean?} isContentComponent - 指定是 content 是子组件，还是内容直接渲染
 */

/**
 * 弹出层的描述信息
 * @typedef PoplayerInfo
 * @type {object}
 * @property {component|string|number|element} content - 显示的内容或者组件
 * @property {object} props - 属性
 * @property {module:router~PoplayerOptions} options - 弹出层配置参数
 */

/**
 * 路由信息更新，进行路由组件重画
 * @event module:app.App#onRouterUpdate
 */

/**
 * 路由匹配到页面触发事件
 * @event module:app.App#onRouteMatch
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */

/**
 * 路由错误事件，由于地址与路由表对应路由的参数配置不匹配
 * @event module:app.App#onRouteErrorNoParam
 * @property {string} name - 参数名称
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */

/**
 * 路由错误事件，由于地址与路由表不匹配
 * @event module:app.App#onRouteErrorNoRoute
 * @property {string} pageName - 页面名称
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */

/**
 * app 的页面管理器，负责路由映射，页面管理，弹出层管理，导航操作等功能
 * 
 * 一些约定：
 * 
 * 1. 子页面不能再拥有子页面
 * 1. 子页面的可见性由其父页面的可见性决定
 * 
 * @see {@link https://able99.github.io/cbnorth/page.html} bnorth 页面管理
 * @exportdefault
 */

var Router =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Router(app) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Router);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.router';
    /*!
     * 路由描画组件，是所有页面和弹出层的父组件
     */

    _router.default.app = app;
    this.Component = _router.default;
    this.component = null;
    _router2.default.app = app;
    this.ComponentError = _router2.default;
    _router3.default.app = app;
    this.ComponentLoader = _router3.default;
    /*!
     * 路由集合
     */

    this._routes = {};
    /*!
     * 暂存的被阻塞的路径信息
     */

    this._block = undefined;
    this.app.event.on(this.app._id, 'onRouteErrorNoRoute', function (name) {
      return _this.error("route name: ".concat(name), 'no route error');
    }, this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoParam', function (name) {
      return _this.error("params name: ".concat(name), 'miss require param error');
    }, this._id);
  }

  (0, _createClass2.default)(Router, [{
    key: "destructor",
    value: function destructor() {
      this.app.event.off(this._id);
    } // router interface
    // --------------------------------------

    /**
     * 向路由表增加路由
     * @param {string} - 路由名称 
     * @param {module:router~RouteDefine|component} - 路由配置对象 
     */

  }, {
    key: "addRoute",
    value: function addRoute(name, route) {
      if (!name || !route) return;
      this._routes[name] = route;
      route.for && this.addNavigatorFunction(name, route.for);
    }
    /**
     * addRoute 的批量版本，
     * @param {object} - 路由表键值对
     * 
     * - 键是路由名称，路由名称是包含参数定义的字符串，如果首字母是 `/`，则同时使用为默认根页面
     * - 值是路由配置对象，参见 addRoute
     */

  }, {
    key: "setRoutes",
    value: function setRoutes(routes) {
      var _this2 = this;

      this._routes = routes;
      Object.entries(this._routes || {}).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return v.for && _this2.addNavigatorFunction(k, v.for);
      });
    }
    /**
     * 获取路由表
     * @returns {object} - 路由表
     */

  }, {
    key: "getRoutes",
    value: function getRoutes() {
      return this._routes || {};
    }
    /**
     * 获取指定路由名称的路由配置对象
     * @param {string} - 路由名称
     * @returns {module:router~RouteDefine}
     */

  }, {
    key: "getRouteByRouteName",
    value: function getRouteByRouteName(routeName) {
      var route = this._routes[routeName];
      return route ? [route[0], typeof route[1] === 'function' ? {
        component: route[1]
      } : route[1]] : [];
    }
    /**
     * 获取指定路由名称的路由配置对象
     * @param {string} - 页面名称
     * @returns {module:router~RouteDefine}
     */

  }, {
    key: "getRouteByPageName",
    value: function getRouteByPageName(pageName) {
      var route = Object.entries(this._routes).find(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return k.split(':')[0] === pageName;
      });
      return route ? [route[0], typeof route[1] === 'function' ? {
        component: route[1]
      } : route[1]] : [];
    }
    /**
     * 为路由模块添加导航函数，即 pushXXX 和 replaceXXX 函数
     * @param {string} - 页面名称 
     * @param {string} - 导航函数名称 
     */

  }, {
    key: "addNavigatorFunction",
    value: function addNavigatorFunction(pageName, navigatorName) {
      var _this3 = this;

      pageName = pageName && pageName.split(ParamSpe[0])[0];
      navigatorName = navigatorName || this.app.utils.captilaze(pageName);

      this["push".concat(navigatorName)] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this3.push([pageName].concat(args));
      };

      this["replace".concat(navigatorName)] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this3.replace([pageName].concat(args));
      };
    }
    /**
     * 获取历史记录的级数
     * @returns {number} 级数
     */

  }, {
    key: "getHistoryCount",
    value: function getHistoryCount() {
      return this.component.historyCount;
    }
    /**
     * 判断是否在根页面
     * @returns {boolean} 是否跟页面
     */

  }, {
    key: "isRootPath",
    value: function isRootPath() {
      return this.getPageInfos().slice(-1)[0].name === '/';
    } // router navigator interface
    // ----------------------------------------

    /**
     * 记录将要被阻塞的路径
     * @param {(module:router~PathInfo|string|function)?} - 将被阻塞的路径，为空则使用当前路径 
     */

  }, {
    key: "block",
    value: function block(_block) {
      this.app.event.emit('onRouterBlock', this.component.history.location, _block);

      if (typeof _block === 'function') {
        this._block = this.component.history.location;
        _block = _block(this.app);
        this._block = _block || this._block;
      } else {
        this._block = _block || this.component.history.location;
      }

      return true;
    }
    /**
     * 恢复之前被阻塞的路径
     * @param {module:router~PathInfo|string} - 要恢复的路径，为空则使用 block 保存的路径
     */

  }, {
    key: "restore",
    value: function restore(location) {
      this.app.event.emit('onRouterRestore');
      location || this._block ? this.component.history.replace(location || this._block) : this.replaceRoot();
      this._block = null;
      return true;
    }
    /**
     * 解析路径参数
     * @param  {...module:router~PathItem} - 路径参数 
     * 
     * 1. 字符串表示页面路由名称，其中有两个特殊页面名称， '/' 表示， '..'
     * 1. 如果参数是数组表示带参数的页面，数组第一个元素表示页面名称路由，其他元素为参数
     * 1. 如果参数是对象，则设为路径信息的，state，query，hash 信息
     * 
     * @returns {module:router~PathInfo} 返回路径描述对象
     */

  }, {
    key: "getPathInfo",
    value: function getPathInfo() {
      var query = {};
      var state;
      var hash;
      var ignore;
      var pathnames = this.component.state.pageInfos.map(function (v) {
        return v.pagePathName;
      });

      var addPath = function addPath(path) {
        return path.split('/').forEach(function (v) {
          if (v === '') {
            pathnames = ['/'];
          } else if (path === '..') {
            pathnames = pathnames.slice(0, -1);
          } else {
            pathnames.push(v);
          }
        });
      };

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      args.forEach(function (arg) {
        if (Array.isArray(arg)) {
          addPath(arg.map(function (v, i) {
            return i ? encodeURIComponent(v) : v;
          }).join(':'));
        } else if ((0, _typeof2.default)(arg) === 'object') {
          if (arg.query) query = arg.query;
          if (arg.state) state = arg.state;
          if (arg.hash) hash = arg.hash;
          if (arg.ignore) ignore = true;
        } else {
          addPath(String(arg));
        }
      });
      return {
        pathname: pathnames.map(function (v, i, a) {
          return i === 0 && v === '/' && a.length > 1 ? '' : v;
        }).join('/'),
        state: this.passState ? (0, _objectSpread2.default)({}, this.history.location.state, state) : state,
        search: '?' + Object.entries(this.passQuery ? (0, _objectSpread2.default)({}, this.history.location.query, query) : query).map(function (_ref5) {
          var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
              k = _ref6[0],
              v = _ref6[1];

          return k + '=' + v;
        }).reduce(function (v1, v2) {
          return v1 + (v1 ? '&' : '') + v2;
        }, ''),
        hash: hash,
        ignore: ignore
      };
    }
    /**
     * 获取路径名称，但不跳转或者替换，参数参见 getPathInfo
     */

  }, {
    key: "getPathName",
    value: function getPathName() {
      return this.component.history.createHref(this.getPathInfo.apply(this, arguments));
    }
    /**
     * 获取 url，但不跳转或者替换，参数参见 getPathInfo
     */

  }, {
    key: "getUrl",
    value: function getUrl() {
      return window.location.origin + window.location.pathname + window.location.search + this.getPathName.apply(this, arguments);
    }
    /**
     * 跳转路径，参数参见 getPathInfo
     */

  }, {
    key: "push",
    value: function push() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.app.log.debug('router push', args);
      this.component.history.push(this.getPathInfo.apply(this, args));
      return true;
    }
    /**
     * 替换路径，参数参见 getPathInfo
     */

  }, {
    key: "replace",
    value: function replace() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.app.log.debug('router replace', args);
      this.component.history.replace(this.getPathInfo.apply(this, args));
      return true;
    }
    /**
     * 在浏览历史记录中返回
     * @param {number} - 返回的级数 
     */

  }, {
    key: "back",
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.app.log.debug('router back');
      this.component.history.go(-step);
      return true;
    }
    /**
     * 跳转到根页面
     * @param  {...string} - 页面的参数 
     */

  }, {
    key: "pushRoot",
    value: function pushRoot() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this.push(['/'].concat(args));
    }
    /**
     * 替换到根页面
     * @param  {...string} - 页面的参数 
     */

  }, {
    key: "replaceRoot",
    value: function replaceRoot() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this.replace(['/'].concat(args));
    }
    /**
     * 跳转到错误显示页面
     * @param {error|string|object} - 错误内容 
     * @param {string} - 错误标题 
     * @param {string} - 错误目标 id 
     */

  }, {
    key: "error",
    value: function error(message, title, _id) {
      return this.component.setState({
        error: {
          message: message,
          title: title,
          _id: _id
        }
      });
    }
  }, {
    key: "getPageInfos",
    value: function getPageInfos() {
      return this.component && this.component.state.pageInfos || [];
    }
  }, {
    key: "setPageInfos",
    value: function setPageInfos(pageInfos) {
      return this.component && this.component.setState({
        pageInfos: pageInfos
      });
    }
  }, {
    key: "getPoplayerInfos",
    value: function getPoplayerInfos() {
      return this.component && this.component.state.poplayerInfos || [];
    }
  }, {
    key: "setPoplayerInfos",
    value: function setPoplayerInfos(poplayerInfos) {
      return this.component && this.component.setState({
        poplayerInfos: poplayerInfos
      });
    }
  }, {
    key: "refresh",
    value: function refresh() {
      return this.component && this.component.setState({
        error: null
      });
    }
  }]);
  return Router;
}();

var _default = Router;
exports.default = _default;
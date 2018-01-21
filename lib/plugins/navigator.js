'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 为app 提供导航的能力扩展，导航一般区别与browser 插件中的插件，导航指app 应用内的导航
 * **插件** 该类为插件类扩展了App 的能力
 * app.Navigator: 该类的原型
 * app.navigator: 该类的实例
 * @class
 */
var Navigator = function () {
  function Navigator(app) {
    (0, _classCallCheck3.default)(this, Navigator);

    this.app = app;
    this.recallLocation = null;
    this.routerStatus = null;
  }

  (0, _createClass3.default)(Navigator, [{
    key: '_getUrl',
    value: function _getUrl() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!this.routerStatus || !args.length) return '/';
      var _routerStatus = this.routerStatus,
          location = _routerStatus.location,
          router = _routerStatus.router;


      var paths = [];
      var extern = false;
      var absolute = false;
      var passState = false;
      var passQuery = false;
      var uper = 0;
      var newloc = {
        pathname: ''
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var arg = _step.value;

          if (!arg) {
            this.app.error('invalided navigator params');
          } else if (Array.isArray(arg)) {
            var _arg = arg;

            var _arg2 = (0, _slicedToArray3.default)(_arg, 4);

            newloc.query = _arg2[0];
            passQuery = _arg2[1];
            newloc.state = _arg2[2];
            passState = _arg2[3];
          } else {
            arg = (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === "object" ? arg : { path: arg };
            if (!app.path) {
              this.app.error('invalided navigator params');continue;
            }

            var aextern = arg.path.indexOf("http") === 0;
            var aabsolute = arg.path.indexOf("/") === 0;
            extern = extern || arg.extern || aextern;
            absolute = absolute || arg.absolute || aabsolute;
            if (arg.path === "/") {
              continue;
            }
            if (arg.path === ".") {
              continue;
            }
            if (arg.path === "..") {
              uper++;continue;
            }

            if (arg.path) {
              (function () {
                var apath = [aextern || aabsolute ? arg.path : encodeURIComponent(arg.path)];
                if (newloc.query && Array.isArray(arg.params) && arg.params.length) {
                  arg.params.forEach(function (v) {
                    if (newloc.query[v]) apath.push(newloc.query[v]);
                    delete newloc.query[v];
                  });
                }
                paths.push(apath.join('/'));
              })();
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!absolute && !extern) {
        if (uper <= 0) {
          newloc.pathname = location.pathname;
        } else {
          newloc.pathname = router.routes.slice(1, -uper).map(function (v) {
            return v.path || "";
          }).join("/");
          for (var key in router.params) {
            var re = new RegExp(":" + key, "g");
            newloc.pathname = newloc.pathname.replace(re, router.params[key]);
          }
        }
      }
      newloc.pathname = (newloc.pathname ? [newloc.pathname] : []).concat(paths).join("/");
      if (!extern) newloc.pathname = newloc.pathname.replace(/\/\//g, '/');
      newloc.state = Object.assign({}, passState ? location.state : {}, newloc.state);
      newloc.query = Object.assign({}, passQuery ? location.query : {}, newloc.query);
      if (!Object.keys(newloc.query).length) delete newloc.query;
      if (!Object.keys(newloc.state).length) delete newloc.state;

      return [newloc, extern, absolute];
    }

    /*!
     * for custom party of recall
     * @method
     */

  }, {
    key: '_recallBefore',
    value: function _recallBefore(location, router) {
      if (this.app.config.login.loginToHomeOrAuto) {
        this.goHome();
        return true;
      }

      var link = this.app.browser && this.app.browser.parseUrl().query.link;
      if (link) {
        this.app.browser && this.app.browser.replace(decodeURIComponent(link));
        return true;
      }

      if (location.query.link) {
        this.app.browser && this.app.browser.replace(decodeURIComponent(location.query.link));
        return true;
      }
    }

    /**
     * 返回之前的页面，与back 不同，会考虑错误跳转，link 参数因素
     * @method
     */

  }, {
    key: 'recall',
    value: function recall() {
      if (!this.routerStatus) return;
      var _routerStatus2 = this.routerStatus,
          location = _routerStatus2.location,
          router = _routerStatus2.router;


      if (this._recallBefore(location, router)) return;

      if (this.recallLocation && this.recallLocation.isReplace) {
        router.replace(this.recallLocation);
      } else if (this.recallLocation) {
        this.back();
      } else {
        this.goHome(true);
      }
    }

    /** 
     * 跳转到指定路由
     * @method
     * @param {...string} [paths] - 路由列表，可以是字符串，path 解析对象或者 router3 location对象，还可能是数组：<br />
     * **'/'**：出现在字符串或者对象中的pathname 中时，从根路径开始计算，否则从当前路径开始计算
     * **'..'**：出现在字符串或者对象中的pathname 中时，从当前路径的上一级路径开始计算，每出现一次，返回一级
     * **params**：如果path 对象包含params 数组，说明该路径包含path info 参宿，会从query 参数生成path info 字符串
     * **数组对象**：如果是数组对象，4个元素[query,pass query,state,pass state]分别是设置query 键值对，是否将query 键值对传递，state 键值对，和是否将state 键值对传递
     */

  }, {
    key: 'push',
    value: function push() {
      if (!this.routerStatus || !this.routerStatus.router) return;

      var _getUrl2 = _getUrl.apply(undefined, arguments),
          _getUrl3 = (0, _slicedToArray3.default)(_getUrl2, 3),
          newloc = _getUrl3[0],
          extern = _getUrl3[1],
          absolute = _getUrl3[2];

      if (extern && this.app.browser) {
        this.app.browser.push(newloc);
      } else {
        this.routerStatus.router.push(newloc);
      }
    }

    /** 
     * 替换到到指定路由
     * 参数同push
     * @method
     */

  }, {
    key: 'replace',
    value: function replace() {
      if (!this.routerStatus || !this.routerStatus.router) return;

      var _getUrl4 = _getUrl.apply(undefined, arguments),
          _getUrl5 = (0, _slicedToArray3.default)(_getUrl4, 3),
          newloc = _getUrl5[0],
          extern = _getUrl5[1],
          absolute = _getUrl5[2];

      if (extern && this.app.browser) {
        this.app.browser.replace(newloc);
      } else {
        this.routerStatus.router.replace(newloc);
      }
    }

    /** 
     * 返回之前页面
     * @method
     * @param {number} [step=1] - 返回的页面数
     */

  }, {
    key: 'back',
    value: function back() {
      var _routerStatus$router;

      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (!this.routerStatus || !this.routerStatus.router) return;
      (_routerStatus$router = this.routerStatus.router).go.apply(_routerStatus$router, (0, _toConsumableArray3.default)(args));
    }

    /**
     * app.config.paths 中的首字母大写的路径，比如Xxx 会直接建立goXxx 函数，调用会导航到对应路径
     * @method
     * goXxx
     */

    /** 
     * 获取导航后的完整url
     * 参数同push
     * @method
     */

  }, {
    key: 'getUrl',
    value: function getUrl() {
      var _getUrl6 = _getUrl.apply(undefined, arguments),
          _getUrl7 = (0, _slicedToArray3.default)(_getUrl6, 3),
          loc = _getUrl7[0],
          extern = _getUrl7[1],
          absolute = _getUrl7[2];

      if (extern || absolute) {
        return loc.pathname;
      } else {
        var ret = new _urlParse2.default(window.location.href);
        ret.set('hash', router.createHref(newloc));
        return ret.toString();
      }
    }

    /**
     * 关闭 app
     * @method
     */

  }, {
    key: 'exit',
    value: function exit() {
      window.close();
    }

    // event
    // --------------------

  }, {
    key: '_onRouterStatusChange',
    value: function _onRouterStatusChange(routerStatus) {
      if (!routerStatus) return;

      if (routerStatus.location.pathname === (typeof this.app.config.paths.Login === 'string' ? this.app.config.paths.Login : this.app.config.paths.Login.path)) {
        if (this.recallLocation && this.routerStatus && this.routerStatus.location.pathname !== routerStatus.location.pathname) this.recallLocation.isReplace = routerStatus.location.action === 'REPLACE';
      } else {
        this.recallLocation = routerStatus.location;
      }
      this.routerStatus = routerStatus;
    }
  }]);
  return Navigator;
}(); /**
      * bnorth solution
      * @copyright (c) 2016 able99
      * @author able99 (8846755@qq.com)
      * @license MIT
      */

exports.default = {
  name: 'navigator',
  depentence: 'browser',

  init: function init(app) {
    app.Navigator = Navigator;
    app.navigator = new Navigator(app);
  },
  onImportRoutesAfter: function onImportRoutesAfter(app) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var key = _step2.value;

        if (key && key[0].match(/^[A-Z]$/)) {
          app.Navigator.prototype['go' + key] = function (replace) {
            var path = app.config.paths[key];
            replace ? this.replace(path) : this.push(path);
          };
        }
      };

      for (var _iterator2 = Object.keys(app.config.paths)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  },
  onNavigated: function onNavigated(app, location) {
    app.navigator._onRouterStatusChange(location);
  },
  onNavigatePrevent: function onNavigatePrevent(app, location) {
    app.navigator._onRouterStatusChange(location);
  }
};
module.exports = exports['default'];
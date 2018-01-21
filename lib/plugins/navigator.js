'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
 * @class
 * **插件** 该类为插件类扩展了App 的能力
 * app.Navigator: 该类的原型
 * app.navigator: 该类的实例
 */
var Navigator = function () {
  function Navigator(app) {
    (0, _classCallCheck3.default)(this, Navigator);

    this.app = app;
    this.recallLocation = null;
    this.routerStatus = null;
  }

  (0, _createClass3.default)(Navigator, [{
    key: '_navi',
    value: function _navi(type) {
      if (!this.routerStatus) return;
      var _routerStatus = this.routerStatus,
          location = _routerStatus.location,
          router = _routerStatus.router;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (type === 'back') {
        router.go.apply(router, args);
        return;
      }

      if (!args.length) {
        type === 'replace' ? router.replace("/") : router.push("/");
        return;
      }

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

          if (Array.isArray(arg)) {
            var _arg = (0, _slicedToArray3.default)(arg, 4);

            newloc.query = _arg[0];
            passQuery = _arg[1];
            newloc.state = _arg[2];
            passState = _arg[3];
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

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _arg2 = _step2.value;

          if (!_arg2) {
            this.app.error('invalided navigator params');
            return;
          } else if (Array.isArray(_arg2)) {} else if ((typeof _arg2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_arg2)) === "object") {
            extern = extern || _arg2.extern || _arg2.path && _arg2.path.indexOf("http") === 0;
            absolute = absolute || _arg2.absolute || _arg2.path && _arg2.path.indexOf("/") === 0;

            if (_arg2.path === "/") {
              continue;
            }
            if (_arg2.path === ".") {
              continue;
            }
            if (_arg2.path === "..") {
              uper++;continue;
            }

            if (_arg2.path) {
              (function () {
                var apath = [_arg2.path];
                if (newloc.query && Array.isArray(_arg2.params) && _arg2.params.length) {
                  _arg2.params.forEach(function (v) {
                    if (newloc.query[v]) apath.push(newloc.query[v]);
                    delete newloc.query[v];
                  });
                }
                paths.push(apath.join('/'));
              })();
            }
          } else {
            _arg2 = _arg2 || "";
            if (!_arg2) {
              continue;
            }

            var aextern = paths.length === 0 && _arg2.indexOf("http") === 0;
            var aabsolute = paths.length === 0 && _arg2.indexOf("/") === 0;
            extern = extern || aextern;
            absolute = absolute || aabsolute;

            if (_arg2 === "/") {
              continue;
            }
            if (_arg2 === ".") {
              continue;
            }
            if (_arg2 === "..") {
              uper++;continue;
            }

            if (_arg2) paths.push(aextern || aabsolute ? _arg2 : encodeURIComponent(_arg2));
          }
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

      if (type === 'getUrl') {
        if (extern) {} else {
          var ret = new _urlParse2.default(window.location.href);
          ret.set('hash', router.createHref(newloc));
          return ret.toString();
        }
        return '';
      }
      if (extern && this.app.browser) {
        type === 'replace' ? this.app.browser.replace(newloc) : this.app.browser.push(newloc);
      } else {
        type === 'replace' ? router.replace(newloc) : router.push(newloc);
      }
    }

    // interface
    // ----------------------------

  }, {
    key: 'recallBefore',
    value: function recallBefore(location, router) {
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


      if (this.recallBefore(location, router)) return;

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
     * @param {...string} [paths] - 路由列表，取值包括：<br />
     * **'/'**
     * **'..'**
     * **path(string)**
     * **path(object)**
     * **[query,pass query,state,pass state]**
     */

  }, {
    key: 'push',
    value: function push() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this._navi.apply(this, ['push'].concat(args));
    }
    /** 
     * 替换到到指定路由
     * @method
     * @param {...string} [paths] - 
     */

  }, {
    key: 'replace',
    value: function replace() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this._navi.apply(this, ['replace'].concat(args));
    }
    /** 
     * 返回之前页面
     * @method
     * @param {number} [step=1] - 返回的页面数
     */

  }, {
    key: 'back',
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this._navi('back', -step);
    }
    /** 
     * 获取路由的url 字符串
     * @method
     * @param {...string} [paths] - 
     */

  }, {
    key: 'getUrl',
    value: function getUrl() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this._navi.apply(this, ['getUrl'].concat(args));
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
    key: 'onRouterStatusChange',
    value: function onRouterStatusChange(routerStatus) {
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

  init: function init(app) {
    app.Navigator = Navigator;
    app.navigator = new Navigator(app);
  },
  onImportRoutesAfter: function onImportRoutesAfter(app) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      var _loop = function _loop() {
        var key = _step3.value;

        if (key && key[0].match(/^[A-Z]$/)) {
          app.Navigator.prototype['go' + key] = function (replace) {
            var path = app.config.paths[key];
            replace ? this.replace(path) : this.push(path);
          };
        }
      };

      for (var _iterator3 = Object.keys(app.config.paths)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  },
  onNavigated: function onNavigated(app, location) {
    app.navigator.onRouterStatusChange(location);
  },
  onNavigatePrevent: function onNavigatePrevent(app, location) {
    app.navigator.onRouterStatusChange(location);
  }
};
module.exports = exports['default'];
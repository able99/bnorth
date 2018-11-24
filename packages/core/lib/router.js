"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find-index");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es6.string.ends-with");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.from");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.find");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _react = _interopRequireDefault(require("react"));

var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));

var _path = require("path");

var _routerComponent = _interopRequireDefault(require("./router.component.js"));

var _routerLoading = _interopRequireDefault(require("./router.loading.js"));

var _routerError = _interopRequireDefault(require("./router.error.js"));

var spe = '/';
var ParamSpe = ':';
var SubPageSpe = '|';
var ParamOptional = '?';
var PageSign = '#';
/**
 * @class
 * ***流程***
 * 1. router 构建期间，监听app 启动事件，在onAppStartRouter 事件时，将RouterComponent 加入到app 根元素上；监听浏览器地址栏
 * 1. 用户通过navigator 函数(push, relace, back 等)操作，解析locationinfo，触发浏览器地址栏改变
 * 1. router 监听到地址栏变化后，解析url，产生pathinfos， 并发出render 事件, RouterComponnent
 */

var Router =
/*#__PURE__*/
function () {
  // constructor
  // ----------------------------------------
  function Router(app) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Router);
    this.app = app;
    this._id = app._id + '.router';
    this.RouterComponent = _routerComponent.default;
    this.PageLoading = _routerLoading.default;
    this.PageError = _routerError.default;
    this._routes = {}; // config routes for app 

    this._views = []; // current views on runtime

    this._pages = {}; // current pages on runtime

    this._pathinfos = []; // current location obj

    this._activeId = undefined;
    ;
    this._focusId = undefined;
    this._states = {}; // current pathname state on runtime

    this._error = undefined;
    this._block = undefined;
    this._viewIdNum = 0;
    this._historyStackCount = 0;
    this.passQuery = false;
    this.passState = false;
    this.passParams = false;
    this.app.event.on(this.app._id, 'onPageAdd', function (_id, page) {
      page && _this._addPage(_id, page);
    }, this._id);
    this.app.event.on(this.app._id, 'onPageRemove', function (_id, page) {
      page && _this._removePage(_id);
    }, this._id);
    this.app.event.on(this.app._id, 'onAppStartRouter', function () {
      return _this.app.render.component = _react.default.createElement(_this.RouterComponent, {
        app: _this.app
      });
    }, this._id);
    this.app.event.on(this.app._id, 'onAppStartRender', function () {
      _this._updateRender();
    }, this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoRoute', function (name) {
      return _this.error("route name: ".concat(name), 'no route error');
    }, this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoParam', function (name) {
      return _this.error("params name: ".concat(name), 'miss require param error');
    }, this._id);
    this.history = (0, _createHashHistory.default)();
    this.history.listen(function (location, action) {
      return _this._handleLocationChange(location, action);
    });

    this._handleLocationChange(this.history.location, this.history.action);
  }

  (0, _createClass2.default)(Router, [{
    key: "destructor",
    value: function destructor() {
      this.app.event.off(this._id);
    } // render
    // --------------------------------------

  }, {
    key: "_updateRender",
    value: function _updateRender() {
      this.app.event.emit(this.app._id, 'onRouterUpdate');
    } // history
    // --------------------------------------

  }, {
    key: "_handleLocationChange",
    value: function _handleLocationChange(location, action) {
      var _this2 = this;

      this.app.log.info('router location', location);

      this._clearError();

      Object.keys(this._states).filter(function (v) {
        return !location.pathname.startsWith(v);
      }).forEach(function (v) {
        delete _this2._states[v];
      });
      if (location.state) this._states[location.pathname] = location.state;
      location.query = {};
      location.search = location.search.slice(1).trim();
      location.search && location.search.split('&').forEach(function (v) {
        var vs = v.split('=');
        location.query[vs[0]] = decodeURIComponent(vs[1]);
      });
      if (action === 'PUSH') this._historyStackCount++;
      if (action === 'POP') this._historyStackCount = Math.max(--this._historyStackCount, 0);
      var pos = 0;
      var pathnames = [];

      while (pos < location.pathname.length - 1) {
        var index = location.pathname.indexOf(spe, pos + 1);
        index = index >= 0 ? index : location.pathname.length;
        var sub = location.pathname.slice(pos + 1, index);

        if (pos === 0 && sub[0] === ParamSpe || this.getRoute(spe + sub.split(ParamSpe)[0]).length) {
          pathnames.push(spe + sub);
        } else if (pos === 0) {
          pathnames.push(spe);
          pathnames.push(sub);
        } else {
          pathnames.push(sub);
        }

        pos = index;
      }

      if (!pathnames.length) pathnames.push(spe);
      location.pathnames = pathnames;

      this._updatePathInfos(location);
    }
  }, {
    key: "setRoutes",
    // route manager
    // --------------------------------------
    value: function setRoutes(routes) {
      var _this3 = this;

      this._routes = routes;
      Object.entries(this._routes || {}).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return v.for && _this3._addRouteNativator(k, v.for);
      });

      this._updatePathInfos(this.history.location);
    }
  }, {
    key: "getRoutes",
    value: function getRoutes() {
      return this._routes || {};
    }
  }, {
    key: "getRoute",
    value: function getRoute(name) {
      var route = Object.entries(this._routes).find(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return k.split(':')[0] === name;
      });
      return route ? [route[0], typeof route[1] === 'function' ? {
        component: route[1]
      } : route[1]] : [];
    }
  }, {
    key: "addRoute",
    value: function addRoute(name, route) {
      if (!name || !route) return;
      this._routes[name] = route;
      route.for && this._addRouteNativator(name, route.for);

      this._updatePathInfos(this.history.location);
    }
  }, {
    key: "_addRouteNativator",
    value: function _addRouteNativator(routeName, forName) {
      var _this4 = this;

      var name = routeName && routeName.split(ParamSpe[0]);

      this["push".concat(forName)] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this4.push([name].concat(args));
      };

      this["replace".concat(forName)] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this4.replace([name].concat(args));
      };
    } // router
    // --------------------------------------

  }, {
    key: "getStackCount",
    value: function getStackCount() {
      return this._historyStackCount;
    }
  }, {
    key: "isRootPath",
    value: function isRootPath() {
      return this.app.router._pathinfos[this.app.router._pathinfos.length - 1].name === '/';
    }
  }, {
    key: "isFocus",
    value: function isFocus(_id) {
      return this._focusId === _id;
    }
  }, {
    key: "isActive",
    value: function isActive(_id) {
      return this._activeId === _id;
    }
    /* parse locationinfo to pathinfo */

  }, {
    key: "_updatePathInfos",
    value: function () {
      var _updatePathInfos2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(location) {
        var _this5 = this;

        var fullPathName, _idParent, params, pathinfos, focusId, activeId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, viewItems, focusViewItem, activePageItem, pageFocusViewItem, _i, pathinfo, _block;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (Object.keys(this.getRoutes()).length) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                fullPathName = '';
                params = {};
                pathinfos = [];
                focusId = undefined;
                activeId = undefined;
                /* route */

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 10;

                _loop = function _loop() {
                  var pathname = _step.value;
                  fullPathName = (0, _path.join)(fullPathName, pathname);

                  var _pathname$split = pathname.split(ParamSpe),
                      _pathname$split2 = (0, _toArray2.default)(_pathname$split),
                      name = _pathname$split2[0],
                      pathnameParams = _pathname$split2.slice(1);

                  var _id = PageSign + fullPathName;

                  var pathinfo = {
                    _id: _id,
                    _idParent: _idParent,
                    name: name,
                    pathname: pathname,
                    fullPathName: fullPathName,
                    query: location.query,
                    state: _this5._states[fullPathName],
                    pathnameParams: pathnameParams,
                    embeds: {},
                    viewItems: _this5.getPageViews(_id)
                  };

                  var _this5$getRoute = _this5.getRoute(pathinfo.name),
                      _this5$getRoute2 = (0, _slicedToArray2.default)(_this5$getRoute, 2),
                      routeName = _this5$getRoute2[0],
                      route = _this5$getRoute2[1];

                  if (!routeName || !route) return {
                    v: _this5.app.event.emit(_this5.app._id, 'onRouteErrorNoRoute', pathinfo.name, pathinfo, location)
                  };
                  pathinfo.routeName = routeName;
                  pathinfo.route = route;
                  pathinfo.routeParams = routeName.split(ParamSpe).slice(1);
                  pathinfo.params = _this5.passParams ? (0, _objectSpread2.default)({}, params) : {};
                  pathinfo.routeParams.forEach(function (v, i) {
                    var optional = v.endsWith(ParamOptional);
                    if (optional) v = v.slice(0, -1);
                    if (!optional && i > pathinfo.pathnameParams.length - 1) return _this5.app.event.emit(_this5.app._id, 'onRouteErrorNoParam', v, pathinfo, location);
                    pathinfo.params[v] = pathinfo.pathnameParams[i] ? decodeURIComponent(pathinfo.pathnameParams[i]) : null;
                    if (_this5.passParams) params[name] = pathinfo.params[v];
                  });
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = (Array.isArray(route.embeds) ? route.embeds.map(function (v) {
                      return [v, v];
                    }) : Object.entries(route.embeds || {}))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _step2$value = (0, _slicedToArray2.default)(_step2.value, 2),
                          k = _step2$value[0],
                          v = _step2$value[1];

                      var embed = (0, _objectSpread2.default)({}, pathinfo);
                      embed._idParent = embed._id;
                      embed._id = embed._id + SubPageSpe + v;
                      embed.name = v;
                      embed.embed = true;
                      embed.embeds = {};
                      embed.viewItems = _this5.getPageViews(embed._id);

                      var _this5$getRoute3 = _this5.getRoute(embed.name),
                          _this5$getRoute4 = (0, _slicedToArray2.default)(_this5$getRoute3, 2),
                          routeNameEmbed = _this5$getRoute4[0],
                          routeEmbed = _this5$getRoute4[1];

                      if (!routeNameEmbed || !routeEmbed) return {
                        v: _this5.app.event.emit(_this5.app._id, 'onRouteErrorNoRoute', pathinfo.name, pathinfo, location)
                      };
                      embed.routeName = routeNameEmbed;
                      embed.route = routeEmbed;
                      pathinfo.embeds[k] = embed;
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  _idParent = _id;
                  pathinfos.push(pathinfo);
                };

                _iterator = location.pathnames[Symbol.iterator]();

              case 13:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 20;
                  break;
                }

                _ret = _loop();

                if (!((0, _typeof2.default)(_ret) === "object")) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", _ret.v);

              case 17:
                _iteratorNormalCompletion = true;
                _context.next = 13;
                break;

              case 20:
                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](10);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 26:
                _context.prev = 26;
                _context.prev = 27;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 29:
                _context.prev = 29;

                if (!_didIteratorError) {
                  _context.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context.finish(29);

              case 33:
                return _context.finish(26);

              case 34:
                /* active & focus */
                viewItems = this.getNoPageViews();
                focusViewItem = Array.from(viewItems).reverse().find(function (v) {
                  return v.options.isModal;
                });
                activePageItem = pathinfos.slice(-1)[0];
                if (focusViewItem) focusId = focusViewItem.options._id;
                if (activePageItem) activeId = activePageItem._id;

                if (activePageItem && !focusId) {
                  pageFocusViewItem = activePageItem.viewItems && Array.from(activePageItem.viewItems).reverse().find(function (v) {
                    return v.options.isModal;
                  });

                  if (pageFocusViewItem) {
                    focusId = pageFocusViewItem.options.id;
                  } else {
                    focusId = activePageItem._id;
                  }
                }
                /* block */


                _i = 0;

              case 41:
                if (!(_i < pathinfos.length)) {
                  _context.next = 51;
                  break;
                }

                pathinfo = pathinfos[_i];
                _context.next = 45;
                return this.app.event.emit(this.app._id, 'onRouteMatch', pathinfo, location);

              case 45:
                _block = _context.sent;

                if (!_block) {
                  _context.next = 48;
                  break;
                }

                return _context.abrupt("return", this.block(_block));

              case 48:
                _i++;
                _context.next = 41;
                break;

              case 51:
                /* update */
                this._focusId = focusId;
                this._activeId = activeId;
                this._pathinfos = pathinfos;

                this._updateRender();

              case 55:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 22, 26, 34], [27,, 29, 33]]);
      }));

      return function _updatePathInfos(_x) {
        return _updatePathInfos2.apply(this, arguments);
      };
    }() // error
    // ---------------------------------------

  }, {
    key: "error",
    value: function error(message, title, data, _id) {
      this._error = {
        message: message,
        title: title,
        _id: _id
      };

      this._updateRender();
    }
  }, {
    key: "_clearError",
    value: function _clearError() {
      this._error = null;
    } // pages
    // ---------------------------------------

  }, {
    key: "_addPage",
    value: function _addPage(_id, page) {
      this._pages[_id] = page;
    }
  }, {
    key: "_removePage",
    value: function _removePage(_id) {
      var page = this.getPage(_id);

      if (page) {
        this.removePageViews(page._id);
        delete this._pages[page._id];
      }
    }
  }, {
    key: "getPage",
    value: function getPage(_id) {
      if (typeof _id === 'string') {
        return this._pages[_id];
      } else if (typeof _id === 'number') {
        return this._pages[Object.keys(this._pages)[_id]];
      } else if (_id === undefined) {
        var keys = Object.keys(this._pages);
        return this._pages[keys[keys.length - 1]];
      }
    } // views 
    // ----------------------------------------

  }, {
    key: "getViewId",
    value: function getViewId() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return options._id || "".concat(++this._viewIdNum, "@").concat(options._idPage ? options._idPage : '#');
    }
  }, {
    key: "addView",
    value: function addView(content) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!content) return;
      options._id = this.getViewId(options);
      var view = this.getView(options._id);

      if (!view) {
        this._views.push({
          content: content,
          props: props,
          options: options
        });

        options.onAdd && options.onAdd(options._id);
      } else {
        view.content = content;
        view.props = props;
        view.options = options;
      }

      this._updatePathInfos(this.history.location);

      return options._id;
    }
  }, {
    key: "removeView",
    value: function removeView(_id) {
      var index = this._views.findIndex(function (v) {
        return v.options._id === _id;
      });

      if (index < 0) return;
      this._views[index].options.onRemove && this._views[index].options.onRemove();

      this._views.splice(index, 1);

      this._updatePathInfos(this.history.location);
    }
  }, {
    key: "getView",
    value: function getView(_id) {
      return this._views.find(function (v) {
        return v.options._id === _id;
      });
    }
  }, {
    key: "getViews",
    value: function getViews() {
      return this._views;
    }
  }, {
    key: "getNoPageViews",
    value: function getNoPageViews() {
      return this._views.filter(function (_ref5) {
        var options = _ref5.options;
        return !options._idPage;
      });
    }
  }, {
    key: "getPageViews",
    value: function getPageViews(_id) {
      return this._views.filter(function (_ref6) {
        var options = _ref6.options;
        return options._idPage === _id;
      });
    }
  }, {
    key: "removePageViews",
    value: function removePageViews(_id) {
      var _this6 = this;

      this.getPageViews(_id).forEach(function (v) {
        return _this6.removeView(v.options._id);
      });
    } // router navigator
    // ----------------------------------------

  }, {
    key: "getLocationInfo",
    value: function getLocationInfo() {
      var query = {};
      var state;

      var pathnames = this._pathinfos.map(function (v) {
        return v.pathname;
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
        } else {
          addPath(String(arg));
        }
      });
      return {
        state: this.passState ? (0, _objectSpread2.default)({}, this.history.location.state, state) : state,
        pathname: pathnames.map(function (v, i, a) {
          return i === 0 && v === '/' && a.length > 1 ? '' : v;
        }).join('/'),
        search: '?' + Object.entries(this.passQuery ? (0, _objectSpread2.default)({}, this.history.location.query, query) : query).map(function (_ref7) {
          var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
              k = _ref8[0],
              v = _ref8[1];

          return k + '=' + v;
        }).reduce(function (v1, v2) {
          return v1 + (v1 ? '&' : '') + v2;
        }, '')
      };
    }
  }, {
    key: "getPathName",
    value: function getPathName() {
      return this.history.createHref(this.getLocationInfo.apply(this, arguments));
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return window.location.origin + window.location.pathname + window.location.search + this.getUrlPath.apply(this, arguments);
    }
  }, {
    key: "block",
    value: function block(_block) {
      this.app.log.info('router block', _block);

      if (typeof _block === 'function') {
        this._block = this.history.location;
        _block = _block(this.app);
        this._block = _block || this._block;
      } else {
        this._block = _block || this.history.location;
      }

      return true;
    }
  }, {
    key: "restore",
    value: function restore(location) {
      this.app.log.info('router restore', location);
      location || this._block ? this.history.replace(location || this._block) : this.replaceRoot();
      this._block = null;
      return true;
    }
  }, {
    key: "push",
    value: function push() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.app.log.info('router push', args);
      this.history.push(this.getLocationInfo.apply(this, args));
      return true;
    }
  }, {
    key: "replace",
    value: function replace() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.app.log.info('router replace', args);
      this.history.replace(this.getLocationInfo.apply(this, args));
      return true;
    }
  }, {
    key: "back",
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.app.log.info('router back');
      this.history.go(-step);
      return true;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this._clearError();

      this._updatePathInfos(this.history.location);

      return true;
    }
  }, {
    key: "pushRoot",
    value: function pushRoot() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this.push(['/'].concat(args));
    }
  }, {
    key: "replaceRoot",
    value: function replaceRoot() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this.replace(['/'].concat(args));
    }
  }]);
  return Router;
}();

exports.default = Router;
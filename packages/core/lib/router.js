"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.regexp.replace");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.object.assign");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));

var _path = require("path");

var PageLoading = function PageLoading(props) {
  return _react.default.createElement("div", {
    style: {
      padding: 8
    }
  }, "loading...");
};

var PageError = function PageError(props) {
  var app = props.app,
      data = props.data;
  return _react.default.createElement("div", {
    style: {
      padding: 8
    }
  }, _react.default.createElement("div", null, _react.default.createElement("span", null, "error"), _react.default.createElement("button", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.refresh();
    }
  }, "[refresh]"), _react.default.createElement("button", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.replaceRoot();
    }
  }, "[home]")), _react.default.createElement("h3", null, data.errorRoute ? data.errorRoute : data.params[1]), _react.default.createElement("hr", null), _react.default.createElement("p", null, app.utils.message2String(data.errorRoute ? data.name : data.params[0])));
};

var RouterComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RouterComponent, _React$Component);

  function RouterComponent() {
    (0, _classCallCheck2.default)(this, RouterComponent);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RouterComponent).apply(this, arguments));
  }

  (0, _createClass2.default)(RouterComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.eventOffRouterUpdate = this.props.app.event.on(this.props.app._id, 'onRouterUpdate', function () {
        return _this.forceUpdate();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.eventOffRouterUpdate();
    }
  }, {
    key: "_renderPage",
    value: function _renderPage(_ref, activeId, focusId) {
      var _this2 = this;

      var _id = _ref._id,
          _idParent = _ref._idParent,
          paramObj = _ref.paramObj,
          query = _ref.query,
          state = _ref.state,
          embed = _ref.embed,
          viewItems = _ref.viewItems,
          embeds = _ref.embeds,
          routeName = _ref.routeName,
          route = _ref.route;
      var app = this.props.app;
      var embedsPage = {};
      Object.entries(embeds).map(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
            k = _ref3[0],
            v = _ref3[1];

        return embedsPage[k] = _this2._renderPage(v, activeId, focusId);
      });
      var props = {
        app: app,
        key: _id,
        _id: _id,
        route: (0, _objectSpread2.default)({}, route, {
          routeName: routeName,
          _idParent: _idParent,
          params: paramObj,
          query: query,
          state: state,
          active: embed ? _idParent === activeId : _id === activeId,
          embed: embed
        }),
        views: viewItems.map(function (v) {
          return _this2._renderView(v);
        }),
        embeds: embedsPage
      };

      if (route.loader) {
        route.loader(app).then(function (v) {
          Object.assign(route, v, {
            loader: null
          });

          _this2.forceUpdate();
        });
        return _react.default.createElement(Router.PageLoading, {
          key: _id
        });
      } else if (typeof route.component === 'function') {
        return _react.default.createElement(app.Page, props);
      } else {
        return _react.default.createElement(Router.PageError, {
          key: _id,
          app: app,
          data: {
            errorRoute: "wrong component"
          }
        });
      }
    }
  }, {
    key: "_renderView",
    value: function _renderView(_ref4) {
      var Component = _ref4.content,
          props = _ref4.props,
          _ref4$options = _ref4.options,
          _id = _ref4$options._id,
          isContentComponent = _ref4$options.isContentComponent;
      var aprops = (0, _objectSpread2.default)({}, isContentComponent ? {} : Component.porps, props, {
        key: _id
      });
      return isContentComponent ? _react.default.createElement(Component, aprops) : (0, _typeof2.default)(Component) === 'object' && Component.type ? (0, _react.cloneElement)(Component, aprops) : Component;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props$app$route = this.props.app.router,
          _pathinfos = _this$props$app$route._pathinfos,
          _errorInfo = _this$props$app$route._errorInfo,
          _activeId = _this$props$app$route._activeId,
          _focusId = _this$props$app$route._focusId;
      var viewItems = this.props.app.router.getNoPageViews().map(function (v) {
        return (0, _objectSpread2.default)({}, v);
      });

      if (!_errorInfo) {
        return _react.default.createElement(_react.default.Fragment, null, _pathinfos.map(function (v) {
          return _this3._renderPage(v, _activeId, _focusId);
        }), viewItems.map(function (v) {
          return _this3._renderView(v, _activeId, _focusId);
        }));
      } else {
        return _react.default.createElement(Router.PageError, {
          app: this.props.app,
          data: _errorInfo
        });
      }
    }
  }]);
  return RouterComponent;
}(_react.default.Component);

var Router =
/*#__PURE__*/
function () {
  // constructor
  // ----------------------------------------
  function Router(app) {
    var _this4 = this;

    (0, _classCallCheck2.default)(this, Router);
    this.app = app;
    this._id = app._id + '.router';
    this._routes = {};
    this._views = [];
    this._pages = {};
    this._pathinfos = [];
    this._errorInfo = undefined;
    this._activeId = undefined;
    ;
    this._focusId = undefined;
    this._blockLocation = undefined;
    this._viewIdNum = 0;
    this._historyStackCount = 0;
    this.passQuery = false;
    this.passState = false;
    this.passParams = false;
    this.app.event.on(this.app._id, 'onPageAdd', function (_id, page) {
      page && _this4._addPage(_id, page);
    }, this._id);
    this.app.event.on(this.app._id, 'onPageRemove', function (_id, page) {
      page && _this4._removePage(_id);
    }, this._id);
    this.app.event.on(this.app._id, 'onAppStartRouter', function () {
      return _this4.app.render.component = _react.default.createElement(Router.RouterComponent, {
        app: _this4.app
      });
    }, this._id);
    this.app.event.on(this.app._id, 'onAppStartRender', function () {
      _this4._updateRender();
    }, this._id);

    this._initHistory();

    this._initRoute();
  }

  (0, _createClass2.default)(Router, [{
    key: "destructor",
    value: function destructor() {
      this.app.event.off(this._id);
    }
  }, {
    key: "_updateRender",
    value: function _updateRender() {
      this.app.event.emit(this.app._id, 'onRouterUpdate');
    } // route
    // --------------------------------------

  }, {
    key: "_initHistory",
    value: function _initHistory() {
      var _this5 = this;

      var handleLocationChange = function handleLocationChange(location, action) {
        _this5.app.log.info('router location', location);

        _this5._errorInfo = null;

        _this5._updateQuerys(location);

        _this5._updateStack(action, location);

        _this5._updatePathInfos(location);
      };

      this.history = (0, _createHashHistory.default)();
      this.history.listen(function (location, action) {
        return handleLocationChange(location, action);
      });
      handleLocationChange(this.history.location, this.history.action);
    }
  }, {
    key: "_updateStack",
    value: function _updateStack(action, location) {
      if (action === 'PUSH') this._historyStackCount++;
      if (action === 'POP') this._historyStackCount = Math.max(--this._historyStackCount, 0);
    }
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
    key: "_updateQuerys",
    value: function _updateQuerys(location) {
      location.query = {};
      location.search && location.search.slice(1).split('&').forEach(function (v) {
        var vs = v.split('=');
        location.query[vs[0]] = vs[1];
      });
    }
  }, {
    key: "_updatePathInfos",
    value: function () {
      var _updatePathInfos2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(location) {
        var _this6 = this;

        var pathname, spe, paramSpe, subPageSpe, paramOptional, errorTag, pageSign, pos, pathinfos, focusId, activeId, index, sub, fullPath, paramObj, viewItems, focusViewItem, activePageItem, pageFocusViewItem, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pathinfo, blockInfo;

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
                pathname = location.pathname;
                spe = '/';
                paramSpe = ':';
                subPageSpe = '|';
                paramOptional = '?';
                errorTag = '/error';
                pageSign = '#';
                pos = 0;
                pathinfos = [];
                focusId = undefined;
                activeId = undefined;
                /* pathname parse*/

                while (pos < pathname.length - 1) {
                  index = pathname.indexOf(spe, pos + 1);
                  index = index >= 0 ? index : pathname.length;
                  sub = pathname.slice(pos + 1, index);

                  if (pos === 0 && (sub[0] === paramSpe || (spe + sub).startsWith(errorTag) || this.getRoute(spe + sub.split(paramSpe)[0]).length)) {
                    pathinfos.push(spe + sub);
                  } else if (pos === 0) {
                    pathinfos.push(spe);
                    pathinfos.push(sub);
                  } else {
                    pathinfos.push(sub);
                  }

                  pos = index;
                }

                if (!pathinfos.length) pathinfos.push(spe);
                /* route */

                fullPath = '';
                paramObj = {};
                pathinfos = pathinfos.map(function (v, i, r) {
                  var vs = v.split(paramSpe);
                  var aFullPath = (0, _path.join)(fullPath, v);

                  var _id = pageSign + aFullPath;

                  var ret = {
                    name: vs[0],
                    params: vs.slice(1),
                    path: v,
                    fullPath: aFullPath,
                    _id: _id,
                    _idParent: pageSign + fullPath,
                    embeds: {},
                    paramObj: _this6.passParams ? (0, _objectSpread2.default)({}, paramObj) : {},
                    query: location.query,
                    state: location.state,
                    viewItems: _this6.getPageViews(_id)
                  };
                  fullPath = ret.fullPath;

                  var _this6$getRoute = _this6.getRoute(ret.name),
                      _this6$getRoute2 = (0, _slicedToArray2.default)(_this6$getRoute, 2),
                      routeName = _this6$getRoute2[0],
                      route = _this6$getRoute2[1];

                  if (ret.name === errorTag) {
                    ret.errorPage = true;
                    !_this6._errorInfo && (_this6._errorInfo = ret);
                    return undefined;
                  } else {
                    ret.routeName = routeName;
                    ret.route = route;

                    if (!ret.routeName || !ret.route) {
                      ret.errorRoute = 'no route';
                      !_this6._errorInfo && (_this6._errorInfo = ret);
                      return ret;
                    }
                  }

                  (Array.isArray(route.embeds) ? route.embeds.map(function (vv) {
                    return [vv, vv];
                  }) : Object.entries(route.embeds || {})).forEach(function (_ref5) {
                    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
                        kk = _ref6[0],
                        vv = _ref6[1];

                    var _idEmbed = ret._id + subPageSpe + vv;

                    var retEmbed = {
                      name: vv,
                      params: ret.params,
                      path: ret.path,
                      fullPath: ret.fullPath,
                      _id: _idEmbed,
                      _idParent: ret._id,
                      embed: true,
                      embeds: {},
                      paramObj: ret.paramObj,
                      query: ret.query,
                      state: ret.state,
                      viewItems: _this6.getPageViews(_idEmbed)
                    };

                    var _this6$getRoute3 = _this6.getRoute(retEmbed.name),
                        _this6$getRoute4 = (0, _slicedToArray2.default)(_this6$getRoute3, 2),
                        routeNameEmbed = _this6$getRoute4[0],
                        routeEmbed = _this6$getRoute4[1];

                    retEmbed.routeName = routeNameEmbed;
                    retEmbed.route = routeEmbed;

                    if (!retEmbed.routeName || !retEmbed.route) {
                      retEmbed.errorRoute = 'no route';
                      !_this6._errorInfo && (_this6._errorInfo = ret);
                    }

                    ret.embeds[kk] = retEmbed;
                  });
                  var routeParams = routeName.split(paramSpe).slice(1);

                  if (routeParams.filter(function (vv) {
                    return !vv.endsWith(paramOptional);
                  }).length > ret.params.length) {
                    ret.errorRoute = 'miss require param';
                    !_this6._errorInfo && (_this6._errorInfo = ret);
                  } else {
                    ret.params.forEach(function (vv, ii) {
                      var name = routeParams[ii] ? routeParams[ii].endsWith(paramOptional) ? routeParams[ii].slice(0, -1) : routeParams[ii] : ii;
                      ret.paramObj[name] = decodeURIComponent(vv);
                      if (_this6.passParams) paramObj[name] = ret.paramObj[name];
                    });
                  }

                  return ret;
                });
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

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 27;
                _iterator = pathinfos[Symbol.iterator]();

              case 29:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 39;
                  break;
                }

                pathinfo = _step.value;
                _context.next = 33;
                return this.app.event.emit(this.app._id, 'onRouteMatch', pathinfo, location);

              case 33:
                blockInfo = _context.sent;

                if (!blockInfo) {
                  _context.next = 36;
                  break;
                }

                return _context.abrupt("return", this.block(blockInfo));

              case 36:
                _iteratorNormalCompletion = true;
                _context.next = 29;
                break;

              case 39:
                _context.next = 45;
                break;

              case 41:
                _context.prev = 41;
                _context.t0 = _context["catch"](27);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 45:
                _context.prev = 45;
                _context.prev = 46;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 48:
                _context.prev = 48;

                if (!_didIteratorError) {
                  _context.next = 51;
                  break;
                }

                throw _iteratorError;

              case 51:
                return _context.finish(48);

              case 52:
                return _context.finish(45);

              case 53:
                this._focusId = focusId;
                this._activeId = activeId;
                this._pathinfos = pathinfos;

                this._updateRender();

              case 57:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[27, 41, 45, 53], [46,, 48, 52]]);
      }));

      return function _updatePathInfos(_x) {
        return _updatePathInfos2.apply(this, arguments);
      };
    }()
  }, {
    key: "_initRoute",
    value: function _initRoute() {
      this._genRouteMethod('/');

      this._genRouteMethod('/error');
    }
  }, {
    key: "_genRouteMethod",
    value: function _genRouteMethod(path) {
      var _this7 = this;

      if (!path) return;
      var name = path === '/' ? 'Root' : this.app.utils.captilaze(path[0] === '/' ? path.slice(1) : path);

      this['push' + name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this7.push([path].concat(args));
      };

      this['replace' + name] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this7.replace([path].concat(args));
      };
    }
  }, {
    key: "setRoutes",
    value: function setRoutes(routes) {
      var _this8 = this;

      this._routes = routes;
      Object.keys(routes || {}).forEach(function (v) {
        return v && _this8._genRouteMethod(v.split(':')[0]);
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
      var route = Object.entries(this._routes).find(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

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

      this._genRouteMethod(name.split(':')[0]);

      this._updatePathInfos(this.history.location);
    }
  }, {
    key: "isFocus",
    value: function isFocus(_id) {
      return this._focusId === _id;
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
      return this._views.filter(function (_ref9) {
        var options = _ref9.options;
        return !options._idPage;
      });
    }
  }, {
    key: "getPageViews",
    value: function getPageViews(_id) {
      return this._views.filter(function (_ref10) {
        var options = _ref10.options;
        return options._idPage === _id;
      });
    }
  }, {
    key: "removePageViews",
    value: function removePageViews(_id) {
      var _this9 = this;

      this.getPageViews(_id).forEach(function (v) {
        return _this9.removeView(v.options._id);
      });
    } // router navigator
    // ----------------------------------------

  }, {
    key: "getLocationInfo",
    value: function getLocationInfo() {
      var query = {};
      var state = {};

      var pathnames = this._pathinfos.map(function (v) {
        return v.path;
      });

      var addPath = function addPath(path) {
        path.split('/').forEach(function (v) {
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
          if (!arg._state) query = (0, _objectSpread2.default)({}, query, arg);

          if (arg._state) {
            delete arg._state;
            state = (0, _objectSpread2.default)({}, state, arg);
          }
        } else {
          addPath(String(arg));
        }
      }); //pathname, search, hash, key, state

      return {
        state: this.passState ? (0, _objectSpread2.default)({}, this.history.location.state, state) : state,
        pathname: pathnames.map(function (v, i, a) {
          return i === 0 && v === '/' && a.length > 1 ? '' : v;
        }).join('/'),
        search: '?' + Object.entries(this.passQuery ? (0, _objectSpread2.default)({}, this.history.location.query, query) : query).map(function (_ref11) {
          var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
              k = _ref12[0],
              v = _ref12[1];

          return k + '=' + v;
        }).reduce(function (v1, v2) {
          return v1 + (v1 ? '&' : '') + v2;
        }, '')
      };
    }
  }, {
    key: "getUrlPath",
    value: function getUrlPath() {
      return this.history.createHref(this.getLocationInfo.apply(this, arguments));
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return window.location.origin + window.location.pathname + window.location.search + this.getUrlPath.apply(this, arguments);
    }
  }, {
    key: "block",
    value: function block(blockInfo) {
      this.app.log.info('router block', blockInfo);
      this._blockLocation = this.history.location;
      if (typeof blockInfo === 'function') blockInfo(this.app);
      return true;
    }
  }, {
    key: "restore",
    value: function restore(location) {
      this.app.log.info('router restore', location);
      location || this._blockLocation ? this.history.replace(location || this._blockLocation) : this.replaceRoot();
      this._blockLocation = null;
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
      this._errorInfo = null;

      this._updatePathInfos(this.history.location);

      return true;
    }
  }, {
    key: "error",
    value: function error(message, title, _id) {
      this._errorInfo = {
        params: [message, title, _id]
      };

      this._updateRender();
    }
  }]);
  return Router;
}();

exports.default = Router;
Router.RouterComponent = RouterComponent;
Router.PageLoading = PageLoading;
Router.PageError = PageError;
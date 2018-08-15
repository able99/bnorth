"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _react = _interopRequireWildcard(require("react"));

var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

var _path = require("path");

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = "".concat(options.end).concat(options.strict).concat(options.sensitive);
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
  if (cache[pattern]) return cache[pattern];
  var keys = [];
  var re = (0, _pathToRegexp.default)(pattern, keys, options);
  var compiledPattern = {
    re: re,
    keys: keys
  };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments.length > 2 ? arguments[2] : undefined;
  if (typeof options === "string") options = {
    path: options
  };
  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === void 0 ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  if (path == null) return parent;

  var _compilePath = compilePath(path, {
    end: exact,
    strict: strict,
    sensitive: sensitive
  }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);
  if (!match) return null;

  var _match = (0, _toArray2.default)(match),
      url = _match[0],
      values = _match.slice(1);

  var isExact = pathname === url;
  if (exact && !isExact) return null;
  return {
    path: path,
    // the path pattern used to match
    url: path === "/" && url === "" ? "/" : url,
    // the matched portion of the URL
    isExact: isExact,
    // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

var PageLoader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PageLoader, _React$Component);

  function PageLoader(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PageLoader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PageLoader).call(this, props));
    _this.state = _this.props.route || {};
    return _this;
  }

  (0, _createClass2.default)(PageLoader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$state = this.state,
          dcomponent = _this$state.dcomponent,
          dcontroller = _this$state.dcontroller;

      if (typeof dcomponent === 'function') {
        dcomponent().then(function (v) {
          return _this2.setState({
            component: v,
            dcomponent: undefined
          });
        });
      }

      if (typeof dcontroller === 'function') {
        dcontroller().then(function (v) {
          return _this2.setState({
            controller: v,
            dcontroller: undefined
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["children"]);
      var _this$state2 = this.state,
          dcomponent = _this$state2.dcomponent,
          dcontroller = _this$state2.dcontroller,
          route = (0, _objectWithoutProperties2.default)(_this$state2, ["dcomponent", "dcontroller"]);
      return dcomponent || dcontroller ? _react.default.createElement("div", null, "...") : (0, _react.cloneElement)(children, (0, _objectSpread3.default)({}, children && children.props, props, (0, _defineProperty2.default)({
        route: route
      }, "route", props.route)));
    }
  }]);
  return PageLoader;
}(_react.default.Component);

var RouterComponent =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(RouterComponent, _React$Component2);

  function RouterComponent() {
    (0, _classCallCheck2.default)(this, RouterComponent);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RouterComponent).apply(this, arguments));
  }

  (0, _createClass2.default)(RouterComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.eventOffRouterComponentUpdate = this.props.app.event.on(this.props.app, 'onRouterComponentUpdate', function (pages, views) {
        _this3.pages = pages;
        _this3.views = views;

        _this3.forceUpdate();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.eventOffRouterComponentUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, this.pages, this.views);
    }
  }]);
  return RouterComponent;
}(_react.default.Component);

var PageError = function PageError(props) {
  var app = props.app,
      _props$match = props.match;
  _props$match = _props$match === void 0 ? {} : _props$match;
  var _props$match$params = _props$match.params;
  _props$match$params = _props$match$params === void 0 ? {} : _props$match$params;
  var title = _props$match$params.title,
      msg = _props$match$params.msg;
  return _react.default.createElement("div", {
    style: {
      padding: 8
    }
  }, _react.default.createElement("h3", null, "\u51FA\u9519\u5566:", title), _react.default.createElement("hr", null), _react.default.createElement("a", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.back();
    }
  }, "\u56DE\u524D\u9875"), _react.default.createElement("a", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.goRoot();
    }
  }, "\u56DE\u9996\u9875"), _react.default.createElement("hr", null), _react.default.createElement("p", null, msg));
};

var Router =
/*#__PURE__*/
function () {
  // constructor
  // ----------------------------------------
  function Router(app) {
    var _this4 = this;

    (0, _classCallCheck2.default)(this, Router);
    this.app = app;
    this._routes;
    this.routes = {};
    this.pages = {};
    this.views = {};
    this._viewRef = 0;
    this.focusRef;
    this.historyStackCount = 0, this.history = (0, _createHashHistory.default)();
    this.unlisten = this.history.listen(function (location, action) {
      app.log.info('router location', location);
      if (action === 'PUSH') _this4.historyStackCount++;
      if (action === 'POP') _this4.historyStackCount = Math.max(--_this4.historyStackCount, 0);

      _this4._handleLocationRouterUpdate();
    });
    this.app.event.on(this.app, 'onAppStartRender', function () {
      return _this4._handleLocationRouterUpdate();
    });
    this.app.event.on(this.app, 'onPageAdd', function (name, page) {
      return page && !page.props.embed && _this4.addPage(name, page);
    });
    this.app.event.on(this.app, 'onPageRemove', function (name, page) {
      return page && !page.props.embed && _this4.removePage(name);
    });
    this.app.event.on(this.app, 'onAppStartRouter', function () {
      return _this4.app.render.component = _react.default.createElement(RouterComponent, {
        app: _this4.app
      });
    });
  } // routes
  // ----------------------------------------


  (0, _createClass2.default)(Router, [{
    key: "setRoutes",
    value: function setRoutes(routes, render) {
      var _this5 = this;

      app.log.info('router routes', routes);
      if (!routes) return;
      var hasErrorRoute;

      var parseRoutes = function parseRoutes(routes, parentName) {
        Object.entries(routes || {}).forEach(function (_ref2) {
          var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
              k = _ref3[0],
              v = _ref3[1];

          var name = v.name && (v.name === true ? k : v.name);
          var pathname = (0, _path.join)(parentName, k);
          if (name) _this5["go".concat(app.utils.captilaze(name))] = function (replace) {
            return replace ? _this5.replace(pathname) : _this5.push(pathname);
          };
          if (name === 'err') hasErrorRoute = true;
          if (v.routes && (0, _typeof2.default)(v.routes) === 'object') parseRoutes(v.routes, pathname);
        });
      };

      parseRoutes(routes, '');

      if (!hasErrorRoute) {
        this._routes = (0, _objectSpread3.default)({}, {
          '/err/:msg?/:title?': {
            name: 'err',
            component: Router.PageError
          }
        }, routes);

        this["goErr"] = function (msg, title, options) {
          return _this5.push('/err', app.utils.message2String(msg), app.utils.message2String(title));
        };
      } else {
        this._routes = routes;
      }

      render && this.app.event.emit(this.app, 'onRouterComponentUpdate', ret, this.renderViews());
    }
  }, {
    key: "_handleLocationRouterUpdate",
    value: function () {
      var _handleLocationRouterUpdate2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(aroutes) {
        var _this6 = this;

        var pathname, routes, ret, parent, params, isMatch, _arr, _loop2, _i, _ret, views, viewModal, activePage, activePageViews, activePageViewsModal, i, _i3;

        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (aroutes) this._routes = aroutes;
                pathname = this.history.location.pathname;
                routes = this._routes || {};
                ret = [];
                parent = '';
                params = {};
                this.focusRef = undefined;

              case 7:
                if (!(pathname !== parent)) {
                  _context2.next = 33;
                  break;
                }

                isMatch = void 0;
                if (typeof routes === 'string') routes = this.app.utils.pathGet(this._routes, routes.split('|').reduce(function (v1, v2) {
                  return "".concat(v1, "[").concat('"' + v2 + '"', "].routes");
                }, ''));
                if ((0, _typeof2.default)(routes) !== 'object') routes = {};
                _arr = Object.entries(routes);
                _loop2 =
                /*#__PURE__*/
                _regenerator.default.mark(function _loop2() {
                  var _arr$_i, k, v, _arr2, _i2, _arr2$_i, kk, vv, tmpK, key, pathinfo, match, redirect, pageViews, embeds, page;

                  return _regenerator.default.wrap(function _loop2$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2), k = _arr$_i[0], v = _arr$_i[1];

                          if (!(k.includes(':') && v.routes)) {
                            _context.next = 13;
                            break;
                          }

                          _arr2 = Object.entries(v.routes);
                          _i2 = 0;

                        case 4:
                          if (!(_i2 < _arr2.length)) {
                            _context.next = 13;
                            break;
                          }

                          _arr2$_i = (0, _slicedToArray2.default)(_arr2[_i2], 2), kk = _arr2$_i[0], vv = _arr2$_i[1];
                          tmpK = k.slice(0, k.indexOf(':'));

                          if (!matchPath(pathname, {
                            path: (0, _path.join)(parent, tmpK, kk)
                          })) {
                            _context.next = 10;
                            break;
                          }

                          k = tmpK;
                          return _context.abrupt("break", 13);

                        case 10:
                          _i2++;
                          _context.next = 4;
                          break;

                        case 13:
                          key = (0, _path.join)(parent, k);
                          pathinfo = matchPath(pathname, {
                            path: key
                          });

                          if (pathinfo) {
                            _context.next = 17;
                            break;
                          }

                          return _context.abrupt("return", "continue");

                        case 17:
                          params = (0, _objectSpread3.default)({}, params, pathinfo.params);
                          match = {
                            params: params,
                            url: pathinfo.url
                          };
                          _context.t0 = v.onEnter && v.onEnter(key, v, match);

                          if (_context.t0) {
                            _context.next = 24;
                            break;
                          }

                          _context.next = 23;
                          return _this6.app.event.emitSync(_this6.app, 'onRouterEnter', key, v, match);

                        case 23:
                          _context.t0 = _context.sent;

                        case 24:
                          redirect = _context.t0;

                          if (!redirect) {
                            _context.next = 29;
                            break;
                          }

                          _this6.location = _this6.history.location;
                          typeof redirect === 'function' ? redirect() : _this6.history.replace(redirect);
                          return _context.abrupt("return", {
                            v: void 0
                          });

                        case 29:
                          pageViews = _this6.renderViews(key);
                          embeds = Object.entries(v.embeds || {}).map(function (_ref4) {
                            var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
                                kk = _ref5[0],
                                vv = _ref5[1];

                            var embedKey = key + kk;
                            return _react.default.createElement(_this6.app.Page, {
                              app: _this6.app,
                              key: embedKey,
                              name: '#' + embedKey,
                              embed: kk,
                              route: (0, _objectSpread3.default)({}, vv, {
                                name: vv.name || kk,
                                pathname: key
                              }),
                              match: match,
                              views: _this6.renderViews(embedKey)
                            });
                          });
                          page = _react.default.createElement(PageLoader, {
                            app: _this6.app,
                            key: key,
                            name: '#' + key,
                            route: (0, _objectSpread3.default)({}, v, {
                              name: v.name || k,
                              pathname: key
                            }),
                            match: match,
                            views: pageViews
                          }, _react.default.createElement(_this6.app.Page, null, embeds));
                          ret.push(page);
                          parent = pathinfo.url;
                          isMatch = true;
                          routes = v.routes || {};
                          return _context.abrupt("return", "break");

                        case 37:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _loop2, this);
                });
                _i = 0;

              case 14:
                if (!(_i < _arr.length)) {
                  _context2.next = 27;
                  break;
                }

                return _context2.delegateYield(_loop2(), "t0", 16);

              case 16:
                _ret = _context2.t0;
                _context2.t1 = _ret;
                _context2.next = _context2.t1 === "continue" ? 20 : _context2.t1 === "break" ? 21 : 22;
                break;

              case 20:
                return _context2.abrupt("continue", 24);

              case 21:
                return _context2.abrupt("break", 27);

              case 22:
                if (!((0, _typeof2.default)(_ret) === "object")) {
                  _context2.next = 24;
                  break;
                }

                return _context2.abrupt("return", _ret.v);

              case 24:
                _i++;
                _context2.next = 14;
                break;

              case 27:
                if (!(!isMatch && this.history.location.pathname !== '/')) {
                  _context2.next = 31;
                  break;
                }

                this.app.log.error('router nomatch', pathname);
                this.goRoot(true);
                return _context2.abrupt("break", 33);

              case 31:
                _context2.next = 7;
                break;

              case 33:
                views = this.renderViews();
                viewModal = views.reverse().find(function (v) {
                  return v && v.props['data-bnorth-modal'];
                });
                activePage = ret[ret.length - 1];
                activePageViews = activePage ? activePage.props.views : [];
                activePageViewsModal = activePageViews.reverse().find(function (v) {
                  return v && v.props['data-bnorth-modal'];
                });

                if (!viewModal) {
                  _context2.next = 50;
                  break;
                }

                _context2.t2 = _regenerator.default.keys(views);

              case 40:
                if ((_context2.t3 = _context2.t2()).done) {
                  _context2.next = 48;
                  break;
                }

                i = _context2.t3.value;

                if (!(views[i] === viewModal)) {
                  _context2.next = 46;
                  break;
                }

                views[i] = (0, _react.cloneElement)(viewModal, {
                  'data-bnorth-focus': true
                });
                this.focusRef = {
                  viewName: views[i].props['data-bnorth-viewname'],
                  pageName: views[i].props['data-bnorth-pagename']
                };
                return _context2.abrupt("break", 48);

              case 46:
                _context2.next = 40;
                break;

              case 48:
                _context2.next = 60;
                break;

              case 50:
                if (!activePageViewsModal) {
                  _context2.next = 60;
                  break;
                }

                _context2.t4 = _regenerator.default.keys(activePageViews);

              case 52:
                if ((_context2.t5 = _context2.t4()).done) {
                  _context2.next = 60;
                  break;
                }

                _i3 = _context2.t5.value;

                if (!(activePageViews[_i3] === activePageViewsModal)) {
                  _context2.next = 58;
                  break;
                }

                activePageViews[_i3] = (0, _react.cloneElement)(activePageViewsModal, {
                  'data-bnorth-focus': true
                });
                this.focusRef = {
                  viewName: activePageViews[_i3].props['data-bnorth-viewname'],
                  pageName: activePageViews[_i3].props['data-bnorth-pagename']
                };
                return _context2.abrupt("break", 60);

              case 58:
                _context2.next = 52;
                break;

              case 60:
                if (activePage) {
                  ret[ret.length - 1] = (0, _react.cloneElement)(activePage, {
                    active: true,
                    focus: !viewModal && !activePageViewsModal
                  });
                  if (!this.focusRef) this.focusRef = {
                    pageName: ret[ret.length - 1].props.name
                  };
                }

                this.app.event.emit(this.app, 'onRouterComponentUpdate', ret, views);

              case 62:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      return function _handleLocationRouterUpdate(_x) {
        return _handleLocationRouterUpdate2.apply(this, arguments);
      };
    }() // pages
    // ----------------------------------------

  }, {
    key: "addPage",
    value: function addPage(name, page) {
      this.pages[name] = page;
    }
  }, {
    key: "removePage",
    value: function removePage(name) {
      var page = this.getPage(name);

      if (page) {
        this.removePageViews(page.name);
        delete this.pages[page.name];
      }
    }
  }, {
    key: "getPage",
    value: function getPage(name) {
      if (typeof name === 'string') {
        return this.pages[name];
      } else if (typeof name === 'number') {
        return this.pages[Object.keys(this.pages)[name]];
      } else if (name === undefined) {
        var keys = Object.keys(this.pages);
        return this.pages[keys[keys.length - 1]];
      }
    } // views 
    // ----------------------------------------

  }, {
    key: "addView",
    value: function addView(view) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref6$dataBnorthRef = _ref6['data-bnorth-ref'],
          _ref = _ref6$dataBnorthRef === void 0 ? '' : _ref6$dataBnorthRef,
          options = (0, _objectWithoutProperties2.default)(_ref6, ['data-bnorth-ref']);

      if (!view) return;

      if (_ref) {
        var refs = _ref.split('@#');

        if (refs.length === 2) {
          options['data-bnorth-viewname'] = refs[0];
          options['data-bnorth-pagename'] = refs[1];
        }
      }

      options['data-bnorth-pagename'] = options['data-bnorth-pagename'] || '';
      options['data-bnorth-viewname'] = options['data-bnorth-viewname'] || "$".concat(++this._viewRef);
      _ref = "".concat(options['data-bnorth-viewname'], "@#").concat(options['data-bnorth-pagename']);
      options['data-bnorth-ref'] = _ref;
      this.views[_ref] = !this.views[_ref] ? {
        view: view,
        options: options
      } : {
        view: view,
        options: (0, _objectSpread3.default)({}, this.views[_ref].options, options)
      };

      this._handleLocationRouterUpdate();

      return _ref;
    }
  }, {
    key: "removeView",
    value: function removeView(ref) {
      delete this.views[ref];

      this._handleLocationRouterUpdate();
    }
  }, {
    key: "removePageViews",
    value: function removePageViews(pageName) {
      var _this7 = this;

      this.getPageViews(pageName).forEach(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        return delete _this7.views[k];
      });

      this._handleLocationRouterUpdate();
    }
  }, {
    key: "getView",
    value: function getView(ref) {
      return this.views[ref];
    }
  }, {
    key: "getPageViews",
    value: function getPageViews(pageName) {
      return Object.entries(this.views).filter(function (_ref9) {
        var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
            k = _ref10[0],
            _ref10$ = _ref10[1];

        _ref10$ = _ref10$ === void 0 ? {} : _ref10$;
        var _ref10$$options = _ref10$.options,
            options = _ref10$$options === void 0 ? {} : _ref10$$options;
        return options['data-bnorth-pagename'] === pageName;
      });
    }
  }, {
    key: "renderViews",
    value: function renderViews() {
      var pageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.getPageViews(pageName).map(function (_ref11) {
        var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
            k = _ref12[0],
            v = _ref12[1];

        var _ref13 = v || {},
            view = _ref13.view,
            options = _ref13.options;

        var props = (0, _objectSpread3.default)({}, options, {
          key: k,
          ref: function ref(e) {
            return e && (v.ref = e);
          } //if(view && view.__proto__ instanceof React.Component.constructor) props[ref] = e=>e&&(v.ref=e);

        });

        if ((0, _typeof2.default)(view) === 'object' && view.type) {
          return (0, _react.cloneElement)(view, props);
        } else if (typeof view === 'function') {
          return _react.default.createElement("view", props);
        } else {
          delete props.ref;
          return view;
        }
      });
    } // router navigator
    // ----------------------------------------

  }, {
    key: "_pathinfoParse",
    value: function _pathinfoParse() {
      var pathinfo = {};
      var pathnames = [];
      var query = {};
      var hash = [];

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (v) {
        if ((0, _typeof2.default)(v) === 'object') {
          if (v.pathname) pathnames.push(v.pathname);
          if (v.query) query = (0, _objectSpread3.default)({}, query, v.query);
          if (v.hash) hash = (0, _toConsumableArray2.default)(hash).concat((0, _toConsumableArray2.default)(v.hash));
          pathinfo = (0, _objectSpread3.default)({}, pathinfo, {
            v: v
          });
        } else {
          pathnames.push(String(v));
        }
      });
      pathinfo.pathname = undefined;
      pathinfo.search = undefined;
      pathinfo.hash = undefined;
      return [pathinfo, pathnames, query, hash];
    }
  }, {
    key: "_pathinfoTrans",
    value: function _pathinfoTrans(_ref14) {
      var _ref15 = (0, _slicedToArray2.default)(_ref14, 4),
          pathinfo = _ref15[0],
          pathnames = _ref15[1],
          query = _ref15[2],
          hash = _ref15[3];

      var prevPathname;
      var upCount = pathnames.filter(function (v) {
        return v === '..';
      }).length;

      if (pathnames.find(function (v) {
        return v.startsWith('/') || v.startsWith('http');
      })) {
        prevPathname = '';
      } else {
        var pages = Object.values(this.app.router.pages);
        var lastPage = pages.slice(upCount ? -upCount : -1)[0];
        prevPathname = lastPage && lastPage.match.url || '';
      }

      var pathname = pathinfo.pathname || _path.join.apply(void 0, [prevPathname].concat((0, _toConsumableArray2.default)(pathnames)));

      var search = pathinfo.pathname || Object.entries(query).map(function (_ref16) {
        var _ref17 = (0, _slicedToArray2.default)(_ref16, 2),
            k = _ref17[0],
            v = _ref17[1];

        return k + '=' + v;
      }).join('&');
      hash = pathinfo.hash || hash.join();
      var key = pathinfo.key;
      var state = pathinfo.state;
      return {
        pathname: pathname,
        search: search,
        hash: hash,
        key: key,
        state: state
      };
    }
  }, {
    key: "restore",
    value: function restore(location) {
      app.log.info('router restore');
      location || this.location ? this.history.replace(location || this.location) : this.goRoot();
    }
  }, {
    key: "push",
    value: function push() {
      app.log.info('router push');
      return this.history.push(this._pathinfoTrans(this._pathinfoParse.apply(this, arguments)));
    }
  }, {
    key: "replace",
    value: function replace() {
      app.log.info('router replace');
      return this.history.replace(this._pathinfoTrans(this._pathinfoParse.apply(this, arguments)));
    }
  }, {
    key: "back",
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      app.log.info('router back');
      return this.history.go(-step);
    }
  }, {
    key: "goRoot",
    value: function goRoot(replace) {
      var pathinfo = '/';
      replace ? this.replace(pathinfo) : this.push(pathinfo);
    }
  }]);
  return Router;
}();

exports.default = Router;
Router.PageError = PageError;
module.exports = exports["default"];
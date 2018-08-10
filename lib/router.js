'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = '' + options.end + options.strict + options.sensitive;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var keys = [];
  var re = (0, _pathToRegexp2.default)(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments[2];

  if (typeof options === "string") options = { path: options };

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === undefined ? false : _options$sensitive;


  if (path == null) return parent;

  var _compilePath = compilePath(path, { end: exact, strict: strict, sensitive: sensitive }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var _match = (0, _toArray3.default)(match),
      url = _match[0],
      values = _match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path: path, // the path pattern used to match
    url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

var PageLoader = function (_React$Component) {
  (0, _inherits3.default)(PageLoader, _React$Component);

  function PageLoader(props) {
    (0, _classCallCheck3.default)(this, PageLoader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PageLoader.__proto__ || Object.getPrototypeOf(PageLoader)).call(this, props));

    _this.state = _this.props.route || {};
    return _this;
  }

  (0, _createClass3.default)(PageLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _state = this.state,
          dcomponent = _state.dcomponent,
          dcontroller = _state.dcontroller;

      if (typeof dcomponent === 'function') {
        dcomponent().then(function (v) {
          return _this2.setState({ component: v, dcomponent: undefined });
        });
      }
      if (typeof dcontroller === 'function') {
        dcontroller().then(function (v) {
          return _this2.setState({ controller: v, dcontroller: undefined });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          props = (0, _objectWithoutProperties3.default)(_props, ['children']);
      var _state2 = this.state,
          dcomponent = _state2.dcomponent,
          dcontroller = _state2.dcontroller,
          route = (0, _objectWithoutProperties3.default)(_state2, ['dcomponent', 'dcontroller']);


      return dcomponent || dcontroller ? _react2.default.createElement(
        'div',
        null,
        '...'
      ) : (0, _react.cloneElement)(children, (0, _extends4.default)({}, children && children.props, props, (0, _defineProperty3.default)({
        route: route }, 'route', props.route)));
    }
  }]);
  return PageLoader;
}(_react2.default.Component);

var RouterComponent = function (_React$Component2) {
  (0, _inherits3.default)(RouterComponent, _React$Component2);

  function RouterComponent() {
    (0, _classCallCheck3.default)(this, RouterComponent);
    return (0, _possibleConstructorReturn3.default)(this, (RouterComponent.__proto__ || Object.getPrototypeOf(RouterComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(RouterComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      this.eventOffRouterComponentUpdate = this.props.app.event.on(this.props.app, 'onRouterComponentUpdate', function (pages, views) {
        _this4.pages = pages;
        _this4.views = views;
        _this4.forceUpdate();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.eventOffRouterComponentUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        this.pages,
        this.views
      );
    }
  }]);
  return RouterComponent;
}(_react2.default.Component);

var PageError = function PageError(props) {
  var app = props.app,
      _props$match = props.match;
  _props$match = _props$match === undefined ? {} : _props$match;
  var _props$match$params = _props$match.params;
  _props$match$params = _props$match$params === undefined ? {} : _props$match$params;
  var title = _props$match$params.title,
      msg = _props$match$params.msg;

  return _react2.default.createElement(
    'div',
    { style: { padding: 8 } },
    _react2.default.createElement(
      'h3',
      null,
      '\u51FA\u9519\u5566:',
      title
    ),
    _react2.default.createElement('hr', null),
    _react2.default.createElement(
      'a',
      { style: { padding: 4 }, onClick: function onClick() {
          return app.router.back();
        } },
      '\u56DE\u524D\u9875'
    ),
    _react2.default.createElement(
      'a',
      { style: { padding: 4 }, onClick: function onClick() {
          return app.router.goRoot();
        } },
      '\u56DE\u9996\u9875'
    ),
    _react2.default.createElement('hr', null),
    _react2.default.createElement(
      'p',
      null,
      msg
    )
  );
};

var Router = function () {
  // constructor
  // ----------------------------------------
  function Router(app) {
    var _this5 = this;

    (0, _classCallCheck3.default)(this, Router);

    this.app = app;
    this._routes;
    this.routes = {};
    this.pages = {};
    this.views = {};
    this._viewRef = 0;
    this.focusRef;
    this.historyStackCount = 0, this.history = (0, _createHashHistory2.default)();
    this.unlisten = this.history.listen(function (location, action) {
      app.log.info('router location', location);
      if (action === 'PUSH') _this5.historyStackCount++;
      if (action === 'POP') _this5.historyStackCount = Math.max(--_this5.historyStackCount, 0);
      _this5._handleLocationRouterUpdate();
    });
    this.app.event.on(this.app, 'onAppStartRender', function () {
      return _this5._handleLocationRouterUpdate();
    });
    this.app.event.on(this.app, 'onPageAdd', function (name, page) {
      return page && !page.props.embed && _this5.addPage(name, page);
    });
    this.app.event.on(this.app, 'onPageRemove', function (name, page) {
      return page && !page.props.embed && _this5.removePage(name);
    });
    this.app.event.on(this.app, 'onAppStartRouter', function () {
      return _this5.app.render.component = _react2.default.createElement(RouterComponent, { app: _this5.app });
    });
  }

  // routes
  // ----------------------------------------


  (0, _createClass3.default)(Router, [{
    key: 'setRoutes',
    value: function setRoutes(routes, render) {
      var _this6 = this;

      app.log.info('router routes', routes);
      if (!routes) return;

      var hasErrorRoute = void 0;
      var parseRoutes = function parseRoutes(routes, parentName) {
        Object.entries(routes || {}).forEach(function (_ref2) {
          var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
              k = _ref3[0],
              v = _ref3[1];

          var name = v.name && (v.name === true ? k : v.name);
          var pathname = (0, _path.join)(parentName, k);
          if (name) _this6['go' + app.utils.captilaze(name)] = function (replace) {
            return replace ? _this6.replace(pathname) : _this6.push(pathname);
          };
          if (name === 'err') hasErrorRoute = true;
          if (v.routes && (0, _typeof3.default)(v.routes) === 'object') parseRoutes(v.routes, pathname);
        });
      };
      parseRoutes(routes, '');

      if (!hasErrorRoute) {
        this._routes = (0, _extends4.default)({ '/err/:msg?/:title?': { name: 'err', component: Router.PageError } }, routes);
        this['goErr'] = function (msg, title, options) {
          return _this6.push('/err', app.utils.message2String(msg), app.utils.message2String(title));
        };
      } else {
        this._routes = routes;
      }

      render && this.app.event.emit(this.app, 'onRouterComponentUpdate', ret, this.renderViews());
    }
  }, {
    key: '_handleLocationRouterUpdate',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(aroutes) {
        var _this7 = this;

        var pathname, routes, ret, parent, params, isMatch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, views, viewModal, activePage, activePageViews, activePageViewsModal, i, _i;

        return _regenerator2.default.wrap(function _callee$(_context2) {
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
                  _context2.next = 50;
                  break;
                }

                isMatch = void 0;


                if (typeof routes === 'string') routes = this.app.utils.pathGet(this._routes, routes.split('|').reduce(function (v1, v2) {
                  return v1 + '[' + ('"' + v2 + '"') + '].routes';
                }, ''));
                if ((typeof routes === 'undefined' ? 'undefined' : (0, _typeof3.default)(routes)) !== 'object') routes = {};

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 14;
                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop() {
                  var _step$value, k, v, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, kk, vv, tmpK, key, pathinfo, match, redirect, pageViews, embeds, page;

                  return _regenerator2.default.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _step$value = (0, _slicedToArray3.default)(_step.value, 2), k = _step$value[0], v = _step$value[1];

                          if (!(k.includes(':') && v.routes)) {
                            _context.next = 30;
                            break;
                          }

                          _iteratorNormalCompletion2 = true;
                          _didIteratorError2 = false;
                          _iteratorError2 = undefined;
                          _context.prev = 5;
                          _iterator2 = Object.entries(v.routes)[Symbol.iterator]();

                        case 7:
                          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context.next = 16;
                            break;
                          }

                          _step2$value = (0, _slicedToArray3.default)(_step2.value, 2), kk = _step2$value[0], vv = _step2$value[1];
                          tmpK = k.slice(0, k.indexOf(':'));

                          if (!matchPath(pathname, { path: (0, _path.join)(parent, tmpK, kk) })) {
                            _context.next = 13;
                            break;
                          }

                          k = tmpK;return _context.abrupt('break', 16);

                        case 13:
                          _iteratorNormalCompletion2 = true;
                          _context.next = 7;
                          break;

                        case 16:
                          _context.next = 22;
                          break;

                        case 18:
                          _context.prev = 18;
                          _context.t0 = _context['catch'](5);
                          _didIteratorError2 = true;
                          _iteratorError2 = _context.t0;

                        case 22:
                          _context.prev = 22;
                          _context.prev = 23;

                          if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                          }

                        case 25:
                          _context.prev = 25;

                          if (!_didIteratorError2) {
                            _context.next = 28;
                            break;
                          }

                          throw _iteratorError2;

                        case 28:
                          return _context.finish(25);

                        case 29:
                          return _context.finish(22);

                        case 30:
                          key = (0, _path.join)(parent, k);
                          pathinfo = matchPath(pathname, { path: key });

                          if (pathinfo) {
                            _context.next = 34;
                            break;
                          }

                          return _context.abrupt('return', 'continue');

                        case 34:
                          params = (0, _extends4.default)({}, params, pathinfo.params);
                          match = { params: params, url: pathinfo.url };
                          _context.t1 = v.onEnter && v.onEnter(key, v, match);

                          if (_context.t1) {
                            _context.next = 41;
                            break;
                          }

                          _context.next = 40;
                          return _this7.app.event.emitSync(_this7.app, 'onRouterEnter', key, v, match);

                        case 40:
                          _context.t1 = _context.sent;

                        case 41:
                          redirect = _context.t1;

                          if (!redirect) {
                            _context.next = 46;
                            break;
                          }

                          _this7.location = _this7.history.location;
                          typeof redirect === 'function' ? redirect() : _this7.history.replace(redirect);
                          return _context.abrupt('return', {
                            v: void 0
                          });

                        case 46:
                          pageViews = _this7.renderViews(key);
                          embeds = Object.entries(v.embeds || {}).map(function (_ref5) {
                            var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                                kk = _ref6[0],
                                vv = _ref6[1];

                            var embedKey = key + kk;
                            return _react2.default.createElement(_this7.app.Page, {
                              app: _this7.app, key: embedKey, name: '#' + embedKey, embed: kk,
                              route: (0, _extends4.default)({}, vv, { name: vv.name || kk, pathname: key }),
                              match: match,
                              views: _this7.renderViews(embedKey) });
                          });
                          page = _react2.default.createElement(
                            PageLoader,
                            { app: _this7.app, key: key, name: '#' + key,
                              route: (0, _extends4.default)({}, v, { name: v.name || k, pathname: key }),
                              match: match,
                              views: pageViews },
                            _react2.default.createElement(
                              _this7.app.Page,
                              null,
                              embeds
                            )
                          );


                          ret.push(page);
                          parent = pathinfo.url;
                          isMatch = true;
                          routes = v.routes || {};
                          return _context.abrupt('return', 'break');

                        case 54:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this7, [[5, 18, 22, 30], [23,, 25, 29]]);
                });
                _iterator = Object.entries(routes)[Symbol.iterator]();

              case 17:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 30;
                  break;
                }

                return _context2.delegateYield(_loop(), 't0', 19);

              case 19:
                _ret = _context2.t0;
                _context2.t1 = _ret;
                _context2.next = _context2.t1 === 'continue' ? 23 : _context2.t1 === 'break' ? 24 : 25;
                break;

              case 23:
                return _context2.abrupt('continue', 27);

              case 24:
                return _context2.abrupt('break', 30);

              case 25:
                if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                  _context2.next = 27;
                  break;
                }

                return _context2.abrupt('return', _ret.v);

              case 27:
                _iteratorNormalCompletion = true;
                _context2.next = 17;
                break;

              case 30:
                _context2.next = 36;
                break;

              case 32:
                _context2.prev = 32;
                _context2.t2 = _context2['catch'](14);
                _didIteratorError = true;
                _iteratorError = _context2.t2;

              case 36:
                _context2.prev = 36;
                _context2.prev = 37;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 39:
                _context2.prev = 39;

                if (!_didIteratorError) {
                  _context2.next = 42;
                  break;
                }

                throw _iteratorError;

              case 42:
                return _context2.finish(39);

              case 43:
                return _context2.finish(36);

              case 44:
                if (!(!isMatch && this.history.location.pathname !== '/')) {
                  _context2.next = 48;
                  break;
                }

                this.app.log.error('router nomatch', pathname);
                this.goRoot(true);
                return _context2.abrupt('break', 50);

              case 48:
                _context2.next = 7;
                break;

              case 50:
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
                  _context2.next = 67;
                  break;
                }

                _context2.t3 = _regenerator2.default.keys(views);

              case 57:
                if ((_context2.t4 = _context2.t3()).done) {
                  _context2.next = 65;
                  break;
                }

                i = _context2.t4.value;

                if (!(views[i] === viewModal)) {
                  _context2.next = 63;
                  break;
                }

                views[i] = (0, _react.cloneElement)(viewModal, { 'data-bnorth-focus': true });
                this.focusRef = { viewName: views[i].props['data-bnorth-viewname'], pageName: views[i].props['data-bnorth-pagename'] };
                return _context2.abrupt('break', 65);

              case 63:
                _context2.next = 57;
                break;

              case 65:
                _context2.next = 77;
                break;

              case 67:
                if (!activePageViewsModal) {
                  _context2.next = 77;
                  break;
                }

                _context2.t5 = _regenerator2.default.keys(activePageViews);

              case 69:
                if ((_context2.t6 = _context2.t5()).done) {
                  _context2.next = 77;
                  break;
                }

                _i = _context2.t6.value;

                if (!(activePageViews[_i] === activePageViewsModal)) {
                  _context2.next = 75;
                  break;
                }

                activePageViews[_i] = (0, _react.cloneElement)(activePageViewsModal, { 'data-bnorth-focus': true });
                this.focusRef = { viewName: activePageViews[_i].props['data-bnorth-viewname'], pageName: activePageViews[_i].props['data-bnorth-pagename'] };
                return _context2.abrupt('break', 77);

              case 75:
                _context2.next = 69;
                break;

              case 77:

                if (activePage) {
                  ret[ret.length - 1] = (0, _react.cloneElement)(activePage, {
                    active: true,
                    focus: !viewModal && !activePageViewsModal
                  });
                  if (!this.focusRef) this.focusRef = { pageName: ret[ret.length - 1].props.name };
                }

                this.app.event.emit(this.app, 'onRouterComponentUpdate', ret, views);

              case 79:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this, [[14, 32, 36, 44], [37,, 39, 43]]);
      }));

      function _handleLocationRouterUpdate(_x2) {
        return _ref4.apply(this, arguments);
      }

      return _handleLocationRouterUpdate;
    }()

    // pages
    // ----------------------------------------

  }, {
    key: 'addPage',
    value: function addPage(name, page) {
      this.pages[name] = page;
    }
  }, {
    key: 'removePage',
    value: function removePage(name) {
      var page = this.getPage(name);
      if (page) {
        this.removePageViews(page.name);
        delete this.pages[page.name];
      }
    }
  }, {
    key: 'getPage',
    value: function getPage(name) {
      if (typeof name === 'string') {
        return this.pages[name];
      } else if (typeof name === 'number') {
        return this.pages[Object.keys(this.pages)[name]];
      } else if (name === undefined) {
        var keys = Object.keys(this.pages);
        return this.pages[keys[keys.length - 1]];
      }
    }

    // views 
    // ----------------------------------------

  }, {
    key: 'addView',
    value: function addView(view) {
      var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref7$dataBnorthRef = _ref7['data-bnorth-ref'],
          _ref = _ref7$dataBnorthRef === undefined ? '' : _ref7$dataBnorthRef,
          options = (0, _objectWithoutProperties3.default)(_ref7, ['data-bnorth-ref']);

      if (!view) return;

      if (_ref) {
        var refs = _ref.split('@#');
        if (refs.length === 2) {
          options['data-bnorth-viewname'] = refs[0];
          options['data-bnorth-pagename'] = refs[1];
        }
      }
      options['data-bnorth-pagename'] = options['data-bnorth-pagename'] || '';
      options['data-bnorth-viewname'] = options['data-bnorth-viewname'] || '$' + ++this._viewRef;
      _ref = options['data-bnorth-viewname'] + '@#' + options['data-bnorth-pagename'];
      options['data-bnorth-ref'] = _ref;

      this.views[_ref] = !this.views[_ref] ? { view: view, options: options } : { view: view, options: (0, _extends4.default)({}, this.views[_ref].options, options) };
      this._handleLocationRouterUpdate();

      return _ref;
    }
  }, {
    key: 'removeView',
    value: function removeView(ref) {
      delete this.views[ref];
      this._handleLocationRouterUpdate();
    }
  }, {
    key: 'removePageViews',
    value: function removePageViews(pageName) {
      var _this8 = this;

      this.getPageViews(pageName).forEach(function (_ref8) {
        var _ref9 = (0, _slicedToArray3.default)(_ref8, 2),
            k = _ref9[0],
            v = _ref9[1];

        return delete _this8.views[k];
      });
      this._handleLocationRouterUpdate();
    }
  }, {
    key: 'getView',
    value: function getView(ref) {
      return this.views[ref];
    }
  }, {
    key: 'getPageViews',
    value: function getPageViews(pageName) {
      return Object.entries(this.views).filter(function (_ref10) {
        var _ref11 = (0, _slicedToArray3.default)(_ref10, 2),
            k = _ref11[0],
            _ref11$ = _ref11[1];

        _ref11$ = _ref11$ === undefined ? {} : _ref11$;
        var _ref11$$options = _ref11$.options,
            options = _ref11$$options === undefined ? {} : _ref11$$options;
        return options['data-bnorth-pagename'] === pageName;
      });
    }
  }, {
    key: 'renderViews',
    value: function renderViews() {
      var pageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.getPageViews(pageName).map(function (_ref12) {
        var _ref13 = (0, _slicedToArray3.default)(_ref12, 2),
            k = _ref13[0],
            v = _ref13[1];

        var _ref14 = v || {},
            view = _ref14.view,
            options = _ref14.options;

        var props = (0, _extends4.default)({}, options, {
          key: k,
          ref: function ref(e) {
            return e && (v.ref = e);
          }
          //if(view && view.__proto__ instanceof React.Component.constructor) props[ref] = e=>e&&(v.ref=e);

        });if ((typeof view === 'undefined' ? 'undefined' : (0, _typeof3.default)(view)) === 'object' && view.type) {
          return (0, _react.cloneElement)(view, props);
        } else if (typeof view === 'function') {
          return _react2.default.createElement('view', props);
        } else {
          delete props.ref;
          return view;
        }
      });
    }

    // router navigator
    // ----------------------------------------

  }, {
    key: '_pathinfoParse',
    value: function _pathinfoParse() {
      var pathinfo = {};
      var pathnames = [];
      var query = {};
      var hash = [];

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (v) {
        if ((typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) === 'object') {
          if (v.pathname) pathnames.push(v.pathname);
          if (v.query) query = (0, _extends4.default)({}, query, v.query);
          if (v.hash) hash = [].concat((0, _toConsumableArray3.default)(hash), (0, _toConsumableArray3.default)(v.hash));
          pathinfo = (0, _extends4.default)({}, pathinfo, { v: v });
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
    key: '_pathinfoTrans',
    value: function _pathinfoTrans(_ref15) {
      var _ref16 = (0, _slicedToArray3.default)(_ref15, 4),
          pathinfo = _ref16[0],
          pathnames = _ref16[1],
          query = _ref16[2],
          hash = _ref16[3];

      var prevPathname = void 0;
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

      var pathname = pathinfo.pathname || _path.join.apply(undefined, [prevPathname].concat((0, _toConsumableArray3.default)(pathnames)));
      var search = pathinfo.pathname || Object.entries(query).map(function (_ref17) {
        var _ref18 = (0, _slicedToArray3.default)(_ref17, 2),
            k = _ref18[0],
            v = _ref18[1];

        return k + '=' + v;
      }).join('&');
      hash = pathinfo.hash || hash.join();
      var key = pathinfo.key;
      var state = pathinfo.state;
      return { pathname: pathname, search: search, hash: hash, key: key, state: state };
    }
  }, {
    key: 'restore',
    value: function restore(location) {
      app.log.info('router restore');
      location || this.location ? this.history.replace(location || this.location) : this.goRoot();
    }
  }, {
    key: 'push',
    value: function push() {
      app.log.info('router push');
      return this.history.push(this._pathinfoTrans(this._pathinfoParse.apply(this, arguments)));
    }
  }, {
    key: 'replace',
    value: function replace() {
      app.log.info('router replace');
      return this.history.replace(this._pathinfoTrans(this._pathinfoParse.apply(this, arguments)));
    }
  }, {
    key: 'back',
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      app.log.info('router back');
      return this.history.go(-step);
    }
  }, {
    key: 'goRoot',
    value: function goRoot(replace) {
      var pathinfo = '/';
      replace ? this.replace(pathinfo) : this.push(pathinfo);
    }
  }]);
  return Router;
}();

exports.default = Router;


Router.PageError = PageError;
module.exports = exports['default'];
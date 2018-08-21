"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));

var _path = require("path");

/*
-1.lasy loader 
-2.page error
-3.no match
-4.navigator
-5.param,
-5.query
-6.page view
-7.embeds
8.block
9.goXXX
*/
var parsePathname = function parsePathname(pathname) {
  return ((pathname[1] === ':' ? '' : '/') + pathname).split(/(?<!^)\//).filter(function (v) {
    return v;
  });
};

var PageLoading = function PageLoading(props) {
  return _react.default.createElement("div", {
    style: {
      padding: 8
    }
  }, "loading...");
};

var PageError = function PageError(props) {
  var app = props.app,
      title = props.title,
      message = props.message;
  return _react.default.createElement("div", {
    style: {
      padding: 8
    }
  }, _react.default.createElement("div", null, " error: ", _react.default.createElement("a", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.back();
    }
  }, "[back]"), " ", _react.default.createElement("a", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.replaceRoot();
    }
  }, "[home]"), " "), _react.default.createElement("div", null, title), _react.default.createElement("hr", null), _react.default.createElement("p", null, message));
};

var RouterComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RouterComponent, _React$Component);

  function RouterComponent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RouterComponent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RouterComponent).call(this, props));
    _this.errorItem;
    _this.pageItems = [];
    _this.viewItems = [];
    return _this;
  }

  (0, _createClass2.default)(RouterComponent, [{
    key: "_handleRouterUpdate",
    value: function _handleRouterUpdate() {
      var app = this.props.app;
      var router = app.router;
      var history = router.history;

      var getPageByName = function getPageByName(pageName) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = pageItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;
            if (i.name === pageName) return i;

            if (i.embeds) {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = i.embeds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var ii = _step2.value;
                  if (ii.name === pageName) return i;
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
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };

      var getRoute = function getRoute(pathname) {
        var paths = pathname.split(':');
        var match = Object.entries(router.routes).find(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              k = _ref2[0],
              v = _ref2[1];

          return k.split(':')[0] === paths[0];
        });
        if (!match) return [];
        var items = match[0].split(':');
        var routeName = items[0];
        items = items.slice(1);
        paths = paths.slice(1);
        if (items.filter(function (v) {
          return !v.endsWith('?');
        }).length > paths.length) return [];
        items = items.map(function (v) {
          return v.endsWith('?') ? v.slice(0, -1) : v;
        });
        var route = match[1];
        var params = {};
        paths.forEach(function (path, i) {
          params[items[i] || i] = decodeURIComponent(path);
        });
        return {
          routeName: routeName,
          params: params,
          route: route
        };
      };

      var getError = function getError(pathname) {
        if (pathname.startsWith('/error')) {
          var paths = pathname.split(':');
          return {
            message: paths[1],
            title: paths[2],
            back: paths[3],
            data: paths.slice(4)
          };
        }
      }; // error


      this.errorItem = getError(history.location.pathname);

      if (this.errorItem || !router.routes || !Object.keys(router.routes).length) {
        this.pageItems = [];
        this.viewItems = [];
        this.forceUpdate();
        return;
      } // page


      var pageItems = [];
      var parentName = '';
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = parsePathname(history.location.pathname)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var v = _step3.value;

          var _getRoute = getRoute(v),
              routeName = _getRoute.routeName,
              params = _getRoute.params,
              route = _getRoute.route;

          if (!routeName) {
            app.render.panic('router nomatch', v);
            return;
          }

          var embeds = {};
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = (Array.isArray(route.embeds) ? route.embeds.map(function (v) {
              return [v, v];
            }) : Object.entries(route.embeds || {}))[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _step4$value = (0, _slicedToArray2.default)(_step4.value, 2),
                  kk = _step4$value[0],
                  vv = _step4$value[1];

              var _getRoute2 = getRoute(vv),
                  routeEmebed = _getRoute2.route;

              if (!routeEmebed) {
                app.render.panic('router nomatch', vv);
                return;
              }

              embeds[kk] = {
                name: '#' + (0, _path.join)(parentName, v) + '|' + vv,
                parentName: '#' + (0, _path.join)(parentName, v),
                route: routeEmebed,
                params: [],
                query: history.location.query,
                viewItems: [],
                embeds: {}
              };
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          pageItems.push({
            name: '#' + (0, _path.join)(parentName, routeName),
            parentName: '#' + parentName,
            route: route,
            params: params,
            query: history.location.query,
            viewItems: [],
            embeds: embeds
          });
          parentName = (0, _path.join)(parentName, v);
        } // view

      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var viewItems = [];

      var _arr = Object.entries(router.views || {});

      for (var _i = 0; _i < _arr.length; _i++) {
        var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
            id = _arr$_i[0],
            _arr$_i$ = _arr$_i[1],
            _arr$_i$$content = _arr$_i$.content,
            content = _arr$_i$$content === void 0 ? {} : _arr$_i$$content,
            _arr$_i$$options = _arr$_i$.options,
            options = _arr$_i$$options === void 0 ? {} : _arr$_i$$options;

        var item = {
          id: id,
          content: content,
          options: options
        };
        var pageName = options.$pageName;

        if (pageName) {
          var page = getPageByName(pageName);
          if (page) page.viewItems.push(item);
        } else {
          viewItems.push(item);
        }
      } // focus


      var focusView = viewItems.find(function (v) {
        return v.options.$isModal;
      });

      if (focusView) {
        focusView.options.$focus = true;
        router.focusName = focusView.id;
      }

      var activePage = pageItems.slice(-1)[0];

      if (activePage) {
        activePage.active = true;

        if (!focusView) {
          var pageFocusView = Array.from(activePage.viewItems).reverse().find(function (v) {
            return v.options.$isModal;
          });

          if (pageFocusView) {
            pageFocusView.options.$focus = true;
            router.focusName = pageFocusView.id;
          } else {
            activePage.focus = true;
            Object.values(activePage.embeds).forEach(function (v) {
              return v.active = true;
            });
            router.focusName = activePage.name;
          }
        }
      } // update


      this.pageItems = pageItems;
      this.viewItems = viewItems;
      return this.forceUpdate();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.eventOffRouterUpdate = this.props.app.event.on(this.props.app, 'onRouterUpdate', function () {
        return _this2._handleRouterUpdate();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.eventOffRouterUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var app = this.props.app;

      var renderPage = function renderPage(_ref3) {
        var name = _ref3.name,
            parentName = _ref3.parentName,
            route = _ref3.route,
            params = _ref3.params,
            query = _ref3.query,
            active = _ref3.active,
            focus = _ref3.focus,
            embed = _ref3.embed,
            viewItems = _ref3.viewItems,
            embeds = _ref3.embeds;
        Object.keys(embeds).forEach(function (v) {
          embeds[v] = renderPage(embeds[v]);
        });
        var props = {
          app: app,
          key: name,
          name: name,
          route: (0, _objectSpread2.default)({}, route, {
            parentName: parentName,
            params: params,
            query: query,
            active: active,
            focus: focus,
            embed: embed
          }),
          views: viewItems,
          embeds: embeds
        };

        if (route.loader) {
          route.loader(app).then(function (v) {
            Object.assign(route, v, {
              loader: null
            });

            _this3._handleRouterUpdate();
          });
          return _react.default.createElement(Router.PageLoading, {
            key: name
          });
        } else if (typeof route.component === 'function') {
          return _react.default.createElement(app.Page, (0, _extends2.default)({
            key: name
          }, props));
        } else {
          return _react.default.createElement(Router.PageError, {
            app: app,
            message: "wrong component"
          });
        }
      };

      return _react.default.createElement(_react.default.Fragment, null, this.errorItem ? _react.default.createElement(Router.PageError, (0, _extends2.default)({
        app: app
      }, this.errorItem)) : null, !this.errorItem && this.pageItems.map(function (v) {
        return renderPage(v);
      }), !this.errorItem && this.viewItems.map(function (_ref4) {
        var id = _ref4.id,
            Component = _ref4.content,
            _ref4$options = _ref4.options;
        _ref4$options = _ref4$options === void 0 ? {} : _ref4$options;
        var $pageName = _ref4$options.$pageName,
            $isContentComponent = _ref4$options.$isContentComponent,
            $id = _ref4$options.$id,
            $isModal = _ref4$options.$isModal,
            $isRef = _ref4$options.$isRef,
            $focus = _ref4$options.$focus,
            $onAdd = _ref4$options.$onAdd,
            $onRemove = _ref4$options.$onRemove,
            restOptions = (0, _objectWithoutProperties2.default)(_ref4$options, ["$pageName", "$isContentComponent", "$id", "$isModal", "$isRef", "$focus", "$onAdd", "$onRemove"]);
        var props = (0, _objectSpread2.default)({}, $isContentComponent ? {} : Component.porps, restOptions, {
          key: id
        });
        return $isContentComponent ? _react.default.createElement(Component, props) : (0, _typeof2.default)(Component) === 'object' && Component.type ? (0, _react.cloneElement)(Component, props) : Component;
      }));
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
    this._routes = {};
    this.views = {};
    this._pages = {};
    this._viewIdNum = 0;
    this._historyStackCount = 0;
    this.focusName;
    this.history = (0, _createHashHistory.default)();
    this.unlisten = this.history.listen(function (location, action) {
      app.log.info('router location', location);
      location.query = {};

      if (location.search) {
        location.search.slice(1).split('&').forEach(function (v) {
          var vs = v.split('=');
          location.query[vs[0]] = vs[1];
        });
      }

      if (action === 'PUSH') _this4._historyStackCount++;
      if (action === 'POP') _this4._historyStackCount = Math.max(--_this4._historyStackCount, 0);

      _this4.update();
    });
    this.app.event.on(this.app, 'onAppStartRender', function () {
      _this4.update();
    });
    this.app.event.on(this.app, 'onPageAdd', function (name, page) {
      page && !page.props.route.embed && _this4._addPage(name, page);
    });
    this.app.event.on(this.app, 'onPageRemove', function (name, page) {
      page && !page.props.route.embed && _this4._removePage(name);
    });
    this.app.event.on(this.app, 'onAppStartRouter', function () {
      return _this4.app.render.component = _react.default.createElement(Router.RouterComponent, {
        app: _this4.app
      });
    });
  }

  (0, _createClass2.default)(Router, [{
    key: "update",
    value: function update() {
      this.app.event.emit(this.app, 'onRouterUpdate');
    }
  }, {
    key: "_addPage",
    // pages
    // ---------------------------------------
    value: function _addPage(name, page) {
      this._pages[name] = page;
    }
  }, {
    key: "_removePage",
    value: function _removePage(name) {
      var _this5 = this;

      var page = this.getPage(name);

      if (page) {
        Object.entries(this.views).forEach(function (_ref5) {
          var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
              id = _ref6[0],
              $pageName = _ref6[1].options.$pageName;

          return $pageName === name && _this5.removeView(id);
        });
        delete this._pages[page.name];
      }
    }
  }, {
    key: "getPage",
    value: function getPage(name) {
      if (typeof name === 'string') {
        return this._pages[name];
      } else if (typeof name === 'number') {
        return this._pages[Object.keys(this._pages)[name]];
      } else if (name === undefined) {
        var keys = Object.keys(this._pages);
        return this._pages[keys[keys.length - 1]];
      }
    } // views 
    // ----------------------------------------

  }, {
    key: "getViewId",
    value: function getViewId() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return options.$id || "".concat(++this._viewIdNum, "@").concat(options.$pageName ? options.$pageName : '#');
    }
  }, {
    key: "addView",
    value: function addView(content) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!content) return;
      options.$id = this.getViewId(options);
      this.views[options.$id] = {
        content: content,
        options: options,
        $id: options.$id
      };
      options.$onAdd && options.$onAdd(options.$id);
      this.update();
      return options.$id;
    }
  }, {
    key: "removeView",
    value: function removeView($id) {
      var _this$getView = this.getView($id),
          _this$getView$options = _this$getView.options,
          options = _this$getView$options === void 0 ? {} : _this$getView$options;

      options.$onRemove && options.$onRemove(options.$id);
      delete this.views[$id];
      this.update();
    }
  }, {
    key: "getView",
    value: function getView($id) {
      return this.views[$id];
    } // router navigator
    // ----------------------------------------

  }, {
    key: "_getLocation",
    value: function _getLocation() {
      var passQuery;
      var query = {};
      var paths = parsePathname(this.history.location.pathname);

      var addPath = function addPath(path) {
        path.split('/').forEach(function (v) {
          if (v === '') {
            paths = ['/'];
          } else if (path === '..') {
            paths = paths.slice(0, -1);
          } else {
            paths.push(v);
          }
        });
      };

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (arg) {
        if (Array.isArray(arg)) {
          addPath(arg.map(function (v, i) {
            return i ? encodeURIComponent(v) : v;
          }).join(':'));
        } else if ((0, _typeof2.default)(arg) === 'object') {
          if (arg.query) query = (0, _objectSpread2.default)({}, query, arg.query);
          if (arg.passQuery !== undefined) passQuery = arg.passQuery;
        } else {
          addPath(String(arg));
        }
      }); //pathname, search, hash, key, state

      return {
        pathname: paths.map(function (v, i, a) {
          return i === 0 && v === '/' && a.length > 1 ? '' : v;
        }).join('/'),
        search: '?' + Object.entries(passQuery ? (0, _objectSpread2.default)({}, location.query, query) : query).map(function (_ref7) {
          var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
              k = _ref8[0],
              v = _ref8[1];

          return k + '=' + v;
        }).reduce(function (v1, v2) {
          return v1 + '&' + v2;
        }, '')
      };
    }
  }, {
    key: "restore",
    value: function restore(location) {
      app.log.info('router restore');
      location || this.location ? this.history.replace(location || this.location) : this.replaceRoot();
    }
  }, {
    key: "push",
    value: function push() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      app.log.info('router push', args);
      return this.history.push(this._getLocation.apply(this, args));
    }
  }, {
    key: "replace",
    value: function replace() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      app.log.info('router replace', args);
      return this.history.replace(this._getLocation.apply(this, args));
    }
  }, {
    key: "back",
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      app.log.info('router back');
      return this.history.go(-step);
    }
  }, {
    key: "pushRoot",
    value: function pushRoot() {
      this.push('/');
    }
  }, {
    key: "replaceRoot",
    value: function replaceRoot() {
      this.replace('/');
    }
  }, {
    key: "pushError",
    value: function pushError(message, title, back) {
      for (var _len4 = arguments.length, data = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
        data[_key4 - 3] = arguments[_key4];
      }

      this.push('/', ['error', message, title || '', back || ''].concat(data));
    }
  }, {
    key: "replaceError",
    value: function replaceError(message, title, back) {
      for (var _len5 = arguments.length, data = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
        data[_key5 - 3] = arguments[_key5];
      }

      this.replace('/', ['error', message, title || '', back || ''].concat(data));
    }
  }, {
    key: "routes",
    set: function set(routes) {
      this._routes = routes;
    },
    get: function get() {
      return this._routes;
    }
  }]);
  return Router;
}();

exports.default = Router;
Router.RouterComponent = RouterComponent;
Router.PageLoading = PageLoading;
Router.PageError = PageError;
module.exports = exports["default"];
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
  }, "[home]"), " "), _react.default.createElement("h3", null, title), _react.default.createElement("hr", null), _react.default.createElement("p", null, message));
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
    key: "_renderView",
    value: function _renderView(_ref) {
      var Component = _ref.content,
          props = _ref.props,
          _ref$options = _ref.options,
          _id = _ref$options._id,
          isContentComponent = _ref$options.isContentComponent;
      var aprops = (0, _objectSpread2.default)({}, isContentComponent ? {} : Component.porps, props, {
        key: _id
      });
      return isContentComponent ? _react.default.createElement(Component, aprops) : (0, _typeof2.default)(Component) === 'object' && Component.type ? (0, _react.cloneElement)(Component, aprops) : Component;
    }
  }, {
    key: "_renderPage",
    value: function _renderPage(_ref2) {
      var _this2 = this;

      var _id = _ref2._id,
          _idParent = _ref2._idParent,
          routeName = _ref2.routeName,
          routePattern = _ref2.routePattern,
          route = _ref2.route,
          params = _ref2.params,
          query = _ref2.query,
          active = _ref2.active,
          focus = _ref2.focus,
          embed = _ref2.embed,
          viewItems = _ref2.viewItems,
          embeds = _ref2.embeds;
      Object.keys(embeds).forEach(function (v) {
        embeds[v] = _this2._renderPage(embeds[v]);
      });
      var props = {
        app: app,
        key: _id,
        _id: _id,
        route: (0, _objectSpread2.default)({}, route, {
          routeName: routeName,
          routePattern: routePattern,
          _idParent: _idParent,
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

          _this2._handleRouterUpdate();
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
          message: "wrong component"
        });
      }
    }
  }, {
    key: "_getPathnameRouteInfo",
    value: function _getPathnameRouteInfo(pathname, routes) {
      var paths = pathname.split(':');
      var match = Object.entries(routes).find(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return k.split(':')[0] === paths[0];
      });
      if (!match) return [];
      var items = match[0].split(':');
      var routeName = items[0];
      var routePattern = match;
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
        routePattern: routePattern,
        params: params,
        route: route
      };
    }
  }, {
    key: "_getPathnameErrorInfo",
    value: function _getPathnameErrorInfo(pathname) {
      if (pathname.startsWith('/error')) {
        var paths = pathname.split(':');
        return {
          message: decodeURIComponent(paths[1]),
          title: decodeURIComponent(paths[2]),
          back: decodeURIComponent(paths[3]),
          data: decodeURIComponent(paths.slice(4))
        };
      }
    }
  }, {
    key: "_update",
    value: function _update() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          errorItem = _ref5.errorItem,
          _ref5$pageItems = _ref5.pageItems,
          pageItems = _ref5$pageItems === void 0 ? [] : _ref5$pageItems,
          _ref5$viewItems = _ref5.viewItems,
          viewItems = _ref5$viewItems === void 0 ? [] : _ref5$viewItems;

      var focusId = undefined;
      var focusViewItem = Array.from(viewItems).reverse().find(function (v) {
        return v.options.isModal;
      });
      var activePageItem = pageItems.slice(-1)[0];
      if (focusViewItem) focusId = focusViewItem.options._id;

      if (activePageItem) {
        activePageItem.active = true;
        Object.values(activePageItem.embeds).forEach(function (v) {
          return v.active = true;
        });
      }

      if (activePageItem && !focusId) {
        var pageFocusViewItem = Array.from(activePageItem.viewItems).reverse().find(function (v) {
          return v.options.isModal;
        });

        if (pageFocusViewItem) {
          focusId = pageFocusViewItem.options.id;
        } else {
          activePageItem.focus = true;
          focusId = activePageItem._id;
        }
      }

      this.props.app.router.setFocusId(focusId);
      this.setState({
        errorItem: errorItem,
        pageItems: pageItems,
        viewItems: viewItems
      });
    }
  }, {
    key: "_handleRouterUpdate",
    value: function _handleRouterUpdate() {
      var app = this.props.app;
      var router = app.router;
      var history = router.history; // error

      var errorItem = this._getPathnameErrorInfo(history.location.pathname);

      if (errorItem || !Object.keys(router.getRoutes()).length) return this.setState({
        errorItem: errorItem
      }); // page

      var pathname = '';
      var pageItems = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = history.location.pathnames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          var _this$_getPathnameRou = this._getPathnameRouteInfo(v, router.getRoutes()),
              routeName = _this$_getPathnameRou.routeName,
              routePattern = _this$_getPathnameRou.routePattern,
              params = _this$_getPathnameRou.params,
              route = _this$_getPathnameRou.route;

          if (!routeName) {
            app.render.panic(v, {
              title: 'router nomatch'
            });
            return;
          }

          var _id = '#' + (0, _path.join)(pathname, routeName);

          var _idParent = '#' + pathname;

          var embeds = {};
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (Array.isArray(route.embeds) ? route.embeds.map(function (v) {
              return [v, v];
            }) : Object.entries(route.embeds || {}))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = (0, _slicedToArray2.default)(_step2.value, 2),
                  kk = _step2$value[0],
                  vv = _step2$value[1];

              var _this$_getPathnameRou2 = this._getPathnameRouteInfo(vv, router.getRoutes()),
                  routeEmebed = _this$_getPathnameRou2.route;

              if (!routeEmebed) {
                app.render.panic('router nomatch', vv);
                return;
              }

              var _idEmbed = _id + '|' + vv;

              var _idParentEmbed = _id;
              embeds[kk] = {
                _id: _idEmbed,
                _idParent: _idParentEmbed,
                route: routeEmebed,
                params: {},
                query: history.location.query,
                viewItems: router.getPageViews(_idEmbed).map(function (vvv) {
                  return (0, _objectSpread2.default)({}, vvv);
                }),
                embeds: {}
              };
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

          pageItems.push({
            _id: _id,
            _idParent: _idParent,
            routeName: routeName,
            routePattern: routePattern,
            route: route,
            params: params,
            query: history.location.query,
            viewItems: router.getPageViews(_id).map(function (vv) {
              return (0, _objectSpread2.default)({}, vv);
            }),
            embeds: embeds
          });
          pathname = (0, _path.join)(pathname, v);
        } // top view

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

      var viewItems = router.getNoPageViews().map(function (v) {
        return (0, _objectSpread2.default)({}, v);
      }); // update

      return this._update({
        pageItems: pageItems,
        viewItems: viewItems
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.eventOffRouterUpdate = this.props.app.event.on(this.props.app._id, 'onRouterUpdate', function () {
        return _this3._handleRouterUpdate();
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
      var _this4 = this;

      var _ref6 = this.state || {},
          errorItem = _ref6.errorItem,
          _ref6$pageItems = _ref6.pageItems,
          pageItems = _ref6$pageItems === void 0 ? [] : _ref6$pageItems,
          _ref6$viewItems = _ref6.viewItems,
          viewItems = _ref6$viewItems === void 0 ? [] : _ref6$viewItems;

      return _react.default.createElement(_react.default.Fragment, null, errorItem && _react.default.createElement(Router.PageError, (0, _extends2.default)({
        app: this.props.app
      }, errorItem)), !errorItem && pageItems.map(function (v) {
        return _this4._renderPage(v);
      }), !errorItem && viewItems.map(function (v) {
        return _this4._renderView(v);
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
    (0, _classCallCheck2.default)(this, Router);
    this.app = app;
    this._routes = {};
    this._views = [];
    this._pages = {};
    this._viewIdNum = 0;
    this._historyStackCount = 0;
    this._focusId;

    this._initEvent();

    this._initHistory();

    this._initRoute();
  }

  (0, _createClass2.default)(Router, [{
    key: "_initEvent",
    value: function _initEvent() {
      var _this5 = this;

      this.app.event.on(this.app._id, 'onPageAdd', function (_id, page) {
        page && !page.props.route.embed && _this5._addPage(_id, page);
      });
      this.app.event.on(this.app._id, 'onPageRemove', function (_id, page) {
        page && !page.props.route.embed && _this5._removePage(_id);
      });
      this.app.event.on(this.app._id, 'onAppStartRouter', function () {
        return _this5.app.render.component = _react.default.createElement(Router.RouterComponent, {
          app: _this5.app
        });
      });
      this.app.event.on(this.app._id, 'onAppStartRender', function () {
        _this5.update();
      });
    }
  }, {
    key: "_initHistory",
    value: function _initHistory() {
      var _this6 = this;

      var handleLocationChange = function handleLocationChange(location, action) {
        _this6.app.log.info('router location', location);

        location.query = {};
        location.search && location.search.slice(1).split('&').forEach(function (v) {
          var vs = v.split('=');
          location.query[vs[0]] = vs[1];
        });
        var pathname = location.pathname;
        if (pathname[0] === '/') pathname = (pathname[1] === ':' ? '#' : '#/') + pathname.slice(1);
        location.pathnames = pathname.split('/').filter(function (v) {
          return v;
        });
        location.pathnames[0] && location.pathnames[0][0] === '#' && (location.pathnames[0] = '/' + location.pathnames[0].slice(1));
        if (action === 'PUSH') _this6._historyStackCount++;
        if (action === 'POP') _this6._historyStackCount = Math.max(--_this6._historyStackCount, 0);

        _this6.update();
      };

      this.history = (0, _createHashHistory.default)();
      this.history.listen(function (location, action) {
        return handleLocationChange(location, action);
      });
      handleLocationChange(this.history.location, this.history.action);
    }
  }, {
    key: "_initRoute",
    value: function _initRoute() {
      this._genRouteMethod('/');

      this._genRouteMethod('/error');
    } // route
    // --------------------------------------

  }, {
    key: "setRoutes",
    value: function setRoutes(routes) {
      var _this7 = this;

      this._routes = routes;
      Object.keys(routes || {}).forEach(function (v) {
        return v && _this7._genRouteMethod(v.split(':')[0]);
      });
      this.update();
    }
  }, {
    key: "getRoutes",
    value: function getRoutes() {
      return this._routes || {};
    }
  }, {
    key: "addRoute",
    value: function addRoute(name, route) {
      if (!name || !route) return;
      this._routes[name] = route;

      this._genRouteMethod(name.split(':')[0]);

      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      this.app.event.emit(this.app._id, 'onRouterUpdate');
    }
  }, {
    key: "_genRouteMethod",
    value: function _genRouteMethod(path) {
      var _this8 = this;

      if (!path) return;
      var name = path === '/' ? 'Root' : this.app.utils.captilaze(path[0] === '/' ? path.slice(1) : path);

      this['push' + name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this8.push([path].concat(args));
      };

      this['replace' + name] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this8.replace([path].concat(args));
      };
    } // focus
    // ---------------------------------------

  }, {
    key: "setFocusId",
    value: function setFocusId(_id) {
      this.app.log.info('router focus', _id);
      this._focusId = _id;
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

      this.update();
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

      this.update();
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
      return this._views.filter(function (_ref7) {
        var options = _ref7.options;
        return !options._idPage;
      });
    }
  }, {
    key: "getPageViews",
    value: function getPageViews(_id) {
      return this._views.filter(function (_ref8) {
        var options = _ref8.options;
        return options._idPage === _id;
      });
    }
  }, {
    key: "removePageViews",
    value: function removePageViews(_id) {
      var _this9 = this;

      this.getPageViews(_id).forEach(function (v) {
        return _this9.removeView(v._id);
      });
    } // router navigator
    // ----------------------------------------

  }, {
    key: "_getLocation",
    value: function _getLocation() {
      var passQuery;
      var query = {};
      var pathnames = Array.from(this.history.location.pathnames);

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
          if (arg.query) query = (0, _objectSpread2.default)({}, query, arg.query);
          if (arg.passQuery !== undefined) passQuery = arg.passQuery;
        } else {
          addPath(String(arg));
        }
      }); //pathname, search, hash, key, state

      return {
        pathname: pathnames.map(function (v, i, a) {
          return i === 0 && v === '/' && a.length > 1 ? '' : v;
        }).join('/'),
        search: '?' + Object.entries(passQuery ? (0, _objectSpread2.default)({}, location.query, query) : query).map(function (_ref9) {
          var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
              k = _ref10[0],
              v = _ref10[1];

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
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      app.log.info('router push', args);
      return this.history.push(this._getLocation.apply(this, args));
    }
  }, {
    key: "replace",
    value: function replace() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
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
  }]);
  return Router;
}();

exports.default = Router;
Router.RouterComponent = RouterComponent;
Router.PageLoading = PageLoading;
Router.PageError = PageError;
module.exports = exports["default"];
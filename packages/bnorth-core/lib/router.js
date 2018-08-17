"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
4.navigator
5.param,query
6.page view
7.embeds
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
      return app.router.goRoot();
    }
  }, "[home]"), " "), _react.default.createElement("div", null, title), _react.default.createElement("hr", null), _react.default.createElement("p", null, msg));
};

var RouterComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RouterComponent, _React$Component);

  function RouterComponent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RouterComponent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RouterComponent).call(this, props));
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
      var pageItems = [];
      var viewItems = [];
      var parentName = '';

      var getPageByName = function getPageByName(pageName) {
        for (var _i = 0; _i < pageItems.length; _i++) {
          var i = pageItems[_i];
          if (i.name === pageName) return i;

          if (i.embeds) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = i.embeds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var ii = _step.value;
                if (ii.name === pageName) return i;
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
          params[items[i] || i] = encodeURIComponent(path);
        });
        return {
          routeName: routeName,
          params: params,
          route: route
        };
      }; // page


      ((history.location.pathname[1] === ':' ? '' : '/') + history.location.pathname).split(/(?<!^)\//).filter(function (v) {
        return v;
      }).forEach(function (v) {
        var _getRoute = getRoute(v),
            routeName = _getRoute.routeName,
            params = _getRoute.params,
            route = _getRoute.route;

        if (!routeName) {
          app.render.panic('router nomatch', v);
          return;
        }

        var embeds = [];
        (route.embeds || []).forEach(function (vv) {
          if (!router.routes[vv]) {
            app.render.panic('router nomatch', vv);
            return;
          }

          embeds.push({
            name: '#' + (0, _path.join)(parentName, v) + '|' + vv,
            parentName: '#' + (0, _path.join)(parentName, v),
            route: router.routes[vv],
            params: [],
            active: true,
            embed: embed,
            views: []
          });
        });
        pageItems.push({
          name: '#' + (0, _path.join)(parentName, routeName),
          parentName: '#' + parentName,
          route: route,
          params: params,
          viewItems: [],
          embeds: embeds
        });
        parentName = (0, _path.join)(parentName, v);
      }); // view

      Object.entries(router.views || {}).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            id = _ref4[0],
            _ref4$ = _ref4[1],
            _ref4$$content = _ref4$.content,
            content = _ref4$$content === void 0 ? {} : _ref4$$content,
            _ref4$$options = _ref4$.options,
            options = _ref4$$options === void 0 ? {} : _ref4$$options;

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
      }); // focus

      var focusView = viewItems.find(function (v) {
        return v.options.$isModal;
      });
      if (focusView) focusView.options.$focus = true;
      var activePage = pageItems.slice(-1)[0];

      if (activePage) {
        activePage.active = true;

        if (!focusView) {
          var pageFocusView = Array.from(activePage.viewItems).reverse().find(function (v) {
            return v.options.$isModal;
          });

          if (pageFocusView) {
            pageFocusView.options.$focus = true;
          } else {
            activePage.focus = true;
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
      return _react.default.createElement(_react.default.Fragment, null, this.pageItems.map(function (_ref5) {
        var name = _ref5.name,
            parentName = _ref5.parentName,
            route = _ref5.route,
            params = _ref5.params,
            active = _ref5.active,
            focus = _ref5.focus,
            embed = _ref5.embed,
            viewItems = _ref5.viewItems,
            embeds = _ref5.embeds;
        var props = {
          app: app,
          key: name,
          name: name,
          route: (0, _objectSpread3.default)({}, route, {
            parentName: parentName,
            params: params,
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
            message: "wrong component"
          });
        }
      }), this.viewItems.map(function (_ref6) {
        var _objectSpread2;

        var id = _ref6.id,
            Component = _ref6.content,
            _ref6$options = _ref6.options;
        _ref6$options = _ref6$options === void 0 ? {} : _ref6$options;
        var $pageName = _ref6$options.$pageName,
            $isContentComponent = _ref6$options.$isContentComponent,
            $isModal = _ref6$options.$isModal,
            $isRef = _ref6$options.$isRef,
            $focus = _ref6$options.$focus,
            restOptions = (0, _objectWithoutProperties2.default)(_ref6$options, ["$pageName", "$isContentComponent", "$isModal", "$isRef", "$focus"]);
        var props = (0, _objectSpread3.default)({}, $isContentComponent ? {} : Component.porps, restOptions, (_objectSpread2 = {
          key: id
        }, (0, _defineProperty2.default)(_objectSpread2, 'data-app', app), (0, _defineProperty2.default)(_objectSpread2, 'data-view-$id', id), (0, _defineProperty2.default)(_objectSpread2, 'data-$pageName', $pageName), _objectSpread2));
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
    this._historyStackCount = 0, this.history = (0, _createHashHistory.default)();
    this.unlisten = this.history.listen(function (location, action) {
      app.log.info('router location', location);
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
        Object.entries(this.views).forEach(function (_ref7) {
          var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
              id = _ref8[0],
              $pageName = _ref8[1].options.$pageName;

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
    key: "addView",
    value: function addView(content) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!content) return;
      options.$id = options.$id || "".concat(++this._viewIdNum, "@").concat(options.$pageName ? options.$pageName : '#');
      this.views[options.$id] = {
        content: content,
        options: options,
        $id: options.$id
      };
      this.update();
      return options.$id;
    }
  }, {
    key: "removeView",
    value: function removeView($id) {
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
    value: function _pathinfoTrans(_ref9) {
      var _ref10 = (0, _slicedToArray2.default)(_ref9, 4),
          pathinfo = _ref10[0],
          pathnames = _ref10[1],
          query = _ref10[2],
          hash = _ref10[3];

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

      var search = pathinfo.pathname || Object.entries(query).map(function (_ref11) {
        var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
            k = _ref12[0],
            v = _ref12[1];

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
  }, {
    key: "routes",
    set: function set(routes) {
      var _this6 = this;

      this._routes = (0, _objectSpread3.default)({}, {
        'err': {
          name: 'err',
          component: Router.PageError
        }
      }, routes);

      this["goErr"] = function (msg, title, options) {
        return _this6.push('/err', app.utils.message2String(msg), app.utils.message2String(title));
      };
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
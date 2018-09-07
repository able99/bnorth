"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

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
  }, _react.default.createElement("div", null, _react.default.createElement("span", null, "error"), _react.default.createElement("a", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.back();
    }
  }, "[back]"), _react.default.createElement("a", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.replaceRoot();
    }
  }, "[home]")), _react.default.createElement("h3", null, data.errorRoute ? data.errorRoute : data.params[1]), _react.default.createElement("hr", null), _react.default.createElement("p", null, data.errorRoute ? data.name : data.params[0]));
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
          embed = _ref.embed,
          viewItems = _ref.viewItems,
          embeds = _ref.embeds,
          routeName = _ref.routeName,
          route = _ref.route;
      var embedsPage = {};
      Object.entries(embeds).map(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
            k = _ref3[0],
            v = _ref3[1];

        return embedsPage[k] = _this2._renderPage(v, activeId, focusId);
      });
      var props = {
        app: this.props.app,
        key: _id,
        _id: _id,
        route: (0, _objectSpread2.default)({}, route, {
          routeName: routeName,
          _idParent: _idParent,
          params: paramObj,
          query: query,
          active: embed ? _idParent === activeId : _id === activeId,
          focus: focus,
          embed: embed
        }),
        views: viewItems,
        embeds: embedsPage
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
    this._errorInfo;
    this._activeId;
    this._focusId;
    this._viewIdNum = 0;
    this._historyStackCount = 0;
    this.app.event.on(this.app._id, 'onPageAdd', function (_id, page) {
      page && !page.props.route.embed && _this4._addPage(_id, page);
    }, this._id);
    this.app.event.on(this.app._id, 'onPageRemove', function (_id, page) {
      page && !page.props.route.embed && _this4._removePage(_id);
    }, this._id);
    this.app.event.on(this.app._id, 'onAppStartRouter', function () {
      return _this4.app.render.component = _react.default.createElement(Router.RouterComponent, {
        app: _this4.app
      });
    }, this._id);
    this.app.event.on(this.app._id, 'onAppStartRender', function () {
      _this4.update();
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
    key: "update",
    value: function update() {
      this.app.event.emit(this.app._id, 'onRouterUpdate');
    } // route
    // --------------------------------------

  }, {
    key: "_initHistory",
    value: function _initHistory() {
      var _this5 = this;

      var handleLocationChange = function handleLocationChange(location, action) {
        _this5.app.log.info('router location', location);

        _this5._updateQuerys(location);

        _this5._updatePathInfos(location);

        _this5._updateStack(location);

        _this5.update();
      };

      this.history = (0, _createHashHistory.default)();
      this.history.listen(function (location, action) {
        return handleLocationChange(location, action);
      });
      handleLocationChange(this.history.location, this.history.action);
    }
  }, {
    key: "_updateStack",
    value: function _updateStack(location) {
      if (location.action === 'PUSH') this._historyStackCount++;
      if (location.action === 'POP') this._historyStackCount = Math.max(--this._historyStackCount, 0);
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
    value: function _updatePathInfos(location) {
      var _this6 = this;

      if (!Object.keys(this.getRoutes()).length) return;
      var pathname = location.pathname;
      var spe = '/';
      var paramSpe = ':';
      var subPageSpe = '|';
      var paramOptional = '?';
      var errorTag = '/error';
      var pageSign = '#';
      var pos = 0;
      var pathinfos = [];
      var errorInfo = null;
      var focusId = undefined;
      var activeId = undefined;
      /* pathname parse*/

      while (pos < pathname.length - 1) {
        var index = pathname.indexOf(spe, pos + 1);
        index = index >= 0 ? index : pathname.length;
        var sub = pathname.slice(pos + 1, index);

        if (pos === 0 && (sub[0] === paramSpe || (spe + sub).startsWith(errorTag) || this.getRoute(spe + sub.split(paramSpe)[0]))) {
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

      var fullPath = '';
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
          paramObj: {},
          query: location.query,
          viewInfos: _this6.getPageViews(_id)
        };
        fullPath = ret.fullPath;

        var _this6$getRoute = _this6.getRoute(ret.name),
            _this6$getRoute2 = (0, _slicedToArray2.default)(_this6$getRoute, 2),
            routeName = _this6$getRoute2[0],
            route = _this6$getRoute2[1];

        if (ret.name === errorTag) {
          ret.errorPage = true;
          !errorInfo && (errorInfo = ret);
          return;
        } else {
          ret.routeName = routeName;
          ret.route = route;

          if (!ret.routeName || !ret.route) {
            ret.errorRoute = 'no route';
            !errorInfo && (errorInfo = ret);
            return ret;
          }
        }

        (Array.isArray(route.embeds) ? route.embeds.map(function (vv) {
          return [vv, vv];
        }) : Object.entries(route.embeds || {})).map(function (_ref5) {
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
            viewInfos: _this6.getPageViews(_idEmbed)
          };

          var _this6$getRoute3 = _this6.getRoute(retEmbed.name),
              _this6$getRoute4 = (0, _slicedToArray2.default)(_this6$getRoute3, 2),
              routeNameEmbed = _this6$getRoute4[0],
              routeEmbed = _this6$getRoute4[1];

          retEmbed.routeName = routeNameEmbed;
          retEmbed.route = routeEmbed;

          if (!retEmbed.routeName || !retEmbed.route) {
            retEmbed.errorRoute = 'no route';
            !errorInfo && (errorInfo = ret);
          }

          ret.embeds[kk] = retEmbed;
        });
        var routeParams = routeName.split(paramSpe).slice(1);

        if (routeParams.filter(function (vv) {
          return !vv.endsWith(paramOptional);
        }).length > ret.params.length) {
          ret.errorRoute = 'miss require param';
          !errorInfo && (errorInfo = ret);
        } else {
          ret.params.forEach(function (vv, ii) {
            var name = routeParams[ii] ? routeParams[ii].endsWith(paramOptional) ? routeParams[ii].slice(0, -1) : routeParams[ii] : ii;
            ret.paramObj[name] = decodeURIComponent(vv);
          });
        }

        return ret;
      });
      /* active & focus */

      var viewItems = this.getNoPageViews();
      var focusViewItem = Array.from(viewItems).reverse().find(function (v) {
        return v.options.isModal;
      });
      var activePageItem = pathinfos.slice(-1)[0];
      if (focusViewItem) focusId = focusViewItem.options._id;
      if (activePageItem) activeId = activePageItem._id;

      if (activePageItem && !focusId) {
        var pageFocusViewItem = activePageItem.viewItems && Array.from(activePageItem.viewItems).reverse().find(function (v) {
          return v.options.isModal;
        });

        if (pageFocusViewItem) {
          focusId = pageFocusViewItem.options.id;
        }
      }

      this._focusId = focusId;
      this._activeId = activeId;
      this._pathinfos = pathinfos;
      this._errorInfo = errorInfo;
    }
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

      this.update();
    }
  }, {
    key: "getRoutes",
    value: function getRoutes() {
      return this._routes || {};
    }
  }, {
    key: "getRoute",
    value: function getRoute(name) {
      return Object.entries(this._routes).find(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        return k.split(':')[0] === name;
      }) || [];
    }
  }, {
    key: "addRoute",
    value: function addRoute(name, route) {
      if (!name || !route) return;
      this._routes[name] = route;

      this._genRouteMethod(name.split(':')[0]);

      this._updatePathInfos(this.history.location);

      this.update();
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
        return _this9.removeView(v._id);
      });
    } // router navigator
    // ----------------------------------------

  }, {
    key: "_getLocation",
    value: function _getLocation() {
      var passQuery;
      var query = {};

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
        search: '?' + Object.entries(passQuery ? (0, _objectSpread2.default)({}, location.query, query) : query).map(function (_ref11) {
          var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
              k = _ref12[0],
              v = _ref12[1];

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
  }, {
    key: "refresh",
    value: function refresh() {
      this._updatePathInfos(this.history.location);

      this.update();
    }
  }]);
  return Router;
}();

exports.default = Router;
Router.RouterComponent = RouterComponent;
Router.PageLoading = PageLoading;
Router.PageError = PageError;
module.exports = exports["default"];
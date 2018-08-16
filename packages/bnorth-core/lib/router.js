"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));

var _path = require("path");

var RouterComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RouterComponent, _React$Component);

  function RouterComponent() {
    (0, _classCallCheck2.default)(this, RouterComponent);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RouterComponent).apply(this, arguments));
  }

  (0, _createClass2.default)(RouterComponent, [{
    key: "_handleRouterUpdate",
    value: function _handleRouterUpdate() {
      console.log('_handleRouterUpdate');
      var app = this.props.app;
      var router = app.router;
      var history = router.history;
      var routes = router.routes;
      var pathname = history.location.pathname;
      var pathRoutes = [];
      var pages = [];
      var Page = app.Page;
      var View = app.View;
      var views = [];
      var parentName = ''; // view
      // -----------

      Object.entries(router.views || {}).forEach(function (_ref, i, a) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            _ref2$ = _ref2[1],
            content = _ref2$.content,
            _ref2$$options = _ref2$.options,
            options = _ref2$$options === void 0 ? {} : _ref2$$options;

        var last = i >= a.length - 1;

        var view = _react.default.createElement(View, (0, _extends2.default)({}, options, {
          app: app,
          key: k
        }), content);

        views.push(view);
      }); // page
      // -----------

      ['/'].concat((0, _toConsumableArray2.default)(pathname.split('/').filter(function (v) {
        return v;
      }))).forEach(function (v) {
        if (v.startsWith('$')) {
          var pathRoute = pathRoutes[pathRoutes.length - 1];
          if (pathRoute && pathRoute.params) pathRoute.params.push(v.slice(1));
        } else {
          pathRoutes.push({
            name: v,
            params: []
          });
        }
      });
      pathRoutes.forEach(function (v, i, a) {
        var route = routes[v.name];

        if (!route) {
          return;
        }

        var last = i >= a.length - 1;
        var key = (0, _path.join)(parentName, v.name);
        var pname = '#' + key;
        parentName = key;
        var ppathname = v;
        var views = []; //this.renderViews(key);

        var embeds = [];

        var page = _react.default.createElement(Page, {
          name: pname,
          route: route,
          active: last,
          match: {
            active: last
          },
          views: views,
          app: app,
          key: pname
        }, embeds);

        pages.push(page);
      });
      this.views = views;
      this.pages = pages;
      this.forceUpdate();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.eventOffRouterUpdate = this.props.app.event.on(this.props.app, 'onRouterUpdate', function () {
        return _this._handleRouterUpdate();
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
      return _react.default.createElement(_react.default.Fragment, null, this.pages, this.views);
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
    var _this2 = this;

    (0, _classCallCheck2.default)(this, Router);
    this.app = app;
    this.routes = {};
    this.views = {};
    this._pages = {};
    this._views = {};
    this._viewRefNum = 0;
    this._historyStackCount = 0, this.history = (0, _createHashHistory.default)();
    this.unlisten = this.history.listen(function (location, action) {
      app.log.info('router location', location);
      if (action === 'PUSH') _this2._historyStackCount++;
      if (action === 'POP') _this2._historyStackCount = Math.max(--_this2._historyStackCount, 0);

      _this2.update();
    });
    this.app.event.on(this.app, 'onAppStartRender', function () {
      _this2.update();
    });
    this.app.event.on(this.app, 'onPageAdd', function (name, page) {
      return page && !page.props.embed && _this2._addPage(name, page);
    });
    this.app.event.on(this.app, 'onPageRemove', function (name, page) {
      return page && !page.props.embed && _this2._removePage(name);
    });
    this.app.event.on(this.app, 'onAppStartRouter', function () {
      return _this2.app.render.component = _react.default.createElement(RouterComponent, {
        app: _this2.app
      });
    });
  }

  (0, _createClass2.default)(Router, [{
    key: "update",
    value: function update() {
      this.app.event.emit(this.app, 'onRouterUpdate');
    } // pages
    // ---------------------------------------

  }, {
    key: "_addPage",
    value: function _addPage(name, page) {
      this._pages[name] = page;
    }
  }, {
    key: "_removePage",
    value: function _removePage(name) {
      var page = this.getPage(name);

      if (page) {
        this.removePageViews(page.name);
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
      var page = options.page,
          ref = options.$ref;
      ref = ref || "".concat(++this._viewRefNum, "@").concat(page ? page.name : '#');
      options.$ref = ref;
      this.views[ref] = {
        content: content,
        options: options
      };
      this.update();
      return ref;
    }
  }, {
    key: "removeView",
    value: function removeView(ref) {
      delete this.views[ref];
      this.update();
    }
  }, {
    key: "getView",
    value: function getView(ref) {
      return this.views[ref];
      this.update();
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
          if (v.query) query = (0, _objectSpread2.default)({}, query, v.query);
          if (v.hash) hash = (0, _toConsumableArray2.default)(hash).concat((0, _toConsumableArray2.default)(v.hash));
          pathinfo = (0, _objectSpread2.default)({}, pathinfo, {
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
    value: function _pathinfoTrans(_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 4),
          pathinfo = _ref4[0],
          pathnames = _ref4[1],
          query = _ref4[2],
          hash = _ref4[3];

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

      var search = pathinfo.pathname || Object.entries(query).map(function (_ref5) {
        var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

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
module.exports = exports["default"];
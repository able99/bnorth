"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));

var _path = require("path");

/*
1.lasy loader 
2.page error
3.no match
4.navigator
*/
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

      function getPageByName(pageName, items) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
      } // page


      ['/'].concat((0, _toConsumableArray2.default)(history.location.pathname.split('/').filter(function (v) {
        return v;
      }))).forEach(function (v) {
        if (v.startsWith('$')) {
          var item = pageItems.slice(-1)[0];
          if (item) item.params.push(decodeURIComponent(v.slice(1)));
        } else {
          if (!router.routes[v]) {
            return;
          }

          var embeds = [];
          (router.routes[v].embeds || []).forEach(function (vv) {
            if (!router.routes[vv]) {
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
            name: '#' + (0, _path.join)(parentName, v),
            parentName: '#' + parentName,
            route: router.routes[v],
            params: [],
            viewItems: [],
            embeds: embeds
          });
          parentName = (0, _path.join)(parentName, v);
        }
      }); // view

      Object.entries(router.views || {}).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            id = _ref2[0],
            _ref2$ = _ref2[1],
            _ref2$$content = _ref2$.content,
            content = _ref2$$content === void 0 ? {} : _ref2$$content,
            _ref2$$options = _ref2$.options,
            options = _ref2$$options === void 0 ? {} : _ref2$$options;

        var item = {
          id: id,
          content: content,
          options: options
        };
        var pageName = options.$pageName;

        if (pageName) {
          var page = getPageByName(pageName, pageItems);
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
      var app = this.props.app;
      return _react.default.createElement(_react.default.Fragment, null, this.pageItems.map(function (_ref3) {
        var name = _ref3.name,
            parentName = _ref3.parentName,
            route = _ref3.route,
            params = _ref3.params,
            active = _ref3.active,
            focus = _ref3.focus,
            embed = _ref3.embed,
            viewItems = _ref3.viewItems,
            embeds = _ref3.embeds;
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
        return _react.default.createElement(app.Page, props);
      }), this.viewItems.map(function (_ref4) {
        var _objectSpread2;

        var id = _ref4.id,
            Component = _ref4.content,
            _ref4$options = _ref4.options;
        _ref4$options = _ref4$options === void 0 ? {} : _ref4$options;
        var $pageName = _ref4$options.$pageName,
            $isContentComponent = _ref4$options.$isContentComponent,
            $isModal = _ref4$options.$isModal,
            $isRef = _ref4$options.$isRef,
            $focus = _ref4$options.$focus,
            restOptions = (0, _objectWithoutProperties2.default)(_ref4$options, ["$pageName", "$isContentComponent", "$isModal", "$isRef", "$focus"]);
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
    var _this3 = this;

    (0, _classCallCheck2.default)(this, Router);
    this.app = app;
    this.routes = {};
    this.views = {};
    this._pages = {};
    this._viewIdNum = 0;
    this._historyStackCount = 0, this.history = (0, _createHashHistory.default)();
    this.unlisten = this.history.listen(function (location, action) {
      app.log.info('router location', location);
      if (action === 'PUSH') _this3._historyStackCount++;
      if (action === 'POP') _this3._historyStackCount = Math.max(--_this3._historyStackCount, 0);

      _this3.update();
    });
    this.app.event.on(this.app, 'onAppStartRender', function () {
      _this3.update();
    });
    this.app.event.on(this.app, 'onPageAdd', function (name, page) {
      page && !page.props.route.embed && _this3._addPage(name, page);
    });
    this.app.event.on(this.app, 'onPageRemove', function (name, page) {
      page && !page.props.route.embed && _this3._removePage(name);
    });
    this.app.event.on(this.app, 'onAppStartRouter', function () {
      return _this3.app.render.component = _react.default.createElement(RouterComponent, {
        app: _this3.app
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
      var _this4 = this;

      var page = this.getPage(name);

      if (page) {
        Object.entries(this.views).forEach(function (_ref5) {
          var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
              id = _ref6[0],
              $pageName = _ref6[1].options.$pageName;

          return $pageName === name && _this4.removeView(id);
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
    value: function _pathinfoTrans(_ref7) {
      var _ref8 = (0, _slicedToArray2.default)(_ref7, 4),
          pathinfo = _ref8[0],
          pathnames = _ref8[1],
          query = _ref8[2],
          hash = _ref8[3];

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

      var search = pathinfo.pathname || Object.entries(query).map(function (_ref9) {
        var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
            k = _ref10[0],
            v = _ref10[1];

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
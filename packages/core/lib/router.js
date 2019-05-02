"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.find-index");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es6.string.ends-with");

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.object.keys");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.object.assign");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));

var _path = require("path");

var _routerLoading = _interopRequireDefault(require("./router.loading.js"));

var _routerError = _interopRequireDefault(require("./router.error.js"));

/**
 * @module
 */
var spe = '/';
var ParamSpe = ':';
var SubPageSpe = '|';
var ParamOptional = '?';
var PageSign = '#';
/**
 * 路由声明对象
 * @typedef RouteDefine
 * @type {object}
 * @property {!component} component - 页面的 component
 * @property {module:page~PageControllerDefine?} controller - 页面的 controller
 * @property {(object|string[])?} subPageInfos - 嵌套的子页面，字符串数组表示子页面名称与页面路由名称相同
 * @property {function?} loader - 懒加载函数，如果路由声明对象包含此参数，则不显示页面，而是显示加载页面，并调用并同步等待懒加载函数返回，再刷新页面。用户需要在懒加载函数中，返回路由声明对象。
 * @property {*} xxx - 定制的路由属性
 * @example
 * ***懒加载***
 * ```js
 * {
 *   'dynamic': {
 *      loader: ()=>(new Promise((resolve)=>setTimeout(()=>resolve({
 *        component: ()=><div>dynamic page</div>,
 *      }) ,1000)));
 *   },
 * }
 * ```
 * @example
 * ***子页面***
 * ```js
 * {
 *   'home': { component: Home, subPageInfos: ['sub1', 'sub2']},
 *   'sub1': Sub1,
 *   'sub2': Sub2,
 * }
 * ```
 */

/**
 * 路径的描述信息
 * @typedef PathInfo
 * @type {object}
 * @property {string} pathname - 路径字符串
 * @property {object} state - 状态数据
 * @property {string} search - 查询字符串
 * @property {string} hash - 锚点字符串
 */

/**
 * 路径条目的描述信息
 * @typedef PathItem
 * @type {string|object|string[]}
 * @property {object} state - 状态数据
 * @property {object} query - 查询字符串键值对对象
 * @property {string} hash - 锚点字符串
 */

/**
 * 页面的描述信息
 * @typedef PageInfo
 * @type {object}
 * @property {string} _id - 页面 id
 * @property {string} _idPrev - 页面的前一页面的 id
 * @property {string} _idParent - 页面的父页面的 id
 * @property {string} pathName - 页面对应的路径字符串
 * @property {string} pageName - 页面的名称
 * @property {string} pagePathName - 页面的路径字符串的当前页面片段
 * @property {string[]} pageParams - 页面的路径字符串参数
 * @property {string} routeName - 路由的名称，路由名称上是包含参数定义的名称
 * @property {module:router~RouteDefine} routeDefine - 路由声明对象
 * @property {string[]} routeParams - 路由的配置参数
 * @property {object} state - 状态数据
 * @property {object} query - 查询字符串数据键值对
 * @property {string} hash - 页面的锚点字符串
 * @property {object} params - 页面参数键值对
 * @property {boolean} isSubPage - 是否是子页面
 * @property {module:router~PageInfo[]} subPageInfos - 子页面描述信息集合
 * @property {module:router~PopLayerInfo[]} popLayerInfos - 所欲页面的弹出层集合
 */

/**
 * 弹出层配置参数
 * @typedef PopLayerOptions
 * @type {object}
 * @property {string?} _id - 指定 id，代替默认 id 生成规则
 * @property {string?} _idPage - 指定页面 id，设置弹出层所属页面
 * @property {boolean?} isModal - 是否是模态，模态将获取键盘焦点
 * @property {boolean?} isContentComponent - 指定是 content 是子组件，还是内容直接渲染
 */

/**
 * 弹出层的描述信息
 * @typedef PopLayerInfo
 * @type {object}
 * @property {component|string|number|element} content - 显示的内容或者组件
 * @property {object} props - 属性
 * @property {module:router~PopLayerOptions} options - 弹出层配置参数
 */

/**
 * 路由信息更新，进行路由组件重画
 * @event module:app.App#onRouterUpdate
 */

/**
 * 路由匹配到页面触发事件
 * @event module:app.App#onRouteMatch
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */

/**
 * 路由错误事件，由于地址与路由表对应路由的参数配置不匹配
 * @event module:app.App#onRouteErrorNoParam
 * @property {string} name - 参数名称
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */

/**
 * 路由错误事件，由于地址与路由表不匹配
 * @event module:app.App#onRouteErrorNoRoute
 * @property {string} pageName - 页面名称
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */

/*!
 * 提交到 render 模块的的 router 组件，是所有页面和弹出层的父组件
 */

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
    value: function _renderPage(pageInfo, activeId, focusId, deactiveId) {
      var _this2 = this;

      var app = this.props.app;

      var _ref = pageInfo || {},
          _id = _ref._id,
          _idParent = _ref._idParent,
          isSubPage = _ref.isSubPage,
          popLayerInfos = _ref.popLayerInfos,
          subPageInfos = _ref.subPageInfos,
          routeDefine = _ref.routeDefine;

      if (routeDefine.loader) {
        routeDefine.loader(app).then(function (v) {
          Object.assign(routeDefine, v, {
            loader: null
          });

          _this2.forceUpdate();
        });
        return _react.default.createElement(app.router.PageLoading, {
          key: _id
        });
      } else if (typeof routeDefine.component === 'function') {
        var props = {
          app: app,
          _id: _id,
          route: (0, _objectSpread2.default)({}, pageInfo, {
            isActive: isSubPage ? _idParent === activeId : _id === activeId,
            isReactive: app.router._pages[_id],
            isDeactive: isSubPage ? undefined : _id === deactiveId,
            popLayers: popLayerInfos.map(function (v) {
              return _this2._renderPopLayer(v);
            }),
            subPages: Object.entries(subPageInfos).reduce(function (v1, _ref2) {
              var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
                  k = _ref3[0],
                  v = _ref3[1];

              v1[k] = _this2._renderPage(v, activeId, focusId);
              return v1;
            }, {}),
            subPageInfos: undefined,
            popLayerInfos: undefined
          })
        };
        return _react.default.createElement(app.Page, (0, _extends2.default)({
          key: _id
        }, props));
      } else {
        return _react.default.createElement(app.router, {
          key: _id,
          app: app,
          data: {
            errorRoute: "wrong component"
          }
        });
      }
    }
  }, {
    key: "_renderPopLayer",
    value: function _renderPopLayer(props) {
      var app = this.props.app;
      return _react.default.createElement(app.PopLayer, (0, _extends2.default)({
        key: props.options._id,
        app: app
      }, props));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var app = this.props.app;
      var _app$router = app.router,
          _pageInfos = _app$router._pageInfos,
          _error = _app$router._error,
          _activeId = _app$router._activeId,
          _focusId = _app$router._focusId,
          _deactiveId = _app$router._deactiveId;
      if (_error) return _react.default.createElement(app.router.PageError, {
        app: app,
        data: _error
      });
      return _react.default.createElement(_react.default.Fragment, null, _pageInfos.map(function (v) {
        return _this3._renderPage(v, _activeId, _focusId, _deactiveId);
      }), app.router._getPopLayerNoPageId().map(function (v) {
        return _this3._renderPopLayer((0, _objectSpread2.default)({}, v), _activeId, _focusId);
      }));
    }
  }]);
  return RouterComponent;
}(_react.default.Component);
/**
 * app 的页面管理器，负责路由映射，页面管理，弹出层管理，导航操作等功能
 * 
 * 一些约定：
 * 
 * 1. 子页面不能再拥有子页面
 * 1. 子页面的可见性由其父页面的可见性决定
 * 
 * @see {@link https://able99.github.io/cbnorth/page.html} bnorth 页面管理
 * @exportdefault
 */


var Router =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Router(app) {
    var _this4 = this;

    (0, _classCallCheck2.default)(this, Router);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.router';
    /**
     * 懒加载页面的加载中组件
     * @type {component}
     */

    this.PageLoading = _routerLoading.default;
    /**
     * 路由错误或者页面错误时的错误显示组件
     * @type {component}
     */

    this.PageError = _routerError.default;
    /**
     * 设置导航时是否传递之前的查询字符串到新页面
     * @type {boolean}
     */

    this.passQuery = false;
    /**
     * 设置导航时是否传递之前的状态数据到新页面
     * @type {boolean}
     */

    this.passState = false;
    /**
     * 设置导航时是否传递之前的页面参数到新页面
     * @type {boolean}
     */

    this.passParams = false;
    /*!
     * 路由描画组件，是所有页面和弹出层的父组件
     */

    this._RouterComponent = RouterComponent;
    /*!
     * 路由集合
     */

    this._routes = {};
    /*!
     * 页面实例的集合
     */

    this._pages = {};
    /*!
     * 弹出层描述信息集合
     */

    this._popLayerInfos = [];
    /*!
     * 页面描述信息集合
     */

    this._pageInfos = [];
    /*!
     * 当前顶层页面的 id
     */

    this._activeId = undefined;
    /*!
     * 当前有键盘焦点的 id
     */

    this._focusId = undefined;
    /*!
     * 即将关闭的页面 id
     */

    this._deactiveId = undefined;
    /*!
     * 需要显示在页面上的错误信息
     */

    this._error = undefined;
    /*!
     * 暂存的被阻塞的路径信息
     */

    this._block = undefined;
    /*!
     * 弹出层 id 的随机发生数
     */

    this._popLayerIdRandom = 0;
    /*!
     * 历史栈里面记录的数量
     */

    this._historyCount = 0;
    /*!
     * 暂存各个页面的状态数据，用于返回时恢复
     */

    this._states = {};
    this.app.event.on(this.app._id, 'onPageAdd', function (_id, page) {
      page && _this4._addPage(_id, page);
    }, this._id);
    this.app.event.on(this.app._id, 'onPageRemove', function (_id, page) {
      page && _this4._removePage(_id);
    }, this._id);
    this.app.event.on(this.app._id, 'onAppStartRouter', function () {
      return _this4.app.render.component = _react.default.createElement(_this4._RouterComponent, {
        app: _this4.app
      });
    }, this._id);
    this.app.event.on(this.app._id, 'onAppStartRender', function () {
      _this4._updateRender();
    }, this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoRoute', function (name) {
      return _this4.error("route name: ".concat(name), 'no route error');
    }, this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoParam', function (name) {
      return _this4.error("params name: ".concat(name), 'miss require param error');
    }, this._id);
    this._history = (0, _createHashHistory.default)();

    this._history.listen(function (location, action) {
      return _this4._handleLocationChange(location, action);
    });

    this._handleLocationChange(this._history.location, this._history.action);
  }

  (0, _createClass2.default)(Router, [{
    key: "destructor",
    value: function destructor() {
      this.app.event.off(this._id);
    } // private work
    // --------------------------------------

  }, {
    key: "_updateRender",
    value: function _updateRender() {
      this.app.log.debug('router:update render');
      this.app.event.emit(this.app._id, 'onRouterUpdate');
    }
  }, {
    key: "_clearError",
    value: function _clearError() {
      this._error = null;
    }
  }, {
    key: "_handleLocationChange",
    value: function _handleLocationChange(location, action) {
      var _this5 = this;

      this.app.log.debug('router location', location);

      this._clearError();

      Object.keys(this._states).filter(function (v) {
        return !location.pathname.startsWith(v);
      }).forEach(function (v) {
        delete _this5._states[v];
      });
      if (location.state) this._states[location.pathname] = location.state;
      location.query = {};
      location.search.slice(1).split('&').filter(function (v) {
        return v;
      }).forEach(function (v) {
        var vs = v.split('=');
        location.query[vs[0]] = decodeURIComponent(vs[1]);
      });
      if (action === 'PUSH') this._historyCount++;
      if (action === 'POP') this._historyCount = Math.max(--this._historyCount, 0);
      var pos = 0;
      var pathnames = [];

      while (pos < location.pathname.length - 1) {
        var index = location.pathname.indexOf(spe, pos + 1);
        index = index >= 0 ? index : location.pathname.length;
        var sub = location.pathname.slice(pos + 1, index);

        if (pos === 0 && sub[0] === ParamSpe || this.getRouteByPageName(spe + sub.split(ParamSpe)[0]).length) {
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

      if (location.ignore) {
        location.ignore = false;
        return;
      }

      this._updateRouterInfo(location);
    }
  }, {
    key: "_updateRouterInfo",
    value: function () {
      var _updateRouterInfo2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(location) {
        var _this6 = this;

        var pathName, _idPrev, params, pageInfos, focusId, activeId, deactiveId, level, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, popLayerInfos, focusPopLayerInfo, activePageInfo, focusPopLayerInfoOfPage, _i, pageInfo, _block;

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
                pathName = '';
                params = {};
                pageInfos = [];
                focusId = undefined;
                activeId = undefined;
                deactiveId = undefined;
                /* route */

                level = 0;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 12;

                _loop = function _loop() {
                  var pagePathName = _step.value;
                  pathName = (0, _path.join)(pathName, decodeURIComponent(pagePathName));

                  var _pagePathName$split = pagePathName.split(ParamSpe),
                      _pagePathName$split2 = (0, _toArray2.default)(_pagePathName$split),
                      pageName = _pagePathName$split2[0],
                      pageParams = _pagePathName$split2.slice(1);

                  var _id = PageSign + pathName;

                  var pageInfo = {
                    _id: _id,
                    _idPrev: _idPrev,
                    level: level,
                    pageName: pageName,
                    pathName: pathName,
                    pagePathName: pagePathName,
                    isSubPage: false,
                    query: location.query,
                    state: _this6._states[pathName],
                    pageParams: pageParams,
                    hash: location.hash ? location.hash.slice(1) : '',
                    subPageInfos: {},
                    popLayerInfos: _this6._getPopLayerByPageId(_id)
                  };

                  var _this6$getRouteByPage = _this6.getRouteByPageName(pageInfo.pageName),
                      _this6$getRouteByPage2 = (0, _slicedToArray2.default)(_this6$getRouteByPage, 2),
                      routeName = _this6$getRouteByPage2[0],
                      routeDefine = _this6$getRouteByPage2[1];

                  if (!routeName || !routeDefine) return {
                    v: _this6.app.event.emit(_this6.app._id, 'onRouteErrorNoRoute', pageInfo.pageName, pageInfo, location)
                  };
                  pageInfo.routeName = routeName;
                  pageInfo.routeDefine = routeDefine;
                  pageInfo.routeParams = routeName.split(ParamSpe).slice(1);
                  pageInfo.params = _this6.passParams ? (0, _objectSpread2.default)({}, params) : {};
                  pageInfo.routeParams.forEach(function (v, i) {
                    var optional = v.endsWith(ParamOptional);
                    if (optional) v = v.slice(0, -1);
                    if (!optional && i > pageInfo.pageParams.length - 1) return _this6.app.event.emit(_this6.app._id, 'onRouteErrorNoParam', v, pageInfo, location);
                    pageInfo.params[v] = pageInfo.pageParams[i] ? decodeURIComponent(pageInfo.pageParams[i]) : null;
                    if (_this6.passParams) params[v] = pageInfo.params[v];
                  });
                  var subNo = 0;
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = (Array.isArray(routeDefine.subPages) ? routeDefine.subPages.map(function (v, i) {
                      return [v, v];
                    }) : Object.entries(routeDefine.subPages || {}))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _step2$value = (0, _slicedToArray2.default)(_step2.value, 2),
                          k = _step2$value[0],
                          v = _step2$value[1];

                      var subPageInfo = (0, _objectSpread2.default)({}, pageInfo);
                      subPageInfo._idParent = subPageInfo._id;
                      subPageInfo._idSubPage = k;
                      subPageInfo.subNo = subNo;
                      subPageInfo._id = subPageInfo._id + SubPageSpe + subPageInfo._idSubPage;
                      subPageInfo.pageName = v;
                      subPageInfo.isSubPage = true;
                      subPageInfo.subPageInfos = {};
                      subPageInfo.popLayerInfos = _this6._getPopLayerByPageId(subPageInfo._id);

                      var _this6$getRouteByPage3 = _this6.getRouteByPageName(subPageInfo.pageName),
                          _this6$getRouteByPage4 = (0, _slicedToArray2.default)(_this6$getRouteByPage3, 2),
                          routeNameSubPage = _this6$getRouteByPage4[0],
                          routeDefineSubPage = _this6$getRouteByPage4[1];

                      if (!routeNameSubPage || !routeDefineSubPage) return {
                        v: _this6.app.event.emit(_this6.app._id, 'onRouteErrorNoRoute', subPageInfo.pageName, subPageInfo, location)
                      };
                      subPageInfo.routeName = routeNameSubPage;
                      subPageInfo.routeDefine = routeDefineSubPage;
                      pageInfo.subPageInfos[subPageInfo._idSubPage] = subPageInfo;
                      subNo++;
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

                  _idPrev = _id;
                  level++;
                  pageInfos.push(pageInfo);
                };

                _iterator = location.pathnames[Symbol.iterator]();

              case 15:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 22;
                  break;
                }

                _ret = _loop();

                if (!((0, _typeof2.default)(_ret) === "object")) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", _ret.v);

              case 19:
                _iteratorNormalCompletion = true;
                _context.next = 15;
                break;

              case 22:
                _context.next = 28;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](12);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 28:
                _context.prev = 28;
                _context.prev = 29;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 31:
                _context.prev = 31;

                if (!_didIteratorError) {
                  _context.next = 34;
                  break;
                }

                throw _iteratorError;

              case 34:
                return _context.finish(31);

              case 35:
                return _context.finish(28);

              case 36:
                /* active & focus */
                popLayerInfos = this._getPopLayerNoPageId();
                focusPopLayerInfo = Array.from(popLayerInfos).reverse().find(function (v) {
                  return v.options.isModal;
                });
                activePageInfo = pageInfos.slice(-1)[0];
                if (focusPopLayerInfo) focusId = focusPopLayerInfo.options._id;
                if (activePageInfo) activeId = activePageInfo._id;

                if (activePageInfo && !focusId) {
                  focusPopLayerInfoOfPage = activePageInfo.popLayerInfos && Array.from(activePageInfo.popLayerInfos).reverse().find(function (v) {
                    return v.options.isModal;
                  });

                  if (focusPopLayerInfoOfPage) {
                    focusId = focusPopLayerInfoOfPage.options.id;
                  } else {
                    focusId = activePageInfo._id;
                  }
                }
                /* match */


                _i = 0;

              case 43:
                if (!(_i < pageInfos.length)) {
                  _context.next = 53;
                  break;
                }

                pageInfo = pageInfos[_i];
                _context.next = 47;
                return this.app.event.emit(this.app._id, 'onRouteMatch', pageInfo, location);

              case 47:
                _block = _context.sent;

                if (!_block) {
                  _context.next = 50;
                  break;
                }

                return _context.abrupt("return", this.block(_block));

              case 50:
                _i++;
                _context.next = 43;
                break;

              case 53:
                /* update */
                if (this._activeId && !pageInfos.find(function (v) {
                  return v._id === _this6._activeId;
                })) {
                  deactiveId = this._activeId;
                  pageInfos.push(this._pageInfos.find(function (v) {
                    return v._id === _this6._activeId;
                  }));
                }

                this._pageInfos = pageInfos;
                this._focusId = focusId;
                this._activeId = activeId;
                this._deactiveId = deactiveId;

                this._updateRender();

              case 59:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[12, 24, 28, 36], [29,, 31, 35]]);
      }));

      return function _updateRouterInfo(_x) {
        return _updateRouterInfo2.apply(this, arguments);
      };
    }()
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
        this._removePopLayerByPageId(page._id);

        delete this._pages[page._id];
      }
    }
  }, {
    key: "_getPopLayerNoPageId",
    value: function _getPopLayerNoPageId() {
      return this._popLayerInfos.filter(function (_ref4) {
        var options = _ref4.options;
        return !options._idPage;
      });
    }
  }, {
    key: "_getPopLayerByPageId",
    value: function _getPopLayerByPageId(_id) {
      return this._popLayerInfos.filter(function (_ref5) {
        var options = _ref5.options;
        return options._idPage === _id;
      });
    }
  }, {
    key: "_removePopLayerByPageId",
    value: function _removePopLayerByPageId(_id) {
      var _this7 = this;

      this._getPopLayerByPageId(_id).forEach(function (v) {
        return _this7.removePopLayer(v.options._id);
      });
    } // pages poplayer interface
    // ---------------------------------------

    /**
     * 获取页面实例
     * @param {(string|number)?} - 获取参数
     * 
     * 1. string：获取指定 id 的页面
     * 1. number：获取指定序号的页面
     * 1. 空：获取顶层页面
     * 
     * @returns {module:page.Page} 页面实例
     */

  }, {
    key: "getPage",
    value: function getPage(_id) {
      if (typeof _id === 'string') {
        return this._pages[_id];
      } else if (typeof _id === 'number') {
        var pageinfo = this._pageInfos[_id];
        return this._pages[pageinfo && pageinfo._id];
      } else if (_id === undefined) {
        var _pageinfo = this._pageInfos[this._pageInfos.length - 1];
        return this._pages[_pageinfo && _pageinfo._id];
      }
    }
    /**
     * 获取页面实例集合
     * @returns {module:page.Page[]} 页面实例
     */

  }, {
    key: "getPages",
    value: function getPages() {
      return this._pages;
    }
    /**
     * 生成弹出层 id
     * @param {module:router~PopLayerOptions} - 配置参数
     * @returns {string} 弹出层 id 
     */

  }, {
    key: "genPopLayerId",
    value: function genPopLayerId() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return options._id || "".concat(++this._popLayerIdRandom, "@").concat(options._idPage ? options._idPage : '#');
    }
    /**
     * 添加弹出层
     * @param {number|string|component|element} - 内容 
     * @param {object} props - 组件属性
     * @param {module:router~PopLayerOptions} options - 弹出层配置
     * @returns {string} 弹出层 id 
     */

  }, {
    key: "addPopLayer",
    value: function addPopLayer(content) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!content) return;
      options._id = this.genPopLayerId(options);
      var popLayer = this.getPopLayerInfo(options._id);

      if (!popLayer) {
        options.states = options.states || {};
        if (options.data) options.states.stateData = this.app.State.createState(this.app, options.data === true ? undefined : options.data, 'stateData', options._id);

        this._popLayerInfos.push({
          content: content,
          props: props,
          options: options
        });

        options.onAdd && options.onAdd(options._id);
      } else {
        popLayer.content = content;
        popLayer.props = props;
        popLayer.options = options;
      }

      this._updateRouterInfo(this._history.location);

      return options._id;
    }
    /**
     * 移除弹出层
     * @param {!string} - 弹出层 id
     */

  }, {
    key: "removePopLayer",
    value: function removePopLayer(_id) {
      var index = this._popLayerInfos.findIndex(function (v) {
        return v.options._id === _id;
      });

      if (index < 0) return;
      this._popLayerInfos[index].options.data && this._popLayerInfos[index].options.states.stateData.destructor();
      this._popLayerInfos[index].options.onRemove && this._popLayerInfos[index].options.onRemove();

      this._popLayerInfos.splice(index, 1);

      this._updateRouterInfo(this._history.location);
    }
    /**
     * 获取弹出层信息
     * @param {string} - 弹出层 id
     * @returns {module:router~PopLayerInfo}
     */

  }, {
    key: "getPopLayerInfo",
    value: function getPopLayerInfo(_id) {
      return this._popLayerInfos.find(function (v) {
        return v.options._id === _id;
      });
    }
    /**
     * 获取全部弹出层信息集合
     * @returns {module:router~PopLayerInfo[]}
     */

  }, {
    key: "getPopLayerInfos",
    value: function getPopLayerInfos() {
      return this._popLayerInfos;
    }
    /**
     * 获取弹出层的状态数据
     * @param {string} - 弹出层 id
     * @returns {object}
     */

  }, {
    key: "getPopLayerStates",
    value: function getPopLayerStates(_id) {
      var _ref6 = this.getPopLayerInfo(_id) || {},
          _ref6$options = _ref6.options;

      _ref6$options = _ref6$options === void 0 ? {} : _ref6$options;
      var states = _ref6$options.states;
      if (!states) return {};
      var stateProps = {};
      Object.entries(states).forEach(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        return stateProps[k] = v.data();
      });
      return stateProps;
    } // router interface
    // --------------------------------------

    /**
     * 向路由表增加路由
     * @param {string} - 路由名称 
     * @param {module:router~RouteDefine|component} - 路由配置对象 
     */

  }, {
    key: "addRoute",
    value: function addRoute(name, route) {
      if (!name || !route) return;
      this._routes[name] = route;
      route.for && this.addNavigatorFunction(name, route.for);

      this._handleLocationChange(this._history.location, this._history.action);

      this._updateRouterInfo(this._history.location);
    }
    /**
     * addRoute 的批量版本，
     * @param {object} - 路由表键值对
     * 
     * - 键是路由名称，路由名称是包含参数定义的字符串，如果首字母是 `/`，则同时使用为默认根页面
     * - 值是路由配置对象，参见 addRoute
     */

  }, {
    key: "setRoutes",
    value: function setRoutes(routes) {
      var _this8 = this;

      this._routes = routes;
      Object.entries(this._routes || {}).forEach(function (_ref9) {
        var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
            k = _ref10[0],
            v = _ref10[1];

        return v.for && _this8.addNavigatorFunction(k, v.for);
      });

      this._handleLocationChange(this._history.location, this._history.action);

      this._updateRouterInfo(this._history.location);
    }
    /**
     * 获取路由表
     * @returns {object} - 路由表
     */

  }, {
    key: "getRoutes",
    value: function getRoutes() {
      return this._routes || {};
    }
    /**
     * 获取指定路由名称的路由配置对象
     * @param {string} - 路由名称
     * @returns {module:router~RouteDefine}
     */

  }, {
    key: "getRouteByRouteName",
    value: function getRouteByRouteName(routeName) {
      var route = this._routes[routeName];
      return route ? [route[0], typeof route[1] === 'function' ? {
        component: route[1]
      } : route[1]] : [];
    }
    /**
     * 获取指定路由名称的路由配置对象
     * @param {string} - 页面名称
     * @returns {module:router~RouteDefine}
     */

  }, {
    key: "getRouteByPageName",
    value: function getRouteByPageName(pageName) {
      var route = Object.entries(this._routes).find(function (_ref11) {
        var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
            k = _ref12[0],
            v = _ref12[1];

        return k.split(':')[0] === pageName;
      });
      return route ? [route[0], typeof route[1] === 'function' ? {
        component: route[1]
      } : route[1]] : [];
    }
    /**
     * 为路由模块添加导航函数，即 pushXXX 和 replaceXXX 函数
     * @param {string} - 页面名称 
     * @param {string} - 导航函数名称 
     */

  }, {
    key: "addNavigatorFunction",
    value: function addNavigatorFunction(pageName, navigatorName) {
      var _this9 = this;

      pageName = pageName && pageName.split(ParamSpe[0])[0];
      navigatorName = navigatorName || this.app.utils.captilaze(pageName);

      this["push".concat(navigatorName)] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this9.push([pageName].concat(args));
      };

      this["replace".concat(navigatorName)] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this9.replace([pageName].concat(args));
      };
    }
    /**
     * 获取历史记录的级数
     * @returns {number} 级数
     */

  }, {
    key: "getHistoryCount",
    value: function getHistoryCount() {
      return this._historyCount;
    }
    /**
     * 判断是否在根页面
     * @returns {boolean} 是否跟页面
     */

  }, {
    key: "isRootPath",
    value: function isRootPath() {
      return this.app.router._pageInfos[this.app.router._pageInfos.length - 1].name === '/';
    }
    /**
     * 判断是否具有键盘焦点
     * @param {*} - 页面或者弹出层 id
     * @returns {boolean} 是否具有键盘焦点
     */

  }, {
    key: "isFocus",
    value: function isFocus(_id) {
      return this._focusId === _id;
    }
    /**
     * 判断是否是顶层
     * @param {*} - 页面或者弹出层 id
     * @returns {boolean} 是否顶层
     */

  }, {
    key: "isActive",
    value: function isActive(_id) {
      return this._activeId === _id;
    } // router navigator interface
    // ----------------------------------------

    /**
     * 记录将要被阻塞的路径
     * @param {(module:router~PathInfo|string|function)?} - 将被阻塞的路径，为空则使用当前路径 
     */

  }, {
    key: "block",
    value: function block(_block) {
      this.app.log.debug('router block', _block);

      if (typeof _block === 'function') {
        this._block = this._history.location;
        _block = _block(this.app);
        this._block = _block || this._block;
      } else {
        this._block = _block || this._history.location;
      }

      return true;
    }
    /**
     * 恢复之前被阻塞的路径
     * @param {module:router~PathInfo|string} - 要恢复的路径，为空则使用 block 保存的路径
     */

  }, {
    key: "restore",
    value: function restore(location) {
      this.app.log.debug('router restore', location);
      location || this._block ? this._history.replace(location || this._block) : this.replaceRoot();
      this._block = null;
      return true;
    }
    /**
     * 解析路径参数
     * @param  {...module:router~PathItem} - 路径参数 
     * 
     * 1. 字符串表示页面路由名称，其中有两个特殊页面名称， '/' 表示， '..'
     * 1. 如果参数是数组表示带参数的页面，数组第一个元素表示页面名称路由，其他元素为参数
     * 1. 如果参数是对象，则设为路径信息的，state，query，hash 信息
     * 
     * @returns {module:router~PathInfo} 返回路径描述对象
     */

  }, {
    key: "getPathInfo",
    value: function getPathInfo() {
      var query = {};
      var state;
      var hash;
      var ignore;

      var pathnames = this._pageInfos.map(function (v) {
        return v.pagePathName;
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
          if (arg.hash) hash = arg.hash;
          if (arg.ignore) ignore = true;
        } else {
          addPath(String(arg));
        }
      });
      return {
        pathname: pathnames.map(function (v, i, a) {
          return i === 0 && v === '/' && a.length > 1 ? '' : v;
        }).join('/'),
        state: this.passState ? (0, _objectSpread2.default)({}, this._history.location.state, state) : state,
        search: '?' + Object.entries(this.passQuery ? (0, _objectSpread2.default)({}, this._history.location.query, query) : query).map(function (_ref13) {
          var _ref14 = (0, _slicedToArray2.default)(_ref13, 2),
              k = _ref14[0],
              v = _ref14[1];

          return k + '=' + v;
        }).reduce(function (v1, v2) {
          return v1 + (v1 ? '&' : '') + v2;
        }, ''),
        hash: hash,
        ignore: ignore
      };
    }
    /**
     * 获取路径名称，但不跳转或者替换，参数参见 getPathInfo
     */

  }, {
    key: "getPathName",
    value: function getPathName() {
      return this._history.createHref(this.getPathInfo.apply(this, arguments));
    }
    /**
     * 获取 url，但不跳转或者替换，参数参见 getPathInfo
     */

  }, {
    key: "getUrl",
    value: function getUrl() {
      return window.location.origin + window.location.pathname + window.location.search + this.getPathName.apply(this, arguments);
    }
    /**
     * 跳转路径，参数参见 getPathInfo
     */

  }, {
    key: "push",
    value: function push() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.app.log.debug('router push', args);

      this._history.push(this.getPathInfo.apply(this, args));

      return true;
    }
    /**
     * 替换路径，参数参见 getPathInfo
     */

  }, {
    key: "replace",
    value: function replace() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.app.log.debug('router replace', args);

      this._history.replace(this.getPathInfo.apply(this, args));

      return true;
    }
    /**
     * 在浏览历史记录中返回
     * @param {number} - 返回的级数 
     */

  }, {
    key: "back",
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.app.log.debug('router back');

      this._history.go(-step);

      return true;
    }
    /**
     * 强制刷新全部页面
     */

  }, {
    key: "refresh",
    value: function refresh() {
      this._clearError();

      this._updateRouterInfo(this._history.location);

      return true;
    }
    /**
     * 跳转到根页面
     * @param  {...string} - 页面的参数 
     */

  }, {
    key: "pushRoot",
    value: function pushRoot() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this.push(['/'].concat(args));
    }
    /**
     * 替换到根页面
     * @param  {...string} - 页面的参数 
     */

  }, {
    key: "replaceRoot",
    value: function replaceRoot() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this.replace(['/'].concat(args));
    }
    /**
     * 跳转到错误显示页面
     * @param {error|string|object} - 错误内容 
     * @param {string} - 错误标题 
     * @param {string} - 错误目标 id 
     */

  }, {
    key: "error",
    value: function error(message, title, _id) {
      this._error = {
        message: message,
        title: title,
        _id: _id
      };

      this._updateRender();
    }
  }]);
  return Router;
}();

var _default = Router;
exports.default = _default;
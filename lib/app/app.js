'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _bindActionCreators = require('../utils/bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _container = require('./container');

var _appPlugin = require('./appPlugin');

var _appPlugin2 = _interopRequireDefault(_appPlugin);

var _appComponent = require('./appComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _instance = null;

/**
 * 应用程序的主类
 * 使用单例模式，保证只有一个应用实例，建立后通过start 函数即可启动应用
 * @class
 * @example
 * ```js
 * let app = App.instance({});
 * app.start();
 * ```
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var App = function () {

  // constructor
  // ------------------------------------------------------------
  /**
   * App 为单例模式，不要直接构造，使用instance 函数构造与获取
   * @constructor
   * @param {object} options - 参数
   * @example
   * ```js
   * options = {
   *   config       // 配置参数，参见config 模块
   *   startEvents  // 启动阶段各个回调函数名称数组，建议不要修改该参数，比如丢失了onRender 事件，将无法显示
   *   plugin       // 用户插件，第一个插入的插件
   *   domIdRoot    // html中react 根元素名称，默认 `root`
   *   middlewares  // redux 中间件数组，默认为空
   *   status       // redux store 中的起始数据，默认为空
   * }
   * 
   * let app = App.instance(options);
   * ```
   */
  function App(options) {
    (0, _classCallCheck3.default)(this, App);

    this._ErrorComponent = function (props) {
      var title = props.title,
          error = props.error;

      return _react2.default.createElement(
        'div',
        { className: 'margin' },
        _react2.default.createElement(
          'h3',
          null,
          title || 'error'
        ),
        _react2.default.createElement(
          'h5',
          null,
          error instanceof Error ? error.message : error
        )
      );
    };

    if (!_instance) {
      this.options = options || {};

      this._startEvents = options.startEvents || ['onConfigBefore', 'onConfig', 'onImportStyles', 'onImportStylesAfter', 'onCreateStoreBefore', 'onCreateStore', 'onCreateStoreAfter', 'onImportRoutes', 'onImportRoutesAfter', 'onHook', 'onRender'];
      this._stateError = false;
      this._pluginReady = false;

      /**
       * @property {boolean} started - 是否完成启动
       */
      this.started = false;
      /**
       * @property {config} config - app 配置信息
       */
      this.config = Object.assign(_config2.default, this.options.config || {});
      this.config.loadStorage();
      /**
       * @property {route[]} routes - 路由表
       */
      this.routes = null;
      /**
       * @property {action[]} actions - app 的action 函数列表
       */
      this.actions = {};
      /**
       * @property {ActionState[]} actionStates - app 的数据管理器列表
       */
      this.actionStates = {};
      /**
       * @property {reduxer[]} reduxers - app 中正在运行的reduxer 列表
       */
      this.reduxers = {};
      /**
       * @property {Page[]} _pages - app 中正在运行的页面的列表
       */
      this._pages = [];
      /**
       * @property {plugin[]} _plugins - app 中正在运行的插件列表
       */
      this._plugins = [];
      /**
       * @property {Page} _AppComponentPage - app 默认跟页面 Page，已设置默认，一般无需修改
       */
      this._AppComponentPage = _appComponent.AppComponentPage;

      /**
       * @property {containerCreator} _appComponentContainerCreator - app 默认跟页面 Container creator，已设置默认，一般无需修改
       */
      this._appComponentContainerCreator = _appComponent.appComponentContainerCreator;

      /**
       * @property {pageHoc} _pageHoc - app 默认页面Page 高阶组件，已设置默认，一般无需修改
       */
      this._pageHoc = _page2.default;

      /**
       * @property {containerConnect} _containerConnect - app 默认Container 转换函数，已设置默认，一般无需修改
       */
      this._containerConnect = _container.containerConnect;

      if (this.options.plugin) {
        this.options.plugin.name = this.options.plugin.name || 'app_custom';
        this.use(this.options.plugin);
      }
    }

    _instance = this;
    window.app = _instance;
    return _instance;
  }

  /** 
   * 获取App单一实例
   * @method
   * @param {object} options - 参数
   */


  (0, _createClass3.default)(App, [{
    key: '_createRouteComponent',


    // react react-script react-redux
    // ---------------------------------------------------------
    /**
     * 建立经过页面组件与页面容器高阶化后的组件
     * @method
     * @param {Page} Page - 页面组件
     * @param {containerCreator} containerCreator - 页面容器
     * @param {string} name - container 名称，该名称同时作为唯一id
     * @return {element} - 返回经过页面组件与页面容器高阶化后的组件
     */
    value: function _createRouteComponent(page, container, name) {
      if (!page) return null;

      page = app._pageHoc(app, page);
      container = app._containerConnect(app, container, name);
      return container ? container(page) : page;
    }

    /**
     * 建立经过页面组件与页面容器高阶化后的根组件
     * @method
     */

  }, {
    key: '_createRootRouteComponent',
    value: function _createRootRouteComponent() {
      return this._createRouteComponent(this._AppComponentPage, this._appComponentContainerCreator, 'app');
    }

    /**
     * 处理route 进入事件
     * @method
     * @param {*} originOnEnter 
     * @param {*} nextState 
     * @param {*} replace 
     * @param {*} callback 
     */

  }, {
    key: '_handleRouteOnEnter',
    value: function _handleRouteOnEnter(originOnEnter, nextState, replace, callback) {
      var ret = this.trigger('onNavigating', nextState);
      if (ret) {
        this.trigger('onNavigatePrevent', nextState);
        replace(ret);
        return;
      }

      if (originOnEnter) originOnEnter(nextState, replace, callback);else callback();
    }

    /**
     * 配置route 属性值
     * @method
     */

  }, {
    key: '_configRouteProps',
    value: function _configRouteProps(route) {
      if (!route || !route.props) return route;
      var app = this;
      var config = this.config;
      if (route.props.onInit) route.props.onInit(app);

      return function props(route) {
        return (0, _react.cloneElement)(route, { children: _react2.default.Children.map(route.props.children, function (v, i) {
            var key = v.key;
            var _v$props = v.props,
                path = _v$props.path,
                pathname = _v$props.pathname,
                container = _v$props.container,
                component = _v$props.component,
                components = _v$props.components,
                children = _v$props.children,
                checkLogin = _v$props.checkLogin,
                restartOnParamChange = _v$props.restartOnParamChange,
                restartOnQueryChange = _v$props.restartOnQueryChange,
                onEnter = _v$props.onEnter,
                purpose = _v$props.purpose;

            // path and path param

            if (path || !key) {
              path = path === true || !key ? '' : path;
            } else {
              path = key;
            }
            var paths = path.split('/');
            var params = paths.filter(function (v) {
              return v.indexOf(':') === 0;
            }).map(function (v) {
              return v.slice(1);
            });
            pathname = pathname || paths[0] || paths[1] || '';

            // navi path
            var pathItem = { path: pathname, params: params };
            config.paths[pathname.replace(/-/g, '_')] = pathItem;
            if (purpose) config.paths[purpose[0].toUpperCase() + purpose.slice(1)] = pathItem;

            // check login
            var originOnEnter = onEnter;
            onEnter = route.type === _reactRouter.Route && function () {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return app._handleRouteOnEnter.apply(app, [originOnEnter].concat(args));
            };

            // component
            component = app._createRouteComponent(component, container, 'cn:' + path);

            // components
            if (components) {
              Object.keys(components).forEach(function (v) {
                var component = components[v];
                if (component && (typeof component === 'undefined' ? 'undefined' : (0, _typeof3.default)(component)) === 'object') {
                  components[v] = app._createRouteComponent(component.component, component.container, 'cn:' + path + ':' + v);
                }
              });
            }

            // restart
            if (restartOnParamChange || restartOnQueryChange) {
              var KeysComponent = component;
              component = function component(props) {
                var KeysComponentkey = '/' + path;
                if (restartOnParamChange) KeysComponentkey += Object.keys(props.params).filter(function (v) {
                  return params.indexOf(v) >= 0;
                }).map(function (v) {
                  return props.params[v];
                }).join(':');
                if (restartOnQueryChange) KeysComponentkey += JSON.stringify(props.location.query);
                return _react2.default.createElement(KeysComponent, (0, _extends3.default)({}, props, { key: KeysComponentkey }));
              };
            }

            route = (0, _react.cloneElement)(v, { path: path, onEnter: onEnter, component: component, components: components });
            if (children) {
              return props(route);
            } else {
              return (0, _react.cloneElement)(route);
            }
          }) });
      }(route);
    }

    /**
     * create redux middleware for runanble action
     * @method
     * @return {function} - redux middleware
     */

  }, {
    key: '_createThunkMiddleware',
    value: function _createThunkMiddleware() {
      return function (_ref) {
        var dispatch = _ref.dispatch,
            getState = _ref.getState;
        return function (next) {
          return function (action) {
            if (typeof action === 'function') {
              var title = 'action func(' + (action.fname || action.name || 'anonymous') + '): ';
              try {
                app.verbose(title);
                return action(app, dispatch, getState);
              } catch (e) {
                app.error(title, e);
                app.errorNotice(e);
              }
            }

            app.verbose('action:', action);
            return next(action);
          };
        };
      };
    }

    /**
     * 建立根组件
     * @method
     */

  }, {
    key: '_createRootComponent',
    value: function _createRootComponent() {
      var _this = this;

      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.actionStore },
        _react2.default.createElement(
          _reactRouter.Router,
          {
            history: this.options.history || _reactRouter.hashHistory,
            render: function render(props) {
              _this.trigger('onNavigated', props);return _react2.default.createElement(_reactRouter.RouterContext, props);
            } },
          _react2.default.createElement(
            _reactRouter.Route,
            { path: '', component: this._createRootRouteComponent() },
            this.routes
          ),
          _react2.default.createElement(_reactRouter.Route, { path: '*', onEnter: function onEnter() {
              for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              return _this.trigger.apply(_this, ['onErrorNavigator'].concat(args));
            } })
        )
      );
    }

    /**
     * 获取root 元素
     * @method
     */

  }, {
    key: 'getRootElement',
    value: function getRootElement() {
      return document.getElementById(this.options.domIdRoot || 'root');
    }

    /**
     * app 显示页面等待中的无状态组件函数
     * @method 
     */

  }, {
    key: '_WaittingComponent',
    value: function _WaittingComponent(props) {
      var styleSetFull = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%' };
      var styleSetCenter = { marginTop: '4rem', textAlign: 'center' };
      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, styleSetFull, styleSetCenter) },
        '...'
      );
    }

    /**
     * app 显示页面错误的无状态组件函数
     * @method 
     * @param {string} [title='error'] - 错误title
     * @param {Error|element} error - 错误内容
     */

  }, {
    key: '_createStore',


    /**
     * 建立redux 数据仓库
     * @method
     */
    value: function _createStore() {
      var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, [this._createThunkMiddleware()].concat((0, _toConsumableArray3.default)(this.options.middlewares || [])))(_redux.createStore);
      this.actionStore = createStoreWithMiddleware((0, _redux.combineReducers)(this.reduxers), this.options.states);
      this.actions = (0, _bindActionCreators2.default)(this.actions, this.actionStore.dispatch);
    }

    /**
     * start rendor 
     * @method
     */

  }, {
    key: '_render',
    value: function _render() {
      this.verbose('app render:', this.routes, this.config);
      this.routes = this._configRouteProps(this.routes);
      (0, _reactDom.render)(this._createRootComponent(), this.getRootElement());
    }

    // pages
    // ---------------------------------------------------------
    /**
     * 将页面添加到页面管理器
     * @method
     * @param {element} - page
     */

  }, {
    key: 'addPage',
    value: function addPage(page) {
      this._pages.push(page);
    }

    /**
     * 将页面从页面管理器中移除
     * @method
     * @param {element} - page
     */

  }, {
    key: 'removePage',
    value: function removePage(page) {
      this._pages.splice(app._pages.indexOf(page), 1);
    }

    /**
     * 获取app 中的页面
     * @method
     * @param {undefined|string|number|Page} name - 
     * **默认**：获取最后的页面，即当前焦点页面
     * **空字符串，'/'，0**：获取app 根页面
     * **number**：按页面序号获取
     * **string**：按页面displayName获取
     * **Page**： 直接返回Page
     */

  }, {
    key: 'getPage',
    value: function getPage(name) {
      if (name === undefined) {
        return this._pages[this._pages.length - 1];
      } else if (name === '' || name === '/' || name === 0) {
        return this._pages[0];
      } else if (typeof name === 'number') {
        return this._pages[name];
      } else if (typeof name === 'string') {
        return this._pages.find(function (v) {
          return v.props.displayName === name;
        });
      } else {
        return name;
      }
    }

    // plugins 
    // ------------------------------------------------------------
    /**
     * 添加插件到应用中，插件需要符合标准
     * @method
     * @param {!object} plugin - 插件
     */

  }, {
    key: 'use',
    value: function use(plugin) {
      var _this2 = this;

      if (plugin.name && this._plugins.find(function (v) {
        return v.name === plugin.name;
      })) {
        var title = 'app plugin error';
        var e = 'plugin has been used with name:' + plugin.name;
        this.error(title, error);
        this.errorRender(title, error);
        return;
      }

      if (plugin.dependences) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var dependence = _step.value;

            if (!_this2._plugins.find(function (v) {
              return v.name === dependence;
            })) {
              var _title = 'app plugin error';
              var _error = 'plugin:' + plugin.name + ' dependence:' + dependence + ' not ready';
              _this2.error(_title, _error);
              _this2.errorRender(_title, _error);
              return {
                v: void 0
              };
            }
          };

          for (var _iterator = (Array.isArray(plugin.dependences) ? plugin.dependences : [plugin.dependences])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ret = _loop();

            if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      this._plugins.push(plugin);
      plugin.init && plugin.init(this);
    }

    /**
     * 移除指定插件
     * 移除后，相关处理事件不再处理，但是对app 的修改不能恢复
     * @method
     * @param {!string} name - 要移除插件的名称 
     */

  }, {
    key: 'unuse',
    value: function unuse(name) {
      var _this3 = this;

      this._plugins.filter(v.name === name).forEach(function (v) {
        _this3._plugins.remove(v);
      });
    }

    /**
     * 获取指定名字的plugin
     * @method
     * @param {!string} name - 要移除插件的名称 
     */

  }, {
    key: 'getPlugin',
    value: function getPlugin(name) {
      return this._plugins.find(v.name && v.name === name);
    }

    /**
     * 触发app 指定事件
     * @method
     * @param {!string} event - 事件名称
     * @param {...*} [args] - 事件参数
     */

  }, {
    key: 'trigger',
    value: function trigger(event) {
      var ret = void 0;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _v2 = _step2.value;

          var _title2 = 'app event(' + event + '-' + (_v2 && _v2.name) + '):';
          try {
            var handler = _v2 && _v2[event];
            if (handler) {
              var _app;

              if (event !== 'onLog') (_app = app).verbose.apply(_app, [_title2].concat(args));
              ret = handler.apply(undefined, [this].concat(args));
              if (ret) {
                return ret;
              }
            }
          } catch (e) {
            this.error(_title2, e);
            this.errorNotice(e, { title: _title2 });
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (event !== 'onLog') {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (this._pages || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _v = _step3.value;

            try {
              var _v$props$container;

              ret = _v.props.container && _v.props.container.trigger && (_v$props$container = _v.props.container).trigger.apply(_v$props$container, [event].concat(args));
              if (ret) {
                return ret;
              }
            } catch (e) {
              var title = 'app container event(' + event + '):';
              this.error(title, e);
              this.errorNotice(e, { title: title });
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      return ret;
    }

    // start
    // ------------------------------------------------------------
    /**
     * 应用程序启动
     * @method start
     */

  }, {
    key: 'start',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, event, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _v3, handler, title;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.use(_appPlugin2.default);
                this._pluginReady = true;
                _context.prev = 2;
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context.prev = 6;
                _iterator4 = this._startEvents[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context.next = 44;
                  break;
                }

                event = _step4.value;
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context.prev = 13;
                _iterator5 = this._plugins[Symbol.iterator]();

              case 15:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context.next = 27;
                  break;
                }

                _v3 = _step5.value;
                handler = _v3 && _v3[event];

                if (!handler) {
                  _context.next = 24;
                  break;
                }

                app.verbose('app start event(' + event + '-' + (_v3 && _v3.name) + '):');
                _context.next = 22;
                return handler(this);

              case 22:
                if (!_context.sent) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt('continue', 24);

              case 24:
                _iteratorNormalCompletion5 = true;
                _context.next = 15;
                break;

              case 27:
                _context.next = 33;
                break;

              case 29:
                _context.prev = 29;
                _context.t0 = _context['catch'](13);
                _didIteratorError5 = true;
                _iteratorError5 = _context.t0;

              case 33:
                _context.prev = 33;
                _context.prev = 34;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 36:
                _context.prev = 36;

                if (!_didIteratorError5) {
                  _context.next = 39;
                  break;
                }

                throw _iteratorError5;

              case 39:
                return _context.finish(36);

              case 40:
                return _context.finish(33);

              case 41:
                _iteratorNormalCompletion4 = true;
                _context.next = 8;
                break;

              case 44:
                _context.next = 50;
                break;

              case 46:
                _context.prev = 46;
                _context.t1 = _context['catch'](6);
                _didIteratorError4 = true;
                _iteratorError4 = _context.t1;

              case 50:
                _context.prev = 50;
                _context.prev = 51;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 53:
                _context.prev = 53;

                if (!_didIteratorError4) {
                  _context.next = 56;
                  break;
                }

                throw _iteratorError4;

              case 56:
                return _context.finish(53);

              case 57:
                return _context.finish(50);

              case 58:
                this.started = true;
                _context.next = 67;
                break;

              case 61:
                _context.prev = 61;
                _context.t2 = _context['catch'](2);
                title = this.started ? 'app uncaught error' : 'app start error';

                this.error(title, _context.t2);
                this.errorRender(title, _context.t2);
                return _context.abrupt('return', _context.t2);

              case 67:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 61], [6, 46, 50, 58], [13, 29, 33, 41], [34,, 36, 40], [51,, 53, 57]]);
      }));

      function start() {
        return _ref2.apply(this, arguments);
      }

      return start;
    }()

    // notice
    // ------------------------------------------------------------
    /**
     * 打印日志-普通级别
     * @method
     * @param {...*} args - 日志列表
     */

  }, {
    key: 'log',
    value: function log() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (!this._pluginReady) {
        var _console;

        (_console = console).log.apply(_console, args);
        return;
      }
      this.trigger.apply(this, ['onLog', null, false].concat(args));
    }
    /**
     * 打印日志-调试级别
     * @method
     * @param {...*} args - 日志列表
     */

  }, {
    key: 'debug',
    value: function debug() {
      if (!this.config.debug) return;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      if (!this._pluginReady) {
        var _console2;

        (_console2 = console).log.apply(_console2, args);
        return;
      }
      this.trigger.apply(this, ['onLog', 'debug', true].concat(args));
    }
    /**
     * 打印日志-冗余级别
     * @method
     * @param {...*} args - 日志列表
     */

  }, {
    key: 'verbose',
    value: function verbose() {
      if (!this.config.verbose) return;

      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      if (!this._pluginReady) {
        var _console3;

        (_console3 = console).log.apply(_console3, args);
        return;
      }
      this.trigger.apply(this, ['onLog', 'verbose', false].concat(args));
    }
    /**
     * 打印日志-错误级别
     * @method
     * @param {...*} args - 日志列表
     */

  }, {
    key: 'error',
    value: function error() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      if (!this._pluginReady) {
        var _console4;

        (_console4 = console).error.apply(_console4, args);
        return;
      }
      this.trigger.apply(this, ['onLog', 'error', true].concat(args));
    }
    /**
     * 将错误通过页面渲染方式显示，整个应用将停止，仅显示错误
     * @method
     * @param {string} [title] - 消息的标题
     * @param {...*} [args] - 消息列表
     */

  }, {
    key: 'errorRender',
    value: function errorRender() {
      if (this._stateError) return;

      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      if (!this._pluginReady) {
        this.showMessageOnRootElement(args);
        return;
      }
      this.trigger.apply(this, ['onRenderMessage'].concat(args));
      this._stateError = true;
    }
    /**
     * 将错误通过notice方式显示
     * @method
     * @param {element} message - 显示的消息
     * @param {object} [props] - 消息显示的ui 属性
     * @param {object} [options] - 消息显示的配置属性
     */

  }, {
    key: 'errorNotice',
    value: function errorNotice() {
      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      if (!this.started) {
        this.showMessageByAlert(args[0]);
        return;
      }
      this.trigger.apply(this, ['onNoticeMessage'].concat(args));
    }

    /**
     * 显示错误到页面，同时将停止app 运行
     * @method
     */

  }, {
    key: 'showMessageOnRootElement',
    value: function showMessageOnRootElement(title, message) {
      (0, _reactDom.render)(_react2.default.createElement(this._ErrorComponent, { title: title, error: (typeof message === 'undefined' ? 'undefined' : (0, _typeof3.default)(message)) === 'object' && message.message || String(message) }), this.getRootElement());
    }

    /**
     * 用alert 方式显示消息
     * @method
     */

  }, {
    key: 'showMessageByAlert',
    value: function showMessageByAlert(message) {
      alert(message);
    }

    // store
    // ---------------------------------------------------
    /**
     * 增加新的actions，暂未实现
     * @param {action[]} actions - action 列表
     */

  }, {
    key: 'bindActionCreators',
    value: function bindActionCreators(actions) {}

    /**
     * 增加新的reduxer，暂未实现
     * @method
     * @param {reduxer[]} reduxers - reduxer 列表
     */

  }, {
    key: 'combineReduxers',
    value: function combineReduxers(reduxers) {}

    /**
     * 分发action
     * @method
     * @param {!action} action - 要发射的action 
     */

  }, {
    key: 'dispatch',
    value: function dispatch(action) {
      if (!action) return;
      app.actionStore.dispatch(action);
    }

    /**
     * 获取数据仓库
     * @method
     * @param {string} [name] - 获取指定名称的仓库，默认为空，获取整个仓库
     * @param {*} [defaultValue] - 没有获取到时的默认值
     */

  }, {
    key: 'getState',
    value: function getState(name, defaultValue) {
      var state = this.actionStore.getState();
      return (name ? state[name] : state) || defaultValue;
    }
  }], [{
    key: 'instance',
    value: function instance() {
      if (_instance) return _instance;

      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return new (Function.prototype.bind.apply(App, [null].concat(args)))();
    }
  }]);
  return App;
}();

exports.default = App;
module.exports = exports['default'];
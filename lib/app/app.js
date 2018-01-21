'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appPlugin = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.createRouteComponent = createRouteComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _containerHoc = require('./containerHoc');

var _containerHoc2 = _interopRequireDefault(_containerHoc);

var _pageHoc = require('./pageHoc');

var _pageHoc2 = _interopRequireDefault(_pageHoc);

var _appComponent = require('./appComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//======================
// functions
//======================

/**
 * 组合页面组件与页面容器，返回raect router使用的组件
 * @function
 * @param {App} app - App实例
 * @param {page} page - 页面组件
 * @param {container} container - 页面容器
 * @return {element} - 返回经过页面组件与页面容器高阶化后的组件
 * @example
 * ```js
 * createRouteComponent(app, page, container);
 * ```
 */
function createRouteComponent(app, page, container) {
  if (!page) return null;
  page = app.pageHoc(app, page);
  container = app.containerHoc(app, container);

  return container ? container(page) : page;
}

/*!
 * @function
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

function routeProps(route, config, app) {
  if (!route || !route.props) return route;
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
        if (true || checkLogin) {
          var originOnEnter = onEnter;
          onEnter = function onEnter(nextState, replace) {
            debugger;console.log(nextState);
            if (originOnEnter && originOnEnter(nextState, replace)) return;

            if (app.user && app.navigator && !app.user.isLogin()) {
              app.trigger('onNavigatePrevent', nextState);
              replace(typeof app.config.paths.Login === 'string' ? app.config.paths.Login : app.config.paths.Login.path);
            }
          };
        }

        // component
        component = createRouteComponent(app, component, container);

        // components
        if (components) {
          Object.keys(components).forEach(function (v) {
            var component = components[v];
            if (component && (typeof component === 'undefined' ? 'undefined' : (0, _typeof3.default)(component)) === 'object') {
              components[v] = createRouteComponent(app, component.component, component.container);
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

/*!
 * @function
 * @param {*} extraArgument 
 */
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(app, dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

/*!
 * @function
 */
function createRootComponent() {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: app.actionStore },
    _react2.default.createElement(
      _reactRouter.Router,
      {
        history: app.options.history || _reactRouter.hashHistory,
        render: function render(props) {
          app.trigger('onNavigated', props);
          return _react2.default.createElement(_reactRouter.RouterContext, props);
        } },
      _react2.default.createElement(
        _reactRouter.Route,
        {
          path: '',
          component: createRouteComponent(app, app.AppComponentPage, app.appComponentContainer) },
        app.routes
      ),
      _react2.default.createElement(_reactRouter.Route, {
        path: '*',
        onEnter: function onEnter() {
          var _app;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (_app = app).trigger.apply(_app, ['onErrorNavigator'].concat(args));
        } })
    )
  );
}

//======================
// app plugin
//======================

/**
 * 应用的基本插件，该插件是第一个添加到应用的插件，实现了应用运行的基本功能
 * **插件 - app ** 该类为插件类扩展了App 的能力 - 依赖插件 `data`
 * app.actions.xxx: 若干方法
 * @class pluginApp
 */

// app action
//-----------------------------------------
var ActionAppReady = 'ActionAppReady';
/**
 * **action** 改变app ready 状态，app ready后，会关闭waiting 动画，显示渲染的内容
 * @method appReady
 * @param {boolean} ready 
 * @example
 * ```js
 * app.actions.appReady(true)
 * ```
 */
var appReady = function appReady(ready) {
  return function (app) {
    app.getPage(0).props.states._page.setValue('ready', ready);
  };
};

/**
 * **action** 显示通知内容
 * @method
 * @param {element|string} message - 消息框内容
 * @param {object} [props] - 消息显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 消息显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeMessage(message);
 * ```
 */
var noticeMessage = function noticeMessage() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeMessage'].concat(args));
  };
};
/**
 * **action** 显示页面加载进度
 * @method
 * @param {boolean} show - 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} [props] - 显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeLoading(true);
 */
var noticeLoading = function noticeLoading() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeLoading'].concat(args));
  };
};

/**
 * 显示阻塞操作的加载页面
 * @method 
 * @param {boolean} show 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} [props] - 显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeBlocking(true);
 */
var noticeBlocking = function noticeBlocking() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeBlocking'].concat(args));
  };
};

var appPlugin = exports.appPlugin = {
  name: 'app',
  dependences: ['data'],

  onCreateStoreBefore: function onCreateStoreBefore(app) {
    Object.assign(app.actions, {
      appReady: appReady,
      noticeMessage: noticeMessage,
      noticeLoading: noticeLoading,
      noticeBlocking: noticeBlocking
    });
  },
  onCreateStore: function onCreateStore(app) {
    var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, [createThunkMiddleware()].concat((0, _toConsumableArray3.default)(app.options.middlewares || [])))(_redux.createStore);
    app.actionStore = createStoreWithMiddleware((0, _redux.combineReducers)(app.reducers), app.options.states);
    app.actions = (0, _redux.bindActionCreators)(app.actions, app.actionStore.dispatch);
  },
  onRender: function onRender(app) {
    app.routes = routeProps(app.routes, app.config, app);
    (0, _reactDom.render)(createRootComponent(), app.getRootElement());
  },
  onErrorNavigator: function onErrorNavigator(app, nextState, replace) {
    app.error('app navigator error', 'no route:' + nextState.location.pathname);
    replace('/');
  },
  onErrorPageRender: function onErrorPageRender(app, error) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'page render error';

    app.error(title, error);
    setTimeout(function () {
      return app.errorRender(title, error);
    }, 0);
    return null;
  },
  onRenderMessage: function onRenderMessage(app, title) {
    for (var _len5 = arguments.length, error = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
      error[_key5 - 2] = arguments[_key5];
    }

    app.showMessageOnRootElement(title, error);
  },
  onNoticeMessage: function onNoticeMessage(app, message) {
    app.showMessageByAlert(message);
  },


  /*！
   * 实现了默认log 显示
   */
  onLog: function onLog(app, type, trace) {
    if (trace) console.trace();

    for (var _len6 = arguments.length, args = Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
      args[_key6 - 3] = arguments[_key6];
    }

    if (type === 'error') {
      var _console;

      (_console = console).error.apply(_console, args);
    } else if (type === 'debug') {
      var _console2;

      (_console2 = console).debug.apply(_console2, args);
    } else {
      var _console3;

      (_console3 = console).log.apply(_console3, args);
    }
  }
};

// app class
//======================
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

var App = function () {

  // constructor
  //--------------------

  /**
   * App 为单例模式，不要直接构造，使用instance 函数构造与获取
   * @constructor
   * @param {object} options - 参数
   * @example
   * ```js
   * options = {
   *   config       // 配置参数，参见config 模块
   *   startEvents  // 启动阶段各个回调函数名称数组，建议不要修改该参数，比如丢失了onRender 事件，将无法显示
   *   plugin       // 插件，参见插件
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
       * @property {object} config app 配置类，参见[config](/#/?name=%2Fbase%2Fconfig)
       */
      this.config = Object.assign(_config2.default, this.options.config || null);
      /**
       * @property {object[]} pages - app 中正在运行的插件列表
       */
      this._plugins = [];
      /**
       * @property {object} pages - 路由表
       */
      this.routes = null;
      /**
       * @property {object[]} pages - app 的action 函数列表
       */
      this.actions = {};
      /**
       * @property {object[]} pages - app 的数据管理器列表
       */
      this.actionStates = {};
      /**
       * @property {object[]} pages - app 中正在运行的reduxer 列表
       */
      this.reducers = {};
      /**
       * @property {object[]} pages - app 中正在运行的页面的列表
       */
      this.pages = [];

      /**
       * @property {object} AppComponentPage - app 默认跟页面 Page，已设置默认，一般无需修改
       */
      this.AppComponentPage = _appComponent.AppComponentPage;

      /**
       * @property {object} appComponentContainer - app 默认跟页面 Container，已设置默认，一般无需修改
       */
      this.appComponentContainer = _appComponent.appComponentContainer;

      /**
       * @property {object} pageHoc - app 默认页面Page 高阶组件，已设置默认，一般无需修改
       */
      this.pageHoc = _pageHoc2.default;

      /**
       * @property {object} containerHoc - app 默认Container 转换函数，已设置默认，一般无需修改
       */
      this.containerHoc = _containerHoc2.default;

      /**
       * @property {element} ErrorComponent - app 默认显示页面错误的组件，已设置默认，一般无需修改
       */
      this.ErrorComponent = function (props) {
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

      /**
       * @property {element} WaitingComponent - app 默认等待页面组件，已设置默认，一般无需修改
       */
      this.WaittingComponent = function (props) {
        var styleSetFull = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%' };
        var styleSetCenter = { marginTop: '4rem', textAlign: 'center' };
        return _react2.default.createElement(
          'div',
          { style: (0, _extends3.default)({}, styleSetFull, styleSetCenter) },
          '...'
        );
      };

      this.options.plugin && this.use(this.options.plugin);
    }

    _instance = this;
    window.app = _instance;
    return _instance;
  }
  /*!
   * 单例模式
   * @param {*} args 
   */


  (0, _createClass3.default)(App, [{
    key: 'getRootElement',


    // dom
    //--------------------
    /**
     * 获取root 元素
     * @method
     */
    value: function getRootElement() {
      return document.getElementById(this.options.domIdRoot || 'root');
    }

    /**
     * 显示错误到页面，同时将停止app 运行
     * @method
     */

  }, {
    key: 'showMessageOnRootElement',
    value: function showMessageOnRootElement(title, message) {
      (0, _reactDom.render)(_react2.default.createElement(this.ErrorComponent, { title: title, error: message }), this.getRootElement());
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

    // pages
    // -------------------

    /**
     * 获取app 中的页面
     * @method
     * @param {string|number} name - 
     * **默认**：获取最后的页面，即当前焦点页面
     * **空字符串，'/'，0**：获取app 根页面
     * **number**：按页面序号获取
     * **string**：按页面displayName获取
     */

  }, {
    key: 'getPage',
    value: function getPage(name) {
      if (name === undefined) {
        return this.pages[this.pages.length - 1];
      } else if (name === '' || name === '/' || name === 0) {
        return this.pages[0];
      } else if (typeof name === 'number') {
        return this.pages[name];
      } else if (typeof name === 'string') {
        return this.pages.find(function (v) {
          return v.props.displayName === name;
        });
      } else {
        return name;
      }
    }

    // plugins 
    //--------------------

    /**
     * 添加插件到应用中，插件需要符合标准
     * @method
     * @param {!object} plugin - 插件
     */

  }, {
    key: 'use',
    value: function use(plugin) {
      var _this = this;

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

            if (!_this._plugins.find(function (v) {
              return v.name === dependence;
            })) {
              var _title = 'app plugin error';
              var _error = 'plugin:' + plugin.name + ' dependence:' + dependence + ' not ready';
              _this.error(_title, _error);
              _this.errorRender(_title, _error);
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
      var _this2 = this;

      this._plugins.filter(v.name === name).forEach(function (v) {
        _this2._plugins.remove(v);
      });
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

      for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _v = _step2.value;

          try {
            ret = _v[event] && _v[event].apply(_v, [this].concat(args));
            if (ret) {
              return ret;
            }
          } catch (e) {
            this.error('app trigger error', e);
            this.errorNotice(e, { title: 'app trigger error' });
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (this.pages || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _v2 = _step3.value;

          try {
            var _v2$props$container$h;

            ret = _v2.props.container.handlers[event] && (_v2$props$container$h = _v2.props.container.handlers)[event].apply(_v2$props$container$h, args);
            if (ret) {
              return ret;
            }
          } catch (e) {
            this.error('app trigger error', e);
            this.errorNotice(e, { title: 'app trigger error' });
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

      return ret;
    }

    // start
    //--------------------

    /**
     * 应用程序启动
     * @method start
     */

  }, {
    key: 'start',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, event, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _v3;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.use(appPlugin);
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
                _context.t0 = _v3[event];

                if (!_context.t0) {
                  _context.next = 22;
                  break;
                }

                _context.next = 21;
                return _v3[event](this);

              case 21:
                _context.t0 = _context.sent;

              case 22:
                if (!_context.t0) {
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
                _context.t1 = _context['catch'](13);
                _didIteratorError5 = true;
                _iteratorError5 = _context.t1;

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
                _context.t2 = _context['catch'](6);
                _didIteratorError4 = true;
                _iteratorError4 = _context.t2;

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
                _context.next = 66;
                break;

              case 61:
                _context.prev = 61;
                _context.t3 = _context['catch'](2);

                this.error('app start error', _context.t3);
                this.errorRender('app start error', _context.t3);
                return _context.abrupt('return', _context.t3);

              case 66:
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
    //--------------------

    /**
     * 打印日志-普通级别
     * @method
     * @param {...*} args - 日志列表
     */

  }, {
    key: 'log',
    value: function log() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      if (!this._pluginReady) {
        var _console4;

        (_console4 = console).log.apply(_console4, args);
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

      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      if (!this._pluginReady) {
        var _console5;

        (_console5 = console).log.apply(_console5, args);
        return;
      }
      this.trigger.apply(this, ['onLog', null, false].concat(args));
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

      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      if (!this._pluginReady) {
        var _console6;

        (_console6 = console).log.apply(_console6, args);
        return;
      }
      this.trigger.apply(this, ['onLog', null, false].concat(args));
    }
    /**
     * 打印日志-错误级别
     * @method
     * @param {...*} args - 日志列表
     */

  }, {
    key: 'error',
    value: function error() {
      for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      if (!this._pluginReady) {
        var _console7;

        (_console7 = console).error.apply(_console7, args);
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

      for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
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
      for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }

      if (!this._pluginReady) {
        this.showMessageByAlert(args);
        return;
      }
      this.trigger.apply(this, ['onNoticeMessage'].concat(args));
    }

    // store
    // -----------------

  }, {
    key: 'bindActionCreators',
    value: function bindActionCreators(actions) {}
  }, {
    key: 'combineReducers',
    value: function combineReducers(reducers) {}

    /**
     * 分发action
     * @method
     * @param {object} action - 要发射的action 
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

      for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }

      return new (Function.prototype.bind.apply(App, [null].concat(args)))();
    }
  }]);
  return App;
}();

// plugin
//======================

/**
 * 插件实现回调函数，app 触发相应时间时被调用，完成对app 的初始化和配置及实现特定的功能
 * 回调函数可能是初始化函数，启动阶段的各个函数或者由app，页面或者其他插件trigger 的事件
 * @class plugin
 * @example
 * ```js
 * let plugin = {
 *   name: 'xxx',
 *   dependence: 'yyy',
 *   init(app) {
 *     ... 
 *   },
 *   onZZZ(app) {
 *     ... 
 *   }
 * }
 * ```
 */

/**
 * @property {string} name - 插件名称，同名称插件不能同时使用
 */

/**
 * @property {string|string[]} dependence - 该插件依赖的插件或插件列表
 */

/**
 * 当插件被安装到app 时触发，该阶段可以初始化插件和修改app 的内容
 * @callback init
 * @param {App} app - 应用程序App的实例
 */

/**
 * 当启动阶段中，进入配置过程前触发，该阶段可以从网络获取配置信息
 * @callback onConfigBefore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入配置过程时触发，该阶段可以增加和修改app 的默认配置
 * @callback onConfig
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入css 样式加载过程时触发，该阶段可以从网络引入css 样式文件
 * @callback onImportStyles
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成css 样式加载过程时触发，该阶段可以对加载后的css 样式进行覆盖修改和添加新的css 样式
 * @callback onImportStylesAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入数据仓库建立阶段前触发，该阶段每个应用可以将action 或者 reduxer 添加进来，丰富app 的功能
 * @callback onCreateStoreBefore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入仓库建立阶段触发，app plugin 在该阶段完成数据仓库的建立，各个应用一般无需参与
 * @callback onCreateStore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成仓库建立阶段后触发，
 * @callback onCreateStoreAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入路由配置阶段时触发，每个应用必须实现该回调函数，并设置app.routes 参数，app 才可以正常运行
 * @callback onImportRoutes
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成路由配置阶段时触发，该阶段可以修改由路由生成的app.config.paths 的路径信息
 * @callback onImportRoutesAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当在启动过程进入hook 阶段时触发，该阶段可以修改app 的默认行为
 * @callback onHook
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段结束，开始react 渲染时触发，app plugin 将会负责渲染，各个应用一般无需参与
 * @callback onRender
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段结束后，进入应用运行阶段，应用将要启动时触发
 * @callback onAppWillStart
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用已完成启动时触发
 * @callback onAppStart
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用已停止时触发
 * @callback onAppStop
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用从后台返回时触发，仅混合开发时有效
 * @callback onAppResume
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用切换到后台时触发，仅混合开发时有效
 * @callback onAppPause
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当页面组件render错误时触发
 * @callback onErrorPageRender
 * @param {Error} error - 页面render 的异常信息对象
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当导航到新的页面时触发
 * @callback onNavigated
 * @param {object} props - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当当前导航被阻止时触发
 * @callback onNavigatePrevent
 * @param {object} props - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当导航出错时触发，比如无法匹配的导航路径等问题
 * @callback onErrorNavigator
 * @param {object} nextState - 页面路由信息，参见[react-router3 route-onEnter函数]()
 * @param {function} replace - 调用后可重定向路径的函数，参见[react-router3 route-onEnter函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要打印日志时触发
 * @callback onLog
 * @param {string} type - debug|error|verbose，表示日志的等级
 * @param {boolean} trace - 是否打印trace
 * @param {...*} args - 日志的列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要以页面render方式显示信息时触发
 * @callback onRenderMessage
 * @param {string} title - 消息的标题
 * @param {...*} [args] - 消息列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要以notice方式显示信息时触发
 * @callback onNoticeMessage
 * @param {element|string} message - 显示的消息
 * @param {object} [props] - 消息显示的ui 属性
 * @param {object} [options] - 消息显示的配置属性
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */


exports.default = App;
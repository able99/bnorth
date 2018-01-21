'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appPluginAfter = exports.appPluginBefore = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _containerHoc = require('./containerHoc');

var _containerHoc2 = _interopRequireDefault(_containerHoc);

var _pageHoc = require('./pageHoc');

var _pageHoc2 = _interopRequireDefault(_pageHoc);

var _appComponent = require('./appComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 应用的基本插件，该插件是第一个添加到应用的插件，实现了应用运行的基本功能
 * **插件** 该类为插件类扩展了App 的能力
 * app.actions.xxx: 若干方法
 * @class pluginApp
 */

// app action
//-----------------------------------------
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var ActionAppReady = 'ActionAppReady';
/**
 * 改变app ready 状态，app ready后，会关闭waiting 动画，显示渲染的内容
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
 * 显示通知内容
 * @method
 * @param {element|string} message - 消息框内容
 * @param {object} options - 参数对象，具体由实现onNoticeMessage 事件的插件所决定
 * @example
 * ```js
 * app.actions.noticeMessage(message);
 * ```
 */
var noticeMessage = function noticeMessage() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeMessage'].concat(args));
  };
};
/**
 * 显示页面加载进度
 * @method
 * @param {boolean} show - 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} options - 参数对象，具体由实现onNoticeLoading 事件的插件所决定
 * @example
 * ```js
 * app.actions.noticeLoading(true);
 */
var noticeLoading = function noticeLoading() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeLoading'].concat(args));
  };
};
/**
 * 显示阻塞操作的加载页面
 * @method 
 * @param {boolean} show 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} options Loader 属性,具体参见 [Loader 组件](../components/Loader.md)
 * * @example
 * ```js
 * app.actions.noticeBlocking(true);
 */
var noticeBlocking = function noticeBlocking() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeBlocking'].concat(args));
  };
};

// funtions
//-----------------------------------------
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
  page = (0, _pageHoc2.default)(app, page);
  container = (0, _containerHoc2.default)(app, container);

  return container ? container(page) : page;
}

/*!
 * @function
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
        if (checkLogin) {
          var originOnEnter = onEnter;
          onEnter = function onEnter(nextState, replace) {
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

// app plugin
//-----------------------------------------
/*!
 * 最先加载的插件
 * @class
 */
var appPluginBefore = exports.appPluginBefore = {
  name: 'app-init',

  init: function init(app) {
    app.bindActionCreators = function (actions) {};

    app.combineReducers = function (reducers) {};
    app.dispatch = function (action) {
      if (!action) return;
      app.actionStore.dispatch(action);
    };
    app.getState = function (name, defaultValue) {
      var state = this.actionStore.getState();
      return (name ? state[name] : state) || defaultValue;
    };

    app.AppComponentPage = _appComponent.AppComponentPage;
    app.appComponentContainer = _appComponent.appComponentContainer;
    app.pageHoc = _pageHoc2.default;
    app.containerHoc = _containerHoc2.default;
    app.ErrorComponent = function (props) {
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
  }
};

/*!
 * 最加载的插件
 * @class
 */
var appPluginAfter = exports.appPluginAfter = {
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

    var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, [createThunkMiddleware()].concat((0, _toConsumableArray3.default)(app.options.middlewares || [])))(_redux.createStore);
    app.actionStore = createStoreWithMiddleware((0, _redux.combineReducers)(app.reducers), app.options.states);
    app.actions = (0, _redux.bindActionCreators)(app.actions, app.actionStore.dispatch);
  },
  onRender: function onRender(app) {
    app.routes = routeProps(app.routes, app.config, app);
    (0, _reactDom.render)(_react2.default.createElement(
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
            component: createRouteComponent(app, _appComponent.AppComponentPage, _appComponent.appComponentContainer) },
          app.routes
        ),
        _react2.default.createElement(_reactRouter.Route, {
          path: '*',
          onEnter: function onEnter() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            return app.trigger.apply(app, ['onErrorNavigator'].concat(args));
          } })
      )
    ), app.domRoot);
  },
  onErrorNavigator: function onErrorNavigator(app, nextState, replace) {
    app.error('app-navigator error:', 'no route-', nextState.location.pathname);
    replace('/');
  },
  onErrorPageRender: function onErrorPageRender(app, error, title) {
    title = title || 'page render error';
    app.error(error, title);
    setTimeout(function () {
      return app.errorRender(error, title);
    }, 0);
    return null;
  },
  onRenderMessage: function onRenderMessage(app, error, title) {
    (0, _reactDom.render)(_react2.default.createElement(app.ErrorComponent, { title: title, error: error }), app.domRoot);
  },
  onLog: function onLog(app, type, trace) {
    if (trace) console.trace();

    for (var _len5 = arguments.length, args = Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
      args[_key5 - 3] = arguments[_key5];
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
  },
  onNavigated: function onNavigated(app, location) {
    app.pages.forEach(function (v) {
      return v.props.container.handlers.onRoute && v.props.container.handlers.onRoute(location);
    });
  }
};
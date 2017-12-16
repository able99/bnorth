'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appPluginAfter = exports.appPluginBefore = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.reducerApp = reducerApp;

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

// app action
//-----------------------------------------
var ActionAppReady = 'ActionAppReady';
function appReady(ready) {
  return {
    type: ActionAppReady,
    ready: ready
  };
}

var ActionAppLayerAdd = 'ActionAppLayerAdd';
function appLayerAdd(layer, cb) {
  cb && cb(layer);
  return {
    type: ActionAppLayerAdd,
    layer: layer
  };
}
var ActionAppLayerRemove = 'ActionAppLayerRemove';
function appLayerRemove(layer) {
  return {
    type: ActionAppLayerRemove,
    layer: layer
  };
}
var ActionAppLayerUpdate = 'ActionAppLayerUpdate';
function appLayerUpdate(layer, props, cb) {
  var newer = (0, _react.cloneElement)(layer, (0, _extends3.default)({}, layer.props, props));
  cb && cb(newer);
  return {
    type: ActionAppLayerUpdate,
    layer: layer,
    newer: newer
  };
}

var noticeMessage = function noticeMessage() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeMessage'].concat(args));
  };
};
var noticeLoading = function noticeLoading() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeLoading'].concat(args));
  };
};
var noticeBlocking = function noticeBlocking() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return function (app) {
    app.trigger.apply(app, ['onNoticeBlocking'].concat(args));
  };
};

function reducerApp() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    ready: true,
    layers: []
  };
  var action = arguments[1];

  switch (action.type) {
    // ready
    case ActionAppReady:
      return Object.assign({}, state, { ready: action.ready });

    // layers
    case ActionAppLayerAdd:
      {
        return Object.assign({}, state, { layers: [].concat((0, _toConsumableArray3.default)(state.layers), [action.layer]) });
      }
    case ActionAppLayerRemove:
      {
        return Object.assign({}, state, { layers: state.layers.filter(function (v) {
            return v !== action.layer;
          }) });
      }
    case ActionAppLayerUpdate:
      {
        return Object.assign({}, state, { layers: state.layers.map(function (v) {
            return v !== action.layer ? v : action.newer;
          }) });
      }

    //default
    default:
      return state;
  }
}

// funtions
//-----------------------------------------
function createRouteComponent(app, page, container) {
  if (!page) return null;
  page = (0, _pageHoc2.default)(app, page);
  container = (0, _containerHoc2.default)(app, container);

  return container ? container(page) : page;
}

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
var appPluginBefore = exports.appPluginBefore = {
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

var appPluginAfter = exports.appPluginAfter = {
  onCreateStoreBefore: function onCreateStoreBefore(app) {
    Object.assign(app.actions, {
      appReady: appReady,
      appLayerAdd: appLayerAdd,
      appLayerRemove: appLayerRemove,
      appLayerUpdate: appLayerUpdate,
      noticeMessage: noticeMessage,
      noticeLoading: noticeLoading,
      noticeBlocking: noticeBlocking
    });

    app.reducers.app = reducerApp;
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
  }
};
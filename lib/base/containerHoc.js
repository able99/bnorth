'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = function (app, acontainer) {
  if (Array.isArray(acontainer)) return _reactRedux.connect.apply(undefined, (0, _toConsumableArray3.default)(acontainer));

  var mapState = function mapState(state, props) {
    var container = getContainer(app, props, acontainer, function (container) {
      container.actions = (0, _redux.bindActionCreators)(container.actions, app.actionStore.dispatch);
    });

    var ret = {};
    if (!container) return ret;
    Object.entries(container.reducers || {}).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          key = _ref2[0],
          v = _ref2[1];

      if (v === true) ret["state_" + key] = state[v === true ? key : v];
    });
    Object.entries(container.states || {}).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
          key = _ref4[0],
          v = _ref4[1];

      ret["state_" + key] = v.state;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(v.states || {})[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
              skey = _step2$value[0],
              val = _step2$value[1];

          ret['state_' + key + '_' + skey] = val;
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
    });
    return ret;
  };

  var mapDispatch = function mapDispatch(dispatch, props) {
    var container = getContainer(app, props, acontainer);
    if (!container) return { app: app };

    return {
      app: app,
      container: container,
      states: container.states,

      onWillStart: function onWillStart(page) {
        if (container.handlers.onWillStart) container.handlers.onWillStart(app, page, container);
      },
      onStart: function onStart(page) {
        if (container.handlers.onStart) container.handlers.onStart(app, page, container);
        Object.values(container.states || {}).forEach(function (v) {
          v.onStart();
        });
      },
      onPause: function onPause(page) {
        if (container.handlers.onPause) container.handlers.onPause(app, page, container);
      },
      onResume: function onResume(page) {
        if (container.handlers.onResume) container.handlers.onResume(app, page, container);
        Object.values(container.states || {}).forEach(function (v) {
          v.onResume();
        });
      },
      onStop: function onStop(page) {
        if (container.handlers.onStop) container.handlers.onStop(app, page, container);
        Object.values(container.states || {}).forEach(function (v) {
          v.onStop();
        });
      }
    };
  };

  return (0, _reactRedux.connect)(mapState, mapDispatch);
};

var _reactRedux = require('react-redux');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContainerKey(app, props) {
  var key = 'ck';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = props.routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;

      if (route.path) {
        key += '-' + route.path;
      }
      if (route === props.route) {
        break;
      }
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

  return key;
}
function getContainer(app, props, acontainer, cb) {
  if (!acontainer) return;
  var key = getContainerKey(app, props);
  var container = acontainer[key];

  if (!container) {
    container = {
      states: app.actionStates.data ? { data: app.actionStates.data() } : {},
      reducers: {},
      actions: {},
      handlers: {}
    };

    if (acontainer !== true) {
      try {
        acontainer(app, props, container);
      } catch (e) {
        app.error(e);
        app.errorRender(e, 'container error');
      }
      acontainer[key] = container;
    }
    cb && cb(container);
  }

  return container;
}

module.exports = exports['default'];
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
    var container = _BaseContainer2.default.getContainer(app, props, acontainer, function (container) {
      container.actions = (0, _bindActionCreators2.default)(container.actions, app.actionStore.dispatch);
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(v.states || {})[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              skey = _step$value[0],
              val = _step$value[1];

          ret['state_' + key + '_' + skey] = val;
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
    });
    return ret;
  };

  var mapDispatch = function mapDispatch(dispatch, props) {
    var container = _BaseContainer2.default.getContainer(app, props, acontainer);
    if (!container) return { app: app };

    return {
      app: app,
      container: container,
      states: container.states,

      onWillStart: function onWillStart(page) {
        container.displayName = page.getDisplayName();
        container.trigger('onWillStart', page);
        Object.entries(container.states || {}).forEach(function (_ref5) {
          var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
              k = _ref6[0],
              v = _ref6[1];

          return v.displayName = page.getDisplayName();
        });
      },
      onStart: function onStart(page) {
        container.trigger('onStart', page);
        Object.entries(container.states || {}).forEach(function (_ref7) {
          var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
              k = _ref8[0],
              v = _ref8[1];

          return v.trigger('onStart');
        });
      },
      onResume: function onResume(page) {
        container.trigger('onResume', page);
        Object.entries(container.states || {}).forEach(function (_ref9) {
          var _ref10 = (0, _slicedToArray3.default)(_ref9, 2),
              k = _ref10[0],
              v = _ref10[1];

          return v.trigger('onResume');
        });
      },
      onPause: function onPause(page) {
        container.trigger('onPause', page);
        Object.entries(container.states || {}).forEach(function (_ref11) {
          var _ref12 = (0, _slicedToArray3.default)(_ref11, 2),
              k = _ref12[0],
              v = _ref12[1];

          return v.trigger('onPause');
        });
      },
      onStop: function onStop(page) {
        container.clear(props, acontainer);
        container.trigger('onStop', page);
        Object.entries(container.states || {}).forEach(function (_ref13) {
          var _ref14 = (0, _slicedToArray3.default)(_ref13, 2),
              k = _ref14[0],
              v = _ref14[1];

          return v.trigger('onStop');
        });
      }
    };
  };

  return (0, _reactRedux.connect)(mapState, mapDispatch);
};

var _reactRedux = require('react-redux');

var _bindActionCreators = require('../utils/bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _BaseContainer = require('./BaseContainer');

var _BaseContainer2 = _interopRequireDefault(_BaseContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

module.exports = exports['default'];

/*!
 * create container use container function
 * @function
 * @param {App} app - instance of App class
 * @param {function} container - container function
 */
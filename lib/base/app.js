'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _appPlugin = require('./appPlugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _instance = null;

var App = function () {
  (0, _createClass3.default)(App, null, [{
    key: 'instance',

    // constructor
    //--------------------
    value: function instance() {
      if (_instance) return _instance;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(App, [null].concat(args)))();
    }
  }]);

  function App(options) {
    (0, _classCallCheck3.default)(this, App);

    if (!_instance) {
      this.options = options || {};
      this.config = Object.assign(_config2.default, this.options.config || null);
      this._startEvents = options.startEvents || ['onConfigBefore', 'onConfig', 'onImportStyles', 'onImportStylesAfter', 'onCreateStoreBefore', 'onCreateStore', 'onCreateStoreAfter', 'onImportRoutes', 'onImportRoutesAfter', 'onHook', 'onRender'];

      this.stateError = false;
      this._plugins = [];
      this.routes = null;
      this.actions = {};
      this.actionStates = {};
      this.reducers = {};
      this.pages = [];

      this.use(_appPlugin.appPluginBefore);
      this.options.plugin && this.use(this.options.plugin);
    }

    _instance = this;
    window.app = _instance;
    return _instance;
  }

  // dom
  //--------------------


  (0, _createClass3.default)(App, [{
    key: 'removeWaiting',
    value: function removeWaiting() {
      this.domWaiting && this.domWaiting.remove();
    }

    // plugins 
    //--------------------

  }, {
    key: 'use',
    value: function use(plugin) {
      this._plugins.push(plugin);
      plugin.init && plugin.init(this);
    }
  }, {
    key: 'unuse',
    value: function unuse(plugin) {
      this._plugins.remove(plugin);
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      var ret = void 0;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          try {
            ret = v[event] && v[event].apply(v, [this].concat(args));
            if (ret) {
              return ret;
            }
          } catch (e) {
            this.error(e);
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

      return ret;
    }

    // start
    //--------------------

  }, {
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, event, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, v;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.use(_appPlugin.appPluginAfter);
                _context.prev = 1;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 5;
                _iterator2 = this._startEvents[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 43;
                  break;
                }

                event = _step2.value;
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 12;
                _iterator3 = this._plugins[Symbol.iterator]();

              case 14:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context.next = 26;
                  break;
                }

                v = _step3.value;
                _context.t0 = v[event];

                if (!_context.t0) {
                  _context.next = 21;
                  break;
                }

                _context.next = 20;
                return v[event](this);

              case 20:
                _context.t0 = _context.sent;

              case 21:
                if (!_context.t0) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt('continue', 23);

              case 23:
                _iteratorNormalCompletion3 = true;
                _context.next = 14;
                break;

              case 26:
                _context.next = 32;
                break;

              case 28:
                _context.prev = 28;
                _context.t1 = _context['catch'](12);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t1;

              case 32:
                _context.prev = 32;
                _context.prev = 33;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 35:
                _context.prev = 35;

                if (!_didIteratorError3) {
                  _context.next = 38;
                  break;
                }

                throw _iteratorError3;

              case 38:
                return _context.finish(35);

              case 39:
                return _context.finish(32);

              case 40:
                _iteratorNormalCompletion2 = true;
                _context.next = 7;
                break;

              case 43:
                _context.next = 49;
                break;

              case 45:
                _context.prev = 45;
                _context.t2 = _context['catch'](5);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t2;

              case 49:
                _context.prev = 49;
                _context.prev = 50;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 52:
                _context.prev = 52;

                if (!_didIteratorError2) {
                  _context.next = 55;
                  break;
                }

                throw _iteratorError2;

              case 55:
                return _context.finish(52);

              case 56:
                return _context.finish(49);

              case 57:
                _context.next = 64;
                break;

              case 59:
                _context.prev = 59;
                _context.t3 = _context['catch'](1);

                this.error(_context.t3);
                this.errorRender(_context.t3);
                return _context.abrupt('return', _context.t3);

              case 64:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 59], [5, 45, 49, 57], [12, 28, 32, 40], [33,, 35, 39], [50,, 52, 56]]);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()

    // interface
    //--------------------

  }, {
    key: 'log',
    value: function log() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.trigger.apply(this, ['onLog', null, false].concat(args));
    }
  }, {
    key: 'debug',
    value: function debug() {
      if (!this.config.debug) return;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.trigger.apply(this, ['onLog', null, false].concat(args));
    }
  }, {
    key: 'verbose',
    value: function verbose() {
      if (!this.config.verbose) return;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.trigger.apply(this, ['onLog', null, false].concat(args));
    }
  }, {
    key: 'error',
    value: function error() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this.trigger.apply(this, ['onLog', 'error', true].concat(args));
    }
  }, {
    key: 'errorRender',
    value: function errorRender() {
      if (this.stateError) return;

      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this.trigger.apply(this, ['onRenderMessage'].concat(args));
      this.stateError = true;
    }
  }, {
    key: 'errorNotice',
    value: function errorNotice() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this.trigger.apply(this, ['onNoticeMessage'].concat(args));
    }
  }, {
    key: 'domRoot',
    get: function get() {
      return document.getElementById(this.options.domIdRoot || 'root');
    }
  }, {
    key: 'domWaiting',
    get: function get() {
      return document.getElementById(this.options.domIdWaiting || 'waiting');
    }
  }]);
  return App;
}();

/**
 * onAction,
 * onStateChange,
 * onReducer,
 */


exports.default = App;
module.exports = exports['default'];
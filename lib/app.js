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

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _context2 = require('./context');

var _context3 = _interopRequireDefault(_context2);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  function App() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, App);

    // app props
    // ----------------------------
    this._startEvents = ['onAppStarting', 'onAppStartConfig', 'onAppStartRouter', 'onAppStartContext', 'onAppStartHack', 'onAppStartRender', 'onAppStarted'];
    this.name = options.name || 'app';
    this.options = options;

    // app core modal
    // ----------------------------
    this.Utils = this.options.Utiles || _utils2.default;
    this.utils = new this.Utils(this, options);
    this.Log = this.options.Log || _log2.default;
    this.log = new this.Log(this, options);
    this.Event = this.options.Event || _event2.default;
    this.event = new this.Event(this, this.name);
    this.Config = this.options.Config || _config2.default;
    this.config = new this.Config(this, options);
    this.Plugins = this.options.Plugins || _plugins2.default;
    this.plugins = new this.Plugins(this, options);
    this.Context = this.options.Context || _context3.default;
    this.context = new this.Context(this, options);
    this.State = _state2.default;
    this.states = {};
    this.Page = _page2.default;
    this.Router = this.options.Router || _router2.default;
    this.router = new this.Router(this, options);
    this.Render = this.options.Render || _render2.default;
    this.render = new this.Render(this, options);
    this.Keyboard = this.options.Keyboard || _keyboard2.default;
    this.keyboard = new this.Keyboard(this, options);

    // app init
    // ----------------------------
    window.app = this;
    if (this.options.plugin) {
      !this.options.plugin.pluginName && (this.options.plugin.pluginName = '_$user');
      this.plugins.add(this.options.plugin);
    }
  }

  (0, _createClass3.default)(App, [{
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, event;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.log.info('app start');
                _context.prev = 1;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = this._startEvents[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 15;
                  break;
                }

                event = _step.value;
                _context.next = 11;
                return this.event.emitSync(this, event, this);

              case 11:
                this.event.delete(event, this);

              case 12:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 21:
                _context.prev = 21;
                _context.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 24:
                _context.prev = 24;

                if (!_didIteratorError) {
                  _context.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context.finish(24);

              case 28:
                return _context.finish(21);

              case 29:
                _context.next = 36;
                break;

              case 31:
                _context.prev = 31;
                _context.t1 = _context['catch'](1);

                this.log.error('app start', _context.t1);
                this.render.critical(_context.t1, { title: 'app start error' });
                return _context.abrupt('return', _context.t1);

              case 36:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 31], [5, 17, 21, 29], [22,, 24, 28]]);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }]);
  return App;
}();

exports.default = App;
module.exports = exports['default'];
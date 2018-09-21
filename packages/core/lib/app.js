"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = _interopRequireDefault(require("./utils"));

var _log = _interopRequireDefault(require("./log"));

var _event = _interopRequireDefault(require("./event"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _state = _interopRequireDefault(require("./state"));

var _page = _interopRequireDefault(require("./page"));

var _router = _interopRequireDefault(require("./router"));

var _context2 = _interopRequireDefault(require("./context"));

var _render = _interopRequireDefault(require("./render"));

var _keyboard = _interopRequireDefault(require("./keyboard"));

var App =
/*#__PURE__*/
function () {
  function App() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, App);
    // app props
    // ----------------------------
    this._startEvents = ['onAppStarting', 'onAppStartConfig', 'onAppStartRouter', 'onAppStartContext', 'onAppStartHack', 'onAppStartRender', 'onAppStarted'];
    this._id = options._id || '^app';
    this.options = options; // app core modal
    // ----------------------------

    this.State = _state.default;
    this.Page = _page.default;
    this.Utils = this.options.Utiles || _utils.default;
    this.utils = new this.Utils(this, options);
    this.Log = this.options.Log || _log.default;
    this.log = new this.Log(this, options);
    this.Event = this.options.Event || _event.default;
    this.event = new this.Event(this, options);
    this.Plugins = this.options.Plugins || _plugins.default;
    this.plugins = new this.Plugins(this, options);
    this.Keyboard = this.options.Keyboard || _keyboard.default;
    this.keyboard = new this.Keyboard(this, options);
    this.Context = this.options.Context || _context2.default;
    this.context = new this.Context(this, options);
    this.Router = this.options.Router || _router.default;
    this.router = new this.Router(this, options);
    this.Render = this.options.Render || _render.default;
    this.render = new this.Render(this, options); // app init
    // ----------------------------

    window.app = this;

    if (this.options.plugin) {
      this.options.plugin._id = this._id;
      this.plugins.add(this.options.plugin);
    }
  }

  (0, _createClass2.default)(App, [{
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

        return _regenerator.default.wrap(function _callee$(_context) {
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

                v = _step.value;
                _context.next = 11;
                return this.event.emitSync(this._id, v, this);

              case 11:
                this.event.delete(v, this._id);

              case 12:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 21:
                _context.prev = 21;
                _context.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
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
                _context.t1 = _context["catch"](1);
                this.log.error('app start', _context.t1);
                this.render.critical(_context.t1, {
                  title: 'app start error'
                });
                return _context.abrupt("return", _context.t1);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 31], [5, 17, 21, 29], [22,, 24, 28]]);
      }));

      return function start() {
        return _start.apply(this, arguments);
      };
    }()
  }]);
  return App;
}();

exports.default = App;
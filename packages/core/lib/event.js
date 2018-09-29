"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find-index");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/modules/es6.function.name");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Event =
/*#__PURE__*/
function () {
  function Event(app) {
    (0, _classCallCheck2.default)(this, Event);
    this.app = app;
    this._listener = {};
    this._events = {};
  }

  (0, _createClass2.default)(Event, [{
    key: "_getTargetEventName",
    value: function _getTargetEventName(targetId, eventName) {
      return "!".concat(eventName, "@").concat(targetId);
    }
  }, {
    key: "_addListener",
    value: function _addListener(targetId, eventName, callback, ownerId, once) {
      var _this = this;

      var name = this._getTargetEventName(targetId, eventName);

      if (!this._listener[name]) this._listener[name] = [];

      this._listener[name].push({
        callback: callback,
        ownerId: ownerId,
        once: once
      });

      return function () {
        return _this.off(callback);
      };
    }
  }, {
    key: "_trigger",
    value: function () {
      var _trigger2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(targetId, eventName) {
        var name,
            _len,
            args,
            _key,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            _step$value,
            callback,
            once,
            ret,
            _args = arguments;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = this._getTargetEventName(targetId, eventName);

                for (_len = _args.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                  args[_key - 2] = _args[_key];
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = (this._listener[name] || [])[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 18;
                  break;
                }

                _step$value = _step.value, callback = _step$value.callback, once = _step$value.once;
                _context.next = 11;
                return callback.apply(void 0, args);

              case 11:
                ret = _context.sent;
                if (once) this.off(callback);

                if (!ret) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return", ret);

              case 15:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 18:
                _context.next = 24;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 24:
                _context.prev = 24;
                _context.prev = 25;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 27:
                _context.prev = 27;

                if (!_didIteratorError) {
                  _context.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context.finish(27);

              case 31:
                return _context.finish(24);

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 20, 24, 32], [25,, 27, 31]]);
      }));

      return function _trigger(_x, _x2) {
        return _trigger2.apply(this, arguments);
      };
    }()
  }, {
    key: "on",
    value: function on(targetId, eventName, callback, ownerId) {
      return this._addListener(targetId, eventName, callback, ownerId, false);
    }
  }, {
    key: "once",
    value: function once(targetId, eventName, callback, ownerId) {
      return this._addListener(targetId, eventName, callback, ownerId, true);
    }
  }, {
    key: "off",
    value: function off(item) {
      var _this2 = this;

      if (!item) return;
      Object.entries(this._listener).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        var index = v.findIndex(function (v) {
          return v && (v.callback === item || v.ownerId === item);
        });
        if (index >= 0) v.splice(index, 1);
        if (!v.length) delete _this2._listener[k];
      });
    }
  }, {
    key: "delete",
    value: function _delete(targetId, eventName) {
      var name = eventName ? this._getTargetEventName(targetId, eventName) : targetId;
      delete this._listener[name];
    }
  }, {
    key: "emit",
    value: function emit(targetId, eventName) {
      var _this3 = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      //return new Promise(()=>this._trigger(targetId, eventName, ...args));
      return setTimeout(function () {
        return _this3._trigger.apply(_this3, [targetId, eventName].concat(args));
      }, 40);
    }
  }, {
    key: "emitSync",
    value: function () {
      var _emitSync = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(targetId, eventName) {
        var _len3,
            args,
            _key3,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                for (_len3 = _args2.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                  args[_key3 - 2] = _args2[_key3];
                }

                _context2.next = 3;
                return this._trigger.apply(this, [targetId, eventName].concat(args));

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function emitSync(_x3, _x4) {
        return _emitSync.apply(this, arguments);
      };
    }()
  }]);
  return Event;
}();

exports.default = Event;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
    key: "_getEventName",
    value: function _getEventName(event, target) {
      return "&".concat(event, "@@").concat(target ? target.name || target.pluginName : '');
    }
  }, {
    key: "_addListener",
    value: function _addListener(target, event, callback, tag, once) {
      var _this = this;

      event = this._getEventName(event, target);
      !this._listener[event] && (this._listener[event] = []);

      this._listener[event].push({
        callback: callback,
        tag: tag,
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
      _regenerator.default.mark(function _callee(target, aevent) {
        var _this2 = this;

        var event,
            _len,
            args,
            _key,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _loop,
            _iterator,
            _step,
            _ret,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event = this._getEventName(aevent, target);
                this.app.log.info('event trigger', event);

                if (this._listener[event]) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return");

              case 4:
                for (_len = _args2.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                  args[_key - 2] = _args2[_key];
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 8;
                _loop =
                /*#__PURE__*/
                _regenerator.default.mark(function _loop() {
                  var _step$value, callback, once, ret;

                  return _regenerator.default.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _step$value = _step.value, callback = _step$value.callback, once = _step$value.once;
                          _context.next = 3;
                          return callback.apply(void 0, args);

                        case 3:
                          ret = _context.sent;
                          if (once) setTimeout(function () {
                            return _this2.off(callback);
                          }, 0);

                          if (!ret) {
                            _context.next = 7;
                            break;
                          }

                          return _context.abrupt("return", {
                            v: ret
                          });

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _loop, this);
                });
                _iterator = (this._listener[event] || [])[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 19;
                  break;
                }

                return _context2.delegateYield(_loop(), "t0", 13);

              case 13:
                _ret = _context2.t0;

                if (!((0, _typeof2.default)(_ret) === "object")) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return", _ret.v);

              case 16:
                _iteratorNormalCompletion = true;
                _context2.next = 11;
                break;

              case 19:
                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t1 = _context2["catch"](8);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 25:
                _context2.prev = 25;
                _context2.prev = 26;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 28:
                _context2.prev = 28;

                if (!_didIteratorError) {
                  _context2.next = 31;
                  break;
                }

                throw _iteratorError;

              case 31:
                return _context2.finish(28);

              case 32:
                return _context2.finish(25);

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this, [[8, 21, 25, 33], [26,, 28, 32]]);
      }));

      return function _trigger(_x, _x2) {
        return _trigger2.apply(this, arguments);
      };
    }()
  }, {
    key: "on",
    value: function on(target, event, callback, tag) {
      return this._addListener(target, event, callback, tag, false);
    }
  }, {
    key: "once",
    value: function once(target, event, callback, tag) {
      return this._addListener(target, event, callback, tag, true);
    }
  }, {
    key: "off",
    value: function off(item) {
      var _this3 = this;

      if (!item) return;
      Object.entries(this._listener).map(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        var index = v.findIndex(function (v) {
          return v && (v.callback === item || v.tag === item);
        });
        if (index >= 0) v.splice(index, 1);
        if (!v.length) delete _this3._listener[k];
      });
    }
  }, {
    key: "delete",
    value: function _delete(event, target) {
      event = this._getEventName(event, target);
      delete this._listener[event];
    }
  }, {
    key: "emit",
    value: function emit(target, event) {
      var _this4 = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      return setTimeout(function () {
        return _this4._trigger.apply(_this4, [target, event].concat(args));
      });
    }
  }, {
    key: "emitMerge",
    value: function emitMerge(target, event) {
      var _this5 = this;

      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      var aevent = (target && (target.name || target.pluginName) || '') + event;
      if (this._events[aevent]) return;
      this._events[aevent] = true;
      return setTimeout(function () {
        _this5._trigger.apply(_this5, [target, event].concat(args));

        delete _this5._events[event];
      });
    }
  }, {
    key: "emitSync",
    value: function () {
      var _emitSync = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(target, event) {
        var _len4,
            args,
            _key4,
            _args3 = arguments;

        return _regenerator.default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                for (_len4 = _args3.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                  args[_key4 - 2] = _args3[_key4];
                }

                _context3.next = 3;
                return this._trigger.apply(this, [target, event].concat(args));

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
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
module.exports = exports["default"];
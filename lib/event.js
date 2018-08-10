'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Event = function () {
  function Event(app) {
    (0, _classCallCheck3.default)(this, Event);

    this.app = app;
    this._listener = {};
    this._events = {};
  }

  (0, _createClass3.default)(Event, [{
    key: '_getEventName',
    value: function _getEventName(event, target) {
      return '&' + event + '@@' + (target ? target.name || target.pluginName : '');
    }
  }, {
    key: '_addListener',
    value: function _addListener(target, event, callback, tag, once) {
      var _this = this;

      event = this._getEventName(event, target);

      !this._listener[event] && (this._listener[event] = []);
      this._listener[event].push({ callback: callback, tag: tag, once: once });
      return function () {
        return _this.off(callback);
      };
    }
  }, {
    key: '_trigger',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(target, aevent) {
        var _this2 = this;

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var event, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

        return _regenerator2.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event = this._getEventName(aevent, target);

                this.app.log.info('event trigger', event);

                if (this._listener[event]) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return');

              case 4:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 7;
                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop() {
                  var _ref2, callback, once, ret;

                  return _regenerator2.default.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _ref2 = _step.value;
                          callback = _ref2.callback, once = _ref2.once;
                          _context.next = 4;
                          return callback.apply(undefined, args);

                        case 4:
                          ret = _context.sent;

                          if (once) setTimeout(function () {
                            return _this2.off(callback);
                          }, 0);

                          if (!ret) {
                            _context.next = 8;
                            break;
                          }

                          return _context.abrupt('return', {
                            v: ret
                          });

                        case 8:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this2);
                });
                _iterator = (this._listener[event] || [])[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 18;
                  break;
                }

                return _context2.delegateYield(_loop(), 't0', 12);

              case 12:
                _ret = _context2.t0;

                if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt('return', _ret.v);

              case 15:
                _iteratorNormalCompletion = true;
                _context2.next = 10;
                break;

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t1 = _context2['catch'](7);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 24:
                _context2.prev = 24;
                _context2.prev = 25;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 27:
                _context2.prev = 27;

                if (!_didIteratorError) {
                  _context2.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context2.finish(27);

              case 31:
                return _context2.finish(24);

              case 32:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this, [[7, 20, 24, 32], [25,, 27, 31]]);
      }));

      function _trigger(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return _trigger;
    }()
  }, {
    key: 'on',
    value: function on(target, event, callback, tag) {
      return this._addListener(target, event, callback, tag, false);
    }
  }, {
    key: 'once',
    value: function once(target, event, callback, tag) {
      return this._addListener(target, event, callback, tag, true);
    }
  }, {
    key: 'off',
    value: function off(item) {
      var _this3 = this;

      if (!item) return;

      Object.entries(this._listener).map(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        var index = v.findIndex(function (v) {
          return v && (v.callback === item || v.tag === item);
        });
        if (index >= 0) v.splice(index, 1);
        if (!v.length) delete _this3._listener[k];
      });
    }
  }, {
    key: 'delete',
    value: function _delete(event, target) {
      event = this._getEventName(event, target);
      delete this._listener[event];
    }
  }, {
    key: 'emit',
    value: function emit(target, event) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var _this4 = this;

      return setTimeout(function () {
        return _this4._trigger.apply(_this4, [target, event].concat(args));
      });
    }
  }, {
    key: 'emitMerge',
    value: function emitMerge(target, event) {
      for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      var _this5 = this;

      var aevent = (target && (target.name || target.pluginName) || '') + event;
      if (this._events[aevent]) return;
      this._events[aevent] = true;

      return setTimeout(function () {
        _this5._trigger.apply(_this5, [target, event].concat(args));
        delete _this5._events[event];
      });
    }
  }, {
    key: 'emitSync',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(target, event) {
        for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
          args[_key4 - 2] = arguments[_key4];
        }

        return _regenerator2.default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._trigger.apply(this, [target, event].concat(args));

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function emitSync(_x3, _x4) {
        return _ref5.apply(this, arguments);
      }

      return emitSync;
    }()
  }]);
  return Event;
}();

exports.default = Event;
module.exports = exports['default'];
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var State =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(State, null, [{
    key: "genStateId",
    // static
    // ---------------
    value: function genStateId(stateId, ownerId) {
      if (!stateId || !ownerId) return;
      return "*".concat(stateId, "@").concat(ownerId);
    }
  }, {
    key: "get",
    value: function get(_id) {
      return State.states[_id];
    }
  }, {
    key: "getState",
    value: function getState(stateId, ownerId) {
      return State.get(this.genStateId(stateId, ownerId));
    } // constructor
    // ---------------

  }]);

  function State(app) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, State);
    app.log.info('state create', options._id);

    if (State.states[options._id]) {
      app.log.error('state _id dup:', options._id);
      return State.states[options._id];
    }

    State.states[options._id] = this;
    this.app = app;
    this._id = options._id;
    this.options = options;
    if (this.options.initialization === undefined) this.options.initialization = {};
    Object.entries(this.options).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      if (k.indexOf('onState') === 0) {
        _this.app.event.on(_this._id, k, v, _this._id);
      } else {
        _this[k] = v;
      }
    });
    this.app.event.on(this._id, 'onStateStop', function () {
      _this.destructor();
    }, this._id);
  }

  (0, _createClass2.default)(State, [{
    key: "destructor",
    value: function destructor() {
      this.app.log.info('state destructor', this._id);
      this.app.event.off(this._id);
      if (this.options.cleanOnStop !== false) this.clear();
      if (this._id !== true && this.options.removeOnStop !== false) delete State.states[this._id];
    }
  }, {
    key: "clear",
    value: function clear() {
      this.app.log.info('state clear');
      return this.app.context.clear(this._id);
    }
  }, {
    key: "data",
    value: function data() {
      return this.app.context.data(this._id, this.options.initialization, this.options.deepCopy);
    }
  }, {
    key: "dataExt",
    value: function dataExt() {}
  }, {
    key: "get",
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = this.data();
      return this.app.utils.pathGet(data, path);
    }
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(data, options, isRealData) {
        var prevData, nextData, ret;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.app.log.info('state update', data, options);
                options = this.app.utils.getOptions(this.options, options);
                prevData = this.data();
                nextData = isRealData ? data : this.app.utils.objectUpdate(prevData, data, options.append);
                _context.next = 6;
                return this.app.event.emitSync(this._id, 'onStateUpdating', nextData, prevData, data, options);

              case 6:
                ret = _context.sent;
                nextData = ret || nextData;
                this.app.context.set(this._id, nextData);
                this.app.event.emit(this._id, 'onStateUpdated', nextData, prevData, data, options);
                return _context.abrupt("return", true);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function update(_x, _x2, _x3) {
        return _update.apply(this, arguments);
      };
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_did) {
        var data;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = this.app.utils.objectDelete(this.data(), _did);
                _context2.next = 3;
                return this.update(data, {}, true);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function _delete(_x4) {
        return _delete2.apply(this, arguments);
      };
    }()
  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var path,
            val,
            input,
            data,
            _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                path = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : '';
                val = _args3.length > 1 ? _args3[1] : undefined;
                input = _args3.length > 2 ? _args3[2] : undefined;
                data = this.data();

                if (this.app.utils.pathSet(data, path, val)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", false);

              case 6:
                _context3.next = 8;
                return this.update(data, {
                  path: path,
                  input: input
                });

              case 8:
                return _context3.abrupt("return", _context3.sent);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function set() {
        return _set.apply(this, arguments);
      };
    }()
  }]);
  return State;
}();

exports.default = State;
(0, _defineProperty2.default)(State, "states", {});
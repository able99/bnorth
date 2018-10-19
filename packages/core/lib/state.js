"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.assign");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

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
    }
  }, {
    key: "createState",
    value: function createState(app, aoptions, sid, ownerId) {
      if (typeof aoptions === 'string') {
        return app.State.get(aoptions);
      }

      var _ref = aoptions || {
        state: app.State
      },
          state = _ref.state,
          options = (0, _objectWithoutProperties2.default)(_ref, ["state"]);

      var _id = options._id || State.genStateId(sid, ownerId);

      var _ref2 = (0, _typeof2.default)(state) === 'object' ? state : {
        constructor: state
      },
          _ref2$constructor = _ref2.constructor,
          constructor = _ref2$constructor === void 0 ? app.State : _ref2$constructor,
          props = (0, _objectWithoutProperties2.default)(_ref2, ["constructor"]);

      if (State.states[_id]) {
        app.log.error('state _id dup:', _id);

        State.states[_id].destructor();
      }

      return State.states[_id] = Object.assign(new constructor(app, _id, options), props);
    } // constructor
    // ---------------

  }]);

  function State(app, _id) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2.default)(this, State);
    app.log.info('state constructor', _id);
    this.app = app;
    this._id = _id;
    this.options = options;
    if (this.options.initialization === undefined) this.options.initialization = {};
    Object.entries(this.options).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          k = _ref4[0],
          v = _ref4[1];

      return k.indexOf('onState') === 0 && _this.app.event.on(_this._id, k, v, _this._id);
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
    } // clean
    // -------------------

  }, {
    key: "clear",
    value: function clear() {
      this.app.log.info('state clear');
      return this.app.context.clear(this._id);
    } // state
    // -------------------

  }, {
    key: "stateData",
    value: function stateData() {
      return this.app.utils.objectCopy(this.app.context.data(this._id, {}));
    }
  }, {
    key: "stateUpdate",
    value: function stateUpdate(data) {
      this.app.context.update(this._id, data);
    }
  }, {
    key: "stateSet",
    value: function stateSet(data) {
      this.app.context.set(this._id, data);
    }
  }, {
    key: "stateDelete",
    value: function stateDelete(did) {
      this.app.context.delete(this._id, did);
    } // data
    // -------------------

  }, {
    key: "data",
    value: function data() {
      return this.app.utils.objectCopy(this.stateData().data || this.options.initialization, this.options.deepCopy);
    }
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
      _regenerator.default.mark(function _callee(data, options) {
        var prevData, nextData;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.app.log.info('state update', data, options);
                options = this.app.utils.getOptions(this.options, options);
                prevData = this.data();
                nextData = this.app.utils.objectUpdate(prevData, data, options.append);
                _context.next = 6;
                return this.app.event.emit(this._id, 'onStateUpdating', nextData, prevData, data, options);

              case 6:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 9;
                  break;
                }

                _context.t0 = nextData;

              case 9:
                nextData = _context.t0;
                this.app.context.update(this._id, {
                  data: nextData
                });
                this.app.event.emit(this._id, 'onStateUpdated', nextData, prevData, data, options);
                return _context.abrupt("return", nextData);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function update(_x, _x2) {
        return _update.apply(this, arguments);
      };
    }()
  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var path,
            val,
            input,
            data,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
                val = _args2.length > 1 ? _args2[1] : undefined;
                input = _args2.length > 2 ? _args2[2] : undefined;
                data = this.data();

                if (this.app.utils.pathSet(data, path, val)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", false);

              case 6:
                _context2.next = 8;
                return this.update(data, {
                  path: path,
                  input: input
                });

              case 8:
                return _context2.abrupt("return", _context2.sent);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function set() {
        return _set.apply(this, arguments);
      };
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_did) {
        var data;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                data = this.app.utils.objectDelete(this.data(), _did);
                _context3.next = 3;
                return this.update(data, {}, true);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _delete(_x3) {
        return _delete2.apply(this, arguments);
      };
    }() // ext
    // -------------------

  }, {
    key: "extData",
    value: function extData() {}
  }]);
  return State;
}();

exports.default = State;
(0, _defineProperty2.default)(State, "states", {});
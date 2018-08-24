"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var State =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(State, null, [{
    key: "genStateId",
    value: function genStateId(_id, ownerId) {
      if (!_id || !ownerId) return;
      return "*".concat(_id, "@").concat(ownerId);
    }
  }]);

  function State(app) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, State);
    app.log.info('state create', options._id);

    if (app.states[options._id]) {
      app.log.error('state _id dup:', options._id);
      return app.states[options._id];
    }

    app.states[options._id] = this;
    this.app = app;
    this._id = options._id;
    this.options = options;
    if (this.options.initialization === undefined) this.options.initialization = {};
    Object.entries(this.options).filter(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      return k.indexOf('onState') === 0;
    }).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          k = _ref4[0],
          v = _ref4[1];

      return _this.app.event.on(_this._id, k, v, _this._id);
    });
    this.app.event.on(this._id, 'onStateStop', function () {
      _this.destructor();
    }, this._id);
  }

  (0, _createClass2.default)(State, [{
    key: "destructor",
    value: function destructor() {
      app.log.info('state destructor', this._id);
      this.app.event.off(this._id);
      if (this.options.cleanOnStop !== false) this.clear();
      if (this._id !== true && this.options.removeOnStop !== false) delete this.app.states[this._id];
    }
  }, {
    key: "data",
    value: function data() {
      return this.app.context.stateData(this._id, this.options.initialization);
    }
  }, {
    key: "dataExt",
    value: function dataExt() {}
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(data) {
        var ret;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.app.log.info('state init', data);
                data = data || this.app.utils.objectCopy(this.options.initialization);
                _context.next = 4;
                return app.event.emitSync(this._id, 'onStateInit', data);

              case 4:
                ret = _context.sent;

                if (!ret) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", ret);

              case 7:
                this.app.context.stateInit(this._id, data);
                return _context.abrupt("return", true);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function init(_x) {
        return _init.apply(this, arguments);
      };
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(data, options, prevData) {
        var nextData, ret;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.app.log.info('state update', data, options);

                if (data) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                options = this.app.utils.getOptions(this.options, options);
                prevData = prevData || this.data();
                nextData = this._dataUpdate(data, options, prevData);
                _context2.next = 8;
                return this.app.event.emitSync(this._id, 'onStateUpdating', nextData, prevData, data, options);

              case 8:
                ret = _context2.sent;
                this.app.context.stateInit(this._id, ret || nextData);
                this.app.event.emit(this._id, 'onStateUpdated', ret || nextData, prevData, data, options);
                return _context2.abrupt("return", true);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function update(_x2, _x3, _x4) {
        return _update.apply(this, arguments);
      };
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_id) {
        var data;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.app.log.info('state delete', _id);
                data = this._dataDelete(_id);
                _context3.next = 4;
                return this.update(data);

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _delete(_x5) {
        return _delete2.apply(this, arguments);
      };
    }()
  }, {
    key: "get",
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = this.data();
      return this.app.utils.pathGet(data, path);
    }
  }, {
    key: "set",
    value: function set() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var val = arguments.length > 1 ? arguments[1] : undefined;
      var input = arguments.length > 2 ? arguments[2] : undefined;
      var data = this.data();
      if (!this.app.utils.pathSet(data, path, val)) return false;
      return this.update(data, {
        path: path,
        input: input
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      this.app.log.info('state clear');
      return this.app.context.stateClean(this._id);
    }
  }, {
    key: "_dataUpdate",
    value: function _dataUpdate(data) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          append = _ref5.append;

      var prevData = arguments.length > 2 ? arguments[2] : undefined;
      var pre = prevData || this.data();

      if (Array.isArray(data)) {
        data = (0, _toConsumableArray2.default)(append ? pre : []).concat((0, _toConsumableArray2.default)(data));
      } else if ((0, _typeof2.default)(data) === 'object') {
        if (typeof append === 'string') {
          var appendPrevData = this.app.utils.pathGet(prevData, append);
          var appendNextData = this.app.utils.pathGet(data, append);
          var appendData = Array.isArray(appendNextData) ? (0, _toConsumableArray2.default)(appendPrevData || []).concat((0, _toConsumableArray2.default)(appendNextData || [])) : (0, _objectSpread2.default)({}, appendPrevData || {}, appendNextData || {});
          data = (0, _objectSpread2.default)({}, pre, data);
          this.app.utils.pathSet(data, append, appendData);
        } else if (append === true) {
          data = (0, _objectSpread2.default)({}, pre, data);
        } else {
          data = (0, _objectSpread2.default)({}, data);
        }
      }

      return data;
    }
  }, {
    key: "_dataDelete",
    value: function _dataDelete(_id, options, prevData) {
      var pre = prevData || this.data();

      if (Array.isArray(pre)) {
        pre.splice(_id, 1);
        pre = (0, _toConsumableArray2.default)(pre);
      } else {
        delete pre[_id];
        pre = (0, _objectSpread2.default)({}, pre);
      }

      return pre;
    }
  }]);
  return State;
}();

exports.default = State;
module.exports = exports["default"];
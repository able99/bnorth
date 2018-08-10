'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var State = function () {
  function State(app, name) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var page = arguments[3];
    (0, _classCallCheck3.default)(this, State);

    var key = options.key || (name === true ? name : '*' + name + (page ? '@@' + page.name : ''));
    app.log.info('state create', key);
    if (app.states[key]) {
      throw new Error('dup state key:' + key);
    }
    if (key !== true) app.states[key] = this;

    this.app = app;
    this.name = key;
    this.options = options;
    if (this.options.initialization === undefined) this.options.initialization = {};

    key !== true && page && app.event.on(page, 'onPageStart', function (page, active) {
      _this.app.event.emit(_this, 'onStateStart', _this.name, active);
    }, this.name);
    key !== true && page && app.event.on(page, 'onPageActive', function (page, onStart) {
      _this.app.event.emit(_this, 'onStateActive', _this.name, onStart);
    }, this.name);
    key !== true && page && app.event.on(page, 'onPageInactive', function (page, onStop) {
      _this.app.event.emit(_this, 'onStateInactive', _this.name, onStop);
    }, this.name);
    key !== true && page && app.event.on(page, 'onPageStop', function (page) {
      _this.app.event.emit(_this, 'onStateStop', _this.name);
    }, this.name);
    Object.entries(this.options).filter(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      return k.indexOf('onState') === 0;
    }).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
          k = _ref4[0],
          v = _ref4[1];

      return _this.app.event.on(_this, k, v, _this.name);
    });

    this.app.event.on(this, 'onStateStop', function () {
      _this.destructor();
    }, this.name);
  }

  (0, _createClass3.default)(State, [{
    key: 'destructor',
    value: function destructor() {
      app.log.info('state destructor', this.name);
      this.app.event.off(this.name);
      if (this.options.cleanOnStop !== false) this.clear();
      if (this.name !== true && this.options.removeOnStop !== false) delete this.app.states[this.name];
    }
  }, {
    key: 'data',
    value: function data() {
      return this.app.context.stateData(this.name, this.options.initialization);
    }
  }, {
    key: 'dataExt',
    value: function dataExt() {}
  }, {
    key: 'init',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var ret;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.app.log.info('state init', data);
                data = data || this.app.utils.objectCopy(this.options.initialization);

                _context.next = 4;
                return app.event.emitSync(this, 'onStateInit', data);

              case 4:
                ret = _context.sent;

                if (!ret) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', ret);

              case 7:
                this.app.context.stateInit(this.name, data);
                return _context.abrupt('return', true);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x2) {
        return _ref5.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data, options, prevData) {
        var nextData, ret;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.app.log.info('state update', data, options);

                if (data) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return');

              case 3:

                options = this.app.utils.getOptions(this.options, options);
                prevData = prevData || this.data();
                nextData = this._dataUpdate(data, options, prevData);
                _context2.next = 8;
                return this.app.event.emitSync(this, 'onStateUpdating', nextData, prevData, data, options);

              case 8:
                ret = _context2.sent;

                this.app.context.stateInit(this.name, ret || nextData);
                this.app.event.emit(this, 'onStateUpdated', ret || nextData, prevData, data, options);
                return _context2.abrupt('return', true);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x3, _x4, _x5) {
        return _ref6.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(key) {
        var data;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.app.log.info('state delete', key);
                data = this._dataDelete(key);
                _context3.next = 4;
                return this.update(data);

              case 4:
                return _context3.abrupt('return', _context3.sent);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x6) {
        return _ref7.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: 'get',
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var data = this.data();
      return this.app.utils.pathGet(data, path);
    }
  }, {
    key: 'set',
    value: function set() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var val = arguments[1];
      var input = arguments[2];

      var data = this.data();
      if (!this.app.utils.pathSet(data, path, val)) return false;
      return this.update(data, { path: path, input: input });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.app.log.info('state clear');
      return this.app.context.stateClean(this.name);
    }
  }, {
    key: '_dataUpdate',
    value: function _dataUpdate(data) {
      var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          append = _ref8.append;

      var prevData = arguments[2];

      var pre = prevData || this.data();

      if (Array.isArray(data)) {
        data = [].concat((0, _toConsumableArray3.default)(append ? pre : []), (0, _toConsumableArray3.default)(data));
      } else if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
        if (typeof append === 'string') {
          var appendPrevData = this.app.utils.pathGet(prevData, append);
          var appendNextData = this.app.utils.pathGet(data, append);
          var appendData = Array.isArray(appendNextData) ? [].concat((0, _toConsumableArray3.default)(appendPrevData || []), (0, _toConsumableArray3.default)(appendNextData || [])) : (0, _extends3.default)({}, appendPrevData || {}, appendNextData || {});
          data = (0, _extends3.default)({}, pre, data);
          this.app.utils.pathSet(data, append, appendData);
        } else if (append === true) {
          data = (0, _extends3.default)({}, pre, data);
        } else {
          data = (0, _extends3.default)({}, data);
        }
      }

      return data;
    }
  }, {
    key: '_dataDelete',
    value: function _dataDelete(key, options, prevData) {
      var pre = prevData || this.data();

      if (Array.isArray(pre)) {
        pre.splice(key, 1);
        pre = [].concat((0, _toConsumableArray3.default)(pre));
      } else {
        delete pre[key];
        pre = (0, _extends3.default)({}, pre);
      }

      return pre;
    }
  }]);
  return State;
}();

exports.default = State;
module.exports = exports['default'];
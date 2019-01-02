"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.array.find-index");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.function.name");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * @module
 */

/**
 * App 事件管理模块，提供事件管理的功能
 * @see https://able99.github.io/cbnorth/event.html
 * @exportdefault
 */
var Event =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Event(app) {
    (0, _classCallCheck2.default)(this, Event);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.event';
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
    /**
     * 向目标注册指定的事件处理函数
     * @param {string} - 目标的 id，比如 app, app 的模块，插件，数据单元或者页面等 
     * @param {string} - 事件的名称 
     * @param {function} - 处理函数，参数由事件决定 
     * @param {?string} - 该事件处理函数的拥有者 id 
     * @returns {function} 返回无参数的函数，调用可取消注册
     */

  }, {
    key: "on",
    value: function on(targetId, eventName, callback, ownerId) {
      return this._addListener(targetId, eventName, callback, ownerId, false);
    }
    /**
     * 同 on 函数，但是事件只触发一次
     */

  }, {
    key: "once",
    value: function once(targetId, eventName, callback, ownerId) {
      return this._addListener(targetId, eventName, callback, ownerId, true);
    }
    /**
     * 取消注册的事件处理函数
     * @param {function} - 注册时的事件处理函数或者事件处理函数的所有者 id 
     */

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
    /**
     * 清除目标上的事件处理函数
     * @param {string} - 目标 id 
     * @param {?string} - 事件名称，如果事件名称为空则为全部事件 
     */

  }, {
    key: "delete",
    value: function _delete(targetId, eventName) {
      var name = eventName ? this._getTargetEventName(targetId, eventName) : targetId;
      delete this._listener[name];
    }
    /**
     * 触发事件
     * @param {string} - 目标 id 
     * @param {string} - 事件名称 
     * @param  {...*} - 事件的参数 
     */

  }, {
    key: "emitSync",
    value: function emitSync(targetId, eventName) {
      var _this3 = this;

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var name = this._getTargetEventName(targetId, eventName);

      (0, _toConsumableArray2.default)(this._listener[name] || []).forEach(function (_ref3) {
        var callback = _ref3.callback,
            once = _ref3.once;
        callback.apply(void 0, args);
        if (once) _this3.off(callback);
      });
    }
    /**
     * 触发事件，如果某一事件处理函数返回的非负值，则返回该值，并停止继续执行队列中其他事件处理函数
     * @async
     * @param {string} - 目标 id 
     * @param {string} - 事件名称 
     * @param  {...*} - 事件的参数 
     * @returns {*} 处理函数的返回值
     */

  }, {
    key: "emit",
    value: function () {
      var _emit = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(targetId, eventName) {
        var name,
            _len2,
            args,
            _key2,
            _arr,
            _i,
            _arr$_i,
            callback,
            once,
            ret,
            _args = arguments;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = this._getTargetEventName(targetId, eventName);

                for (_len2 = _args.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                  args[_key2 - 2] = _args[_key2];
                }

                _arr = (0, _toConsumableArray2.default)(this._listener[name] || []);
                _i = 0;

              case 4:
                if (!(_i < _arr.length)) {
                  _context.next = 15;
                  break;
                }

                _arr$_i = _arr[_i], callback = _arr$_i.callback, once = _arr$_i.once;
                _context.next = 8;
                return callback.apply(void 0, args);

              case 8:
                ret = _context.sent;
                if (once) this.off(callback);

                if (!ret) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", ret);

              case 12:
                _i++;
                _context.next = 4;
                break;

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function emit(_x, _x2) {
        return _emit.apply(this, arguments);
      };
    }()
  }]);
  return Event;
}();

var _default = Event;
exports.default = _default;
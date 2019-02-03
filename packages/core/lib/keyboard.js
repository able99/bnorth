"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find-index");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.find");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * @module
 */

/**
 * 键盘按下
 * @event module:keyboard.Keyboard#keydown
 * @property {event} - 键盘事件
 */

/**
 * 键盘产生可见字符
 * @event module:keyboard.Keyboard#keypress
 * @property {event} - 键盘事件
 */

/**
 * 键盘抬起
 * @event module:keyboard.Keyboard#keyup
 * @property {event} - 键盘事件
 */

/**
 * App 键盘事件管理模块，统一管理键盘事件
 * @exportdefault
 */
var Keyboard =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Keyboard(app) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Keyboard);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.keyboard';
    this._listeners = [];

    this._handleKeyEventWork = function (e) {
      return _this._handleKeyEvent(e);
    };

    document.addEventListener('keydown', this._handleKeyEventWork);
    document.addEventListener('keypress', this._handleKeyEventWork);
    document.addEventListener('keyup', this._handleKeyEventWork);
  }

  (0, _createClass2.default)(Keyboard, [{
    key: "_handleKeyEvent",
    value: function _handleKeyEvent(e) {
      var _this2 = this;

      this.app.log.debug('keyboard trigger', e);

      var listener = this._listeners.reverse().find(function (_ref) {
        var event = _ref.event,
            callback = _ref.callback,
            _id = _ref._id;
        return callback && e.type === event && _this2.app.router.isFocus(_id);
      });

      if (listener) {
        listener.callback(e);
        return listener._id;
      }
    }
    /**
     * 指定 id 的目标注册键盘事件处理函数
     * @param {string} - 目标 id
     * @param {string} - 事件名称
     * @param {function} - 事件处理函数 
     * @returns {function} 注销函数
     */

  }, {
    key: "on",
    value: function on(_id, event, callback) {
      var _this3 = this;

      if (!event || !callback || !_id) return;
      if (this._listeners.find(function (listener) {
        return listener.event === event && listener.callback === callback && listener._id === _id;
      })) return;

      this._listeners.push({
        event: event,
        callback: callback,
        _id: _id
      });

      return function () {
        return _this3.off(callback);
      };
    }
    /**
     * 注销键盘事件处理函数
     * @param {string|function} - 目标 id 或者事件处理函数
     */

  }, {
    key: "off",
    value: function off(item) {
      var _this4 = this;

      if (typeof item === 'string') {
        this._listeners.forEach(function (listener, i) {
          if (listener._id === item) _this4._listeners.splice(i, 1);
        });
      } else if (typeof item === 'function') {
        var index = this._listeners.findIndex(function (listener) {
          return listener.callback === item;
        });

        if (index >= 0) this._listeners.splice(index, 1);
      }
    }
    /**
     * 模拟触发指定的键盘事件
     * @param {event} - 键盘事件 
     */

  }, {
    key: "emit",
    value: function emit(event) {
      return this._handleKeyEvent(event);
    }
  }]);
  return Keyboard;
}();

var _default = Keyboard;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Keyboard =
/*#__PURE__*/
function () {
  function Keyboard(app) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Keyboard);
    this.app = app;
    this.name = 'app.keyborad';
    this._listeners = [];

    this._handleKeyEvent = function (e) {
      return _this.handleKeyEvent(e);
    };

    document.addEventListener('keydown', this._handleKeyEvent);
    document.addEventListener('keypress', this._handleKeyEvent);
    document.addEventListener('keyup', this._handleKeyEvent);
  }

  (0, _createClass2.default)(Keyboard, [{
    key: "handleKeyEvent",
    value: function handleKeyEvent(e) {
      var _this2 = this;

      this.app.log.info('keyboard trigger', e);

      var listener = this._listeners.reverse().find(function (_ref) {
        var event = _ref.event,
            callback = _ref.callback,
            name = _ref.name;
        return callback && e.type === event && _this2.app.router.focusName === name;
      });

      if (listener) listener.callback(e);
    }
  }, {
    key: "on",
    value: function on(name, event, callback) {
      var _this3 = this;

      if (!event || !callback || !name) return;
      if (this._listeners.find(function (listener) {
        return listener.event === event && listener.callback === callback && listener.name === name;
      })) return;

      this._listeners.push({
        event: event,
        callback: callback,
        name: name
      });

      return function () {
        return _this3.off(callback);
      };
    }
  }, {
    key: "off",
    value: function off(item) {
      var _this4 = this;

      if (typeof item === 'string') {
        this._listeners.forEach(function (listener, i) {
          if (listener.name === item) _this4._listeners.splice(i, 1);
        });
      } else if (typeof item === 'function') {
        var index = this._listeners.findIndex(function (listener) {
          return listener.callback === item;
        });

        if (index >= 0) this._listeners.splice(index, 1);
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      this.handleKeyEvent(event);
    }
  }]);
  return Keyboard;
}();

exports.default = Keyboard;
module.exports = exports["default"];
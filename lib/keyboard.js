'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Keyboard = function () {
  function Keyboard(app) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Keyboard);

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

  (0, _createClass3.default)(Keyboard, [{
    key: 'handleKeyEvent',
    value: function handleKeyEvent(e) {
      this.app.log.info('keyboard trigger', e);

      var _ref = this.app.router.focusRef || {},
          topViewName = _ref.viewName,
          topPageName = _ref.pageName;

      var listener = this._listeners.reverse().find(function (_ref2) {
        var event = _ref2.event,
            callback = _ref2.callback,
            pageName = _ref2.pageName,
            viewName = _ref2.viewName;
        return callback && e.type === event && (!viewName && !topViewName && topPageName === pageName || viewName && viewName === topViewName && pageName === topPageName);
      });

      if (listener) listener.callback(e);
    }
  }, {
    key: 'on',
    value: function on(event, callback, _ref3) {
      var _this2 = this;

      var pageName = _ref3.pageName,
          viewName = _ref3.viewName;

      if (!event || !callback) return;
      if (this._listeners.find(function (_ref4) {
        var aevent = _ref4.aevent,
            acallback = _ref4.acallback;
        return aevent === event && acallback === calllback;
      })) return;
      this._listeners.push({ event: event, callback: callback, pageName: pageName, viewName: viewName });
      return function () {
        return _this2.off(callback);
      };
    }
  }, {
    key: 'off',
    value: function off(acallback) {
      var index = acallback && this._listeners.findIndex(function (_ref5) {
        var callback = _ref5.callback;
        return acallback === callback;
      });
      if (index >= 0) this._listeners.splice(index, 1);
    }
  }, {
    key: 'emit',
    value: function emit(event) {
      this.handleKeyEvent(event);
    }
  }]);
  return Keyboard;
}();

exports.default = Keyboard;
module.exports = exports['default'];
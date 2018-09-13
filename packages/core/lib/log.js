"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Log =
/*#__PURE__*/
function () {
  function Log(app) {
    (0, _classCallCheck2.default)(this, Log);
    this.app = app;
    this.level = 'debug';
  }

  (0, _createClass2.default)(Log, [{
    key: "_white",
    value: function _white(type) {
      var log = console && (console[type] || console['log']);

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      log && log.apply(console, args);
    }
  }, {
    key: "_log",
    value: function _log(type) {
      var _console;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      type >= Log.levels[this.level] && (_console = console).log.apply(_console, args);
    }
  }, {
    key: "verbose",
    value: function verbose() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this._log.apply(this, [1].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this._log.apply(this, [2].concat(args));
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this._log.apply(this, [3].concat(args));
    }
  }, {
    key: "warning",
    value: function warning() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this._log.apply(this, [4].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return this._log.apply(this, [5].concat(args));
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return this._log.apply(this, [Number.MAX_VALUE].concat(args));
    }
  }]);
  return Log;
}();

exports.default = Log;
Log.levels = {
  'verbose': 1,
  'info': 2,
  'debug': 3,
  'warning': 4,
  'error': 5
};
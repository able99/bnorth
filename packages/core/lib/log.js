"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

require("core-js/modules/es6.number.constructor");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

/**
 * @module
 */

/**
 * App 日志模块，提供日志功能
 * @exportdefault
 */
var Log =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Log(app) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Log);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.log';
    /**
     * 日志的等级
     * @type {string}
     */

    this.level = process.env.NODE_ENV === 'development' ? 'warn' : 'error';
    this.console = false;
    this.consoles = [];
    window.addEventListener('error', function (event) {
      _this.console && _this.consoles.push(['common error', event.message, event.error.stack]);
    });
    ['log', 'info', 'debug'].forEach(function (v) {
      _this['__' + v] = window.console[v];

      window.console[v] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this._log.apply(_this, [v].concat(args));
      };
    });
    this.app.event.on(this.app._id, 'onAppStartRender', function () {
      _this.console && _this.consoleOn();
    });
  }

  (0, _createClass2.default)(Log, [{
    key: "_initConsoleFab",
    value: function _initConsoleFab() {
      var _this2 = this;

      var fab = document.createElement('button');
      fab.addEventListener('click', function () {
        return _this2._initConsolePanel(true);
      });
      fab.setAttribute('style', 'padding: 4px; margin: 4px; position: absolute; right: 0; bottom: 0;');
      fab.innerHTML = "console";
      document.body.appendChild(fab);
      this._consoleFab = fab;
    }
  }, {
    key: "_initConsolePanel",
    value: function _initConsolePanel(show) {
      var _this3 = this;

      if (!show) {
        this.consoles = [];
        this._consolePanel && this._consolePanel.remove();
        this._consolePanel = null;
        return;
      }

      var panel = document.createElement('div');
      panel.setAttribute('style', 'background: white; padding: 4px; position: absolute; left: 0, top: 0; right: 0; bottom: 0; width: 100%; height: 100%;');
      var header = document.createElement('div');
      header.addEventListener('click', function () {
        return _this3._initConsolePanel(false);
      });
      header.setAttribute('style', 'padding: 4px; border-bottom: 1px solid #e2e2e2;');
      header.innerText = 'console(点击关闭)';
      panel.appendChild(header);
      var body = document.createElement('div');
      body.setAttribute('style', 'padding: 4px; width: 100%; height: 100%; overflow-y: auto;');
      body.innerHTML = '';
      this.consoles.forEach(function (v) {
        v.forEach(function (vv) {
          body.innerHTML += (0, _stringify.default)(vv) + '<br />';
        });
        body.innerHTML += '<br />';
      });
      panel.appendChild(body);
      document.body.appendChild(panel);
      this._consolePanel = panel;
    }
  }, {
    key: "_white",
    value: function _white(type) {
      var log = console && (console[type] || console['log']);

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      log && log.apply(console, args);
    }
  }, {
    key: "_log",
    value: function _log(type) {
      if (!console || type < Log.levels[this.level]) return;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      for (var arg in args) {
        args[arg] === this.app && (args[arg] = '[app]');
      }

      this.console && this.consoles.push(args);
      return this['__' + type] ? this['__' + type].apply(this, args) : this['__log'].apply(this, args);
    }
    /**
     * 打印 debug 级别日志
     * @param  {...*} 日志 
     */

  }, {
    key: "debug",
    value: function debug() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this._log.apply(this, [1].concat(args));
    }
    /**
     * 打印 info 级别日志
     * @param  {...*} 日志 
     */

  }, {
    key: "info",
    value: function info() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this._log.apply(this, [2].concat(args));
    }
    /**
     * 打印 warning 级别日志
     * @param  {...*} 日志 
     */

  }, {
    key: "warn",
    value: function warn() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this._log.apply(this, [3].concat(args));
    }
    /**
     * 打印 error 级别日志
     * @param  {...*} 日志 
     */

  }, {
    key: "error",
    value: function error() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return this._log.apply(this, [4].concat(args));
    }
    /**
     * 不受限制的打印日志
     * @param  {...*} 日志 
     */

  }, {
    key: "log",
    value: function log() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return this._log.apply(this, [Number.MAX_VALUE].concat(args));
    }
  }, {
    key: "consoleOn",
    value: function consoleOn() {
      this.console = true;

      this._initConsoleFab();
    }
  }, {
    key: "consoleOff",
    value: function consoleOff() {
      this.console = false;
      this.consoles = [];
      this._consoleFab && this._consoleFab.remove();
      this._consoleFab = null;
    }
  }]);
  return Log;
}();

Log.levels = {
  'debug': 1,
  'info': 2,
  'warn': 3,
  'error': 4
};
var _default = Log;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Cordova =
/*#__PURE__*/
function () {
  function Cordova(app) {
    (0, _classCallCheck2.default)(this, Cordova);
    this.app = app;
    this.ready = false;
  }

  (0, _createClass2.default)(Cordova, [{
    key: "exitApp",
    value: function exitApp() {
      navigator.app.exitApp();
    }
  }, {
    key: "isOnCordova",
    value: function isOnCordova() {
      return /(?:cordova)/.test(window.navigator.userAgent) || /(?:Crosswalk)/.test(window.navigator.userAgent);
    }
  }, {
    key: "invoke",
    value: function invoke(obj, method) {
      if (!this.ready) {
        this.app.log.error('cordova api', 'run before cordova ready');
        return;
      }

      obj = this.app.utils.pathGet(window, obj);

      if (!obj) {
        this.app.log.error('cordova api', 'no this cordova plugin obj');
        return;
      }

      if (!obj[method]) {
        this.app.log.error('cordova api', 'no this cordova plugin method');
        return;
      }

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return obj[method].apply(obj, args);
    }
  }, {
    key: "setProp",
    value: function setProp(path, value) {
      if (!this.ready) {
        this.app.log.error('cordova api', 'run before cordova ready');
        return;
      }

      return this.app.utils.pathSet(window, path, value);
    }
  }, {
    key: "getProp",
    value: function getProp(path) {
      if (!this.ready) {
        this.app.log.error('cordova api', 'run before cordova ready');
        return;
      }

      return this.app.utils.pathGet(window, path);
    }
  }, {
    key: "init",
    value: function init(listenBackButton) {
      var _this = this;

      if (!this.isOnCordova()) return Promise.resolve();
      return new Promise(function (resolve, reject) {
        _this.app.browser.loadjs('./cordova.js').then(function (v) {
          window.document.addEventListener("deviceready", function () {
            resolve();
            _this.ready = true;

            _this.app.event.emit(_this, 'onDeviceReady');
          }, false);
          window.document.addEventListener("pause", function () {
            _this.app.event.emit(_this, 'onPause');
          }, false);
          window.document.addEventListener("resume", function () {
            _this.app.event.emit(_this, 'onResume');
          }, false);
          listenBackButton && window.document.addEventListener("backbutton", function (e) {
            _this.app.event.emitSync(_this, 'onBackButton', e);
          }, false);
          window.document.addEventListener("menubutton", function (e) {
            _this.app.event.emitSync(_this, 'onMenuButton', e);
          }, false);
          window.document.addEventListener("searchbutton", function (e) {
            _this.app.event.emitSync(_this, 'onSearchButton', e);
          }, false);
          window.document.addEventListener("volumedownbutton", function (e) {
            _this.app.event.emitSync(_this, 'onVolumeDownButton', e);
          }, false);
          window.document.addEventListener("volumeupbutton", function (e) {
            _this.app.event.emitSync(_this, 'onVolumeUpButton', e);
          }, false);
        });
      });
    }
  }]);
  return Cordova;
}();

var _default = {
  // plugin 
  // --------------------------------
  pluginName: 'cordova',
  pluginDependence: ['browser'],
  onPluginMount: function onPluginMount(app) {
    app.Cordova = Cordova;
    app.cordova = new Cordova(app);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.Cordova;
    delete app.cordova;
  }
};
exports.default = _default;
module.exports = exports["default"];
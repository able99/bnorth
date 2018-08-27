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
  function Cordova(app, options, _id) {
    (0, _classCallCheck2.default)(this, Cordova);
    this.app = app;
    this.options = options;
    this.ready = false;
  }

  (0, _createClass2.default)(Cordova, [{
    key: "isOnCordova",
    // 
    // ----------------------
    value: function isOnCordova() {
      return /(?:cordova)/.test(window.navigator.userAgent) || /(?:Crosswalk)/.test(window.navigator.userAgent);
    } // invoke
    // ----------------------

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
    } // init
    // -------------------------

  }, {
    key: "_handleReady",
    value: function _handleReady() {
      var _this = this;

      this.ready = true;

      var _ref = this.options.buttons || {},
          back = _ref.back,
          menu = _ref.menu,
          search = _ref.search,
          volumedown = _ref.volumedown,
          volumeup = _ref.volumeup;

      window.document.addEventListener("pause", function () {
        _this.app.event.emit(_this.options._id, 'onPause');
      }, false);
      window.document.addEventListener("resume", function () {
        _this.app.event.emit(_this.options._id, 'onResume');
      }, false);
      menu && window.document.addEventListener("menubutton", function (e) {
        _this.app.event.emitSync(_this.options._id, 'onMenuButton', e);
      }, false);
      search && window.document.addEventListener("searchbutton", function (e) {
        _this.app.event.emitSync(_this.options._id, 'onSearchButton', e);
      }, false);
      volumedown && window.document.addEventListener("volumedownbutton", function (e) {
        _this.app.event.emitSync(_this.options._id, 'onVolumeDownButton', e);
      }, false);
      volumeup && window.document.addEventListener("volumeupbutton", function (e) {
        _this.app.event.emitSync(_this.options._id, 'onVolumeUpButton', e);
      }, false);
      back && window.document.addEventListener("backbutton", function (e) {
        back === true ? _this.app.event.emitSync(_this.options._id, 'onBackButton', e) : app.keyboard.emit({
          type: 'keydown',
          keyCode: back
        });
      }, false);
      this.app.event.emit(this.options._id, 'onDeviceReady');
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (!this.isOnCordova()) return Promise.resolve();
      return this.app.browser.loadjs('./cordova.js').then(function () {
        window.document.addEventListener("deviceready", function () {
          _this2._handleReady();
        }, false);
      });
    }
  }, {
    key: "exitApp",
    value: function exitApp() {
      navigator.app.exitApp();
    } // file
    // -----------------------

  }, {
    key: "getFileUrl",
    value: function getFileUrl(root, pathname) {
      if (root && pathname) {
        return window.cordova.file[root] + pathname;
      } else if (root && !root.startsWith('file')) {
        return 'file://' + root;
      } else {
        return root;
      }
    }
  }, {
    key: "getFile",
    value: function getFile(url, options) {
      options = this.app.getOptions(this.options, options);
      return new Promise(function (resolve, reject) {
        window.resolveLocalFileSystemURL(url, function (fileEntry) {
          fileEntry.file(function (file) {
            resolve(file);
          }, function (error) {
            error.message = options.fileErrorMessage;
            reject(err);
          });
        }, function (error) {
          error.message = options.fileErrorMessage;
          reject(err);
        });
      });
    }
  }]);
  return Cordova;
}();

Cordova.options = {
  cordovaNotReady: '引擎尚未启动',
  fileErrorMessage: '文件读取错误'
};
var _default = {
  pluginName: 'cordova',
  _dependencies: 'browser',
  onPluginMount: function onPluginMount(app, plugin) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    app.Cordova = Cordova;
    options._id = plugin._id;
    app.cordova = new Cordova(app, options);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.Cordova;
    delete app.cordova;
  }
};
exports.default = _default;
module.exports = exports["default"];
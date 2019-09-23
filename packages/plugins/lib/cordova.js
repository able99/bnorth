"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

require("core-js/modules/es6.string.starts-with");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

require("core-js/modules/es6.regexp.search");

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Cordova =
/*#__PURE__*/
function () {
  function Cordova(app, _id) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2.default)(this, Cordova);
    this.app = app;
    this._id = _id;
    this.options = _objectSpread({
      cordovaNotReady: '引擎尚未启动',
      fileErrorMessage: '文件读取错误'
    }, options);
    this.isReady = false;
    this.waits = [];
    window.document.addEventListener("deviceready", function () {
      return _this._handleReady();
    }, false);

    if (!this.isCordova) {
      var fileref = document.createElement('script');
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", "./cordova.js");
      document.getElementsByTagName("head")[0].appendChild(fileref);
    }
  }

  (0, _createClass2.default)(Cordova, [{
    key: "_handleReady",
    value: function _handleReady() {
      var _this2 = this;

      this.isReady = true;
      var _this$options = this.options,
          back = _this$options.back,
          menu = _this$options.menu,
          search = _this$options.search,
          volumedown = _this$options.volumedown,
          volumeup = _this$options.volumeup;
      window.document.addEventListener("pause", function () {
        _this2.app.event.emit(_this2._id, 'onDevicePause');
      }, false);
      window.document.addEventListener("resume", function () {
        _this2.app.event.emit(_this2._id, 'onDeviceResume');
      }, false);
      menu && window.document.addEventListener("menubutton", function (e) {
        _this2.app.event.emitSync(_this2._id, 'onDeviceMenuButton', e);
      }, false);
      search && window.document.addEventListener("searchbutton", function (e) {
        _this2.app.event.emitSync(_this2._id, 'onDeviceSearchButton', e);
      }, false);
      volumedown && window.document.addEventListener("volumedownbutton", function (e) {
        _this2.app.event.emitSync(_this2._id, 'onDeviceVolumeDownButton', e);
      }, false);
      volumeup && window.document.addEventListener("volumeupbutton", function (e) {
        _this2.app.event.emitSync(_this2._id, 'onDeviceVolumeUpButton', e);
      }, false);
      back && window.document.addEventListener("backbutton", function (e) {
        _this2.app.event.emitSync(_this2._id, 'onBackButton', e);
      }, false);
      this.app.event.emit(this._id, 'onDeviceReady');
      this.waits.forEach(function (v) {
        return v();
      });
      this.waits = [];
    }
  }, {
    key: "exitApp",
    value: function exitApp() {
      navigator.app.exitApp();
    }
  }, {
    key: "ready",
    value: function ready() {
      var _this3 = this;

      if (this.isReady) return _promise.default.resolve(window.cordova);
      return new _promise.default(function (resolve) {
        return _this3.waits.push(function () {
          return resolve(window.cordova);
        });
      });
    } // invoke
    // ----------------------

  }, {
    key: "invoke",
    value: function invoke(obj, method) {
      if (!this.isReady) {
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
      if (!this.isReady) {
        this.app.log.error('cordova api', 'run before cordova ready');
        return;
      }

      return this.app.utils.pathSet(window, path, value);
    }
  }, {
    key: "getProp",
    value: function getProp(path) {
      if (!this.isReady) {
        this.app.log.error('cordova api', 'run before cordova ready');
        return;
      }

      return this.app.utils.pathGet(window, path);
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
      return new _promise.default(function (resolve, reject) {
        window.resolveLocalFileSystemURL(url, function (fileEntry) {
          fileEntry.file(function (file) {
            resolve(file);
          }, function (error) {
            error.message = options.fileErrorMessage;
            reject(error);
          });
        }, function (error) {
          error.message = options.fileErrorMessage;
          reject(error);
        });
      });
    }
  }, {
    key: "isCordova",
    get: function get() {
      return Boolean(window.cordova);
    }
  }]);
  return Cordova;
}();

var _default = {
  _id: 'cordova',
  _onStart: function _onStart(app, plugin, options) {
    app.Cordova = Cordova;
    app.cordova = new Cordova(app, plugin._id, options);
  },
  _onStop: function _onStop(app) {
    delete app.Cordova;
    delete app.cordova;
  }
};
exports.default = _default;
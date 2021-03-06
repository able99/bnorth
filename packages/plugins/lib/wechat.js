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

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

require("core-js/modules/es6.function.name");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * @module
 * @see {@link https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115 微信开发平台}
 */

/**
 * 微信操作对象，由插件构造，挂载在 app 上
 */
var Wechat =
/*#__PURE__*/
function () {
  function Wechat(app, _id, options) {
    (0, _classCallCheck2.default)(this, Wechat);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 所属插件的实例的 id
     * @type {string}
     */

    this._id = _id;
    /**
     * 所属插件的实例的 options
     * @type {module:index~PluginOptions}
     */

    this.options = options;
    this.isSdkReady = false;
    this.initSdkPromise = null;
    this.bridge = null;
    this.sdk = null;
    this.signature = null;
    this.signatureUrl = '';
  }

  (0, _createClass2.default)(Wechat, [{
    key: "getSdk",
    value: function getSdk() {
      var _this = this;

      if (this.sdk) return _promise.default.resolve(this.sdk);
      return this.app.browser.loadjs(this.options.sdkJsUrl || '//res.wx.qq.com/open/js/jweixin-1.4.0.js').then(function () {
        return _this.sdk = window.wx;
      });
    }
  }, {
    key: "getSignature",
    value: function getSignature() {
      var _this2 = this;

      if (this.signature && this.signatureUrl === this.app.browser.url) return _promise.default.resolve(this.signature);
      this.signatureUrl = this.app.browser.url;
      return (this.options.getSignature ? this.options.getSignature(this.signatureUrl) : _promise.default.resolve()).then(function (result) {
        if (!result) throw new Error('无效签名');
        return _this2.signature = result;
      });
    }
  }, {
    key: "initSdk",
    value: function initSdk() {
      var _this3 = this;

      if (this.isSdkReady) return this.sdk;
      if (this.initSdkPromise) return this.initSdkPromise;
      return this.initSdkPromise = new _promise.default(function (resolve, reject) {
        _promise.default.all(_this3.getSdk(), _this3.getSignature()).then(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              sdk = _ref2[0],
              signature = _ref2[1];

          sdk.config({
            appId: signature.appId,
            timestamp: signature.timestamp,
            nonceStr: signature.nonceStr,
            signature: signature.signature,
            jsApiList: ['showMenuItems', 'hideMenuItems', 'chooseWXPay', 'addCard', 'closeWindow'].concat((0, _toConsumableArray2.default)(_this3.options.jsApiListExt || []))
          });
          sdk.ready(function () {
            return resolve(sdk);
          });
          sdk.error(function (res) {
            return reject(res.errMsg);
          });
        }).catch(function (error) {
          reject(error);
        });
      }).then(function (sdk) {
        _this3.isSdkReady = true;
        _this3.initSdkPromise = null;
        return sdk;
      }).catch(function (error) {
        _this3.isSdkReady = false;
        _this3.sdk = null;
        throw error;
      });
    }
  }, {
    key: "readyBridge",
    value: function readyBridge() {
      var _this4 = this;

      return new _promise.default(function (resolve, reject) {
        if (window.WeixinJSBridge) {
          _this4.bridge = window.WeixinJSBridge;
          resolve(_this4.bridge);
        } else {
          document.addEventListener('WeixinJSBridgeReady', function () {
            _this4.bridge = window.WeixinJSBridge;
            resolve(_this4.bridge);
          }, false);
        }
      });
    }
  }, {
    key: "readySdk",
    value: function readySdk() {
      return this.init();
    }
  }, {
    key: "invokeBridge",
    value: function invokeBridge(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.readyBridge(function (bridge) {
        return new _promise.default(function (resolve, reject) {
          bridge.invoke(name, options, function (result) {
            return resolve(result);
          });
        });
      });
    }
  }, {
    key: "invokeSdk",
    value: function invokeSdk(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.readySdk(function (sdk) {
        return new _promise.default(function (resolve, reject) {
          var func = sdk[name];
          if (!func) reject({
            noFunc: true
          });
          func(_objectSpread({
            success: function success(result) {
              return resolve(result);
            },
            fail: function fail(result) {
              return reject(result);
            },
            cancel: function cancel(result) {
              return reject({
                cancel: true
              });
            }
          }, options));
        });
      });
    }
  }, {
    key: "chooseImage",
    value: function chooseImage(options, isBridge) {
      // count: options.count, 
      // sizeType: options.sizeType, 
      // sourceType: options.sourceType, 
      var name = 'chooseImage';
      return isBridge ? this.invokeBridge(name, options) : this.invokeSdk(name, options);
    }
  }, {
    key: "pay",
    value: function pay(options, isBridge) {
      // timestamp: options.timestamp, 
      // nonceStr: options.nonceStr, 
      // package: options.package, 
      // signType: options.signType, 
      // paySign: options.paySign, 
      var name = 'name';
      return isBridge ? this.invokeBridge(name, options) : this.invokeSdk(name, options);
    }
  }]);
  return Wechat;
}();
/**
 * 为 App 实例增加模块，提供了微信操作功能
 * @plugin 
 * @exportdefault
 */


var wechat = function wechat(app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    _id: 'wechat',
    _onStart: function _onStart(app, plugin) {
      /**
       * 为 App 实例增加微信操作类
       * @memberof module:wecaht.wechat
       * @type {module:wecaht~Wechat}
       * @mount app.Wechat
       */
      app.Wechat = Wechat;
      /**
       * 为 App 实例增加微信操作实例
       * @memberof module:wecaht.wechat
       * @type {module:wecaht~Wechat}
       * @mount app.wechat
       */

      app.wechat = new Wechat(app, plugin._id, options);
    },
    _onStop: function _onStop(app) {
      app.event.off(app.wechat._id);
      delete app.Wechat;
      delete app.wechat;
    }
  };
};

var _default = wechat;
exports.default = _default;
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

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * @module
 * @see {@link https://myjsapi.alipay.com/jsapi/index.html 支付宝 H5 开放文档}
 */

/**
 * 支付宝操作对象，由插件构造，挂载在 app 上
 */
var ALipay =
/*#__PURE__*/
function () {
  function ALipay(app, _id, options) {
    (0, _classCallCheck2.default)(this, ALipay);

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
  }

  (0, _createClass2.default)(ALipay, [{
    key: "getSdk",
    value: function getSdk() {
      var _this = this;

      if (this.sdk) return _promise.default.resolve(this.sdk);
      return this.app.browser.loadjs(this.options.sdkJsUrl || 'https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js').then(function () {
        return _this.sdk = window.ap;
      });
    }
  }, {
    key: "initSdk",
    value: function initSdk() {
      var _this2 = this;

      if (this.isSdkReady) return this.sdk;
      if (this.initSdkPromise) return this.initSdkPromise;
      return this.initSdkPromise = this.getSdk().then(function (sdk) {
        _this2.isSdkReady = true;
        _this2.initSdkPromise = null;
        return sdk;
      }).catch(function (error) {
        _this2.isSdkReady = false;
        _this2.sdk = null;
        throw error;
      });
    }
  }, {
    key: "readyBridge",
    value: function readyBridge() {
      var _this3 = this;

      return new _promise.default(function (resolve, reject) {
        if (window.AlipayJSBridge) {
          _this3.bridge = window.AlipayJSBridge;
          resolve(_this3.bridge);
        } else {
          document.addEventListener('AlipayJSBridgeReady', function () {
            _this3.bridge = window.AlipayJSBridge;
            resolve(_this3.bridge);
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
      // count
      // sourceType
      var name = 'chooseImage';
      return isBridge ? this.invokeBridge(name, options) : this.invokeSdk(name, options);
    }
  }, {
    key: "pay",
    value: function pay(options, isBridge) {
      var name = 'tradePay';
      return isBridge ? this.invokeBridge(name, options) : this.invokeSdk(name, options);
    }
  }]);
  return ALipay;
}(); // class ALipay {
//   constructor(app, _id, options) {
//     /**
//      * App 的实例
//      * @type {module:app.App}
//      */
//     this.app = app;
//     /**
//      * 所属插件的实例的 id
//      * @type {string}
//      */
//     this._id = _id;
//     /**
//      * 所属插件的实例的 options
//      * @type {module:index~PluginOptions}
//      */
//     this.options = options;
//     this.isReady = false;
//     this.bridge = null;
//   };
//   ready() {
//     return new Promise((resolve, reject)=>{
//       if (window.AlipayJSBridge) {
//         this.bridge = window.AlipayJSBridge
//         resolve(this.bridge);
//       } else {
//         document.addEventListener('AlipayJSBridgeReady', ()=>{
//           this.bridge = window.AlipayJSBridge
//           resolve(this.bridge);
//         }, false);
//       }
//     });
//   }
//   invoke(name, options) {
//     return this.ready(bridge=>new Promise((resolve, reject)=>{
//       bridge.call(name, options, result=>{
//         resolve(result);
//       });
//     }));
//   }
//   chooseImage(options) {
//     // count: options.count, 
//     // sizeType: options.sizeType, 
//     // sourceType: options.sourceType, 
//     return this.invoke('chooseImage', options);
//   }
//   pay(options) {
//     return this.ready(bridge=>new Promise((resolve, reject)=>{
//       bridge.chooseWXPay({
//         timestamp: options.timestamp, 
//         nonceStr: options.nonceStr, 
//         package: options.package, 
//         signType: options.signType, 
//         paySign: options.paySign, 
//         success: result=>resolve(result),
//         fail: result=>reject(result),
//         cancel: result=>reject({cancel: true}),
//       });
//     }))
//   }
// }

/**
 * 为 App 实例增加模块，提供了支付宝操作功能
 * @plugin 
 * @exportdefault
 */


var alipay = function alipay(app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    _id: 'alipay',
    _onStart: function _onStart(app, plugin) {
      /**
       * 为 App 实例增加支付宝操作类
       * @memberof module:alipay.alipay
       * @type {module:alipay~ALipay}
       * @mount app.ALipay
       */
      app.ALipay = ALipay;
      /**
       * 为 App 实例增加支付宝操作实例
       * @memberof module:alipay.alipay
       * @type {module:alipay~ALipay}
       * @mount app.alipay
       */

      app.alipay = new ALipay(app, plugin._id, options);
    },
    _onStop: function _onStop(app) {
      app.event.off(app.alipay._id);
      delete app.ALipay;
      delete app.alipay;
    }
  };
};

var _default = alipay;
exports.default = _default;
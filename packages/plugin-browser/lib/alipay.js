"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
    this.isReady = false;
    this.bridge = null;
  }

  (0, _createClass2.default)(ALipay, [{
    key: "ready",
    value: function ready() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (window.AlipayJSBridge) {
          _this.bridge = window.AlipayJSBridge;
          resolve(_this.bridge);
        } else {
          document.addEventListener('AlipayJSBridgeReady', function () {
            _this.bridge = window.AlipayJSBridge;
            resolve(_this.bridge);
          }, false);
        }
      });
    }
  }, {
    key: "invoke",
    value: function invoke(name, options) {
      return this.ready(function (bridge) {
        return new Promise(function (resolve, reject) {
          bridge.call(name, options, function (result) {
            resolve(result);
          });
        });
      });
    }
  }, {
    key: "chooseImage",
    value: function chooseImage(options) {
      // count: options.count, 
      // sizeType: options.sizeType, 
      // sourceType: options.sourceType, 
      return this.invoke('chooseImage', options);
    }
  }, {
    key: "pay",
    value: function pay(options) {
      return this.ready(function (bridge) {
        return new Promise(function (resolve, reject) {
          bridge.chooseWXPay({
            timestamp: options.timestamp,
            nonceStr: options.nonceStr,
            package: options.package,
            signType: options.signType,
            paySign: options.paySign,
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
          });
        });
      });
    }
  }]);
  return ALipay;
}();
/**
 * 为 App 实例增加模块，提供了支付宝操作功能
 * @plugin 
 * @exportdefault
 */


var alipay = function alipay(app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    _id: 'alipay',
    onPluginMount: function onPluginMount(app, plugin) {
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
    onPluginUnmount: function onPluginUnmount(app) {
      app.event.off(app.alipay._id);
      delete app.ALipay;
      delete app.alipay;
    }
  };
};

var _default = alipay;
exports.default = _default;
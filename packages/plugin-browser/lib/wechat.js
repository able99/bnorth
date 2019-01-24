"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.function.name");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.promise");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
    this.isReady = false;
    this.initPromise = null;
    this.bridge = null;
    this.signature = null;
    this.signatureUrl = '';
  }

  (0, _createClass2.default)(Wechat, [{
    key: "getBridge",
    value: function getBridge() {
      var _this = this;

      if (this.bridge) return Promise.resolve(this.bridge);
      return this.app.browser.loadjs('//res.wx.qq.com/open/js/jweixin-1.4.0.js').then(function () {
        return _this.bridge = window.wx;
      });
    }
  }, {
    key: "getSignature",
    value: function getSignature() {
      var _this2 = this;

      if (this.signature && this.signatureUrl === this.app.browser.url) return Promise.resolve(this.signature);
      this.signatureUrl = this.app.browser.url;
      return this.app.network.fetch({
        url: this.options.url,
        data: {
          url: this.signatureUrl
        }
      }).then(function (v) {
        if (!v) throw new Error('错误的签名');
        return _this2.signature = v;
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      if (this.isReady) return this.bridge;
      if (this.initPromise) return this.initPromise;
      return this.initPromise = new Promise(function (resolve, reject) {
        Promise.all(_this3.getBridge(), _this3.getSignature()).then(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              bridge = _ref2[0],
              signature = _ref2[1];

          bridge.config({
            appId: signature.appId,
            timestamp: signature.timestamp,
            nonceStr: signature.nonceStr,
            signature: signature.signature,
            jsApiList: ['showMenuItems', 'hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseWXPay', 'addCard', 'closeWindow'].concat((0, _toConsumableArray2.default)(_this3.options.jsApiListExt || []))
          });
          bridge.ready(function () {
            return resolve(bridge);
          });
          bridge.error(function (res) {
            return reject(res.errMsg);
          });
        }).catch(function (error) {
          reject(error);
        });
      }).then(function (bridge) {
        _this3.isReady = true;
        _this3.initPromise = null;
        return bridge;
      }).catch(function (error) {
        _this3.isReady = false;
        _this3.bridge = null;
        throw error;
      });
    }
  }, {
    key: "ready",
    value: function ready() {
      return this.init();
    }
  }, {
    key: "invoke",
    value: function invoke(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.ready(function (bridge) {
        return new Promise(function (resolve, reject) {
          var func = bridge[name];
          if (!func) reject({
            noFunc: true
          });
          func((0, _objectSpread2.default)({
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
    onPluginMount: function onPluginMount(app, plugin) {
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
    onPluginUnmount: function onPluginUnmount(app) {
      app.event.off(app.wechat._id);
      delete app.Wechat;
      delete app.wechat;
    }
  };
};

var _default = wechat;
exports.default = _default;
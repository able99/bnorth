/**
 * @module
 * @see {@link https://myjsapi.alipay.com/jsapi/index.html 支付宝 H5 开放文档}
 */


/**
 * 支付宝操作对象，由插件构造，挂载在 app 上
 */
class ALipay {
  constructor(app, _id, options) {
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
  };

  getSdk() {  
    if(this.sdk) return Promise.resolve(this.sdk);
    return this.app.browser.loadjs(this.options.sdkJsUrl||'https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js').then(()=>(this.sdk = window.ap));
  }

  initSdk() {
    if(this.isSdkReady) return this.sdk;
    if(this.initSdkPromise) return this.initSdkPromise;

    return this.initSdkPromise = this.getSdk().then(sdk=>{
      this.isSdkReady = true;
      this.initSdkPromise = null;
      return sdk;
    }).catch(error=>{
      this.isSdkReady = false;
      this.sdk = null;
      throw error;
    })
  }


  readyBridge() {
    return new Promise((resolve, reject)=>{
      if (window.AlipayJSBridge) {
        this.bridge = window.AlipayJSBridge
        resolve(this.bridge);
      } else {
        document.addEventListener('AlipayJSBridgeReady', ()=>{
          this.bridge = window.AlipayJSBridge
          resolve(this.bridge);
        }, false);
      }
    });
  }

  readySdk() {
    return this.init();
  }

  invokeBridge(name, options={}) {
    return this.readyBridge(bridge=>new Promise((resolve, reject)=>{
      bridge.invoke(name, options, result=>resolve(result));
    }));
  }

  invokeSdk(name, options={}) {
    return this.readySdk(sdk=>new Promise((resolve, reject)=>{
      let func = sdk[name];
      if(!func) reject({noFunc: true});
      func({
        success: result=>resolve(result),
        fail: result=>reject(result),
        cancel: result=>reject({cancel: true}),
        ...options,
      }); 
    }));
  }

  
  chooseImage(options, isBridge) {
    // count
    // sourceType
    let name = 'chooseImage';
    return isBridge?this.invokeBridge(name, options):this.invokeSdk(name, options);
  }

  pay(options, isBridge) {
    let name = 'tradePay';
    return isBridge?this.invokeBridge(name, options):this.invokeSdk(name, options);
  }
}

// class ALipay {
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
let alipay = (app,options={})=>({
  _id: 'alipay',

  _onStart(app, plugin) {
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

  _onStop(app) {
    app.event.off(app.alipay._id);
    delete app.ALipay;
    delete app.alipay;
  },
})


export default alipay;
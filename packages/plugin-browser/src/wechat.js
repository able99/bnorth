/**
 * @module
 * @see {@link https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115 微信开发平台}
 */


/**
 * 微信操作对象，由插件构造，挂载在 app 上
 */
class Wechat {
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
    this.signature = null;
    this.signatureUrl = '';
  };

  getSdk() {  
    if(this.sdk) return Promise.resolve(this.sdk);
    return this.app.browser.loadjs(this.options.sdkJsUrl||'//res.wx.qq.com/open/js/jweixin-1.4.0.js').then(()=>(this.sdk = window.wx));
  }

  getSignature() {
    if(this.signature && this.signatureUrl===this.app.browser.url) return Promise.resolve(this.signature);
    this.signatureUrl = this.app.browser.url;

    return (this.options.getSignature?this.options.getSignature(this.signatureUrl):Promise.resolve()).then(result=>{
      if(!result) throw new Error('无效签名');
      return this.signature = result;
    })
  }

  initSdk() {
    if(this.isSdkReady) return this.sdk;
    if(this.initSdkPromise) return this.initSdkPromise;

    return this.initSdkPromise = new Promise((resolve, reject)=>{
      Promise.all(this.getSdk(), this.getSignature()).then(([sdk, signature])=>{
        sdk.config({
          appId: signature.appId,
          timestamp: signature.timestamp,
          nonceStr: signature.nonceStr,
          signature: signature.signature,
          jsApiList: [
            'showMenuItems', 'hideMenuItems', 'chooseWXPay', 'addCard', 'closeWindow', 
            ...this.options.jsApiListExt||[],
          ],
        });
        sdk.ready(()=>resolve(sdk));
        sdk.error(res=>reject(res.errMsg));
      }) .catch(error=>{
        reject(error);
      })
    }).then(sdk=>{
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
      if (window.WeixinJSBridge) {
        this.bridge = window.WeixinJSBridge
        resolve(this.bridge);
      } else {
        document.addEventListener('WeixinJSBridgeReady', ()=>{
          this.bridge = window.WeixinJSBridge
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
    // count: options.count, 
    // sizeType: options.sizeType, 
    // sourceType: options.sourceType, 
    let name = 'chooseImage';
    return isBridge?this.invokeBridge(name, options):this.invokeSdk(name, options);
  }

  pay(options, isBridge) {
    // timestamp: options.timestamp, 
    // nonceStr: options.nonceStr, 
    // package: options.package, 
    // signType: options.signType, 
    // paySign: options.paySign, 
    let name = 'name';
    return isBridge?this.invokeBridge(name, options):this.invokeSdk(name, options);
  }
}


/**
 * 为 App 实例增加模块，提供了微信操作功能
 * @plugin 
 * @exportdefault
 */
let wechat = (app,options={})=>({
  _id: 'wechat',

  _onStart(app, plugin) {
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

  _onStop(app) {
    app.event.off(app.wechat._id);
    delete app.Wechat;
    delete app.wechat;
  },
})


export default wechat;
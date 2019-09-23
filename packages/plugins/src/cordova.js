/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


class Cordova {
  constructor(app, _id, options={}) {
    this.app = app;
    this._id = _id;
    this.options = {
      cordovaNotReady: '引擎尚未启动',
      fileErrorMessage: '文件读取错误',
      ...options,
    }
    this.isReady = false;
    this.waits = [];
    window.document.addEventListener("deviceready", ()=>this._handleReady(), false);
    if(!this.isCordova) {
      let fileref=document.createElement('script');
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src", "./cordova.js")
      document.getElementsByTagName("head")[0].appendChild(fileref);  
    }
  };

  _handleReady() {
    this.isReady = true;
    let {back, menu, search, volumedown, volumeup} = this.options;
    window.document.addEventListener("pause", ()=>{this.app.event.emit(this._id, 'onDevicePause')}, false);
    window.document.addEventListener("resume", ()=>{this.app.event.emit(this._id, 'onDeviceResume')}, false);
    menu&&window.document.addEventListener("menubutton", e=>{this.app.event.emitSync(this._id, 'onDeviceMenuButton', e)}, false);
    search&&window.document.addEventListener("searchbutton", e=>{this.app.event.emitSync(this._id, 'onDeviceSearchButton', e)}, false);
    volumedown&&window.document.addEventListener("volumedownbutton", e=>{this.app.event.emitSync(this._id, 'onDeviceVolumeDownButton', e)}, false);
    volumeup&&window.document.addEventListener("volumeupbutton", e=>{this.app.event.emitSync(this._id, 'onDeviceVolumeUpButton', e)}, false);
    back&&window.document.addEventListener("backbutton", e=>{this.app.event.emitSync(this._id, 'onBackButton', e)}, false);
    this.app.event.emit(this._id, 'onDeviceReady');
    this.waits.forEach(v=>v());
    this.waits = [];
  }

  get isCordova() {
    return Boolean(window.cordova);
  }

  exitApp() {
    navigator.app.exitApp();
  }

  ready() {
    if(this.isReady) return Promise.resolve(window.cordova);
    return new Promise((resolve)=>this.waits.push(()=>resolve(window.cordova)));
  }

  // invoke
  // ----------------------
  invoke(obj, method, ...args) {
    if(!this.isReady) {
      this.app.log.error('cordova api', 'run before cordova ready');
      return;
    }

    obj = this.app.utils.pathGet(window, obj);
    if(!obj) {
      this.app.log.error('cordova api', 'no this cordova plugin obj');
      return;
    }

    if(!obj[method]) {
      this.app.log.error('cordova api', 'no this cordova plugin method');
      return;
    }

    return obj[method].apply(obj, args);
  }

  setProp(path, value) {
    if(!this.isReady) {
      this.app.log.error('cordova api', 'run before cordova ready');
      return;
    }

    return this.app.utils.pathSet(window, path, value)
  }

  getProp(path) {
    if(!this.isReady) {
      this.app.log.error('cordova api', 'run before cordova ready');
      return;
    }

    return this.app.utils.pathGet(window, path);
  }

  // file
  // -----------------------
  getFileUrl(root, pathname) {
    if(root&&pathname) {
      return window.cordova.file[root] + pathname;
    }else if(root&&!root.startsWith('file')) {
      return 'file://' + root;
    }else {
      return root;
    }
  }

  getFile(url, options) {
    options = this.app.getOptions(this.options, options);

    return new Promise((resolve, reject)=>{
      window.resolveLocalFileSystemURL(url, fileEntry=>{
        fileEntry.file(file=>{
          resolve(file);
        }, error=>{ 
          error.message = options.fileErrorMessage;
          reject(error);
        })
      },error=>{ 
        error.message = options.fileErrorMessage;
        reject(error);
      })
    });
  }
}


export default {
  _id: 'cordova',

  _onStart(app, plugin, options) {
    app.Cordova = Cordova;
    app.cordova = new Cordova(app, plugin._id, options);
  },

  _onStop(app) {
    delete app.Cordova;
    delete app.cordova;
  },
}

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


class Cordova {
  constructor(app, options, _id) {
    this.app = app;
    this.options = options;
    this.ready = false;
  };

  // 
  // ----------------------
  isOnCordova() {
    return /(?:cordova)/.test(window.navigator.userAgent) || /(?:Crosswalk)/.test(window.navigator.userAgent);
  }

  // invoke
  // ----------------------
  invoke(obj, method, ...args) {
    if(!this.ready) {
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
    if(!this.ready) {
      this.app.log.error('cordova api', 'run before cordova ready');
      return;
    }

    return this.app.utils.pathSet(window, path, value)
  }

  getProp(path) {
    if(!this.ready) {
      this.app.log.error('cordova api', 'run before cordova ready');
      return;
    }

    return this.app.utils.pathGet(window, path);
  }


  // init
  // -------------------------
  _handleReady() {
    this.ready = true;
    let {back, menu, search, volumedown, volumeup} = this.options.buttons||{};

    window.document.addEventListener("pause", ()=>{this.app.event.emit(this.options._id, 'onPause')}, false);
    window.document.addEventListener("resume", ()=>{this.app.event.emit(this.options._id, 'onResume')}, false);
    
    menu&&window.document.addEventListener("menubutton", e=>{this.app.event.emitSync(this.options._id, 'onMenuButton', e)}, false);
    search&&window.document.addEventListener("searchbutton", e=>{this.app.event.emitSync(this.options._id, 'onSearchButton', e)}, false);
    volumedown&&window.document.addEventListener("volumedownbutton", e=>{this.app.event.emitSync(this.options._id, 'onVolumeDownButton', e)}, false);
    volumeup&&window.document.addEventListener("volumeupbutton", e=>{this.app.event.emitSync(this.options._id, 'onVolumeUpButton', e)}, false);
    back&&window.document.addEventListener("backbutton", e=>{
      back===true?this.app.event.emitSync(this.options._id, 'onBackButton', e):app.keyboard.emit({type: 'keydown', keyCode: back});
    }, false);

    this.app.event.emit(this.options._id, 'onDeviceReady');
  }

  init() {
    if(!this.isOnCordova()) return Promise.resolve();
    return this.app.browser.loadjs('./cordova.js').then(()=>{window.document.addEventListener("deviceready", ()=>{this._handleReady()}, false)});
  }

  exitApp() {
    navigator.app.exitApp();
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
          reject(err);
        })
      },error=>{ 
        error.message = options.fileErrorMessage;
        reject(err);
      })
    });
  }
}


Cordova.options = {
  cordovaNotReady: '引擎尚未启动',
  fileErrorMessage: '文件读取错误',
}

export default {
  pluginName: 'cordova',
  _dependencies: 'browser',

  onPluginMount(app, plugin, options={}) {
    app.Cordova = Cordova;
    options._id = plugin._id;
    app.cordova = new Cordova(app, options);
  },

  onPluginUnmount(app) {
    delete app.Cordova;
    delete app.cordova;
  },
}

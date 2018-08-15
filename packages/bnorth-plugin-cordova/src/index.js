/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


class Cordova {
  constructor(app) {
    this.app = app;
    this.ready = false;
  };

  exitApp() {
    navigator.app.exitApp();
  }

  isOnCordova() {
    return /(?:cordova)/.test(window.navigator.userAgent) || /(?:Crosswalk)/.test(window.navigator.userAgent);
  }

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

  init(listenBackButton) {
    if(!this.isOnCordova()) return Promise.resolve();
    return new Promise((resolve, reject)=>{
      this.app.browser.loadjs('./cordova.js').then(v=>{
        window.document.addEventListener("deviceready", ()=>{
          resolve();
          this.ready = true;
          this.app.event.emit(this, 'onDeviceReady');
        }, false);
        window.document.addEventListener("pause", ()=>{
          this.app.event.emit(this, 'onPause');
        }, false);
        window.document.addEventListener("resume", ()=>{
          this.app.event.emit(this, 'onResume');
        }, false);
        listenBackButton && window.document.addEventListener("backbutton", e=>{
          this.app.event.emitSync(this, 'onBackButton', e);
        }, false);
        window.document.addEventListener("menubutton", e=>{
          this.app.event.emitSync(this, 'onMenuButton', e);
        }, false);
        window.document.addEventListener("searchbutton", e=>{
          this.app.event.emitSync(this, 'onSearchButton', e);
        }, false);
        window.document.addEventListener("volumedownbutton", e=>{
          this.app.event.emitSync(this, 'onVolumeDownButton', e);
        }, false);
        window.document.addEventListener("volumeupbutton", e=>{
          this.app.event.emitSync(this, 'onVolumeUpButton', e);
        }, false);
      })
    })
  }
}

export default {
  // plugin 
  // --------------------------------
  pluginName: 'cordova',
  pluginDependence: ['browser'],

  onPluginMount(app) {
    app.Cordova = Cordova;
    app.cordova = new Cordova(app);
  },

  onPluginUnmount(app) {
    delete app.Cordova;
    delete app.cordova;
  },
}

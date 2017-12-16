import config from './config';
import { appPluginBefore, appPluginAfter } from './appPlugin';


let _instance = null;
export default class App {
  // constructor
  //--------------------
  static instance(...args) {
    if(_instance) return _instance;
    return new App(...args);
  }
  constructor(options) {
    if(!_instance) {
      this.options = options||{};
      this.config = Object.assign(config,this.options.config||null);
      this._startEvents = options.startEvents || ['onConfigBefore', 'onConfig', 'onImportStyles', 'onImportStylesAfter', 'onCreateStoreBefore', 'onCreateStore', 'onCreateStoreAfter', 'onImportRoutes', 'onImportRoutesAfter' ,'onHook', 'onRender'];

      this.stateError = false;
      this._plugins = [];
      this.routes = null;
      this.actions = {};
      this.actionStates = {};
      this.reducers = {};
      this.pages = [];

      this.use(appPluginBefore);
      this.options.plugin&&this.use(this.options.plugin);
    }

    _instance = this;
    window.app = _instance;
    return _instance;
  }

  // dom
  //--------------------
  get domRoot() {
    return document.getElementById(this.options.domIdRoot||'root');
  }

  get domWaiting() {
    return document.getElementById(this.options.domIdWaiting||'waiting');
  }

  removeWaiting() {
    this.domWaiting && this.domWaiting.remove();
  }

  // plugins 
  //--------------------
  use(plugin) {
    this._plugins.push(plugin);
    plugin.init && plugin.init(this);
  }
  unuse(plugin) {
    this._plugins.remove(plugin);
  }
  trigger(event, ...args) {
    let ret;
    for(let v of this._plugins) {
      try{
        ret = v[event] && v[event](this, ...args);
        if(ret){ return ret; }
      }catch(e){ this.error(e); }
    }
    return ret;
  }

  // start
  //--------------------
  async start() {
    this.use(appPluginAfter);
    try{
      for(let event of this._startEvents){
        for(let v of this._plugins) {
          if(v[event] &&  await v[event](this)) continue;
        }
      }
    }catch(e){
      this.error(e);
      this.errorRender(e);
      return e;
    }
  }

  // interface
  //--------------------
  log(...args) {
    this.trigger('onLog',null,false,...args);
  }
  debug(...args) {
    if(!this.config.debug) return;
    this.trigger('onLog',null,false,...args);
  }
  verbose(...args) {
    if(!this.config.verbose) return;
    this.trigger('onLog',null,false, ...args);
  }
  error(...args) {
    this.trigger('onLog','error',true,...args);
  }
  errorRender(...args) {
    if(this.stateError)return;
    this.trigger('onRenderMessage',...args);
    this.stateError=true;
  }
  errorNotice(...args) {
    this.trigger('onNoticeMessage',...args);
  }
}

  /**
   * onAction,
   * onStateChange,
   * onReducer,
   */
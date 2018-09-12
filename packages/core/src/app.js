import Utils from './utils';
import Log from './log';
import Event from './event';
import Config from './config';
import Plugins from './plugins';
import State from './state';
import Page from './page';
import Router from './router';
import Context from './context';
import Render from './render';
import Keyboard from './keyboard';


export default class App {
  constructor(options={}) {
    // app props
    // ----------------------------
    this._startEvents = ['onAppStarting', 'onAppStartConfig', 'onAppStartRouter', 'onAppStartContext','onAppStartHack', 'onAppStartRender', 'onAppStarted'];
    this._id = options._id||'^app';
    this.options = options;

    // app core modal
    // ----------------------------
    this.State = State;
    this.Page = Page;

    this.Utils = this.options.Utiles||Utils;
    this.utils = new this.Utils(this, options);
    this.Log = this.options.Log||Log;
    this.log = new this.Log(this, options);
    this.Event = this.options.Event||Event;
    this.event = new this.Event(this, options);
    this.Plugins = this.options.Plugins||Plugins;
    this.plugins = new this.Plugins(this, options);
    this.Keyboard = this.options.Keyboard||Keyboard;
    this.keyboard = new this.Keyboard(this, options);
    this.Context = this.options.Context||Context;
    this.context = new this.Context(this, options);
    this.Router = this.options.Router||Router;
    this.router = new this.Router(this, options);
    this.Render = this.options.Render||Render;
    this.render = new this.Render(this, options);


    // app init
    // ----------------------------
    window.app = this;
    if(this.options.plugin) {
      this.options.plugin._id = this._id;
      this.plugins.add(this.options.plugin);
    }
  }

  async start() {
    this.log.info('app start');
    try{
      for (let v of this._startEvents) {
        await this.event.emitSync(this._id, v, this);
        this.event.delete(v, this._id);
      }
    }catch(e){
      this.log.error('app start', e);
      this.render.critical(e, {title:'app start error'});
      return e;
    }
  }
}
/**
 * @module
 */

import Utils from './utils';
import Log from './log';
import Event from './event';
import Plugins from './plugins';
import State from './state';
import Page from './page';
import Router from './router';
import Context from './context';
import Render from './render';
import Keyboard from './keyboard';

/**
 * App 构建参数
 * @global
 * @typedef AppOptions
 * @type {object}
 * @property {string} [id='^app'] - 配置 app id
 * @property {class} Utils - 替换默认的app utils 模块
 * @property {class} Event - 替换默认的app Event 模块
 * @property {class} Plugins - 替换默认的app Plugins 模块
 * @property {class} Keyboard - 替换默认的app Keyboard 模块
 * @property {class} Context - 替换默认的app Context 模块
 * @property {class} Router - 替换默认的app Router 模块
 * @property {class} Render - 替换默认的app Render 模块
 * @property {class} State - 替换默认的app State 构造器
 * @property {class} Page - 替换默认的app Page 组件
 * @property {Object} plugin - app plugin，是 app 的第一个 plugin
 */
    


/**
 * web 应用的主类，其他模块和插件的功能都会挂在在该的实例上。用户需要实例化，并调用 start 方法启动应用。
 * 
 * start 方法首先会加载各个模块，然后按照 _startEvents 顺序发出事件，各个模块和插件在事件驱动下运行。
 * @exportdefault
 * @example
 * ```js
 * import App from '@bnorth/core';
 * let app = new App();
 * app.start();
 * ```
 */
 class App {
  /**
   * 应用构建函数，完成对参数的配置，模块的加载
   * @param {AppOptions} - 配置参数 
   */
  constructor(options={}) {
    /**
     * 启动事件列表，app.start 过程，将依次被触发，可以在调用 app.start 前修改，默认包括：
     * 
     * 1. onAppStarting：app 启动前触发
     * 1. onAppStartConfig：启动后首先进入配置阶段
     * 1. onAppStartRouter：路由初始化阶段事件
     * 1. onAppStartContext：数据管理器初始化阶段
     * 1. onAppStartHack：hack 阶段，一般在此期间，完成对 app 的个性化定制
     * 1. onAppStartRender：dom 描画初始化阶段，创建根组件
     * 1. onAppStarted：启动完成
     * @type {string[]}
     */
    this._startEvents = ['onAppStarting', 'onAppStartConfig', 'onAppStartRouter', 'onAppStartContext','onAppStartHack', 'onAppStartRender', 'onAppStarted'];
    /**
     * id
     * @type {string}
     */
    this._id = options._id||'^app';
    /**
     * app 参数
     * @property {string} id - id
     */
    this.options = options;

    /**
     * State 数据状态的类
     * @type {State}
     */
    this.State = this.options.State||State;
    /**
     * Page 单个页面的组件
     * @type {Page}
     */
    this.Page = this.options.Page||Page;
    /**
     * Utils 模块类，实现一些常用的工具函数
     * @type {class}
     */
    this.Utils = this.options.Utiles||Utils;
    /**
     * Utils 的实例
     * @type {module:utils.Utils}
     */
    this.utils = new this.Utils(this, options);
    /**
     * Log 模块类，负责日志管理
     * @type {class}
     */
    this.Log = this.options.Log||Log;
    /**
     * Log 的实例
     * @type {Log}
     */
    this.log = new this.Log(this, options);
    /**
     * Event 模块，负责事件的管理
     * @type {class}
     */
    this.Event = this.options.Event||Event;
    /**
     * Event 的实例
     * @type {Event}
     */
    this.event = new this.Event(this, options);
    /**
     * Plugins 模块，负责插件的管理
     * @type {class}
     */
    this.Plugins = this.options.Plugins||Plugins;
    /**
     * Plugins 的实例
     * @type {Plugins}
     */
    this.plugins = new this.Plugins(this, options);
    /**
     * Keyboard 模块，负责键盘事件的管理
     * @type {class}
     */
    this.Keyboard = this.options.Keyboard||Keyboard;
    /**
     * Keyboard 的实例
     * @type {Keyboard}
     */
    this.keyboard = new this.Keyboard(this, options);
    /**
     * Context 模块，负责数据流管理
     * @type {class}
     */
    this.Context = this.options.Context||Context;
    /**
     * Context 的实例
     * @type {Context}
     */
    this.context = new this.Context(this, options);
    /**
     * Router 模块，负责页面管理
     * @type {class}
     */
    this.Router = this.options.Router||Router;
    /**
     * Router 的实例
     * @type {Router}
     */
    this.router = new this.Router(this, options);
    /**
     * Render 模块，提供实际 dom 渲染功能
     * @type {class}
     */
    this.Render = this.options.Render||Render;
    /**
     * Render 的实例
     * @type {Render}
     */
    this.render = new this.Render(this, options);

    if(this.options.plugin) {
      this.options.plugin._id = this._id;
      this.plugins.add(this.options.plugin);
    }

    /**
     * 将 App 实例设置到 window.app 
     * @global
     * @mount window.app
     * @type {module:app.App}
     */
    window.app = this;
  }

  /**
   * 启动 app，根据配置，触发一系列的启动事件，最终完成应用启动
   * @async
   */
  async start() {
    this.log.info('app start');
    try{
      for (let v of this._startEvents) {
        await this.event.emit(this._id, v, this);
        this.event.delete(v, this._id);
      }
    }catch(e){
      this.log.error('app start', e);
      this.render.critical(e, {title:'app start error'});
      return e;
    }
  }
}

export default App;
/**
 * @module
 */

import Utils from './utils';
import Log from './log';
import Event from './event';
import Plugins from './plugins';
import State from './state';
import Page from './page';
import PopLayer from './poplayer';
import Router from './router';
import Context from './context';
import Render from './render';
import Keyboard from './keyboard';

/**
 * App 构建参数
 * @typedef AppOptions
 * @type {object}
 * @property {string} [id='^app'] - 配置 app id
 * @property {class?} Utils - 替换默认的app utils 模块
 * @property {class?} Event - 替换默认的app Event 模块
 * @property {class?} Plugins - 替换默认的app Plugins 模块
 * @property {class?} Keyboard - 替换默认的app Keyboard 模块
 * @property {class?} Context - 替换默认的app Context 模块
 * @property {class?} Router - 替换默认的app Router 模块
 * @property {class?} Render - 替换默认的app Render 模块
 * @property {class?} State - 替换默认的app 数据单元类
 * @property {class?} Page - 替换默认的app 页面组件
 * @property {class?} PopLayer - 替换默认的app 弹出层组件
 * @property {string?} rootId - react 渲染到的跟元素的 css 选择字符串
 * @property {module:plugins~PluginDefine?} plugin - app 插件，是 app 的第一个插件
 */
    
/**
 * 应用启动前事件
 * @event module:app.App#onAppStarting
 */
/**
 * 启动后首先进入配置阶段
 * @event module:app.App#onAppStartConfig
 */
/**
 * 路由初始化阶段事件
 * @event module:app.App#onAppStartRouter
 */
/**
 * 数据管理器初始化阶段
 * @event module:app.App#onAppStartContext
 */
/**
 * 定制阶段事件，一般在该事件里处理定制
 * @event module:app.App#onAppStartCustom
 */
/**
 * 进行 dom render 阶段
 * @event module:app.App#onAppStartRender
 */
/**
 * 应用启动完成
 * @event module:app.App#onAppStarted
 */


/**
 * web 应用的主类，其他模块和插件的功能都会挂在在该的实例上。用户需要实例化，并调用 start 方法启动应用。
 * start 方法首先会加载各个模块，然后按照 _startEvents 属性定义的顺序触发事件，各个模块和插件在事件驱动下运行。
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
   * @param {module:app~AppOptions} - 配置参数 
   */
  constructor(options={}) {
    /**
     * 启动事件列表，app.start 过程，将依次被触发，可以在调用 app.start 前修改
     * @type {string[]}
     */
    this._startEvents = ['onAppStarting', 'onAppStartConfig', 'onAppStartRouter', 'onAppStartContext','onAppStartHack', 'onAppStartRender', 'onAppStarted'];
    /**
     * 应用 id
     * @type {string}
     */
    this._id = options._id||'^app';
    /**
     * app 构建参数
     * @type {module:app~AppOptions}
     */
    this.options = options;

    /**
     * State 数据状态的类
     * @type {module:state.State}
     */
    this.State = this.options.State||State;
    this.State.app = this;
    /**
     * Page 单个页面的组件
     * @type {module:page.Page}
     */
    this.Page = this.options.Page||Page;
    this.Page.app = this;
    /**
     * Page 弹出层组件
     * @type {module:poplayer.PopLayer}
     */
    this.PopLayer = this.options.PopLayer||PopLayer;
    this.PopLayer.app = this;
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
     * @type {module:log.Log}
     */
    this.log = new this.Log(this, options);
    /**
     * Event 模块，负责事件的管理
     * @type {class}
     */
    this.Event = this.options.Event||Event;
    /**
     * Event 的实例
     * @type {module:event.Event}
     */
    this.event = new this.Event(this, options);
    /**
     * Plugins 模块，负责插件的管理
     * @type {class}
     */
    this.Plugins = this.options.Plugins||Plugins;
    /**
     * Plugins 的实例
     * @type {module:plugins.Plugins}
     */
    this.plugins = new this.Plugins(this, options);
    /**
     * Keyboard 模块，负责键盘事件的管理
     * @type {class}
     */
    this.Keyboard = this.options.Keyboard||Keyboard;
    /**
     * Keyboard 的实例
     * @type {module:keyboard.Keyboard}
     */
    this.keyboard = new this.Keyboard(this, options);
    /**
     * Context 模块，负责数据流管理
     * @type {class}
     */
    this.Context = this.options.Context||Context;
    /**
     * Context 的实例
     * @type {module.context.Context}
     */
    this.context = new this.Context(this, options);
    /**
     * Router 模块，负责页面管理
     * @type {class}
     */
    this.Router = this.options.Router||Router;
    /**
     * Router 的实例
     * @type {module:router.Router}
     */
    this.router = new this.Router(this, options);
    /**
     * Render 模块，提供实际 dom 渲染功能
     * @type {class}
     */
    this.Render = this.options.Render||Render;
    /**
     * Render 的实例
     * @type {module:render.Render}
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
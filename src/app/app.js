/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import config from './config';
import { appPluginBefore, appPluginAfter } from './appPlugin';


let _instance = null;


/**
 * 应用程序的主入口类
 * 使用单例模式，保证只有一个应用实例，建立后通过start 函数启动应用
 * @class App
 * @example
 * ```js
 * let app = App.instance({});
 * app.start();
 * ```
 */
/**
 * @property {object} config app 配置类，参见[config](/#/?name=%2Fbase%2Fconfig)
 */
export default class App {
  // constructor
  //--------------------
  /**
   * 获取单例
   * @method
   * @static
   * @param {object} options 应用的参数，参见构造函数
   */
  static instance(...args) {
    if(_instance) return _instance;
    return new App(...args);
  }

  /**
   * 构造函数
   * @constructor
   * @param {object} options 
   * ```js
   * options = {
   *   config       // 配置参数，参见config 模块
   *   startEvents  // 启动阶段各个回调函数名称数组，建议不要修改该参数，比如丢失了onRender 事件，将无法显示
   *   plugin       // 插件，参见插件
   *   domIdRoot    // html中react 根元素名称，默认 `root`
   *   domIdWaiting // html中等待react加载的元素名称，默认 `waiting`
   *   middlewares  // redux 中间件数组，默认为空
   *   status       // redux store 中的起始数据，默认为空
   * }
   * ```
   */
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
  /**
   * @property {element} [domRoot=root] root元素
   */
  get domRoot() {
    return document.getElementById(this.options.domIdRoot||'root');
  }

  /**
   * @property {element} [domWaiting=waiting] waiting元素
   */
  get domWaiting() {
    return document.getElementById(this.options.domIdWaiting||'waiting');
  }

  /**
   * 移除react 加载动画
   * @method 
   */
  removeWaiting() {
    this.domWaiting && this.domWaiting.remove();
  }

  // plugins 
  //--------------------
  /**
   * 添加插件到应用中，插件需要符合标准
   * @method
   * @param {!plugin} plugin 
   */
  use(plugin) {
    this._plugins.push(plugin);
    plugin.init && plugin.init(this);
  }
  /**
   * 移除指定插件
   * @method
   * @param {!name} plugin 
   */
  unuse(name) {
    this._plugins
    .filter(v.name===name)
    .forEach(v=>{
      this._plugins.remove(v);
    });
  }
  /**
   * 触发app 指定事件
   * @method
   * @param {!string} event 事件名称
   * @param {...args} [args] 事件参数
   */
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
  /**
   * 应用程序启动
   * @method start
   */
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
  /**
   * 打印日志-普通级别
   * @method
   * @param {...args} args 
   */
  log(...args) {
    this.trigger('onLog',null,false,...args);
  }
  /**
   * 打印日志-调试级别
   * @method
   * @param {...args} args 
   */
  debug(...args) {
    if(!this.config.debug) return;
    this.trigger('onLog',null,false,...args);
  }
  /**
   * 打印日志-冗余级别
   * @method
   * @param {...args} args 
   */
  verbose(...args) {
    if(!this.config.verbose) return;
    this.trigger('onLog',null,false, ...args);
  }
  /**
   * 打印日志-错误级别
   * @method
   * @param {...args} args 
   */
  error(...args) {
    this.trigger('onLog','error',true,...args);
  }
  /**
   * 将错误通过页面渲染方式显示，整个应用将停止，仅显示错误
   * @method
   * @param {...args} args 
   */
  errorRender(...args) {
    if(this.stateError)return;
    this.trigger('onRenderMessage',...args);
    this.stateError=true;
  }
  /**
   * 将错误通过notice方式显示
   * @method
   * @param {...args} args 
   */
  errorNotice(...args) {
    this.trigger('onNoticeMessage',...args);
  }
}


/**
 * 添加到app 中，扩展app 的功能
 * 插件主要实现各个回调函数，在函数中对app进行扩展或者实现特定功能
 * 回调函数可能是初始化函数，启动阶段的各个函数或者由app 或者其他插件trigger 的事件
 * @class plugin
 * @example
 * ```js
 * let plugin = {
 *   name: 'xxx',
 *   init(app) {
 *     ... // 在插件添加时执行初始化，比如修改app 的属性，比如添加actions
 *   },
 *   xxx(app) {
 *     ... // 在app 各个startEvents 事件中，或者trigger 的特定事件时执行，同上
 *   }
 * }
 * ```
 */

/**
 * @property {string} name - 插件名称，同名称插件不能同时使用
 */

/**
 * 插件被初始化时，在此初始化插件，修改app内容，扩展app功能，比如actions等
 * @callback init
 * @param {App} app - 应用程序App的实例
 */

/**
 * 启动阶段的回调函数，按顺序如下
 * 1. onConfigBefore - 配置阶段之前，该阶段可以从网络获取配置信息
 * 1. onConfig - 配置阶段，该阶段可以修改app.config 的默认配置和增加应用程序级别的配置
 * 1. onImportStyles - css加载阶段
 * 1. onImportStylesAfter - css加载完成，该阶段可以修改css 样式
 * 1. onCreateStoreBefore - 建立redux store之前
 * 1. onCreateStore - 建立redux store
 * 1. onCreateStoreAfter - redux store建立完成，该阶段可以添加新的action
 * 1. onImportRoutes - 加载路由表
 * 1. onImportRoutesAfter - 路由表加载结束，该阶段可以修改paths 信息
 * 1. onHook - hook阶段，该阶段可以修改app中各个类的默认行为
 * 1. onRender - 启动结束，开始渲染
 * 
 * 函数支持async异步处理，在该阶段没有处理完之前，下一阶段函数不会调用
 * ```js
 * onImportRoutes(app) {
 *   return import('./routes/xxx').then(v=>{app.routes = v});
 * }
 * ```
 * @callback XXX
 * @param {App} app - 应用程序App的实例
 */

/**
 * 启动后进入应用运行阶段
 * 应用将要启动阶段
 * @callback onAppWillStart
 */

/**
 * 应用已启动
 * @callback onAppStart
 */

/**
 * 应用已停止
 * @callback onAppStop
 */

/**
 * 应用暂停，应用切换到后台时触发，仅混合开发时有效
 * @callback onAppResume
 */

/**
 * 应用暂停，应用从后台返回时时触发，仅混合开发时有效
 * @callback onAppPause
 */

/**
 * @callback onErrorPageRender
 */

/**
 * onNavigated
onErrorNavigator
onLog
onRenderMessage
onNoticeMessage
 */
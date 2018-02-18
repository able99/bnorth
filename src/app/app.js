/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React,{cloneElement}  from 'react';
import { render } from 'react-dom';
import { combineReducers,createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router,Route,hashHistory,RouterContext } from 'react-router';
import bindActionCreators from '../utils/bindActionCreators';
import config from './config';
import pageHoc from './page';
import { containerConnect } from './container';
import appPlugin from './appPlugin';
import { AppComponentPage, appComponentContainerCreator } from './appComponent';


let _instance = null;


/**
 * 应用程序的主类
 * 使用单例模式，保证只有一个应用实例，建立后通过start 函数即可启动应用
 * @class
 * @example
 * ```js
 * let app = App.instance({});
 * app.start();
 * ```
 */
export default class App {

  // constructor
  // ------------------------------------------------------------
  /**
   * App 为单例模式，不要直接构造，使用instance 函数构造与获取
   * @constructor
   * @param {object} options - 参数
   * @example
   * ```js
   * options = {
   *   config       // 配置参数，参见config 模块
   *   startEvents  // 启动阶段各个回调函数名称数组，建议不要修改该参数，比如丢失了onRender 事件，将无法显示
   *   plugin       // 用户插件，第一个插入的插件
   *   domIdRoot    // html中react 根元素名称，默认 `root`
   *   middlewares  // redux 中间件数组，默认为空
   *   status       // redux store 中的起始数据，默认为空
   * }
   * 
   * let app = App.instance(options);
   * ```
   */
  constructor(options) {
    if(!_instance) {
      this.options = options||{};

      this._startEvents = options.startEvents || ['onConfigBefore', 'onConfig', 'onImportStyles', 'onImportStylesAfter', 'onCreateStoreBefore', 'onCreateStore', 'onCreateStoreAfter', 'onImportRoutes', 'onImportRoutesAfter' ,'onHook', 'onRender'];
      this._stateError = false;
      this._pluginReady = false;

      /**
       * @property {boolean} started - 是否完成启动
       */
      this.started = false;
      /**
       * @property {config} config - app 配置信息
       */
      this.config = Object.assign(config,this.options.config||{});
      this.config.loadStorage();
      /**
       * @property {route[]} routes - 路由表
       */
      this.routes = null;
      /**
       * @property {action[]} actions - app 的action 函数列表
       */
      this.actions = {};
      /**
       * @property {ActionState[]} actionStates - app 的数据管理器列表
       */
      this.actionStates = {};
      /**
       * @property {reduxer[]} reduxers - app 中正在运行的reduxer 列表
       */
      this.reduxers = {};
      /**
       * @property {Page[]} _pages - app 中正在运行的页面的列表
       */
      this._pages = [];
      /**
       * @property {plugin[]} _plugins - app 中正在运行的插件列表
       */
      this._plugins = [];
      /**
       * @property {Page} _AppComponentPage - app 默认跟页面 Page，已设置默认，一般无需修改
       */
      this._AppComponentPage = AppComponentPage;

      /**
       * @property {containerCreator} _appComponentContainerCreator - app 默认跟页面 Container creator，已设置默认，一般无需修改
       */
      this._appComponentContainerCreator = appComponentContainerCreator;

      /**
       * @property {pageHoc} _pageHoc - app 默认页面Page 高阶组件，已设置默认，一般无需修改
       */
      this._pageHoc = pageHoc;

      /**
       * @property {containerConnect} _containerConnect - app 默认Container 转换函数，已设置默认，一般无需修改
       */
      this._containerConnect = containerConnect;


      if(this.options.plugin) {
        this.options.plugin.name = this.options.plugin.name||'app_custom';
        this.use(this.options.plugin);
      }
    }

    _instance = this;
    window.app = _instance;
    return _instance;
  }

  /** 
   * 获取App单一实例
   * @method
   * @param {object} options - 参数
   */
  static instance(...args) {
    if(_instance) return _instance;
    return new App(...args);
  }

  // react react-script react-redux
  // ---------------------------------------------------------
  /**
   * 建立经过页面组件与页面容器高阶化后的组件
   * @method
   * @param {Page} Page - 页面组件
   * @param {containerCreator} containerCreator - 页面容器
   * @param {string} name - container 名称，该名称同时作为唯一id
   * @return {element} - 返回经过页面组件与页面容器高阶化后的组件
   */
  _createRouteComponent (page, container, name) {
    if(!page) return null;

    page = app._pageHoc(app, page);
    container = app._containerConnect(app, container, name);
    return container?container(page):page;
  }

  /**
   * 建立经过页面组件与页面容器高阶化后的根组件
   * @method
   */
  _createRootRouteComponent() {
    return this._createRouteComponent(this._AppComponentPage, this._appComponentContainerCreator, 'app');
  }

  /**
   * 处理route 进入事件
   * @method
   * @param {*} originOnEnter 
   * @param {*} nextState 
   * @param {*} replace 
   * @param {*} callback 
   */
  _handleRouteOnEnter(originOnEnter, nextState, replace, callback) {
    let ret = this.trigger('onNavigating', nextState);
    if(ret) {
      this.trigger('onNavigatePrevent', nextState);
      replace(ret);
      return;
    }

    if(originOnEnter)
      originOnEnter(nextState, replace, callback);
    else
      callback();
  }

  /**
   * 配置route 属性值
   * @method
   */
  _configRouteProps(route) {
    if(!route||!route.props) return route;
    let app = this;
    let config = this.config;
    if(route.props.onInit) route.props.onInit(app);

    return (function props(route){
      return cloneElement(route,{children:React.Children.map(route.props.children,(v,i)=>{
        let { key } = v;
        let { path, pathname, container, component, components, children, checkLogin, restartOnParamChange, restartOnQueryChange, onEnter, purpose } = v.props;

        // path and path param
        if(path||!key){ path = path===true||!key?'':path; }else{ path = key; }
        let paths = path.split('/');
        let params = paths.filter((v)=>{return v.indexOf(':')===0}).map((v)=>{return v.slice(1)});
        pathname = (pathname||paths[0]||paths[1]||'');

        // navi path
        let pathItem = {path:pathname, params};
        config.paths[pathname.replace(/-/g,'_')] = pathItem;
        if(purpose)config.paths[purpose[0].toUpperCase()+purpose.slice(1)] = pathItem;

        // check login
        let originOnEnter = onEnter;
        onEnter = (route.type === Route)&&((...args)=>app._handleRouteOnEnter(originOnEnter, ...args));
        
        // component
        component = app._createRouteComponent(component, container, `cn:${path}`);

        // components
        if(components){
          Object.keys(components).forEach((v)=>{
            let component = components[v];
            if(component&&typeof(component)==='object'){
              components[v] = app._createRouteComponent(component.component, component.container, `cn:${path}:${v}`);
            }
          });
        }

        // restart
        if(restartOnParamChange||restartOnQueryChange){
          const KeysComponent = component;
          component = function (props) {
            let KeysComponentkey = '/'+path;
            if(restartOnParamChange)KeysComponentkey += Object.keys(props.params).filter((v)=>{return params.indexOf(v)>=0}).map((v)=>{return props.params[v]}).join(':')
            if(restartOnQueryChange)KeysComponentkey += JSON.stringify(props.location.query);
            return (<KeysComponent {...props} key={KeysComponentkey} />);
          }
        }

        route = cloneElement(v,{path,onEnter,component,components});
        if(children){ return props(route); }else{ return cloneElement(route); }
      })});
    })(route);
  }

  /**
   * create redux middleware for runanble action
   * @method
   * @return {function} - redux middleware
   */
  _createThunkMiddleware() {
    return ({ dispatch, getState }) => next => action => {
      if (typeof action === 'function') {
        let title = `action func(${action.fname||action.name||'anonymous'}): `;
        try{
          app.verbose(title);
          return action(app, dispatch, getState);
        }catch(e){
          app.error(title, e);
          app.errorNotice(e);
        }
      }

      app.verbose('action:', action);
      return next(action);
    };
  }

  /**
   * 建立根组件
   * @method
   */
  _createRootComponent() {
    return (
      <Provider store={this.actionStore}>
        <Router 
          history={this.options.history||hashHistory} 
          render={(props)=>{this.trigger('onNavigated', props); return <RouterContext {...props} />}} >
          <Route path="" component={this._createRootRouteComponent()}>
            {this.routes}
          </Route>  
          <Route path="*" onEnter={(...args)=>this.trigger('onErrorNavigator', ...args) }>
          </Route>  
        </Router>
      </Provider>
    )
  }

  /**
   * 获取root 元素
   * @method
   */
  getRootElement() {
    return document.getElementById(this.options.domIdRoot||'root');
  }

  /**
   * app 显示页面等待中的无状态组件函数
   * @method 
   */
  _WaittingComponent(props) {
    let styleSetFull = {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%'};
    let styleSetCenter = {marginTop: '4rem', textAlign: 'center'};
    return <div style={{...styleSetFull, ...styleSetCenter}}>...</div>;
  }

  /**
   * app 显示页面错误的无状态组件函数
   * @method 
   * @param {string} [title='error'] - 错误title
   * @param {Error|element} error - 错误内容
   */
  _ErrorComponent = function(props) {
    let { title, error } = props;
    return (
      <div className="margin">
        <h3>{title||'error'}</h3>
        <h5>{error instanceof Error?error.message:error}</h5>
      </div>
    );
  }

  /**
   * 建立redux 数据仓库
   * @method
   */
  _createStore() {
    const createStoreWithMiddleware = applyMiddleware(this._createThunkMiddleware(), ...(this.options.middlewares||[]))(createStore);
    this.actionStore = createStoreWithMiddleware(combineReducers( this.reduxers), this.options.states);
    this.actions = bindActionCreators(this.actions, this.actionStore.dispatch);
  }

  /**
   * start rendor 
   * @method
   */
  _render() {
    this.verbose('app render:', this.routes, this.config);
    this.routes = this._configRouteProps(this.routes);
    render(this._createRootComponent(),this.getRootElement());
  }


  // pages
  // ---------------------------------------------------------
  /**
   * 将页面添加到页面管理器
   * @method
   * @param {element} - page
   */
  addPage(page) {
    this._pages.push(page);
  }

  /**
   * 将页面从页面管理器中移除
   * @method
   * @param {element} - page
   */
  removePage(page) {
    this._pages.splice(app._pages.indexOf(page),1);
  }

  /**
   * 获取app 中的页面
   * @method
   * @param {undefined|string|number|Page} name - 
   * **默认**：获取最后的页面，即当前焦点页面
   * **空字符串，'/'，0**：获取app 根页面
   * **number**：按页面序号获取
   * **string**：按页面displayName获取
   * **Page**： 直接返回Page
   */
  getPage(name) {
    if(name===undefined){
      return this._pages[this._pages.length-1];
    } else if(name===''||name==='/'||name===0) {
      return this._pages[0];
    } else if(typeof(name)==='number'){
      return this._pages[name];
    } else if(typeof(name)==='string'){
      return this._pages.find(v=>v.props.displayName===name);
    } else {
      return name;
    }
  }


  // plugins 
  // ------------------------------------------------------------
  /**
   * 添加插件到应用中，插件需要符合标准
   * @method
   * @param {!object} plugin - 插件
   */
  use(plugin) {
    if(plugin.name&&this._plugins.find(v=>v.name===plugin.name)){
      let title = 'app plugin error';
      let e = 'plugin has been used with name:' + plugin.name;
      this.error(title, error);
      this.errorRender(title, error)
      return;
    }

    if(plugin.dependences) {
      for(let dependence of (Array.isArray(plugin.dependences)?plugin.dependences:[plugin.dependences])) {
        if(!this._plugins.find(v=>v.name===dependence)){
          let title = 'app plugin error';
          let error = `plugin:${plugin.name} dependence:${dependence} not ready`;
          this.error(title, error);
          this.errorRender(title, error);
          return;
        }
      }
    }

    this._plugins.push(plugin);
    plugin.init && plugin.init(this);
  }

  /**
   * 移除指定插件
   * 移除后，相关处理事件不再处理，但是对app 的修改不能恢复
   * @method
   * @param {!string} name - 要移除插件的名称 
   */
  unuse(name) {
    this._plugins
    .filter(v.name===name)
    .forEach(v=>{
      this._plugins.remove(v);
    });
  }

  /**
   * 获取指定名字的plugin
   * @method
   * @param {!string} name - 要移除插件的名称 
   */
  getPlugin(name) {
    return this._plugins.find(v.name&&v.name===name);
  }

  /**
   * 触发app 指定事件
   * @method
   * @param {!string} event - 事件名称
   * @param {...*} [args] - 事件参数
   */
  trigger(event, ...args) {
    let ret;

    for(let v of this._plugins) {
      let title = `app event(${event}-${v&&v.name}):`;
      try{
        let handler = v&&v[event];
        if(handler) {
          if(event!=='onLog') app.verbose(title, ...args);
          ret = handler(this, ...args);
          if(ret){ return ret; }
        }
      }catch(e){ 
        this.error(title, e); 
        this.errorNotice(e,{title: title});
      } 
    }

    if(event!=='onLog') {
      for(let v of this._pages||[]) {
        try{
          ret = v.props.container&&v.props.container.trigger&&v.props.container.trigger(event, ...args);
          if(ret){ return ret; }
        }catch(e){ 
          let title = `app container event(${event}):`;
          this.error(title, e); 
          this.errorNotice(e,{title: title});
        } 
      }
    }

    return ret;
  }

  // start
  // ------------------------------------------------------------
  /**
   * 应用程序启动
   * @method start
   */
  async start() {
    this.use(appPlugin);
    this._pluginReady = true;
    try{
      for(let event of this._startEvents){
        for(let v of this._plugins) {
          let handler = v&&v[event];
          if(handler) {
            app.verbose(`app start event(${event}-${v&&v.name}):`);
            if(await handler(this)) continue;
          }
        }
      }
      this.started = true;
    }catch(e){
      let title = this.started?'app uncaught error':'app start error';
      this.error(title, e);
      this.errorRender(title, e);
      return e;
    }
  }

  // notice
  // ------------------------------------------------------------
  /**
   * 打印日志-普通级别
   * @method
   * @param {...*} args - 日志列表
   */
  log(...args) {
    if(!this._pluginReady) {
      console.log(...args);
      return;
    }
    this.trigger('onLog',null,false,...args);
  }
  /**
   * 打印日志-调试级别
   * @method
   * @param {...*} args - 日志列表
   */
  debug(...args) {
    if(!this.config.debug) return;
    if(!this._pluginReady) {
      console.log(...args);
      return;
    }
    this.trigger('onLog', 'debug', true, ...args);
  }
  /**
   * 打印日志-冗余级别
   * @method
   * @param {...*} args - 日志列表
   */
  verbose(...args) {
    if(!this.config.verbose) return;
    if(!this._pluginReady) {
      console.log(...args);
      return;
    }
    this.trigger('onLog', 'verbose', false, ...args);
  }
  /**
   * 打印日志-错误级别
   * @method
   * @param {...*} args - 日志列表
   */
  error(...args) {
    if(!this._pluginReady) {
      console.error(...args);
      return;
    }
    this.trigger('onLog', 'error', true, ...args);
  }
  /**
   * 将错误通过页面渲染方式显示，整个应用将停止，仅显示错误
   * @method
   * @param {string} [title] - 消息的标题
   * @param {...*} [args] - 消息列表
   */
  errorRender(...args) {
    if(this._stateError)return;
    if(!this._pluginReady) {
      this.showMessageOnRootElement(args)
      return;
    }
    this.trigger('onRenderMessage',...args);
    this._stateError=true;
  }
  /**
   * 将错误通过notice方式显示
   * @method
   * @param {element} message - 显示的消息
   * @param {object} [props] - 消息显示的ui 属性
   * @param {object} [options] - 消息显示的配置属性
   */
  errorNotice(...args) {
    if(!this.started) {
      this.showMessageByAlert(args[0]);
      return;
    }
    this.trigger('onNoticeMessage',...args);
  }

  /**
   * 显示错误到页面，同时将停止app 运行
   * @method
   */
  showMessageOnRootElement(title, message) {
    render(<this._ErrorComponent title={title} error={typeof(message)==='object'&&message.message||String(message)} />, this.getRootElement());
  }

  /**
   * 用alert 方式显示消息
   * @method
   */
  showMessageByAlert(message) {
    alert(message);
  }

  // store
  // ---------------------------------------------------
  /**
   * 增加新的actions，暂未实现
   * @param {action[]} actions - action 列表
   */
  bindActionCreators(actions) {
  }

  /**
   * 增加新的reduxer，暂未实现
   * @method
   * @param {reduxer[]} reduxers - reduxer 列表
   */
  combineReduxers(reduxers) {
  }

  /**
   * 分发action
   * @method
   * @param {!action} action - 要发射的action 
   */
  dispatch(action) {
    if(!action) return;
    app.actionStore.dispatch(action);
  }

  /**
   * 获取数据仓库
   * @method
   * @param {string} [name] - 获取指定名称的仓库，默认为空，获取整个仓库
   * @param {*} [defaultValue] - 没有获取到时的默认值
   */
  getState(name, defaultValue) {
    let state = this.actionStore.getState();
    return (name?state[name]:state)||defaultValue;
  }
}

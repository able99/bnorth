/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React,{cloneElement}  from 'react';
import { render } from 'react-dom';
import { bindActionCreators,combineReducers,createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router,Route,hashHistory,RouterContext } from 'react-router';
import config from './config';
import containerHoc from './containerHoc';
import pageHoc from './pageHoc';
import { AppComponentPage, appComponentContainer } from './appComponent';


//======================
// functions
//======================

/**
 * 组合页面组件与页面容器，返回raect router使用的组件
 * @function
 * @param {App} app - App实例
 * @param {page} page - 页面组件
 * @param {container} container - 页面容器
 * @return {element} - 返回经过页面组件与页面容器高阶化后的组件
 * @example
 * ```js
 * createRouteComponent(app, page, container);
 * ```
 */
export function createRouteComponent (app, page, container) {
  if(!page) return null;
  page = app.pageHoc(app, page);
  container = app.containerHoc(app, container);
  
  return container?container(page):page;
}

/*!
 * @function
 */
function routeOnEnter(originOnEnter, nextState, replace, callback) {
  let ret = app.trigger('onNavigating', nextState);

  if(ret) {
    app.trigger('onNavigatePrevent', nextState);
    replace(ret);
  }

  if(originOnEnter)
    originOnEnter(nextState, replace, callback);
  else
    callback();
}

/*!
 * @function
 */
function routeProps(route, config, app) {
  if(!route||!route.props) return route;
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
      onEnter = route===Route?routeOnEnter.bind(null, originOnEnter):null;
      
      // component
      component = createRouteComponent(app, component, container);

      // components
      if(components){
        Object.keys(components).forEach((v)=>{
          let component = components[v];
          if(component&&typeof(component)==='object'){
            components[v] = createRouteComponent(app, component.component,component.container);
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

/*!
 * @function
 * @param {*} extraArgument 
 */
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(app, dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

/*!
 * @function
 */
function createRootComponent() {
  return (
    <Provider store={app.actionStore}>
      <Router 
        history={app.options.history||hashHistory} 
        render={(props)=>{
          app.trigger('onNavigated', props);
          return <RouterContext {...props} />
        }} >
        <Route 
          path="" 
          component={createRouteComponent(app, app.AppComponentPage, app.appComponentContainer)}>
          {app.routes}
        </Route>  
        <Route 
          path="*" 
          onEnter={(...args)=>{
            return app.trigger('onErrorNavigator', ...args);
          }}>
        </Route>  
      </Router>
    </Provider>
  )
}


//======================
// app plugin
//======================

/**
 * 应用的基本插件，该插件是第一个添加到应用的插件，实现了应用运行的基本功能
 * **插件 - app ** 该类为插件类扩展了App 的能力 - 依赖插件 `data`
 * app.actions.xxx: 若干方法
 * @class pluginApp
 */

// app action
//-----------------------------------------
const ActionAppReady = 'ActionAppReady';
/**
 * **action** 改变app ready 状态，app ready后，会关闭waiting 动画，显示渲染的内容
 * @method appReady
 * @param {boolean} ready 
 * @example
 * ```js
 * app.actions.appReady(true)
 * ```
 */
let appReady = (ready)=>(app)=>{
  app.getPage(0).props.states._page.setValue('ready',ready);
}

/**
 * **action** 显示通知内容
 * @method
 * @param {element|string} message - 消息框内容
 * @param {object} [props] - 消息显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 消息显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeMessage(message);
 * ```
 */
let noticeMessage = (...args)=>(app)=>{
  app.trigger('onNoticeMessage', ...args);
}
/**
 * **action** 显示页面加载进度
 * @method
 * @param {boolean} show - 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} [props] - 显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeLoading(true);
 */
let noticeLoading = (...args)=>(app)=>{
  app.trigger('onNoticeLoading', ...args);
}

/**
 * 显示阻塞操作的加载页面
 * @method 
 * @param {boolean} show 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} [props] - 显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeBlocking(true);
 */
let noticeBlocking = (...args)=>(app)=>{
  app.trigger('onNoticeBlocking', ...args);
}

export let appPlugin = {
  name: 'app',
  dependences: ['data'],

  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      appReady,
      noticeMessage,
      noticeLoading,
      noticeBlocking,
    });
  },

  onCreateStore(app) {
    const createStoreWithMiddleware = applyMiddleware(createThunkMiddleware(), ...(app.options.middlewares||[]))(createStore);
    app.actionStore = createStoreWithMiddleware(combineReducers( app.reducers), app.options.states);
    app.actions = bindActionCreators(app.actions, app.actionStore.dispatch);
  },

  onRender(app) {
    app.routes = routeProps(app.routes, app.config, app);
    render(createRootComponent(),app.getRootElement());
  },

  onErrorNavigator(app, nextState, replace) {
    app.error('app navigator error', `no route:${nextState.location.pathname}`);
    replace('/');
  },

  onErrorPageRender(app, error, title='page render error') {
    app.error(title ,error);
    setTimeout(()=>app.errorRender(title, error),0);
    return null;
  },

  onRenderMessage(app, title, ...error ) {
    app.showMessageOnRootElement(title ,error);
  },

  onNoticeMessage(app, message) {
    app.showMessageByAlert(message)
  },

  /*！
   * 实现了默认log 显示
   */
  onLog(app, type, trace, ...args) {
    if(trace)console.trace();
    if(type==='error'){
      console.error(...args);
    }else if(type==='debug'){
      console.debug(...args);
    }else{
      console.log(...args);
    }
  },
}


// app class
//======================
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
  //--------------------

  /**
   * App 为单例模式，不要直接构造，使用instance 函数构造与获取
   * @constructor
   * @param {object} options - 参数
   * @example
   * ```js
   * options = {
   *   config       // 配置参数，参见config 模块
   *   startEvents  // 启动阶段各个回调函数名称数组，建议不要修改该参数，比如丢失了onRender 事件，将无法显示
   *   plugin       // 插件，参见插件
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
       * @property {object} config app 配置类，参见[config](/#/?name=%2Fbase%2Fconfig)
       */
      this.config = Object.assign(config,this.options.config||null);
      /**
       * @property {object[]} pages - app 中正在运行的插件列表
       */
      this._plugins = [];
      /**
       * @property {object} pages - 路由表
       */
      this.routes = null;
      /**
       * @property {object[]} pages - app 的action 函数列表
       */
      this.actions = {};
      /**
       * @property {object[]} pages - app 的数据管理器列表
       */
      this.actionStates = {};
      /**
       * @property {object[]} pages - app 中正在运行的reduxer 列表
       */
      this.reducers = {};
      /**
       * @property {object[]} pages - app 中正在运行的页面的列表
       */
      this.pages = [];

      /**
       * @property {object} AppComponentPage - app 默认跟页面 Page，已设置默认，一般无需修改
       */
      this.AppComponentPage = AppComponentPage;

      /**
       * @property {object} appComponentContainer - app 默认跟页面 Container，已设置默认，一般无需修改
       */
      this.appComponentContainer = appComponentContainer;

      /**
       * @property {object} pageHoc - app 默认页面Page 高阶组件，已设置默认，一般无需修改
       */
      this.pageHoc = pageHoc;

      /**
       * @property {object} containerHoc - app 默认Container 转换函数，已设置默认，一般无需修改
       */
      this.containerHoc = containerHoc;

      /**
       * @property {element} ErrorComponent - app 默认显示页面错误的组件，已设置默认，一般无需修改
       */
      this.ErrorComponent = function(props) {
        let { title, error } = props;
        return (
          <div className="margin">
            <h3>{title||'error'}</h3>
            <h5>{error instanceof Error?error.message:error}</h5>
          </div>
        );
      }

      /**
       * @property {element} WaitingComponent - app 默认等待页面组件，已设置默认，一般无需修改
       */
      this.WaittingComponent = function(props) {
        let styleSetFull = {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%'};
        let styleSetCenter = {marginTop: '4rem', textAlign: 'center'};
        return <div style={{...styleSetFull, ...styleSetCenter}}>...</div>;
      }

      this.options.plugin&&this.use(this.options.plugin);
    }

    _instance = this;
    window.app = _instance;
    return _instance;
  }
  /*!
   * 单例模式
   * @param {*} args 
   */
  static instance(...args) {
    if(_instance) return _instance;
    return new App(...args);
  }

  // dom
  //--------------------
  /**
   * 获取root 元素
   * @method
   */
  getRootElement() {
    return document.getElementById(this.options.domIdRoot||'root');
  }

  /**
   * 显示错误到页面，同时将停止app 运行
   * @method
   */
  showMessageOnRootElement(title, message) {
    render(<this.ErrorComponent title={title} error={typeof(message)==='object'&&message.message||String(message)} />, this.getRootElement());
  }

  /**
   * 用alert 方式显示消息
   * @method
   */
  showMessageByAlert(message) {
    alert(message);
  }


  // pages
  // -------------------

  /**
   * 获取app 中的页面
   * @method
   * @param {string|number} name - 
   * **默认**：获取最后的页面，即当前焦点页面
   * **空字符串，'/'，0**：获取app 根页面
   * **number**：按页面序号获取
   * **string**：按页面displayName获取
   */
  getPage(name) {
    if(name===undefined){
      return this.pages[this.pages.length-1];
    } else if(name===''||name==='/'||name===0) {
      return this.pages[0];
    } else if(typeof(name)==='number'){
      return this.pages[name];
    } else if(typeof(name)==='string'){
      return this.pages.find(v=>v.props.displayName===name);
    } else {
      return name;
    }
  }

  // plugins 
  //--------------------

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
   * 触发app 指定事件
   * @method
   * @param {!string} event - 事件名称
   * @param {...*} [args] - 事件参数
   */
  trigger(event, ...args) {
    let ret;

    for(let v of this._plugins) {
      try{
        ret = v[event] && v[event](this, ...args);
        if(ret){ return ret; }
      }catch(e){ 
        this.error('app trigger error', e); 
        this.errorNotice(e,{title: 'app trigger error'});
      } 
    }

    for(let v of this.pages||[]) {
      try{
        if(!v.props.container||!v.props.container.handlers) continue;
        ret = v.props.container.handlers[event] && v.props.container.handlers[event](...args);
        if(ret){ return ret; }
      }catch(e){ 
        this.error('app trigger error', e); 
        this.errorNotice(e,{title: 'app trigger error'});
      } 
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
    this.use(appPlugin);
    this._pluginReady = true;
    try{
      for(let event of this._startEvents){
        for(let v of this._plugins) {
          if(v[event] &&  await v[event](this)) continue;
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
  //--------------------

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
    this.trigger('onLog',null,false,...args);
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
    this.trigger('onLog',null,false, ...args);
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
    this.trigger('onLog','error',true,...args);
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
      this.showMessageByAlert(args);
      return;
    }
    this.trigger('onNoticeMessage',...args);
  }

  // store
  // -----------------
  bindActionCreators(actions) {
  }

  combineReducers(reducers) {
  }

  /**
   * 分发action
   * @method
   * @param {object} action - 要发射的action 
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


// plugin
//======================

/**
 * 插件实现回调函数，app 触发相应时间时被调用，完成对app 的初始化和配置及实现特定的功能
 * 回调函数可能是初始化函数，启动阶段的各个函数或者由app，页面或者其他插件trigger 的事件
 * @class plugin
 * @example
 * ```js
 * let plugin = {
 *   name: 'xxx',
 *   dependence: 'yyy',
 *   init(app) {
 *     ... 
 *   },
 *   onZZZ(app) {
 *     ... 
 *   }
 * }
 * ```
 */

/**
 * @property {string} name - 插件名称，同名称插件不能同时使用
 */

/**
 * @property {string|string[]} dependence - 该插件依赖的插件或插件列表
 */

/**
 * 当插件被安装到app 时触发，该阶段可以初始化插件和修改app 的内容
 * @callback init
 * @param {App} app - 应用程序App的实例
 */
 
/**
 * 当启动阶段中，进入配置过程前触发，该阶段可以从网络获取配置信息
 * @callback onConfigBefore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入配置过程时触发，该阶段可以增加和修改app 的默认配置
 * @callback onConfig
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入css 样式加载过程时触发，该阶段可以从网络引入css 样式文件
 * @callback onImportStyles
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成css 样式加载过程时触发，该阶段可以对加载后的css 样式进行覆盖修改和添加新的css 样式
 * @callback onImportStylesAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入数据仓库建立阶段前触发，该阶段每个应用可以将action 或者 reduxer 添加进来，丰富app 的功能
 * @callback onCreateStoreBefore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入仓库建立阶段触发，app plugin 在该阶段完成数据仓库的建立，各个应用一般无需参与
 * @callback onCreateStore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成仓库建立阶段后触发，
 * @callback onCreateStoreAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入路由配置阶段时触发，每个应用必须实现该回调函数，并设置app.routes 参数，app 才可以正常运行
 * @callback onImportRoutes
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成路由配置阶段时触发，该阶段可以修改由路由生成的app.config.paths 的路径信息
 * @callback onImportRoutesAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当在启动过程进入hook 阶段时触发，该阶段可以修改app 的默认行为
 * @callback onHook
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段结束，开始react 渲染时触发，app plugin 将会负责渲染，各个应用一般无需参与
 * @callback onRender
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段结束后，进入应用运行阶段，应用将要启动时触发
 * @callback onAppWillStart
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用已完成启动时触发
 * @callback onAppStart
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用已停止时触发
 * @callback onAppStop
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用从后台返回时触发，仅混合开发时有效
 * @callback onAppResume
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用切换到后台时触发，仅混合开发时有效
 * @callback onAppPause
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当页面组件render错误时触发
 * @callback onErrorPageRender
 * @param {App} app - 应用App 的实例
 * @param {Error} error - 页面render 的异常信息对象
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当准备导航到新的页面时触发，返回path，将重定向到制定地址
 * @callback onNavigating
 * @param {App} app - 应用App 的实例
 * @param {object} nextState - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {string} - 返回需要阻止，并替换当前导航的地址，同时将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当导航到新的页面时触发
 * @callback onNavigated
 * @param {App} app - 应用App 的实例
 * @param {object} nextState - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当当前导航被阻止时触发
 * @callback onNavigatePrevent
 * @param {App} app - 应用App 的实例
 * @param {object} nextState - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当导航出错时触发，比如无法匹配的导航路径等问题
 * @callback onErrorNavigator
 * @param {App} app - 应用App 的实例
 * @param {object} nextState - 页面路由信息，参见[react-router3 route-onEnter函数]()
 * @param {function} replace - 调用后可重定向路径的函数，参见[react-router3 route-onEnter函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要打印日志时触发
 * @callback onLog
 * @param {App} app - 应用App 的实例
 * @param {string} type - debug|error|verbose，表示日志的等级
 * @param {boolean} trace - 是否打印trace
 * @param {...*} args - 日志的列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要以页面render方式显示信息时触发
 * @callback onRenderMessage
 * @param {App} app - 应用App 的实例
 * @param {string} title - 消息的标题
 * @param {...*} [args] - 消息列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要以notice方式显示信息时触发
 * @callback onNoticeMessage
 * @param {App} app - 应用App 的实例
 * @param {element|string} message - 显示的消息
 * @param {object} [props] - 消息显示的ui 属性
 * @param {object} [options] - 消息显示的配置属性
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

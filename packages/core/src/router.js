/**
 * @module
 */
import RouterComponent from './router.component'
import RouterError from './router.error';
import RouterLoader from './router.loader';

let ParamSpe = ':';


/**
 * 路由声明对象
 * @typedef RouteDefine
 * @type {object}
 * @property {!component} component - 页面的 component
 * @property {module:page~PageControllerDefine?} controller - 页面的 controller
 * @property {(object|string[])?} subPageInfos - 嵌套的子页面，字符串数组表示子页面名称与页面路由名称相同
 * @property {function?} loader - 懒加载函数，如果路由声明对象包含此参数，则不显示页面，而是显示加载页面，并调用并同步等待懒加载函数返回，再刷新页面。用户需要在懒加载函数中，返回路由声明对象。
 * @property {*} xxx - 定制的路由属性
 * @example
 * ***懒加载***
 * ```js
 * {
 *   'dynamic': {
 *      loader: ()=>(new Promise((resolve)=>setTimeout(()=>resolve({
 *        component: ()=><div>dynamic page</div>,
 *      }) ,1000)));
 *   },
 * }
 * ```
 * @example
 * ***子页面***
 * ```js
 * {
 *   'home': { component: Home, subPageInfos: ['sub1', 'sub2']},
 *   'sub1': Sub1,
 *   'sub2': Sub2,
 * }
 * ```
 */

/**
 * 路径的描述信息
 * @typedef PathInfo
 * @type {object}
 * @property {string} pathname - 路径字符串
 * @property {object} state - 状态数据
 * @property {string} search - 查询字符串
 * @property {string} hash - 锚点字符串
 */

/**
 * 路径条目的描述信息
 * @typedef PathItem
 * @type {string|object|string[]}
 * @property {object} state - 状态数据
 * @property {object} query - 查询字符串键值对对象
 * @property {string} hash - 锚点字符串
 */

/**
 * 页面的描述信息
 * @typedef PageInfo
 * @type {object}
 * @property {string} _id - 页面 id
 * @property {string} _idPrev - 页面的前一页面的 id
 * @property {string} _idParent - 页面的父页面的 id
 * @property {string} pathName - 页面对应的路径字符串
 * @property {string} pageName - 页面的名称
 * @property {string} pagePathName - 页面的路径字符串的当前页面片段
 * @property {string[]} pageParams - 页面的路径字符串参数
 * @property {string} routeName - 路由的名称，路由名称上是包含参数定义的名称
 * @property {module:router~RouteDefine} routeDefine - 路由声明对象
 * @property {string[]} routeParams - 路由的配置参数
 * @property {object} state - 状态数据
 * @property {object} query - 查询字符串数据键值对
 * @property {string} hash - 页面的锚点字符串
 * @property {object} params - 页面参数键值对
 * @property {boolean} isSubPage - 是否是子页面
 * @property {module:router~PageInfo[]} subPageInfos - 子页面描述信息集合
 * @property {module:router~PoplayerInfo[]} popLayerInfos - 所欲页面的弹出层集合
 */

/**
 * 弹出层配置参数
 * @typedef PoplayerOptions
 * @type {object}
 * @property {string?} _id - 指定 id，代替默认 id 生成规则
 * @property {string?} _idPage - 指定页面 id，设置弹出层所属页面
 * @property {boolean?} isModal - 是否是模态，模态将获取键盘焦点
 * @property {boolean?} isContentComponent - 指定是 content 是子组件，还是内容直接渲染
 */

/**
 * 弹出层的描述信息
 * @typedef PoplayerInfo
 * @type {object}
 * @property {component|string|number|element} content - 显示的内容或者组件
 * @property {object} props - 属性
 * @property {module:router~PoplayerOptions} options - 弹出层配置参数
 */


/**
 * 路由信息更新，进行路由组件重画
 * @event module:app.App#onRouterUpdate
 */

/**
 * 路由匹配到页面触发事件
 * @event module:app.App#onRouteMatch
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */

/**
 * 路由错误事件，由于地址与路由表对应路由的参数配置不匹配
 * @event module:app.App#onRouteErrorNoParam
 * @property {string} name - 参数名称
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */

/**
 * 路由错误事件，由于地址与路由表不匹配
 * @event module:app.App#onRouteErrorNoRoute
 * @property {string} pageName - 页面名称
 * @property {module:router~PageInfo} pageInfo - 页面信息
 * @property {module:router~PathInfo} location - 路径信息
 */


/**
 * app 的页面管理器，负责路由映射，页面管理，弹出层管理，导航操作等功能
 * 
 * 一些约定：
 * 
 * 1. 子页面不能再拥有子页面
 * 1. 子页面的可见性由其父页面的可见性决定
 * 
 * @see {@link https://able99.github.io/cbnorth/page.html} bnorth 页面管理
 * @exportdefault
 */
class Router {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  constructor(app) {
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */
    this._id = app._id+'.router';

    /*!
     * 路由描画组件，是所有页面和弹出层的父组件
     */
    RouterComponent.app = app;
    this.Component = RouterComponent;
    this.component = null;
    RouterError.app = app;
    this.ComponentError = RouterError;
    RouterLoader.app = app;
    this.ComponentLoader = RouterLoader;
    /*!
     * 路由集合
     */
    this._routes = {}; 
    /*!
     * 暂存的被阻塞的路径信息
     */
    this._block = undefined;
    
    this.app.event.on(this.app._id, 'onRouteErrorNoRoute', name=>this.error(`route name: ${name}`, 'no route error'), this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoParam', name=>this.error(`params name: ${name}`, 'miss require param error'), this._id);
  }

  destructor() {
    this.app.event.off(this._id);
  }



  // router interface
  // --------------------------------------
  /**
   * 向路由表增加路由
   * @param {string} - 路由名称 
   * @param {module:router~RouteDefine|component} - 路由配置对象 
   */
  addRoute(name, route) {
    if(!name||!route) return;
    this._routes[name] = route;
    route.for&&this.addNavigatorFunction(name, route.for);
  }

  /**
   * addRoute 的批量版本，
   * @param {object} - 路由表键值对
   * 
   * - 键是路由名称，路由名称是包含参数定义的字符串，如果首字母是 `/`，则同时使用为默认根页面
   * - 值是路由配置对象，参见 addRoute
   */
  setRoutes(routes) {
    this._routes = routes;
    Object.entries(this._routes||{}).forEach(([k,v])=>v.for&&this.addNavigatorFunction(k, v.for));
  }

  /**
   * 获取路由表
   * @returns {object} - 路由表
   */
  getRoutes() {
    return this._routes||{};
  }

  /**
   * 获取指定路由名称的路由配置对象
   * @param {string} - 路由名称
   * @returns {module:router~RouteDefine}
   */
  getRouteByRouteName(routeName) {
    let route = this._routes[routeName];
    return route?[route[0], typeof(route[1])==='function'?{component:route[1]}:route[1]]:[];
  }

  /**
   * 获取指定路由名称的路由配置对象
   * @param {string} - 页面名称
   * @returns {module:router~RouteDefine}
   */
  getRouteByPageName(pageName) {
    let route = Object.entries(this._routes).find(([k,v])=>k.split(':')[0]===pageName);
    return route?[route[0], typeof(route[1])==='function'?{component:route[1]}:route[1]]:[];
  }

  /**
   * 为路由模块添加导航函数，即 pushXXX 和 replaceXXX 函数
   * @param {string} - 页面名称 
   * @param {string} - 导航函数名称 
   */
  addNavigatorFunction(pageName, navigatorName) {
    pageName = pageName&&pageName.split(ParamSpe[0])[0];
    navigatorName = navigatorName||this.app.utils.captilaze(pageName);
    this[`push${navigatorName}`] = (...args)=>this.push([pageName, ...args]);
    this[`replace${navigatorName}`] = (...args)=>this.replace([pageName, ...args]);
  }

  /**
   * 获取历史记录的级数
   * @returns {number} 级数
   */
  getHistoryCount() {
    return this.component.historyCount;
  }

  /**
   * 判断是否在根页面
   * @returns {boolean} 是否跟页面
   */
  isRootPath() {
    return this.getPageInfos().slice(-1)[0].name === '/';
  }


  // router navigator interface
  // ----------------------------------------
  /**
   * 记录将要被阻塞的路径
   * @param {(module:router~PathInfo|string|function)?} - 将被阻塞的路径，为空则使用当前路径 
   */
  block(_block) {
    this.app.log.debug('router block', _block);
    if(typeof _block==='function'){
      this._block = this.history.location;
      _block = _block(this.app);
      this._block = _block||this._block;
    }else{
      this._block = _block||this.history.location;
    }
    return true;
  }

  /**
   * 恢复之前被阻塞的路径
   * @param {module:router~PathInfo|string} - 要恢复的路径，为空则使用 block 保存的路径
   */
  restore(location) {
    this.app.log.debug('router restore', location);
    location||this._block?this.history.replace(location||this._block):this.replaceRoot();
    this._block = null;
    return true;
  }

  /**
   * 解析路径参数
   * @param  {...module:router~PathItem} - 路径参数 
   * 
   * 1. 字符串表示页面路由名称，其中有两个特殊页面名称， '/' 表示， '..'
   * 1. 如果参数是数组表示带参数的页面，数组第一个元素表示页面名称路由，其他元素为参数
   * 1. 如果参数是对象，则设为路径信息的，state，query，hash 信息
   * 
   * @returns {module:router~PathInfo} 返回路径描述对象
   */
  getPathInfo(...args) {
    let query = {};
    let state;
    let hash;
    let ignore;
    let pathnames = this.component.state.pageInfos.map(v=>v.pagePathName);

    let addPath = path=>path.split('/').forEach(v=>{
      if(v==='') {
        pathnames = ['/'];
      } else if(path==='..') {
        pathnames = pathnames.slice(0, -1);
      } else {
        pathnames.push(v);
      }
    });

    args.forEach(arg=>{
      if(Array.isArray(arg)) {
        addPath(arg.map((v,i)=>i?encodeURIComponent(v):v).join(':'));
      }else if(typeof arg==='object') {
        if(arg.query) query = arg.query;
        if(arg.state) state = arg.state;
        if(arg.hash) hash = arg.hash;
        if(arg.ignore) ignore = true;
      }else {
        addPath(String(arg));
      }
    })

    return {
      pathname: pathnames.map((v,i,a)=>i===0&&v==='/'&&a.length>1?'':v).join('/'),
      state:this.passState?{...this.history.location.state, ...state}:state,
      search: '?'+Object.entries(this.passQuery?{...this.history.location.query, ...query}:query).map(([k,v])=>k+'='+v).reduce((v1,v2)=>v1+(v1?'&':'')+v2,''),
      hash,
      ignore,
    };
  }

  /**
   * 获取路径名称，但不跳转或者替换，参数参见 getPathInfo
   */
  getPathName(...args) {
    return this.component.history.createHref(this.getPathInfo(...args));
  }

  /**
   * 获取 url，但不跳转或者替换，参数参见 getPathInfo
   */
  getUrl(...args) {
    return window.location.origin+window.location.pathname+window.location.search+this.getPathName(...args);
  }

  /**
   * 跳转路径，参数参见 getPathInfo
   */
  push(...args) {
    this.app.log.debug('router push', args);
    this.component.history.push(this.getPathInfo(...args));
    return true;
  }

  /**
   * 替换路径，参数参见 getPathInfo
   */
  replace(...args) {
    this.app.log.debug('router replace', args);
    this.component.history.replace(this.getPathInfo(...args));
    return true;
  }

  /**
   * 在浏览历史记录中返回
   * @param {number} - 返回的级数 
   */
  back(step=1) {
    this.app.log.debug('router back');
    this.component.history.go(-step);
    return true;
  }

  

  /**
   * 跳转到根页面
   * @param  {...string} - 页面的参数 
   */
  pushRoot(...args) {
    this.push(['/', ...args]);
  }

  /**
   * 替换到根页面
   * @param  {...string} - 页面的参数 
   */
  replaceRoot(...args) {
    this.replace(['/', ...args]);
  }

  /**
   * 跳转到错误显示页面
   * @param {error|string|object} - 错误内容 
   * @param {string} - 错误标题 
   * @param {string} - 错误目标 id 
   */
  error(message, title, _id) {
    return this.component.setState({error: {message, title, _id}});
  }

  getPageInfos() {
    return (this.component&&this.component.state.pageInfos)||[];
  }

  setPageInfos(pageInfos) {
    return this.component&&this.component.setState({pageInfos});
  }

  getPoplayerInfos() {
    return (this.component&&this.component.state.poplayerInfos)||[];
  }

  setPoplayerInfos(poplayerInfos) {
    return this.component&&this.component.setState({poplayerInfos});
  }

  refresh() {
    return this.component&&this.component.setState({error: null});
  }
}


export default Router;
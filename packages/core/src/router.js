/**
 * @module
 */
import React, { cloneElement } from 'react';
import createHistory from 'history/createHashHistory';
import { join } from 'path';
import PageLoading from './router.loading.js'
import PageError from './router.error.js'

let spe = '/';
let ParamSpe = ':';
let SubPageSpe = '|';
let ParamOptional = '?';
let PageSign = '#';


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
 * @property {module:router~PopLayerInfo[]} popLayerInfos - 所欲页面的弹出层集合
 */

/**
 * 弹出层配置参数
 * @typedef PopLayerOptions
 * @type {object}
 * @property {string?} _id - 指定 id，代替默认 id 生成规则
 * @property {string?} _idPage - 指定页面 id，设置弹出层所属页面
 * @property {boolean?} isModal - 是否是模态，模态将获取键盘焦点
 * @property {boolean?} isContentComponent - 指定是 content 是子组件，还是内容直接渲染
 */

/**
 * 弹出层的描述信息
 * @typedef PopLayerInfo
 * @type {object}
 * @property {component|string|number|element} content - 显示的内容或者组件
 * @property {object} props - 属性
 * @property {module:router~PopLayerOptions} options - 弹出层配置参数
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


/*!
 * 提交到 render 模块的的 router 组件，是所有页面和弹出层的父组件
 */
class RouterComponent extends React.Component {
  componentDidMount() {
    this.eventOffRouterUpdate = this.props.app.event.on(this.props.app._id, 'onRouterUpdate', ()=>this.forceUpdate());
  }

  componentWillUnmount() {
    this.eventOffRouterUpdate();
  }

  _renderPage(pageInfo, activeId, focusId){
    let { app } = this.props;
    let {_id, _idParent, isSubPage, popLayerInfos, subPageInfos, routeDefine} = pageInfo||{};

    if(routeDefine.loader){
      routeDefine.loader(app).then(v=>{ Object.assign(routeDefine, v, {loader: null}); this.forceUpdate() })
      return <app.router.PageLoading key={_id} />;
    }else if(typeof routeDefine.component==='function'){
      let props = { 
        app, 
        _id, 
        route: { 
          ...pageInfo,
          isActive: isSubPage?_idParent===activeId:_id===activeId, 
          popLayers: popLayerInfos.map(v=>this._renderPopLayer(v)), 
          subPages: Object.entries(subPageInfos).reduce((v1, [k,v])=>{v1[k]=this._renderPage(v, activeId, focusId); return v1},{}),
          subPageInfos: undefined, popLayerInfos: undefined,
        }, 
      };
      return <app.Page key={_id} {...props} />;
    }else{
      return <app.router key={_id} app={app} data={{errorRoute: "wrong component"}} />
    }
  }

  _renderPopLayer({content:Component, props, options:{_id, isContentComponent}}) {
    let aprops = { ...isContentComponent?{}:Component.props, ...props, key: _id };
    return isContentComponent?<Component {...aprops} />:(typeof Component==='object'&&Component.type?cloneElement(Component, aprops):Component);
  }

  render() {
    let { app } = this.props;
    let {_pageInfos, _error, _activeId, _focusId} = app.router;

    if(_error) return <app.router.PageError app={app} data={_error} />;
    return (
      <React.Fragment>
        {_pageInfos.map(v=>this._renderPage(v, _activeId, _focusId))}
        {app.router._getPopLayerNoPageId().map(v=>this._renderPopLayer({...v}, _activeId, _focusId))}
      </React.Fragment>
    );
  }
}

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
    /**
     * 懒加载页面的加载中组件
     * @type {component}
     */
    this.PageLoading = PageLoading;
    /**
     * 路由错误或者页面错误时的错误显示组件
     * @type {component}
     */
    this.PageError = PageError;
    /**
     * 设置导航时是否传递之前的查询字符串到新页面
     * @type {boolean}
     */
    this.passQuery = false;
    /**
     * 设置导航时是否传递之前的状态数据到新页面
     * @type {boolean}
     */
    this.passState = false;
    /**
     * 设置导航时是否传递之前的页面参数到新页面
     * @type {boolean}
     */
    this.passParams = false;

    /*!
     * 路由描画组件，是所有页面和弹出层的父组件
     */
    this._RouterComponent = RouterComponent;
    /*!
     * 路由集合
     */
    this._routes = {}; 
    /*!
     * 页面实例的集合
     */
    this._pages = {}; 
    /*!
     * 弹出层描述信息集合
     */
    this._popLayerInfos = []; 
    /*!
     * 页面描述信息集合
     */
    this._pageInfos = [];
    /*!
     * 当前顶层页面的 id
     */
    this._activeId = undefined;
    /*!
     * 当前有键盘焦点的 id
     */
    this._focusId = undefined;
    /*!
     * 需要显示在页面上的错误信息
     */
    this._error = undefined;
    /*!
     * 暂存的被阻塞的路径信息
     */
    this._block = undefined;
    /*!
     * 弹出层 id 的随机发生数
     */
    this._popLayerIdRandom = 0;
    /*!
     * 历史栈里面记录的数量
     */
    this._historyCount = 0;
    /*!
     * 暂存各个页面的状态数据，用于返回时恢复
     */
    this._states = {};
    
    this.app.event.on(this.app._id, 'onPageAdd', (_id, page)=>{page&&this._addPage(_id, page)}, this._id);
    this.app.event.on(this.app._id, 'onPageRemove', (_id, page)=>{page&&this._removePage(_id)}, this._id);
    this.app.event.on(this.app._id, 'onAppStartRouter', ()=>(this.app.render.component = <this._RouterComponent app={this.app} />), this._id);
    this.app.event.on(this.app._id, 'onAppStartRender', ()=>{this._updateRender()}, this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoRoute', name=>this.error(`route name: ${name}`, 'no route error'), this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoParam', name=>this.error(`params name: ${name}`, 'miss require param error'), this._id);

    this._history = createHistory();
    this._history.listen((location, action)=>this._handleLocationChange(location, action));
    this._handleLocationChange(this._history.location, this._history.action);
  }

  destructor() {
    this.app.event.off(this._id);
  }

  // private work
  // --------------------------------------
  _updateRender() {
    this.app.log.debug('router:update render');
    this.app.event.emit(this.app._id, 'onRouterUpdate');
  }

  _clearError() {
    this._error = null;
  }

  _handleLocationChange(location, action) {
    this.app.log.debug('router location', location);
    this._clearError();

    Object.keys(this._states).filter(v=>!location.pathname.startsWith(v)).forEach(v=>{delete this._states[v]});
    if(location.state) this._states[location.pathname] = location.state;

    location.query = {};
    location.search = location.search.slice(1).trim();
    location.search && location.search.split('&').forEach(v=>{
      let vs = v.split('=');
      location.query[vs[0]] = decodeURIComponent(vs[1]);
    })

    if(action==='PUSH') this._historyCount++;
    if(action==='POP') this._historyCount = Math.max(--this._historyCount, 0);

    let pos = 0;
    let pathnames = [];
    while(pos<location.pathname.length-1) {
      let index = location.pathname.indexOf(spe, pos+1);
      index = index>=0?index:location.pathname.length;
      let sub = location.pathname.slice(pos+1, index);
      if((pos===0&&sub[0]===ParamSpe)||(this.getRouteByPageName(spe+sub.split(ParamSpe)[0]).length)) {
        pathnames.push(spe+sub);
      }else if(pos===0){
        pathnames.push(spe);
        pathnames.push(sub);
      }else {
        pathnames.push(sub);
      }
      pos = index;
    }
    if(!pathnames.length) pathnames.push(spe);
    location.pathnames = pathnames;
    
    this._updateRouterInfo(location);
  };

  async _updateRouterInfo(location) {
    if(!Object.keys(this.getRoutes()).length) return;

    let pathName = '';
    let _idPrev; 
    let params = {};
    let pageInfos = [];
    let focusId = undefined;
    let activeId = undefined;

    /* route */
    for (let pagePathName of location.pathnames) {
      pathName = join(pathName, decodeURIComponent(pagePathName));
      let [pageName, ...pageParams] = pagePathName.split(ParamSpe);
      let _id = PageSign+pathName;
      let pageInfo = { 
        _id, _idPrev, pageName, pathName, pagePathName, isSubPage: false,
        query: location.query, state: this._states[pathName], pageParams, hash: location.hash?location.hash.slice(1):'',
        subPageInfos: {}, popLayerInfos: this._getPopLayerByPageId(_id),
      };
      let [routeName, routeDefine] = this.getRouteByPageName(pageInfo.pageName);
      if(!routeName||!routeDefine) return this.app.event.emit(this.app._id, 'onRouteErrorNoRoute', pageInfo.pageName, pageInfo, location);
      pageInfo.routeName = routeName;
      pageInfo.routeDefine = routeDefine;
      pageInfo.routeParams = routeName.split(ParamSpe).slice(1);

      pageInfo.params = this.passParams?{...params}:{};
      pageInfo.routeParams.forEach((v,i)=>{
        let optional = v.endsWith(ParamOptional);
        if(optional) v = v.slice(0, -1);
        if(!optional&&i>pageInfo.pageParams.length-1) return this.app.event.emit(this.app._id, 'onRouteErrorNoParam', v, pageInfo, location);
        
        pageInfo.params[v] = pageInfo.pageParams[i]?decodeURIComponent(pageInfo.pageParams[i]):null;
        if(this.passParams) params[v] = pageInfo.params[v];
      })

      for (let [k,v] of Array.isArray(routeDefine.subPages)?routeDefine.subPages.map(v=>[v,v]):Object.entries(routeDefine.subPages||{})) {
        let subPageInfo = {...pageInfo};
        subPageInfo._idParent = subPageInfo._id;
        subPageInfo._id = subPageInfo._id + SubPageSpe+v;
        subPageInfo.pageName = v;
        subPageInfo.isSubPage = true;
        subPageInfo.subPageInfos = {};
        subPageInfo.popLayerInfos = this._getPopLayerByPageId(subPageInfo._id);
        let [routeNameSubPage, routeDefineSubPage] = this.getRouteByPageName(subPageInfo.pageName);
        if(!routeNameSubPage||!routeDefineSubPage) return this.app.event.emit(this.app._id, 'onRouteErrorNoRoute', subPageInfo.pageName, subPageInfo, location);
        
        subPageInfo.routeName = routeNameSubPage;
        subPageInfo.routeDefine = routeDefineSubPage;
        pageInfo.subPageInfos[k] = subPageInfo;
      }
      
      _idPrev = _id;
      pageInfos.push(pageInfo);
    }

    /* active & focus */
    let popLayerInfos = this._getPopLayerNoPageId();
    let focusPopLayerInfo = Array.from(popLayerInfos).reverse().find(v=>v.options.isModal);
    let activePageInfo = pageInfos.slice(-1)[0];
    if(focusPopLayerInfo) focusId = focusPopLayerInfo.options._id;
    if(activePageInfo) activeId = activePageInfo._id;
    if(activePageInfo && !focusId){
      let focusPopLayerInfoOfPage = activePageInfo.popLayerInfos&&Array.from(activePageInfo.popLayerInfos).reverse().find(v=>v.options.isModal);
      if(focusPopLayerInfoOfPage) { focusId = focusPopLayerInfoOfPage.options.id }else{ focusId = activePageInfo._id }
    }

    /* match */
    for(let pageInfo of pageInfos) {
      let _block = await this.app.event.emit(this.app._id, 'onRouteMatch', pageInfo, location);
      if(_block) return this.block(_block);
    }

    /* update */
    this._focusId = focusId;
    this._activeId = activeId;
    this._pageInfos = pageInfos;
    this._updateRender();
  }

  _addPage(_id, page) {
    this._pages[_id] = page;
  }
  
  _removePage(_id) {
    let page = this.getPage(_id);
    if(page) {
      this._removePopLayerByPageId(page._id);
      delete this._pages[page._id];
    }
  }

  _getPopLayerNoPageId() {
    return this._popLayerInfos.filter(({options})=>!options._idPage);
  }

  _getPopLayerByPageId(_id) {
    return this._popLayerInfos.filter(({options})=>options._idPage===_id);
  }

  _removePopLayerByPageId(_id) {
    this._getPopLayerByPageId(_id).forEach(v=>this.removePopLayer(v.options._id))
  }

  // pages poplayer interface
  // ---------------------------------------
  /**
   * 获取页面实例
   * @param {(string|number)?} - 获取参数
   * 
   * 1. string：获取指定 id 的页面
   * 1. number：获取指定序号的页面
   * 1. 空：获取顶层页面
   * 
   * @returns {module:page.Page} 页面实例
   */
  getPage(_id) {
    if(typeof _id === 'string') {
      return this._pages[_id];
    } else if(typeof _id === 'number') {
      return this._pages[Object.keys(this._pages)[_id]];
    } else if(_id===undefined){
      return Object.entries(this._pages).filter(([k,v])=>v.props&&v.props.route&&!v.props.route.embed).slice(-1).map(([k,v])=>v)[0];
    }
  }

  /**
   * 获取页面实例集合
   * @returns {module:page.Page[]} 页面实例
   */
  getPages() {
    return this._pages;
  }

  /**
   * 生成弹出层 id
   * @param {module:router~PopLayerOptions} - 配置参数
   * @returns {string} 弹出层 id 
   */
  genPopLayerId(options={}) {
    return options._id || `${++this._popLayerIdRandom}@${options._idPage?options._idPage:'#'}`;
  }

  /**
   * 添加弹出层
   * @param {number|string|component|element} - 内容 
   * @param {object} props - 组件属性
   * @param {module:router~PopLayerOptions} options - 弹出层配置
   * @returns {string} 弹出层 id 
   */
  addPopLayer(content, props={}, options={}) {
    if(!content) return;
    options._id = this.genPopLayerId(options);
    let popLayer = this.getPopLayerInfo(options._id);

    if(!popLayer) {
      this._popLayerInfos.push({ content, props, options });
      options.onAdd && options.onAdd(options._id);
    }else{
      popLayer.content = content;
      popLayer.props = props;
      popLayer.options = options;
    }
    
    this._updateRouterInfo(this._history.location);
    return options._id;
  }

  /**
   * 移除弹出层
   * @param {!string} - 弹出层 id
   */
  removePopLayer(_id) {
    let index = this._popLayerInfos.findIndex(v=>v.options._id===_id);
    if(index<0) return;

    this._popLayerInfos[index].options.onRemove && this._popLayerInfos[index].options.onRemove();
    this._popLayerInfos.splice(index, 1);
    this._updateRouterInfo(this._history.location);
  }

  /**
   * 获取弹出层信息
   * @param {string} - 弹出层 id
   * @returns {module:router~PopLayerInfo}
   */
  getPopLayerInfo(_id) {
    return this._popLayerInfos.find(v=>v.options._id===_id);
  }

  /**
   * 获取全部弹出层信息集合
   * @returns {module:router~PopLayerInfo[]}
   */
  getPopLayerInfos() {
    return this._popLayerInfos;
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
    this._handleLocationChange(this._history.location, this._history.action);
    this._updateRouterInfo(this._history.location);
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
    this._handleLocationChange(this._history.location, this._history.action);
    this._updateRouterInfo(this._history.location);
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
    return this._historyCount;
  }

  /**
   * 判断是否在根页面
   * @returns {boolean} 是否跟页面
   */
  isRootPath() {
    return this.app.router._pageInfos[this.app.router._pageInfos.length-1].name==='/';
  }

  /**
   * 判断是否具有键盘焦点
   * @param {*} - 页面或者弹出层 id
   * @returns {boolean} 是否具有键盘焦点
   */
  isFocus(_id) {
    return this._focusId === _id;
  }

  /**
   * 判断是否是顶层
   * @param {*} - 页面或者弹出层 id
   * @returns {boolean} 是否顶层
   */
  isActive(_id) {
    return this._activeId === _id;
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
      this._block = this._history.location;
      _block = _block(this.app);
      this._block = _block||this._block;
    }else{
      this._block = _block||this._history.location;
    }
    return true;
  }

  /**
   * 恢复之前被阻塞的路径
   * @param {module:router~PathInfo|string} - 要恢复的路径，为空则使用 block 保存的路径
   */
  restore(location) {
    this.app.log.debug('router restore', location);
    location||this._block?this._history.replace(location||this._block):this.replaceRoot();
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
    let pathnames = this._pageInfos.map(v=>v.pagePathName);

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
      }else {
        addPath(String(arg));
      }
    })

    return {
      pathname: pathnames.map((v,i,a)=>i===0&&v==='/'&&a.length>1?'':v).join('/'),
      state:this.passState?{...this._history.location.state, ...state}:state,
      search: '?'+Object.entries(this.passQuery?{...this._history.location.query, ...query}:query).map(([k,v])=>k+'='+v).reduce((v1,v2)=>v1+(v1?'&':'')+v2,''),
      hash,
    };
  }

  /**
   * 获取路径名称，但不跳转或者替换，参数参见 getPathInfo
   */
  getPathName(...args) {
    return this._history.createHref(this.getPathInfo(...args));
  }

  /**
   * 获取 url，但不跳转或者替换，参数参见 getPathInfo
   */
  getUrl(...args) {
    return window.location.origin+window.location.pathname+window.location.search+this.getUrlPath(...args);
  }

  /**
   * 跳转路径，参数参见 getPathInfo
   */
  push(...args) {
    this.app.log.debug('router push', args);
    this._history.push(this.getPathInfo(...args));
    return true;
  }

  /**
   * 替换路径，参数参见 getPathInfo
   */
  replace(...args) {
    this.app.log.debug('router replace', args);
    this._history.replace(this.getPathInfo(...args));
    return true;
  }

  /**
   * 在浏览历史记录中返回
   * @param {number} - 返回的级数 
   */
  back(step=1) {
    this.app.log.debug('router back');
    this._history.go(-step);
    return true;
  }

  /**
   * 强制刷新全部页面
   */
  refresh() {
    this._clearError();
    this._updateRouterInfo(this._history.location);
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
    this._error = {message, title, _id};
    this._updateRender();
  }

}


export default Router;
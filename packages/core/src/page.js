/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * 页面 controller 的声明函数
 * @typedef PageControllerDefineFunction
 * @type {function}
 * @param {module:app.App} app - App 实例
 * @param {module:page.Page} page - 页面的实例
 * @returns {module:page~PageControllerDefine} 页面 controll 声明对象
 */

/**
 * 页面 controller 的声明对象
 * @typedef PageControllerDefine
 * @type {object}
 * @property {function} onXXX - 为页面实例注册 app 事件处理函数
 * @property {function} onPageXXX - 为页面实例注册页面事件处理函数
 * @property {function} onStateXXX - 为页面实例注册数据单元事件处理函数
 * @property {module:state~StateDefine} stateXXX - 为页面实例声明数据单元
 * @property {function} actionXXX - 为页面实例增加 action 函数
 * @property {*} xxx - 为页面实例增加属性或者方法
 */

/**
 * 页面的路由信息
 * @typedef PageRouteInfo
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
 * @property {string} hash - 锚点字符串
 * @property {object} params - 页面参数键值对
 * @property {boolean} isSubPage - 是否是子页面
 * @property {boolean} isActive - 是否是顶层活动页面
 * @property {component} subPages - 子页面集合
 * @property {component} popLayers - 页面所属的弹出层集合
 */


/**
 * 新的页面被添加
 * @event module:app.App#onPageAdd
 * @property {string} _id - 页面 id
 * @property {module:page.Page} page - 页面实例
 */

/**
 * 页面被移除完成
 * @event module:app.App#onPageRemove
 * @property {string} _id - 页面 id
 * @property {module:page.Page} page - 页面实例
 */

/**
 * 页面启动时事件
 * @event module:page.Page#onPageStart
 * @property {module:page.Page} page - 页面实例
 * @property {boolean} isActive - 是否是顶层页面
 */

/**
 * 页面成为活动页面时事件
 * @event module:page.Page#onPageActive
 * @property {module:page.Page} page - 页面实例
 * @property {boolean} onStart - 是否是页面启动过程中触发的
 */

/**
 * 页面成为非活动页面时事件
 * @event module:page.Page#onPageInactive
 * @property {module:page.Page} page - 页面实例
 * @property {boolean} onStop - 是否是页面注销流程中触发的
 */

/**
 * 页面注销时事件
 * @event module:page.Page#onPageStop
 * @property {module:page.Page} page - 页面实例
 */


/**
 * 页面 id，由 router 模块注入
 * @attribute _id
 * @memberof module:page.Page
 * @type {string} 
 */

/**
 * App 的实例，由 router 模块注入
 * @attribute app
 * @memberof module:page.Page
 * @type {module:app.App} 
 */

/**
 * 页面的路由信息，由 router 模块注入
 * @attribute route
 * @memberof module:page.Page
 * @type {module:page~PageRouteInfo} 
 */
 
/**
 * 页面组件，是由页面管理器管理的，是对应路由的 component 的父组件。管理页面的属性方法和事件，管理页面的生命周期，并向 component 注入页面相关属性。
 * @see {@link https://able99.github.io/cbnorth/page.html} bnorth 页面管理
 * @component
 * @exportdefault
 */
export default class Page extends React.Component {
  // page manager
  // ---------------------

  /**
   * 页面集合
   */
  static pages = {};

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
  static getPage(_id) {
    if(typeof _id === 'string') {
      return Page.pages[_id];
    } else if(typeof _id === 'number') {
      let pageinfo = Page.app.router.getPageInfos()[_id];
      return Page.pages[pageinfo&&pageinfo._id];
    } else if(_id===undefined){
      let infos = Page.app.router.getPageInfos();
      let pageinfo = infos[infos.length-1];
      return pageinfo&&Page.pages[pageinfo._id];
    }
  }

  // page interface
  // ---------------------
  /**
   * 页面 id
   * @type {string}
   */
  get _id() { return this.props._id }
  get status() { return this.props.status }
  /**
   * 页面框架的 dom 元素
   * @type {element}
   */
  get dom() { return ReactDOM.findDOMNode(this) }
  get active() { return this._isStatusActive(this.status) }
  _isStatusActive(status) { return status === 'normal' }
  _isStatusStart(status) { return status === 'normal' || status === 'background' }

  /**
   * 通过子页面的名字获取当前页面的子页面实例
   * @param {string} - 子页面名称 
   * @returns {module:page.Page} 子页面实例
   */
  getSubPage(subName) { return Page.getPage(this.props.subPageInfos[subName]&&this.props.subPageInfos[subName]._id) }
  /**
   * 子页面获取父页面的实例
   * @returns {module:page.Page} 父页面实例
   */
  getParrentPage() { return Page.getPage(this.props._idParent) }

  /**
   * 页面获取前一页面的实例
   * @returns {module:page.Page} 父页面实例
   */
  getPrevPage() { return this.app.getPage(this.props._idPrev) }

  // page life
  // ---------------------------
  async _pageInit() {
    let {routeDefine:{component, controller, lazy}={}} = this.props;
    if(lazy) component = await component();
    controller = controller||component.controller||{};
    let options = typeof(controller)==='function'?controller(Page.app, this):controller;

    if(!options.stateData) options.stateData = undefined;
    if(!options.actionGoBack) options.actionGoBack = Page.app.event.createHandler('actionGoBack', ()=>Page.app.router.back(), this);

    this._states = Object.entries(options).filter(([k,v])=>k.startsWith('state')||k.startsWith('_state'));
    Page.app.State.attachStates(this, this._states);

    Object.entries(options).forEach(([k,v])=>{
      if(k.startsWith('on')) { 
        let $ = k.indexOf('$'); let eid = $>0?k.slice($+1):null; k = $>0?k.slice(0, $):k; 
        Page.app.event.on(eid, k, Page.app.event.createHandler(k, v, this), this._id).bind(this); 
      }else if(k.startsWith('_on')) { this[k] = Page.app.event.createHandler(k, v, this).bind(this); 
      }else if(k.startsWith('action')){ this[k] = Page.app.event.createAction(k, v, this).bind(this); 
      }else{ !k.startsWith('state')&&!k.startsWith('_state')&&(this[k]=v) } 
    })

    if(lazy){
      this.props.routeDefine.component = component;
      this.props.routeDefine.lazy = false;
      this.forceUpdate();
    }
  }
  
  _pageStart() {
    if(this._started) return;
    let { _id } = this.props;
    let active = this.active;
    Page.app.event.emit(Page.app._id, 'onPageStart', _id, active);
    this._onStart&&this._onStart(Page.app, this, active);
    active&&Page.app.event.emit(Page.app._id, 'onPageActive', _id, true);
    active&&this._onActive&&this._onActive(Page.app, this, true);
    this._started = true;
  }

  _pageActive() {
    Page.app.event.emit(Page.app._id, 'onPageActive', this._id, true);
    this._onActive&&this._onActive(Page.app, this, false);
  }

  _pageInactive() {
    this._onInactive&&this._onInactive(Page.app, this, false);
  }

  _pageStop() {
    let active = this.props.isInactive;
    // active&&this._onInactive&&this._onInactive(Page.app, this, true);
    Page.app.event.emit(Page.app._id,'onPageStop', this._id, active);
    active&&this._onStop&&this._onStop(Page.app, this, active);
    Page.app.State.detachStates(this, this._states);
  }

  constructor(props) {
    super(props);
    Page.pages[this._id] = this;
    this._pageInit();
    
  }

  componentDidMount() {
    if(this.props.routeDefine.lazy) return;
    let { isSubPage, isSubRoute, status } = this.props;
    if(isSubPage||isSubRoute||status==='normal'||status==='background') this._pageStart();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.routeDefine.lazy) return;
    let { status } = this.props;
    if(!this._started&&(status==='normal'||status==='background')) this._pageStart();
    if(prevProps.status !== 'pushin' && prevProps.status !== 'normal' && status === 'normal') this._pageActive();
    if(prevProps.status === 'normal' && status !== 'normal') this._pageInactive()
  }

  componentWillUnmount() {
    if(!this.props.routeDefine.lazy) this._pageStop();
    let _id = this._id;
    Page.app.event.off(_id);
    delete Page.pages[_id];
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.routeDefine.lazy) return false;
    if(this.props.status!==nextProps.status) return true;
    if(!Page.app.utils.shallowEqual(this.props.routeDefine, nextProps.routeDefine)) return true;
    if(!Page.app.utils.shallowEqual(this.props.params, nextProps.params)) return true;
    if(!Page.app.utils.shallowEqual(this.props.query, nextProps.query)) return true;
    if(Page.app.State.checkStates(this, this.props.context, nextProps.context, this._states)) return true;
    if((this.props.subRoutePageInfo&&!nextProps.subRoutePageInfo)||(!this.props.subRoutePageInfo&&nextProps.subRoutePageInfo)) return true;
    if((this.props.subRoutePageInfo&&nextProps.subRoutePageInfo&&this.props.subRoutePageInfo._id!==nextProps.subRoutePageInfo._id)) return true;
    return false;
  }

  // page render
  // ---------------------

  _showStatus() {
    let status = this.status;
    return status!=='waitting'&&status!=='background';
  }

  _showContentStatus() {
    return !['pushin', 'popin'].includes(this.status);
  }

  _frameProps() {
    let { _id, isSubPage, isSubRoute, routeName } = this.props;

    return {
      'data-page': _id,
      'data-page-sub': isSubPage||isSubRoute?routeName:undefined,
      style: isSubPage||isSubRoute?{
        width: '100%', height: '100%',
      }:{
        display: this._showStatus()?'block':'none',
        position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: 'white',
      },
    }
  }

  _contentProps() {
    let { _id } = this.props;
    return { app: Page.app, page:this, _id, route:this.props, info:this.props, ...Page.app.State.getStates(this, this._states) }
  }

  _loadingContent() {
    return <div style={{marginTop:48,textAlign:'center'}}>...</div>
  }

  render() {
    let { _id, routeDefine:{component:Component, lazy}, children } = this.props;
    let frameProps = this._frameProps();

    if(lazy) return <main {...frameProps}>{this._loadingContent()}</main>;
    
    let contentProps = this._contentProps();
    Page.app.event.emit(Page.app._id, 'onPageRender', _id, contentProps);
    
    return <main {...frameProps}>{this._showContentStatus()?<Component {...contentProps}>{children}</Component>:null}</main>;
  }
}

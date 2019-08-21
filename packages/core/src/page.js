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
class Page extends React.Component {
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
  get _id() { 
    return this.props._id;
  }

  get status() { 
    return this.props.status;
  }
  
  /**
   * 页面框架的 dom 元素
   * @type {element}
   */
  get dom() { 
    return ReactDOM.findDOMNode(this);
  }

  get active() {
    return this.props.status === 'normal';
  }

  /**
   * 通过子页面的名字获取当前页面的子页面实例
   * @param {string} - 子页面名称 
   * @returns {module:page.Page} 子页面实例
   */
  getSubPage(subName) { 
    let _id = this.props.subPages[subName]&&this.props.subPages[subName].props._id;
    return _id && this.props.app.info.getPage(_id);
  }

  /**
   * 子页面获取父页面的实例
   * @returns {module:page.Page} 父页面实例
   */
  getParrentPage() {
    return this.app.getPage(this.props.info._idParent);
  }

  /**
   * 页面获取前一页面的实例
   * @returns {module:page.Page} 父页面实例
   */
  getPrevPage() {
    return this.app.getPage(this.props.info._idPrev);
  }

  /**
   * 动态建立页面 action 函数，*注：* 动态创建一般是在 render 中，渲染时会多次建立，有消耗，建议在 controller 中定义为好
   * @param {!function} - action 函数
   * @param {string?} - action 名称，为空则生成随机名称
   * @returns {function} 页面 action 函数
   */
  action(func, name) {
    if(!name) name = `_${++this._actionNum}`
    let ret = (...args)=>{
      try{
        this.app.log.debug('page action', this._id, name);
        this.app.event.emit(this._id, 'onPageAction', this._id, name);
        return func.apply(this, args);
      }catch(e){
        this.app.log.error('page action', name, e);
        this.app.render.panic(e, {title:`action(${name}) error`, _id: this._id});
      }
    }
    if(name) this[`action${name}`] = ret;
    return ret;
  }

  // page private work
  // ---------------------------
  constructor(props) {
    super(props);
    Page.pages[this._id] = this;

    let {routeDefine:{component, controller}={}} = this.props;
    controller = controller||component.controller||{};
    this.options = typeof(controller)==='function'?controller(Page.app, this):controller;

    if(!this.options.stateData) this.options.stateData = undefined;
    if(!this.options.actionGoBack) this.options.actionGoBack = ()=>Page.app.router.back();

    Page.app.State.attachStates(Page.app, this, this._id, this.options, (k,v,state)=>{
      if(typeof v==='string') return;
      Page.app.event.on(this._id, 'onPageStart', (page,isActive)=>{Page.app.event.emit(this[k]._id, 'onStateStart', this[k]._id, isActive)}, this[k]._id);
      Page.app.event.on(this._id, 'onPageActive', (page,onStart)=>{Page.app.event.emit(this[k]._id, 'onStateActive', this[k]._id, onStart)}, this[k]._id);
      Page.app.event.on(this._id, 'onPageInactive', (page,onStop)=>{Page.app.event.emit(this[k]._id, 'onStateInactive', this[k]._id, onStop)}, this[k]._id);
      Page.app.event.on(this._id, 'onPageStop', (page)=>{Page.app.event.emit(this[k]._id, 'onStateStop', this[k]._id)}, this[k]._id);
    })

    Object.entries(this.options).forEach(([k,v])=>{
      if(k.startsWith('state')||k.startsWith('_state')) { // state
      }else if(k==='onPageAdd'||k==='onPageRemove') { // app event
        Page.app.event.on(Page.app._id, k, v, this._id);
      }else if(k.startsWith('onPage')) { // page event
        Page.app.event.on(this._id, k, v, this._id);
      }else if(k.startsWith('onState')) { // page state event
        let stateEvents = k.split('_');
        if(stateEvents[0]&&this[stateEvents[1]]) Page.app.event.on(this[stateEvents[1]]._id, stateEvents[0], v, this._id);
      }else if(k.startsWith('on')) { // app event
        Page.app.event.on(Page.app._id, k, v, this._id);
      }else if(k.startsWith('action')){ // action
        this[k] = this.action(v, k.slice(6));
      }else{ // user props
        this[k] = v;
      }
    })
  }
  
  // page life circle
  // ---------------------------
  _pageStart() {
    if(this._started) return;
    let { _id } = this.props;
    let active = this.active;

    Page.app.event.emit(_id, 'onPageStart', this, active);
    active && Page.app.event.emit(_id, 'onPageActive', this, true);
    active && Page.app.event.emit(Page.app._id, 'onActivePageChange', _id);
    this._started = true;
  }

  _pageActive() {
    let { _id } = this.props;
    Page.app.event.emit(_id, 'onPageActive', this, false);
    Page.app.event.emit(Page.app._id, 'onActivePageChange', _id);
  }

  _pageInactive() {
    let { _id } = this.props;
    Page.app.event.emit(_id, 'onPageInactive', this, false);
  }

  _pageStop() {
    let { _id } = this.props;
    let active = this.active;

    active&&Page.app.event.emit(_id, 'onPageInactive', this, true);
    Page.app.event.emit(this._id,'onPageStop', this);
    Page.app.event.emit(Page.app._id, 'onPageRemove', _id, this);
    delete Page.pages[_id];
    Page.app.event.off(_id);
  }

  componentDidMount() {
    let { _id, isSubPage, status } = this.props;
    Page.app.log.debug('page did mount', _id);
    Page.app.event.emit(Page.app._id, 'onPageAdd', _id, this);
    if(isSubPage||status==='normal'||status==='background') this._pageStart();
  }

  componentDidUpdate(prevProps, prevState) {
    let { status } = this.props;
    if(!this._started&&(status==='normal'||status==='background')) this._pageStart();
    if(prevProps.status !== 'normal' && status === 'normal') this._pageActive();
    if(prevProps.staus === 'normal' && status !== 'normal') this._pageInactive()
  }

  componentWillUnmount() {
    let { _id } = this.props;
    Page.app.log.debug('page will unmount', _id);
    this._pageStop();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.status!==nextProps.status) return true;
    if(!Page.app.utils.shallowEqual(this.props.routeDefine, nextProps.routeDefine)) return true;
    if(!Page.app.utils.shallowEqual(this.props.params, nextProps.params)) return true;
    if(!Page.app.utils.shallowEqual(this.props.query, nextProps.query)) return true;
    if(Page.app.State.checkStates(this, this.props.context, nextProps.context, this.options)) return true;
    return false;
  }

  _showStatus() {
    return this.props.status==='normal'||this.props.status==='pushout';
  }

  _frameProps() {
    let { _id, isSubPage, routeName } = this.props;

    return {
      'data-page': _id,
      'data-page-sub': isSubPage?routeName:undefined,
      style: isSubPage?{
        width: '100%', height: '100%',
      }:{
        display: this._showStatus()?'block':'none',
        position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: 'white',
      },
    }
  }

  _contentProps() {
    let { _id } = this.props;
    
    return {
      app: Page.app, page:this, _id, route:this.props, info:this.props,
      ...this.options&&Page.app.State.getStates(this, this.options),
    }
  }

  render() {
    let { _id, routeDefine:{component:Component}, children } = this.props;
    Page.app.log.debug('page render', _id);
    this._actionNum = 0;
    
    return <main {...this._frameProps()}><Component {...this._contentProps()}>{children}</Component></main>;
  }
}

export default Page;

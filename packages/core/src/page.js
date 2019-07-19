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
  // page interface
  // ---------------------
  /**
   * 页面 id
   * @type {string}
   */
  get _id() { 
    return this.props._id;
  }

  /**
   * app 实例
   * @type {module:app.App}
   */
  get app() { 
    return this.props.app;
  }

  /**
   * 页面路由匹配信息
   * @type {module:page~PageRouteInfo}
   */
  get route() { 
    return this.props.route;
  }

  /**
   * 页面框架的 dom 元素
   * @type {element}
   */
  get frame() { 
    return ReactDOM.findDOMNode(this);
  }

  /**
   * 通过子页面的名字获取当前页面的子页面实例
   * @param {string} - 子页面名称 
   * @returns {module:page.Page} 子页面实例
   */
  getSubPage(subName) { 
    let _id = this.props.subPages[subName]&&this.props.subPages[subName].props._id;
    return _id && this.props.app.router.getPage(_id);
  }

  /**
   * 子页面获取父页面的实例
   * @returns {module:page.Page} 父页面实例
   */
  getParrentPage() {
    return this.app.getPage(this.props.route._idParent);
  }

  /**
   * 页面获取前一页面的实例
   * @returns {module:page.Page} 父页面实例
   */
  getPrevPage() {
    return this.app.getPage(this.props.route._idPrev);
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
  /*!
   * 处理页面键盘事件，在返回键时，返回上级历史
   */
  _handleKeyEvent(e) {
    return e.keyCode===27&&this.actionGoBack();
  }

  /*!
   * 处理页面 controller 的构建和初始化
   */
  _bindController() {
    let { app, route:{routeDefine:{component, controller}={}} } = this.props;
    let acontroller = controller||component.controller||{};
    let controllerObj = typeof(acontroller)==='function'?acontroller(app, this):acontroller;

    if(!controllerObj.stateData) controllerObj.stateData = undefined;
    if(!controllerObj.actionGoBack) controllerObj.actionGoBack = ()=>app.router.back();

    Object.entries(controllerObj).forEach(([k,v])=>{
      if(k.startsWith('state')||k.startsWith('_state')) {
        this[k] = app.State.createState(app, v, k, this._id);
        if(!this[k]) { app.render.panic(v, {title: 'no state', _id: this._id}); return } 
        if(typeof v==='string') return;
        app.event.on(this._id, 'onPageStart', (page,isActive)=>{app.event.emit(this[k]._id, 'onStateStart', this[k]._id, isActive)}, this[k]._id);
        app.event.on(this._id, 'onPageActive', (page,onStart)=>{app.event.emit(this[k]._id, 'onStateActive', this[k]._id, onStart)}, this[k]._id);
        app.event.on(this._id, 'onPageInactive', (page,onStop)=>{app.event.emit(this[k]._id, 'onStateInactive', this[k]._id, onStop)}, this[k]._id);
        app.event.on(this._id, 'onPageStop', (page)=>{app.event.emit(this[k]._id, 'onStateStop', this[k]._id)}, this[k]._id);
      }
    });

    Object.entries(controllerObj).forEach(([k,v])=>{
      if(k.startsWith('state')||k.startsWith('_state')) {
        // state
      }else if(k==='onPageAdd'||k==='onPageRemove') {
        // app event
        app.event.on(app._id, k, v, this._id);
      }else if(k.startsWith('onPage')) {
        // page event
        app.event.on(this._id, k, v, this._id);
      }else if(k.startsWith('onState')) {
        // page state event
        let stateEvents = k.split('_');
        if(stateEvents[0]&&this[stateEvents[1]]) app.event.on(this[stateEvents[1]]._id, stateEvents[0], v, this._id);
      }else if(k.startsWith('on')) {
        // app event
        app.event.on(app._id, k, v, this._id);
      }else if(k.startsWith('action')){ 
        // action
        this[k] = this.action(v, k.slice(6));
      }else{
        // user props
        this[k] = v;
      }
    })

    this._controllerBinded = true;
    this.forceUpdate();
  }

  _getStateKeys() {
    return Object.entries(this).filter(([k,v])=>/_?state\w+/.test(k)).map(([k,v])=>v._id);
  }

  _getPageComponentProps() {
    let { app, _id, route } = this.props;
    let states = Object.entries(this)
      .filter(([k,v])=>/_?state\w+/.test(k))
      .reduce((v1, [k,v])=>{
        v1[k] = v.data();
        let extData = v.extData();
        if(extData) v1[`${k}Ext`] = extData;
        return v1;
      },{})

    return { app, _id, route, page: this, ...states }
  }

  _getPageFrameProps() {
    let { _id, route } = this.props;

    return {
      'data-page': _id,
      'data-page-sub': route.isSubPage?route.routeName:undefined,
      style: route.isSubPage?{
        width: '100%', height: '100%',
      }:{
        position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: 'white',
        // visibility: route.isActive?'visible':'hidden',
      },
    }
  }
  
  // page life circle
  // ---------------------------
  componentDidMount() {
    let { app, _id, route:{isActive, isSubPage,isReactive,level} } = this.props;
    app.log.debug('page did mount', _id);

    if(!isSubPage&&isActive&&!isReactive&&level) {
      if(app.router._history.action!=="PUSH") {
        setTimeout(()=>{
          this._bindController();
          this._offKeyEvent = app.keyboard.on(_id, 'keydown', e=>this._handleKeyEvent(e));
          app.event.emit(app._id, 'onPageAdd', _id, this);
          app.event.emit(this._id, 'onPageStart', this, isActive);
          isActive && app.event.emit(this._id, 'onPageActive', this, true);
          isActive && app.event.emit(app._id, 'onActivePageChange', this._id);
          Array.from(document.querySelectorAll('main')).filter(v=>!v.getAttribute('data-page-sub')).forEach(v=>{
            let id = v.getAttribute('data-page');
            v.style.visibility=_id===id?"visible":"hidden";
          })
        }, 150)
        return;
      }
      let element = ReactDOM.findDOMNode(this);
      let time = (new Date()).getTime();
      let _run = ()=>{
        let diff = (new Date()).getTime() - time;
        let percent = diff*100/150;
        if(percent>100) percent = 100;
        element.style.webkitTransform = "translateX("+(100-percent)+"%)";
        if(percent < 100) {
          requestAnimationFrame(_run);
        }else{
          setTimeout(()=>{
            this._bindController();
            this._offKeyEvent = app.keyboard.on(_id, 'keydown', e=>this._handleKeyEvent(e));
            app.event.emit(app._id, 'onPageAdd', _id, this);
            app.event.emit(this._id, 'onPageStart', this, isActive);
            isActive && app.event.emit(this._id, 'onPageActive', this, true);
            isActive && app.event.emit(app._id, 'onActivePageChange', this._id);

            Array.from(document.querySelectorAll('main')).filter(v=>!v.getAttribute('data-page-sub')).forEach(v=>{
              let id = v.getAttribute('data-page');
              v.style.visibility=_id===id?"visible":"hidden";
            })
          }, 50)
        }
      }
      _run();
    }else{
      this._bindController();
      this._offKeyEvent = app.keyboard.on(_id, 'keydown', e=>this._handleKeyEvent(e));
      app.event.emit(app._id, 'onPageAdd', _id, this);
      app.event.emit(this._id, 'onPageStart', this, isActive);
      isActive && app.event.emit(this._id, 'onPageActive', this, true);
      isActive && app.event.emit(app._id, 'onActivePageChange', this._id);
    }
  }

  componentWillUnmount() {
    let { app, _id, route:{isActive} } = this.props;
    app.log.debug('page will unmount', _id);

    isActive&&app.event.emit(this._id, 'onPageInactive', this, true);
    app.event.emit(this._id,'onPageStop', this);
    app.event.emit(app._id, 'onPageRemove', _id, this);
    this._offKeyEvent && this._offKeyEvent();
    app.event.off(_id);
  }

  componentDidUpdate(prevProps, prevState) {
    let { app, route:{_id, isActive, isDeactive} } = this.props;

    if(prevProps.route.isActive !== isActive) {
      app.event.emit(_id, isActive?'onPageActive':'onPageInactive', this, false);
      isActive && app.event.emit(app._id, 'onActivePageChange', _id);
    }

    if(isDeactive) {
      let element = ReactDOM.findDOMNode(this);
      let time = (new Date()).getTime();
      let _run = ()=>{
        let diff = (new Date()).getTime() - time;
        let percent = diff*100/150;
        if(percent>100) percent = 100;
        element.style.webkitTransform = "translateX("+percent+"%)";
        if(percent < 100) {
          requestAnimationFrame(_run);
        }else{
          let index = app.router._pageInfos.findIndex(v=>v._id===_id);
          if(index>=0){
            app.router._pageInfos.splice(index,1);
            app.router._updateRender();
          }
        }
      }
      let p = Array.from(document.querySelectorAll('main')).filter(v=>!v.getAttribute('data-page-sub')).slice(-2)[0];
      if(p)p.style.visibility="visible";
      _run();
    }
  }

  componentDidCatch(error, info) {
    let { app } = this.props;
    app.log.debug('page did catch');
    app.render.panic(error, {title:'page error catch', _id: this._id});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if((nextProps.route.isActive !== this.props.route.isActive) && nextProps.route.isActive) return true;
    if(!this.props.route.isActive) return false;

    if (!this.props.app.utils.shallowEqual(this.props.route, nextProps.route, ['params', 'query', 'popLayers', 'subPages'])) {
      this.app.event.emit(this._id, 'onPageUpdate', this._id, 'route');
      return true;
    }
    for(let k of this._getStateKeys()) if(this.props.context[k]!==nextProps.context[k]) {
      this.app.event.emit(this._id, 'onPageUpdate', this._id, 'state');
      return true;
    }
    return false;
  }

  render() {
    let { app, _id, route:{routeDefine,subPages,popLayers}, ...props } = this.props;
    app.log.debug('page render', _id);
    this._actionNum = 0;

    return (
      <main {...this._getPageFrameProps()}>
        {this._controllerBinded?<routeDefine.component {...props} {...this._getPageComponentProps()}>{subPages}</routeDefine.component>:null}
        {this._controllerBinded?popLayers:null}
      </main>
    )
  }
}


export default Page;
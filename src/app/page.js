/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import React, { cloneElement } from 'react';
import uuid from '../utils/uuid';
import { setBrowserTitle } from '../utils/browser';


/**
 * 页面Page 组件的超类，页面element 组件会被pageHoc 函数给超类化
 * 多页面时页面嵌套层次关系如下：
 * 路由层次
 * ```js
 * root
 *   A
 *     B
 * ```
 * 实际显示
 * ```js
 * <div data-wrap="root">
 *   <div>{root}</div>
 *   <div data-wrap="A">
 *     <div>{A}</div>
 *     <div data-wrap="B">
 *       {B}
 *     </div>
 *   </div>
 * </div>
 * ```
 * @class Page
 * @property {App} app - App 实例
 * @property {container} props.container - page 对应的container
 * @property {object} props.state_xxx - container 中states 映射到props 上的数据
 * @property {object} props.params - 页面参数对象，对应path-info 形式的参数
 * @property {location} props.location - 当前路径信息
 * @property {Route} props.route - 当前路由信息
 * @property {Route[]} props.routes - 当前路径对应的全部路由
 * @property {router} props.router - router
 */
export default (app, Wrapper) => class extends Wrapper {
  // life circle
  // ---------------------------
  constructor(props) {
    super(props);
    this.app = app;
    this._active = false;
    this._focus = false;
  }

  componentWillMount() {
    app.addPage(this);
    if(this.props.onWillStart) this.props.onWillStart(this);
    return super.componentWillMount && super.componentWillMount();
  }

  componentDidMount() {
    if(this.props.onStart) this.props.onStart(this);
    this._registerKeyboard();
    this.checkActive(true, false);
    this.checkFocus();
    return super.componentDidMount && super.componentDidMount();
  }

  componentDidUpdate(prevProps) {
    this.checkActive();
    this.checkFocus();

    return super.componentDidUpdate && super.componentDidUpdate();
  }

  componentWillUnmount() {
    this._ungegisterKeyboard();
    this.checkActive(true, false, false);
    //this.checkFocus(false, true, false);

    if(this.props.onStop) this.props.onStop(this);
    let ret = super.componentWillUnmount && super.componentWillUnmount();

    app.removePage(this);
    return ret;
  }

  componentDidPause() {
    if(this.props.onPause) this.props.onPause(this);
    this.checkFocus(true, false);
    return super.componentDidPause && super.componentDidPause();
  }

  componentDidResume() {
    this.getSubs().indexOf(this.getPageChildPath())<0 && setBrowserTitle(this.props.route.title||app.config.browser.title);
    if(this.props.onResume) this.props.onResume(this);
    this.checkFocus(false, true);
    return super.componentDidResume && super.componentDidResume();
  }

  componentDidCatch(error, info) {
    return app.trigger('onErrorPageRender', error);
    return super.componentDidCatch && super.componentDidCatch(error, info);
  }

  // render
  // ---------------------

  render(){
    app.verbose(`page render(${this.getDisplayName()}):`,this);
    
    if(this.props.state__page && this.props.state__page.ready===false){
      return <app._WaittingComponent />;
    }

    let ret;
    try{
      ret = super.render();
    }catch(e){
      return app.trigger('onErrorPageRender', e);
    }
    ret = React.cloneElement( ret, Object.assign( {
      'data-bnorth-page': this.getDisplayName(), 
      'data-blur': !this.isActive(),
    }, ret.props));

    return (
      <div data-bnorth-page-wrap={this.getDisplayName()} style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%'}}>
        {ret}
        {!this.isAppPage()?this.getLayers():null}
        {this.getChildren()}
        {this.isAppPage()?this.getLayers():null}
      </div>
    )
  }

  // info
  // --------------------------

  /**
   * 返回page 的display 名称
   * @method
   */
  getDisplayName() {
    return Wrapper.displayName||Wrapper.name;
  }

  // active focus
  // --------------------------
  isActive() {
    if(this.getSubs().indexOf(this.getPageChildPath())>=0){
      return !Boolean(this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children);
    }else{
      return !Boolean(this.props.children);
    }
  }

  checkActive(emitPositive=true,emitNegative=true,val) {
    let oldVal = this._active;
    this._active = val!==undefined?val:this.isActive();
    if(this._active !== oldVal) {
      if(this._active&&emitPositive) this.componentDidResume();;
      if(!this._active&&emitNegative) this.componentDidPause();;
    }
  }

  isFocus() {
    return this.isActive() && !this.isContainerPage() && this.getFocusLayerIndex()===null;
  }

  checkFocus(emitPositive=true,emitNegative=true,val) {
    let oldVal = this._focus;
    this._focus = val!==undefined?val:this.isFocus();
  }

  _handleKeyUp(e) {
    if(!this.isActive()||!this.isFocus()) return;
    if(this.componentHandleKeyUp && this.componentHandleKeyUp(e)) return;
    if(e.keyCode===27)
      app.navigator.back();
  }

  _registerKeyboard() {
    if(this._onDocumentKeydownListener) return;
    this._onDocumentKeydownListener = (e)=>this._handleKeyUp(e);
    window.document.addEventListener('keyup', this._onDocumentKeydownListener)
  }

  _ungegisterKeyboard() {
    this._onDocumentKeydownListener && window.document.removeEventListener('keyup', this._onDocumentKeydownListener);
    this._onDocumentKeydownListener = null;
  }

  // sub page
  // ----------------------

  getChildren() {
    if(this.getSubs().indexOf(this.getPageChildPath())>=0) {
      return this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children;
    } else {
      return !this.isSubPage() && this.props.children
    }
  }

  /**
   * 返回是否是App 根组件
   * @method 
   */
  isAppPage() {
    return this.props.routes[0]===this.props.route;
  }

  /**
   * 返回是否是容器页面
   * @method
   * @return {boolean}
   */
  isContainerPage() {
    return (this.props.route.childRoutes||[]).find((v)=>{
      return v.components;
    });
  }

  /**
   * 返回是否是子页面
   * @method
   * @return {boolean}
   */
  isSubPage() {
    return Boolean(this.props.route.components);
  }

  /**
   * 返回容器页面的子页面列表
   * @method
   * @return {array} - 子页面的名称数组
   */
  getSubs() {
    return (this.props.route.childRoutes||[])
    .filter((v)=>{
      return v.components;
    })
    .map((v)=>{
      return v.path;
    });
  }

  /**
   * 返回当前页面的全路径
   * @method
   * @return {string}
   */
  getPageFullPath() {
    let routes = [];
    for(let route of this.props.routes){
      if(!route.path) continue;
      routes.push(route.path==="/"?"":route.path);
      if(route===this.props.route) break;
    }
    let pathname = routes.join("/");
    for (let key in this.props.router.params) {
      let re = new RegExp(":"+key,"g"); 
      pathname = pathname.replace(re,this.props.router.params[key]);
    }
    return pathname;
  }

  /**
   * 容器组件返回当前页面中的子页面的路径
   * @method
   * @return {string}
   */
  getPageChildPath() {
    let ret = null;
    for(let i=0; i<this.props.routes.length; i++){
      let route = this.props.routes[i];
      if(!route.path) continue;
      if(route===this.props.route) {
        ret = this.props.routes[i+1];
        break;
      }
    }
    return ret?ret.path:null;
  }

  /**
   * 返回其父页面的路径
   * @method
   * @return {string}
   */
  getPageParentPath() {
    let ret = null;
    for(let i=0; i<this.props.routes.length; i++){
      let route = this.props.routes[i];
      if(!route.path) continue;
      if(route===this.props.route) break;
      ret = route.path;
    }
    return ret
  }

  // layer
  // --------------------------
  getFocusLayerIndex() {
    let layers = this.props.state__page.layers||[];
    return layers.reverse().reduce((v1,v2,i)=>v1!==null?v1:(v2.focus?i:null), null);
  }

  getLayers() {
    let layers = this.props.state__page.layers||[];
    let foucsIndex = this.isActive()&&this.getFocusLayerIndex();
    layers = layers.map((v,i)=>cloneElement(v.element, {
      focus: i===foucsIndex
    }));
    return layers;
  }

  addLayer(element, focus) {
    let uuidstr = uuid(8,16);
    this.props.container.states._page.update({
      layers: [...this.props.state__page.layers, {uuid: uuidstr, element, focus}]
    });

    window.setTimeout(()=>this.checkFocus(),50);
    return uuidstr;
  }

  updateLayer(element, uuid) {
    this.props.container.states._page.update({
      layers: this.props.state__page.layers.map(v=>(
        v.uuid!==uuid?v:{element, uuid}
      )),
    });
  }

  removeLayer(uuid) {
    this.props.container.states._page.update({
      layers: this.props.state__page.layers.filter(v=>v.uuid!==uuid)
    });

    window.setTimeout(()=>this.checkFocus(),50);
  }
}

/**
 * @function pageHoc
 * @param {!App} app - App 的实例
 * @param {!element} element - 进行页面化转换的react 有状态组件 
 */
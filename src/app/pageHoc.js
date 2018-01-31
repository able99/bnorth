/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import React from 'react';
import uuid from '../utils/uuid';
import { setBrowserTitle } from '../utils/browser';


/**
 * bnorth 中页面Page 组件的基类，bnorth 会自动将react 组件通过高级函数pageHoc 进行超类扩展，负责纯组件的渲染，使用container 注入的props，一般无需使用state
 * **props 注入** 页面Page 的props 除react 属性外注入包括：
 * 1. **this.app**： App 类的实例
 * 1. **this.props.container**： 与page 对应的container 的实例，可操作对应的actions，states
 * 1. **this.props.state_xxx**： bnorth state 注入的数据
 * 1. **this.props.params|location|route|routes|router**： react router注入的属性，具体参见[react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)
 * **render**
 * 1. page render 时，将子组件修改为与自己同级，保证互相不影响，因此页面page 的元素应该是绝对定位到左上角的，可使用bnorth-components 的View 组件
 * 1. render 错误时会触发onErrorPageRender 事件
 * @class Page
 */
export default (app, Wrapper) => class extends Wrapper {
  constructor(props) {
    super(props);
    this.app = app;
    this._focus = false;
  }

  componentWillMount() {
    app.pages.push(this);
    if(this.props.onWillStart) this.props.onWillStart(this);
    return super.componentWillMount && super.componentWillMount();
  }

  componentDidMount() {
    if(this.props.onStart) this.props.onStart(this);
    if(this.checkFocusChange()){this.componentDidResume();}
    return super.componentDidMount && super.componentDidMount();
  }

  componentDidUpdate(prevProps) {
    if(this.checkFocusChange()){
      if(this.isFocus()){
        this.componentDidResume();
      }else{
        this.componentDidPause();
      }
    }

    return super.componentDidUpdate && super.componentDidUpdate();
  }

  componentWillUnmount() {
    this.componentDidPause();

    if(this.props.onStop) this.props.onStop(this);
    let ret = super.componentWillUnmount && super.componentWillUnmount();

    app.pages.splice(app.pages.indexOf(this));
    return ret;
  }

  componentDidPause() {
    if(this.props.onPause) this.props.onPause(this);
    return super.componentDidPause && super.componentDidPause();
  }

  componentDidResume() {
    setBrowserTitle(this.props.route.title||app.config.browser.title);
    if(this.props.onResume) this.props.onResume(this);
    return super.componentDidResume && super.componentDidResume();
  }

  componentDidBackKey() {
    if(this.props.onBackKey) this.props.onBackKey(this);
    return super.componentDidBackKey && super.componentDidBackKey();
  }

  componentDidCatch(error, info) {
    return app.trigger('onErrorPageRender', error);
    return super.componentDidCatch && super.componentDidCatch(error, info);
  }

  render(){
    app.verbose(`page render(${this.getDisplayName()}):`,this);
    
    if(this.props.state__page && this.props.state__page.ready===false){
      return <app.WaittingComponent />;
    }

    let ret;
    try{
      ret = super.render();
    }catch(e){
      return app.trigger('onErrorPageRender', e);
    }
    ret = React.cloneElement( ret, Object.assign( {
      'data-bnorth-page': this.getDisplayName(), 
      'data-blur': !this.isFocus(),
    }, ret.props));
    
    return (
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%'}}>
        {ret}
        {this.props.state__page&&!this.isAppPage()?this.props.state__page.layers.map(v=>v.element):null}
        {this.getSubs().indexOf(this.getPageChildPath())>=0 && this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children}
        {this.getSubs().indexOf(this.getPageChildPath())<0 && !this.isSubPage() && this.props.children}
        {this.props.state__page&&this.isAppPage()?this.props.state__page.layers.map(v=>v.element):null}
      </div>
    )
  }

  /**
   * 返回page 的display 名称
   * @method
   */
  getDisplayName() {
    return Wrapper.displayName||Wrapper.name;
  }
  /*!
   * 返回是否是App 根组件
   * @method 
   */
  isAppPage() {
    return this.props.routes[0]===this.props.route;
  }
  
  checkFocusChange() {
    let oldFocus = this._focus;
    this._focus = this.isFocus();
    return this._focus !== oldFocus;
  }

  /**
   * 返回是否页面在顶层
   * @method
   * @return {boolean} 
   */
  isFocus() {
    if(this.getSubs().hasOwnProperty(this.getPageChildPath())){
      return !Boolean(this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children);
    }else{
      return !Boolean(this.props.children);
    }
  }

  /**
   * 返回是否是容器组件
   * @method
   * @return {boolean}
   */
  isContainer() {
    return (this.props.route.childRoutes||[]).find((v)=>{
      return v.components;
    });
  }

  /**
   * 容器组件返回其子组件列表
   * @method
   * @return {array} - 子组件的名称数组
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
   * 是否是子组件
   * @method
   * @return {boolean}
   */
  isSubPage() {
    return Boolean(this.props.route.components);
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
   * 容器组件返回当前显示中的子组件路径
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
   * 子组件返回其容器组件的路径
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

  addLayer(element) {
    let uuidstr = uuid(8,16);
    this.props.container.states._page.update({
      layers: [...this.props.state__page.layers, {uuid: uuidstr, element}]
    });

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
  }
}
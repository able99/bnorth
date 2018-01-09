/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import React from 'react';
import { setBrowserTitle } from '../utils/browser';


/**
 * bnorth 中页面组件的基类，bnorth会自动将react 组件通过高级函数pageHoc 进行超类扩展
 * 页面组件负责纯组件的渲染，使用container 注入的props 即可，一般无需使用state
 * 页面组件中的props包括react router注入的路由属性，包括router，route，lcation，params等，参见[react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)
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

  render(){
    let name = Wrapper.displayName||Wrapper.name;
    app.verbose(`page render(${name}):`,this);

    let ret;
    try{
      ret = super.render();
    }catch(e){
      return app.trigger('onErrorPageRender', e);
    }
    if(this.isAppPage()){
      return ret;
    }

    ret = React.cloneElement( ret, Object.assign( {
      'data-bnorth-page': name, 
      'data-blur': !this.isFocus(),
    }, ret.props));
    
    if(this.getSubs().indexOf(this.getPageChildPath())>=0){
      return (<div>{ret}{this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children}</div>);
    }else{
      return (<div>{ret}{this.isSubPage()?null:this.props.children}</div>);
    }
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
}
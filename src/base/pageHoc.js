import React from 'react';
import { setBrowserTitle } from '../utils/browser';


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
    let ret = super.componentWillMount && super.componentWillMount();

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

  isAppPage() {
    return this.props.routes[0]===this.props.route;
  }
  
  checkFocusChange() {
    let oldFocus = this._focus;
    this._focus = this.isFocus();
    return this._focus !== oldFocus;
  }

  isFocus() {
    if(this.getSubs().hasOwnProperty(this.getPageChildPath())){
      return !Boolean(this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children);
    }else{
      return !Boolean(this.props.children);
    }
  }

  isContainer() {
    return (this.props.route.childRoutes||[]).find((v)=>{
      return v.components;
    });
  }

  getSubs() {
    return (this.props.route.childRoutes||[])
    .filter((v)=>{
      return v.components;
    })
    .map((v)=>{
      return v.path;
    });
  }

  isSubPage() {
    return Boolean(this.props.route.components);
  }

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
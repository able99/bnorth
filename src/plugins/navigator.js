/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import Url from 'url-parse';


/**
 * 为app 提供导航的能力扩展，导航一般区别与browser 插件中的插件，导航指app 应用内的导航
 * @class
 * **插件** 该类为插件类扩展了App 的能力
 * app.Navigator: 该类的原型
 * app.navigator: 该类的实例
 */
class Navigator{
  constructor(app){
    this.app = app;
    this.recallLocation = null;
    this.routerStatus = null;
  }

  _navi(type,...args){
    if(!this.routerStatus) return;
    let {location,router,} = this.routerStatus;

    if(type==='back'){
      router.go(...args);
      return;
    }

    if(!args.length){
      type==='replace'?router.replace("/"):router.push("/");
      return;
    }

    let paths = [];
    let extern = false;
    let absolute = false;
    let passState = false;
    let passQuery = false;
    let uper = 0;
    let newloc = {
      pathname: '',
    };

    for(let arg of args){
      if(Array.isArray(arg)){
        [
          newloc.query,
          passQuery,
          newloc.state,
          passState,
        ] = arg;
      }
    }

    for(let arg of args){
      if(!arg){
        this.app.error('invalided navigator params');
        return;
      }else if(Array.isArray(arg)){
        
      }else if(typeof(arg)==="object"){
        extern = extern || arg.extern || (arg.path && arg.path.indexOf("http")===0);
        absolute = absolute || arg.absolute || (arg.path && arg.path.indexOf("/")===0);

        if(arg.path==="/"){continue}
        if(arg.path==="."){continue}
        if(arg.path===".."){uper++;continue}
      
        if(arg.path) {
          let apath = [arg.path];
          if(newloc.query&&Array.isArray(arg.params)&&arg.params.length){
            arg.params.forEach((v)=>{
              if(newloc.query[v]) apath.push(newloc.query[v]);
              delete newloc.query[v];
            });
          }
          paths.push(apath.join('/'));
        }
      }else{
        arg = arg||"";
        if(!arg){continue}

        let aextern = (paths.length===0&&arg.indexOf("http")===0);
        let aabsolute = (paths.length===0&&arg.indexOf("/")===0);
        extern = extern || aextern;
        absolute = absolute || aabsolute;

        if(arg==="/"){continue}
        if(arg==="."){continue}
        if(arg===".."){uper++;continue}

        if(arg) paths.push(aextern||aabsolute?arg:encodeURIComponent(arg));
      }
    }

    if(!absolute&&!extern){
      if(uper<=0){
        newloc.pathname = location.pathname;
      }else{
        newloc.pathname = router.routes.slice(1,-uper).map((v)=>{return (v.path||"")}).join("/");
        for (let key in router.params) {
          let re = new RegExp(":"+key,"g"); 
          newloc.pathname = newloc.pathname.replace(re,router.params[key]);
        }
      }
    }
    newloc.pathname = (newloc.pathname?[newloc.pathname]:[]).concat(paths).join("/");
    if(!extern)newloc.pathname = newloc.pathname.replace(/\/\//g,'/');
    newloc.state = Object.assign({},passState?location.state:{},newloc.state);
    newloc.query = Object.assign({},passQuery?location.query:{},newloc.query);
    if(!Object.keys(newloc.query).length)delete newloc.query;
    if(!Object.keys(newloc.state).length)delete newloc.state;

    if(type==='getUrl'){
      if(extern){

      }else{
        let ret = new Url(window.location.href);
        ret.set('hash', router.createHref(newloc));
        return ret.toString();
      }
      return '';
    }
    if(extern&&this.app.browser){
      type==='replace'?this.app.browser.replace(newloc):this.app.browser.push(newloc);
    }else{
      type==='replace'?router.replace(newloc):router.push(newloc);
    }
  }

  // interface
  // ----------------------------
  recallBefore(location,router) {
    if(this.app.config.login.loginToHomeOrAuto) {
      this.goHome();
      return true;
    }
    
    let link = this.app.browser&&this.app.browser.parseUrl().query.link;
    if(link){
      this.app.browser&&this.app.browser.replace(decodeURIComponent(link));
      return true;
    }
    
    if(location.query.link){
      this.app.browser&&this.app.browser.replace(decodeURIComponent(location.query.link));
      return true;
    }
  }

  /**
   * 返回之前的页面，与back 不同，会考虑错误跳转，link 参数因素
   * @method
   */
  recall(){
    if(!this.routerStatus)return;
    let {location,router} = this.routerStatus;
    
    if(this.recallBefore(location,router)) return;

    if(this.recallLocation && this.recallLocation.isReplace) {
      router.replace(this.recallLocation);
    }else if(this.recallLocation) {
      this.back();
    }else {
      this.goHome(true);
    }
  }

  /** 
   * 跳转到指定路由
   * @method
   * @param {...string} [paths] - 路由列表，取值包括：<br />
   * **'/'**
   * **'..'**
   * **path(string)**
   * **path(object)**
   * **[query,pass query,state,pass state]**
   */
  push(...args){
    this._navi('push',...args);
  }
  /** 
   * 替换到到指定路由
   * @method
   * @param {...string} [paths] - 
   */
  replace(...args){
    this._navi('replace',...args);
  }
  /** 
   * 返回之前页面
   * @method
   * @param {number} [step=1] - 返回的页面数
   */
  back(step=1){
    this._navi('back',-step);
  }
  /** 
   * 获取路由的url 字符串
   * @method
   * @param {...string} [paths] - 
   */
  getUrl(...args){
    return this._navi('getUrl',...args);
  }
  /**
   * 关闭 app
   * @method
   */
  exit(){
    window.close();
  }

  // event
  // --------------------
  onRouterStatusChange(routerStatus){
    if(!routerStatus)return;

    if(routerStatus.location.pathname===(typeof(this.app.config.paths.Login)==='string'?this.app.config.paths.Login:this.app.config.paths.Login.path)){
      if(this.recallLocation&&this.routerStatus&&this.routerStatus.location.pathname!==routerStatus.location.pathname)this.recallLocation.isReplace = routerStatus.location.action==='REPLACE';
    }else{
      this.recallLocation = routerStatus.location;
    }
    this.routerStatus = routerStatus;
  }
}


export default {
  init(app) {
    app.Navigator = Navigator;
    app.navigator = new Navigator(app);
  },

  onImportRoutesAfter(app) {
    for(let key of Object.keys(app.config.paths)){
      if(key&&key[0].match(/^[A-Z]$/)){
        app.Navigator.prototype[`go${key}`] = function(replace){
          let path = app.config.paths[key];
          replace?this.replace(path):this.push(path); 
        }
      }
    }
  },

  onNavigated(app, location) {
    app.navigator.onRouterStatusChange(location);
  },

  onNavigatePrevent(app, location) {
    app.navigator.onRouterStatusChange(location);
  }
}

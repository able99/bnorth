/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import Url from 'url-parse';


/**
 * 为app 提供导航的能力扩展，导航一般区别与browser 插件中的插件，导航指app 应用内的导航
 * **插件** 该类为插件类扩展了App 的能力
 * app.Navigator: 该类的原型
 * app.navigator: 该类的实例
 * @class
 */
class Navigator{
  constructor(app){
    this.app = app;
    this.recallLocation = null;
    this.routerStatus = null;
  }

  _getUrl(...args){
    if(!this.routerStatus||!args.length) return '/';
    let { location,router } = this.routerStatus;

    let paths = [];
    let extern = false;
    let absolute = false;
    let passState = false;
    let passQuery = false;
    let uper = 0;
    let newloc = {
      pathname: '',
    };

    args.forEach((arg,i)=>{
      if(!arg){
        this.app.error('invalided navigator params');
      }else if(Array.isArray(arg)){
        [ newloc.query, passQuery, newloc.state, passState, ] = arg;
      }else{
        arg = typeof(arg)==="object"?arg:{path: arg};
        if(!arg.path) {this.app.error('invalided navigator params'); return;}

        let aextern = i===0 && typeof(arg.path)==='string' && arg.path.indexOf("http")===0;
        let aabsolute = i===0 && typeof(arg.path)==='string' && arg.path.indexOf("/")===0;
        extern = extern || arg.extern || aextern;
        absolute = absolute || arg.absolute || aabsolute;
        if(arg.path==="/"){return}
        if(arg.path==="."){return}
        if(arg.path===".."){uper++;return}
      
        if(arg.path) {
          let apath = [aextern||aabsolute?arg.path:encodeURIComponent(arg.path)];
          if(newloc.query&&Array.isArray(arg.params)&&arg.params.length){
            arg.params.forEach((v)=>{
              if(newloc.query[v]) apath.push(newloc.query[v]);
              delete newloc.query[v];
            });
          }
          paths.push(apath.join('/'));
        }
      }
    });

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

    return [newloc, extern, absolute];
  }

  /*!
   * for custom party of recall
   * @method
   */
  _recallBefore(location,router) {
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
    
    if(this._recallBefore(location,router)) return;

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
   * @param {...string} [paths] - 路由列表，可以是字符串，path 解析对象或者 router3 location对象，还可能是数组：<br />
   * **'/'**：出现在字符串或者对象中的pathname 中时，从根路径开始计算，否则从当前路径开始计算
   * **'..'**：出现在字符串或者对象中的pathname 中时，从当前路径的上一级路径开始计算，每出现一次，返回一级
   * **params**：如果path 对象包含params 数组，说明该路径包含path info 参宿，会从query 参数生成path info 字符串
   * **数组对象**：如果是数组对象，4个元素[query,pass query,state,pass state]分别是设置query 键值对，是否将query 键值对传递，state 键值对，和是否将state 键值对传递
   */
  push(...args){
    if(!this.routerStatus||!this.routerStatus.router) return;
    let [newloc, extern, absolute] = this._getUrl(...args);

    if(extern&&this.app.browser){
      this.app.browser.push(newloc);
    }else{
      this.routerStatus.router.push(newloc);
    }
  }

  /** 
   * 替换到到指定路由
   * 参数同push
   * @method
   */
  replace(...args){
    if(!this.routerStatus||!this.routerStatus.router) return;
    let [newloc, extern, absolute] = this._getUrl(...args);

    if(extern&&this.app.browser){
      this.app.browser.replace(newloc);
    }else{
      this.routerStatus.router.replace(newloc);
    }
  }

  /** 
   * 返回之前页面
   * @method
   * @param {number} [step=1] - 返回的页面数
   */
  back(step=1){
    if(!this.routerStatus||!this.routerStatus.router) return;
    this.routerStatus.router.go(-step);
  }

  /**
   * app.config.paths 中的首字母大写的路径，比如Xxx 会直接建立goXxx 函数，调用会导航到对应路径
   * @method
   * goXxx
   */

  /** 
   * 获取导航后的完整url
   * 参数同push
   * @method
   */
  getUrl(...args){
    let [newloc, extern, absolute] = this._getUrl(...args);

    if(extern){
      return newloc.pathname;
    }else{
      if(!this.routerStatus||!this.routerStatus.router) return '';
      let ret = new Url(window.location.href);
      ret.set('hash', this.routerStatus.router.createHref(newloc));
      return ret.toString();
    }
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
  _onRouterStatusChange(routerStatus){
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
  name: 'navigator',
  depentence: 'browser',

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
    app.navigator._onRouterStatusChange(location);
  },

  onNavigatePrevent(app, location) {
    app.navigator._onRouterStatusChange(location);
  }
}

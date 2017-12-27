import Url from 'url-parse';

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

  push(...args){
    this._navi('push',...args);
  }
  back(step=1){
    this._navi('back',-step);
  }
  replace(...args){
    this._navi('replace',...args);
  }
  getUrl(...args){
    return this._navi('getUrl',...args);
  }
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

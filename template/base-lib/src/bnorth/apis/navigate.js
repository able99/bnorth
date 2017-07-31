import { Config, AppData, Utils, Apis } from '../';

function navi(gotoOrReplace,...args){
  let {location,router,} = AppData.routerStatus;
  if(!args.length){router.push("/");return;}

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
      Apis.Log.err('invalided navigator params');
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
  newloc.state = Object.assign({},passState?location.state:{},newloc.state);
  newloc.query = Object.assign({},passQuery?location.query:{},newloc.query);
  if(!Object.keys(newloc.query).length)delete newloc.query;
  if(!Object.keys(newloc.state).length)delete newloc.state;

  if(extern){
    gotoOrReplace?Utils.Webview.push(newloc):Utils.Webview.replace(newloc);
  }else{
    gotoOrReplace?router.push(newloc):router.replace(newloc);
  }
}

let Navigate = {
  push(...args){
    navi(true,...args);
  },
  back(step=1){
    let {router} = AppData.routerStatus;
    router.go(-step);
  },
  replace(...args){
    navi(false,...args);
  },
  exit(){
    if(Config.OnBrowser && Config.OnBrowserDebug){
      window.close();
    }else{
      navigator.app.exitApp();
    }
  },
  goHome(replace){
    let func = replace?Navigate.replace:Navigate.push;
    func(Config.Path.Home);
  },
  goLogin(replace){
    let func = replace?Navigate.replace:Navigate.push;
    func(Config.Path.Login);
  },
  goResister(replace){
    let func = replace?Navigate.replace:Navigate.push;
    func(Config.Path.Resister);
  },
  goForgetPassword(replace){
    let func = replace?Navigate.replace:Navigate.push;
    func(Config.Path.ForgetPassword);
  },
  goChangePassword(replace){
    let func = replace?Navigate.replace:Navigate.push;
    func(Config.Path.ChangePassword);
  },
}

export default Navigate;



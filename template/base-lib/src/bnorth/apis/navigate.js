import { Config, Apis, RouterStatus } from '../';

function navi(gotoOrReplace,...args){
  let {location,router,} = RouterStatus;
  if(!args.length||!args[0]){router.push("/");return;}

  let paths = [];
  let state = {};
  let extern = false;
  let absolute = false;
  let uper = 0;
  for(let arg of args){
    if(Array.isArray(arg)){
      state = Object.assign(state,...arg);
    }else if(typeof(arg)==="object"){
      extern = extern || arg.extern;
      extern = extern || (arg.path && arg.path.indexOf("http")===0);
      absolute = absolute || (arg.path && arg.path.indexOf("/")===0);

      if(arg.path===".."){uper++;continue}
      if(arg.path) paths.push(arg.path);
    }else{
      arg = arg.toString()||"";
      if(arg===".."){uper++;continue}

      let aextern = (paths.length===0&&arg.indexOf("http")===0);
      let aabsolute = (paths.length===0&&arg.indexOf("/")===0);
      extern = extern || aextern;
      absolute = absolute || aabsolute;
      paths.push(aextern||aabsolute?arg:encodeURIComponent(arg));
    }
  }

  let pathname = "";
  if(!absolute){
    if(uper<=0){
      pathname = location.pathname + "/";
    }else{
      pathname = router.routes.slice(1,-uper).map((v)=>{return (v.path||"")}).join("/") + "/";
      for (let key in router.params) {
        let re = new RegExp(":"+key,"g"); 
        pathname = pathname.replace(re,router.params[key]);
      }
    }
  }
  pathname += paths.join("/");

  if(extern){
    Apis.Webview.go(pathname,state);
  }else if(!Object.keys(state).length){
    gotoOrReplace?router.push(pathname):router.replace(pathname);
  }else{
    gotoOrReplace
    ?router.push({
      pathname,
      state,
    })
    :router.replace({
      pathname,
      state,
    });
  }
}

export default {
  push(...args){
    navi(true,...args);
  },
  back(step=1){
    let {router} = RouterStatus;
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
}



import { bindActionCreators } from 'redux';

import Webview from '../utils/webview';


export function actionNaviGoto(...args){
  return (dispatch)=>{
    let {location,router,} = window.store.getState().ReduxerNavigate;
    if(!args.length||!args[0]){router.push("/");return;}

    let path = [];
    let state = {};
    let multi = false;
    for(let arg of args){
      if(typeof(arg)==="string"){
        path.push(arg);
      }else if(typeof(arg)==="object" && arg.path){
        if(arg.multiPage) multi = true;
        path.push(arg.path);
      }else{
        state = Object.assign(state,arg);
      }
    }

    if(path.length&&path[0].indexOf("/")!==0&&path[0].indexOf("http")!==0){
      path = Array.concat([location.pathname.slice(-1)==="/"?location.pathname.slice(0,-1):location.pathname],path);
    }

    if(multi){
      Webview.go(path.join("/"),state);
    }else{
      if(!Object.keys(state).length){
        router.push(path.join("/"));
      }else{
        router.push({
          pathname: path.join("/"),
          state: state,
        });
      }
    }
  }
}
export function actionNaviBack(step=1){
  return (dispatch)=>{
    let {router} = window.store.getState().ReduxerNavigate;
    router.go(-step);
  }
}
export function actionNaviReplace(...args){
  return (dispatch)=>{
    let {router,} = window.store.getState().ReduxerNavigate;
    if(!args.length||!args[0]){router.replace("/");return;}

    let path = [];
    let state = {};
    let multi = false;
    for(let arg of args){
      if(typeof(arg)==="string"){
        path.push(arg);
      }else if(typeof(arg)==="object" && arg.path){
        if(arg.multiPage) multi = true;
        path.push(arg.path);
      }else{
        state = Object.assign(state,arg);
      }
    }

    if(multi){
      Webview.replace(path.join("/"),state);
    }else{
      path.length&&path[0].indexOf("/")!==0&&path[0].indexOf("http")!==0
      ?path = "/"+router.routes.slice(1,-1).map((v)=>{return (v.path||"")}).concat(path).join("/")
      :path = path.join("/");
      
      for (let key in router.params) {
        let re = new RegExp(":"+key,"g"); 
        path = path.replace(re,router.params[key]);
      }
      if(!Object.keys(state).length){
        router.replace(path);
      }else{
        router.replace({
          pathname: path,
          state: state,
        });
      }
    }
  }
}

export const APP_NAVI_UPDATE = 'APP_NAVI_UPDATE';
export function actionNaviUpdate(location,router,routes) {
  return {
    type: APP_NAVI_UPDATE,
    location,
    router,
    routes,
  };
}



let actionsNaviObj = null;
export function actionsNavigate(){
  if(actionsNaviObj)return actionsNaviObj;

  actionsNaviObj = bindActionCreators({
    actionNaviGoto,
    actionNaviBack,
    actionNaviReplace,
    actionNaviUpdate,
  },window.store.dispatch);
  return actionsNaviObj;
}



let StateNavi =
{
  location: null,
  router: null,
  routes: null,
}
export function ReduxerNavigate(state = StateNavi, action) {
  switch (action.type) {

  case APP_NAVI_UPDATE:
    return {
      location: action.location,
      router: action.router,
      routes: action.routes,
    };

  default:
    return state;
  }
}
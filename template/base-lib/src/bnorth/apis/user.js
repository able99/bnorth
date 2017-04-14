import hash from "crypto";

import { actionsHttpifFetchWrap, actionsHttpifOperation } from '../actions/httpif';
import { actionsNavi } from '../actions/navigate';
import { actionsNotice } from '../actions/notice';
import Storage from './storage';
import Webview from '../utils/webview';
import PathName from '../app/pathname';
import Config from '../app/config';


//===========
let User = {};

//===========
// user wrap
User.fetchWrap = null;
User.wrapUpdate =function(){
  if(this.fetchWrap) this.fetchWrap = actionsHttpifFetchWrap(__filename, Config.ApiAuthUrl);
  this.fetchWrap.update();
}
User.wrapState = function(){
  return this.fetchWrap?this.fetchWrap.state():{};
}
User.wrapData = function(){
  return this.fetchWrap?this.fetchWrap.data():{};
}
User.wrapClear = function(){
  return this.fetchWrap?this.fetchWrap.clear():null;
}

//===========
// user storage
const StorageUserKey = "BNorthStorageUserKey";
User.storageLoad = function(){
  return Storage.getItem(StorageUserKey);
}
User.storageSave = function(user){
  return Storage.saveItem(StorageUserKey,user);
}
User.storageClear =function(){
  return Storage.removeItem(StorageUserKey);
}

//===========
// user 
User.getToken = function(){
  let user = this.storageLoad();
  return user?user.token:"";
}
User.load = function(){
  return this.wrapData();
}
User.save = function(user){
  return this.storageSave(user);
}
User.clear = function(){
  this.wrapClear();
  this.storageClear();
}


//===========
// user handle
let gUserUpdateListeners = new Set();
function onUserUpdate(user){
  if(!user)return {};
  for(let listener of gUserUpdateListeners) {
    listener(user);
  }
}
User.addListener = function(listener){
  gUserUpdateListeners.add(listener);
}
User.removeListener = function(listener){
  gUserUpdateListeners.remove(listener);
}

//===========
// user op
User.preLogin = function(param){
  let md5 = hash.createHash("md5");
  md5.update(param.password);
  param.password = md5.digest("hex");
  return param;
}
User.afterLogin = function(result,error){
  this.save(result);
  actionsNavi().actionNaviGoto(PathName.Home);
  return result;
}
let gLoginedCallback = null;
User.login = function(param){
  param = this.preLogin(param);
  actionsHttpifOperation().actionOperationSubmit((result,error)=>{
    result = this.afterLogin(result,error);
    onUserUpdate(result);
    if(gLoginedCallback)gLoginedCallback();
    gLoginedCallback = null;
  },Config.ApiAuthUrl,param,"POST");
}
User.logout = function(){
  this.clear();
  onUserUpdate(null);
  actionsNavi().actionNaviGoto(PathName.Login);
  
  actionsHttpifOperation().actionOperationSubmit((result,error)=>{
  },Config.ApiAuthUrl,{},"DELETE");
}
User.update = function(){
  this.wrapUpdate();
}




//===========
// user auth
User.isLogin = function(){
  let user = this.load();
  return Boolean(user&&user.token);
}
User.checkLogin = function(target=null,force=false,cb=null){
  let ret = this.isLogin();
  if(!ret)this.toLogin(target, force, cb);
  return ret;
}
User.toLogin = function(target=null,force=false,cb=null){
  target = target?target:Webview.getHref();
  if(force){
    gLoginedCallback = cb;
    actionsNavi().actionNaviGoto(PathName.Login,target);
  }else{
    actionsNotice().actionNoticeDialogShow({
      closeBtn: false,
      content: "请登录后操作",
      role: "confirm",
      onAction: (confirm)=>{
        if(confirm){
          actionsNavi().actionNaviGoto(PathName.Login,target);
          gLoginedCallback = cb;
        }
      },
    });
  }
}

import { ExtendUser } from '../../extend/extend';
export default Object.assign(User,ExtendUser||{});
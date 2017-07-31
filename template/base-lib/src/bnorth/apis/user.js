import hash from "crypto";

import { Config, Apis, Actions, ActionWraps, AppData, Utils } from '../';

//===========
let User = {};

//===========
// user wrap
User.wrapSuccess = function(result){
  let user = User.storageLoad();
  User.storageSave(Object(user||{},result||{}));
}
User.wrapGet =function(){
  let url = Config.Url.base+Config.Url.api+Config.Url.auth;
  return ActionWraps.actionsHttpifFetchWrap({
    options:{
      resource: url,
    },
    success:(result)=>{
      User.wrapSuccess(result);
    },
  },"user");
}
User.wrapUpdate =function(){
  User.wrapGet().update();
}
User.wrapState = function(){
  return User.wrapGet().state();
}
User.wrapData = function(){
  return User.wrapGet().data();
}
User.wrapClear = function(){
  return User.wrapGet().clear();
}

//===========
// user storage
User.storageLoad = function(){
  return Apis.Storage.getItem(Config.Keys.user);
}
User.storageSave = function(user){
  return Apis.Storage.saveItem(Config.Keys.user,user);
}
User.storageClear =function(){
  return Apis.Storage.removeItem(Config.Keys.user);
}

//===========
// user 
User.getToken = function(){
  let user = this.storageLoad();
  return user?user.token:"";
}
User.load = function(){
  return this.storageLoad();
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
User.getUrl = function(aparam,type) {
  if(type==='verify')
    return Config.Url.base+Config.Url.api+Config.Url.authVerify;
  else
    return Config.Url.base+Config.Url.api+Config.Url.auth;
}
User.preLogin = function(param,type){
  if(type==='verify'){
    return param;
  }else{
    let md5 = hash.createHash("md5");
    md5.update(param.password);
    param.password = md5.digest("hex");
    return param;
  }
}
User.afterLoginOp = function(result,type){
  this.save(result);
  return result;
}
User.afterLoginBack = function(result,type){
  User.loginBack(User.getLoginBackLocation());
}
User.loginBack = function(loginBackLoction){
  let {location} = AppData.routerStatus;
  if(location.query.link){
    Utils.Webview.replace(location.query.link);
    return;
  }

  if(loginBackLoction && loginBackLoction.isReplace) {
    AppData.routerStatus.router.replace(loginBackLoction);
  }else if(loginBackLoction) {
    Apis.Navigate.back();
  }else {
    Apis.Navigate.goHome(true);
  }
}
User.getLoginBackLocation = function(){
  return AppData.loginBackLoction;
}
User.setLoginBackLocation = function(location){
  AppData.loginBackLoction = location;
}
User.login = function(aparam,type) {
  let url = User.getUrl(aparam,type);
  let param = this.preLogin(Object.assign({},aparam),type);
  Actions.actionOperateSubmit({
    resource: url,
    method: "POST",
    data:param,
    noAuth: true,
    success:(result)=>{
      if(param.success&&param.success(result)){
        return;
      }
      result = this.afterLoginOp(result,type);
      this.afterLoginBack(result,type);
      onUserUpdate(result);
    },
    error:param.error,
  });
}
User.logoutNetif = function(){
  let url = Config.Url.base+Config.Url.api+Config.Url.auth;
  
  Actions.actionOperateSubmit({
    resource: url,
    method: "DELETE",
    data:{},
  });
}
User.logout = function(){
  User.logoutNetif();

  User.clear();
  onUserUpdate(null);
  Apis.Navigate.goHome();
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
User.getId = function(){
  let user = this.load();
  return user&&user._id;
}
User.isAdmin = function(){
  let user = this.load();
  return user && user._role_id;
}
User.checkLogin = function(force=false){
  let ret = this.isLogin();
  if(!ret)this.toLogin(force);
  return ret;
}
User.toLogin = function(force=false){
  if(force){
    Apis.Navigate.goLogin(true);
  }else{
    Actions.actionNoticeDialogShow({
      closeBtn: false,
      content: "请登录后操作",
      role: "confirm",
      onAction: (confirm)=>{
        if(confirm){
          Apis.Navigate.goLogin(true);
        }
      },
    });
  }
}

export default User;
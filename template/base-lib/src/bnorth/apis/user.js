import hash from "crypto";

import { Config, Apis, Actions, RouterStatus } from '../';

//===========
let User = {};

//===========
// user wrap
User.fetchWrap = null;
User.wrapUpdate =function(){
  let url = Config.BaseUrl+Config.ApiUrl+Config.AuthUrl;
  if(this.fetchWrap) this.fetchWrap = Actions.actionsHttpifFetchWrap("user", url);
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
  return Apis.Storage.getItem(StorageUserKey);
}
User.storageSave = function(user){
  return Apis.Storage.saveItem(StorageUserKey,user);
}
User.storageClear =function(){
  return Apis.Storage.removeItem(StorageUserKey);
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
User.preLogin = function(param){
  let md5 = hash.createHash("md5");
  md5.update(param.password);
  param.password = md5.digest("hex");
  return param;
}
User.afterLogin = function(result){
  this.save(result);
  if(RouterStatus&&RouterStatus.location.state){
    Apis.Navigate.replace(RouterStatus.location.state);
  }else if(RouterStatus&&RouterStatus.location.param&&RouterStatus.location.param.link){
    Apis.Navigate.replace(RouterStatus.location.param.link);
  }else{
    Apis.Navigate.back();
  }
  
  return result;
}
User.login = function(aparam){
  let url =Config.BaseUrl+Config.ApiUrl+Config.AuthUrl;
  let param = this.preLogin(Object.assign({},aparam));
  Actions.actionOperateSubmit({
    resource: url,
    method: "POST",
    data:param,
    success:(result)=>{
      if(param.success&&param.success(result)){
        return;
      }
      result = this.afterLogin(result);
      onUserUpdate(result);
    },
    error:param.error,
  });
}
User.logout = function(){
  let url = Config.BaseUrl+Config.ApiUrl+Config.AuthUrl;
  
  Actions.actionOperateSubmit({
    resource: url,
    method: "DELETE",
    data:{},
  });

  User.clear();
  onUserUpdate(null);
  Apis.Navigate.push(Config.PathHome);
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
    Apis.Navigate.push(Config.PathLogin);
  }else{
    Actions.actionNoticeDialogShow({
      closeBtn: false,
      content: "请登录后操作",
      role: "confirm",
      onAction: (confirm)=>{
        if(confirm){
          Apis.Navigate.push(Config.PathLogin);
        }
      },
    });
  }
}

export default User;
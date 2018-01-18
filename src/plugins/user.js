/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import md5 from '../utils/md5';


/**
 * 为app 提供用户信息与鉴权的能力扩展
 * @class
 * **插件** 该类为插件类扩展了App 的能力
 * app.User: 该类的原型
 * app.user: 该类的实例
 */
class User {
  constructor(app){
    this.app = app;
    this._userUpdateListeners = new Set();
  }

  //===========
  // user state
  stateSuccess (result){
    let user = this.storageLoad();
    this.storageSave(Object.assign(user||{},result||{}));
  }
  stateError (error){
    
  }
  getInfoUrl() {
    let authUrl = this.app.config.login.urls['info'];;
    return this.app.config.urls.base+this.app.config.urls.api+authUrl;
  }
  state(){
    return this.app.actionStates.request&&this.app.actionStates.request({
      updateOnStart: true,
      resource: this.getInfoUrl(),
      onWillUpdate:()=>this.isLogin(),
      onWillChange:(result)=>{
        this.stateSuccess(result);
      },
      onChangeError:(error)=>{
        this.stateError(error);
      },
    },"user");
  }

  //===========
  // user storage
  storageLoad(){
    return this.app.storage&&this.app.storage.getObj(this.app.config.keys.user);
  }
  storageSave(user){
    return this.app.storage&&this.app.storage.setObj(this.app.config.keys.user,user);
  }
  storageClear(){
    return this.app.storage&&this.app.storage.remove(this.app.config.keys.user);
  }

  //===========
  // user info
  getToken(){
    let user = this.storageLoad();
    return user?user.token:"";
  }
  load(){
    return this.storageLoad()||{};
  }
  save(user){
    return this.storageSave(user);
  }
  clear(){
    this.state().clear();
    this.storageClear();
  }


  //===========
  // user handle
  onUserUpdate(user){
    if(!user)return {};
    for(let listener of this._userUpdateListeners) {
      listener(user);
    }
  }
  addListener(listener){
    this._userUpdateListeners.add(listener);
  }
  removeListener(listener){
    this._userUpdateListeners.remove(listener);
  }

  //===========
  // user login
  getLoginUrl(data,options) {
    if(typeof(options)==='string') return options;
    
    let { type=this.app.config.login.types[0].type } = options||{};
    let authUrl = this.app.config.login.urls[type];
    return this.app.config.urls.base+this.app.config.urls.api+authUrl;
  }
  getLoginMethod(data,options) {
    return 'post';
  }
  getLoginData(data,options) {
    let { fields, data:adata={} } = options||{};
    let ret = {};

    if(fields){
      fields.forEach(v=>{
        ret[v.type] = v.crypto?this.getPasswordCrypto(data[v.type]):data[v.type];
      })
    }else{
      ret = data;
    }

    return Object.assign(ret, adata||{});
  }
  loginBefore(data,options) {
    return [data, options];
  }
  loginRequest(data, options) {
    let { type, fields, success, data:adata, ...params } = options||{};

    this.app.actions.requestSubmit({
      resource: this.getLoginUrl(data,options),
      method: this.getLoginMethod(data,options),
      data: this.getLoginData(data,options),
      noAuth: true,
      success:(result)=>{
        if(success&&success(result, options)) return;
        this.onUserUpdate(result);
        result = this.loginAfter(result,options)||result;
        this.loginNavigate(result,options);
      },
      ...params,
    });
  }
  loginSuccess(result, options) {
    let { success } = options||{};

    if(success&&success(result, options)) return;
    this.onUserUpdate(result);
    result = this.loginAfter(result,options)||result;
    this.loginNavigate(result,options);
  }
  loginAfter(result,options) {
    this.save(result);
  }
  loginNavigate(result,options) {
    this.app.navigator&&this.app.navigator.recall();
  }
  login(data,options) {
    this.loginRequest(...this.loginBefore(data, options));
  }

  //===========
  // user logout
  getLogoutUrl(data, options) {
    let url = this.app.config.login.urls['logout']||'';
    return url.indexOf('http')>=0?url:this.app.config.urls.base+this.app.config.urls.api+url;
  }
  getLogoutMethod(data, options) {
    return this.app.config.login.logoutMethod||'DELETE';
  }
  getLogoutData(data, options) {
    return data||this.app.config.login.logoutData||{};
  }
  getPasswordCrypto(password) {
    return md5(password);
  }
  logoutNetwork(data, options){
     this.app.actions.requestSubmit({
      resource: this.getLogoutUrl(data, options),
      method: this.getLogoutMethod(data, options),
      data:this.getLogoutData(data, options),
      ...options||{},
    });
  }
  logoutAfter(data, options){
    this.clear();
  }
  logoutNavigate(data, options){
    if(this.app.navigator){
      this.app.config.login.logoutToLoginOrHome?this.app.navigator.goLogin():this.app.navigator.goHome();
    }
  }
  logout(data, options){
    this.logoutNetwork(data, options);
    this.logoutAfter(data, options);
    this.onUserUpdate(null);
    this.logoutNavigate(data, options);
  }

  //===========
  // user op
  update(){
    this.state().update();
  }
  isLogin(){
    let user = this.load();
    return Boolean(user&&user.token);
  }
  getId(){
    let user = this.load();
    return user&&user._id;
  }
  isAdmin(){
    let user = this.load();
    return user && user._role_id;
  }
  checkLogin(force=false, replace=true){
    let ret = this.isLogin();
    if(!ret)this.toLogin(force, replace);
    return ret;
  }
  toLogin(force=false, replace=true){
    if(force){
      this.app.navigator&&this.app.navigator.goLogin(replace);
    }else{
      this.app.actions.noticeModal({
        closeBtn: false,
        content: "请登录后操作",
        role: "confirm",
        onAction: (confirm)=>{
          if(confirm){
            this.app.navigator&&this.app.navigator.goLogin(replace);
          }
        },
      });
    }
  }
}


export default {
  init(app) {
    app.User = User;
    app.user = new User(app);
  }
}

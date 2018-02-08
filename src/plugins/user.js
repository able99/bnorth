/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import md5 from '../utils/md5';


/**
 * 用户信息与鉴权
 * @class
 */
class User {
  constructor(app){
    this.app = app;
    this._userUpdateListeners = new Set();
  }

  // user state
  // ---------------------------------
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

  /**
   * 返回用户信息请求的ActionState，可添加到container states 中，获取与跟踪用户信息数据
   * @method
   * @return {ActionStateRequest} - request state
   */
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

  // user storage
  //===========
  storageLoad(){
    return this.app.storage&&this.app.storage.getObj(this.app.config.keys.user);
  }
  storageSave(user){
    return this.app.storage&&this.app.storage.setObj(this.app.config.keys.user,user);
  }
  storageClear(){
    return this.app.storage&&this.app.storage.remove(this.app.config.keys.user);
  }

  // user info
  // --------------------------------
  /**
   * 返回缓存的用户token
   * @method
   * @return {string} - token
   */
  getToken(){
    let user = this.storageLoad();
    return user?user.token:"";
  }

  /**
   * 返回缓存用户信息
   * @method
   * @return {object} - 用户信息
   */
  load(){
    return this.storageLoad()||{};
  }

  /**
   * 替换缓存的用户信息
   * @method
   * @param {object} user - 用户信息 
   */
  save(user){
    return this.storageSave(user);
  }

  /**
   * 清除缓存的用户信息
   * @method
   */
  clear(){
    this.state().clear();
    this.storageClear();
  }


  // user handle
  // -------------------------
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

  // user login
  // ---------------------------
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
  /**
   * 用户登录
   * @method
   * @param {object} data - 登录的参数 
   * @param {object} options -  登录的配置
   */
  login(data,options) {
    this.loginRequest(...this.loginBefore(data, options));
  }

  // user logout
  //===========
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

  /**
   * 用户登出
   * @method
   * @param {object} data - 登出参数
   * @param {object} options - 参数 
   */
  logout(data, options){
    this.logoutNetwork(data, options);
    this.logoutAfter(data, options);
    this.onUserUpdate(null);
    this.logoutNavigate(data, options);
  }

  // user op
  // ---------------------
  /**
   * 更新用户信息与登录状态
   * @method
   */
  update(){
    this.state().update();
  }

  /**
   * 是否登录
   * @method
   * @return {boolean} - 是否登录 
   */
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


/**
 * **plugin** name: user dependence: request, navigator, storage
 * 用户信息与鉴权的能力扩展
 * @class userPlugin
 * @property {class} app.User - User 类
 * @property {User} app.user - User 类实例
 */
export default {
  name: 'user',
  dependence: ['request', 'navigator', 'storage'],

  init(app) {
    app.User = User;
    app.user = new User(app);
  },

  onNavigating(app, nextState) {
    if(nextState.routes.find(v=>v.checkLogin)&&!app.user.isLogin()){
      return typeof(app.config.paths.Login)==='string'?app.config.paths.Login:app.config.paths.Login.path;
    }
  },
}

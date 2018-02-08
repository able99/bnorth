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
  /**
   * @constructor
   * @param {App} app - App 单实例
   */
  constructor(app){
    this.app = app;
  }

  // user state
  // ---------------------------------
  /**
   * 更新用户信息与登录状态
   * @method
   */
  update(){
    this.state().update();
  }

  /**
   * 是否已登录
   * @method
   * @return {boolean} - 是否登录 
   */
  isLogin(){
    let user = this.load();
    return Boolean(user&&user.token);
  }

  /**
   * 获取或更新用户信息成功的处理函数，信息追加的方式保存到用户缓存中
   * @method
   * @param {*} result - 用户信息
   */
  _stateSuccess (result){
    this.save(Object.assign(this.load(),result||{}));
  }

  /**
   * 获取或更新用户信息失败的处理函数
   * @method
   * @param {Error|string} error - 错误信息
   */
  _stateError (error){
    
  }

  /**
   * 获取用户信息的网络接口地址
   * @method
   * @return {string} - 接口地址
   */
  _getInfoUrl() {
    let authUrl = this.app.config.login.urls['info'];;
    return this.app.config.urls.base+this.app.config.urls.api+authUrl;
  }

  /**
   * 返回用户信息请求的ActionState，uuid 为user，可添加到container states 中，获取与跟踪用户信息数据
   * @method
   * @return {ActionStateRequest} - request state
   */
  state(){
    return this.app.actionStates.request&&this.app.actionStates.request({
      updateOnStart: true,
      clearOnStop: false,
      resource: this._getInfoUrl(),
      onWillUpdate:()=>this.isLogin(),
      onWillChange:(result)=>{
        this._stateSuccess(result);
      },
      onChangeError:(error)=>{
        this._stateError(error);
      },
    },"user");
  }

  
  // user info
  // --------------------------------
  /**
   * 返回缓存的用户token
   * @method
   * @return {string} - token
   */
  getToken(){
    let user = this.load();
    return user?user.token:"";
  }

  /**
   * 返回缓存用户信息
   * @method
   * @return {object} - 用户信息
   */
  load(){
    return (this.app.storage&&this.app.storage.getObj(this.app.config.keys.user))||{};
  }

  /**
   * 替换缓存的用户信息
   * @method
   * @param {object} user - 用户信息 
   */
  save(user){
    return this.app.storage&&this.app.storage.setObj(this.app.config.keys.user,user);
  }

  /**
   * 清除缓存的用户信息
   * @method
   */
  clear(){
    this.state().clear();
    return this.app.storage&&this.app.storage.remove(this.app.config.keys.user);
  }


  // user login
  // ---------------------------
  _getLoginUrl(data,options) {
    if(typeof(options)==='string') return options;
    
    let { type=this.app.config.login.types[0].type } = options||{};
    let authUrl = this.app.config.login.urls[type];
    return this.app.config.urls.base+this.app.config.urls.api+authUrl;
  }
  _getLoginMethod(data,options) {
    return 'post';
  }
  _getPasswordCrypto(password) {
    return md5(password);
  }
  _getLoginData(data,options) {
    let { fields, data:adata={} } = options||{};
    let ret = {};

    if(fields){
      fields.forEach(v=>{
        ret[v.type] = v.crypto?this._getPasswordCrypto(data[v.type]):data[v.type];
      })
    }else{
      ret = data;
    }

    return Object.assign(ret, adata||{});
  }
  _loginBefore(data,options) {
    return [data, options];
  }
  _loginRequest(data, options) {
    let { type, fields, success, data:adata, ...params } = options||{};

    this.app.actions.requestSubmit && this.app.actions.requestSubmit({
      resource: this._getLoginUrl(data,options),
      method: this._getLoginMethod(data,options),
      data: this._getLoginData(data,options),
      noAuth: true,
      success:(result)=>{
        this._loginSuccess(result, options);
      },
      ...params,
    });
  }
  _loginSuccess(result, options) {
    let { success } = options||{};

    if(success&&success(result, options)) return;
    this.app.trigger('onUserUpdate', result);
    result = this._loginAfter(result,options)||result;
    this._loginNavigate(result,options);
  }
  _loginAfter(result,options) {
    this.save(result);
  }
  _loginNavigate(result,options) {
    this.app.navigator&&this.app.navigator.recall();
  }
  /**
   * 用户登录
   * @method
   * @param {object} data - 登录的参数 
   * @param {object} options -  登录的配置
   */
  login(data,options) {
    this._loginRequest(...this._loginBefore(data, options));
  }

  // user logout
  //===========
  _getLogoutUrl(data, options) {
    let url = this.app.config.login.urls['logout']||'';
    return url.indexOf('http')>=0?url:this.app.config.urls.base+this.app.config.urls.api+url;
  }
  _getLogoutMethod(data, options) {
    return this.app.config.login.logoutMethod||'DELETE';
  }
  _getLogoutData(data, options) {
    return data||this.app.config.login.logoutData||{};
  }
  _logoutNetwork(data, options){
    this.app.actions.requestSubmit && this.app.actions.requestSubmit({
      resource: this._getLogoutUrl(data, options),
      method: this._getLogoutMethod(data, options),
      data:this._getLogoutData(data, options),
      ...options||{},
    });
  }
  _logoutAfter(data, options){
    this.clear();
  }
  _logoutNavigate(data, options){
    if(this.app.navigator){ this.app.config.login.logoutToLoginOrHome?this.app.navigator.goLogin():this.app.navigator.goHome(); }
  }

  /**
   * 用户登出
   * @method
   * @param {object} data - 登出参数
   * @param {object} options - 参数 
   */
  logout(data, options){
    this._logoutNetwork(data, options);
    this._logoutAfter(data, options);
    this.app.trigger('onUserUpdate',{});
    this._logoutNavigate(data, options);
  }
}


/**
 * **plugin** name: user dependence: request, navigator, storage event: onUserUpdate({*}user) handle: onNavigating
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

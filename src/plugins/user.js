/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import md5 from '../utils/md5';

/**
 * 用户登录与登出操作参数
 * @class UserLoginLogoutOptions
 * @property {ActionStateRequestOptions|NetworkOptions} [requestOption] - 直接传递到request api 参数
 */

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
   * 返回用户信息请求的ActionState，uuid 为user，可添加到container states 中，获取与跟踪用户信息数据
   * @method
   * @return {ActionStateRequest} - request state
   */
  state(){
    return this.app.actionStates.request&&this.app.actionStates.request({
      updateOnStart: true,
      clearOnStop: false,
      resource: this.app.config.login.urls['info'],
      ...this.app.infoOptions,
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
  /**
   * 数据加密
   * @method
   * @param {*} value - 要加密的数据
   * @param {*} crypto - 加密方法
   * @param {object} data - 登录数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _getCrypto(value, crypto, data, options) {
    return md5(value);
  }

  /**
   * 返回用户登录数据
   * @method
   * @param {object} data - 登录数据
   * @param {UserLoginLogoutOptions} options - 参数 
   * @return {object} - 登录数据
   */
  _getLoginData(data, options) {
    let { fields, data:adata={} } = options||{};
    let ret = {};

    if(fields){
      fields.forEach(v=>{
        ret[v.type] = v.crypto?this._getCrypto(data[v.type], v.crypto, data, options):data[v.type];
      })
    }else{
      ret = data;
    }

    return Object.assign(ret, adata||{});
  }

  /**
   * 用户登录之前的操作，可对参数进行修改
   * @method
   * @param {object} data - 登录数据
   * @param {UserLoginLogoutOptions} options - 参数 
   * @return {array} - 返回参数列表
   */
  _loginBefore(data,options) {
    return [data, options];
  }

  /**
   * 用户登录接口请求
   * @method
   * @param {object} data - 登录数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _loginRequest(data, options) {
    this.app.actions.request && this.app.actions.request({
      resource: this.app.config.login.urls[(options&&options.type)||'login'],
      noAuth: true,
      ...this.app.config.login.loginOptions,
      ...((options&&options.requestOptions)||{}),
      data: this._getLoginData(data,options),
      onSuccess:(result)=>{
        this._loginSuccess(result, options);
      },
    });
  }

  /**
   * 用户登录成功的处理函数
   * @method
   * @param {object} data - 登录数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _loginSuccess(result, options) {
    if(options&&options.onSuccess&&options.onSuccess(result, options)) return;
    this.app.trigger('onUserUpdate', result);
    result = this._loginAfter(result,options)||result;
    this._loginNavigate(result,options);
  }

  /**
   * 用户登录成功后的操作，保存用户信息
   * @method
   * @param {object} data - 登录数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _loginAfter(result,options) {
    this.save(result);
  }

  /**
   * 用户登录成功的跳转操作
   * @method
   * @param {object} data - 登录数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _loginNavigate(result,options) {
    this.app.navigator&&this.app.navigator.recall();
  }

  /**
   * 用户登录
   * @method
   * @param {object} data - 登录数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  login(data,options) {
    this._loginRequest(...this._loginBefore(data, options));
  }

  /**
   * 用来显示确实是否登录的操作，默认直接确认了，如果需要显示确认框，需要覆盖该函数，并在用户选择确认时，触发回调函数
   * @method
   * @param {function} cb - 确认时回调函数
   */
  toLoginPrompt(cb) {
    cb();
  }

  /**
   * 跳转到登录页面
   * @method
   * @param {boolean} [isForce=true] - 是否直接调转登录，还是弹出确认框
   * @param {boolean} [isReplace=true] - 是否替换当前页面
   */
  toLogin(isForce=true, isReplace=true) {
    if(isForce) {
      this.app.navigator.goLogin(isReplace)
    } else {
      toLoginPrompt(()=>this.app.navigator.goLogin(isReplace));
    }
  }

  // user logout
  //===========
  /**
   * 获取登出数据
   * @method
   * @param {object} data - 登出数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _getLogoutData(data, options) {
    return {};
  }

  /**
   * 登出的接口调用
   * @method
   * @param {object} data - 登出数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _logoutNetwork(data, options){
    this.app.actions.request && this.app.actions.request({
      resource: this.app.config.login.urls['logout'],
      ...this.app.config.logoutOptions,
      ...((options&&options.requestOptions)||{}),
      data:this._getLogoutData(data, options),
    });
  }

  /**
   * 登出后操作，清理用户信息等
   * @method
   * @param {object} data - 登出数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _logoutAfter(data, options){
    this.clear();
  }

  /**
   * 登出后的跳转操作
   * @method
   * @param {object} data - 登出数据
   * @param {UserLoginLogoutOptions} options - 参数 
   */
  _logoutNavigate(data, options){
    if(this.app.navigator){ this.app.config.login.logoutToLoginOrHome?this.app.navigator.goLogin():this.app.navigator.goHome(); }
  }

  /**
   * 用户登出
   * @method
   * @param {object} data - 登出数据
   * @param {UserLoginLogoutOptions} options - 参数 
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
    if((app.config.paths.Login!==nextState.location.pathname)&&nextState.routes.find(v=>v.checkLogin)&&!app.user.isLogin()){
      return typeof(app.config.paths.Login)==='string'?app.config.paths.Login:app.config.paths.Login.path;
    }
  },
}

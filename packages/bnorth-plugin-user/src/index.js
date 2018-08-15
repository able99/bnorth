class User {
  constructor(app) {
    this.app = app;
    this.userKey = 'bnorth-keys-user';
    this.infoOptions = {
      url: 'user',
      method: 'get',
    };
    this.loginOptions = {
      url: 'user',
      method: 'post',
    };
    this.logoutOptions = {
      url: 'user',
      method: 'delete',
    };
  }

  // storage
  // --------------------------
  isLogin(){
    return Boolean(this.getToken());
  }

  getToken() {
    let user = this.load();
    return user.token;
  }

  data(){
    return (this.app.storage&&this.app.storage.getObj(this.userKey))||{};
  }

  update(user){
    let ret = this.app.storage&&this.app.storage.setObj(this.userKey, user);
    this.app.event.emit(this.app, 'onUserUpdate', user);
    return ret;
  }

  clear(){
    let ret = this.app.storage&&this.app.storage.remove(this.userKey);
    this.app.event.emit(this.app, 'onUserUpdate');
    return ret;
  }

  // login
  // --------------------------
  _loginNetwork(data, options) {
    return this.app.request.request({
      data,
      ...options,
      ...this.loginOptions,
    }, false);
  }

  _loginResult(result, data, options) {
    this.update(result&&result.data);
  }

  _loginNavigator(result, data, options) {
    this.app.router.restore();
  }

  login(data,options) {
    if(this._loginPrepare) [data, options] = this._loginPrepare(data, options);
    return this._loginNetwork(data, options)
      .then(result=>{
        if(this._loginResultBefore) result = this._loginResultBefore(result, data, options);
        if(result) {
          this._loginResult(result, data, options);
          this._loginNavigator(result, data, options);
          if(this._loginResultAfter) result = this._loginResultAfter(result, data, options);
          return result;
        }else{
          if(this._loginError) this._loginError(data, options);
          return;
        }
      })
  }

  // logout
  // --------------------------
  _logoutNetwork(data, options) {
    this.app.request.request({
      data,
      ...options,
      ...this.logoutOptions,
    }, false);
    return Promise.resolve(true);
  }

  _logoutResult(result, data, options) {
    this.clear();
  }

  _logoutNavigator(result, data, options) {
    this.toLogin();
  }

  logout(data, options){
    if(this._logoutPrepare) [data, options] = this._logoutPrepare(data, options);
    this._logoutNetwork(data, options).then(result=>{
      if(this._logoutResultBefore) result = this._logoutResultBefore(result, data, options);
      if(result) {
        this._logoutResult(result, data, options);
        this._logoutNavigator(result, data, options);
        if(this._logoutResultAfter) result = this._logoutResultAfter(result, data, options);
        return result;
      }else{
        if(this._logoutError) this._logoutError(data, options);
        return;
      }
    });
  }

  // navigator
  // --------------------------
  toLogin(isReplace=true,isForce=true) {
    let goLogin = ()=>this.app.router.goLogin && this.app.router.goLogin(isReplace);
    isForce?goLogin(isReplace):this.toLoginPrompt(()=>goLogin(isReplace));
  }

  toLoginPrompt(cb) {
    cb();
  }
}

export default {
  // plugin 
  // --------------------------------
  pluginName: 'user',
  pluginDependence: ['request', 'storage'],

  onPluginMount(app) {
    app.User = User;
    app.user = new User(app);
    app.event.on(app, 'onRouterEnter', (key, route, match)=>{
      if(route.checkLogin && !app.user.isLogin()) return ()=>app.router.goLogin();
    })
  },

  onPluginUnmount(app) {
    delete app.User;
    delete app.user;
  },

  
}


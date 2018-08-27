class User {
  constructor(app, options={}) {
    this.app = app;
    this.options = {...User.options, ...options}
  }

  // storage
  // --------------------------
  isLogin(){
    return Boolean(this.getToken());
  }

  getToken() {
    let user = this.data();
    return user.token;
  }

  data(){
    return (this.app.storage&&this.app.storage.getObj(this.options.userKey))||{};
  }

  update(user){
    let ret = this.app.storage&&this.app.storage.setObj(this.options.userKey, user);
    this.app.event.emit(this.app._id, 'onUserUpdate', user);
    return ret;
  }

  clear(){
    let ret = this.app.storage&&this.app.storage.remove(this.options.userKey);
    this.app.event.emit(this.app._id, 'onUserUpdate');
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
    options = this.app.utils.getOptions(this.options, options);
    options = this.app.utils.getOptions(options, options.login);

    if(this._loginPrepare) [data, options] = this._loginPrepare(data, options);
    return this._loginNetwork(data, options).then(result=>{
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
    this.pushLogin();
  }

  logout(data, options){
    options = this.app.utils.getOptions(this.options, options);
    options = this.app.utils.getOptions(options, options.logout);

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
  pushLogin(confirm) {
    if(!this.app.router.pushLogin) return;
    return confirm?this.toLoginConfirm(()=>this.app.router.pushLogin()):this.app.router.pushLogin();
  }

  replaceLogin(confirm) {
    if(!this.app.router.replaceLogin) return;
    return confirm?this.toLoginConfirm(()=>this.app.router.replaceLogin()):this.app.router.replaceLogin();
  }

  toLoginConfirm(confirm, cb) {
    cb();
  }
}


User.options = {
  userKey: 'bnorth-keys-user',
  info: {
    url: 'user',
    method: 'get',
  },
  login: {
    url: 'user',
    method: 'post',
  },
  logout: {
    url: 'user',
    method: 'delete',
  },
}


export default {
  _id: 'user',
  _dependencies: ['request', 'storage'],

  onPluginMount(app, plugin, options) {
    app.User = User;
    app.user = new User(app, options);
  },

  onPluginUnmount(app) {
    delete app.User;
    delete app.user;
  },

  onRouterEnter(key, route, match) {
    if(route.checkLogin && !app.user.isLogin()) return ()=>app.router.goLogin();
  }
}


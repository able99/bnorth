class User {
  constructor(app, _id, options={}) {
    this.app = app;
    this._id = _id;
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

  // // info
  // // --------------------------
  // _infoNetwork(data, options) {
  //   return this.app.request.request({
  //     isSubmit: false,
  //     data,
  //     ...options,
  //   });
  // }

  // _infoResult(result, data, options) {
  //   let user = result&&result.data?{...this.data(), ...result.data}:result.data;
  //   this.update(user);
  // }

  // info(data,options) {
  //   options = this.app.utils.getOptions(this.options.info, options);

  //   if(this._infoPrepare) [data, options] = this._infoPrepare(data, options);
  //   return this._infoNetwork(data, options).then(result=>{
  //     if(this._infoResultBefore) result = this._infoResultBefore(result, data, options);
  //     if(result) {
  //       this._infoResult(result, data, options);
  //       if(this._infoResultAfter) result = this._infoResultAfter(result, data, options);
  //       return result;
  //     }else{
  //       if(this._infoError) this._infoError(data, options);
  //       return;
  //     }
  //   })
  // }

  // login
  // --------------------------
  _loginNetwork(data, options) {
    return this.app.request.request({
      data,
      ...options,
    });
  }

  _loginResult(result, data, options) {
    this.update(result&&result.data);
  }

  _loginNavigator(result, data, options) {
    this.app.router.restore();
  }

  login(data,options) {
    options = this.app.utils.getOptions(this.options.login, options);

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
    });
    return Promise.resolve(true);
  }

  _logoutResult(result, data, options) {
    this.clear();
  }

  _logoutNavigator(result, data, options) {
    this.options.logoutToHomeOrLogin?this.app.router.pushRoot():this.app.router.pushLogin();
  }

  logout(data, options){
    options = this.app.utils.getOptions(this.options.logout, options);

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
  pushLogin(confirm, ...args) {
    if(!this.app.router.pushLogin) return;
    return confirm?this.toLoginConfirm(()=>this.app.router.pushLogin(...args), confirm):this.app.router.pushLogin();
  }

  replaceLogin(confirm, ...args) {
    if(!this.app.router.replaceLogin) return;
    return confirm?this.toLoginConfirm(()=>this.app.router.replaceLogin(...args), confirm):this.app.router.replaceLogin();
  }

  toLoginConfirm(cb, confirm) {
    if(confirm) {
      this.app.modal&&this.app.modal.show('是否登录？', {role: 'prompt', onAction: index=>{index>=1&&cb&&cb()}})
    }else{
      cb&&cb();
    }
  }
}


User.options = {
  userKey: 'bnorth-keys-user',
  logoutToHomeOrLogin: true,
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


export default app=>({
  _id: 'user',
  _dependencies: ['request', 'storage'],

  onPluginMount(app, plugin, options) {
    app.User = User;
    app.user = new User(app, plugin._id, options);
    // app.UserState = class Request extends app.Request {
    //   constructor(app, _id, options) {
    //     super(app, _id, options);
    //     app.event.on(app._id, 'onUserUpdate', user=>{this.update(user)}, this._id);
    //   }
    
    //   fetch(data, options) {
    //     return this.app.user.info(data, options);
    //   }
      
    //   data() {
    //     return this.app.user.data();
    //   }
    // }
  },

  onPluginUnmount(app) {
    delete app.User;
    delete app.user;
  },

  onRouteMatch({route}={}) {
    if(route&&route.checkLogin&&!app.user.isLogin()) return app=>{app.router.replaceLogin()};
  }
})


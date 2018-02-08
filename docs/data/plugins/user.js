[{"tags":[{"type":"copyright","string":"(c) 2016 able99","html":"<p>(c) 2016 able99</p>"},{"type":"author","string":"able99 (8846755@qq.com)","html":"<p>able99 (8846755@qq.com)</p>"},{"type":"license","string":"MIT","html":"<p>MIT</p>"}],"description":{"full":"<p>bnorth solution</p>","summary":"<p>bnorth solution</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":1,"codeStart":9,"code":"import md5 from '../utils/md5';","ctx":false},{"tags":[{"type":"class","string":"","html":""}],"description":{"full":"<p>用户信息与鉴权</p>","summary":"<p>用户信息与鉴权</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":12,"codeStart":16,"code":"class User {\n  constructor(app){\n    this.app = app;\n    this._userUpdateListeners = new Set();\n  }\n\n  // user state\n  // ---------------------------------\n  stateSuccess (result){\n    let user = this.storageLoad();\n    this.storageSave(Object.assign(user||{},result||{}));\n  }\n  stateError (error){\n    \n  }\n  getInfoUrl() {\n    let authUrl = this.app.config.login.urls['info'];;\n    return this.app.config.urls.base+this.app.config.urls.api+authUrl;\n  }","ctx":{"type":"class","constructor":"User","cons":"User","name":"User","extends":"","string":"new User()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"return","string":"{ActionStateRequest} - request state","types":["ActionStateRequest"],"typesDescription":"<a href=\"ActionStateRequest.html\">ActionStateRequest</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>request state</li>\n</ul>"}],"description":{"full":"<p>返回用户信息请求的ActionState，可添加到container states 中，获取与跟踪用户信息数据</p>","summary":"<p>返回用户信息请求的ActionState，可添加到container states 中，获取与跟踪用户信息数据</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":36,"codeStart":41,"code":"state(){\n  return this.app.actionStates.request&&this.app.actionStates.request({\n    updateOnStart: true,\n    resource: this.getInfoUrl(),\n    onWillUpdate:()=>this.isLogin(),\n    onWillChange:(result)=>{\n      this.stateSuccess(result);\n    },\n    onChangeError:(error)=>{\n      this.stateError(error);\n    },\n  },\"user\");\n}\n\n// user storage\n//===========\nstorageLoad(){\n  return this.app.storage&&this.app.storage.getObj(this.app.config.keys.user);\n}\nstorageSave(user){\n  return this.app.storage&&this.app.storage.setObj(this.app.config.keys.user,user);\n}\nstorageClear(){\n  return this.app.storage&&this.app.storage.remove(this.app.config.keys.user);\n}\n\n// user info\n// --------------------------------","ctx":{"type":"method","constructor":"User","cons":"User","name":"state","string":"User.prototype.state()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"return","string":"{string} - token","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>token</li>\n</ul>"}],"description":{"full":"<p>返回缓存的用户token</p>","summary":"<p>返回缓存的用户token</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":69,"codeStart":74,"code":"getToken(){\n  let user = this.storageLoad();\n  return user?user.token:\"\";\n}","ctx":{"type":"method","constructor":"User","cons":"User","name":"getToken","string":"User.prototype.getToken()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"return","string":"{object} - 用户信息","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>用户信息</li>\n</ul>"}],"description":{"full":"<p>返回缓存用户信息</p>","summary":"<p>返回缓存用户信息</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":79,"codeStart":84,"code":"load(){\n  return this.storageLoad()||{};\n}","ctx":{"type":"method","constructor":"User","cons":"User","name":"load","string":"User.prototype.load()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{object} user - 用户信息","name":"user","description":"<ul>\n<li>用户信息</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>替换缓存的用户信息</p>","summary":"<p>替换缓存的用户信息</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":88,"codeStart":93,"code":"save(user){\n  return this.storageSave(user);\n}","ctx":{"type":"method","constructor":"User","cons":"User","name":"save","string":"User.prototype.save()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>清除缓存的用户信息</p>","summary":"<p>清除缓存的用户信息</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":97,"codeStart":101,"code":"clear(){\n  this.state().clear();\n  this.storageClear();\n}\n\n\n// user handle\n// -------------------------\nonUserUpdate(user){\n  if(!user)return {};\n  for(let listener of this._userUpdateListeners) {\n    listener(user);\n  }\n}\naddListener(listener){\n  this._userUpdateListeners.add(listener);\n}\nremoveListener(listener){\n  this._userUpdateListeners.remove(listener);\n}\n\n// user login\n// ---------------------------\ngetLoginUrl(data,options) {\n  if(typeof(options)==='string') return options;\n  \n  let { type=this.app.config.login.types[0].type } = options||{};\n  let authUrl = this.app.config.login.urls[type];\n  return this.app.config.urls.base+this.app.config.urls.api+authUrl;\n}\ngetLoginMethod(data,options) {\n  return 'post';\n}\ngetLoginData(data,options) {\n  let { fields, data:adata={} } = options||{};\n  let ret = {};\n\n  if(fields){\n    fields.forEach(v=>{\n      ret[v.type] = v.crypto?this.getPasswordCrypto(data[v.type]):data[v.type];\n    })\n  }else{\n    ret = data;\n  }\n\n  return Object.assign(ret, adata||{});\n}\nloginBefore(data,options) {\n  return [data, options];\n}\nloginRequest(data, options) {\n  let { type, fields, success, data:adata, ...params } = options||{};\n\n  this.app.actions.requestSubmit({\n    resource: this.getLoginUrl(data,options),\n    method: this.getLoginMethod(data,options),\n    data: this.getLoginData(data,options),\n    noAuth: true,\n    success:(result)=>{\n      if(success&&success(result, options)) return;\n      this.onUserUpdate(result);\n      result = this.loginAfter(result,options)||result;\n      this.loginNavigate(result,options);\n    },\n    ...params,\n  });\n}\nloginSuccess(result, options) {\n  let { success } = options||{};\n\n  if(success&&success(result, options)) return;\n  this.onUserUpdate(result);\n  result = this.loginAfter(result,options)||result;\n  this.loginNavigate(result,options);\n}\nloginAfter(result,options) {\n  this.save(result);\n}\nloginNavigate(result,options) {\n  this.app.navigator&&this.app.navigator.recall();\n}","ctx":{"type":"method","constructor":"User","cons":"User","name":"clear","string":"User.prototype.clear()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{object} data - 登录的参数 ","name":"data","description":"<ul>\n<li>登录的参数</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} options -  登录的配置","name":"options","description":"<ul>\n<li>登录的配置</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>用户登录</p>","summary":"<p>用户登录</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":182,"codeStart":188,"code":"login(data,options) {\n  this.loginRequest(...this.loginBefore(data, options));\n}\n\n// user logout\n//===========\ngetLogoutUrl(data, options) {\n  let url = this.app.config.login.urls['logout']||'';\n  return url.indexOf('http')>=0?url:this.app.config.urls.base+this.app.config.urls.api+url;\n}\ngetLogoutMethod(data, options) {\n  return this.app.config.login.logoutMethod||'DELETE';\n}\ngetLogoutData(data, options) {\n  return data||this.app.config.login.logoutData||{};\n}\ngetPasswordCrypto(password) {\n  return md5(password);\n}\nlogoutNetwork(data, options){\n   this.app.actions.requestSubmit({\n    resource: this.getLogoutUrl(data, options),\n    method: this.getLogoutMethod(data, options),\n    data:this.getLogoutData(data, options),\n    ...options||{},\n  });\n}\nlogoutAfter(data, options){\n  this.clear();\n}\nlogoutNavigate(data, options){\n  if(this.app.navigator){\n    this.app.config.login.logoutToLoginOrHome?this.app.navigator.goLogin():this.app.navigator.goHome();\n  }\n}","ctx":{"type":"method","constructor":"User","cons":"User","name":"login","string":"User.prototype.login()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{object} data - 登出参数","name":"data","description":"<ul>\n<li>登出参数</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} options - 参数","name":"options","description":"<ul>\n<li>参数</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>用户登出</p>","summary":"<p>用户登出</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":224,"codeStart":230,"code":"logout(data, options){\n  this.logoutNetwork(data, options);\n  this.logoutAfter(data, options);\n  this.onUserUpdate(null);\n  this.logoutNavigate(data, options);\n}\n\n// user op\n// ---------------------","ctx":{"type":"method","constructor":"User","cons":"User","name":"logout","string":"User.prototype.logout()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>更新用户信息与登录状态</p>","summary":"<p>更新用户信息与登录状态</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":239,"codeStart":243,"code":"update(){\n  this.state().update();\n}","ctx":{"type":"method","constructor":"User","cons":"User","name":"update","string":"User.prototype.update()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"return","string":"{boolean} - 是否登录","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>是否登录</li>\n</ul>"}],"description":{"full":"<p>是否登录</p>","summary":"<p>是否登录</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":247,"codeStart":252,"code":"isLogin(){\n  let user = this.load();\n  return Boolean(user&&user.token);\n}\ngetId(){\n  let user = this.load();\n  return user&&user._id;\n}\nisAdmin(){\n  let user = this.load();\n  return user && user._role_id;\n}\ncheckLogin(force=false, replace=true){\n  let ret = this.isLogin();\n  if(!ret)this.toLogin(force, replace);\n  return ret;\n}\ntoLogin(force=false, replace=true){\n  if(force){\n    this.app.navigator&&this.app.navigator.goLogin(replace);\n  }else{\n    this.app.actions.noticeModal({\n      closeBtn: false,\n      content: \"请登录后操作\",\n      role: \"confirm\",\n      onAction: (confirm)=>{\n        if(confirm){\n          this.app.navigator&&this.app.navigator.goLogin(replace);\n        }\n      },\n    });\n  }\n}\n}","ctx":{"type":"method","constructor":"User","cons":"User","name":"isLogin","string":"User.prototype.isLogin()"}},{"tags":[{"type":"class","string":"userPlugin","html":"<p>userPlugin</p>"},{"type":"property","string":"{class} app.User - User 类","name":"app.User","description":"<ul>\n<li>User 类</li>\n</ul>","types":["class"],"typesDescription":"<a href=\"class.html\">class</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"property","string":"{User} app.user - User 类实例","name":"app.user","description":"<ul>\n<li>User 类实例</li>\n</ul>","types":["User"],"typesDescription":"<a href=\"User.html\">User</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p><strong>plugin</strong> name: user dependence: request, navigator, storage<br />\n用户信息与鉴权的能力扩展</p>","summary":"<p><strong>plugin</strong> name: user dependence: request, navigator, storage<br />\n用户信息与鉴权的能力扩展</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":288,"codeStart":295,"code":"export default {\n  name: 'user',\n  dependence: ['request', 'navigator', 'storage'],\n\n  init(app) {\n    app.User = User;\n    app.user = new User(app);\n  },\n\n  onNavigating(app, nextState) {\n    if(nextState.routes.find(v=>v.checkLogin)&&!app.user.isLogin()){\n      return typeof(app.config.paths.Login)==='string'?app.config.paths.Login:app.config.paths.Login.path;\n    }\n  },\n}","ctx":false}]
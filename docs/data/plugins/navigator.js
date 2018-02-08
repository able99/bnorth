[{"tags":[{"type":"copyright","string":"(c) 2016 able99","html":"<p>(c) 2016 able99</p>"},{"type":"author","string":"able99 (8846755@qq.com)","html":"<p>able99 (8846755@qq.com)</p>"},{"type":"license","string":"MIT","html":"<p>MIT</p>"}],"description":{"full":"<p>bnorth solution</p>","summary":"<p>bnorth solution</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":1,"codeStart":9,"code":"import Url from 'url-parse';","ctx":false},{"tags":[{"type":"class","string":"","html":""}],"description":{"full":"<p>app 应用内无刷新导航功能类</p>","summary":"<p>app 应用内无刷新导航功能类</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":12,"codeStart":16,"code":"class Navigator{\n  constructor(app){\n    this.app = app;\n    this.recallLocation = null;\n    this.routerStatus = null;\n  }\n\n  _getUrl(...args){\n    if(!this.routerStatus||!args.length) return '/';\n    let { location,router } = this.routerStatus;\n\n    let paths = [];\n    let extern = false;\n    let absolute = false;\n    let passState = false;\n    let passQuery = false;\n    let uper = 0;\n    let newloc = {\n      pathname: '',\n    };\n\n    args.forEach((arg,i)=>{\n      if(!arg){\n        this.app.error('invalided navigator params');\n      }else if(Array.isArray(arg)){\n        [ newloc.query, passQuery, newloc.state, passState, ] = arg;\n      }else{\n        arg = typeof(arg)===\"object\"?arg:{path: arg};\n        if(!arg.path) {this.app.error('invalided navigator params'); return;}\n\n        let aextern = i===0 && typeof(arg.path)==='string' && arg.path.indexOf(\"http\")===0;\n        let aabsolute = i===0 && typeof(arg.path)==='string' && arg.path.indexOf(\"/\")===0;\n        extern = extern || arg.extern || aextern;\n        absolute = absolute || arg.absolute || aabsolute;\n        if(arg.path===\"/\"){return}\n        if(arg.path===\".\"){return}\n        if(arg.path===\"..\"){uper++;return}\n      \n        if(arg.path) {\n          let apath = [aextern||aabsolute?arg.path:encodeURIComponent(arg.path)];\n          if(newloc.query&&Array.isArray(arg.params)&&arg.params.length){\n            arg.params.forEach((v)=>{\n              if(newloc.query[v]) apath.push(newloc.query[v]);\n              delete newloc.query[v];\n            });\n          }\n          paths.push(apath.join('/'));\n        }\n      }\n    });\n\n    if(!absolute&&!extern){\n      if(uper<=0){\n        newloc.pathname = location.pathname;\n      }else{\n        newloc.pathname = router.routes.slice(1,-uper).map((v)=>{return (v.path||\"\")}).join(\"/\");\n        for (let key in router.params) {\n          let re = new RegExp(\":\"+key,\"g\"); \n          newloc.pathname = newloc.pathname.replace(re,router.params[key]);\n        }\n      }\n    }\n    newloc.pathname = (newloc.pathname?[newloc.pathname]:[]).concat(paths).join(\"/\");\n    if(!extern)newloc.pathname = newloc.pathname.replace(/\\/\\//g,'/');\n    newloc.state = Object.assign({},passState?location.state:{},newloc.state);\n    newloc.query = Object.assign({},passQuery?location.query:{},newloc.query);\n    if(!Object.keys(newloc.query).length)delete newloc.query;\n    if(!Object.keys(newloc.state).length)delete newloc.state;\n\n    return [newloc, extern, absolute];\n  }","ctx":{"type":"class","constructor":"Navigator","cons":"Navigator","name":"Navigator","extends":"","string":"new Navigator()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>for custom party of recall</p>","summary":"<p>for custom party of recall</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":88,"codeStart":92,"code":"_recallBefore(location,router) {\n  if(this.app.config.login.loginToHomeOrAuto) {\n    this.goHome();\n    return true;\n  }\n  \n  let link = this.app.browser&&this.app.browser.parseUrl().query.link;\n  if(link){\n    this.app.browser&&this.app.browser.replace(decodeURIComponent(link));\n    return true;\n  }\n  \n  if(location.query.link){\n    this.app.browser&&this.app.browser.replace(decodeURIComponent(location.query.link));\n    return true;\n  }\n}","ctx":{"type":"method","constructor":"Navigator","cons":"Navigator","name":"_recallBefore","string":"Navigator.prototype._recallBefore()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>返回之前的页面，与back 不同，会考虑错误跳转，link 参数因素</p>","summary":"<p>返回之前的页面，与back 不同，会考虑错误跳转，link 参数因素</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":110,"codeStart":114,"code":"recall(){\n  if(!this.routerStatus)return;\n  let {location,router} = this.routerStatus;\n  \n  if(this._recallBefore(location,router)) return;\n\n  if(this.recallLocation && this.recallLocation.isReplace) {\n    router.replace(this.recallLocation);\n  }else if(this.recallLocation) {\n    this.back();\n  }else {\n    this.goHome(true);\n  }\n}","ctx":{"type":"method","constructor":"Navigator","cons":"Navigator","name":"recall","string":"Navigator.prototype.recall()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{...(string|array)} [paths] - 路由列表，可以是字符串，path 解析对象或者 router3 location对象，还可能是数组：<br />\n**'/'**：出现在字符串或者对象中的pathname 中时，从根路径开始计算，否则从当前路径开始计算\n**'..'**：出现在字符串或者对象中的pathname 中时，从当前路径的上一级路径开始计算，每出现一次，返回一级\n**params**：如果path 对象包含params 数组，说明该路径包含path info 参宿，会从query 参数生成path info 字符串\n**数组对象**：如果是数组对象，4个元素[query,pass query,state,pass state]分别是设置query 键值对，是否将query 键值对传递，state 键值对，和是否将state 键值对传递","name":"[paths]","description":"<ul>\n<li>路由列表，可以是字符串，path 解析对象或者 router3 location对象，还可能是数组：<br /> <strong>'/'</strong>：出现在字符串或者对象中的pathname 中时，从根路径开始计算，否则从当前路径开始计算<br />\n<strong>'..'</strong>：出现在字符串或者对象中的pathname 中时，从当前路径的上一级路径开始计算，每出现一次，返回一级<br />\n<strong>params</strong>：如果path 对象包含params 数组，说明该路径包含path info 参宿，会从query 参数生成path info 字符串<br />\n<strong>数组对象</strong>：如果是数组对象，4个元素[query,pass query,state,pass state]分别是设置query 键值对，是否将query 键值对传递，state 键值对，和是否将state 键值对传递</li>\n</ul>","types":["string","array"],"typesDescription":"...<code>string</code>|<code>array</code>","optional":true,"nullable":false,"nonNullable":false,"variable":true}],"description":{"full":"<p>跳转到指定路由</p>","summary":"<p>跳转到指定路由</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":129,"codeStart":138,"code":"push(...args){\n  if(!this.routerStatus||!this.routerStatus.router) return;\n  let [newloc, extern, absolute] = this._getUrl(...args);\n\n  if(extern&&this.app.browser){\n    this.app.browser.push(newloc);\n  }else{\n    this.routerStatus.router.push(newloc);\n  }\n}","ctx":{"type":"method","constructor":"Navigator","cons":"Navigator","name":"push","string":"Navigator.prototype.push()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>替换到到指定路由<br />\n参数同push</p>","summary":"<p>替换到到指定路由<br />\n参数同push</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":149,"codeStart":154,"code":"replace(...args){\n  if(!this.routerStatus||!this.routerStatus.router) return;\n  let [newloc, extern, absolute] = this._getUrl(...args);\n\n  if(extern&&this.app.browser){\n    this.app.browser.replace(newloc);\n  }else{\n    this.routerStatus.router.replace(newloc);\n  }\n}","ctx":{"type":"method","constructor":"Navigator","cons":"Navigator","name":"replace","string":"Navigator.prototype.replace()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{number} [step=1] - 返回的页面数","name":"[step=1]","description":"<ul>\n<li>返回的页面数</li>\n</ul>","types":["number"],"typesDescription":"<code>number</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>返回之前页面</p>","summary":"<p>返回之前页面</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":165,"codeStart":170,"code":"back(step=1){\n  if(!this.routerStatus||!this.routerStatus.router) return;\n  this.routerStatus.router.go(-step);\n}","ctx":{"type":"method","constructor":"Navigator","cons":"Navigator","name":"back","string":"Navigator.prototype.back()"}},{"tags":[{"type":"method","string":"goXxx","html":"<p>goXxx</p>"}],"description":{"full":"<p>app.config.paths 中的首字母大写的路径，比如Xxx 会直接建立goXxx 函数，调用会导航到对应路径</p>","summary":"<p>app.config.paths 中的首字母大写的路径，比如Xxx 会直接建立goXxx 函数，调用会导航到对应路径</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":175,"codeStart":180},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>获取导航后的完整url，但不会触发导航<br />\n参数同push</p>","summary":"<p>获取导航后的完整url，但不会触发导航<br />\n参数同push</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":181,"codeStart":186,"code":"getUrl(...args){\n  let [newloc, extern, absolute] = this._getUrl(...args);\n\n  if(extern){\n    return newloc.pathname;\n  }else{\n    if(!this.routerStatus||!this.routerStatus.router) return '';\n    let ret = new Url(window.location.href);\n    ret.set('hash', this.routerStatus.router.createHref(newloc));\n    return ret.toString();\n  }\n}","ctx":{"type":"method","constructor":"Navigator","cons":"Navigator","name":"getUrl","string":"Navigator.prototype.getUrl()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>关闭 app</p>","summary":"<p>关闭 app</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":199,"codeStart":203,"code":"exit(){\n  window.close();\n}\n\n// event\n// --------------------\n_onRouterStatusChange(routerStatus){\n  if(!routerStatus)return;\n\n  if(routerStatus.location.pathname===(typeof(this.app.config.paths.Login)==='string'?this.app.config.paths.Login:this.app.config.paths.Login.path)){\n    if(this.recallLocation&&this.routerStatus&&this.routerStatus.location.pathname!==routerStatus.location.pathname)this.recallLocation.isReplace = routerStatus.location.action==='REPLACE';\n  }else{\n    this.recallLocation = routerStatus.location;\n  }\n  this.routerStatus = routerStatus;\n}\n}","ctx":{"type":"method","constructor":"Navigator","cons":"Navigator","name":"exit","string":"Navigator.prototype.exit()"}},{"tags":[{"type":"class","string":"navigatorPlugin","html":"<p>navigatorPlugin</p>"},{"type":"property","string":"{class} app.Navigator - Navigator 类","name":"app.Navigator","description":"<ul>\n<li>Navigator 类</li>\n</ul>","types":["class"],"typesDescription":"<a href=\"class.html\">class</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"property","string":"{Navigator} app.navigator - Navigator 类实例","name":"app.navigator","description":"<ul>\n<li>Navigator 类实例</li>\n</ul>","types":["Navigator"],"typesDescription":"<a href=\"Navigator.html\">Navigator</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p><strong>plugin</strong> name: navigator dependence: browser<br />\n提供应用内无刷新导航功能</p>","summary":"<p><strong>plugin</strong> name: navigator dependence: browser<br />\n提供应用内无刷新导航功能</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":222,"codeStart":229,"code":"export default {\n  name: 'navigator',\n  depentence: 'browser',\n\n  init(app) {\n    app.Navigator = Navigator;\n    app.navigator = new Navigator(app);\n  },\n\n  onImportRoutesAfter(app) {\n    for(let key of Object.keys(app.config.paths)){\n      if(key&&key[0].match(/^[A-Z]$/)){\n        app.Navigator.prototype[`go${key}`] = function(replace){\n          let path = app.config.paths[key];\n          replace?this.replace(path):this.push(path); \n        }\n      }\n    }\n  },\n\n  onNavigated(app, location) {\n    app.navigator._onRouterStatusChange(location);\n  },\n\n  onNavigatePrevent(app, location) {\n    app.navigator._onRouterStatusChange(location);\n  }\n}","ctx":false}]
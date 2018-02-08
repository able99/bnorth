[{"tags":[{"type":"copyright","string":"(c) 2016 able99","html":"<p>(c) 2016 able99</p>"},{"type":"author","string":"able99 (8846755@qq.com)","html":"<p>able99 (8846755@qq.com)</p>"},{"type":"license","string":"MIT","html":"<p>MIT</p>"}],"description":{"full":"<p>bnorth solution</p>","summary":"<p>bnorth solution</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":1,"codeStart":9,"code":"import { ActionState } from '../app/container';\nimport getOptions from '../utils/getOptions';\n\n\n// action state \n// -----------------------------","ctx":false},{"tags":[{"type":"class","string":"ActionStateRequestOptions","html":"<p>ActionStateRequestOptions</p>"},{"type":"property","string":"{object|array} [defaultData={}] - 默认数据 ","name":"[defaultData={}]","description":"<ul>\n<li>默认数据</li>\n</ul>","types":["object","array"],"typesDescription":"<code>object</code>|<code>array</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"property","string":"{object|array} [initData={}] - 初始化数据 ","name":"[initData={}]","description":"<ul>\n<li>初始化数据</li>\n</ul>","types":["object","array"],"typesDescription":"<code>object</code>|<code>array</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"property","string":"{boolean} [trackState=falae] - 是否显示","name":"[trackState=falae]","description":"<ul>\n<li>是否显示</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"property","string":"{boolean} [updateOnStart=falae] - 是否在container 启动时更新数据","name":"[updateOnStart=falae]","description":"<ul>\n<li>是否在container 启动时更新数据</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"property","string":"{boolean} [updateOnResume=falae] - 是否在container 获取焦点时更新数据","name":"[updateOnResume=falae]","description":"<ul>\n<li>是否在container 获取焦点时更新数据</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"property","string":"{boolean} [clearOnStop=true] - 是否在container 停止时，清除数据管理器","name":"[clearOnStop=true]","description":"<ul>\n<li>是否在container 停止时，清除数据管理器</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>网络请求管理器的构造参数</p>","summary":"<p>网络请求管理器的构造参数</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":15,"codeStart":25},{"tags":[{"type":"callback","string":"onWillUpdate","html":"<p>onWillUpdate</p>"},{"type":"param","string":"{ActionStateRequestOptions} options - 本次请求的配置信息","name":"options","description":"<ul>\n<li>本次请求的配置信息</li>\n</ul>","types":["ActionStateRequestOptions"],"typesDescription":"<a href=\"ActionStateRequestOptions.html\">ActionStateRequestOptions</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回false 终止本次请求","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回false 终止本次请求</li>\n</ul>"}],"description":{"full":"<p>当获取请求数据时触发</p>","summary":"<p>当获取请求数据时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":25,"codeStart":31},{"tags":[{"type":"callback","string":"onWillChange","html":"<p>onWillChange</p>"},{"type":"param","string":"{object|array} result - 请求结果","name":"result","description":"<ul>\n<li>请求结果</li>\n</ul>","types":["object","array"],"typesDescription":"<code>object</code>|<code>array</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{object|array} - 如果返回则替换为返回的数据","types":["object","array"],"typesDescription":"<code>object</code>|<code>array</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>如果返回则替换为返回的数据</li>\n</ul>"}],"description":{"full":"<p>数据将要改变时触发</p>","summary":"<p>数据将要改变时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":31,"codeStart":37},{"tags":[{"type":"callback","string":"onDidChange","html":"<p>onDidChange</p>"},{"type":"param","string":"{object|array} result - 请求结果","name":"result","description":"<ul>\n<li>请求结果</li>\n</ul>","types":["object","array"],"typesDescription":"<code>object</code>|<code>array</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>数据修改后触发</p>","summary":"<p>数据修改后触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":37,"codeStart":42},{"tags":[{"type":"callback","string":"onChangeError","html":"<p>onChangeError</p>"},{"type":"param","string":"{Error|string} error - 错误信息","name":"error","description":"<ul>\n<li>错误信息</li>\n</ul>","types":["Error","string"],"typesDescription":"<code>Error</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object|array} result - 请求结果","name":"result","description":"<ul>\n<li>请求结果</li>\n</ul>","types":["object","array"],"typesDescription":"<code>object</code>|<code>array</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":42,"codeStart":47},{"tags":[{"type":"class","string":"","html":""}],"description":{"full":"<p>提供网络请求与网络请求数据的管理</p>","summary":"<p>提供网络请求与网络请求数据的管理</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":48,"codeStart":52,"code":"class ActionStateRequest extends ActionState {\n  static stateName = 'request';","ctx":{"type":"class","constructor":"ActionStateRequest","cons":"ActionStateRequest","name":"ActionStateRequest","extends":"ActionState","string":"new ActionStateRequest()"}},{"tags":[{"type":"param","string":"{App} app - App 单实例","name":"app","description":"<ul>\n<li>App 单实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{string} uuid - 唯一id","name":"uuid","description":"<ul>\n<li>唯一id</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{ActionStateRequestOptions} options - 请求参数","name":"options","description":"<ul>\n<li>请求参数</li>\n</ul>","types":["ActionStateRequestOptions"],"typesDescription":"<a href=\"ActionStateRequestOptions.html\">ActionStateRequestOptions</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":55,"codeStart":61,"code":"constructor(app, uuid, options){\n  super(app, uuid);","ctx":{"type":"constructor","constructor":"ActionStateRequest","cons":"ActionStateRequest","name":"constructor","string":"ActionStateRequest.prototype.constructor()"}},{"tags":[{"type":"property","string":"{ActionStateRequestOptions} options - 请求的参数","name":"options","description":"<ul>\n<li>请求的参数</li>\n</ul>","types":["ActionStateRequestOptions"],"typesDescription":"<a href=\"ActionStateRequestOptions.html\">ActionStateRequestOptions</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":64,"codeStart":67,"code":"this.options = options;\nthis.options.defaultData = this.options.defaultData||{};\nthis.options.initData = this.options.initData || this.options.defaultData;\nthis.options.trackState = Boolean(this.options.trackState);\nthis.options.noticeChangeError = this.options.noticeChangeError !== false;\n  }\n\n  // interface\n  // -------------------------","ctx":{"type":"property","receiver":"this","name":"options","value":"options","string":"this.options"}},{"tags":[{"type":"property","string":"{*} data - 返回请求的数据","name":"data","description":"<ul>\n<li>返回请求的数据</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"readonly","string":"","html":""}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":76,"codeStart":80,"code":"get data() {\n  let state = this.app.getState('request',{});\n  return (state.fetchResult && state.fetchResult[this.uuid] && state.fetchResult[this.uuid].result)||this.options.initData;\n}","ctx":{"type":"property","name":"data","string":"data"}},{"tags":[{"type":"property","string":"{*} state - return data for container state data","name":"state","description":"<ul>\n<li>return data for container state data</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"readonly","string":"","html":""},{"type":"override","string":"","html":""}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":85,"codeStart":90,"code":"get state() { \n  return this.data;\n}","ctx":{"type":"property","name":"state","string":"state"}},{"tags":[{"type":"property","string":"{object} state - return data for container state object","name":"state","description":"<ul>\n<li>return data for container state object</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"readonly","string":"","html":""},{"type":"override","string":"","html":""}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":94,"codeStart":99,"code":"get states() { \n  return !this.options.trackState?null:{\n    state: this._getState(),\n  };\n}","ctx":{"type":"property","name":"states","string":"states"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{ActionStateRequestOptions} [options] - 本次请求的参数，为空使用创建时的参数","name":"[options]","description":"<ul>\n<li>本次请求的参数，为空使用创建时的参数</li>\n</ul>","types":["ActionStateRequestOptions"],"typesDescription":"<a href=\"ActionStateRequestOptions.html\">ActionStateRequestOptions</a>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{boolean} [append=false] - 是否是追加数据还是替换之前数据","name":"[append=false]","description":"<ul>\n<li>是否是追加数据还是替换之前数据</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":105,"codeStart":110,"code":"update(aoptions={},append=null){\n  let options = Object.assign( {},\n    getOptions(this.options),\n    getOptions(aoptions),\n    (append===true||append===false)?{append}:{},\n  )\n  if(this.options.onWillUpdate && this.options.onWillUpdate(options)===false) return;\n  this.app.actions.requestFetch(this, options);\n}","ctx":{"type":"method","name":"update","string":"update()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{*} data - 数据","name":"data","description":"<ul>\n<li>数据</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{boolean} [append=false] - 是否是追加数据还是替换之前数据","name":"[append=false]","description":"<ul>\n<li>是否是追加数据还是替换之前数据</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>用户设置数据，模拟请求返回的数据</p>","summary":"<p>用户设置数据，模拟请求返回的数据</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":120,"codeStart":126,"code":"set(data, append) {\n  app.actions.requestFetchSuccess(this.uuid,data||{},this.options.initData,append!==undefined?append:this.options.append,this.options.appendField);\n}","ctx":{"type":"method","name":"set","string":"set()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>清除网络数据管理器</p>","summary":"<p>清除网络数据管理器</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":130,"codeStart":134,"code":"clear(){\n  this.app.actions._requestFetchClear(this.uuid);\n  delete ActionStateRequest.maps[this.uuid];\n}\n\n// state","ctx":{"type":"method","name":"clear","string":"clear()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>return network state data</p>","summary":"<p>return network state data</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":140,"codeStart":144,"code":"_getState() {\n  let state = this.app.getState('request',{});\n  return (state.fetchResult && state.fetchResult[this.uuid])||{};\n}","ctx":{"type":"method","name":"_getState","string":"_getState()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"return","string":"{boolean} - 是否成功完成","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>是否成功完成</li>\n</ul>"}],"description":{"full":"<p>返回请求是否成功完成</p>","summary":"<p>返回请求是否成功完成</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":149,"codeStart":154,"code":"getReady(){\n  let state = this._getState();\n  return state.fetching === false && !state.invalid;\n}","ctx":{"type":"method","name":"getReady","string":"getReady()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"return","string":"{Error|string} - 错误信息或者null","types":["Error","string"],"typesDescription":"<code>Error</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>错误信息或者null</li>\n</ul>"}],"description":{"full":"<p>返回请求的错误信息</p>","summary":"<p>返回请求的错误信息</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":159,"codeStart":164,"code":"getError(){\n  let state = this._getState();\n  return state.error;\n}\n\n// event\n//----------------------------------","ctx":{"type":"method","name":"getError","string":"getError()"}},{"tags":[{"type":"callback","string":"","html":""}],"description":{"full":"<p>triiger on container start</p>","summary":"<p>triiger on container start</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":171,"codeStart":175,"code":"onStart() { //bnorth use\n  if(!this.options.updateOnStart) return;\n  this.update();\n}","ctx":{"type":"method","name":"onStart","string":"onStart()"}},{"tags":[{"type":"callback","string":"","html":""}],"description":{"full":"<p>triiger on container start</p>","summary":"<p>triiger on container start</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":180,"codeStart":184,"code":"onResume() { //bnorth use\n  if(!this.options.updateOnResume) return;\n  this.update();\n}","ctx":{"type":"method","name":"onResume","string":"onResume()"}},{"tags":[{"type":"callback","string":"","html":""}],"description":{"full":"<p>triiger on container start</p>","summary":"<p>triiger on container start</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":189,"codeStart":193,"code":"onStop() { //bnorth use\n  if(this.options.clearOnStop===false) return;\n  this.clear();\n}","ctx":{"type":"method","name":"onStop","string":"onStop()"}},{"tags":[{"type":"callback","string":"","html":""}],"description":{"full":"<p>triiger on container start</p>","summary":"<p>triiger on container start</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":198,"codeStart":202,"code":"onFetching(show=true, blocking=false) {\n  if(blocking){\n    this.app.actions.noticeBlocking(show);\n  }else{\n    this.app.actions.noticeLoading(show);\n  }\n}","ctx":{"type":"method","name":"onFetching","string":"onFetching()"}},{"tags":[{"type":"callback","string":"","html":""},{"type":"param","string":"{*} result - network data","name":"result","description":"<ul>\n<li>network data</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{*} - return changed data overrided","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>return changed data overrided</li>\n</ul>"}],"description":{"full":"<p>triiger on container start</p>","summary":"<p>triiger on container start</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":210,"codeStart":216,"code":"onWillChange(result) { \n  return this.options.onWillChange&&this.options.onWillChange(result);\n}","ctx":{"type":"method","name":"onWillChange","string":"onWillChange()"}},{"tags":[{"type":"callback","string":"","html":""},{"type":"param","string":"{*} result - network data","name":"result","description":"<ul>\n<li>network data</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>triiger on container start</p>","summary":"<p>triiger on container start</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":220,"codeStart":225,"code":"onDidChange(result) { \n  return this.options.onDidChange&&this.options.onDidChange(result);\n}","ctx":{"type":"method","name":"onDidChange","string":"onDidChange()"}},{"tags":[{"type":"callback","string":"","html":""},{"type":"param","string":"{Error|string} error - error info","name":"error","description":"<ul>\n<li>error info</li>\n</ul>","types":["Error","string"],"typesDescription":"<code>Error</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{*} result - network data","name":"result","description":"<ul>\n<li>network data</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>triiger on network error</p>","summary":"<p>triiger on network error</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":229,"codeStart":235,"code":"onChangeError(error, result){\n  this.app.error(error);\n  if(this.options.onChangeError&&this.options.onChangeError(error, result));\n  this.app.actions.noticeMessage(error, {cTheme: 'alert'});\n}\n}\n\n\n// plugin\n// ------------------------------------------------------","ctx":{"type":"method","name":"onChangeError","string":"onChangeError()"}},{"tags":[{"type":"class","string":"","html":""},{"type":"example","string":"**使用**\n// containerCreator 创建\ncontainer.states.order = app.actionStates.request({resource: 'order', data:{id: 1}});\n// containerCreator 使用\ncontainer.states.order.update()\n// page - 请求数据\nthis.props.state_order\n// page - 请求状态数据\nthis.props.state_order_state","html":"<p><strong>使用</strong><br />\n// containerCreator 创建<br />\ncontainer.states.order = app.actionStates.request({resource: 'order', data:{id: 1}});<br />\n// containerCreator 使用<br />\ncontainer.states.order.update()<br />\n// page - 请求数据<br />\nthis.props.state_order<br />\n// page - 请求状态数据<br />\nthis.props.state_order_state</p>"}],"description":{"full":"<p><strong>plugin</strong> name: request dependence: network<br />\n提供网络请求与网络请求数据的管理</p>","summary":"<p><strong>plugin</strong> name: request dependence: network<br />\n提供网络请求与网络请求数据的管理</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":245,"codeStart":261,"code":"const RequestFetchFetching = 'RequestFetchFetching';\nconst RequestFetchInvalid = 'RequestFetchInvalid';\nconst RequestFetchFetchSuccess = 'RequestFetchFetchSuccess';\nconst RequestFetchFetchFail = 'RequestFetchFetchFail';","ctx":{"type":"declaration","name":"RequestFetchFetching","value":"'RequestFetchFetching'","string":"RequestFetchFetching"}},{"tags":[{"type":"method","string":"app.actions.requestFetch","html":"<p>app.actions.requestFetch</p>"},{"type":"param","string":"{*} request ","name":"request","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} request</p>"},{"type":"param","string":"{*} options","name":"options","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} options</p>"}],"description":{"full":"<p>发起获取型请求</p>","summary":"<p>发起获取型请求</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":265,"codeStart":271,"code":"let requestFetch = (request, options)=>app=>{\n  app.actions.requestFetching(request.uuid);\n  request.trigger('onFetching', true, options.blocking);\n\n  app.network.fetch(options).then(\n    (result)=>{\n      request.trigger('onFetching', false, options.blocking);\n      let ret = request.trigger('onWillChange', result); \n      if(ret)result = ret;\n      if(ret===false) return;\n      app.actions.requestFetchSuccess(request.uuid,result,options.initData,options.append,options.appendField);\n      request.trigger('onDidChange', result);\n    },\n    (error)=>{\n      request.trigger('onFetching', false, options.blocking);\n      app.actions.requestFetchFail(request.uuid,error);\n      request.trigger('onChangeError', error);\n    }\n  ).catch((error)=>{\n    request.trigger('onFetching', false, options.blocking);\n    app.errorNotice(error);\n  });    \n}\nlet requestFetching = (uuid)=>{\n  return {\n    type: RequestFetchFetching,\n    uuid,\n  };\n}\nlet requestFetchInvalid = (uuid)=>{\n  return {\n    type: RequestFetchInvalid,\n    uuid,\n  };\n}\nlet requestFetchSuccess = (uuid,result,initData,append,appendField)=>{\n  return {\n    type: RequestFetchFetchSuccess,\n    uuid,\n    result,\n    initData,\n    append,\n    appendField,\n  };\n}\nlet requestFetchFail = (uuid,error)=>{\n  return {\n    type: RequestFetchFetchFail,\n    uuid,\n    error,\n  };\n}\nlet _requestFetchClear = (uuid)=>(app)=>{\n  let state = app.getState('request',{});\n  delete state.fetchResult[uuid];\n}","ctx":{"type":"declaration","name":"requestFetch","value":"(request, options)=>app=>{","string":"requestFetch"}},{"tags":[{"type":"method","string":"app.actions.requestSubmit","html":"<p>app.actions.requestSubmit</p>"},{"type":"param","string":"{*} options","name":"options","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} options</p>"}],"description":{"full":"<p>发起提交型请求</p>","summary":"<p>发起提交型请求</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":328,"codeStart":333,"code":"let requestSubmit = (options)=>(app)=>{\n  if(options.blocking!==false)app.actions.noticeBlocking();\n  \n  app.network.operate(options).then(\n    (result)=>{\n      if(options.blocking!==false)app.actions.noticeBlocking(false);\n      if(typeof(options.success)===\"function\"){options.success(result)};\n    },\n    (error)=>{\n      app.error(error);\n      if(options.blocking!==false)app.actions.noticeBlocking(false);\n      if(typeof(options.error)===\"function\"){error = options.error(error)||error};\n      if(error&&options.notice!==false)app.actions.noticeMessage(error, {cTheme: 'alert'});\n    }\n  ).catch((error)=>{\n    app.error(error);\n    if(options.blocking!==false)app.actions.noticeBlocking(false);\n    if(options.notice!==false)app.actions.noticeMessage(error, {cTheme: 'alert'});\n  });  \n}","ctx":{"type":"declaration","name":"requestSubmit","value":"(options)=>(app)=>{","string":"requestSubmit"}},{"tags":[{"type":"function","string":"reduxerRequestFetch","html":"<p>reduxerRequestFetch</p>"}],"description":{"full":"<p>reduxer for request</p>","summary":"<p>reduxer for request</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":354,"codeStart":358,"code":"function reduxerRequestFetch( state = {uuid: null, resource: null, fetchResult:{}}, action ) {\n  switch (action.type) {\n  case RequestFetchFetching:\n    return Object.assign({}, state, {\n      uuid: action.uuid,\n      fetchResult: Object.assign({}, state.fetchResult, {\n        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {\n          fetching: true,\n        }),\n      }),\n    });\n  case RequestFetchInvalid:\n    return Object.assign({}, state, {\n      uuid: action.uuid,\n      fetchResult: Object.assign({}, state.fetchResult, {\n        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {\n          invalid: true,\n        }),\n      }),\n    });\n  case RequestFetchFetchSuccess:\n    let data = (state.fetchResult[action.uuid]&&state.fetchResult[action.uuid].result)||action.initData;\n    if(action.append&&action.appendField&&data){\n      if(Array.isArray(data)){\n        data = Array.concat(data,action.result);\n      }else{\n        let fileds = Array.isArray(action.appendField)?action.appendField:(typeof(action.appendField)==='string'?[action.appendField]:['data']);\n        for(let field of fileds){\n          action.result[field] = Array.concat(data[field]||[],action.result[field]||[]);\n        }\n        data = Object.assign({},data,action.result);\n      }\n    }else{\n      data = action.result;\n    }\n\n    return Object.assign({}, state, {\n      uuid: action.uuid,\n      fetchResult: Object.assign({}, state.fetchResult, {\n        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {\n          invalid: false,\n          fetching: false,\n          result: data,\n        }),\n      }),\n    });\n  case RequestFetchFetchFail:\n    return Object.assign({}, state, {\n      uuid: action.uuid,\n      fetchResult: Object.assign({}, state.fetchResult, {\n        [action.uuid]:Object.assign({}, state.fetchResult[action.uuid], {\n          fetching: false,\n          error: action.error,\n        }),\n      }),\n    });\n\n  default:\n    return state;\n  }\n}\n\nexport default {\n  name: 'request',\n  dependence: 'network',\n\n  init(app) {\n    app.actionStates.request = function(options={},uuid=null){\n      return ActionState.instance(ActionStateRequest, app, uuid, options);\n    }\n  },\n  onCreateStoreBefore(app) {\n    Object.assign(app.actions,{\n      requestFetch,\n      requestFetching,\n      requestFetchSuccess,\n      requestFetchFail,\n      requestFetchInvalid,\n      _requestFetchClear,\n      requestSubmit\n    });\n\n    app.reduxers.request = reduxerRequestFetch;\n  },\n}","ctx":{"type":"function","name":"reduxerRequestFetch","string":"reduxerRequestFetch()"}}]
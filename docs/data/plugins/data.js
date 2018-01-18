[{"tags":[{"type":"copyright","string":"(c) 2016 able99","html":"<p>(c) 2016 able99</p>"},{"type":"author","string":"able99 (8846755@qq.com)","html":"<p>able99 (8846755@qq.com)</p>"},{"type":"license","string":"MIT","html":"<p>MIT</p>"}],"description":{"full":"<p>bnorth solution</p>","summary":"<p>bnorth solution</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":1,"codeStart":9,"code":"import jspath from '../utils/jspath'\nimport getUuid from '../utils/uuid';\nimport getOptions from '../utils/getOptions';\nimport { checkObject, checkObjectItem } from '../utils/validator';\n\n\n// actions\n//==================\nconst DataInit = 'DataInit';\nfunction _dataInit(uuid,data){\n  return {\n    type: DataInit,\n    uuid,\n    data,\n  };\n}\nconst DataUpdate = 'DataUpdate';\nfunction _dataUpdate(uuid,data,merge,initData){\n  return {\n    type: DataUpdate,\n    uuid,\n    data,\n    merge,\n    initData,\n  };\n}\nlet _dataClear = (uuid)=>(app)=>{\n  let state = app.getState('data',{});\n  delete state.datas[uuid];\n}\n\n// action state class\n//==================","ctx":false},{"tags":[{"type":"class","string":"","html":""},{"type":"example","string":"**使用**\n// container\ncontainer.states.data = app.actionStates.data({});\n// page - 使用数据\nthis.props.state_data\n// page - 修改数据\nthis.props.states.data.setValue('x',xxx);","html":"<p><strong>使用</strong><br />\n// container<br />\ncontainer.states.data = app.actionStates.data({});<br />\n// page - 使用数据<br />\nthis.props.state_data<br />\n// page - 修改数据<br />\nthis.props.states.data.setValue('x',xxx);</p>"}],"description":{"full":"<p>为app 扩展state 类型，提供页面数据的管理与校验<br />\n<strong>插件</strong> 该类为插件类扩展了App 的能力<br />\napp.actionStates.data: states 的工厂函数</p>","summary":"<p>为app 扩展state 类型，提供页面数据的管理与校验<br />\n<strong>插件</strong> 该类为插件类扩展了App 的能力<br />\napp.actionStates.data: states 的工厂函数</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":42,"codeStart":56,"code":"class ActionStateData{\n  static maps = {};","ctx":{"type":"class","constructor":"ActionStateData","cons":"ActionStateData","name":"ActionStateData","extends":"","string":"new ActionStateData()"}},{"tags":[{"type":"constructor","string":"","html":""},{"type":"param","string":"{object} [options] - 参数对象<br />\n**defaultData**\n**initData**\n**rules**\n**checkErrorMessage**\n**checkOnInputKeys** \n**noticeChangeError**\n**updateOnStart** \n**updateOnResume** \n**clearOnStop**\n**onWillChange**\n**onDidChange**","name":"[options]","description":"<ul>\n<li>参数对象<br /> <strong>defaultData</strong><br />\n<strong>initData</strong><br />\n<strong>rules</strong><br />\n<strong>checkErrorMessage</strong><br />\n<strong>checkOnInputKeys</strong><br />\n<strong>noticeChangeError</strong><br />\n<strong>updateOnStart</strong><br />\n<strong>updateOnResume</strong><br />\n<strong>clearOnStop</strong><br />\n<strong>onWillChange</strong><br />\n<strong>onDidChange</strong></li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{string} uuid","name":"uuid","description":"","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{string} uuid</p>"}],"description":{"full":"<p>构造数据管理state<br />\n<code>工厂函数</code> 该构造函数为工厂模式<br />\n使用工厂函数构造state</p>\n<pre><code class=\"lang-js\">container.states.data = app.actionStates.data({});\n</code></pre>","summary":"<p>构造数据管理state<br />\n<code>工厂函数</code> 该构造函数为工厂模式<br />\n使用工厂函数构造state</p>\n<pre><code class=\"lang-js\">container.states.data = app.actionStates.data({});\n</code></pre>","body":""},"isPrivate":false,"isConstructor":true,"isClass":false,"isEvent":false,"ignore":false,"line":59,"codeStart":81,"code":"constructor(app, uuid, options){\n  this.app = app;\n  this.uuid = uuid;\n  this.options = options;\n  this.options.defaultData = this.options.defaultData||{};\n  this.options.initData = this.options.initData || this.options.defaultData;\n\n  ActionStateData.maps[uuid] = this;\n}\n\n// interface\n// -------------------------","ctx":{"type":"constructor","constructor":"ActionStateData","cons":"ActionStateData","name":"constructor","string":"ActionStateData.prototype.constructor()"}},{"tags":[{"type":"property","string":"[*] data 管理的数据","name":"[*]","description":"<p>data 管理的数据</p>","types":[],"typesDescription":"","variable":false,"nonNullable":false,"nullable":false,"optional":false},{"type":"readonly","string":"","html":""}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":93,"codeStart":97,"code":"get data() {\n  let state = this.app.getState('data',{});\n  return (state.datas && state.datas[this.uuid]) || this.options.initData;\n}\n\nget state() { //bnorth use\n  return this.data;\n}\nget states() { //bnorth use\n  return null;\n}","ctx":{"type":"property","constructor":"ActionStateData","cons":"ActionStateData","name":"data","string":"ActionStateData.prototype.data"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{*} [data] - 如果设置该参数，则初始化为该数据，否则初始化为起始数据 ","name":"[data]","description":"<ul>\n<li>如果设置该参数，则初始化为该数据，否则初始化为起始数据</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{boolean} [merge=false] - 是否合并之前数据，默认不合并","name":"[merge=false]","description":"<ul>\n<li>是否合并之前数据，默认不合并</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>初始化所管理的数据</p>","summary":"<p>初始化所管理的数据</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":109,"codeStart":115,"code":"init(data, merge=false) {\n  try{\n    let originData = this.data;\n    data = data||this.options.defaultData;\n    let changeData = merge?Object.assign({},this.options.initData,data):data;\n\n    changeData = this.onWillChange(changeData,originData)||changeData||this.options.defaultData;\n    this.app.actions._dataInit(this.uuid, changeData);\n    this.onDidChange(changeData,originData);\n  }catch(e){\n    this.app.errorNotice(e);\n  }\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"init","string":"ActionStateData.prototype.init()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{*} data - 数据","name":"data","description":"<ul>\n<li>数据</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{string[]} [key] - 需要校验的字段名 ","name":"[key]","description":"<ul>\n<li>需要校验的字段名</li>\n</ul>","types":["Array.<string>"],"typesDescription":"<code>Array</code>.&lt;<code>string</code>&gt;","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{boolean} [merge=true] 是否合并之前的数据","name":"[merge=true]","description":"<p>是否合并之前的数据</p>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>修改管理的数据</p>","summary":"<p>修改管理的数据</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":129,"codeStart":136,"code":"update(data, key=null, merge=true) {\n  try{\n    let originData = this.data;\n    let changeData = data||this.options.defaultData;\n\n    changeData = this.onWillChange(changeData,originData,key)||changeData||this.options.defaultData;\n    let invalidate = key&&this.checkChangeItem(key, changeData);\n    this.app.actions._dataUpdate(this.uuid, invalidate?originData:changeData, merge, this.options.initData);\n    if(!invalidate)this.onDidChange(changeData,originData,key);\n    return true;\n  }catch(e){\n    this.app.errorNotice(e);\n    return false;\n  }\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"update","string":"ActionStateData.prototype.update()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{string} key - 键名或jspath 字符串","name":"key","description":"<ul>\n<li>键名或jspath 字符串</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>使用jspath 格式获取数据中的内容</p>","summary":"<p>使用jspath 格式获取数据中的内容</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":152,"codeStart":157,"code":"getValue(key) {\n  return jspath.getValue(this.data, key);\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"getValue","string":"ActionStateData.prototype.getValue()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{string} key - 键名或jspath 字符串","name":"key","description":"<ul>\n<li>键名或jspath 字符串</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{*} value - 数据","name":"value","description":"<ul>\n<li>数据</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>使用jspath 格式设置数据中的内容</p>","summary":"<p>使用jspath 格式设置数据中的内容</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":161,"codeStart":167,"code":"setValue(key, value) {\n  if(!key) return false;\n  let originData = this.data;\n  let changeData = jspath.setValue(Object.assign({}, originData), key, value);\n\n  return this.update(changeData, key);\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"setValue","string":"ActionStateData.prototype.setValue()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{boolean} onlyData - 仅仅清除数据","name":"onlyData","description":"<ul>\n<li>仅仅清除数据</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>清除数据和当前对象</p>","summary":"<p>清除数据和当前对象</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":175,"codeStart":180,"code":"clear(onlyData){\n  this.app.actions._dataClear(this.uuid);\n  delete ActionStateData.maps[this.uuid];\n}\n\n// validate\n// ----------------------","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"clear","string":"ActionStateData.prototype.clear()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{string|string[]} [keys] - 要检查的字段名列表，默认检查全部字段","name":"[keys]","description":"<ul>\n<li>要检查的字段名列表，默认检查全部字段</li>\n</ul>","types":["string","Array.<string>"],"typesDescription":"<code>string</code>|<code>Array</code>.&lt;<code>string</code>&gt;","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"returns","string":"{boolean} - true: 校验出问题","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>true: 校验出问题</li>\n</ul>"}],"description":{"full":"<p>根据设置的规则进行校验</p>","summary":"<p>根据设置的规则进行校验</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":188,"codeStart":194,"code":"validate(keys){\n  if(!this.options.rules) return false;\n\n  let rules={};\n  if(Array.isArray(keys)){\n    keys.forEach((v)=>{\n      rules[v] = this.options.rules[v];\n    });\n  }else if(typeof(keys)==='string') {\n    rules[keys] = this.options.rules[keys];\n  }else{\n    rules = this.options.rules;\n  }\n\n  return checkObject(this.data, rules, {checkErrorMessage: this.options.checkErrorMessage});\n}\n\ncheckChangeItem(key, data) {\n  if(!key||!this.options.rules||!this.options.checkOnInputKeys||this.options.checkOnInputKeys.indexOf(key)<0) return false;\n  let ret = checkObjectItem(data, key, this.options.rules[key], {checkErrorMessage:this.options.checkErrorMessage});\n\n  if(ret){\n    if(this.options.noticeChangeError) this.onChangeError(ret, key);\n    return ret;\n  }else{\n    return null;\n  }\n}\n\n// event\n//----------------------------------","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"validate","string":"ActionStateData.prototype.validate()"}},{"tags":[{"type":"callback","string":"","html":""}],"description":{"full":"<p>页面启动时触发</p>","summary":"<p>页面启动时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":225,"codeStart":229,"code":"onStart() { //bnorth use\n  if(!this.options.updateOnStart) return;\n  this.update();\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"onStart","string":"ActionStateData.prototype.onStart()"}},{"tags":[{"type":"callback","string":"","html":""}],"description":{"full":"<p>页面获取焦点时触发</p>","summary":"<p>页面获取焦点时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":234,"codeStart":238,"code":"onResume() { //bnorth use\n  if(!this.options.updateOnResume) return;\n  this.update();\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"onResume","string":"ActionStateData.prototype.onResume()"}},{"tags":[{"type":"callback","string":"","html":""}],"description":{"full":"<p>页面终止时触发</p>","summary":"<p>页面终止时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":243,"codeStart":247,"code":"onStop() { //bnorth use\n  if(this.options.clearOnStop===false) return;\n  this.clear();\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"onStop","string":"ActionStateData.prototype.onStop()"}},{"tags":[{"type":"callback","string":"","html":""},{"type":"param","string":"{*} originData ","name":"originData","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} originData</p>"},{"type":"param","string":"{*} changeData ","name":"changeData","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} changeData</p>"},{"type":"param","string":"{*} key","name":"key","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} key</p>"}],"description":{"full":"<p>数据将要改变时触发</p>","summary":"<p>数据将要改变时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":252,"codeStart":259,"code":"onWillChange(originData, changeData, key) { \n  return this.options.onWillChange&&this.options.onWillChange(originData, changeData, key);\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"onWillChange","string":"ActionStateData.prototype.onWillChange()"}},{"tags":[{"type":"callback","string":"","html":""},{"type":"param","string":"{*} originData ","name":"originData","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} originData</p>"},{"type":"param","string":"{*} changeData ","name":"changeData","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} changeData</p>"},{"type":"param","string":"{*} key","name":"key","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} key</p>"}],"description":{"full":"<p>数据修改后触发</p>","summary":"<p>数据修改后触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":263,"codeStart":270,"code":"onDidChange(originData, changeData, key) { \n  return this.options.onDidChange&&this.options.onDidChange(originData, changeData, key);\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"onDidChange","string":"ActionStateData.prototype.onDidChange()"}},{"tags":[{"type":"callback","string":"","html":""},{"type":"param","string":"{*} message ","name":"message","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} message</p>"},{"type":"param","string":"{*} field","name":"field","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} field</p>"}],"description":{"full":"<p>数据校验错误时触发</p>","summary":"<p>数据校验错误时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":true,"line":274,"codeStart":280,"code":"onChangeError(message, field){\n  if(this.options.noticeChangeError)this.app.errorNotice(message);\n}\n}\n\n\n// reducer\n//==================\nexport function reducerData(\nstate = {\n  uuid: null,\n  datas: {},\n}, \naction\n) {\nswitch (action.type) {\ncase DataInit:\n  return Object.assign({}, state, {\n    uuid: action.uuid,\n    datas: Object.assign({}, state.datas, {\n      [action.uuid]: Array.isArray(action.data)?Array.from(action.data):action.data,\n    }),\n  });\n\ncase DataUpdate:\n  let data = null;\n  if(action.merge){\n    if(Array.isArray(action.data)){\n      data = Array.from(state.datas[action.uuid]||action.initData);\n      data = data.concat(action.data);\n    }else{\n      data = Object.assign({}, state.datas[action.uuid]||action.initData, action.data);\n    }\n  }else{\n    data = action.data;\n  }\n  return Object.assign({}, state, {\n    uuid: action.uuid,\n    datas: Object.assign({}, state.datas, {\n      [action.uuid]:data,\n    }),\n  });\n\ndefault:\n  return state;\n}\n}\n\n\n//==================\n// export\n//==================\nexport default {\ninit(app) {\n  app.actionStates.data = function(options,uuid) {\n    if(typeof(options)==='string') uuid=options;\n    uuid = uuid||getUuid();\n    if(ActionStateData.maps[uuid]) return ActionStateData.maps[uuid];\n    return new ActionStateData(app, uuid, getOptions(options));\n  }\n},\n\nonCreateStoreBefore(app) {\n  Object.assign(app.actions,{\n    _dataInit,\n    _dataUpdate,\n    _dataClear,\n  });\n\n  app.reducers.data = reducerData;\n},\n}","ctx":{"type":"method","constructor":"ActionStateData","cons":"ActionStateData","name":"onChangeError","string":"ActionStateData.prototype.onChangeError()"}}]
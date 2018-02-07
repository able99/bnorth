[{"tags":[{"type":"copyright","string":"(c) 2016 able99","html":"<p>(c) 2016 able99</p>"},{"type":"author","string":"able99 (8846755@qq.com)","html":"<p>able99 (8846755@qq.com)</p>"},{"type":"license","string":"MIT","html":"<p>MIT</p>"}],"description":{"full":"<p>bnorth solution</p>","summary":"<p>bnorth solution</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":1,"codeStart":7},{"tags":[{"type":"class","string":"appPlugin","html":"<p>appPlugin</p>"}],"description":{"full":"<p><strong>plugin</strong> name: app dependence: data<br />\n应用的基本插件，该插件是start 函数时添加的插件，实现了应用运行的基本功能</p>","summary":"<p><strong>plugin</strong> name: app dependence: data<br />\n应用的基本插件，该插件是start 函数时添加的插件，实现了应用运行的基本功能</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":9,"codeStart":15,"code":"// app action\n//-----------------------------------------\nconst ActionAppReady = 'ActionAppReady';","ctx":false},{"tags":[{"type":"method","string":"app.actions.appReady","html":"<p>app.actions.appReady</p>"},{"type":"param","string":"{boolean} ready ","name":"ready","description":"","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{boolean} ready</p>"},{"type":"example","string":"```js\napp.actions.appReady(true)\n```","html":"<pre><code class=\"lang-js\">app.actions.appReady(true)\n</code></pre>"}],"description":{"full":"<p><strong>action</strong><br />\n改变app ready 状态，app ready后，会关闭waiting 动画，显示渲染的内容</p>","summary":"<p><strong>action</strong><br />\n改变app ready 状态，app ready后，会关闭waiting 动画，显示渲染的内容</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":18,"codeStart":28,"code":"let appReady = (ready)=>(app)=>{\n  app.getPage(0).props.states._page.setValue('ready',ready);\n}","ctx":{"type":"declaration","name":"appReady","value":"(ready)=>(app)=>{","string":"appReady"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{element|string} message - 消息框内容","name":"message","description":"<ul>\n<li>消息框内容</li>\n</ul>","types":["element","string"],"typesDescription":"<code>element</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} [props] - 消息显示的ui 属性，具体由处理该事件的插件所决","name":"[props]","description":"<ul>\n<li>消息显示的ui 属性，具体由处理该事件的插件所决</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} [options] - 消息显示的配置属性，具体由处理该事件的插件所决","name":"[options]","description":"<ul>\n<li>消息显示的配置属性，具体由处理该事件的插件所决</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"example","string":"```js\napp.actions.noticeMessage(message);\n```","html":"<pre><code class=\"lang-js\">app.actions.noticeMessage(message);\n</code></pre>"}],"description":{"full":"<p><strong>action</strong><br />\n显示通知内容</p>","summary":"<p><strong>action</strong><br />\n显示通知内容</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":32,"codeStart":44,"code":"let noticeMessage = (...args)=>(app)=>{\n  app.trigger('onNoticeMessage', ...args);\n}","ctx":{"type":"declaration","name":"noticeMessage","value":"(...args)=>(app)=>{","string":"noticeMessage"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{boolean} show - 是否显示，default `true`，调用几次显示，也需要调用几次隐藏","name":"show","description":"<ul>\n<li>是否显示，default <code>true</code>，调用几次显示，也需要调用几次隐藏</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} [props] - 显示的ui 属性，具体由处理该事件的插件所决","name":"[props]","description":"<ul>\n<li>显示的ui 属性，具体由处理该事件的插件所决</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} [options] - 显示的配置属性，具体由处理该事件的插件所决","name":"[options]","description":"<ul>\n<li>显示的配置属性，具体由处理该事件的插件所决</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"example","string":"```js\napp.actions.noticeLoading(true);","html":"<pre><code class=\"lang-js\">app.actions.noticeLoading(true);</code></pre>"}],"description":{"full":"<p><strong>action</strong><br />\n显示页面加载进度</p>","summary":"<p><strong>action</strong><br />\n显示页面加载进度</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":47,"codeStart":58,"code":"let noticeLoading = (...args)=>(app)=>{\n  app.trigger('onNoticeLoading', ...args);\n}","ctx":{"type":"declaration","name":"noticeLoading","value":"(...args)=>(app)=>{","string":"noticeLoading"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{boolean} show 是否显示，default `true`，调用几次显示，也需要调用几次隐藏","name":"show","description":"<p>是否显示，default <code>true</code>，调用几次显示，也需要调用几次隐藏</p>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} [props] - 显示的ui 属性，具体由处理该事件的插件所决","name":"[props]","description":"<ul>\n<li>显示的ui 属性，具体由处理该事件的插件所决</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} [options] - 显示的配置属性，具体由处理该事件的插件所决","name":"[options]","description":"<ul>\n<li>显示的配置属性，具体由处理该事件的插件所决</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"example","string":"```js\napp.actions.noticeBlocking(true);","html":"<pre><code class=\"lang-js\">app.actions.noticeBlocking(true);</code></pre>"}],"description":{"full":"<p><strong>action</strong><br />\n显示阻塞操作的加载页面</p>","summary":"<p><strong>action</strong><br />\n显示阻塞操作的加载页面</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":62,"codeStart":73,"code":"let noticeBlocking = (...args)=>(app)=>{\n  app.trigger('onNoticeBlocking', ...args);\n}\n\nexport default {\n  name: 'app',\n  dependences: ['data'],\n\n  onCreateStoreBefore(app) {\n    Object.assign(app.actions,{\n      appReady,\n      noticeMessage,\n      noticeLoading,\n      noticeBlocking,\n    });\n  },\n\n  onCreateStore(app) {\n    app._createStore();\n  },\n\n  onRender(app) {\n    app._render();\n  },\n\n  onErrorNavigator(app, nextState, replace) {\n    app.error('app navigator error', `no route:${nextState.location.pathname}`);\n    replace('/');\n  },\n\n  onErrorPageRender(app, error, title='page render error') {\n    app.error(title ,error);\n    setTimeout(()=>app.errorRender(title, error),0);\n    return null;\n  },\n\n  onRenderMessage(app, title, ...error ) {\n    app.showMessageOnRootElement(title ,error);\n  },\n\n  onNoticeMessage(app, message) {\n    app.showMessageByAlert(message)\n  },","ctx":{"type":"declaration","name":"noticeBlocking","value":"(...args)=>(app)=>{","string":"noticeBlocking"}},{"tags":[],"description":{"full":"<p>！<br />\n实现了默认log 显示</p>","summary":"<p>！<br />\n实现了默认log 显示</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":117,"codeStart":120,"code":"onLog(app, type, trace, ...args) {\n  if(!console) return;\n\n  if(trace&&console.trace)console.trace();\n  \n  if(type==='error'&&console.error){\n    console.error(...args);\n  }else if(type==='debug'&&console.debug){\n    console.debug(...args);\n  }else if(console.log){\n    console.log(...args);\n  }\n},\n}","ctx":{"type":"method","name":"onLog","string":"onLog()"}}]
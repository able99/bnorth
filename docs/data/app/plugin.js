[{"tags":[{"type":"copyright","string":"(c) 2016 able99","html":"<p>(c) 2016 able99</p>"},{"type":"author","string":"able99 (8846755@qq.com)","html":"<p>able99 (8846755@qq.com)</p>"},{"type":"license","string":"MIT","html":"<p>MIT</p>"}],"description":{"full":"<p>bnorth solution</p>","summary":"<p>bnorth solution</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":1,"codeStart":7},{"tags":[{"type":"class","string":"plugin","html":"<p>plugin</p>"},{"type":"example","string":"```js\nlet plugin = {\n  name: 'xxx',\n  dependence: 'yyy',\n  init(app) {\n    ... \n  },\n  onZZZ(app) {\n    ... \n  }\n}\n```","html":"<pre><code class=\"lang-js\">let plugin = {\n  name: 'xxx',\n  dependence: 'yyy',\n  init(app) {\n    ... \n  },\n  onZZZ(app) {\n    ... \n  }\n}\n</code></pre>"}],"description":{"full":"<p>插件实现回调函数，app 触发相应时间时被调用，完成对app 的初始化和配置及实现特定的功能<br />\n回调函数可能是初始化函数，启动阶段的各个函数或者由app，页面或者其他插件trigger 的事件</p>","summary":"<p>插件实现回调函数，app 触发相应时间时被调用，完成对app 的初始化和配置及实现特定的功能<br />\n回调函数可能是初始化函数，启动阶段的各个函数或者由app，页面或者其他插件trigger 的事件</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":9,"codeStart":27},{"tags":[{"type":"property","string":"{string} name - 插件名称，同名称插件不能同时使用","name":"name","description":"<ul>\n<li>插件名称，同名称插件不能同时使用</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":28,"codeStart":31},{"tags":[{"type":"property","string":"{string|string[]} dependence - 该插件依赖的插件或插件列表","name":"dependence","description":"<ul>\n<li>该插件依赖的插件或插件列表</li>\n</ul>","types":["string","Array.<string>"],"typesDescription":"<code>string</code>|<code>Array</code>.&lt;<code>string</code>&gt;","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":32,"codeStart":35},{"tags":[{"type":"property","string":"{init} init - 当插件被安装到app 时触发，该阶段可以初始化插件和修改app 的内容","name":"init","description":"<ul>\n<li>当插件被安装到app 时触发，该阶段可以初始化插件和修改app 的内容</li>\n</ul>","types":["init"],"typesDescription":"<a href=\"init.html\">init</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":36,"codeStart":39},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{init} init","name":"init","description":"","types":["init"],"typesDescription":"<a href=\"init.html\">init</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{init} init</p>"}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":40,"codeStart":44},{"tags":[{"type":"callback","string":"init","html":"<p>init</p>"},{"type":"param","string":"{App} app - 应用程序App的实例","name":"app","description":"<ul>\n<li>应用程序App的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>当插件被安装到app 时触发，该阶段可以初始化插件和修改app 的内容</p>","summary":"<p>当插件被安装到app 时触发，该阶段可以初始化插件和修改app 的内容</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":45,"codeStart":50},{"tags":[{"type":"callback","string":"onConfigBefore","html":"<p>onConfigBefore</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段中，进入配置过程前触发，该阶段可以从网络获取配置信息</p>","summary":"<p>当启动阶段中，进入配置过程前触发，该阶段可以从网络获取配置信息</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":51,"codeStart":57},{"tags":[{"type":"callback","string":"onConfig","html":"<p>onConfig</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当\b启动阶段中，进入配置过程时触发，该阶段可以增加和修改app 的默认配置</p>","summary":"<p>当\b启动阶段中，进入配置过程时触发，该阶段可以增加和修改app 的默认配置</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":58,"codeStart":64},{"tags":[{"type":"callback","string":"onImportStyles","html":"<p>onImportStyles</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段中，进入css 样式加载过程时触发，该阶段可以从网络引入css 样式文件</p>","summary":"<p>当启动阶段中，进入css 样式加载过程时触发，该阶段可以从网络引入css 样式文件</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":65,"codeStart":71},{"tags":[{"type":"callback","string":"onImportStylesAfter","html":"<p>onImportStylesAfter</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段中，完成css 样式加载过程时触发，该阶段可以对加载后的css 样式进行覆盖修改和添加新的css 样式</p>","summary":"<p>当启动阶段中，完成css 样式加载过程时触发，该阶段可以对加载后的css 样式进行覆盖修改和添加新的css 样式</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":72,"codeStart":78},{"tags":[{"type":"callback","string":"onCreateStoreBefore","html":"<p>onCreateStoreBefore</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段中，进入数据仓库建立阶段前触发，该阶段每个应用可以将action 或者 reduxer 添加进来，丰富app 的功能</p>","summary":"<p>当启动阶段中，进入数据仓库建立阶段前触发，该阶段每个应用可以将action 或者 reduxer 添加进来，丰富app 的功能</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":79,"codeStart":85},{"tags":[{"type":"callback","string":"onCreateStore","html":"<p>onCreateStore</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段中，进入仓库建立阶段触发，app plugin 在该阶段完成数据仓库的建立，各个应用一般无需参与</p>","summary":"<p>当启动阶段中，进入仓库建立阶段触发，app plugin 在该阶段完成数据仓库的建立，各个应用一般无需参与</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":86,"codeStart":92},{"tags":[{"type":"callback","string":"onCreateStoreAfter","html":"<p>onCreateStoreAfter</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段中，完成仓库建立阶段后触发，</p>","summary":"<p>当启动阶段中，完成仓库建立阶段后触发，</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":93,"codeStart":99},{"tags":[{"type":"callback","string":"onImportRoutes","html":"<p>onImportRoutes</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段中，进入路由配置阶段时触发，每个应用必须实现该回调函数，并设置app.routes 参数，app 才可以正常运行</p>","summary":"<p>当启动阶段中，进入路由配置阶段时触发，每个应用必须实现该回调函数，并设置app.routes 参数，app 才可以正常运行</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":100,"codeStart":106},{"tags":[{"type":"callback","string":"onImportRoutesAfter","html":"<p>onImportRoutesAfter</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段中，完成路由配置阶段时触发，该阶段可以修改由路由生成的app.config.paths 的路径信息</p>","summary":"<p>当启动阶段中，完成路由配置阶段时触发，该阶段可以修改由路由生成的app.config.paths 的路径信息</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":107,"codeStart":113},{"tags":[{"type":"callback","string":"onHook","html":"<p>onHook</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当在启动过程进入hook 阶段时触发，该阶段可以修改app 的默认行为</p>","summary":"<p>当在启动过程进入hook 阶段时触发，该阶段可以修改app 的默认行为</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":114,"codeStart":120},{"tags":[{"type":"callback","string":"onRender","html":"<p>onRender</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段结束，开始react 渲染时触发，app plugin 将会负责渲染，各个应用一般无需参与</p>","summary":"<p>当启动阶段结束，开始react 渲染时触发，app plugin 将会负责渲染，各个应用一般无需参与</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":121,"codeStart":127},{"tags":[{"type":"callback","string":"onAppWillStart","html":"<p>onAppWillStart</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当启动阶段结束后，进入应用运行阶段，应用将要启动时触发</p>","summary":"<p>当启动阶段结束后，进入应用运行阶段，应用将要启动时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":128,"codeStart":134},{"tags":[{"type":"callback","string":"onAppStart","html":"<p>onAppStart</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当应用已完成启动时触发</p>","summary":"<p>当应用已完成启动时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":135,"codeStart":141},{"tags":[{"type":"callback","string":"onAppStop","html":"<p>onAppStop</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当应用已停止时触发</p>","summary":"<p>当应用已停止时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":142,"codeStart":148},{"tags":[{"type":"callback","string":"onAppResume","html":"<p>onAppResume</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当应用从后台返回时触发，仅混合开发时有效</p>","summary":"<p>当应用从后台返回时触发，仅混合开发时有效</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":149,"codeStart":155},{"tags":[{"type":"callback","string":"onAppPause","html":"<p>onAppPause</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当应用切换到后台时触发，仅混合开发时有效</p>","summary":"<p>当应用切换到后台时触发，仅混合开发时有效</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":156,"codeStart":162},{"tags":[{"type":"callback","string":"onErrorPageRender","html":"<p>onErrorPageRender</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{Error} error - 页面render 的异常信息对象","name":"error","description":"<ul>\n<li>页面render 的异常信息对象</li>\n</ul>","types":["Error"],"typesDescription":"<code>Error</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当页面组件render错误时触发</p>","summary":"<p>当页面组件render错误时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":163,"codeStart":170},{"tags":[{"type":"callback","string":"onNavigating","html":"<p>onNavigating</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} nextState - 页面路由信息，参见[react-router3 router-render函数]()","name":"nextState","description":"<ul>\n<li>页面路由信息，参见<a href=\"\">react-router3 router-render函数</a></li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{string} - 返回需要阻止，并替换当前导航的地址，同时将不会触发插件列表中位于其后的插件回调","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回需要阻止，并替换当前导航的地址，同时将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当准备导航到新的页面时触发，返回path，将重定向到制定地址</p>","summary":"<p>当准备导航到新的页面时触发，返回path，将重定向到制定地址</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":171,"codeStart":178},{"tags":[{"type":"callback","string":"onNavigated","html":"<p>onNavigated</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} nextState - 页面路由信息，参见[react-router3 router-render函数]()","name":"nextState","description":"<ul>\n<li>页面路由信息，参见<a href=\"\">react-router3 router-render函数</a></li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当导航到新的页面时触发</p>","summary":"<p>当导航到新的页面时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":179,"codeStart":186},{"tags":[{"type":"callback","string":"onNavigatePrevent","html":"<p>onNavigatePrevent</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} nextState - 页面路由信息，参见[react-router3 router-render函数]()","name":"nextState","description":"<ul>\n<li>页面路由信息，参见<a href=\"\">react-router3 router-render函数</a></li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当当前导航被阻止时触发</p>","summary":"<p>当当前导航被阻止时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":187,"codeStart":194},{"tags":[{"type":"callback","string":"onErrorNavigator","html":"<p>onErrorNavigator</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} nextState - 页面路由信息，参见[react-router3 route-onEnter函数]()","name":"nextState","description":"<ul>\n<li>页面路由信息，参见<a href=\"\">react-router3 route-onEnter函数</a></li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{function} replace - 调用后可重定向路径的函数，参见[react-router3 route-onEnter函数]()","name":"replace","description":"<ul>\n<li>调用后可重定向路径的函数，参见<a href=\"\">react-router3 route-onEnter函数</a></li>\n</ul>","types":["function"],"typesDescription":"<code>function</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当导航出错时触发，比如无法匹配的导航路径等问题</p>","summary":"<p>当导航出错时触发，比如无法匹配的导航路径等问题</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":195,"codeStart":203},{"tags":[{"type":"callback","string":"onLog","html":"<p>onLog</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{string} type - debug|error|verbose，表示日志的等级","name":"type","description":"<ul>\n<li>debug|error|verbose，表示日志的等级</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{boolean} trace - 是否打印trace","name":"trace","description":"<ul>\n<li>是否打印trace</li>\n</ul>","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{...*} args - 日志的列表","name":"args","description":"<ul>\n<li>日志的列表</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":true},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当需要打印日志时触发</p>","summary":"<p>当需要打印日志时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":204,"codeStart":213},{"tags":[{"type":"callback","string":"onRenderMessage","html":"<p>onRenderMessage</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{string} title - 消息的标题","name":"title","description":"<ul>\n<li>消息的标题</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{...*} [args] - 消息列表","name":"[args]","description":"<ul>\n<li>消息列表</li>\n</ul>","types":[],"typesDescription":"<code>*</code>","optional":true,"nullable":false,"nonNullable":false,"variable":true},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当需要以页面render方式显示信息时触发</p>","summary":"<p>当需要以页面render方式显示信息时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":214,"codeStart":222},{"tags":[{"type":"callback","string":"onNoticeMessage","html":"<p>onNoticeMessage</p>"},{"type":"param","string":"{App} app - 应用App 的实例","name":"app","description":"<ul>\n<li>应用App 的实例</li>\n</ul>","types":["App"],"typesDescription":"<a href=\"App.html\">App</a>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{element|string} message - 显示的消息","name":"message","description":"<ul>\n<li>显示的消息</li>\n</ul>","types":["element","string"],"typesDescription":"<code>element</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} [props] - 消息显示的ui 属性","name":"[props]","description":"<ul>\n<li>消息显示的ui 属性</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{object} [options] - 消息显示的配置属性","name":"[options]","description":"<ul>\n<li>消息显示的配置属性</li>\n</ul>","types":["object"],"typesDescription":"<code>object</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{boolean} - 返回true，将不会触发插件列表中位于其后的插件回调","types":["boolean"],"typesDescription":"<code>boolean</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>返回true，将不会触发插件列表中位于其后的插件回调</li>\n</ul>"}],"description":{"full":"<p>当需要以notice方式显示信息时触发</p>","summary":"<p>当需要以notice方式显示信息时触发</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":223,"codeStart":232}]
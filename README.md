# bnorth

bnorth 是基于react 生态的一站式快速开发框架。提供页面路由，redux数据流等基本功能，和通过可扩展的插件机制提供的导航，鉴权，通知等高级功能。内置的脚手架能提高开发效率和通过cordova，electronjs等实现跨平台混合开发。


## Why bnorth

1. react 是一个生态，存在大量优秀的库能协同开发出优秀的项目，同时也带来了学习上的成本。为此bnorth 以最佳实践为目的，提供一站式的快速开发方案。
2. bnorth 是完整的解决方案。bnroth 提供了mvc框架结构和脚手架；bnorth-components提供了丰富的组件；rich.css通过富class 方式，无需或极少编写css，并能整体缩小css 代码尺寸。
3. bnorth 将扩展脚手架与cordova，electronjs等结合，实现跨平台混合开发。


## Getting Started

### 作为整体方案使用

```bash
$ npm init [-f]       # 初始化package.json和项目基本信息
$ npm install bnorth  # 安装，并自动启动bnorth脚手架，建立模板工程
```

本地开发

```bash
$ npm start
```

打包发布

```bash
$ npm run build
```

### 作为MCV框架使用

安装
安装前，在package.json中添加 *bnroth: false* 键值对，来禁用脚手架

```bash
$ npm i bnroth
```

使用

```js
import App from 'bnorth/lib/base/app';
let app = App.instance({
  plugin:{
    onImportRoutes(app) {
      app.routes = require('./routes');
    },
  },
})
app.start();
```


## 特性

### bnorth脚手架

目前实现的脚手架功能

```bash
$ npm install bnroth         # 安装bnroth插件时，自动初始化bnorth示例工程

$ npm run bnroth project all # 建立模板工程| 参数all(全部), project(项目文件，如.gitignore) ,src(代码文件)
$ npm start                  # 启动调试服务器
$ npm run build              # 打包
$ npm run build -- --debug   # 生成debug模式包
$ npm run build -- --analyze # 生成依赖库图标，用来分析依赖库size

```

计划添加的脚手架功能

1. cordova助手
2. electronjs助手
3. 新建page助手


### 内置react-router路由

继承于react-router 的路由配置方式。并增加几个有用的功能：

1. 无需配置path，将从key 参数智能获取
2. 配置title 后，进入该页面时，将同步修改浏览器标题栏
3. 配置checkLogin 后，未登录则跳转到登录页面
4. 根据redux 风格，component 为页面View 文件，container 为页面容器文件， 支持动态加载
5. 其他参数兼容react-router3

```js
import { Route } from 'bnorth/lib/base/router';

export default (
  <Route>
    <Route 
      key='/'
      title='首页'
      checkLogin
      component={require('./pages/home')}
      container={require('./pages/_home')} >
    </Route>
  </Route>
)
```

### 内置redux数据流

1. 操作数据流
  待补充
2. 网络数据流
  待补充

### proxy

配置代理，详见 [webpack-dev-server#proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy)。

比如在本地调试时，发到本地的请求代理到实际服务器上：

```
"proxy": {
  "/api": {
    "target": "http://api.com/",
    "changeOrigin": true,
  }
}
```

### mock

mock数据支持

```js
module.exports = {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1,2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },

  // Forward 到另一个服务器
  'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',
};
```

### 工程配置

根目录下的，bnorth.config.js。配置发布环境： bnroth.config.prod.js, 配置开发环境： bnroth.config.dev.js。

**bail** 出错时是否停止，默认停止

**devtool** 配置sourcemap，开发环境默认为cheap-module-eval-source-map，生产环境为false。

**outputPath** 配置[输出路径](http://webpack.github.io/docs/configuration.html#output-path)，默认是 ./dist。

**outputFilename**: 配置输出文件的模式，默认为'[name].[hash:8].js'即hash文件名

**outputPublicPath** 配置生产环境的 [publicPath](http://webpack.github.io/docs/configuration.html#output-publicpath)，开发环境下永远为 /。

**outputChunkFilename** 配置chunk文件的模式，默认为'[name].[chunkhash:8].async.js',

**resolveExtensions: ['.js', '.json', '.jsx']** **resolveExtensionsExtra: []** 两个参数配合追加和替换默认的文件扩展名识别

**autoprefixConfig** 配置prefix，默认配置css浏览器兼容 { browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', ], },

**externals** 配置 webpack 的 [externals](http://webpack.github.io/docs/configuration.html#externals) 属性。

**extractCss** css 打包到js 中还是抽取成css， 默认不抽取


### 运行期配置

**browser** 浏览器配置，比如标题，图标等

**networkCache** 是否开启网络缓存，默认不开启

**urls** url

**paths** 页面路径

**strings** 字符串

**images** 图片

**keys** key

**login** 登录的相关配置

**limitWidth** 是否开启屏幕最大宽度， 默认开启

**hideNavBar** 隐藏标题栏（方便app 嵌入），默认不开启

**themes** 配置主题

**iconFonts** 配置字体图标的名称与code 对应


### 插件机制

bnorth通过插件机制，分离代码，提供高级功能，提供灵活性和可扩展性。

可编写自己的插件，并在hook 函数内返回true，则阻止插件链继续向下调用。比如：

```js
export default {
  onNoticeBlocking(...args) {
    noticeBlocking(...args);
    return true;
  }
}
```


bnorth内置插件如下：

1. 浏览器插件
  设置浏览器图标，title，提供url的解析和跳转功能

  安装
  ```js
  import pluginBrowser from 'bnorth/lib/plugins/browser';
  app.use(pluginBrowser);
  ```
  使用，比如
  ```js
  app.browser.title = '标题栏';
  ```

2. 数据流插件
3. 格式化插件
4. 导航插件
5. 网络底层插件
6. 数据请求插件
7. 本地存储插件
8. 鉴权与用户信息插件
9. 工具插件

## 关于roadhog

bnorth脚手架的react编译基本上从 [roadhog](https://raw.githubusercontent.com/sorrycc/roadhog) clone来，并将保持持续跟踪。roadhog 功能十分强大，但是单位的一些特殊的需求，不得不修改node_modules下的配置。为了方便和bnorth的发展，clone 并形成了bnorth 脚手架。


## 感谢

感谢github开源社群，感谢roadhog, dvajs, antd, react-bootstrap等优秀项目的帮助和灵感


## LICENSE

MIT
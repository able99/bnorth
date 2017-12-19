# bnorth

bnorth是基于react生态的快速开发框架，提供页面路由、redux数据流等基本功能，并通过可扩展的插件机制提供导航，鉴权，通知等高级功能。内置的脚手架，也为快速开发提供便利。


## Why bnorth

1. react是一个生态，存在大量优秀的库能协同开发出优秀的项目，同时也带来了学习上的成本。为此bnorth以最佳实践为目的，提供快速开发的方案。
2. bnorth是完整的方案，bnroth提供了mvc框架结构，脚手架；bnorth-components提供了丰富的组件；rich.css提供一站式css覆盖，减少css编写难度，整体缩小代码尺寸。
3. bnorth将扩展脚手架与cordova，electronjs等结合，实现app和pc应用的快速开发。


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

### 作为库的使用

安装
安装前，在package.json中添加 *bnroth: false* 禁用脚手架

```bash
$ npm i bnroth
```

使用

```js
import app from 'bnroth'
```


## 特性

### bnorth脚手架

目前实现的脚手架功能

```bash
$ npm run bnroth project all # 建立模板工程| 参数all, project ,src
$ npm start                  # 启动调试服务器
$ npm run build              # 打包
$ npm run build -- --debug   # 生成debug模式包
$ npm run build -- --analyze # 生成依赖库图标，用来分析依赖库size

```

计划添加的脚手架功能

1. cordova助手
2. electronjs助手
3. 添加page功能


### 内置react-router路由
### 内置redux数据流
### mock
### 工程配置
### 运行期配置
### 插件机制

bnorth通过插件机制，分离代码，提供高级功能，提供灵活性和可扩展性。
bnorth内置插件如下：

1. 浏览器插件

设置浏览器图标，title，提供url的解析和跳转功能

使用方法
```js
import pluginBrowser from 'bnorth/lib/plugins/browser';
app.use(pluginBrowser);
```

2. 数据流插件
3. 格式化插件
4. 导航插件
5. 网络底层插件
6. 数据请求插件
7. 本地存储插件
8. 鉴权与用户信息插件
9. 工具插件



## 感谢

感谢github开源社群，感谢roadhog, dvajs, antd, react-bootstrap等优秀项目的帮助和灵感


## LICENSE

MIT
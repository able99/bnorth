简介
======
基于react与cordova技术，整合多款优秀的github项目与组件，并包装成，统一的简洁的bnorth风格的代码框架，可快速开发h5或者ios，android混合应用项目。同时也保持高度灵活可控的编码风格。

使用bnorth提供的脚手架，快速生成工程和添加页面，并通过编写好的npm命令快速生成h5发布文件，andorid安装包及ios安装包

安装及初始化工程
======

```sh
1.  npm init [-f]
2.  npm install --save https://github.com/able99/bnorth
3.  node node_modules/.bin/bnorth_init [all|android|ios]
```

1.使用npm格式，输入工程信息，包括信息，作者信息等
2.将bnorth添加到工程依赖库
3.调用bnorth的初始化脚本，将构建bnorth工程，包括引入bnorth库，初始化实例代码等。android和ios参数为建立android或ios混合应用，all为全部2个平台，没有参数表示仅建立h5工程

有用的命令
======

```sh
	npm run init [project] [src] [lib] [android] [ios]
```
重新初始化工程指定部分
project: 拷贝android或ios的示例工程代码和签名文件
src: 初始化当前工程代码为示例工程代码
lib: 更新bnorth库文件
android: 初始化android工程的配置，初始化后工程将支持生成android安装包
ios: 初始化ios工程的配置，初始化后工程将支持生成ios安装包

```sh
	npm start
```
启动调试服务器，并自动在浏览器中打开，可查看和调试工程代码

```sh
	npm run page :name
```
模板建立名称为name参数的页面源码到工程中

```sh
	npm run component :name
```
将bnorth库中提供的额外功能组件添加到工程中使用，如百度地图等

```sh
	npm run build
```
优化并打包高效且混淆后的h5发布文件

```sh
	npm run appprepare
```


```sh
	npm run appbuild
```


```sh
	npm run allbuild
```


```sh
	npm run publish
```
	App release and copy to release directory.


```sh
	npm run plugin [plugin name]
```
模板建立cordova插件，为混合应用提供扩展功能


启动代码
======


路由与页面
======


UI组件
======


样式表
======


图标与字体库
======


功能组件
======

参考与鸣谢
======
bnorth使用或大量借鉴了以下优秀的项目
react, react-redux, react-router, amaze, webpack, scss, moment,fs-extra等等未能一一列举

许可
======
[MIT](LICENSE). Copyright (c) 2017 able99.

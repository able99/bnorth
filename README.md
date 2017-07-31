1.简介
======
基于react与cordova技术，整合多款优秀的github项目与组件，并包装成，统一的简洁的bnorth风格的代码框架，可快速开发h5或者ios，android混合应用项目。同时也保持高度灵活可控的编码风格。
使用bnorth提供的脚手架，快速生成工程和添加页面，并通过编写好的npm命令快速生成h5发布文件，andorid安装包及ios安装包

2.安装及初始化工程
======

```sh
1.  npm init [-f]
2.  npm install --save https://github.com/able99/bnorth
3.  node node_modules/.bin/bnorth_init [all|android|ios]
```

1. 使用npm格式，输入工程信息，包括信息，作者信息等
2. 将bnorth添加到工程依赖库
3. 调用bnorth的初始化脚本，将构建bnorth工程，包括引入bnorth库，初始化实例代码等。android和ios参数为建立android或ios混合应用，all为全部2个平台，没有参数表示仅建立h5工程

3.有用的命令
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

```sh
npm run plugin [plugin name]
```
模板建立cordova插件，为混合应用提供扩展功能


4.启动代码
======
在src/index文件中，main函数通过promise依次完成以下加载多个依赖部分。如要加载js文件可通过jsLoader函数加载。如加载失败可调用函数mainError显示错误。

1. mainPre
2. mainConfig
3. mainStyle
4. mainRouter
5. mainRender


5.路由与页面
======
启动后，由页面组成，页面由对地址栏的操作所驱动。页面与地址栏的对应由路由表配置。
路由表示例：
```js
<Route>
    <Route {...createRouteProps('home',{prefix:'mobile/home/'})}>
        <Route {...createRouteProps('article/:article',{prefix:'mobile/hoom/'})} />
    </Route>
<Route>
```

1. createRouteProps为路由参数生成函数，第一个参数为路由名，路由名对应地址栏里的地址，:article为该路由对应的参数
2. 如/home/article/xxx,将对应页面home和home的子页面article页面，article将获得参数article=xxx 
3. home页面将对应在prefix指定的目录下的home与_home文件，home文件是纯react组件组成的页面文件，而_home文件是home的容器文件，将方法和属性注入到页面文件中


6.UI组件
======


7.样式
======

7.1样式名称
------
bnorth框架提供大量样式类，并建议ui开发中，主要采用样式类形式定义ui样式（<Component className="margin-h" />），并辅助以css in js(<Component style="{{marginLeft:45}}" />)的方式扩展定制性较高的ui样式。但不限于规定该写法。

因包含大量使用实用样式，限于篇幅，具体查阅代码src/bnorth/style/_utilities.scss。

###float###
* .cf: 清除浮动
* .fl: 向左浮动
* .fr: 向右浮动
* .fn: 不浮动

###margin padding###
margin|padding [-h|v|top|right|bottom|left] [-0|-size] </br>
示例：
```css
margin: 外边距为 0.9375rem
margin-v: 垂直（上下）外边距为 0.9375rem
margin-v-xs: 垂直外边距为 0.3125rem
padding-left-0: 左内边距为 0
```



7.2样式主题
------
bnorth提供了一套默认的完整的css样式主题，并允许工程，在style目录下的style.scss文件中覆盖默认的css样式主题变量，具体参见src/bnorth/style/_variables。
如颜色值
```css
// color
$global-success:   #17c729 !default;
$global-warning:   #00baff !default;
$global-alert:     #f72a27 !default;
$global-notice:    #faff7e !default;
$global-link:      #008bec !default;
$global-primary:   blue    !default;
$global-secondary: #000    !default;
$global-tertiary:  #cbcbcb !default;
```

如字体大小
```css
// Size
$font-size-xxs: 8px !default;
$font-size-xs: 10px !default;
$font-size-sm: 12px !default;
$font-size-default: 14px !default;
$font-size-lg: 16px !default;
$font-size-xl: 18px !default;
$font-size-xxl: 24px !default;
$font-size-xxxl: 28px !default;
$font-size-xxxxl: 32px !default;
```

如checkradio组件
```css
// checkradio Variables
$checkradio-prefix: #{$namespace}check-radio !default;
$checkradio-opacity-disabled: 0.5 !default;
$checkradio-color: $global-border;
$checkradio-color-inavtive: $global-border;
$checkradio-background: none;
$checkradio-input-background: none;
$checkradio-style: null;
```

7.3多主题
------


8.图标与字体库
======


9.功能组件
======

10.API
======

11.HOOK

10.参考与鸣谢
======
bnorth使用或大量借鉴了以下优秀的项目
react, react-redux, react-router, amaze, webpack, scss, moment,fs-extra等等未能一一列举

11.许可
======
[MIT](LICENSE). Copyright (c) 2017 able99.

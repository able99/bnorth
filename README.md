1.简介
======
基于react与cordova技术,整合多款优秀的github项目与组件,并包装成统一的简洁的bnorth风格的代码框架. 可快速开发h5或者ios,android混合应用项目. 同时保持高度灵活可控的编码风格. 

使用bnorth提供的脚手架, 可快速生成工程和添加页面，并通过编写好的npm命令快速生成h5发布文件，andorid及ios安装包

*说明文档假设读者熟悉 [REACT](https://facebook.github.io/react/), ES6及[CORDOVA(仅开发H5无需熟悉)](http://cordova.apache.org/)*


2.安装及初始化工程
======
***依赖NODEJS>4.0, 请先安装[NODEJS](https://nodejs.org/en/)***

安装命令:
```sh
1. npm init [-f]
2. npm install --save https://github.com/able99/bnorth
3. node node_modules/.bin/bnorth_init [all|android|ios]
```

1. 使用npm命令初始化工程信息,包括工程名称，作者等信息
2. 将bnorth添加到工程依赖库
3. 调用bnorth的初始化脚本，将构建bnorth工程，包括引入bnorth库，初始化工程代码等。android和ios参数为建立android或ios混合应用，all为全部2个平台，没有参数表示仅建立H5工程

  安装后使用命令 * npm start * 在浏览器中模拟运行


3.有用的命令
======

```sh
npm run init [project] [src] [lib] [android] [ios]
```
重新初始化工程指定部分
project: 初始化工程的配置文件，包括readme,gitignore,签名配置文件等
src: 初始化为示例工程代码
lib: 更新bnorth库文件
android: 初始化android工程的配置，初始化后工程将支持生成android安装包
ios: 初始化ios工程的配置，初始化后工程将支持生成ios安装包

```sh
npm start
```
启动调试服务器，并自动在浏览器中打开，可查看和调试工程代码

```sh
npm run page name [des]
```
模板建立名称为name参数的页面源码到工程src/pages[/des]中

```sh
npm run component name
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


5.路由与页面
======
+ 框架采用SPA结构,整个工程由多个页面和配置页面间关系的路由表构成
+ 页面由页面UI文件和页面容器文件构成，其中页面UI文件是普通react组件;页面容器文件为普通js类，为页面UI文件注入功能
+ 页面流转由对地址栏的操作所驱动，路由表配置了页面的组成和页面之间的关系

路由表示例：
```js
<Route>
    <Route {...createRouteProps('home',{prefix:'mobile/home/'})}>
        <Route {...createRouteProps('article/:article',{prefix:'mobile/hoom/'})}></Route>
    </Route>
<Route>
```

1. 地址栏地址/home/article/xxx,将对应页面home和home的子页面article页面，article将获得参数article=xxx 
2. createRouteProps为路由参数生成函数，
第一个参数为路由名，路由名对应地址栏里的地址，同时加载器将通过路由名称自动加载页面文件和容器文件。:article为该路由对应的参数。
第二个参数为路由配置参数，其中:

  + prefix: 指定页面文件的加载路径，默认为src/pages
  + page: 可指定加载器加载页面文件方式，支持字符串名或直接传入组件对象
  + containner: 可指定加载器加载容器文件方式，支持字符串名或直接传入组件对象，如果该参数为true，将使用默认容器，默认容器支持全部API


6.页面UI与UI组件
======
框架收集且开发了大量React UI组件,采用React技术可快速组合成复杂的UI页面,包括:

6.1 页面组件
------
+ View

 View组件是页面的根组件, 该组件处理页面控制器传入的属性, 实现页面不在前台时自动隐藏等处理

+ Pager

6.2 布局组件
------
+ Container
+ Panel
+ Grid Col

6.3 大块功能组件
------
+ Card
+ Group
+ List
+ Accordion
+ NavBar
+ TabBar
+ Tabs
+ Carousel

6.4 细小功能组件
------
+ Badge
+ Button ButtonGroup
+ CheckRadio
+ Field
+ Switch
+ Icon

6.5 弹出与浮动组件
------
+ Modal
+ Popover PopoverTrigger
+ Fab

6.6 通知
------
+ Loader
+ Notification
+ ProgressBar


7.页面容器与API
======
页面容器为页面UI文件注入Config,API和Action

7.1 容器
------
容器是js的类文件,并由高阶组件stateHoc所包装,为页面UI文件提供功能,典型容器如下:
```js
stateHoc(class PageContainer extends StateHocBasetateHocContainer{
  constructor(ownProps) {
    super(ownProps);

    this.Wraps.data = this.ActionWraps.actionsDataWrap({
      initData: {
      }
    });

    this.Wraps.{{ name }} = this.ActionWraps.actionsHttpifFetchWrap({
      updateOnStart: true,
      options:{
        resource: '{{ name }}',
      }
    });

    this.Reduxers.push('ReduxerNotice');
  }

  submit() {
    this.Actions.actionOperateSubmit({
      resource: '{{ name }}',
      data:{
        ...this.Wraps.data.data(),
      },
      success:(result)=>{
        this.Actions.actionNoticeMessage('提交成功');
      },
    }); 
  }
})
```

1. 在类的构造函数中,配置容器的Action, Action是具有state属性的对象,state变化将引起页面UI的react刷新
2. 类的成员函数和属性,将直接注入到页面UI中,比如可通过this.props.ex.submit访问容器的成员函数submit
3. this.Reduxers.push是将reduxer系统中已存在的命名reduxer加入监听
4. 每个容器默认包括一个名为data的data Action,可被替换
5. ownProps是页面的属性, 包括:
 + route


7.2 Config
------
Config是全局的配置,工程可以在此配置自定义的项目,也可以修改库默认配置的项目

+ Url 工程网络请求的配置项,包括:
 - base
 - api
 - auth
+ Path 工程中页面文件路径的配置,默认包括:
 - Home 
 - Login
 - Resister, ForgetPassword, ChangePassword
+ Str 工程的字符串可以添加在这里,其中*Config.Str.netCommonError = "网络连接错误"*是默认网络连接的错误提示
+ Images 工程中图片可配合在这里
+ Keys 工程中key值,比如storage的key可以配合在这里,默认包括:
 - user 登录信息默认key
+ NetCache 是否开启网络缓存,默认false
+ Version 版本号
+ Debug 是否开启调试,默认false
+ OnBrowserDebug 是否允许浏览器调试APP,开启后有些扩展API将返回模拟数据
+ OnBrowser 是否运行在浏览器,该值默认自动计算
+ Config.OnApp 是否运行在APP,该值默认自动计算


7.3 Action Wrap
------
Action Wrap是具有state属性的对象,state变化将引起页面UI的react刷新

+ data 用户页面上数据的保存读取,支持state,支持跨页面访问与共享,支持校验

  - 在容器的构造函数中初始化
```js
this.Wraps.data = this.ActionWraps.actionsDataWrap({
  initData: {},
  rules: {
    f1: 'required',
    f2: 'number',
  },
  onWillChange: (data, originData)=>{},
  onChange: (data, originData)=>{},
}, uuid);
```
    - uuid 非必要参数, 用户命名Action Wrap, 初始化已存在的uuid时,将直接返回,不执行初始化
    - initData 是data中默认数据
    - onWillChange 数据将被更新时触发,函数返回值将替换将要改变的值,
    - onChange 数据更新后触发
    - changeError 可替换校验失败的默认处理函数
    - clearOnStop 指定页面unmount后,是否删除该Action Wrap
    - rules 指定验证规则
    - changeRules 指定update时自动检验的字段数组
  - init(data, merge)函数,  将数据初始化为data, merge指定是否merge到initData数据中
  - update(data, merge)函数, 将更新data中的字段到数据中, merge对于数据是数组型时指定是否追加到数组中
  - clear()函数, 清空并删除该wrap
  - data()函数, 获取数据
  - validate(args)函数, 返回args数组中字段(不传标示全部字段)校验是否正确
  - 在容器中,通过 *this.Wraps.data* 引用到对象, 在页面中通过 *this.props.Wraps.data* 引用对象
  - 在页面UI中通过 *this.props.wrap_data* 直接引用data的数据

+ httpif
  - 在容器的构造函数中初始化
```js
this.Wraps.net = this.ActionWraps.actionsHttpifFetchWrap({
  updateOnStart: true,
  options:{
    resource: '',
  }
}, uuid);
```
    - uuid 非必要参数, 用户命名Action Wrap, 初始化已存在的uuid时,将直接返回,不执行初始化
    - initData 是data中默认数据
    - updateOnStart 指定页面mount时是否自动更新Wrap
    - updateOnStart 指定页面resume后,是否自动更新Wrap
    - clearOnStop 指定页面unmount后,是否删除该Action Wrap
    - options 是netif网络请求的参数,
  - update(options)函数, 将发送网络请求
  - 在容器中,通过 *this.Wraps.data* 引用到对象, 在页面中通过 *this.props.Wraps.data* 引用对象
  - 在页面UI中通过 *this.props.wrap_data 直接引用data的数据

+ notice 
  - actionNoticeMessage
  - actionNoticeLoading
  - actionNoticeLoadingFinish
  - actionNoticeBlock
  - actionNoticeBlockFinish
  - actionNoticeNet
  - actionNoticeMenu
  - actionNoticeDialogShow
  - actionNoticeDialogClose

7.4 API
------
API是注入到页面UI中的普通方法

+ log
  - log函数
  - err函数
+ navigate
  - push(args)函数, args是可变参数,每个参数指定一个路径的一段,或者为页面参数
    - args = '/', 标示之后参数的路径从根目录开始
    - args = '..', 标示之后参数的路径从上一级目录开始
    - args = 'xx', 标示路径xx
    - args = {path: xx, extern: true, absolute: true}, 其中path标示路径,支持上面的路径,extern表示是外部页面,将执行外部跳转(对应于非react 路由跳转), absolute标示根目录
    - args = [{},passQuery,{},passState], 第一个{}标示query数组,第二个标示state数组,passQuery标示跳页面时,是否传递query到下个页面,passState同理.query将已url query形势展开,state将已push state形势传递
  - replace: 同push,只是替换当前地址,无法baick
  - back
  - goHome
  - goLogin
  - goResister
  - goForgetPassword
  - goChangePassword
+ netif
+ storage
+ user

7.5 utils
------
utile也是注入到UI中的普通方法,只是与框架的耦合度较低

+ format
+ sytle: CSS in JS辅助类
+ util
+ webview

8.样式与图标
======

8.1样式类
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



8.2样式主题
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

8.3多主题
------


8.4.图标与字体库
------


9.特殊功能组件
======
限于使用频率与库文件尺寸考虑,特殊功能组件未直接集成在框架的库中,使用时需要使用 *npm run component name* 添加进来

+ BaiduMap
+ Player
+ EmberHTML

10.工程启动代码与功能深度定制
======
在src/index文件中，main函数通过promise依次完成以下加载多个依赖部分。如要加载js文件可通过jsLoader函数加载。如加载失败可调用函数mainError显示错误。

1. mainPre： 在此函数中可通过jsLoader函数加载远程js配置文件或其他相关文件
2. mainConfig: 配置全局使用的config对象
3. mainStyle: 加载css，已保证render前，css已经完成加载
4. mainRouter: 加载router文件，实现地址栏与页面的映射
5. mainRender: render到html中的root节点

 完成启动初始化

11.参考与鸣谢
======
bnorth使用或大量借鉴了以下优秀的项目

react, react-redux, react-router, amaze, webpack, scss, moment,fs-extra等等未能一一列举

12.许可
======
[MIT](http://www.opensource.org/licenses/mit-license.php). Copyright (c) 2017 able99.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

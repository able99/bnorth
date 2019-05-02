# bnorth-demo

bnorth 解决方案 demo

## 文档

[bnorth 文档](//able99.github.io/#cbnorth)

## 问题与需求，内部使用

### demo 测试出的 bnorth 需要优化和需要未来增加的功能

1. memory leak
1. component picker refine
1. pluign valdate refine
1. app config module
1. 服务器渲染与 seo: 参数分隔符可配置，使分隔符支持中划线; browser 路由; button 支持 a 连接模式
1. list refine, 支持 icon 缩进
1. panel scroll 滚动和垂直滚动应该互斥
1. panel scroll 嵌套时滚动事件冲突, 应该先滚动里面的，再滚动外面

    ```js
    handlePan(event, element) {
      let { selectedIndex, countToShow, onSelectedChange, children } = this.props;
      let x = (-(this.size/countToShow)*(selectedIndex%children.length)+(event.deltaX||0));
      console.log(x);
      if(x<0){event.srcEvent.stopPropagation();}else{this.setState({offset: event.deltaX});}
      // event.preventDefault();
    }
    ```
1. tabbar 页面布局的 刷新问题
1. 去掉 root 100%, 使用 document 滚动
1. cordova webview 的上拉与下拉事件

### demo 反馈给 bnorth 需要解决的问题
1. btn 改名，去掉手动加 active 状态，但是保证 active 状态, 增加 touch 属性 ，onClick 转 onTouchStart
1. 增加 nextTick 和 nextWork
1. request 通过 tick 提高进度及时性
1. cordova 建立工程时，如果没有 dist 建立默认 www； 增加 clean 命令 删除 cordova 文件夹；有 cordova 文件夹但是没有 config.xml 时应该怎么处理
1. cordova tbs x5 内核
1. animation 支持 requestAnimationFrame，notice 从 width 改成 top,  全部组件去掉 css 动画


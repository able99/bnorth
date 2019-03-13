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
1. weshare 工程上，/:fivorate 本来是 首页的切换 tabbar 的参数，结果被 /|favorite 当成自己的参数了
1. btn 自动
1. list refine, 
1. panel scroll 滚动和垂直滚动应该互斥
1. panel scroll 嵌套滚动事件冲突, 

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

### demo 反馈给 bnorth 需要解决的问题

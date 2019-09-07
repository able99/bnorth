# bnorth-demo

bnorth 解决方案 demo

## 文档

[bnorth 文档](//able99.github.io/#cbnorth)

## 问题与需求，内部使用

### demo 测试出的 bnorth 需要优化和需要未来增加的功能

1. refine: memory leak check
1. refine: component of picker
1. refine: component of animationFrame
1. refine: pluign of valdate
1. refine: by https://github.com/nkbt/react-height/tree/master/src
1. refine: purecomponent react.memo and https://www.jianshu.com/p/33cda0dc316a

1. new feature: app config module
1. new feature: 服务器渲染与 seo, 参数分隔符可配置，使分隔符支持中划线; browser 路由; button 支持 a 连接模式
1. new feature: 可以设置，去掉 root 100%, 使用 document 滚动
1. new feature: cordova webview 的上拉与下拉加载事件
1. new feature: cordova 增加 clean 命令 删除 cordova 文件夹；增加 start cordova, 启动cordova app 连接 dev server 调试； debug 自动增加 <allow-navigation href="*" />
1. new feature: cordova tbs x5 内核
1. new feature: list 支持 icon 缩进
1. new feature: 属性 btn 改名，去掉手动加 active 状态，但是保证 active 状态, 增加 touch 属性使onClick 转 onTouchStart
1. new feature: 增加 nextTick 和 nextWork, request 通过 tick 提高进度显示及时性 https://zhuanlan.zhihu.com/p/48254036?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com
1. new feature: listview component

### demo 反馈给 bnorth 需要解决的问题
1. bug: bp- 通用属性与组件属性冲突，例如 list bp-after-b-theme 没有起作用
1. bug: tabx 分页 demo 切页卡顿, 上拉组件
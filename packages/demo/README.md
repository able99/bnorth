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
1. do not dom unactive page
1. 服务器渲染与 seo: 参数分隔符可配置，使分隔符支持中划线; browser 路由; button 支持 a 连接模式
1. border-none-a- should split to border-none-x-

### demo 反馈给 bnorth 需要解决的问题

1. panelcontainer 和 plain 的属性改为 _ 开头
1. Fab - 不能使用 transformComponent； style plain 时，还有边框
1. rich.css 支持 transform-origin ,支持 animation keyframe 配置和兼容性处理
1. loader 动画改未非 svg 动画, loading 需要改名
1. loader 没有处理 b-theme 等，Line 等应该是基于 Panel 的
1. field 增加 pattern 自行处理
1. border-none 与 border-set 和其他的互斥判断
1. component plugin refine
1. weshare 工程上，/:fivorate 本来是 首页的切换 tabbar 的参数，结果被 /|favorite 当成自己的参数了
1. !popover 滚动后，显示位置不准去
1. demo 属性设置为 none 时，应该删除属性，而不是设置为 undefined
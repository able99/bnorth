# bnorth-demo

bnorth 解决方案 demo

## 文档

[bnorth 文档](//able99.github.io/#cbnorth)

## 问题与需求，内部使用

### demo 测试出的 bnorth 需要优化和解决的问题

1. memory leak
1. component picker refine
1. app config module
1. do not dom unactive page

### demo 反馈给 bnorth 需要未来增加的功能

1. border-none-a- should split to border-none-x-
1. 参数分隔符可配置，使分隔符支持中划线，为未来服务器渲染做准备
1. 支持 browser 路由，目前只支持 hash 路由，为未来服务器渲染做准备
1. button 支持 a 连接模式，更好的支持 seo, 任一组件应该支持点击
1. rich.css 支持 transform-origin ,支持 animation keyframe 配置和兼容性处理
1. field 判断是否更新，应该是和this.input.value 比较；增加 pattern 自行处理
1. 统一修改 rich.css status- 和其他状态，并删除 - 结尾的非默认值类
1. 整理 container
1. popover 滚动后，显示位置不准去
1. pluign valdate refine
1. pullrefresh 解决了 pc 滚动不触发点击，但是 panel container sroll 还有问题
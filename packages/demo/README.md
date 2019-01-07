# bnorth-demo

bnorth 解决方案 demo

## 文档

[bnorth 文档](//able99.github.io/#cbnorth)

## 问题与需求，内部使用

### demo 测试出的 bnorth 需要优化和解决的问题

1. some component margin padding callapse, such as list demo filter
1. svg animation refine, animation is broken, such as list demo dropdown loader
1. pullrefresh mistakenly trigger onclick when pull on pc
1. refine trigger backtop, pullrefresh, 
1. popover hover trigger cannot close when click and click trigger close is wrong
1. implement grid
1. refine AnimationXXX components and implement AnimationNone
1. - state dup error
1. memory leak
1. pluign valdate refine
1. user loginRsult should not user result.data  
1. htmlwebpack charset wrong
1. popover click will trigger close, and trigger not support function to close popover by mannual

### demo 反馈给 bnorth 需要未来增加的功能

1. app config module
1. border-none-a- should split to border-none-x-
1. do not dom unactive page
1. 参数分隔符可配置，使分隔符支持中划线，为未来服务器渲染做准备
1. 支持 browser 路由，目前只支持 hash 路由，为未来服务器渲染做准备
1. button 支持 a 连接模式，更好的支持 seo
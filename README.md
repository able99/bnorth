# bnorth

[bnorth](https://github.com/able99/bnorth) 是基于 [React](https://reactjs.org/) 的大前端开发工具集。便捷的开发框架，实现了页面管理，数据管理等能力和可通过插件扩展的机制。并提供了统一的样式库，丰富的 react 组件，以及脚手架和工具集，形成了一站式的多平台的 web 和 hybird 应用开发系统。

## 起步

```js
npx @bnorth/cli create demo
cd demo
npm start
```

## 特性

1. 一站式工具集

    bnorth 不仅是 react 最佳实践，不仅是 mvc 框架，不仅是 react 组件库，而是一个大前端的综合一站式解决方案。包括了 web 应用搭建，hybird 打包，以及通过扩展实现的相关功能，比如 im，语音识别等等。可以根据需要选择工具集中的组件完成应用的快速开发。

1. 体系化

    bnorth 采用体系化的设计，各个组件紧密结合，使性能达到最大化，复用达到最大化。比如为了提供 css 的易用性，bnorth 开发了 rich.css 样式库，而 components 组件库则完全在 rich.css 之上进行开发。业务页面也采用 rich.css 开发，达到体系内紧密结合。同时也对 npm 上的其他库保持开放。

1. 插件机制

    bnorth 参考了主流的框架设计思想，采用微内核与插件扩展机制。提供更好的定制和扩充性，降低了体积。也为 bnorth 逐渐积累功能，形成一站式开发套件的核心思想提供了技术可行性。

1. 深度可定制

    bnorth 的设计思想是，提供最便捷的使用方法和最大的适应行。为了便捷，bnorth 提供丰富的内容，实现 0 配置使用。同时通过 js 的特性和植入在代码中的可定制机制和可配置机制，使得 bnorth 工具集可组合，可选择，可定制。

1. rich.css

    rich.css 用创新的方式，实现了动态的，可定制的，全覆盖的 css 样式库。无需 css 文件，实现 class 属性编程。

## 文档

[bnorth 说明文档](//able99.github.io/cbnorth/main.html)

[bnorth 参考手册](//able99.github.io/bnorth/)

## 例子

1. [demo h5](//able99.github.io/bnorth/demoh5/)
1. [demo console](//able99.github.io/bnorth/democonsole/)

## 使用 antd 组件

[antd](https://ant.design/) 是蚂蚁金服开发的 react 组件，丰富而强大。bnorth 可以选用 antd 或者其他 ui 代替 bnorth 方案的 ui 组件库。bnorth 组件库特点是高可定制化，非常适合 ui 丰富的前端开发，而相对固定的中后段平台可以采用第三方组件库。

以引入 antd 组件为例：

1. 添加 less 支持，antd 是 css 使用 less 编译

```shell
npm install less-loader less --save
```

2. 在 package.json 中添加 less 配置

```json
"bnorth": {
  "rules": [{
    "test": "\\.less$",
    "use": [
      { "loader": "style" }, 
      { "loader": "css" }, 
      { "loader": "less", "options": {"javascriptEnabled": true, "alias": {
        "./node_modules/antd/es/style/themes/": "antd-less"
      },"modifyVars": {
        "primary-color": "red"
      }}}
    ]
  }]
}
```

其中 modifyVars 中可以配置主题色

3. 使用组件

```js
import Button from 'antd/es/button';
import 'antd/es/button/style';

<Button type="primary">Primary</Button>
```

## 许可

MIT

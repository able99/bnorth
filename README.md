# bnorth

[bnorth](https://github.com/able99/bnorth) 是基于 [React](https://reactjs.org/) 和 [Cordova](https://cordova.apache.org/) 的大前端开发工具集。实现了基本的页面管理与数据流，并可以通过插件扩展能力。统一的样式库，丰富的 react 组件，大量的功能插件加上脚手架和打包工具提供了一站式的便捷的开发体验。

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

[bnorth 文档](//able99.github.io/#cbnorth)

## 例子

1. [demo](//able99.github.io/bnorth/demo/)

## 许可

MIT

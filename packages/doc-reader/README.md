# doc-reader

jsdoc3 已经很完美的支持 es6 了，可惜还是不能支持 react 已经 css classes。基于 jsdoc3 通过 jsdoc3 插件和模板的开发，实现以上功能。可以为 bnorth 解决方案提供统一的 api 文档生成方案。

## 起步

```js
bnorth-doc [src] [des] [package] [readme]
```

1. src: 源码路径，默认是 `./src`
1. des: 目标文档生成路径 ，默认是 `./docs`
1. package: package 信息文件 ，默认是 `./package.json`
1. readme: readme 文件路径 ，默认是 `./README.md`

## 特性

1. 单页面方式速度快
1. 支持 react 组件
1. 支持 css class
1. 支持 es6，友好显示 es 模块

## 基于该文档生成库的 bnorth api 文档

[bnorth core](//able99.github.io/bnorth/core/)
[bnorth components](//able99.github.io/bnorth/components/)
[bnorth rich.css](//able99.github.io/bnorth/richcss/)

## LICENSE

MIT


# bnorth-components

基于 rich.css 的 react 组件库，同时为 @bnorth/core，提供了对话框，警告等插件

## 起步

***安装***
```sh
npm install @bnorth/component
```

***react 组件***
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@bnorth/components/lib/Button';

ReactDOM.render(
  <Button>text</Button>,
  document.getElementById('root')
);
```

***borth 插件***
```js
export default function(app) {
  app.plugins.add(require('@bnorth/components/lib/notice').default);
  app.plugins.add(require('@bnorth/components/lib/mask').default);
  app.plugins.add(require('@bnorth/components/lib/modal').default);
  app.plugins.add(require('@bnorth/components/lib/loading').default);
  app.plugins.add(require('@bnorth/components/lib/picker').default);
}

app.notice.show('hello world!');
```

## 文档

[Documents](//able99.github.io/bnorth/components/)

## LICENSE

MIT

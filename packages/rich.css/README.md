# rich.css

## 使用方法

```sh
npm install --save @bnorth/rich.css
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '@bnorth/rich.css/css/normalize.css';
import genCss from '@bnorth/rich.css';
import { getCssConfig, setCssConfig } from '@bnorth/rich.css/lib/gen';

let { textColors } = getCssConfig();
textColors.normal = '#222222';
setCssConfig({textColors});
genCss();

ReactDOM.render(
  <div className="text-color-primary">text</div>,
  document.getElementById('root')
);
```

## bnorth api 文档

[Documents](//able99.github.io/bnorth/richcss/)

## LICENSE

MIT
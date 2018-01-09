# 工程配置

## 工程配置

根目录下的，bnorth.config.js。配置发布环境： bnroth.config.prod.js, 配置开发环境： bnroth.config.dev.js。

**bail** 出错时是否停止，默认停止

**devtool** 配置sourcemap，开发环境默认为cheap-module-eval-source-map，生产环境为false。

**outputPath** 配置[输出路径](http://webpack.github.io/docs/configuration.html#output-path)，默认是 ./dist。

**outputFilename**: 配置输出文件的模式，默认为'[name].[hash:8].js'即hash文件名

**outputPublicPath** 配置生产环境的 [publicPath](http://webpack.github.io/docs/configuration.html#output-publicpath)，开发环境下永远为 /。

**outputChunkFilename** 配置chunk文件的模式，默认为'[name].[chunkhash:8].async.js',

**resolveExtensions: ['.js', '.json', '.jsx']** **resolveExtensionsExtra: []** 两个参数配合追加和替换默认的文件扩展名识别

**autoprefixConfig** 配置prefix，默认配置css浏览器兼容 { browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', ], },

**externals** 配置 webpack 的 [externals](http://webpack.github.io/docs/configuration.html#externals) 属性。

**extractCss** css 打包到js 中还是抽取成css， 默认不抽取


## html 模板

src 目录下的 index.ejs 文件，会作为webpack 的html 文件模板


## public

编译时，会将public 文件夹中的文件直接拷贝到输出目录中


### proxy

配置代理，详见 [webpack-dev-server#proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy)。

比如在本地调试时，发到本地的请求代理到实际服务器上：

```
"proxy": {
  "/api": {
    "target": "http://api.com/",
    "changeOrigin": true,
  }
}
```

### mock

mock数据支持

```js
module.exports = {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1,2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },

  // Forward 到另一个服务器
  'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',
};
```


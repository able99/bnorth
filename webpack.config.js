'use strict';

const webpack = require('webpack');
const fs = require('fs-extra');
const path = require('path');


module.exports = env=>{
  if(env.NODE_ENV) process.env.NODE_ENV = env.NODE_ENV;
  let entrys = {
    index: "./src/index.js",
    app: "./src/base/app.js",
    router: "./src/base/router.js" 
  }
  let src = './src/plugins/';
  var plugins=fs.readdirSync(src); 
  for(let i of plugins){
    if(i[0]==='.') continue;
    let pathname = path.join(src,i);
    let stat = fs.statSync(pathname);
    if(stat.isFile()) entrys["plugins/"+path.basename(i,'.js')] = "./"+pathname;
  }

  return {
    bail: true,
    entry: entrys,
    externals: [
      'react',
      'react-dom',
      'create-react-class',
      'fbjs',
      'regenerator-runtime',
    ],
    output: {
      path: require('path').resolve(__dirname, 'dist'), 
      filename: "[name].js",
      library: 'bnorth',
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['.js'],
    },
    resolveLoader: {
      moduleExtensions: ['-loader'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: "pre",
          include: require('path').resolve(__dirname, "src"), 
          exclude: /node_modules/,
          use: [ "eslint" ],
        },
        {
          test: /\.(js|jsx)$/,
          include: require('path').resolve(__dirname, "src"), 
          exclude: /node_modules/,
          use: [ "babel" ],
        },
      ]
    },
    plugins: [
      //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    ],
    node: { fs: 'empty', net: 'empty', tls: 'empty' },
  }
};

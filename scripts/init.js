/**
 * Copyright (c) 2017-present, able99
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');
var chalk = require('chalk');

var isDoWelcome = process.argv.indexOf("welcome") >= 0;
var isDoProject = process.argv.indexOf("project") >= 0;
var isDoSrc = process.argv.indexOf("src") >= 0;
var isDoLib = process.argv.indexOf("lib") >= 0;
var isDoAndroid = process.argv.indexOf("android") >= 0;
var isDoIos = process.argv.indexOf("ios") >= 0;
var isDoHelp = process.argv.indexOf("help") >= 0;

var appPath = process.cwd();
var appPackage = require(path.join(appPath,'package.json'));
var appName = appPackage.name;

if(isDoWelcome){
  console.log(`init bnorth app name=${appName} apppath=${appPath}`);
}

//=====================================================
// project
if(isDoProject){
  console.log(`create project file...`);

  // dir
  fs.copySync(path.join(__dirname, '..', 'template', "base-project"), appPath);

  fs.copySync(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'));
  fs.remove(path.join(appPath, 'gitignore'), function (err) {});

  fs.copySync(path.join(__dirname, '..', 'README.md'), path.join(appPath, 'README.md'));

  // package
  appPackage.homepage = "./";
  appPackage.dependencies = {
    "react": "^15.4.1",
    "react-addons-css-transition-group": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-progress-bar-plus": "^1.2.0",
    "react-redux": "^4.4.6",
    "react-redux-meteor": "^4.5.1",
    "react-router": "^3.0.0",
    "redux": "^3.6.0",
    "redux-logger": "^2.7.4",
    "redux-thunk": "^2.1.0",
    "moment": "^2.18.1",
    "whatwg-fetch": "2.0.2",
  };
  appPackage.devDependencies = {
    "autoprefixer": "6.7.2",
    "babel-core": "6.22.1",
    "babel-eslint": "7.1.1",
    "babel-jest": "18.0.0",
    "babel-loader": "6.2.10",
    "babel-polyfill": "^6.23.0",
    "babel-preset-react-app": "^2.2.0",
    "babel-runtime": "^6.20.0",
    "case-sensitive-paths-webpack-plugin": "1.1.4",
    "connect-history-api-fallback": "1.3.0",
    "css-loader": "0.26.1",
    "detect-port": "1.1.0",
    "dotenv": "2.0.0",
    "eslint": "3.16.1",
    "eslint-config-react-app": "^0.6.2",
    "eslint-loader": "1.6.0",
    "eslint-plugin-flowtype": "2.21.0",
    "eslint-plugin-import": "2.0.1",
    "eslint-plugin-jsx-a11y": "4.0.0",
    "eslint-plugin-react": "6.4.1",
    "extract-text-webpack-plugin": "1.0.1",
    "file-loader": "0.10.0",
    "html-webpack-plugin": "2.24.0",
    "http-proxy-middleware": "0.17.3",
    "jest": "18.1.0",
    "json-loader": "0.5.4",
    "node-sass": "^4.3.0",
    "object-assign": "4.1.1",
    "postcss-loader": "1.2.2",
    "promise": "7.1.1",
    "react-dev-utils": "^0.5.2",
    "sass-loader": "^4.1.1",
    "style-loader": "0.13.1",
    "url-loader": "0.5.7",
    "webpack": "1.14.0",
    "webpack-dev-server": "1.16.2",
    "webpack-manifest-plugin": "1.1.0",
  };
  appPackage.scripts = {
    "init": "bnorth init",

    "start": "bnorth start",
    "build": "bnorth build",
    "test": "bnorth test --env=jsdom",
    "eject": "bnorth eject",

    "page": "bnorth page",
    "component": "bnorth component",
    
    "plugin": "bnorth plugin",
    "appprepare": "bnorth appprepare",
    "appbuild": "bnorth appbuild",
    "allbuild": "bnorth build && bnorth appbuild",

    "publish": "bnorth build && bnorth appbuild build --release --device && bnorth publish"
  };
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  console.log(`npm run...`);
  var proc = spawn.sync('npm', ['i'], {stdio: 'inherit'});
  if (proc.status !== 0) {
    console.error('error!');
    return;
  }
}

//===============================
// src
if(isDoSrc){
  console.log(`create src file...`);
  fs.copySync(path.join(__dirname, '..', 'template', "base-src"), appPath);
}

//===============================
// lib
if(isDoLib){
  console.log(`create lib file...`);
  fs.copySync(path.join(__dirname, '..', 'template', "base-lib"), appPath);
}

//===============================
// app
if(isDoAndroid||isDoIos){
  console.log(`create app file...`);
  var appCordovaXml = path.join(__dirname, '..', 'template', "config.xml");
  fs.copySync(path.join(__dirname, '..', 'template', "base-cordova"), appPath);
    var data = fs.readFileSync(appCordovaXml).toString();
    //name
    data = data.replace("<name>bnorth</name>",`<name>${appName}</name>`);
    data = data.replace('id="com.able99.bnorth"',`id="com.able99.${appName}"`);
    //android engine
    if(!isDoAndroid)data = data.replace(/<engine.*name="android".*\/>/,"");
    if(!isDoIos)data = data.replace(/<engine.*name="ios".*\/>/,"");
    fs.writeFileSync(path.join(appPath, 'config.xml'), data);

  console.log(`app prepare...`);
  var command = 'npm';
  var args = [
    'run',
    'appprepare',
  ];
  if(isDoAndroid&&!isDoIos)args.push("android");
  if(!isDoAndroid&&isDoIos)args.push("ios");
  var proc = spawn.sync(command, args, {stdio: 'inherit'});
  if (proc.status !== 0) {
    console.error('error!');
    return;
  }
}

//===============================
// success
let doc = 
`
npm run init [project] [src] [lib] [android] [ios]
重新初始化工程指定部分
project: 拷贝功能的配置文件，包括gitignore,签名配置文件等
src: 初始化为示例工程代码
lib: 更新bnorth库文件
android: 初始化android工程的配置，初始化后工程将支持生成android安装包
ios: 初始化ios工程的配置，初始化后工程将支持生成ios安装包

npm start
启动调试服务器，并自动在浏览器中打开，可查看和调试工程代码

npm run page name [des]
模板建立名称为name参数的页面源码到工程src/pages[/des]中

npm run component name
将bnorth库中提供的额外功能组件添加到工程中使用，如百度地图等

npm run build
优化并打包高效且混淆后的h5发布文件

npm run appprepare

npm run appbuild

npm run allbuild

npm run publish

npm run plugin [plugin name]
模板建立cordova插件，为混合应用提供扩展功能
`
if(isDoHelp) {
  console.log(`------------welcome to bnoth------------`);
  console.log(doc);
  console.log(`more info see ${chalk.cyan('https://github.com/able99/bnorth/blob/master/README.md')}`);
  console.log(`----------------------------------------`);
}
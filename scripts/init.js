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
var bnorthPackage = require(path.join(__dirname, '..', 'package.json'));
var appName = appPackage.name;

if(isDoWelcome){
  console.log(`------------welcome to bnoth----------------`);
  console.log(`init bnorth app name=${appName} apppath=${appPath}`);
  console.log(`--------------------------------------------`);
}

//=====================================================
// project
if(isDoProject){
  console.log(`generating project file...`);
  console.log(`--------------------------------------------`);

  // project file
  fs.copySync(path.join(__dirname, '..', 'gitignore'), path.join(appPath, '.gitignore'));
  fs.copySync(path.join(__dirname, '..', 'README.md'), path.join(appPath, 'README.md'));

  // package file
  appPackage.homepage = "./";console.log(111,appPackage.dependencies);
  appPackage.dependencies = Object.assign(appPackage.dependencies||{}, bnorthPackage.devDependencies);
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

  // npm install
  console.log(`npm run...`);
  console.log(`--------------------------------------------`);
  var proc = spawn.sync('npm', ['i'], {stdio: 'inherit'});
  if (proc.status !== 0) {
    console.error('error!');
    return;
  }
}

//===============================
// src
if(isDoSrc){
  console.log(`generating src file...`);
  console.log(`--------------------------------------------`);
  fs.copySync(path.join(__dirname, '..', 'public/'), path.join(appPath, 'public/'));
  fs.copySync(path.join(__dirname, '..', 'src/styles/'), path.join(appPath, 'src/styles/'));
  fs.copySync(path.join(__dirname, '..', 'src/routes/'), path.join(appPath, 'src/routes/'));
  fs.copySync(path.join(__dirname, '..', 'src/res/'), path.join(appPath, 'src/res/'));
  fs.copySync(path.join(__dirname, '..', 'src/pages/'), path.join(appPath, 'src/pages/'));
  fs.copySync(path.join(__dirname, '..', 'src/index.js'), path.join(appPath, 'src/index.js'));
}

//===============================
// lib
if(isDoLib){
  console.log(`generating lib file...`);
  console.log(`--------------------------------------------`);
  fs.copySync(path.join(__dirname, '..', 'src', "bnorth/"), path.join(appPath, 'src', 'bnorth/'));
}

//===============================
// app
if(isDoAndroid||isDoIos){
  console.log(`create app file...`);

  if(!fs.existsSync(path.jpin(appPath, 'sign/'))){
    fs.copySync(path.join(__dirname, '..', 'sign/'), path.join(appPath, 'sign/'));
  }

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
  console.log(`------------------ bnoth----------------`);
  console.log(doc);
  console.log(`more info see ${chalk.cyan('https://github.com/able99/bnorth/blob/master/README.md')}`);
  console.log(`----------------------------------------`);
}
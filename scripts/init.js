/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';

var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');
var chalk = require('chalk');
let nunjucks = require('nunjucks');

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
  console.log(`* generating project file...`);

  // project file
  fs.copySync(path.join(__dirname, '..', 'gitignore'), path.join(appPath, '.gitignore'));
  fs.copySync(path.join(__dirname, '..', 'README.md'), path.join(appPath, 'README.md'));
  fs.copySync(path.join(__dirname, '..', 'template', 'publish/'), path.join(appPath, 'publish/'));

  // package file
  appPackage.homepage = "./";
  appPackage.dependencies = Object.assign(appPackage.dependencies||{}, bnorthPackage.devDependencies);
  appPackage.scripts = {
    "init": "bnorth init",

    "start": "bnorth start",
    "build": "bnorth build",
    "test": "bnorth test --env=jsdom",
    "eject": "bnorth eject",

    "page": "bnorth page",
    "component": "bnorth component",
    
    "app": "bnorth app",
    "plugin": "bnorth plugin",
    
    "publish": "bnorth publish"
  };
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  // npm install
  console.log(`* npm run...`);
  var proc = spawn.sync('npm', ['i'], {stdio: 'inherit'});
  if (proc.status !== 0) {
    console.error('error!');
    return;
  }
}

//===============================
// src
if(isDoSrc){
  console.log(`* generating src file...`);
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
  console.log(`* generating lib file...`);
  fs.copySync(path.join(__dirname, '..', 'src', "bnorth/"), path.join(appPath, 'src', 'bnorth/'));
}

//===============================
// app
if(isDoAndroid||isDoIos){
  console.log(`* generating app file...`);

  if(!fs.existsSync(path.join(appPath, 'sign/'))){
    fs.copySync(path.join(__dirname, '..', 'sign/'), path.join(appPath, 'sign/'));
  }

  if(!fs.existsSync(path.join(appPath, 'www/'))){
    fs.mkdirSync(path.join(appPath, 'www/'));
  }

  if(!fs.existsSync(path.join(appPath, 'res/'))){
    fs.copySync(path.join(__dirname, '..', 'template', 'cordova-res'), path.join(appPath, 'res/'));
  }

  if(!fs.existsSync(path.join(appPath, 'config.xml'))){
    let tpl = fs.readFileSync(path.join(__dirname, '..', 'template', "cordova-project", 'config.xml')).toString();
    let data = nunjucks.renderString(tpl, { 
      name: appName||'bnorth',
      version: appPackage.version||'1.0.0',
      code: (new Date).getTime() / 1000 / 60,
      email: appPackage.email||'',
      author: appPackage.author||'',
      ios: isDoIos,
      android: isDoAndroid,
    });
    fs.writeFileSync(path.join(appPath, 'config.xml'), data);
  }

  console.log(`* trigger app prepare...`);
  var command = 'npm';
  var args = [
    'run',
    'app',
    'prepare',
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
project: 初始化工程的配置文件，包括readme,gitignore,签名配置文件等
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


npm run app

执行cordova命令,并自动处理配置好的签名参数. 默认执行cordova build


npm run plugin [plugin name]

模板建立cordova插件，为混合应用提供扩展功能


npm run publish [h5] [android] [ios]

编译并发布到项目的release目录,没有参数将全部发布
`

if(isDoHelp) {
  console.log(`*******bnoth****************************`);
  console.log(doc);
  console.log(`more info see ${chalk.cyan('https://github.com/able99/bnorth/blob/master/README.md')}`);
  console.log(`----------------------------------------`);
}
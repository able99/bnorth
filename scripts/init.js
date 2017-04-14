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

var isDoStartInfo = process.argv.indexOf("start") >= 0;
var isDoProject = process.argv.indexOf("project") >= 0;
var isDoSrc = process.argv.indexOf("src") >= 0;
var isDoLib = process.argv.indexOf("lib") >= 0;
var isDoAndroid = process.argv.indexOf("android") >= 0;
var isDoIos = process.argv.indexOf("ios") >= 0;
var isDoEndInfo = process.argv.indexOf("end") >= 0;

var appPath = process.cwd();
var appPackage = require(path.join(appPath,'package.json'));
var appName = appPackage.name;

if(isDoStartInfo){
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

  };
  appPackage.devDependencies = {
  };
  appPackage.scripts = {
    "init": "bnorth init",

    "start": "bnorth start",
    "build": "bnorth build",
    "test": "bnorth test --env=jsdom",
    "eject": "bnorth eject",
    
    "appprepare": "bnorth appprepare",
    "appbuild": "bnorth appbuild",
    "allbuild": "bnorth build && bnorth appbuild",

    "publish": "bnorth build && bnorth appbuild build --release --device && bnorth publish"
  };
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );
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
if(isDoEndInfo) {
  console.log(`
welcome to bnorth
  ${chalk.cyan('npm init')}
  Init project, with args start(info) project src lib android ios end(info).
  ${chalk.cyan('npm start')}
  Starts the development server.
  ${chalk.cyan('npm run build')}
  Bundles the app into static files for production.
  ${chalk.cyan('npm run appprepare')}
  Prepare app file,suce as android project,icons ,ets...
  ${chalk.cyan('npm run appbuild')}
  App build.
  ${chalk.cyan('npm run allbuild')}
  Build and app build.
  ${chalk.cyan('npm run publish')}
  App release and copy to release directory.
  `   );
}
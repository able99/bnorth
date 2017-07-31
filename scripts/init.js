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
  ${chalk.cyan('npm run plugin [plugin name]')}
  Create cordova plugin

  ${chalk.cyan('npm run init [project|src|lib|android|ios]')}
  BNorth init srcipt,
  `);
}
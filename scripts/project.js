/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
console.log('bnorth project...');
var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');

var isDoAll = process.argv.indexOf("all") >= 0;
var isDoWelcome = isDoAll||process.argv.indexOf("welcome") >= 0;
var isDoProject = isDoAll||process.argv.indexOf("project") >= 0;
var isDoSrc = isDoAll||process.argv.indexOf("src") >= 0;
var isDoAndroid = isDoAll||process.argv.indexOf("android") >= 0;
var isDoIos = isDoAll||process.argv.indexOf("ios") >= 0;
var isDoHelp = isDoAll||process.argv.indexOf("help") >= 0;

var bnorthInPath = path.join('','node_modules','bnorth');
var appPath = process.cwd();
if(appPath.indexOf(bnorthInPath)>=0) {
   process.chdir('../../');
   appPath = process.cwd();
}
var appPackage = require(path.join(appPath,'package.json'));
var appName = appPackage.name;
var bnorthPath = path.join(appPath, bnorthInPath);

if(appPackage.bnorth === true) {
  console.log('is bnorth project, exit');
  process.exit(0);
}
if(appPackage.bnorth === false) {
  console.log('not bnorth project, skip');
  process.exit(0);
}

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
  fs.copySync(path.join(bnorthPath, 'templates', 'project_base'), path.join(appPath));

  // package file
  appPackage.bnorth = true;
  //appPackage.devDependencies = Object.assign(appPackage.devDependencies||{}, {});
  appPackage.scripts = {
    "start": "bnorth server",
    "build": "bnorth build",
    "bnorth": "bnorth",
  };
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  // npm install
  // console.log(`* npm run...`);
  // var proc = spawn.sync('npm', ['i'], {stdio: 'inherit'});
  // if (proc.status !== 0) {
  //   console.error('error!');
  //   return;
  // }
}

// src
//=====================================================
if(isDoSrc){
  console.log(`* generating src file...`);

  // project file
  fs.copySync(path.join(bnorthPath, 'templates', 'src_base'), path.join(appPath));
}

// help
//=====================================================
if(isDoHelp) {
  let str = fs.readFileSync(path.join(bnorthPath, 'templates', 'project_base', 'README.md')).toString();
  console.log(`------------bnoth installed-------------`);
  console.log(str);
  console.log(`----------------------------------------`);
}
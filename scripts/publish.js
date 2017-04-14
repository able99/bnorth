/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var fs = require('fs-extra');
var spawn = require('cross-spawn');
var path = require('path');
var appPath = process.cwd();
var appConfigPath = path.join(appPath,"config.xml");

var isH5 = process.argv.filter(function(v){return v==="h5"}).length>0;
var isApp = fs.existsSync(appConfigPath);
var isAndroid = false;
var isIos = false;
if(isApp){
	var data = fs.readFileSync(appConfigPath).toString();
	var name = data.match(/<name>(\w*)<\/name>/)[1];
	var isAndroid = /<engine.*name="android".*\/>/.test(data);
	var isIos = /<engine.*name="ios".*\/>/.test(data);
}

console.log(`publishing h5=${isH5} android=${isAndroid} ios=${isIos}`);

if(isH5)fs.copySync(path.join(appPath,'www'),path.join(appPath,"release/h5"));

if(isAndroid)fs.copySync(path.join(appPath,'platforms/android/build/outputs/apk/android-release.apk'),path.join(appPath,`release/${name}.apk`));

if(isIos)fs.copySync(path.join(appPath,'platforms/ios/build/device/HaveFunner.ipa'),path.join(appPath,`release/${name}.ipa`));


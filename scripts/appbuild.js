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

var args = process.argv.slice(2);
console.log('cordova build...',args);
var appPath = process.cwd();
var signPath = path.join(appPath,'sign/build.json');
var sign = Boolean(fs.existsSync(signPath) && require(signPath).sign);



var command = 'cordova';
if(args.length<=0)args.push("build");
if(sign&&args.filter(function(v){}).length<=0){args.push("--buildConfig");args.push("sign/build.json")};

console.log("args:",args);
var proc = spawn.sync(command, args, {stdio: 'inherit'});


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

var name = process.argv[3];
var appPath = process.cwd();
var pluginPath = path.join(appPath,"natives");


console.log(`create plugin template with name:${name}...`);


fs.copySync(path.join(__dirname, '..', 'template', "ACPSTemplate/"), path.join(pluginPath, name));

renameFileString(path.join(pluginPath, name, "plugin.xml"), "ACPSTemplate", name);
renameFileString(path.join(pluginPath, name, "www", "main.js"), "ACPSTemplate", name);
renameFileString(path.join(pluginPath, name, "src", "android","able99","cps","ACPSTemplate.java"), "ACPSTemplate", name);
renameFileString(path.join(pluginPath, name, "src", "ios","ACPSTemplate.h"), "ACPSTemplate", name);
renameFileString(path.join(pluginPath, name, "src", "ios","ACPSTemplate.m"), "ACPSTemplate", name);
renameFileString(path.join(pluginPath, name, "www", "main.js"), "ACPSTemplate", name);

renameFileName(path.join(pluginPath, name, "src", "ios","ACPSTemplate.h"),"ACPSTemplate",".h");
renameFileName(path.join(pluginPath, name, "src", "ios","ACPSTemplate.m"),"ACPSTemplate",".m");
renameFileName(path.join(pluginPath, name, "src", "android","able99","cps","ACPSTemplate.java"),"ACPSTemplate",".java");

function renameFileString(pathname, from , to){
    var data = fs.readFileSync(pathname).toString();
    data = data.replace((new RegExp(from, 'g')),to);
    fs.writeFileSync(pathname, data);
}

function renameFileName(pathname, name, ext){
    moveSync(pathname, pathname.replace(path.basename(pathname,ext)),name);
}
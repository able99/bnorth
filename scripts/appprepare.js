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
var path = require('path');
var spawn = require('cross-spawn');
var chalk = require('chalk');

var appPath = process.cwd();
var appPlatform = process.argv[2];

console.log(`
start app prepare appPlatform=${appPlatform||"all"}
`);

//make res
if(fs.existsSync("res/icon-template.png")){
	console.log('crop res icon and splash...');
	if(process.platform!=='darwin'){
	  console.log(chalk.error('not support res crop without mac os, pls crop manual if need'));
	}else{
		var icons = [
			{size:60,name:'-60'},
			{size:120,name:'-60@2x'},
			{size:180,name:'-60@3x'},

			{size:76,name:'-76'},
			{size:152,name:'-76@2x'},

			{size:40,name:'-40'},
			{size:80,name:'-40@2x'},

			{size:57,name:''},
			{size:144,name:'@2x'},

			{size:72,name:'-72'},
			{size:144,name:'-72@2x'},

			{size:29,name:'-small'},
			{size:58,name:'-small@2x'},
			{size:87,name:'-small@3x'},

			{size:50,name:'-50'},
			{size:100,name:'-50@2x'},

			{size:167,name:'-83.5@2x'},

			{size:48,name:'-48'},
			{size:144,name:'-144'},
		];
		for(let icon of icons){
			var command = 'sips';
			var args = [
			  'res/icon-template.png',
			  '-Z',
			  icon.size,
			  '--out',
			  `res/icon${icon.name}.png`
			];
			var proc = spawn.sync(command, args, {stdio: 'inherit'});
		}
	}
}else{
	console.log('no icon template!');
}


//cordova prepare
console.log('cordova prepare...');
var command = 'cordova';
var args = [
  'prepare',
];
if(appPlatform)args.push(appPlatform);
var proc = spawn.sync(command, args, {stdio: 'inherit'});

//move res
if(!appPlatform||appPlatform==="android"){
	console.log('copy dir res to android project for cordova bug ...');
	var files = fs.readdirSync("./res")
  files.forEach(function (file) {
    if(file.indexOf('mipmap-')===0||file.indexOf('drawable-')===0){
    	console.log(file);
    	fs.copySync("./res/"+file, path.join(appPath, 'platforms/android/res/'+file));
		  fs.remove(path.join(appPath,"res",file), function (err) {});
    }
  })
}
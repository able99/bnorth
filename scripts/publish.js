/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';

var fs = require('fs-extra');
var spawn = require('cross-spawn');
var path = require('path');
var appPath = process.cwd();
var appConfigPath = path.join(appPath,"config.xml");

var hasH5 = process.argv.indexOf('h5')>=0;
var hasIos = process.argv.indexOf('ios')>=0;
var hasAndroid = process.argv.indexOf('android')>=0;
if(!hasH5&&!hasIos&&!hasAndroid){
	hasH5 = true;
	hasIos = true;
	hasAndroid = true;
}

var isH5 = true;
var isApp = fs.existsSync(appConfigPath);
var isAndroid = false;
var isIos = false;
if(isApp){
	var data = fs.readFileSync(appConfigPath).toString();
	var name = data.match(/<name>(\w*)<\/name>/)[1];
	var isAndroid = /<engine.*name="android".*\/>/.test(data);
	var isIos = /<engine.*name="ios".*\/>/.test(data);
}


console.log(`------------publishing----------------------`);
console.log(`name=${name} h5=${isH5} android=${isAndroid} ios=${isIos}`);
console.log(`publish h5=${hasH5} publish ios=${hasIos} publish android=${hasAndroid}`);
console.log(`--------------------------------------------`);

console.log(`* build`);
if(isH5){
	console.log(`** h5 build`);
	var proc = spawn.sync('npm', ['run','build'], {stdio: 'inherit'});
	if (proc.status !== 0) {
	    console.error('!error');
	    process.exit(proc.status);
	}
}

if(isIos && hasIos){
	console.log(`** app build`);
	var proc = spawn.sync('npm', ['run', 'app', 'build', 'ios', '--release', '--device'], {stdio: 'inherit'});
	if (proc.status !== 0) {
	    console.error('!error');
	    process.exit(proc.status);
	}
}

if(isAndroid && hasAndroid){
	console.log(`** app build`);
	var proc = spawn.sync('npm', ['run', 'app', 'build', 'android', '--release', '--device'], {stdio: 'inherit'});
	if (proc.status !== 0) {
	    console.error('!error');
	    process.exit(proc.status);
	}
}

console.log(`* publish`);
if(isH5&&hasH5){
	let script = path.join(appPath, 'publish', 'h5.js');
	if(fs.existsSync(script)){
		let proc = spawn.sync(
		  'node',
		  [script, name],
		  {stdio: 'inherit'}
		);
		if (proc.status !== 0) {
		    console.error('!error');
		    process.exit(proc.status);
		}
	}else{
		console.error('!no script');
	}
}
if(isIos&&hasIos){
	let script = path.join(appPath, 'publish', 'ios.js');
	if(fs.existsSync(script)){
		let proc = spawn.sync(
		  'node',
		  [script, name],
		  {stdio: 'inherit'}
		);
		if (proc.status !== 0) {
		    console.error('!error');
		    process.exit(proc.status);
		}
	}else{
		console.error('!no script');
	}
}
if(isAndroid&&hasAndroid){
	let script = path.join(appPath, 'publish', 'android.js');
	if(fs.existsSync(script)){
		let proc = spawn.sync(
		  'node',
		  [script, name],
		  {stdio: 'inherit'}
		);
		if (proc.status !== 0) {
		    console.error('!error');
		    process.exit(proc.status);
		}
	}else{
		console.error('!no script');
	}
}

console.log(`--------------------------------------------`);


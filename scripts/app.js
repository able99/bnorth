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
try{
	var images = require("images");
}catch(e){
	console.error('icon process tool loading fail, pls reinstall images(npm install images) and make suer your node version is supported by images, or manual processing of icons ');
}

var args = process.argv.slice(2);
var appPath = process.cwd();
var preparePlatform = process.argv[3];
var h5 = args.indexOf('h5')>=0;args = args.filter((v)=>{return v!=='h5'});

var signPath = 'sign/build.json';
var sign = Boolean(fs.existsSync(path.join(appPath,signPath)) && require(path.join(appPath,signPath)).sign);
var androidResPath = 'platforms/android/res/';
var resPath = 'res/';
var iconTemplate = 'icon-template.png';
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

console.log(`-------call cordova...----------------------`);
console.log(`args=${args}`);
console.log(`--------------------------------------------`);

function prepareMakeRes(){
	if(!fs.existsSync(`${resPath}${iconTemplate}`)){
		
	}else{
		console.log('* make res...');
		if(images){
			icons.forEach((v)=>{
				images(path.join(appPath,`${resPath}${iconTemplate}`)) 
			    .size(v.size)
			    .save(path.join(appPath,`${resPath}icon${v.name}.png`));
			})
		}else{
			console.error('!no images lib for icon processing');
		}
	}
}

function prepareDoCordovaPrepare(){
	//cordova prepare
	console.log('* cordova prepare...');
	var command = 'cordova';
	var args = [
	  'prepare',
	];
	if(preparePlatform)args.push(preparePlatform);
	var proc = spawn.sync(command, args, {stdio: 'inherit'});

	//move res
	if(!preparePlatform||preparePlatform==="android"){
		console.log('* copy dir res to android project for cordova bug');
		var files = fs.readdirSync(`${resPath}`)
	    files.forEach(function (file) {
	        if(file.indexOf('mipmap-')===0||file.indexOf('drawable-')===0){
	    	    fs.copySync(path.join(appPath,resPath,file), path.join(appPath, androidResPath, file));
			    fs.remove(path.join(appPath,resPath,file), function (err) {});
	        }
	    })
	}
}

function runPrepare() {
	prepareMakeRes();
	prepareDoCordovaPrepare();
}

function runOther(){
	console.log('* cordova');
	console.log("| sign:",sign||'no sign config');
	console.log("| h5:",Boolean(h5));

	if(h5){
		console.log(`** h5 build`);
		var proc = spawn.sync('npm', ['run','build'], {stdio: 'inherit'});
		if (proc.status !== 0) {
		    console.error('error!');
		    process.exit(proc.status);
		}
	}

	if(args.length<=0)args.push("build");
	if(sign&&(args.indexOf('build')>=0||args.indexOf('run')>=0)){args.push("--buildConfig");args.push(signPath)};
	var proc = spawn.sync('cordova', args, {stdio: 'inherit'});
	if (proc.status !== 0) {
	    console.error('!error');
	    process.exit(proc.status);
	}
}

(args.indexOf('prepare')>=0?runPrepare:runOther)();
console.log(`--------------------------------------------`);



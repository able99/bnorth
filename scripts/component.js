/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';

var fs = require('fs-extra');
var path = require('path');

var appPath = process.cwd();
let name = process.argv[2];

console.log(`-------generating component-----------------`);
console.log(`name=${name}`);
console.log(`--------------------------------------------`);

let componentPath = path.join(__dirname, '..', 'template', "components", `BC${name}.js`);

if(!fs.existsSync(componentPath)){
	console.error(`!generating component: error=no component name`);
	let components = fs.readdirSync(path.join(__dirname, '..', 'template', "components"));
	console.log(`|list components:`);
	console.log(
		components
		.map(function(v){
			return v.slice(2).replace('.js','');
		})
		.reduce(function(v1,v2){
			return v1 + v2 + '\n';
		},"")
	);
	return;
}

try{
	fs.copySync(componentPath, path.join(appPath,'src','pages','components',`BC${name}.js`));
}catch(e){
	console.error(`!generating component: error=${+e.message}`);
	return;
}

console.log(`*******done and code is:(pls justify relative path by your self)*******`);
console.log(`import BC${name} from './components/BC${name}'`);
console.log(`-----------------------------------------------------------------------`);
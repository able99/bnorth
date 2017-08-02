/**
 * Copyright (c) 2017-present, able99
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

let fs = require('fs-extra');
let path = require('path');
let nunjucks = require('nunjucks')

let appPath = process.cwd();
let name = process.argv[2];
let des = process.argv[3] || '';

if(!name){
  console.error(`generating page: error=no page name`);
  return;
}
console.log(`-------generating page: name=${name} des=${des}-------`);
console.log(`------------------------------------------------------`);


let tpl;
let data;
let levels = des.split('/')
.filter((v)=>{
	return v;
})
.map((v)=>{
	return '..';
})
.join('/');
levels = `../${levels}${levels?'/':''}`;

tpl = fs.readFileSync(path.join(__dirname, '..', 'template', "pages", 'page.tpl')).toString();
data = nunjucks.renderString(tpl, { name: name, levels: levels });
fs.writeFileSync(path.join(appPath,'src','pages',des,`${name}.js`), data);

tpl = fs.readFileSync(path.join(__dirname, '..', 'template', "pages", '_page.tpl')).toString();
data = nunjucks.renderString(tpl, { name: name, levels: levels });
fs.writeFileSync(path.join(appPath,'src','pages',des,`_${name}.js`), data);

console.log(`-------done and the route is-------`);
console.log(`done and the route is:`);
let options = des?`, {prefix:'${des}/'}`:'';
console.log(`<Route {...createRouteProps('${name}'${options})}></Route>`);
console.log(`-----------------------------------`);

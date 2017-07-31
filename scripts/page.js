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

var appPath = process.cwd();

let name = process.argv[2];
let type = process.argv[3] || 'normal';

if(!name){
  console.log(`no component name`);
}
console.log(`component: name=${name} type=${type}`);

//=====================================================
// do
console.log(`copy component:${name}`);
switch(type){
  case 'normal':
    fs.copySync(path.join(__dirname, '..', 'template', "pages", type, 'page.js'), path.join(appPath,'src','pages',`${name}.js`));
    fs.copySync(path.join(__dirname, '..', 'template', "pages", type, '_page.js'), path.join(appPath,'src','pages',`_${name}.js`));
    console.log(`route:`);
    console.log(`<Route {...createRouteProps('${name}',{prefix:''})} />`);
  default:
    console.log(`no template`);
}
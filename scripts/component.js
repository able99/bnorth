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
if(!name){
  console.log(`no component name`);
}

//=====================================================
// do
console.log(`copy component:${name}`);

try{
	fs.copySync(path.join(__dirname, '..', 'template', "components", `BC${name}.js`), path.join(appPath,'src','pages','components',`BC${name}.js`));
}catch(e){
	console.error(`error:`+e.message);
	return;
}
console.log(`done and code is:(pls justify relative path by your self)`);
console.log(`import BC${name} from './components/BC${name}'`);
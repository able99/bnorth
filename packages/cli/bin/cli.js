#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
let fs = require('fs-extra');
let spawn = require('cross-spawn');
let script = process.argv[2];
let args = process.argv.slice(3);


let scriptPath = `${__dirname}/../lib/${script}.js` 
console.log(1111,scriptPath);
if(!fs.existsSync(scriptPath)){
  console.log(`unknown sub command '${script}'`);
  return;
}

let result = spawn.sync(
  'node',
  [require.resolve(scriptPath)].concat(args),
  {stdio: 'inherit'}
);

if (result.signal) {
  console.log(`exit with signal: ${result.signal}`);
  process.exit(1);
}else{
  process.exit(result.status);
}
  

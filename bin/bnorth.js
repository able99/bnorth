#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

let spawn = require('cross-spawn');
let script = process.argv[2];
let args = process.argv.slice(3);
let fs = require('fs-extra');
let chalk = require('chalk');


let scriptPath = `../scripts/${script}` 
if(!fs.existsSync(require.resolve(scriptPath))){
  console.log(`Unknown command '${script}'`);
  console.log(`Update or see ${chalk.cyan('https://github.com/able99/bnorth/blob/master/README.md')}`);
  return;
}


let result = spawn.sync(
  'node',
  [require.resolve(scriptPath)].concat(args),
  {stdio: 'inherit'}
);

if (result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. ' +
      'This probably means the system ran out of memory or someone called ' +
      '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. ' +
      'Someone might have called `kill` or `killall`, or the system could ' +
      'be shutting down.'
    );
  }
  process.exit(1);
}
process.exit(result.status);
  
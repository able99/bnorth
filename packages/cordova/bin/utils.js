#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */
'use strict';
let spawn = require('cross-spawn');
const { descPath, ownMoudles, ownMoudlesBin } = require('./const');

function runCordova(argv=[]) {
  process.env.NODE_PATH = process.env.NODE_PATH?(process.env.NODE_PATH+':'+ownMoudles):ownMoudles;
  process.env.PATH = process.env.PATH?(process.env.PATH+':'+ownMoudlesBin):ownMoudlesBin;

  let result = spawn.sync(
    'npx', ['cordova', ...argv],
    { stdio: 'inherit', cwd: descPath }
  );
  return result.status;
}

module.exports = {
  runCordova,
}
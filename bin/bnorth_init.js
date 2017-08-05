#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */
 
'use strict';

var spawn = require('cross-spawn');

var argPlatform = process.argv[2];
var isAndroid = Boolean(argPlatform==="all"||argPlatform==="android");
var isIos = Boolean(argPlatform==="all"||argPlatform==="ios");

var args = [
  'welcome',
  "project",
  "src",
  "lib",
  isAndroid?"android":"",
  isIos?"ios":"",
  'help',
];
var result = spawn.sync(
  'node',
  [require.resolve('../scripts/' + 'init')].concat(args),
  {stdio: 'inherit'}
);

if (result.status !== 0) {
    console.error('`'  + ' ' + args.join(' ') + '` failed');
    return;
}
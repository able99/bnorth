'use strict';

var spawn = require('cross-spawn');

var argPlatform = process.argv[2];
var isAndroid = Boolean(argPlatform==="all"||argPlatform==="android");
var isIos = Boolean(argPlatform==="all"||argPlatform==="ios");

var args = [
  'start',
  "project",
  "src",
  "lib",
  isAndroid?"android":"",
  isIos?"ios":"",
  'end',
];
var result = spawn.sync(
  'node',
  [require.resolve('../scripts/' + 'init')].concat(args),
  {stdio: 'inherit'}
);

if (result.status !== 0) {
    console.error('`' + command + ' ' + args.join(' ') + '` failed');
    return;
}
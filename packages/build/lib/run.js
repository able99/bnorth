/**
 * Copyright (c) 2018, able99
 * All rights reserved.
 * This source code is licensed under MIT.
 */

const spawn = require('cross-spawn');
const { initArgv } = require('../config/argv.config');
const { initEnv } = require('../config/env.config');

module.exports = function run(type, watch) {
  const argv = initArgv(type);
  initEnv({type, env: argv.debug?'development':'production'});
  spawn.sync('node', process.argv.slice(3), {stdio: 'inherit'});
}



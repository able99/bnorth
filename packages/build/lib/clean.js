/**
 * Copyright (c) 2018, able99
 * All rights reserved.
 * This source code is licensed under MIT.
 */

const { join } = require('path');
const spawn = require('cross-spawn');
const { initEnv } = require('../config/env.config');

module.exports = function run(type, watch) {
  let env = initEnv({type, env: argv.debug?'development':'production'});
  spawn.sync('node', [join(env.ownNodeModules, '.bin', 'rimraf'), ...process.argv.slice(3)], {stdio: 'inherit'});
}



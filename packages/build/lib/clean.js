/**
 * Copyright (c) 2018, able99
 * All rights reserved.
 * This source code is licensed under MIT.
 */

const { join } = require('path');
const spawn = require('cross-spawn');
const { initArgv } = require('../config/argv.config');
const { initEnv } = require('../config/env.config');

module.exports = function run(type, watch) {
  const argv = initArgv(type);
  let env = initEnv({type, env: argv.env||'production'});
  spawn.sync('node', [join(env.ownNodeModules, '.bin', 'rimraf'), ...process.argv.slice(3)], {stdio: 'inherit'});
}



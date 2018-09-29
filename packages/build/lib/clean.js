/**
 * Copyright (c) 2018, able99
 * All rights reserved.
 * This source code is licensed under MIT.
 */

const spawn = require('cross-spawn');
const { initEnv } = require('../config/env.config');

module.exports = function run(type, watch) {
  initEnv();
  spawn.sync('npx', ['rimraf', ...process.argv.slice(3)], {stdio: 'inherit'});
}



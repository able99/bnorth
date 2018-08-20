/**
 * Copyright (c) 2018, able99
 * All rights reserved.
 * This source code is licensed under MIT.
 */

const babel = require('@babel/core');
const rimraf = require('rimraf');
const vfs = require('vinyl-fs');
const through = require('through2');
const { initEnv } = require('../config/env.config');
const { initBabelOption } = require('../config/babel.config');
const { initArgv } = require('../config/argv.config');


function babelTransform(env, argv, watch, cb) {
  !watch && rimraf.sync(argv.out);

  const stream = vfs
    .src([`${argv.src}/**/*.js`,`${argv.src}/**/*.jsx`])
    .pipe(through.obj((f, enc, cb) => {
      f.contents = new Buffer(babel.transform(f.contents, initBabelOption()).code);
      cb(null, f);
    }))
    .pipe(vfs.dest(argv.out));
  stream.on('end', ()=>cb&&cb());
}

module.exports = function run(type, watch) {
  let env = initEnv();
  let argv = initArgv(type);

  console.log(`#start build: ${env, env.appName}`);

  babelTransform(env, argv, watch, ()=>{
    console.log('#OK');
    console.log();
  });
}
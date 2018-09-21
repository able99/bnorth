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
const CLIEngine = require("eslint").CLIEngine;


function eslint(env, argv, watch) {
  console.log('#lint');
  let config = {"baseConfig": {"extends": "react-app"},rules: {
    'no-unused-vars': ['warn',{args: 'none', ignoreRestSiblings: true}],
  }};
  let cli = new CLIEngine(config);
  let report = cli.executeOnFiles([argv.src]);
  let formatter = cli.getFormatter();
  console.log(formatter(report.results));
  return !report.errorCount;
}

function babelTransform(env, argv, watch, scb, ecb) {
  console.log('#balbel transform');
  !watch && rimraf.sync(argv.out);

  const stream = vfs
    .src([`${argv.src}/**/*.js`,`${argv.src}/**/*.jsx`])
    .pipe(through.obj((f, enc, cb) => {
      try{
        f.contents = new Buffer(babel.transform(f.contents, initBabelOption()).code);
        cb(null, f);
      }catch(e){
        ecb&&ecb(e, f);
      }
    }))
    .pipe(vfs.dest(argv.out));
  stream.on('end', ()=>scb&&scb());
}

module.exports = function run(type, watch) {
  let env = initEnv();
  let argv = initArgv(type);

  console.log(`#start build: ${env, env.appName}`);

  if(!eslint(env, argv, watch)) {
    return;
  }

  try {
    babelTransform(env, argv, watch, ()=>{
      console.log('#OK');
      console.log();
    }, (e,f)=>{
      console.log('#ERROR');
      console.log(e);
      console.log(f.path);
      console.log();
    });
  } catch(e) {
    console.log('#ERROR');
    console.log(e);
    console.log();
  }
}
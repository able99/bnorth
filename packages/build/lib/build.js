/**
 * Copyright (c) 2018, able99
 * All rights reserved.
 * This source code is licensed under MIT.
 */

const webpack = require('webpack');
const { initEnv } = require('../config/env.config');
const { initArgv } = require('../config/argv.config');
const { initBnorthConfig } = require('../config/bnorth.config');
const { initBabelOption } = require('../config/babel.config');
const { initWebpackConfig } = require('../config/webpack.config');
const { printError, printStats, buildSizeCalcPrint, buildSizeCalcSaveBefore } = require('./_print');


module.exports = function run(type) {
  const argv = initArgv(type);
  initEnv({type, env: argv.env});
  const bnorthConfig = initBnorthConfig();
  initBabelOption();
  const webpackConfig = initWebpackConfig();
  const compiler = webpack(webpackConfig);

  console.log('# creating '); 

  buildSizeCalcSaveBefore(bnorthConfig.outputPath);
  function webpackHandleer(err, stats) {
    if(err) { printError(err); if (!argv.watch) process.exit(1); return }
  
    printStats(stats);
    if (!stats.stats) buildSizeCalcPrint(bnorthConfig.outputPath, stats);
    if (argv.analyze) { console.log(`Analyze result is generated at ${bnorthConfig.outputPath+'/stats.html'}`); console.log() }
  }

  return argv.watch?compiler.watch(200, webpackHandleer):compiler.run(webpackHandleer);
}

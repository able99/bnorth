const chalk = require('chalk');
const webpack = require('webpack');
const getPaths = require('../config/paths');
const getConfig = require('../config/config');
const { printError, printStats, buildSizeCalcPrint, buildSizeCalcSaveBefore } = require('./_print');
process.env.NODE_ENV = process.env.NODE_ENV || 'production';


function build() {
  const cwd = process.cwd();
  const paths = getPaths(cwd);
  const argv = require('yargs')
    .usage('Usage: roadhog build [options]')
    .option('debug', { type: 'boolean', describe: 'Build without compress', default: false, })
    .option('watch', { type: 'boolean', alias: 'w', describe: 'Watch file changes and rebuild', default: false, })
    .option('analyze', { type: 'boolean', describe: 'Visualize and analyze your Webpack bundle.', default: false, })
    .help('h')
    .argv;
  const config = getConfig(cwd, paths, 'prod');
  const webpackConfig = require('../config/webpack.config.prod')(cwd, paths, config, argv);
  const compiler = webpack(webpackConfig);

  if (argv.debug) { 
    console.log('Creating an development build without compress...'); 
  } else { 
    console.log('Creating an optimized production build...'); 
  }

  buildSizeCalcSaveBefore(config.outputPath);
  function webpackHandleer(err, stats) {
    if(err) {
      printError(err)
      if (!argv.watch) process.exit(1);
      return;
    }
  
    printStats(stats);
  
    if (!stats.stats) buildSizeCalcPrint(config.outputPath, stats);
    if (argv.analyze) { console.log(`Analyze result is generated at ${chalk.cyan(config.outputPath+'/stats.html')}`); console.log() }
  }


  return argv.watch?compiler.watch(200, webpackHandleer):compiler.run(webpackHandleer);
}


if (require.main === module) {
  build();
}

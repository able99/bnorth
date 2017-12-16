const chalk = require('chalk');
const fs = require('fs-extra');
const stripAnsi = require('strip-ansi');
const path = require('path');
const filesize = require('filesize');
const gzipSize = require('gzip-size').sync;
const webpack = require('webpack');
const getPaths = require('../config/paths');
const getConfig = require('../config/config');


// env
//-----------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const argv = require('yargs')
  .usage('Usage: roadhog build [options]')
  .option('debug', {
    type: 'boolean',
    describe: 'Build without compress',
    default: false,
  })
  .option('watch', {
    type: 'boolean',
    alias: 'w',
    describe: 'Watch file changes and rebuild',
    default: false,
  })
  .option('analyze', {
    type: 'boolean',
    describe: 'Visualize and analyze your Webpack bundle.',
    default: false,
  })
  .help('h')
  .argv;


// utils 
//-----------------------------------
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach((err) => {
    console.log(err.message || err);
    console.log();
  });
}

function runArray(stats, fn) {
  if (stats && Array.isArray(stats)) {
    return stats.map(fn);
  } else {
    return fn(stats);
  }
}

function removeFileNameHash(fileName, appBuild) {
  return fileName
    .replace(appBuild, '')
    .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}

function getDifferenceLabel(currentSize, previousSize) {
  const FIFTY_KILOBYTES = 1024 * 50;
  const difference = currentSize - previousSize;
  const fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red(`+${fileSize}`);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow(`+${fileSize}`);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  } else {
    return '';
  }
}


// build size 
//-----------------------------------
let buildSizeMap = null;
function buildSizeCalcSaveBefore(appBuild) {
  if(!fs.existsSync(appBuild)) return;
  buildSizeMap = (fs.readdirSync(appBuild) || [])
  .filter(fileName => /\.(js|css)$/.test(fileName))
  .reduce((memo, fileName) => {
    const contents = fs.readFileSync(path.join(appBuild,fileName));
    const key = removeFileNameHash(fileName, appBuild);
    memo[key] = gzipSize(contents);
    return memo;
  }, {});

  fs.emptyDirSync(appBuild);
}
function buildSizeCalcPrint(appBuild, stats) {
  const assets = stats.toJson().assets
  .filter(asset => /\.(js|css)$/.test(asset.name))
  .map((asset) => {
    const fileContents = fs.readFileSync(`${appBuild}/${asset.name}`);
    const size = gzipSize(fileContents);
    const previousSize = buildSizeMap&&buildSizeMap[removeFileNameHash(asset.name)];
    const difference = getDifferenceLabel(size, previousSize);
    return {
      folder: path.join(appBuild, path.dirname(asset.name)),
      name: path.basename(asset.name),
      size,
      sizeLabel: filesize(size) + (difference ? ` (${difference})` : ''),
    };
  });

  assets.sort((a, b) => b.size - a.size);
  
  const longestSizeLabelLength = Math.max.apply(
    null,
    assets.map(a => stripAnsi(a.sizeLabel).length)
  );

  assets.forEach((asset) => {
    let sizeLabel = asset.sizeLabel;
    const sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    console.log(`  ${sizeLabel}  ${chalk.dim(asset.folder + path.sep)}${chalk.cyan(asset.name)}`);
  });
}


// handle 
//-----------------------------------
function webpackHandleer(err, stats) {
  if (err) {
    printErrors('Failed to compile.', [err]);
    if (!argv.watch) {
      process.exit(1);
    }
    return;
  }

  runArray(stats.stats || stats, (item) => {
    if (item.compilation.errors.length) {
      printErrors('Failed to compile.', item.compilation.errors);
      if (!argv.watch) {
        process.exit(1);
      }
    }
  });


  if (stats.stats) {
    console.log(chalk.green('Compiled successfully.'));
  } else {
    console.log(chalk.green(`Compiled successfully in ${(stats.toJson().time / 1000).toFixed(1)}s.`));
    console.log();

    console.log('File sizes after gzip:');
    console.log();
    buildSizeCalcPrint(stats);
    console.log();
  }

  if (argv.analyze) {
    console.log(`Analyze result is generated at ${chalk.cyan('dist/stats.html')}.`);
    console.log();
  }
}


// run 
//-----------------------------------
function build() {
  const cwd = process.cwd();
  const paths = getPaths(cwd);
  let config = getConfig(cwd, paths, 'prod');
  let webpackConfig = require('../config/webpack.config.prod')(cwd, paths, config, argv);

  buildSizeCalcPrint = buildSizeCalcPrint.bind(null, config.outputPath);
  buildSizeCalcSaveBefore(config.outputPath);

  if (argv.debug) {
    console.log('Creating an development build without compress...');
  } else {
    console.log('Creating an optimized production build...');
  }

  const compiler = webpack(webpackConfig);
  if (argv.watch) {
    compiler.watch(200, webpackHandleer);
  } else {
    compiler.run(webpackHandleer);
  }
}

if (require.main === module) {
  build();
}

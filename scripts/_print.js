const chalk = require('chalk');
const fs = require('fs-extra');
const stripAnsi = require('strip-ansi');
const path = require('path');
const filesize = require('filesize');
const gzipSize = require('gzip-size').sync;
const clearConsoleA = require('react-dev-utils/clearConsole');

let buildSizeMap = null;


function clearConsole() {
  if (process.env.CLEAR_CONSOLE !== 'none') clearConsoleA();
}

function printError(error) {
  if(!error) return;
  console.log(chalk.red('Errors:')); console.log();
  console.log(error.message || error); console.log();
}

function printStats(stats) {
  let success = true;
  (Array.isArray(stats.stats||stats)||[stats.stats||stats]).forEach(item=>{
    if(item.compilation.warnings.length) {
      console.log(chalk.yellow('Warnings:')); console.log();
      item.compilation.warnings.forEach((err) => {
        console.log(err.message || err); console.log();
      });
      success = false;
    }
    if(item.compilation.errors.length) {
      console.log(chalk.red('Errors:')); console.log();
      item.compilation.errors.forEach((err) => {
        console.log(err.message || err); console.log();
      });
      success = false;
    }
  })

  if(success)
    console.log(chalk.green(
      stats.stats
        ?'Compiled successfully.'
        :`Compiled successfully in ${(stats.toJson().time / 1000).toFixed(1)}s.`));
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


module.exports = { 
  clearConsole,
  printError, 
  printStats,
  buildSizeCalcPrint, 
  buildSizeCalcSaveBefore 
} 
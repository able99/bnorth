const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chokidar = require('chokidar');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require( 'react-dev-utils/openBrowser');
const choosePort = require('react-dev-utils/WebpackDevServerUtils').choosePort;
const historyApiFallback = require('connect-history-api-fallback');
const chalk = require('chalk');
const getPaths = require('../config/paths');
const getConfig = require('../config/config');
const outputMockError = require('./_mock').outputError;
const applyMock = require('./_mock').applyMock;


// env
//-----------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const isInteractive = process.stdout.isTTY;
let compiler;
const argv = require('yargs') 
.usage('Usage: roadhog server [options]')
.help('h')
.argv;


// utils
//-----------------------------------
function clearConsoleWrapped() {
  if (process.env.CLEAR_CONSOLE !== 'none') {
    clearConsole();
  }
}


// webpack
//-----------------------------------
function setupCompiler(host, port, protocol, config, webpackConfig, cwd, paths, argv) {
  try {
    compiler = webpack(webpackConfig);
  } catch (e) {
    console.log(e);
  }

  compiler.plugin('invalid', () => {
    if (isInteractive) {
      clearConsoleWrapped();
    }
    console.log('Compiling...');
  });

  let isFirstCompile = true;
  compiler.plugin('done', (stats) => {
    if (isInteractive) {
      clearConsoleWrapped();
    }

    const json = stats.toJson({}, true);
    const messages = formatWebpackMessages(json);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    const showInstructions = isSuccessful && (isInteractive || isFirstCompile);


    if (isSuccessful) {
      if (stats.stats) {
        console.log(chalk.green('Compiled successfully'));
      } else {
        console.log(chalk.green(`Compiled successfully in ${(json.time / 1000).toFixed(1)}s!`));
      }
    }

    if (showInstructions) {
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log(`  ${chalk.cyan(`${protocol}://${host}:${port}/`)}`);
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log(`To create a production build, use ${chalk.cyan('npm run build')}.`);
      console.log();
      isFirstCompile = false;
    }

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach((message) => {
        console.log(message);
        console.log();
      });
    } else if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach((message) => {
        console.log(message);
        console.log();
      });
      console.log('You may use special comments to disable some warnings.');
      console.log(`Use ${chalk.yellow('// eslint-disable-next-line')} to ignore the next line.`);
      console.log(`Use ${chalk.yellow('/* eslint-disable */')} to ignore all warnings in a file.`);
      console.log();
    }

    if (isInteractive) {
      outputMockError();
    }
  });
}

function runDevServer(host, port, protocol, config, webpackConfig, cwd, paths, argv) {
  const devServer = new WebpackDevServer(compiler, {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: protocol === 'https',
    host,
    proxy: config.proxy,
  });


  // historyApiFallback
  const proxy = require(paths.appPackageJson).proxy;  
  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: proxy ?
      ['text/html'] :
      ['text/html', '*/*'],
  }));
  devServer.use(devServer.middleware);

  // mock
  applyMock(devServer);

  devServer.listen(port, '0.0.0.0', (err) => {
    if (err) {
      return console.log(err);
    }

    if (isInteractive) {
      clearConsoleWrapped();
    }
    console.log(chalk.cyan('Starting the development server...'));
    console.log();
    if (isInteractive) {
      outputMockError();
    }

    openBrowser(`${protocol}://${host}:${port}/`);
  });
}


// run
//-----------------------------------
function run(port) {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  const cwd = process.cwd();
  const paths = getPaths(cwd);
  let config = getConfig(cwd, paths, 'dev');
  let webpackConfig = require('../config/webpack.config.dev')(cwd, paths, config, argv);
  setupCompiler(host, port, protocol, config, webpackConfig, cwd, paths, argv);
  runDevServer(host, port, protocol, config, webpackConfig, cwd, paths, argv);
}

function init() {
  const HOST = process.env.HOST || '0.0.0.0';
  choosePort(HOST, DEFAULT_PORT).then((port) => {
    if (port === null) {
      return;
    }

    try {
      run(port);
    } catch (e) {
      console.log(e);
    }
  });
}

init();

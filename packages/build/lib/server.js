const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require( 'react-dev-utils/openBrowser');
const choosePort = require('react-dev-utils/WebpackDevServerUtils').choosePort;
const apiMocker = require('webpack-api-mocker');
const chalk = require('chalk');
const {resolve} = require('path');
const { clearConsole, printStats } = require('./_print');
const { initEnv } = require('../config/env.config');
const { initArgv } = require('../config/argv.config');
const { initBnorthConfig } = require('../config/bnorth.config');
const { initBabelOption } = require('../config/babel.config');
const { initWebpackConfig } = require('../config/webpack.config');


function doRun(type, serverConfig, env) {
  const bnorthConfig = initBnorthConfig();
  initBabelOption();
  const webpackConfig = initWebpackConfig();
  
  function restart() {
    console.log('# Restart...');
    devServer.close();
    doRun(type, serverConfig, env);
  }

  try { let = compiler = webpack(webpackConfig) } catch (e) { console.log(e); return } if(!compiler) return;

  compiler.plugin('invalid', filename=>{
    clearConsole();

    if(filename.endsWith('package.json')) {
      console.log('# Config change...');
      restart();
    }else{
      console.log('# Compiling...');
    }
  });

  compiler.plugin('done', stats=>{
    clearConsole();
    printStats(stats);
  });

  const devServer = new WebpackDevServer(compiler, {
    https: serverConfig.https,
    host: serverConfig.host,
    proxy: bnorthConfig.proxy,
    contentBase: env.appPublic,
    // publicPath: env.appPublic,
    disableHostCheck: true,
    compress: true,
    hot: true,
    quiet: true,
    hot: true,
    historyApiFallback: false,
    overlay: false,
    headers: { 'access-control-allow-origin': '*' },
    clientLogLevel: 'none',
    watchOptions: { ignored: /node_modules/ },
    open: false,
    before(app) {
      bnorthConfig.mockerFile && apiMocker(app, resolve(bnorthConfig.mockerFile), bnorthConfig.mockerConfig);
    },
    after(app) {
    },
  });


  return devServer.listen(serverConfig.port, serverConfig.host, err=>{
    if (err) return console.log(err);

    clearConsole();
    console.log(chalk.cyan('Starting the development server...')); 
    console.log();

    openBrowser(`${serverConfig.protocol}://${serverConfig.urlHost}:${serverConfig.port}/`);
  });
}

module.exports = function run(type) {
  const argv = initArgv(type);
  const env = initEnv({type, env: argv.env});
  const serverConfig = { host: argv.host, port: argv.port, https: argv.https, protocol: (argv.https?'https':'http'), urlHost: argv.urlhost }

  choosePort(serverConfig.host, serverConfig.port).then(port=>{
    if (port === null) return;
    serverConfig.port = port;
    try { doRun(type, serverConfig, env); } catch (e) { console.log(e) }
  });
}

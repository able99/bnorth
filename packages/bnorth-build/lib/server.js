const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require( 'react-dev-utils/openBrowser');
const choosePort = require('react-dev-utils/WebpackDevServerUtils').choosePort;
const historyApiFallback = require('connect-history-api-fallback');
const chalk = require('chalk');
const { clearConsole, printStats } = require('./_print');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const { initEnv } = require('../config/env.config');
const { initArgv } = require('../config/argv.config');
const { initServerOption } = require('../config/server.config');
const { initBnorthConfig } = require('../config/bnorth.config');
const { initBabelOption } = require('../config/babel.config');
const { initWebpackConfig } = require('../config/webpack.config');



// run
//-----------------------------------
function doRun(type, serverConfig) {
  const env = initEnv();
  const argv = initArgv(type);
  const bnorthConfig = initBnorthConfig();
  initBabelOption();
  const webpackConfig = initWebpackConfig();
  
  function restart() {
    console.log('Restart...');
    devServer.close();
    doRun(type);
  }


  try { let = compiler = webpack(webpackConfig) } catch (e) { console.log(e); return } if(!compiler) return;

  compiler.plugin('invalid', filename=>{
    clearConsole();

    if(filename.endsWith('package.json')) {
      console.log('Config change...');
      restart();
    }else{
      console.log('Compiling...');
    }
  });

  compiler.plugin('done', stats=>{
    clearConsole();
    printStats(stats);
  });


  const devServer = new WebpackDevServer(compiler, {
    https: serverConfig.protocol === 'https',
    host: serverConfig.host,
    proxy: bnorthConfig.proxy,
    // contentBase: env.appPublic,
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
    open: true,
    before(app) {
    },
    after(app) {
    },
  });


  return devServer.listen(serverConfig.port, '0.0.0.0', err=>{
    if (err) return console.log(err);

    clearConsole();
    console.log(chalk.cyan('Starting the development server...')); console.log();

    openBrowser(`${serverConfig.protocol}://${serverConfig.urlHost}:${serverConfig.port}/`);
  });
}

module.exports = function run(type) {
  const serverConfig = initServerOption();

  choosePort(serverConfig.host, serverConfig.port).then(port=>{
    if (port === null) return;
    serverConfig.port = port;
    try { doRun(type, serverConfig); } catch (e) { console.log(e) }
  });
}

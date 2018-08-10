const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require( 'react-dev-utils/openBrowser');
const choosePort = require('react-dev-utils/WebpackDevServerUtils').choosePort;
const historyApiFallback = require('connect-history-api-fallback');
const chalk = require('chalk');
const getPaths = require('../config/paths');
const getConfig = require('../config/config');
const { clearConsole, printStats } = require('./_print');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';



// run
//-----------------------------------
function doRun(protocol, host, port, cwd, argv) {
  const paths = getPaths(cwd);
  let config = getConfig(cwd, paths, 'dev', argv);
  let webpackConfig = require('../config/webpack.config.dev')(cwd, paths, config, argv);

  function restart() {
    console.log('Restart...');
    devServer.close();
    doRun(protocol, host, port, cwd, argv);
  }


  try { let = compiler = webpack(webpackConfig) } catch (e) { console.log(e); return } if(!compiler) return;

  compiler.plugin('invalid', (filename) => {
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
    https: protocol === 'https',
    host,
    proxy: config.proxy,
    contentBase: paths.appPublic,
    publicPath: webpackConfig.output.publicPath,
    disableHostCheck: true,
    compress: true,
    hot: true,
    quiet: true,
    clientLogLevel: 'none',
    watchOptions: { ignored: /node_modules/ },
  });

  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: config.proxy?['text/html']:['text/html', '*/*'],
  }));
  devServer.use(devServer.middleware);

  return devServer.listen(port, '0.0.0.0', err=>{
    if (err) return console.log(err);

    clearConsole();
    console.log(chalk.cyan('Starting the development server...')); console.log();

    openBrowser(`${protocol}://${host}:${port}/`);
  });
}

function run() {
  const HOST = process.env.HOST || '0.0.0.0';
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  const cwd = process.cwd();
  const argv = require('yargs').usage('Usage: ').help('h').argv;

  choosePort(HOST, PORT).then(port=>{
    if (port === null) return;

    try {
      doRun(protocol, host, port, cwd, argv);
    } catch (e) { console.log(e) }
  });
}

if (require.main === module) {
  run();
}

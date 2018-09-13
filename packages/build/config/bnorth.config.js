let { getEnv, resolveApp } = require('./env.config');

let cache;

let config = {
  config: {
    bail: false,
    devtool: false,
    outputPath: './www',
    outputFilename: '[name].[hash:8].js',
    outputPublicPath: './',
    outputChunkFilename: '[name].[chunkhash:8].async.js',
    resolveExtensions: ['.js', '.json', '.jsx'],
    resolveExtensionsExtra: [],
    externals: undefined,
    node: { fs: 'empty', net: 'empty', tls: 'empty' },
    define: {},
    extractCss: false,
    urlLoaderLimit: 0,
    eslint: {
      plugins: [],
      env: {},
      parserOptions: {},
      rules: {},
    }
  },

  config_development: {
    devtool: '#cheap-module-eval-source-map',
    outputPublicPath: '/',
  },

  config_production: {
    devtool: false,
  },
}

function initBnorthConfig() {
  let env = getEnv();
  cache = Object.assign({}, 
    config.config, 
    env.appPackage.bnorth||{},
    config[`config_${env.env}`],
    env.appPackage[`bnorth_${env.env}`]||{},
  );
  
  env.appOut = resolveApp(cache.outputPath);

  return cache;
}

function getBnorthConfig() {
  return cache;
}

module.exports = {
  initBnorthConfig, getBnorthConfig
}
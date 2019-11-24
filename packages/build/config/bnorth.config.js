let { getEnv, resolveApp } = require('./env.config');
let { getArgv } = require('./argv.config');

let cache;

let config = {
  config: {
    bail: false,
    devtool: false,
    filename: 'index.html',
    outputPath: './dist',
    outputFilename: '[name].[hash:8].js',
    outputPublicPath: './',
    outputChunkFilename: '[name].[chunkhash:8].async.js',
    resolveExtensions: ['.js', '.json', '.jsx'],
    resolveExtensionsExtra: [],
    rules: [],
    plugins: [],
    externals: undefined,
    node: { fs: 'empty', net: 'empty', tls: 'empty' },
    extractCss: false,
    urlLoaderLimit: 0,
    eslint: { plugins: [], env: {}, parserOptions: {}, rules: {} },
    htmlTemplateParams: undefined,
    defines: undefined,
    appDefines: undefined,
  },

  config_development: { devtool: '#cheap-module-eval-source-map' },

  config_production: {},
}

function initBnorthConfig() {
  let env = getEnv();
  let argv = getArgv();

  cache = Object.assign({}, 
    config.config, 
    env.appPackage.bnorth||{},
    config[`config_${env.env}`],
    env.appPackage[`bnorth_${env.env}`]||{},
    env.appPackage[`bnorth_${argv.config}`]||{},
  );

  cache.defines = {
    ...config.defines,
    ...env.appPackage.bnorth&&env.appPackage.bnorth.defines,
    ...env.appPackage[`bnorth_${argv.config}`]&&env.appPackage[`bnorth_${argv.config}`].defines,
    'process.bnorth.appDefines': {
      ...env.appPackage.bnorth&&env.appPackage.bnorth.appDefines,
      ...env.appPackage[`bnorth_${env.env}`]&&env.appPackage[`bnorth_${env.env}`].appDefines,
      ...env.appPackage[`bnorth_${argv.config}`]&&env.appPackage[`bnorth_${argv.config}`].appDefines,
    },
    'process.bnorth.name': env.appPackage.displayName||env.appPackage.name,
    'process.bnorth.version': env.appPackage.version,
    'process.bnorth.description': env.appPackage.description,
    'process.env.NODE_ENV': env.env,
  }
  delete cache.appDefines;

  env.appOut = resolveApp(cache.outputPath);

  return cache;
}

function getBnorthConfig() {
  return cache;
}

module.exports = {
  initBnorthConfig, getBnorthConfig
}
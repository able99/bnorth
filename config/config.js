const { existsSync } = require('fs');

let defaultConfig = {
  bail: true,
  devtool: false,
  outputPath: './dist',
  outputFilename: '[name].[hash:8].js',
  outputPublicPath: '/',
  outputChunkFilename: '[name].[chunkhash:8].async.js',
  resolveExtensions: ['.js', '.json', '.jsx'],
  resolveExtensionsExtra: [],
  autoprefixConfig: {
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9', 
    ],
  },
  externals: undefined,
  node: { fs: 'empty', net: 'empty', tls: 'empty' },
  extractCss: false,
}

let defaultConfigDev = {
  devtool: '#cheap-module-eval-source-map',
  outputPublicPath: '/',
}

let defaultConfigProd = {
  devtool: false,
}

module.exports = function(cwd, paths, env) {
  let configFile = paths.resolveApp('.bnorth.config.js');
  let configFileEnv = paths.resolveApp('.bnorth.config.'+(env||'dev')+'.js');
  let hasConfigFile = existsSync(configFile);
  let hasConfigFileEnv = existsSync(configFileEnv);
  let configEnvDefault = env==='prod'?defaultConfigProd:defaultConfigDev;
  let config = hasConfigFile?require(configFile):{};
  let configEnv = hasConfigFileEnv?require(configFileEnv):{};

  config = Object.assign({}, defaultConfig, config, configEnvDefault, configEnv);
  config.NODE_ENV = !env||env==='dev'?'developer':'production';
  config.outputPath = paths.resolveApp(config.outputPath);
  return config;
}
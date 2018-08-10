let fs = require('fs-extra');


let defaultConfig = {
  bail: false,
  devtool: false,
  outputPath: './www',
  outputFilename: '[name].[hash:8].js',
  outputPublicPath: './',
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
  urlLoaderLimit: 0,
}

let defaultConfigDev = {
  devtool: '#cheap-module-eval-source-map',
  outputPublicPath: '/',
}

let defaultConfigProd = {
  devtool: false,
}

module.exports = function(cwd, paths, env, argv) {
  env = env||'dev';
  let package = JSON.parse(fs.readFileSync(paths.appPackageJson));

  let ret = Object.assign({}, 
    defaultConfig, 
    package['bnorth']||{},
    env==='dev'?defaultConfigDev:defaultConfigProd, 
    (env==='dev'?package['bnorth.dev']:package['bnorth.prod'])||{}, 
  );
  ret.NODE_ENV = env==='dev'?'developer':'production';
  ret.outputPath = paths.resolveApp(ret.outputPath);

  return ret;
}
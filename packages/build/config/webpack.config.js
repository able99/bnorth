const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const { existsSync } = require('fs');
const { join, basename, resolve } = require('path');
let { getEnv, resolveApp } = require('./env.config');
let { getArgv } = require('./argv.config');
let { getBnorthConfig } = require('./bnorth.config');
let { getBabelOption } = require('./babel.config');

function getRules() {
  let rules = [];

  let {
    appSrc,
  } = getEnv();

  let {
    extractCss,
    urlLoaderLimit,
    eslint,
  } = getBnorthConfig();

  // raw
  rules.push({
    test: /\.(txt|ico\.svg)$/,
    use: 'raw-loader'
  });

  // url
  rules.push({
    exclude: [
      /\.(html|hbs)$/,
      /\.(js|jsx)$/,
      /\.(css|less|scss)$/,
      /\.json$/,
      /\.txt$/,
      /\.ico\.svg$/,
      /\.tsx?$/,
    ],
    loader: 'url',
    options: { limit: urlLoaderLimit, name: 'static/[name].[hash:8].[ext]' },
  });

  // js
  rules.push({
    test: /\.(js|jsx)$/,
    enforce: "pre",
    include: appSrc, 
    exclude: /node_modules/,
    loader:"eslint",
    options: {
      configFile: __dirname+'/eslintrc.js',
      "rules": { 'no-unused-vars': ['warn',{args: 'none', ignoreRestSiblings: true}], ...eslint.rules }
    },
  });

  rules.push({
    test: /\.(js|jsx)$/,
    include: appSrc, 
    exclude: /node_modules/,
    loader: "babel",
    options: getBabelOption(),
  });

  // css
  rules.push({
    test: /\.css$/,
    use: extractCss?[
      MiniCssExtractPlugin.loader,
      'css?importLoaders=1',
    ]:[
      'style',
      'css?importLoaders=1',
    ]
  });

  // file
  rules.push({
    test: /\.html$/,
    loader: 'file',
    options: { name: '[name].[ext]' },
  });

  return rules;
}

function getPlugins() {
  let {
    filename,
    extractCss,
    htmlTemplateParams={},
    webParams,
    outputPublicPath,
  } = getBnorthConfig();

  let {
    env,
    define,
    appSrc,
    appPublic,
    appPackage,
  } = getEnv();

  let {
    debug,
    analyze,
  } = getArgv();

  const ret = [];

  // conmon
  // -----------------------------

  // define
  ret.push(new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(env) },
    ...(Object.keys(define||{}).reduce((memo, key)=>{
      memo[key] = JSON.stringify(define[key]);
      return memo;
    }, {}))
  }));

  // html
  ret.push(new HtmlWebpackPlugin({
    inject: true,
    charset: 'utf-8',

    filename,
    template: join(existsSync(join(appSrc, 'index.hbs'))?appSrc:__dirname, 'index.hbs'),
    outputPublicPath,
    
    title: appPackage.displayNameWeb||appPackage.displayName||appPackage.name,
    icon: basename(appPackage.iconWeb||appPackage.icon||''),

    env,
    version: appPackage.version,
    webParams,

    metaNames: {
      'viewport': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      'format-detection': 'telephone=no',
      'msapplication-tap-highlight': 'no',
      ...htmlTemplateParams.metaNamesExt||{},
    },
    metaHttpEquiv: {
      'X-UA-Compatible': 'IE=11',
      ...htmlTemplateParams.metaHttpEquivExt||{},
    },
    jsFiles: [],
    cssFiles: [],
    heads: [],

    rootBefore: [],
    rootAttr: {
      'style': 'position:fixed; width:100%;height:100%; top:0;right:0;bottom:0;left:0; touch-action:none;',
      ...htmlTemplateParams.rootAttrExt||[],
    },
    rootChildren: [
      '<div style="margin-top:48px;text-align:center">...</div>',
      ...htmlTemplateParams.rootChildrenExt||[],
    ],
    rootAfter: [],
    
    ...htmlTemplateParams,
  }));

  // pubic
  let copys = [];
  if(existsSync(appPublic)) copys.push({ from: appPublic, to: './' });
  if(existsSync(appPackage.iconWeb||appPackage.icon)) copys.push({
    from: appPackage.iconWeb||appPackage.icon,
    to: './',
  });
  copys.length && ret.push(new CopyWebpackPlugin(copys));
  
  // production
  // -----------------------------
  env === 'production' && extractCss && ret.push(new MiniCssExtractPlugin({
    filename: '[name].[hash:8].css',
    chunkFilename: '[id].[hash:8].css',
    ignoreOrder: false, 
  }));

  env === 'production' && analyze && ret.push(new Visualizer());

  // developer
  // -----------------------------
  env === 'development' && ret.push(new webpack.HotModuleReplacementPlugin());
  env === 'development' && ret.push(new CaseSensitivePathsPlugin());

  return ret;
}

function initWebpackConfig() {
  let {
    bail=true, 
    devtool='#cheap-module-eval-source-map',
    mockjs,
    outputFilename,
    outputPublicPath,
    outputChunkFilename,
    resolveExtensions,
    resolveExtensionsExtra,
    externals,
    node,
  } = getBnorthConfig();

  let {
    type,
    env,
    appOut,
    appNodeModules,
    ownNodeModules,
    bnorhtCoreNodeModules,
  } = getEnv();

  let entrys = [];
  
  if(type==='server') entrys.push(require.resolve('react-dev-utils/webpackHotDevClient'));
  if(mockjs) { entrys.push(require.resolve('mockjs/dist/mock')); entrys.push(resolve(mockjs)); }
  entrys.push(resolveApp('src/index.js'));

  return { 
    bail,
    devtool,
    entry: {[basename('src/index.js').replace(/\.(js|tsx?)$/, '')]: entrys},
    mode: env,
    output: { 
      path: appOut,
      publicPath: outputPublicPath,
      filename: outputFilename,
      chunkFilename: outputChunkFilename, 
      libraryTarget: 'var',
    },
    resolve: { 
      modules: [
        bnorhtCoreNodeModules,
        'node_modules',
        appNodeModules,
        ownNodeModules,
      ],
      extensions: [ ...(resolveExtensions||[]), ...(resolveExtensionsExtra||[]), ] 
    },
    resolveLoader: { 
      modules: [ 
        ownNodeModules,
        appNodeModules,
      ],
      moduleExtensions: [ '-loader' ] 
    },
    module: { 
      rules: getRules(),
    },
    plugins: getPlugins(),
    externals,
    node,
  }
}

module.exports = {
  initWebpackConfig
}
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const { existsSync } = require('fs');
const { join, basename } = require('path');
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
    options: {
      limit: urlLoaderLimit,
      name: 'static/[name].[hash:8].[ext]',
    },
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
      "rules": {
        'no-unused-vars': ['warn',{args: 'none', ignoreRestSiblings: true}],
        ...eslint.rules,
      }
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
    use: [
      'style',
      'css?importLoaders=1',
    ],
  });
  // rules.push({
  //   test: /\.css$/,
  //   use: [
  //     'style',
  //     'css?importLoaders=1',
  //     'postcss'
  //   ],
  // });

  // file
  rules.push({
    test: /\.html$/,
    loader: 'file',
    options: {
      name: '[name].[ext]',
    },
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
    isDev, 
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
      'style': 'position: fixed;width: 100%;height: 100%;top:0;right:0;bottom:0;left:0;',
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
  !isDev && extractCss && ret.plugins.push(new ExtractTextPlugin({
    filename: `[name].[contenthash:8].css`,
    allChunks: true,
  }));

  !isDev && analyze && ret.push(new Visualizer());

  // developer
  // -----------------------------
  isDev && ret.push(new webpack.HotModuleReplacementPlugin());
  isDev && ret.push(new CaseSensitivePathsPlugin());

  return ret;
}

function initWebpackConfig() {
  let {
    bail=true, 
    devtool='#cheap-module-eval-source-map',
    outputPath,
    outputFilename,
    outputPublicPath,
    outputChunkFilename,
    resolveExtensions,
    resolveExtensionsExtra,
    externals,
    node,
  } = getBnorthConfig();

  let {
    env,
    isDev,
    appOut,
    appNodeModules,
    ownNodeModules,
    bnorhtCoreNodeModules,
  } = getEnv();

  let entry = resolveApp('src/index.js');
  entry = {
    [basename(entry).replace(/\.(js|tsx?)$/, '')]: isDev ? [require.resolve('react-dev-utils/webpackHotDevClient'), entry] : [entry],
  };


  return { 
    bail,
    devtool,
    entry,
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
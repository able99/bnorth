const { existsSync } = require('fs');
const { join, basename } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');


function getRules(cwd, paths, config, argv) {
  let rules = [];
  // url
  rules.push({
    exclude: [
      /\.(html|ejs)$/,
      /\.(js|jsx)$/,
      /\.(css|less|scss)$/,
      /\.json$/,
      ///\.svg$/,
      /\.tsx?$/,
    ],
    loader: 'url',
    options: {
      limit: config.urlLoaderLimit,
      name: 'static/[name].[hash:8].[ext]',
    },
  });
  // js
  rules.push({
    test: /\.(js|jsx)$/,
    enforce: "pre",
    include: paths.appSrc, 
    exclude: /node_modules/,
    use: [ "eslint" ],
  });
  rules.push({
    test: /\.(js|jsx)$/,
    include: paths.appSrc, 
    exclude: /node_modules/,
    use: [ "babel" ],
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

function getPlugins(cwd, paths, config) {
  const ret = [];

  // define
  let defineObj = {
    'process.env': {
      NODE_ENV: JSON.stringify(config.NODE_ENV),
    },
  };
  if (config.define) {
    let defineObjExtra = Object.keys(config.define).reduce((memo, key) => {
      memo[key] = JSON.stringify(define[key]);
      return memo;
    }, {});
    defineObj = Object.assing(defineObj, defineObjExtra)
  }
  ret.push(new webpack.DefinePlugin(defineObj));

  // html
  if (existsSync(join(paths.appSrc, 'index.ejs'))) {
    ret.push(new HtmlWebpackPlugin({
      template: join(paths.appSrc, 'index.ejs'),
      inject: true,
    }));
  }

  // pubic
  if (existsSync(paths.appPublic)) {
    ret.push(new CopyWebpackPlugin([
      {
        from: paths.appPublic,
        to: config.outputPath,
      },
    ]));
  }

  //multipage
  if (config.multipage) {
    const name = config.hash ? 'common.[hash]' : 'common';
    ret.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: `${name}.js`,
    }));
  }

  ret.push(new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [
        autoprefixer(config.autoprefixConfig),
      ],
    },
  }));

  

  return ret;
}

module.exports = function(cwd, paths, config, argv, isDev) {
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
  } = config||{};

  let entry = paths.resolveApp('src/index.js');
  entry ={
    [basename(entry).replace(/\.(js|tsx?)$/, '')]: 
    isDev ? [require.resolve('react-dev-utils/webpackHotDevClient'), entry] : [entry],
  };


  return { 
    bail,
    devtool,
    entry,
    output: { 
      path: outputPath,
      publicPath: outputPublicPath,
      filename: outputFilename,
      chunkFilename: outputChunkFilename, 
      libraryTarget: 'var',
    },
    resolve: { 
      modules: [
        paths.ownNodeModules,
        paths.appNodeModules,
        'node_modules' 
      ],
      extensions: [ ...(resolveExtensions||[]), ...(resolveExtensionsExtra||[]), ] 
    },
    resolveLoader: { 
      modules: [ 
        paths.ownNodeModules,
        paths.appNodeModules,
      ],
      moduleExtensions: [ '-loader' ] 
    },
    module: { 
      rules: getRules(cwd, paths, config),
    },
    plugins: getPlugins(cwd, paths, config),
    externals,
    node,
  }
}

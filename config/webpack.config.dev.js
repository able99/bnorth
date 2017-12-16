const webpack = require('webpack');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


module.exports = function(cwd, paths, config, argv) {
  let webpackConfig = require('./webpack.config.js');
  let ret =  webpackConfig(cwd, paths, config, argv, true);

  ret.plugins.push(new webpack.HotModuleReplacementPlugin());
  ret.plugins.push(new CaseSensitivePathsPlugin());
  ret.plugins.push(new WatchMissingNodeModulesPlugin(paths.appNodeModules));

  return ret;
}

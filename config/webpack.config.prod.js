const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');


module.exports = function(cwd, paths, config, argv) {
  let webpackConfig = require('./webpack.config.js');
  let ret =  webpackConfig(cwd, paths, config, argv);

  if(!argv.debug)ret.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, 
      warnings: false,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
      ascii_only: true,
    },
  }));

  if(config.extractCss)ret.plugins.push(new ExtractTextPlugin({
    filename: `[name].[contenthash:8].css`,
    allChunks: true,
  }));

  if(!argv.debug)ret.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

  if(!argv.debug)ret.plugins.push(new webpack.optimize.DedupePlugin());

  if(argv.analyze)ret.plugins.push(new Visualizer());

  return ret;
}

/* eslint-disable no-var */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { disable: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    alias: {
      belle: path.join(__dirname, '..', 'src'),
      react: path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
      }, {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, '..', 'src'),
      }, {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, '..', 'belle-classic'),
      }, {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style',
        'css?modules&importLoaders=2'),
        include: path.join(__dirname, '../belle-classic'),
      },
    ],
  },
};

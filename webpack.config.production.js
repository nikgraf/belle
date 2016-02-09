var path = require('path'); // eslint-disable-line no-var
var webpack = require('webpack'); // eslint-disable-line no-var

module.exports = {
  entry: [
    './index',
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  resolve: {
    alias: {
      belle: path.join(__dirname, '..', 'src'),
      react: path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],
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
      },
    ],
  },
};

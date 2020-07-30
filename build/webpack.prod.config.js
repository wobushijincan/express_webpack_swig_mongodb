const webpack = require('webpack');
const {merge} = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const wpbaseConfig = require('./webpack.base.config');

var wpprodConfig = merge(wpbaseConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      //删除注释
      output: {
        comments: false
      },
      //删除console 和 debugger  删除警告
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: new ExtractTextPlugin('[name].css').extract(['css-loader', 'stylus-loader'])
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: new ExtractTextPlugin('[name].css').extract(['css-loader'])
      },
    ]
  }
});

module.exports = wpprodConfig;

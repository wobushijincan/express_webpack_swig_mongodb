const webpack = require('webpack');
const { merge } = require('webpack-merge');
const wpbaseConfig = require('./webpack.base.config');

/**
 * dev环境下，因为配置了webpack-hot-middleware这个插件，
 * 当你使用ExtractTextPlugin来提取css时，修改css文件是不会热更新的，
 * 所以在dev的时候可以不使用ExtractTextPlugin这个插件。
 * 根据目录获取多页面
 * @param  {[type]}          [description]
 * @return {[type]}          [description]
 */

var wpdevConfig = merge(wpbaseConfig, {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
    ]
  }
});

module.exports = wpdevConfig;

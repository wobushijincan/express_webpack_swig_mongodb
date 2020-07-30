const webpack = require('webpack');
const conf = require('./config.js');
const getEntry = require('./getEntry.js');
const createMultipage = require('./createMultipage.js');
const InjectAssetsToSwigPlugin = require('./plugins/injectAssetsToSwigPlugin.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

console.info('config is:\n--------------\n', conf.CONFIG_BUILD, '\n--------------');

// generate multipage htmlPlugins
var htmlPlugins = createMultipage();
var webpackPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: conf.CONFIG_BUILD.staticRoot + '/common',
    minChunks: 2
  }),
  new InjectAssetsToSwigPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin('[name].css')
].concat(htmlPlugins);

var webpackConfig = {
  entry: getEntry(),
  output: {
    path: conf.CONFIG_BUILD.path,
    filename: "[name].js",
    publicPath: conf.CONFIG_BUILD.publicPath
  },
  devtool: conf.CONFIG_BUILD.env == 'dev' ? 'source-map' : false,
  cache: conf.CONFIG_BUILD.env == 'dev' ? true : false,
  plugins: webpackPlugins,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      },
      {
        test: /\.tpl$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf|swf)\??.*$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: conf.CONFIG_BUILD.staticRoot + '/assets_url/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
};


module.exports = webpackConfig;

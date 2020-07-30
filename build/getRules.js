const config = require('../fed/testbuild/config.js').CONFIG_BUILD;

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractInstance = new ExtractTextPlugin('[name].css')

/**
 * dev环境下，因为配置了webpack-hot-middleware这个插件，
 * 当你使用ExtractTextPlugin来提取css时，修改css文件是不会热更新的，
 * 所以在dev的时候可以不使用ExtractTextPlugin这个插件。
 * 根据目录获取多页面
 * @param  {[type]}          [description]
 * @return {[type]}          [description]
 */

function getRules() {
  // dev need support hot module
  if (config.env == 'dev') {
    var stylusLoader = [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'stylus-loader'
      }
    ];

    var cssLoader = [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      }
    ];
  } else {
    var stylusLoader = extractInstance.extract(['css-loader', 'stylus-loader']);
    var cssLoader = extractInstance.extract(['css-loader']);
  }


  var rules = [
    {
      test: /\.styl$/,
      exclude: /node_modules/,
      use: stylusLoader
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: cssLoader
    },
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
          name: config.staticRoot + '/assets_url/[name].[hash:7].[ext]'
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
  ];

  return rules;
}

module.exports = getRules;

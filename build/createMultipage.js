const glob = require('glob');
const path = require('path');
const getEntry = require('./getEntry');
const config = require('./config.js').CONFIG_BUILD;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entrys = getEntry();

/**
 * 根据目录获取多页面
 * @param  {[type]}          [description]
 * @return {[type]}          [description]
 */
function createHTMLPlugin() {
  // get all templates
  const files = glob.sync(config.src + '/**/*.' + config.ext);
  const srcLength = config.src.length;
  let htmls = [];

  files.forEach(function (_file) {
    const file = path.parse(_file);

    let chunks = [];
    let chunkName = config.staticRoot + file.dir.slice(srcLength) + '/' + file.name;

    // if has same name entry, create a html plugin
    let c = entrys[chunkName];
    c && chunks.push(chunkName);

    // layout(base.html) will contains common chunk
    if (file.name == config.serverLayoutName) {
      chunks.push(config.staticRoot + '/common');
    }

    let plugin = new HtmlWebpackPlugin({
      filename: config.templateRoot + file.dir.slice(srcLength) + '/' + file.base,
      template: path.resolve(file.dir, file.base),
      chunks: chunks,
      inject: false
    });

    htmls.push(plugin);
  });

  return htmls;
}

module.exports = createHTMLPlugin;

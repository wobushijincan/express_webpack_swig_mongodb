

/**
 * webpack自定义插件，注入资源
 * 将页面的 js assets, css assets 分别注入到
 * swig模板中的webpack_style_placeholder、webpack_script_placeholder
 * 扩展 HtmlwebpackPlugin 插入自定义的脚本:  //www.cnblogs.com/haogj/p/5649670.html
 * @param  {[type]}          [description]
 * @return {[type]}          [description]
 */

function InjectAssetsToSwigPlugin (options) {}

InjectAssetsToSwigPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
      var scriptStr = '';
      var styleStr = '';

      if (htmlPluginData.assets.js) {
        htmlPluginData.assets.js.forEach(function (item) {
          scriptStr+= '<script src="' + item + '"></script>'
        });
      }

      if (htmlPluginData.assets.css) {
        htmlPluginData.assets.css.forEach(function (item) {
          styleStr+= '<link rel="stylesheet" href="' + item + '"/>';
        });
      }

      if (/\<\!--webpack_style_placeholder--\>/.test(htmlPluginData.html)) {
        htmlPluginData.html = htmlPluginData.html.replace('<!--webpack_style_placeholder-->', styleStr);
        htmlPluginData.html = htmlPluginData.html.replace('<!--webpack_script_placeholder-->', scriptStr);
      } else {
        htmlPluginData.html = htmlPluginData.html.replace('<!--webpack_script_placeholder-->', scriptStr + styleStr);
      }
      callback(null, htmlPluginData);
    });
  });

};

module.exports = InjectAssetsToSwigPlugin;

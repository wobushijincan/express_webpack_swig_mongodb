const config = require('./config.js').CONFIG_BUILD;
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';


/**
 * 根据目录获取入口
 * @param  {[type]} globPath [description]
 * @return {[type]}          [description]
 */
// function getEntry(globPath) {
//   let entries = {};
//   glob.sync(globPath).forEach(function (entry) {
//     let basename = path.basename(entry, path.extname(entry)),
//       pathname = path.dirname(entry);
//       console.log(basename, pathname)
//     if (!entry.match(/js\/lib\//)) {
//       entries[basename] = pathname + '/' + basename;
//     }
//   });
//   return entries;
// }

// generate all entry
function getEntry() {
  // get all js files
  let files = glob.sync(config.src + '/**/*.js');
  let srcLength = config.src.length;
  let entrys = {};

  files.forEach(function (_file) {
    let file = path.parse(_file);
    let htmlFile = path.resolve(file.dir, file.name + '.' + config.ext);
    // if has same name template file, it is a entry
    if (fs.existsSync(htmlFile)) {
      if (config.env == 'dev') {
        entrys[config.staticRoot + file.dir.slice(srcLength) + '/' + file.name] = [path.resolve(_file), hotMiddlewareScript];
      } else {
        entrys[config.staticRoot + file.dir.slice(srcLength) + '/' + file.name] = path.resolve(_file);
      }
    }
  });

  return entrys;
}

module.exports = getEntry;

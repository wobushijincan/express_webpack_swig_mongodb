const render = require('../../util/render');

function list(req, res){
  render(res, 'templates/page/users/info/list.html');
}

module.exports = list;

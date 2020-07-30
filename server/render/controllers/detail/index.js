const render = require('../../util/render');

function list(req, res){
  render(res, 'templates/page/users/list/list.html');
}

module.exports = list;

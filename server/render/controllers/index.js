const render = require('../util/render');

function home(req, res) {
  render(res, 'templates/page/home/home.html');
}

module.exports = home

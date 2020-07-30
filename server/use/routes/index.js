// inject all router

function setRoutes(app) {
  app.get('/', require('../../render/controllers'));

  app.use('/users', require('./users'));
  // app.use('/detail', require('./detail'));

  app.use('/api', require('./api'))
};

module.exports = setRoutes

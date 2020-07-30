'use strict';

const express = require('express');
const app = express();
const reload = require('reload');
const http = require('http');

const port = process.env.PORT || 8080;

// Bootstrap routes
require('./use/middleware')(app);
require('./use/routes')(app);

if (app.get('env') === 'test') return;
var server = http.createServer(app);
reload(server, app);
server.listen(port, () => {
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

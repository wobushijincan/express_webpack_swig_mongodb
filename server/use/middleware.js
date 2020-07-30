'use strict';

/**
 * Module dependencies.
 */
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const winston = require('winston');
const swig = require('swig')
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const env = process.env.NODE_ENV || 'dev';
const config = require('../config');
const compiler = require('./wpCompiler');

module.exports = function (app, passport) {
  // local variables for all views
  app.locals.env = env;
  app.locals.reload = true;
  
  let log = 'dev';

  // use webpack and hot realod
  if (env === 'dev') {
    let wpbaseConfig = require(path.resolve(config.root, './build/webpack.base.config.js'));

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {
      // public path should be the same with webpack config
      publicPath: wpbaseConfig.output.publicPath,
      noInfo: false,
      stats: {
        colors: true
      }
    }));
    app.use(webpackHotMiddleware(compiler));

    // check layout exist
    app.use((req, res, next) => {
      let layoutPath = path.join(config.templateRoot, config.layoutTemplate);
      let filename = compiler.outputPath + config.layoutTemplate;

      compiler.outputFileSystem.readFile(filename, function(err, result) {
        let fileInfoLayout = path.parse(layoutPath);

        mkdirp(fileInfoLayout.dir, () => {
          fs.writeFileSync(layoutPath, result);
          next();
        });
      });
    });
  } else {
    app.use('/static', express.static(config.staticRoot));
    // Use winston on production
    log = {
      stream: {
        write: message => winston.info(message)
      }
    };
  }

  app.use(morgan(log));

  // set templat engine
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', config.templateRoot);
  swig.setDefaults({ cache: false });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // CookieParser should be above session
  app.use(cookieParser());
};

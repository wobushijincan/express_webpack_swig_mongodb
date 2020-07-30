'use strict';

const path = require('path');
const env = process.env.NODE_ENV || 'dev';

const pkg = require('../package.json')
const _version = pkg.version
// const _version = process.env.npm_package_version

module.exports = {
  env: env,
  root: path.join(__dirname, '..'),
  staticRoot: env == 'dev' ? '' : path.join(__dirname, '..', 'dist', 'static'),
  templateRoot: env == 'dev' ? path.join(__dirname, '..', 'dist', 'dist_tmp') : path.join(__dirname, '..', 'dist'),
  layoutTemplate: 'templates/page/base/base.html'
};

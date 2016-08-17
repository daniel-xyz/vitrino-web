let nunjucks = require('nunjucks');

let configureNunjucks = function(app) {
  'use strict';

  nunjucks.configure('server/views', {
    autoescape: true,
    noCache: true,
    watch: true,
    express: app
  });
};

module.exports = configureNunjucks;
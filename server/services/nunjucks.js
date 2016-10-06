let nunjucks = require('nunjucks');
let config = require('../../config/config.js');

let setupNunjucks = function (app) {
  config.nunjucks.options.express = app;

  nunjucks.configure(config.nunjucks.viewPaths, config.nunjucks.options);
};

module.exports = setupNunjucks;
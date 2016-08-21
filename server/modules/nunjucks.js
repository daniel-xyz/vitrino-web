let nunjucks = require('nunjucks');

let configureNunjucks = function(app) {

  nunjucks.configure('server/views', {
    autoescape: true,
    trimBlocks: true,
    noCache: true,
    watch: true,
    express: app
  });
};

module.exports = configureNunjucks;
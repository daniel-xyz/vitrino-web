let nunjucks = require('nunjucks');

let viewPaths = [
  'server/partials',
  'server/components/home/views',
  'server/components/user/views'
];

let configureNunjucks = function(app) {

  nunjucks.configure(viewPaths, {
    autoescape: true,
    trimBlocks: true,
    noCache: true,
    watch: true,
    express: app
  });
};

module.exports = configureNunjucks;
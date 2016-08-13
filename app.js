var express = require('express');
var nunjucks = require('nunjucks');
var logger = require('morgan');

var app = express();

nunjucks.configure('server/views', {
  autoescape: true,
  noCache: true,
  watch: true,
  express: app
});

app.set('port', process.env.PORT || 3000);

app.use(logger("dev"));
app.use(express.static('public'));
app.use('/js/nunjucks-slim.min.js', express.static(__dirname + '/node_modules/nunjucks/browser/nunjucks-slim.min.js'));

app.get('/', function(req, res) {
  'use strict';
  res.render('index.html', {
      page: 'home',
      port: app.get('port')
  });
});

app.get('/login', function(req, res) {
  'use strict';
  res.render('login.html', {
    page: 'login',
    port: app.get('port')
  });
});

app.listen(app.get('port'), function() {
  'use strict';
  console.log('Server started on port', app.get('port'));
});
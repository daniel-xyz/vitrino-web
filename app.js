var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

nunjucks.configure('app/views', {
  autoescape: true,
  express: app
});

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  'use strict';
  res.render('index.html', {
      page: 'home',
      port: app.get('port')
  });
});

app.get('/example', function(req, res) {
  'use strict';
  res.render('example.html', {
        page: 'example',
        port: app.get('port')
    });
});

app.listen(app.get('port'), function() {
  'use strict';
  console.log('Server started on port', app.get('port'));
});
let express = require('express');
let mongoose = require ("mongoose");
let passport = require('passport');
let session = require('express-session');
let nunjucks = require('nunjucks');
let path = require("path");
let logger = require('morgan');
let flash = require("connect-flash");
let bodyParser = require("body-parser");

var passportConfig = require("./server/modules/passportConfig");
let routes = require('./routes');

let app = express();
let oneDay = 86400000;
let mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URI_SANDBOX || 'mongodb://localhost:27017/test';

mongoose.connect(mongoURI, function (err) {
  'use strict';
  if (err) {
    console.log ('ERROR connecting to: ' + mongoURI + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + mongoURI);
  }
});

nunjucks.configure('server/views', {
  autoescape: true,
  noCache: true,
  watch: true,
  express: app
});

passportConfig();

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, 'public'), { maxAge: oneDay }));
app.use(routes);

app.listen(app.get('port'), function() {
  'use strict';
  console.log('Server started on port', app.get('port'));
});
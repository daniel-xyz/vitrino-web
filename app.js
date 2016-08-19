let express = require('express');
let passport = require('passport');
let session = require('express-session');
let path = require("path");
let logger = require('morgan');
let flash = require("connect-flash");
let bodyParser = require("body-parser");

let routes = require('./routes');

let app = express();
let oneDay = 86400000;

require("./server/modules/mongoDB")();
require("./server/modules/passport")();
require("./server/modules/nunjucks")(app);

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.resolve(__dirname, 'public'), { maxAge: oneDay }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(app.get('port'), function() {
  'use strict';
  console.log('Server started on port', app.get('port'));
});
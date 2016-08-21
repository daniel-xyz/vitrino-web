let express = require('express');
let passport = require('passport');
let session = require('express-session');
let path = require("path");
let logger = require('morgan');
let flash = require("connect-flash");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let helmet = require('helmet');
let ms = require('ms');

let routes = require('./routes');

let app = express();

require("./server/modules/mongoDB")();
require("./server/modules/passport")();
require("./server/modules/nunjucks")(app);

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(helmet());
app.use(express.static(path.resolve(__dirname, 'public'), { maxAge: ms('7 days') }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'G"ZTq^Z|T/i!cbBH"Gj2tizi2"_.("$")&?#<S<zF§S',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(app.get('port'), function() {
  'use strict';
  console.log('Server started on port', app.get('port'));
});

module.exports = app;
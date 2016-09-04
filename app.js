let express = require('express');
let passport = require('passport');
let session = require('express-session');
let path = require('path');
let logger = require('morgan');
let flash = require('connect-flash');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let helmet = require('helmet');
let csrf = require('csurf');
let ms = require('ms');

let routes = require('./routes');
let securityConfig = require('./config/security.js');

let app = express();

require("./server/modules/mongoDB")();
require("./server/modules/passport")();
require("./server/modules/nunjucks")(app);

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(helmet(securityConfig.helmetOptions));
app.use(express.static(path.resolve(__dirname, 'public'), { maxAge: ms('7 days') }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(securityConfig.sessionOptions));

// CSRF protection - needs to be modularized later on together with the other middlewares
app.use(csrf({}));
app.use(function (err, req, res, next) {

  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  res.status(403);
  res.send('Aus Sicherheitsgründen kann die gewünschte Aktion nicht ausgeführt werden');
});

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(app.get('port'), function() {
  console.log('Server started on port', app.get('port')); // eslint-disable-line no-console
});

module.exports = app;
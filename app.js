let express = require('express');
let passport = require('passport');
let session = require('express-session');
var RedisStore = require('connect-redis')(session);
let path = require('path');
let logger = require('morgan');
let flash = require('connect-flash');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let helmet = require('helmet');
let csrf = require('csurf');

let config = require('./config/config.js');
let services = require('./server/services/index.js');
let routes = require('./server/routes.js');
let csrfError = require('./server/middleware/csrf-custom-error.js');

let app = express();

if (config.env === 'production') {
  config.sessions['store'] = new RedisStore(config.redis.sessions);
}

services.initialize(app);

app.set('port', config.port);

app.use(logger('dev'));
app.use(helmet(config.helmet));
app.use(express.static(path.resolve(__dirname, 'public'), { maxAge: 604800000 })); // maxAge 7 days
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(config.cookies.secret));
app.use(session(config.sessions));
app.use(flash());
app.use(csrf({}));
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
});
app.use(csrfError);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(app.get('port'), function() {
  console.log('Server started on port', app.get('port')); // eslint-disable-line no-console
});

module.exports = app;
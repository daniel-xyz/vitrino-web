let express = require('express');
let passport = require('passport');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);
let path = require('path');
let logger = require('morgan');
let flash = require('connect-flash');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let helmet = require('helmet');
let csrf = require('csurf');
let historyFallback = require('connect-history-api-fallback');

let config = require('./config/config.js');
let services = require('./server/services/index.js');
let routes = require('./server/routes.js');


// Custom middleware
let csrfError = require('./server/middleware/csrf-custom-error.js');
let deadEnd = require('./server/middleware/dead-end.js');

let app = express();

if (config.env === 'production' || config.env === 'staging') {
  config.sessions['store'] = new RedisStore(config.redis.sessions);
}

services.initialize(app);

app.set('port', config.port);

app.use(logger('dev'));
app.use(helmet(config.helmet));
app.use(historyFallback()); // TODO - bring back 404 errors if no vue route matches (https://router.vuejs.org/en/essentials/history-mode.html)
app.use(express.static(path.resolve(__dirname, 'public'), { maxAge: 604800000 })); // maxAge 7 days
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(config.cookies.secret));
app.use(session(config.sessions));
app.use(flash());
app.use(csrf({}));
app.use(csrfError);
app.use(deadEnd);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(app.get('port'), function() {
  console.log('Server started on port', app.get('port')); // eslint-disable-line no-console
});

module.exports = app;
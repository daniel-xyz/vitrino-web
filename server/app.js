const express = require('express');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let logger = null;
const helmet = require('helmet');
const csrf = require('csurf');
const historyFallback = require('connect-history-api-fallback');

const config = require('./config.js');
const services = require('./services/index.js');
const routes = require('./routes.js');

if (config.env === 'development') {
    logger = require('morgan');
}

// Custom middleware
const csrfError = require('./middleware/csrf-custom-error.js');
const deadEnd = require('./middleware/dead-end.js');

const app = express();

if (config.env === 'production' || config.env === 'staging') {
    config.sessions.store = new RedisStore(config.redis.sessions);
}

services.initialize(app);

app.set('port', config.port);

if (logger) {
    app.use(logger('dev'));
}

app.use(deadEnd);
app.use(helmet(config.helmet));
app.use(historyFallback()); // TODO - bring back 404 errors if no vue route matches (https://router.vuejs.org/en/essentials/history-mode.html)
app.use(express.static(path.resolve(__dirname, '../dist/'), { maxAge: 604800000 })); // maxAge 7 days
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(config.cookies.secret));
app.use(session(config.sessions));
app.use(flash());
app.use(csrf({}));
app.use(csrfError);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(app.get('port'), () => {
    console.log('Server started on port', app.get('port')); // eslint-disable-line no-console
});

module.exports = app;

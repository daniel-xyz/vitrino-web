let config = require('../config.js');

let deadEnd = function (req, res, next) {

  if (config.env !== 'staging') {
    return next();
  }

  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  if (!login || !password || login !== config.stagingCredentials.login || password !== config.stagingCredentials.password) {
    res.set('WWW-Authenticate', 'Basic realm=\"Authorization Required\"');
    return res.status(401).send('Keinen Schritt weiter.');
  } else {
    next();
  }
};

module.exports = deadEnd;

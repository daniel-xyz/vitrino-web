/* eslint-disable no-buffer-constructor */
const config = require('../config.js');

const stagingAuth = (req, res, next) => {
  if (config.stagingCredentials.login === null) {
    return next();
  }

  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  if (!login || !password || login !== config.stagingCredentials.login || password !== config.stagingCredentials.password) {
    res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
    return res.status(401).send('Keinen Schritt weiter.');
  }

  return next();
};

module.exports = stagingAuth;

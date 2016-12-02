let config = require('../../config/config.js');

let deadEnd = function (req, res, next) {

  if (config.env !== 'staging') {
    return next();
  }

  const auth = {login: 'vitrinostring', password: 'Vitrino2017'};
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  console.log('Prüfe Zugriff ...');

  if (!login || !password || login !== auth.login || password !== auth.password) {
    console.log('Nicht authentifizierter Zugriff.');
    res.set('WWW-Authenticate', 'Basic realm=\"Authorization Required\"');
    return res.status(401).send('Keinen Schritt weiter.');
  } else {
    console.log('Authentifizierter Zugriff.');
    next();
  }
};

module.exports = deadEnd;
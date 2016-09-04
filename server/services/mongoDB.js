let mongoose = require ("mongoose");
let config = require ("../../config/database.js");
let mongoURI = config.uri.productive || config.uri.development || config.uri.local;

let configureMongoDB = function() {

  mongoose.connect(mongoURI, function (err) {
    if (err) {
      console.log('ERROR connecting to: ' + mongoURI + '. ' + err); // eslint-disable-line no-console
    } else {
      console.log('Succeeded connected to: ' + mongoURI); // eslint-disable-line no-console
    }
  });
};

module.exports = configureMongoDB;
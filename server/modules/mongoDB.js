let mongoose = require ("mongoose");
let mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URI_SANDBOX || 'mongodb://localhost:27017/test';

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
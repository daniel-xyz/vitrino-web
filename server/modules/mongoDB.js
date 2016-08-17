let mongoose = require ("mongoose");

let configureMongoDB = function() {
  'use strict';

  let mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URI_SANDBOX || 'mongodb://localhost:27017/test';

  mongoose.connect(mongoURI, function (err) {
    if (err) {
      console.log ('ERROR connecting to: ' + mongoURI + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + mongoURI);
    }
  });
};

module.exports = configureMongoDB;
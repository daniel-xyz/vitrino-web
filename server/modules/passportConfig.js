let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let User = require("../models/user");

let passportConfig = function() {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use("local-login", new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: "Dieser Benutzername existiert nicht"
        });
      }
      user.checkPassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Ungültiges Passwort"
          });
        }
      });
    });
  }));
};

module.exports = passportConfig;
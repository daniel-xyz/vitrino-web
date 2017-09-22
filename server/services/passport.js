let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let authHelper = require('../helpers/auth.js');
let User = require('../api/users/User.js');

let setupPassport = function () {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });

  passport.use("local", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (email, password, done) {
    User.findByEmail(email)
      .then((user) => {

        if (!user) {
          return done(null, false, {
            message: "Ein Benutzer mit dieser E-Mail existiert nicht"
          });
        }

        if (authHelper.comparePassword(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Ungültiges Passwort"
          });
        }
      })
      .catch((err) => {
        return done(err);
      });
  }));
};

module.exports = setupPassport;

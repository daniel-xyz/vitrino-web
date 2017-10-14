const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authHelper = require('../helpers/auth.js');
const User = require('../api/users/User.js');

const setupPassport = function () {
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

    passport.use('local', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        }, (email, password, done) => {
            User.findByEmail(email)
                .then((user) => {
                    if (!user) {
                        return done(null, false, {
                            message: 'Ein Benutzer mit dieser E-Mail existiert nicht',
                        });
                    }

                    if (authHelper.comparePassword(password, user.password)) {
                        return done(null, user);
                    }

                    return done(null, false, {
                        message: 'Ungültiges Passwort',
                    });
                })
                .catch(err => done(err));
        }));
};

module.exports = setupPassport;

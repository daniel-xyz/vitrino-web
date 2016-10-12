let bcrypt = require('bcryptjs');

function getHashedPassword (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

function comparePassword (userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "Bitte logge dich ein, um die gewünschte Seite zu sehen");
    res.redirect("/login");
  }
}

// authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex'); // TODO - re-implement this token when Double Opt-In is being implemented

module.exports = {
  getHashedPassword,
  comparePassword,
  ensureAuthenticated
};
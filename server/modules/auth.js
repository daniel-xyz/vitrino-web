let bcrypt = require('bcryptjs');
let knex = require('../services/knex.js');

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "Bitte logge dich ein, um die gewünschte Seite zu sehen");
    res.redirect("/login");
  }
}

function comparePassword (userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req) {
  let salt = bcrypt.genSaltSync();
  let hash = bcrypt.hashSync(req.body.password, salt);

  // authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex'); // TODO - check if we should keep authToken and save it in the user record

  return knex('users')
    .insert({
      email: req.body.email,
      password: hash
    })
    .returning('*');
}

module.exports = {
  ensureAuthenticated,
  comparePassword,
  createUser
};
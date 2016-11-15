let bcrypt = require('bcryptjs');
let crypto = require('crypto');

function generateSecureHash (string) {
  let salt = bcrypt.genSaltSync();

  return bcrypt.hashSync(string, salt);
}

function generateToken (string) {
  let seed = crypto.randomBytes(20);

  return crypto.createHash('sha1').update(seed + string).digest('hex');
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

function ensureRolePermissions (role) {
  return function(req, res, next) {
    if (req.user && req.user.role === role)
      next();
    else {
      req.flash("info", "Du verfügst leider nicht über die notwendigen Rechte um diese Seite zu sehen");
      res.redirect("/login");
    }
  };
}

module.exports = {
  generateSecureHash,
  generateToken,
  comparePassword,
  ensureAuthenticated,
  ensureRolePermissions
};
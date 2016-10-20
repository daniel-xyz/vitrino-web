let csrfErrorCheck = function (err, req, res, next) {

  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  res.status(403);
  req.flash('error', 'Bitte aktualisiere aus Sicherheitsgründen die Seite und führe die gewünschte Aktion erneut aus.');
  res.redirect('/')
};

module.exports = csrfErrorCheck;
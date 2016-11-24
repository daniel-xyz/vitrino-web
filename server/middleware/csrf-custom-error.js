let csrfErrorCheck = function (err, req, res, next) {

  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  res.status(403);
  res.send('Fehler: Bitte aktualisiere aus Sicherheitsgründen die Seite und führe die gewünschte Aktion erneut aus.')
};

module.exports = csrfErrorCheck;
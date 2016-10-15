let csrfErrorCheck = function (err, req, res, next) {

  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  res.status(403);
  res.send('Bitte aktualisiere aus Sicherheitsgründen die Seite, um die gewünschte Aktion auszuführen.');
};

module.exports = csrfErrorCheck;
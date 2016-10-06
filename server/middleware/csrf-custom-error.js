let csrfErrorCheck = function (err, req, res, next) {

  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  res.status(403);
  res.send('Aus Sicherheitsgründen kann die gewünschte Aktion nicht ausgeführt werden');
};

module.exports = csrfErrorCheck;
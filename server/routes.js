let express = require('express');
let router = express.Router();

router.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  res.locals.currentUser = req.user;
  res.locals.flashes = req.flash();
  next();
});

router.use(require('./components/index.js'));

module.exports = router;

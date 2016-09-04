let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
  res.render('index.html', {
    page_title: 'Startseite',
    port: router.get('port')
  });
});

module.exports = router;

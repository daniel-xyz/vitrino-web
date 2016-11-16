let express = require('express');
let router = express.Router();

router.use(require('./map'));
router.use(require('./user'));
router.use(require('./admin'));

module.exports = router;

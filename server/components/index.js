let express = require('express');
let router = express.Router();

router.use(require('./map'));
router.use(require('./user'));

module.exports = router;

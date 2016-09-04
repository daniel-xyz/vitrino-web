let express = require('express');
let router = express.Router();

router.use(require('./home'));
router.use(require('./user'));

module.exports = router;

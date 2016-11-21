let express = require('express');
let router = express.Router();

router.use(require('./map'));
router.use(require('./users'));
router.use(require('./companies'));
router.use(require('./stores'));
router.use(require('./products'));
router.use(require('./admin'));

module.exports = router;

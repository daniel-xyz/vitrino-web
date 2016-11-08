let express = require('express');
let authHelper = require('../../helpers/auth.js');
let router = express.Router();


router.get('/',
  authHelper.ensureRolePermissions('admin'), function(req, res) {
    res.render('map.html', {});
  }
);

module.exports = router;

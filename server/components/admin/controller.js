let express = require('express');
let authHelper = require('../../helpers/auth.js');
let router = express.Router();

const endpoint = '/admin';

router.get(endpoint, authHelper.ensureRolePermissions('admin'), function(req, res) {
    res.render('dashboard.html', {});
  }
);

module.exports = router;
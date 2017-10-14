const express = require('express');
const authHelper = require('../../helpers/auth.js');

const router = express.Router();
const endpoint = '/admin';

router.get(endpoint, authHelper.ensureRolePermissions('admin'), (req, res) => res.render('dashboard.html', {}));

module.exports = router;

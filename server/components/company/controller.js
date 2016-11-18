let express = require('express');
let authHelper = require('../../helpers/auth.js');
let Company = require('./Company.js');
let router = express.Router();

const endpoint = '/companies';

router.get(endpoint,
  authHelper.ensureRolePermissions('admin'), function (req, res) {
    Company.findAllCompanies()
      .then((companies) => {
        res.json(companies);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

router.post(endpoint + '/:id/verify',
  authHelper.ensureRolePermissions('admin'), function (req, res) {
    Company.verifyCompany(req.params.id)
      .then((companies) => {
        res.json(companies[0]);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

module.exports = router;
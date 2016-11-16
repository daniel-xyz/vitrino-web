let express = require('express');
let authHelper = require('../../helpers/auth.js');
let User = require('../user/User.js');
let Company = require('../company/Company.js');
let router = express.Router();


router.get('/admin',
  authHelper.ensureRolePermissions('admin'), function(req, res) {
    let users;
    var companies;

    let promiseUsers = User.findAllUsers()
      .then((result) => {
        users = result;
      })
      .catch((err) => {
        console.error(err.stack);
      });

    let promiseCompanies = Company.findAllCompanies()
      .then((result) => {
        companies = result;
      })
      .catch((err) => {
        console.error(err.stack);
      });

    Promise.all([promiseUsers, promiseCompanies]).then(() => {
      res.render('dashboard.html', {
        users: users,
        companies: companies
      });
    });
  }
);

router.get('/verify_company/:id',
  authHelper.ensureRolePermissions('admin'), function (req,res) {
  Company.verifyCompany(req.params.id)
    .then(() => {
      req.flash("success", "Unternehmen wurde freigeschaltet!");
      return res.redirect('/admin');
    })
    .catch((err) => {
      console.error(err);
      req.flash("error", "Es leider etwas schief gelaufen.");
      return res.redirect('/admin');
    });
});

module.exports = router;
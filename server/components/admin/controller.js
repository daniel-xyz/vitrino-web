let express = require('express');
let authHelper = require('../../helpers/auth.js');
let User = require('../user/User.js');
let Company = require('../company/Company.js');
let Product = require('../product/Product.js');
let router = express.Router();


router.get('/admin',
  authHelper.ensureRolePermissions('admin'), function(req, res) {
    let users;
    var companies;
    var products;

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

    let promiseProducts = Product.findAllProducts()
      .then((result) => {
        products = result;
      })
      .catch((err) => {
        console.error(err.stack);
      });

    Promise.all([promiseUsers, promiseCompanies, promiseProducts]).then(() => {
      res.render('dashboard.html', {
        users: users,
        companies: companies,
        products: products
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

router.get('/verify_product/:id',
  authHelper.ensureRolePermissions('admin'), function (req,res) {
  Product.verifyProduct(req.params.id)
    .then(() => {
      req.flash("success", "Produkt wurde freigeschaltet!");
      return res.redirect('/admin');
    })
    .catch((err) => {
      console.error(err);
      req.flash("error", "Es leider etwas schief gelaufen.");
      return res.redirect('/admin');
    });
});

module.exports = router;
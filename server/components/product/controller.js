let express = require('express');
let authHelper = require('../../helpers/auth.js');
let Product = require('./Product.js');
let router = express.Router();

const endpoint = '/products';

router.get(endpoint,
  authHelper.ensureRolePermissions('admin'), function (req, res) {
    Product.findAllProducts()
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

router.post(endpoint + '/:id/verify',
  authHelper.ensureRolePermissions('admin'), function (req, res) {
    Product.verifyProduct(req.params.id)
      .then((products) => {
        res.json(products[0]);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

module.exports = router;
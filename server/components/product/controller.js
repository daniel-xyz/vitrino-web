let express = require('express');
let Product = require('./Product.js');
let api = express.Router();

const endpoint = '/api/products';

api.get(endpoint, function (req, res) {
    Product.findAllProducts()
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

api.post(endpoint + '/:id/verify', function (req, res) {
    Product.verifyProduct(req.params.id)
      .then((products) => {
        res.json(products[0]);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

module.exports = api;
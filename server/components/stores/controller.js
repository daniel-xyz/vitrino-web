let fetch = require('node-fetch');
let config = require('../../config');
let express = require('express');
let Store = require('./Store.js');
let yelp = require('../../services/yelp');
let api = express.Router();

const endpoint = '/api/stores';

api.get(endpoint, function (req, res) {
  Store.findAllStores()
    .then((stores) => {
      res.json(stores);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

api.get(endpoint + '/yid/:yid', function (req, res) {
  yelp.findStoreByYelpID(req.params.yid)
    .then(res => res.json())
    .then(json => res.json(json))
    .catch(err => res.status(500).json(err));
});

api.get(endpoint + '/radius/:lat/:lng/:meters', function (req, res) {
  yelp.findStoresByRadius(req.params.lat, req.params.lng, req.params.meters)
    .then(res => res.json())
    .then(json => res.json(json))
    .catch(err => res.status(500).json(err));

  // Store.findAllStoresNear(req.params.lat, req.params.lng, req.params.meters)
  //   .then((stores) => {
  //     res.json(stores);
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err);
  //   });
});

api.get(endpoint + '/:store/products/window', function (req, res) {
  Store.findProductsInStoreWindow(req.params.store)
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = api;

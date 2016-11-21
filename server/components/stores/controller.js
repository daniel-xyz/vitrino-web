let express = require('express');
let Store = require('./Store.js');
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
  }
);

api.get(endpoint + '/radius/:lat/:lng/:meters', function (req, res) {
    Store.findAllStoresNear(req.params.lat, req.params.lng, req.params.meters)
      .then((stores) => {
        res.json(stores);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

module.exports = api;
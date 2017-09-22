const express = require('express');
const Store = require('./Store.js');
const yelp = require('../../services/yelp');

const api = express.Router();

const endpoint = '/api/stores';

api.get(endpoint, (req, res) => {
    Store.findAllStores()
        .then(stores => res.json(stores))
        .catch(err => res.status(500).json(err));
});

api.get(endpoint + '/yid/:yid', (req, res) => {
    yelp.findStoreByYelpID(req.params.yid)
        .then(store => store.json())
        .then(json => res.json(json))
        .catch(err => res.status(500).json(err));
});

api.get(endpoint + '/:id', (req, res) => {
    Store.findStoreByID(req.params.id)
        .then(store => store.json())
        .then(json => res.json(json))
        .catch(err => res.status(500).json(err));
});

api.get(endpoint + '/radius/:lat/:lng/:meters', (req, res) => {
    yelp.findStoresByRadius(req.params.lat, req.params.lng, req.params.meters)
        .then(stores => stores.json())
        .then(json => res.json(json))
        .catch(err => res.status(500).json(err));

    // Store.findAllStoresNear(req.params.lat, req.params.lng, req.params.meters)
    //   .then(stores => res.json(stores))
    //   .catch(err => res.status(500).json(err));
});

api.get(endpoint + '/:id/products/window', (req, res) => {
    Store.findProductsInStoreWindow(req.params.id)
        .then(products => res.json(products))
        .catch(err => res.status(500).json(err));
});

module.exports = api;

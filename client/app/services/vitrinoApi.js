/* eslint-disable */

import { getJSON, post } from '../utils/ajax'

const endpoint = '/api';

let users = {

  getAll: function (callback) {
    getJSON(endpoint + '/users/', null, callback)
  }
};

let companies = {

  getAll: function (callback) {
    getJSON(endpoint + '/companies/', null, callback)
  },

  verify: function (id, callback) {
    post(endpoint + '/companies/' + id + '/verify', callback)
  }
};

let stores = {

  getAll: function (callback) {
    getJSON(endpoint + '/stores/', null, callback);
  },

  getStoreWindowProducts: function (storeId, callback) {
    getJSON(endpoint + '/stores/' + storeId + '/products/window', null, callback);
  },

  getStoresInRadius: function (lat, lng, meters, callback) {
    getJSON(endpoint + '/stores/radius/' + lat + '/' + lng + '/' + meters, null, callback);
  },

  getStoreByYelpID: function (yelpID, callback) {
    getJSON(endpoint+ '/stores/yid/' + yelpID, null, callback);
  }
};

let products = {

  getAll: function (callback) {
    getJSON(endpoint + '/products/', null, callback)
  },

  verify: function (id, callback) {
    post(endpoint + '/products/' + id + '/verify', callback)
  }
};

export {
  users,
  companies,
  stores,
  products
};

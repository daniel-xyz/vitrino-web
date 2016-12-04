/* eslint-disable */

var VitrinoLib = VitrinoLib || {};

VitrinoLib.Api = (function () {

  const ajax = VitrinoLib.Ajax;
  const endpoint = '/api';

  var users = {

    getAll: function (callback) {
      ajax.getJSON(endpoint + '/users/', function (json) {
        callback(null, json);
      }, function (status) {
        callback(status, null);
      })
    }
  };

  var companies = {

    getAll: function (callback) {
      ajax.getJSON(endpoint + '/companies/', function (json) {
        callback(null, json);
      }, function (status) {
        callback(status, null);
      })
    },

    verify: function (id, callback) {
      ajax.post(endpoint + '/companies/' + id + '/verify', function (json) {
        callback(null, json);
      }, function (status) {
        callback(status, null);
      })
    }
  };

  var stores = {

    getAll: function (callback) {
      ajax.getJSON(endpoint + '/stores/', function (data) {
        callback(null, data);
      }, function (status) {
        callback(status, null);
      });
    },

    getStoreWindowProducts: function (storeId, callback) {
      ajax.getJSON(endpoint + '/stores/' + storeId + '/products/window', function (json) {
        callback(null, json)
      }, function (status) {
        callback(status, null);
      });
    }
  };

  var products = {

    getAll: function (callback) {
      ajax.getJSON(endpoint + '/products/', function (json) {
        callback(null, json);
      }, function (status) {
        callback(status, null);
      })
    },

    verify: function (id, callback) {
      ajax.post(endpoint + '/products/' + id + '/verify', function (json) {
        callback(null, json);
      }, function (status) {
        callback(status, null);
      })
    }
  };

  return {
    users: users,
    companies: companies,
    stores: stores,
    products: products
  };

})();
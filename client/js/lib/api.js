/* eslint-disable */

var VitrinoLib = VitrinoLib || {};

VitrinoLib.Api = (function () {

  const endpoint = '/api';

  var users = {

    getAll: function (callback) {
      $.getJSON(endpoint + '/users/')
        .done(function (json) {
          callback(null, json);
        })
        .fail(function (jqxhr, textStatus, error ) {
          var error = textStatus + ", " + error;
          callback(error, null);
        });
    }
  };

  var companies = {

    getAll: function (callback) {
      $.getJSON(endpoint + '/companies/')
        .done(function (json) {
          callback(null, json);
        })
        .fail(function (jqxhr, textStatus, error ) {
          var error = textStatus + ", " + error;
          callback(error, null);
        });
    },

    verify: function (id, callback) {
      $.post(endpoint + '/companies/' + id + '/verify')
        .done(function (json) {
          callback(null, json);
        })
        .fail(function (jqxhr, textStatus, error ) {
          var error = textStatus + ", " + error;
          callback(error, null);
        });
    }
  };

  var stores = {

    getAll: function (callback) {
      $.getJSON(endpoint + '/stores/')
        .done(function (json) {
          callback(null, json);
        })
        .fail(function (jqxhr, textStatus, error ) {
          var error = textStatus + ", " + error;
          callback(error, null);
        });
    }
  };

  var products = {

    getAll: function (callback) {
      $.getJSON(endpoint + '/products/')
        .done(function (json) {
          callback(null, json);
        })
        .fail(function (jqxhr, textStatus, error ) {
          var error = textStatus + ", " + error;
          callback(error, null);
        });
    },

    verify: function (id, callback) {
      $.post(endpoint + '/products/' + id + '/verify')
        .done(function (json) {
          callback(null, json);
        })
        .fail(function (jqxhr, textStatus, error ) {
          var error = textStatus + ", " + error;
          callback(error, null);
        });
    }
  };

  return {
    users: users,
    companies: companies,
    stores: stores,
    products: products
  };

})();
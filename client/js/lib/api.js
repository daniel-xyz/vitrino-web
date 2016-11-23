/* eslint-disable */

var VitrinoLib = VitrinoLib || {};

VitrinoLib.Api = (function () {

  const endpoint = '/api';

  var getAllStores = function (callback) {
    $.getJSON(endpoint + '/stores/')
      .done(function (json) {
        callback(null, json);
      })
      .fail(function (jqxhr, textStatus, error ) {
        var error = textStatus + ", " + error;
        callback(error, null);
      });
  };

  return {
    getAllStores: getAllStores
  };

})();
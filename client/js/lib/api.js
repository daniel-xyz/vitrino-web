/* eslint-disable */

var VitrinoLib = VitrinoLib || {};

VitrinoLib.Api = (function () {

  const endpoint = '/api';

  var getAllStores = function (callback) {
    axios.get(endpoint + '/stores/')
      .then(function(response) { // TODO - fallback for IE 11 and other browser that don't support promises (eg. https://github.com/mzabriskie/axios/issues/135)
        callback(null, response);
      }).catch(function (error) {
        callback(error, null);
        console.error(error.stack);
    });
  };

  return {
    getAllStores: getAllStores
  };

})();
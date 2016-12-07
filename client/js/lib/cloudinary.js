/* eslint-disable */

var VitrinoLib = VitrinoLib || {};

VitrinoLib.Cloudinary = (function () {

  const baseUrl = 'https://res.cloudinary.com/dj82hrksp/image/upload/';

  function buildImageUrl (imageUrl, height, width, density) {
    var url = baseUrl;

    url += 'c_fill,g_auto,';
    url += 'h_' + height + ',w_' + width;

    if (density) {
      url += ',dpr_' + density + '.0/';
    } else {
      url += '/'
    }

    return url + imageUrl;
  }

  return {
    buildImageUrl: buildImageUrl
  };

})();
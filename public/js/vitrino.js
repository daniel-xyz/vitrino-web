/* eslint-disable */

var VitrinoLib = VitrinoLib || {};

VitrinoLib.Ajax = (function () {

  function send (method, json, url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open(method, url, true);

    if (method === 'post') {
      xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }

    xhr.onreadystatechange = function() {
      var status;
      var data;

      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;

        if (status == 200) {
          data = json ? JSON.parse(xhr.responseText) : xhr.responseText;
          successHandler && successHandler(data);
        } else {
          errorHandler && errorHandler(status);
        }
      }
    };

    xhr.send();
  }

  function getJSON (url, successHandler, errorHandler) {
    send('get', true, url, successHandler, errorHandler)
  }

  function post (url, successHandler, errorHandler) {
    send('post', true, url, successHandler, errorHandler)
  }

  return {
    getJSON: getJSON,
    post: post
  };

})();
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
/* eslint-disable */

Vue.component('store-window', {
  data: function () {
    return {
      show: false,
      company: {
        name: '',
        description: '',
        logo_url: ''
      },
      store: {
        id: ''
      },
      products: {
        store_window: []
      }
    }
  },

  watch: {
    'store.id': function () {
      const self = this;
      var store_window = self.products.store_window;

      store_window.splice(0, store_window.length);

      VitrinoLib.Api.stores.getStoreWindowProducts(self.store.id, function (error, products) {
        products.forEach(function (product) {
          if (product.image_url) {
            store_window.push({
              id: product.id,
              image_url: product.image_url
            });
          }
        })
      });
    }
  },

  created: function () {
    const self = this;

    eventHub.$on('markerClicked', function (store) {
      self.company.name = store.company;
      self.company.description = store.description;
      self.company.logo_url = store.logo_url;
      self.store.id = store.id;
      self.show = true;
    });

    eventHub.$on('mapClicked', function () {
      self.show = false;
    });
  },

  destroyed: function () {
    eventHub.$off('markerClicked');
    eventHub.$off('mapClicked');
  }
});
/* eslint-disable */

var map;
var mapConfig = {
  accessToken: 'pk.eyJ1IjoiZGFuaWVsYmlzY2hvZmYiLCJhIjoiY2l1enE4cWY1MDAyazJ4cDZxYjdramk2OCJ9.MUanhYSFZNfJZOjiLRWybw',
  style: 'mapbox://styles/danielbischoff/citr5jj1b000d2irvg4mbic27',
  markerIcons: {
    1: 'marker-clothes',
    2: 'marker-jewellery',
    3: 'marker-gifts',
    4: 'marker-cosmetics',
    5: 'marker-clothes',
    6: 'marker-clothes',
    7: 'marker-home',
    8: 'marker-clothes'
  }
};

if (window.mapboxgl && !mapboxgl.supported()) {
  console.log('Your browser doesn\'t support Mapbox GL.');
} else if (window.mapboxgl && document.getElementById("map") !== null) {
  initMap();
  initControls();
  initEventListeners();
}

function initMap () {
  mapboxgl.accessToken = mapConfig.accessToken;

  map = new mapboxgl.Map({
    container: 'map',
    style: mapConfig.style
  });
}

function initControls () {
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    country: 'de',
    placeholder: 'Ort, Straße, Hausnummer'
  }));
}

function loadAllMarkers () {
  VitrinoLib.Api.stores.getAll(function (error, response) {
    var features = [];

    if (error) {
      return console.error(error.stack);
    }

    response.forEach(function (store) {
      var icon = mapConfig.markerIcons[store['product_category']];

      features.push({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [store.lng, store.lat]
        },
        "properties": {
          "id": store.id,
          "company": store.company,
          "description": store.description,
          "logo_url": store.logo_url ? store.logo_url : '',
          "icon": icon
        }
      });
    });

    addSource(features);
    addLayer();
  });
}

function addSource(features) {
  map.addSource("points", {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": features
    }
  });
}

function addLayer () {
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": "points",
    "layout": {
      "icon-image": "{icon}",
      "icon-offset": [0, -51],
      "icon-allow-overlap": true
    }
  });
}

function removeLoadingLayer () {
  var loadingLayer = document.getElementById("loading");

  loadingLayer.classList.add("hide-opacity");

  window.setTimeout(function () {
    loadingLayer.classList.add("hide");
  }, 500);
}

function initEventListeners () {
  map.once('load', function () {
    removeLoadingLayer();
    loadAllMarkers();
  });

  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {layers: ['points']});

    if (!features.length) {
      eventHub.$emit('mapClicked');
      return;
    }

    var feature = features[0];

    eventHub.$emit('markerClicked', {
      id: feature.properties.id,
      company: feature.properties.company,
      description: feature.properties.description,
      logo_url: feature.properties.logo_url
    });
  })
}

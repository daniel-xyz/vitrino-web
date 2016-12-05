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
  }, 1000);
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

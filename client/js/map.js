/* eslint-disable */

var map;

if (window.mapboxgl && !mapboxgl.supported()) {
  console.log('Your browser doesn\'t support Mapbox GL.');
} else if (window.mapboxgl) {
  initMap();
  initEventListeners();
}

function initMap () {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYmlzY2hvZmYiLCJhIjoiY2l1enE4cWY1MDAyazJ4cDZxYjdramk2OCJ9.MUanhYSFZNfJZOjiLRWybw';

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/danielbischoff/citr5jj1b000d2irvg4mbic27'
  });
}

function initGeoSearch () {
  map.addControl(new mapboxgl.Geocoder({
    country: 'de',
    placeholder: 'Ort, Straße, Hausnummer'
  }));
}

function loadAllMarkers () {
  var features = [];

  VitrinoLib.Api.getAllStores(function (error, response) {
    response.data.forEach(function (store) {

      features.push({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [store.lng, store.lat]
        },
        "properties": {
          "title": store.name,
          "description": "Ich verkaufe Mäntel in jeder Größe.",
          "icon": "marker-jewellery"
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

function initEventListeners () {
  map.once('load', function () {
    loadAllMarkers();
    initGeoSearch();
  });

  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {layers: ['points']});

    if (!features.length) {
      return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    new mapboxgl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML(feature.properties.description)
      .addTo(map);
  });
}

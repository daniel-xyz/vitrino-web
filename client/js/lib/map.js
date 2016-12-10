/* eslint-disable */

var VitrinoLib = VitrinoLib || {};

VitrinoLib.Map = (function () {

  var map;
  var container = 'map';
  var markers = {};
  var mapConfig = {
    accessToken: 'pk.eyJ1IjoiZGFuaWVsYmlzY2hvZmYiLCJhIjoiY2l1enE4cWY1MDAyazJ4cDZxYjdramk2OCJ9.MUanhYSFZNfJZOjiLRWybw',
    style: 'mapbox://styles/danielbischoff/citr5jj1b000d2irvg4mbic27',
    markerNames: [
      'marker-clothes',
      'marker-jewellery',
      'marker-gifts',
      'marker-cosmetics',
      'marker-art',
      'marker-hobby',
      'marker-home',
      'marker-kids'
    ]
  };

  function initialize () {
    if (window.mapboxgl && !mapboxgl.supported()) {
      console.log('Your browser doesn\'t support Mapbox GL.');
    } else if (window.mapboxgl && document.getElementById(container) !== null) {
      mapboxgl.accessToken = mapConfig.accessToken;

      map = new mapboxgl.Map({
        container: container,
        style: mapConfig.style
      });

      map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        country: 'de',
        placeholder: 'Ort, Straße, Hausnummer'
      }));

      map.addControl(new mapboxgl.NavigationControl());

      initEventListeners();
    }
  }

  function loadAllMarkers () {
    VitrinoLib.Api.stores.getAll(function (error, response) {

      if (error) {
        return console.error(error.stack);
      }

      response.forEach(function (store) {
        var markerType = getMarkerName(store['product_category']);

        if (!markers[markerType]) {
          markers[markerType] = [];
        }

        markers[markerType].push({
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
            "icon": markerType
          }
        });
      });

      Object.keys(markers).forEach(function (markerType) {
        addSource(markerType, markers[markerType]);
        addLayer(markerType);
      });
    });
  }

  function addSource(sourceID, features) {
    map.addSource(sourceID, {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": features
      }
    });
  }

  function addLayer (sourceID) {
    map.addLayer({
      "id": sourceID,
      "type": "symbol",
      "source": sourceID,
      "layout": {
        "icon-image": "{icon}",
        "icon-offset": [0, -51],
        "icon-allow-overlap": true
      }
    });
  }

  function removeLoadingLayer () {
    var loadingLayer = document.getElementById("map-loading-screen");

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
      var features = map.queryRenderedFeatures(e.point, { layers: Object.keys(markers) });

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

  function getMarkerName (categoryId) {
    return mapConfig.markerNames[categoryId - 1];
  }

  function hideLayer (layer) {
    if (map.getLayer(layer)) {
      map.setLayoutProperty(layer, 'visibility', 'none');
    }
  }

  function showLayer (layer) {
    if (map.getLayer(layer)) {
      map.setLayoutProperty(layer, 'visibility', 'visible');
    }
  }

  return {
    initialize: initialize,
    hideLayer: hideLayer,
    showLayer: showLayer
  };

})();
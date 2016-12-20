<template>
  <div>
    <div id="map"></div>
    <div id="map-loading-screen" class="main-layer hide-md-and-up">
      <div id="loading-container">
        <div id="loading-image"></div>
        <div id="loading-text">
          <h4>Karte wird geladen ...</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { stores } from '../js/lib/api.js'

  export default {
    name: 'mapbox',
    data: function () {
      return {
        map: {},
        markers: {}
      }
    },

    methods: {
      initialize: function () {
        if (mapboxgl && !isSupported) {
          console.log('Your browser doesn\'t support Mapbox GL.');

        } else if (mapboxgl !== null) {
          mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYmlzY2hvZmYiLCJhIjoiY2l1enE4cWY1MDAyazJ4cDZxYjdramk2OCJ9.MUanhYSFZNfJZOjiLRWybw';

          this.map = new mapboxgl.Map({
            attributionControl: false,
            container: 'map',
            style: 'mapbox://styles/danielbischoff/citr5jj1b000d2irvg4mbic27'
          });

          this.map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            country: 'de',
            placeholder: 'Ort, Straße, Hausnummer'
          }));

          this.map.addControl(new mapboxgl.NavigationControl());

          this.map.addControl(new mapboxgl.AttributionControl({
            compact: true
          }));

          this.initEventListeners();
        }
      },

      loadAllMarkers: function () {
        const self = this;

        stores.getAll(function (error, response) {

          if (error) {
            return console.error(error.stack);
          }

          response.forEach(function (store) {
            let markerType = self.getMarkerName(store['product_category']);

            if (!self.markers[markerType]) {
              self.markers[markerType] = [];
            }

            self.markers[markerType].push({
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

          Object.keys(self.markers).forEach(function (markerType) {
            self.addSource(markerType, self.markers[markerType]);
            self.addLayer(markerType);
          });
        });
      },

      addSource: function (sourceID, features) {
        this.map.addSource(sourceID, {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": features
          }
        });
      },

      addLayer: function (sourceID) {
        this.map.addLayer({
          "id": sourceID,
          "type": "symbol",
          "source": sourceID,
          "layout": {
            "icon-image": "{icon}",
            "icon-offset": [0, -51],
            "icon-allow-overlap": true
          }
        });
      },

      removeLoadingLayer: function () {
        let loadingLayer = document.getElementById("map-loading-screen");

        loadingLayer.classList.add("hide-opacity");

        window.setTimeout(function () {
          loadingLayer.classList.add("hide");
        }, 500);
      },

      initEventListeners: function () {
        const self = this;

        self.map.once('load', function () {
          self.removeLoadingLayer();
          self.loadAllMarkers();
        });

        self.map.on('click', function (e) {
          let features = self.map.queryRenderedFeatures(e.point, { layers: Object.keys(self.markers) });

          if (!features.length) {
            // self.$bus.$emit('mapClicked');
            self.$router.push({ path: '/' });
            return;
          }

          let feature = features[0];

          self.$router.push({
            path: '/store/window/' + feature.properties.id,
            query: { // TODO - good cancidate for vuex
              company: feature.properties.company,
              description: feature.properties.description,
              logo_url: feature.properties.logo_url
            }
          });
        })
      },

      getMarkerName: function (categoryId) {
        const markerNames = [
          'marker-clothes',
          'marker-jewellery',
          'marker-gifts',
          'marker-cosmetics',
          'marker-art',
          'marker-hobby',
          'marker-home',
          'marker-kids'
        ];

        return markerNames[categoryId - 1];
      },

      hideLayer: function (layer) {
        if (this.map.getLayer(layer)) {
          this.map.setLayoutProperty(layer, 'visibility', 'none');
        }
      },

      showLayer: function (layer) {
        if (this.map.getLayer(layer)) {
          this.map.setLayoutProperty(layer, 'visibility', 'visible');
        }
      }
    },

    mounted: function () {
      const self = this;

      self.initialize();

      this.$bus.$on('showLayer', function (layer) {
        self.showLayer(layer.layerName);
      });

      this.$bus.$on('hideLayer', function (layer) {
        self.hideLayer(layer.layerName);
      });
    }
  };
</script>
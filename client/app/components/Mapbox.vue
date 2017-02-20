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
  import { stores } from '../services/api';

  export default {
    name: 'mapbox',
    data() {
      return {
        map: {},
        markers: {},
      };
    },

    methods: {
      initialize() {
        if (mapboxgl && !isSupported) {
          console.log('Your browser doesn\'t support Mapbox GL.'); // eslint-disable-line no-console
        } else if (mapboxgl !== null) {
          mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYmlzY2hvZmYiLCJhIjoiY2l1enE4cWY1MDAyazJ4cDZxYjdramk2OCJ9.MUanhYSFZNfJZOjiLRWybw';

          this.map = new mapboxgl.Map({
            attributionControl: false,
            container: 'map',
            style: 'mapbox://styles/danielbischoff/citr5jj1b000d2irvg4mbic27',
          });

          this.map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            country: 'de',
            placeholder: 'Ort, Straße, Hausnummer',
          }));

          this.map.addControl(new mapboxgl.NavigationControl());

          this.map.addControl(new mapboxgl.AttributionControl({
            compact: true,
          }));

          this.initEventListeners();
        }
      },

      loadAllMarkers() {
        const self = this;

        stores.getAll((error, response) => {
          if (error) {
            return console.error(error.stack); // eslint-disable-line no-console
          }

          response.forEach((store) => {
            const markerType = self.getMarkerName(store['product_category']); // eslint-disable-line dot-notation

            if (!self.markers[markerType]) {
              self.markers[markerType] = [];
            }

            self.markers[markerType].push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [store.lng, store.lat],
              },
              properties: {
                id: store.id,
                company: store.company,
                description: store.description,
                logo_url: store.logo_url ? store.logo_url : '',
                icon: markerType,
              },
            });
          });

          Object.keys(self.markers).forEach((markerType) => {
            self.addSource(markerType, self.markers[markerType]);
            self.addLayer(markerType);
          });

          return null;
        });
      },

      addSource(sourceID, features) {
        this.map.addSource(sourceID, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features,
          },
        });
      },

      addLayer(sourceID) {
        this.map.addLayer({
          id: sourceID,
          type: 'symbol',
          source: sourceID,
          layout: {
            'icon-image': '{icon}',
            'icon-offset': [0, -51],
            'icon-allow-overlap': true,
          },
        });
      },

      removeLoadingLayer() {
        const loadingLayer = document.getElementById('map-loading-screen');

        loadingLayer.classList.add('hide-opacity');

        window.setTimeout(() => {
          loadingLayer.classList.add('hide');
        }, 500);
      },

      initEventListeners() {
        const self = this;

        self.map.once('load', () => {
          self.removeLoadingLayer();
          self.loadAllMarkers();
        });

        self.map.on('click', (e) => {
          const features = self.map.queryRenderedFeatures(e.point, { layers: Object.keys(self.markers) });

          if (!features.length) {
            // self.$bus.$emit('mapClicked');
            self.$router.push({ path: '/' });
            return;
          }

          const feature = features[0];

          self.$router.push({
            path: `/store/window/${feature.properties.id}`,
            query: { // TODO - good cancidate for vuex
              company: feature.properties.company,
              description: feature.properties.description,
              logo_url: feature.properties.logo_url,
            },
          });
        });
      },

      getMarkerName(categoryId) {
        const markerNames = [
          'marker-clothes',
          'marker-jewellery',
          'marker-gifts',
          'marker-cosmetics',
          'marker-art',
          'marker-hobby',
          'marker-home',
          'marker-kids',
        ];

        return markerNames[categoryId - 1];
      },

      hideLayer(layer) {
        if (this.map.getLayer(layer)) {
          this.map.setLayoutProperty(layer, 'visibility', 'none');
        }
      },

      showLayer(layer) {
        if (this.map.getLayer(layer)) {
          this.map.setLayoutProperty(layer, 'visibility', 'visible');
        }
      },
    },

    mounted() {
      const self = this;

      self.initialize();

      this.$bus.$on('showLayer', (layer) => {
        self.showLayer(layer.layerName);
      });

      this.$bus.$on('hideLayer', (layer) => {
        self.hideLayer(layer.layerName);
      });
    },
  };
</script>

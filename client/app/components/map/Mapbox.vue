<template>
  <div id="map-container">
    <div id="map"></div>
    <store-filter></store-filter>
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
  import { mapGetters, mapActions } from 'vuex';
  import * as _ from 'lodash';
  import StoreFilter from './StoreFilter';

  export default {
    name: 'map',
    components: {
      StoreFilter,
    },
    data () {
      return {
        map: {},
      };
    },

    methods: {
      ...mapActions({
        setPosition: 'mapbox/position',
        loadMarkers: 'mapbox/loadAllMarkers',
      }),
      initialize () {
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

      addSource (sourceID, features) {
        this.map.addSource(sourceID, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features,
          },
        });
      },

      addLayer (sourceID) {
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

      removeLoadingLayer () {
        const loadingLayer = document.getElementById('map-loading-screen');

        loadingLayer.classList.add('hide-opacity');

        _.delay(() => {
          loadingLayer.classList.add('hide');
        }, 500);
      },

      initEventListeners () {
        this.map.once('load', () => {
          this.removeLoadingLayer();
          this.setPosition({ lat: '52.500511', lng: '13.444584', meters: '2000' });
        });

        this.map.on('click', this.onMapClickHandler);
        this.map.on('mousemove', this.onMouseMoveHandler);
      },

      onMapClickHandler (e) {
        const features = this.map.queryRenderedFeatures(e.point, { layers: Object.keys(this.markers) });

        if (!features.length) {
          this.$router.push({ path: '/' });
          return;
        }

        const feature = features[0];

        this.$router.push({
          path: `/store/${feature.properties.yid}`,
          query: {
            name: feature.properties.name,
          },
        });
      },

      onMouseMoveHandler (e) {
        const features = this.map.queryRenderedFeatures(e.point, { layers: Object.keys(this.markers) });

        this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      },

      hideLayer (layer) {
        if (this.map.getLayer(layer)) {
          this.map.setLayoutProperty(layer, 'visibility', 'none');
        }
      },

      showLayer (layer) {
        if (this.map.getLayer(layer)) {
          this.map.setLayoutProperty(layer, 'visibility', 'visible');
        }
      },
    },

    computed: {
      ...mapGetters({
        getStoreType: 'mapbox/storeType',
        filters: 'storefilters/getAllFilters',
        markers: 'mapbox/markers',
        addedMarkers: 'mapbox/addedMarkers',
      }),
    },

    watch: {
      filters: {
        handler (filters) {
          const self = this;

          Object.keys(self.filters).forEach((filterName) => {
            if (filters[filterName]) {
              self.showLayer(`marker-${filterName}`);
            } else {
              self.hideLayer(`marker-${filterName}`);
            }
          });
        },
        deep: true,
      },
      addedMarkers: {
        handler () {
          Object.keys(this.markers).forEach((markerType) => {
            this.addSource(markerType, this.markers[markerType]);
            this.addLayer(markerType);
          });
        },
      },
    },

    mounted () {
      this.initialize();
    },
  };
</script>

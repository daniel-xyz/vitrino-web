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
    import {
        mapGetters,
        mapActions,
    } from 'vuex';

    import StoreFilter from './StoreFilter';

    export default {
        name: 'map',
        components: {
            StoreFilter,
        },
        data () {
            return {
                map: {},
                fakePosition: {
                    lat: '52.500511',
                    lng: '13.444584',
                    markerRadius: '2000',
                },
            };
        },

        computed: {
            ...mapGetters(
                {
                    filters: 'storefilters/getAllFilters',
                    markers: 'mapbox/markers',
                    lastMarkerUpdateAt: 'mapbox/lastMarkerUpdateAt',
                },
            ),
        },

        methods: {
            ...mapActions(
                {
                    loadMarkersInRadius: 'mapbox/loadMarkersInRadius',
                },
            ),

            initialize () {
                this.map = this.initMapbox();
                this.addMapControls();
                this.initEventListeners();
            },

            initMapbox () {
                if (mapboxgl && !isSupported) {
                    return console.log('Your browser doesn\'t support Mapbox GL.'); // eslint-disable-line no-console
                }

                mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYmlzY2hvZmYiLCJhIjoiY2l1enE4cWY1MDAyazJ4cDZxYjdramk2OCJ9.MUanhYSFZNfJZOjiLRWybw';

                return new mapboxgl.Map(
                    {
                        attributionControl: false,
                        container: 'map',
                        style: 'mapbox://styles/danielbischoff/citr5jj1b000d2irvg4mbic27',
                    },
                );
            },

            addMapControls () {
                this.map.addControl(new MapboxGeocoder(
                    {
                        accessToken: mapboxgl.accessToken,
                        country: 'de',
                        placeholder: 'Ort, Straße, Hausnummer',
                    },
                ));

                this.map.addControl(new mapboxgl.NavigationControl());

                this.map.addControl(new mapboxgl.GeolocateControl(
                    {
                        positionOptions: {
                            enableHighAccuracy: false,
                        },
                        trackUserLocation: true,
                    },
                ));

                this.map.addControl(new mapboxgl.AttributionControl(
                    {
                        compact: true,
                    },
                ));
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
                this.map.addLayer(
                    {
                        id: sourceID,
                        type: 'symbol',
                        source: sourceID,
                        layout: {
                            'icon-image': '{icon}',
                            'icon-offset': [0, -51],
                            'icon-allow-overlap': true,
                        },
                    },
                );
            },

            removeLoadingLayer () {
                const loadingLayer = document.getElementById('map-loading-screen');

                loadingLayer.classList.add('hide-opacity');

                window.setTimeout(() => {
                    loadingLayer.classList.add('hide');
                }, 500);
            },

            initEventListeners () {
                this.map.once('load', () => {
                    this.removeLoadingLayer();
                    this.loadMarkersInRadius(this.fakePosition);
                });

                this.map.on('click', this.onMapClickHandler);
                this.map.on('mousemove', this.onMouseMoveHandler);
            },

            onMapClickHandler (e) {
                const features = this.map.queryRenderedFeatures(e.point, { layers: Object.keys(this.markers) });

                if (!features.length) {
                    return this.$router.push({ path: '/' });
                }

                return this.$router.push(`/store/${features[0].properties.id}`);
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

        watch: {
            filters: {
                handler (filters) {
                    const self = this;

                    filters.forEach((filter) => {
                        if (filter.active) {
                            self.showLayer(`marker-${filter.name}`);
                        } else {
                            self.hideLayer(`marker-${filter.name}`);
                        }
                    });
                },
                deep: true,
            },

            lastMarkerUpdateAt: {
                handler () {
                    Object.keys(this.markers)
                        .forEach((markerType) => {
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

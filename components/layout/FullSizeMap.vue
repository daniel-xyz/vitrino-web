<template>
    <div class="c-full-size-map">
        <div id="mapbox-container" class="c-full-size-map__mapbox"></div>

        <store-filter></store-filter>

        <div class="c-full-size-map__loading u-hide-md-and-up">
            <div class="c-full-size-map__loading__content">
                <div class="c-full-size-map__loading__content__image"></div>

                <div class="c-full-size-map__loading__content__text">
                    <h4>Karte wird geladen ...</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import {
        mapGetters,
        mapActions,
    } from 'vuex';

    import allStores from '~/apollo/queries/stores/allStores';
    import StoreFilter from './StoreFilter.vue';

    export default {
        name: 'full-size-map',
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

        apollo: {
            stores: {
                query: allStores,
                prefetch: true,
            },
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
                    loadMarkers: 'mapbox/loadMarkers',
                },
            ),

            initMap () {
                this.map = this.initMapbox();
                this.addMapControls();
                this.initEventListeners();
            },

            initMapbox () {
//                if (mapboxgl && !isSupported) {
//                    return console.log('Your browser doesn\'t support Mapbox GL.');
//                }

                mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYmlzY2hvZmYiLCJhIjoiY2l1enE4cWY1MDAyazJ4cDZxYjdramk2OCJ9.MUanhYSFZNfJZOjiLRWybw';

                return new mapboxgl.Map(
                    {
                        attributionControl: false,
                        container: 'mapbox-container',
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
                const loadingLayer = document.getElementsByClassName('c-full-size-map__loading')[0];

                loadingLayer.classList.add('u-hide-opacity');

                window.setTimeout(() => {
                    loadingLayer.classList.add('u-hide');
                }, 500);
            },

            initEventListeners () {
                this.map.once('load', () => {
                    this.removeLoadingLayer();
                    this.loadMarkers(this.stores.nodes);
                });

                this.map.on('click', this.onMapClickHandler);
                this.map.on('mousemove', this.onMouseMoveHandler);
            },

            onMapClickHandler (e) {
                const features = this.map.queryRenderedFeatures(
                    e.point,
                    { layers: Object.keys(this.markers) },
                );

                if (!features.length) {
                    return this.$router.push({ path: '/' });
                }

                return this.$router.push(`/store/${features[0].properties.id}`);
            },

            onMouseMoveHandler (e) {
                const features = this.map.queryRenderedFeatures(
                    e.point,
                    { layers: Object.keys(this.markers) },
                );

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
                    Object.keys(this.markers).forEach((markerType) => {
                            this.addSource(markerType, this.markers[markerType]);
                            this.addLayer(markerType);
                        });
                },
            },
        },

        mounted () {
            this.initMap();
        },
    };
</script>

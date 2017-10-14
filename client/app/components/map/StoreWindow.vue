<template>
    <transition name="fade">
        <div id="store-window" class="main-layer content-container">
            <h4 id="title">{{ store.name }}</h4>

            <slick id="photos" ref="slick" :options="slickOptions">
                <img v-for="photo in store.photos"
                     v-lazy="photo"
                     :class="'filter-' + yid"/>
            </slick>

            <div class="margin-top-l">
                <div v-for="category in store.categories" class="tag">
                    {{ category }}
                </div>
            </div>

            <div id="action-bar" class="grid margin-top-xxl">
                <popover name="opening-hours" id="opening-hours" :left="true">
                    <div slot="face">
                        <div class="col-4 align-center">
                            <i class="icon-market icon-2x"></i>
                            <div v-if="store.is_open_now" class="open">Jetzt geöffnet</div>
                            <div v-else class="closed">Öffnungszeiten</div>
                        </div>
                    </div>
                    <div slot="content">
                        <h6>Öffnungszeiten</h6>
                        <ul>
                            <li v-for="obj in store.openingHours">
                                <b>{{ obj.day }}:</b>{{ obj.start }} - {{ obj.end }}
                            </li>
                        </ul>
                    </div>
                </popover>

                <div id="ratings" class="col-4 align-center">
                    <i class="icon-talk icon-2x"></i>
                    <div>Bewertungen</div>
                </div>

                <popover id="share"
                         name="social-share"
                         :closeOnContentClick="false"
                         :right="true">
                    <div slot="face">
                        <div class="col-4 align-center">
                            <i class="icon-share icon-2x"></i>
                            <div>Weitersagen</div>
                        </div>
                    </div>

                    <div slot="content">
                        <social-sharing
                            id="share-icons"
                            :url="url"
                            :title="store.name"
                            description="Schaue dir jetzt unser Schaufenster auf Vitrino an!"
                            inline-template>
                            <div>
                                <network network="facebook">
                                    <div class="facebook-icon"></div>
                                </network>
                                <network network="whatsapp">
                                    <div class="whatsapp-icon"></div>
                                </network>
                            </div>
                        </social-sharing>
                    </div>
                </popover>
            </div>

            <div id="products" v-if="products">
                <div class="product" v-for="product in products.store_window">
                    <img v-lazy="product.image_url.standard"
                         :srcset="product.image_url.retina + ' 2x'">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Slick from 'vue-slick';
    import Popover from '../partials/Popover';
    import { stores } from '../../services/vitrinoApi';

    export default {
        name: 'store-window',
        components: {
            Slick,
            Popover,
        },
        data () {
            return {
                store: {},
                products: [],
                slickOptions: {
                    speed: 600,
                    slidesToShow: 1,
                    arrows: false,
                    variableWidth: true,
                    centerMode: false,
                    autoplay: true,
                    autoplaySpeed: 2500,
                    pauseOnHover: true,
                    mobileFirst: true,
                    infinite: true,
                },
            };
        },

        watch: {
            $route () {
                this.id = this.$route.params.id;
                this.setData(this.id);
//                this.$refs.slick.filter('filter-' + this.yid);
            },
        },

        methods: {
            setData (storeID) {
                stores.getStoreByID(storeID, (error, response) => {
                    this.store = response;
                });
            },

            reInitSlick () {
                this.$refs.slick.reSlick();
            },
        },

        computed: {
            ...mapGetters(
                {
                    url: 'storewindow/url',
                },
            ),
        },

        mounted () {
            this.id = this.$route.params.id;
            this.setData(this.id);

            this.$bus.$emit('menuChangeRequest', {
                showBack: true,
                backPath: '/',
                backText: 'Zur Karte',
            });
        },

        updated () {
//            this.reInitSlick();
        },

        destroyed () {
            this.$bus.$emit('menuChangeRequest', {
                showBack: false,
            });
        },
    };
</script>

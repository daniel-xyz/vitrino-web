<template>
  <transition name="fade">
    <div id="store-window" class="main-layer content-container">
      <h4 id="title">{{ company.name }}</h4>

      <slick id="photos" ref="slick" :options="slickOptions">
        <img v-for="photo in company.photos" :src="photo" :class="'filter-' + store.yid"/>
      </slick>

      <div class="margin-top-l">
        <div v-for="category in company.categories" class="tag">
          {{ category }}
        </div>
      </div>

      <div id="action-bar" class="grid margin-top-xxl">
        <popover name="opening-hours" id="opening-hours" :left="true">
          <div slot="face">
            <div class="col-4 align-center">
              <div class="icon"></div>
              <div v-if="company.is_open_now" class="open">Jetzt geöffnet</div>
              <div v-if="!company.is_open_now" class="closed">Öffnungszeiten</div>
            </div>
          </div>
          <div slot="content">
            <h6>Öffnungszeiten</h6>
            <ul>
              <li v-for="obj in company.openingHours"><b>{{ obj.day }}:</b> {{ obj.start }} - {{obj.end }}</li>
            </ul>
          </div>
        </popover>
        <div id="ratings" class="col-4 align-center">
          <div class="icon"></div>
          <div>Bewertungen</div>
        </div>

        <popover id="share" name="social-share" :closeOnContentClick="false" :right="true">
          <div slot="face">
            <div class="col-4 align-center">
              <div class="icon"></div>
              <div>Weitersagen</div>
            </div>
          </div>
          <div slot="content">
              <social-sharing id="share-icons" :url="url" :title="company.name" description="Schaue dir jetzt unser Schaufenster auf Vitrino an!" inline-template>
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

      <div id="products">
        <div class="product" v-for="product in products.store_window">
          <img :src="product.image_url.standard" :srcset="product.image_url.retina + ' 2x'">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import slick from 'vue-slick';
  import { stores } from '../services/vitrinoApi';
  import popover from '../../assets/vue/Popover';

  export default {
    name: 'store-window',
    components: { slick, popover },
    data () {
      return {
        url: '',
        company: {
          name: '',
          description: '',
          logo_url: {
            standard: '',
            retina: '',
          },
          is_open_now: '',
          openingHours: [],
          categories: [],
          photos: [],
        },
        store: {
          yid: '',
        },
        products: {
          store_window: [],
        },
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
      'store.id': function () {
        const self = this;
        const storeWindow = self.products.store_window;

        storeWindow.splice(0, storeWindow.length);

//        stores.getStoreWindowProducts(self.store.id, (error, products) => {
//          products.forEach((product) => {
//            if (product.image_url) {
//              storeWindow.push({
//                id: product.id,
//                image_url: {
//                  standard: buildImageUrl(product.image_url, 260, 260, 1),
//                  retina: buildImageUrl(product.image_url, 260, 260, 2),
//                },
//              });
//            }
//          });
//        });
      },
      $route () {
        this.fillData();
        this.$refs.slick.filter('filter-' + this.store.yid);
      },
    },

    methods: {
      fillData () {
        const self = this;

        self.url = window.location.href;
        self.store.yid = self.$route.params.yid;
        self.company.name = self.$route.query.name;
        self.company.categories = [];
        self.company.photos = [];
        self.company.openingHours = [];

        stores.getStoreByYelpID(self.store.yid, (error, response) => {
          if (error) {
            return console.error(error.stack); // eslint-disable-line no-console
          }

          // console.log('response:' + JSON.stringify(response));

          if (self.company.name === '') {
            this.company.name = response.name;
          }

          if (response.hours !== 'undefined') {
            this.company.is_open_now = response.hours[0].is_open_now;
          }

          response.categories.forEach((category) => {
            this.company.categories.push(category.title);
          });

          if (response.photos !== 'undefined') {
            response.photos.forEach((photo) => {
              this.company.photos.push(photo);
              // self.$refs.slick.add('<img src="' + photo + '" class="filter-' + this.store.yid + '"/>');
            });
          }

          if (response.hours !== 'undefined' && response.hours[0] !== 'undefined' && response.hours[0].open !== 'undefined') {
            const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

            response.hours[0].open.forEach((obj) => {
              this.company.openingHours.push({
                day: days[obj.day],
                start: obj.start.slice(0, 2) + ':' + obj.start.slice(2),
                end: obj.end.slice(0, 2) + ':' + obj.end.slice(2),
              });
            });
          }

          return null;
        });
      },

      reInitSlick () {
        this.$refs.slick.reSlick();
      },
    },

    created () {
      this.fillData();

      this.$bus.$emit('menuChangeRequest', {
        showBack: true,
        backPath: '/',
        backText: 'Zur Karte',
      });
    },

    updated () {
      this.reInitSlick();
    },

    destroyed () {
      this.$bus.$emit('menuChangeRequest', {
        showBack: false,
      });
    },
  };
</script>

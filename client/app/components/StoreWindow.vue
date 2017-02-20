<template>
  <transition name="fade">
    <div id="store-window" class="main-layer">
      <div id="first-row" class="grid">
        <div class="hide-xs col-sm-5">
          <div id="company-logo" v-if="company.logo_url.standard">
            <img :src="company.logo_url.standard" :srcset="company.logo_url.retina + ' 2x'">
          </div>
        </div>
        <div class="col-12 col-sm-7">
          <h4 id="title">{{ company.name }}</h4>
          <div id="description">{{ company.description }}</div>
        </div>
      </div>
      <div id="second-row" class="grid hide-sm-and-down">
        <div class="col-12 col-sm-5 align-center">
          <button id="shop-link" class="button-primary button-green">
            Zum Shop
          </button>
        </div>
        <div class="col-12 col-sm-7">
          <div id="opening-hours"></div>
        </div>
      </div>
      <div id="tags" class="hide-md-and-up">
        <div class="tag">Kleidung</div>
        <div class="tag">Hobby</div>
        <div class="tag">Kleidung</div>
        <div class="tag">Kinderartikel</div>
        <div class="tag">Accessoires</div>
        <div class="tag label label-bio">Bio</div>
        <div class="tag label label-fair">Fair</div>
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
  import { stores } from '../services/api';
  import { buildImageUrl } from '../utils/cloudinary';

  export default {
    name: 'store-window',
    data() {
      return {
        company: {
          name: '',
          description: '',
          logo_url: {
            standard: '',
            retina: '',
          },
        },
        store: {
          id: '',
        },
        products: {
          store_window: [],
        },
      };
    },

    watch: {
      'store.id': function () {
        const self = this;
        const storeWindow = self.products.store_window;

        storeWindow.splice(0, storeWindow.length);

        stores.getStoreWindowProducts(self.store.id, (error, products) => {
          products.forEach((product) => {
            if (product.image_url) {
              storeWindow.push({
                id: product.id,
                image_url: {
                  standard: buildImageUrl(product.image_url, 260, 260, 1),
                  retina: buildImageUrl(product.image_url, 260, 260, 2),
                },
              });
            }
          });
        });
      },
      $route() {
        this.fillData();
      },
    },

    methods: {
      fillData() {
        const self = this;

        // TODO - should be done via vuex as queries are not really reliable for SEO etc.

        self.store.id = self.$route.params.id;
        self.company.name = self.$route.query.company;
        self.company.description = self.$route.query.description;
        self.company.logo_url.standard = buildImageUrl(self.$route.query.logo_url, 120, 200, 1);
        self.company.logo_url.retina = buildImageUrl(self.$route.query.logo_url, 120, 200, 2);
      },
    },

    created() {
      this.fillData();

      this.$bus.$emit('menuChangeRequest', {
        showBack: true,
        backPath: '/',
        backText: 'Zur Karte',
      });
    },

    destroyed() {
      this.$bus.$emit('menuChangeRequest', {
        showBack: false,
      });
    },
  };
</script>

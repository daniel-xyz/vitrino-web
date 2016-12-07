/* eslint-disable */

var cloudinary = VitrinoLib.Cloudinary;

Vue.component('store-window', {
  data: function () {
    return {
      show: false,
      company: {
        name: '',
        description: '',
        logo_url: {
          standard: '',
          retina: ''
        }
      },
      store: {
        id: ''
      },
      products: {
        store_window: []
      }
    }
  },

  watch: {
    'store.id': function () {
      const self = this;
      var store_window = self.products.store_window;

      store_window.splice(0, store_window.length);

      VitrinoLib.Api.stores.getStoreWindowProducts(self.store.id, function (error, products) {
        products.forEach(function (product) {
          if (product.image_url) {
            store_window.push({
              id: product.id,
              image_url: {
                standard: cloudinary.buildImageUrl(product.image_url, 260, 260, 1),
                retina: cloudinary.buildImageUrl(product.image_url, 260, 260, 2)
              }
            });
          }
        })
      });
    }
  },

  created: function () {
    const self = this;

    eventHub.$on('markerClicked', function (store) {
      self.company.name = store.company;
      self.company.description = store.description;
      self.company.logo_url.standard = cloudinary.buildImageUrl(store.logo_url, 120, 200, 1);
      self.company.logo_url.retina = cloudinary.buildImageUrl(store.logo_url, 120, 200, 2);
      self.store.id = store.id;
      self.show = true;
    });

    eventHub.$on('mapClicked', function () {
      self.show = false;
    });
  },

  destroyed: function () {
    eventHub.$off('markerClicked');
    eventHub.$off('mapClicked');
  }
});
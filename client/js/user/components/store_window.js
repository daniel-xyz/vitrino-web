/* eslint-disable */

Vue.component('store-window', {
  data: function () {
    return {
      show: false,
      company: {
        name: '',
        description: ''
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
              image_url: product.image_url
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
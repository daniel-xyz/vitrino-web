/* eslint-disable */

Vue.component('store-window', {
  data: function () {
    return {
      show: false,
      company: {
        name: '',
        description: ''
      }
    }
  },

  mounted: function () {
    var self = this;

    eventHub.$on('markerClicked', function (store) {
      console.log('Marker clicked! Store ID: ' + store.id);
      self.company.name = store.company;
      self.company.description = store.description;
      self.show = true;
    });

    eventHub.$on('mapClicked', function () {
      self.show = false;
    });

  }
});
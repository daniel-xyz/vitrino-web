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

  created: function () {
    var self = this;

    eventHub.$on('markerClicked', function (store) {
      self.company.name = store.company;
      self.company.description = store.description;
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
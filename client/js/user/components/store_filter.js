/* eslint-disable */

Vue.component('store-filter', {
  data: function () {
    return {
      show: false,
      filter: {
        kids: true,
        cosmetics: true,
        art: true,
        hobby: true,
        home: true,
        clothes: true,
        gifts: true,
        jewellery: true
      }
    }
  },

  methods: {
    toggle: function (categoryName) {
      const self = this;
      var showCategory;

      self.filter[categoryName] = !self.filter[categoryName];
      showCategory = self.filter[categoryName];

      if (showCategory) {
        VitrinoLib.Map.showLayer('marker-' + categoryName);
      } else {
        VitrinoLib.Map.hideLayer('marker-' + categoryName);
      }
    }
  }
});
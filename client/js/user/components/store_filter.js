/* eslint-disable */

Vue.component('store-filter', {
  data: function () {
    return {
      show: false,
      initialFilterState: true,
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

      if (self.initialFilterState) {
        self.initialFilterState = false;

        Object.keys(self.filter).forEach(function (filterName) {
          if (filterName !== categoryName) {
            self.filter[filterName] = false;
            VitrinoLib.Map.hideLayer('marker-' + filterName);
          }
        });
      } else {
        self.filter[categoryName] = !self.filter[categoryName];
        showCategory = self.filter[categoryName];

        if (showCategory) {
          VitrinoLib.Map.showLayer('marker-' + categoryName);
        } else {
          VitrinoLib.Map.hideLayer('marker-' + categoryName);
        }
      }
    }
  }
});
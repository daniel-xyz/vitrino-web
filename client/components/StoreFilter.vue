<template>
  <div id="store-filter" class="height-transition" :class="{ 'filter-opened': show }">

    <div id="filter-toggle" class="hide-md-and-up" @click="show = !show">
      <div :class="{ 'icon-close': show, 'icon-filter': !show }"></div>
    </div>

    <div id="category-icons">
      <div class="child-icon" :class="{ 'deactivated': !filter.kids }" @click="toggle('kids')"></div>
      <div class="parfume-icon" :class="{ 'deactivated': !filter.cosmetics }" @click="toggle('cosmetics')"></div>
      <div class="colors-icon" :class="{ 'deactivated': !filter.art }" @click="toggle('art')"></div>
      <div class="hobby-icon" :class="{ 'deactivated': !filter.hobby }" @click="toggle('hobby')"></div>
      <div class="building-icon" :class="{ 'deactivated': !filter.home }" @click="toggle('home')"></div>
      <div class="shirt-icon" :class="{ 'deactivated': !filter.clothes }" @click="toggle('clothes')"></div>
      <div class="gift-icon" :class="{ 'deactivated': !filter.gifts }" @click="toggle('gifts')"></div>
      <div class="necklace-icon" :class="{ 'deactivated': !filter.jewellery }" @click="toggle('jewellery')"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'store-filter',
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
        let showCategory;

        if (self.initialFilterState) {
          self.initialFilterState = false;

          Object.keys(self.filter).forEach(function (filterName) {
            if (filterName !== categoryName) {
              self.filter[filterName] = false;
              self.hideLayer('marker-' + filterName);
            }
          });
        } else {
          self.filter[categoryName] = !self.filter[categoryName];
          showCategory = self.filter[categoryName];

          if (showCategory) {
            self.showLayer('marker-' + categoryName);
          } else {
            self.hideLayer('marker-' + categoryName);
          }
        }
      },

      // TODO - events may be replaced with shared states (vuex)
      showLayer: function (layerName) {
        this.$bus.$emit('showLayer', {
          layerName: layerName
        });
      },

      hideLayer: function (layerName) {
        this.$bus.$emit('hideLayer', {
          layerName: layerName
        });
      }
    }
  };
</script>
<template>
  <div id="store-filter" class="height-transition" :class="{ 'filter-opened': show }">

    <div id="filter-toggle" class="hide-md-and-up" @click="show = !show">
      <div :class="{ 'close': show, 'filter': !show }"></div>
    </div>

    <div id="category-icons">
      <div class="child-icon" :class="{ 'deactivated': !filters.kids }" @click="toggle('kids')"></div>
      <div class="parfume-icon" :class="{ 'deactivated': !filters.cosmetics }" @click="toggle('cosmetics')"></div>
      <div class="colors-icon" :class="{ 'deactivated': !filters.art }" @click="toggle('art')"></div>
      <div class="hobby-icon" :class="{ 'deactivated': !filters.hobby }" @click="toggle('hobby')"></div>
      <div class="building-icon" :class="{ 'deactivated': !filters.home }" @click="toggle('home')"></div>
      <div class="shirt-icon" :class="{ 'deactivated': !filters.clothes }" @click="toggle('clothes')"></div>
      <div class="gift-icon" :class="{ 'deactivated': !filters.gifts }" @click="toggle('gifts')"></div>
      <div class="necklace-icon" :class="{ 'deactivated': !filters.jewellery }" @click="toggle('jewellery')"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'store-filter',
    data () {
      return {
        show: false,
        initialFilterState: true,
      };
    },

    methods: {
      toggle (categoryName) {
        const self = this;

        if (self.initialFilterState) {
          self.initialFilterState = false;

          Object.keys(self.filters).forEach((filterName) => {
            if (filterName !== categoryName) {
              self.$store.dispatch('filterOff', filterName);
            }
          });
        } else if (self.filters[categoryName]) {
          self.$store.dispatch('filterOff', categoryName);
        } else {
          self.$store.dispatch('filterOn', categoryName);
        }
      },
    },

    computed: {
      filters () {
        return this.$store.state.storefilters;
      },
    },
  };
</script>

<template>
  <div id="store-filter" class="height-transition" :class="{ 'filter-opened': show }">

    <div id="filter-toggle" class="hide-md-and-up" @click="show = !show">
      <div :class="{ 'close': show, 'filter': !show }"></div>
    </div>
    <div id="category-icons">
      <div v-for="f in filters"
           :class="[ {'deactivated': !f.active }, f.styleClass ]"
           @click="toggle(f)"></div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'store-filter',
    data () {
      return {
        show: false,
      };
    },
    methods: {
      ...mapActions({
        toggle: 'storefilters/filterToggle',
        initial: 'storefilters/filterInitial',
      }),
    },
    computed: {
      ...mapGetters({
        filters: 'storefilters/getAllFilters',
      }),
    },
    mounted() {
      this.initial();
    },
  };
</script>

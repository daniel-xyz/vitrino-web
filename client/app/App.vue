<template>
  <div id="vue-app">
    <top-header></top-header>
    <main>
      <router-view name="main"></router-view>
      <store-filter></store-filter>
    </main>
    <router-view name="map"></router-view>
  </div>
</template>

<script>
  import StoreFilter from './components/StoreFilter';
  import TopHeader from './components/TopHeader';

  export default {
    name: 'app',
    components: {
      TopHeader,
      StoreFilter,
    },
  };
</script>

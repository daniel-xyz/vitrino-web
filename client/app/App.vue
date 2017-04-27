<template>
  <div>
    <top-header></top-header>
    <main>
      <router-view name="layer"></router-view>
      <mapbox></mapbox>
    </main>
  </div>
</template>

<script>
  import TopHeader from './components/TopHeader';
  import Mapbox from './components/Mapbox';

  export default {
    name: 'app',
    components: {
      TopHeader,
      Mapbox,
    },
  };
</script>

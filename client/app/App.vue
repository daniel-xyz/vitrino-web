<template>
  <div>
    <top-header></top-header>
    <main>
      <router-view name="main"></router-view>
      <router-view name="layer"></router-view>
    </main>
  </div>
</template>

<!--suppress JSUnresolvedVariable -->
<script>
  import TopHeader from './components/TopHeader';

  export default {
    name: 'app',
    components: {
      TopHeader,
    },
  };
</script>

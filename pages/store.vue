<template>
    <div class="c-store-window o-layer-primary">
        <nuxt-child/>
    </div>
</template>

<script>
    import backButtonToHome from '../components/mixins/backButtonToHome';

    export default {
        name: 'store-window',
        mixins: [backButtonToHome],
    };
</script>

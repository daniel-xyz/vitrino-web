<template>
    <div>
        <main-header></main-header>

        <main>
            <full-size-map></full-size-map>
            <nuxt></nuxt>
        </main>

        <footer>
            <cookie-message></cookie-message>
        </footer>
    </div>
</template>

<script>
    import MainHeader from '../components/layout/MainHeader.vue';
    import CookieMessage from '../components/layout/CookieMessage.vue';
    import FullSizeMap from '../components/layout/FullSizeMap.vue';

    export default {
        name: 'default',
        components: {
            MainHeader,
            FullSizeMap,
            CookieMessage,
        },
    };
</script>

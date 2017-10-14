<template>
    <div>
        <top-header></top-header>
        <main>
            <router-view name="layer"></router-view>
            <mapbox></mapbox>
        </main>
        <footer>
            <cookie-message buttonText="Ich mag Cookies"
                            message="Diese Webseite nutzt sogenannte Cookies, um dir ein angenehmes Nutzererlebnis zu ermöglichen.">
            </cookie-message>
        </footer>
    </div>
</template>

<script>
    import CookieMessage from './components/CookieMessage';
    import TopHeader from './components/layout/TopHeader';
    import Mapbox from './components/map/Mapbox';

    export default {
        name: 'app',
        components: {
            TopHeader,
            Mapbox,
            CookieMessage,
        },
    };
</script>

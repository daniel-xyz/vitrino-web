<template>
    <ul>
        <router-link :to="{ path: '/data' }">
            <li>Datenschutz</li>
        </router-link>
        <router-link :to="{ path: '/imprint' }">
            <li>Impressum</li>
        </router-link>
    </ul>
</template>

<script>
    export default {
        name: 'main-menu',
    };
</script>

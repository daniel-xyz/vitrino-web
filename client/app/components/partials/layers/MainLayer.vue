<template>
    <transition name="fade">
        <div class="scrollable-layer">
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'main-layer',
        data () {
            return {};
        },

        mounted () {
            this.$bus.$emit('menuChangeRequest', {
                showBack: true,
                backPath: '/',
                backText: 'Zur Karte',
            });
        },

        destroyed () {
            this.$bus.$emit('menuChangeRequest', {
                showBack: false,
            });
        },
    };
</script>

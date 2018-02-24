<template>
    <div class="c-store-window o-layer-primary">
        <nuxt-child/>
    </div>
</template>

<script>
    import backButtonToHome from '~/components/mixins/backButtonToHome';

    export default {
        name: 'store-window',
        mixins: [backButtonToHome],
    };
</script>

<style lang="less">
    @import "../assets/less/core/settings.variables.less";

    .c-store-window {
        @media @md-and-up {
            float: left;
            width: 580px;
        }
    }

</style>

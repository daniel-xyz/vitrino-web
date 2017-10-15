<template>
    <div class="c-store-window o-layer-primary">
        <h4 v-if="store">{{ store.name }}</h4>
    </div>
</template>

<script>
    /* eslint-disable */

    import storeById from '~/apollo/queries/stores/storeById';
    import backButtonToHome from '../../components/mixins/backButtonToHome';

    export default {
        name: 'store-window',
        mixins: [backButtonToHome],
        apollo: {
            store: {
                query: storeById,
                prefetch: ({ route }) => ({ id: route.params.id }),
                variables () {
                    return {
                        id: this.$route.params.id,
                    };
                },
            },
        },
    };
</script>

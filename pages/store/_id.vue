<template>
    <h4 v-if="store">{{ store.name }}</h4>
</template>

<script>
    /* eslint-disable */

    //import storeById from '../../apollo/queries/stores/storeById.gql';
    //
    //export default {
    //    name: 'store-window-content',
    //    apollo: {
    //        store: {
    //            query: storeById,
    //            prefetch: ({ route }) => ({ id: route.params.id }),
    //            variables () {
    //                return {
    //                    id: this.$route.params.id,
    //                };
    //            },
    //        },
    //    },
    //};
</script>

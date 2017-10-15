<template>
    <div class="c-store-window o-layer-primary">
        <h4>{{ store.name }}</h4>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import backButtonToHome from '../../components/mixins/backButtonToHome';
    import { stores } from '../../utils/vitrinoApi';

    export default {
        name: 'store-window',
        mixins: [backButtonToHome],
        data () {
            return {
                store: {},
            };
        },
        watch: {
            $route () {
                this.setData();
            },
        },
        methods: {
            setData () {
                const storeID = this.$route.params.id;

                stores.getStoreByID(storeID, (error, response) => {
                    this.store = response;
                });
            },
        },
        computed: {
            ...mapGetters(
                {
                    url: 'storewindow/url',
                },
            ),
        },

        mounted () {
            this.setData();
        },
    };
</script>

<template>
    <div class="c-store-window o-layer-primary">
        <h4>{{ store.name }}</h4>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions,
    } from 'vuex';

    import { stores } from '../../utils/vitrinoApi';

    export default {
        name: 'store-window',
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
            ...mapActions(
                {
                    setBackButton: 'navigation/setBackButton',
                },
            ),

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

        created () {
            this.setData();

            this.setBackButton(
                {
                    show: true,
                    text: 'zur Karte',
                    path: '/',
                },
            );
        },

        beforeDestroy () {
            this.setBackButton(
                {
                    show: false,
                },
            );
        },
    };
</script>

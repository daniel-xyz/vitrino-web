<template>
    <div class="c-store-filter" :class="{ 'c-store-filter--opened': show }">

        <div class="c-store-filter__toggle u-hide-md-and-up" @click="show = !show">
            <div :class="{ 'close': show, 'filter': !show }"></div>
        </div>

        <div class="c-store-filter__icons">
            <div v-for="f in filters"
                 :class="[ {'deactivated': !f.active }, f.styleClass ]"
                 @click="toggle(f)"></div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters,
    } from 'vuex';

    export default {
        name: 'store-filter',
        data () {
            return {
                show: false,
            };
        },
        methods: {
            ...mapActions(
                {
                    toggle: 'storefilters/filterToggle',
                    initial: 'storefilters/filterInitial',
                },
            ),
        },
        computed: {
            ...mapGetters(
                {
                    filters: 'storefilters/getAllFilters',
                },
            ),
        },
        mounted () {
            this.initial();
        },
    };
</script>

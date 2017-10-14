<template>

</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions(
                {
                    setBackButton: 'navigation/setBackButton',
                },
            ),
        },

        created () {
            this.setBackButton(
                {
                    show: false,
                },
            );
        },
    };
</script>

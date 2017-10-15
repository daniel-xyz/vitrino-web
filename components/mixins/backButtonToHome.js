import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions(
            {
                setBackButton: 'navigation/setBackButton',
            },
        ),
    },
    mounted () {
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

<template>
    <div class="o-modal">
        <h4 class="o-modal__title">{{ $t('auth.signup.verification.title') }} &#x1F601</h4>
        <div class="o-modal__subtitle">{{ $t('auth.signup.verification.subtitle') }}</div>
    </div>
</template>

<script>
    import backButtonToHome from '~/components/mixins/backButtonToHome';

    export default {
        name: 'verify',
        mixins: [backButtonToHome],
        methods: {
            sendVerification () {
                const user = this.$firebase.auth().currentUser;

                if (!user) return;

                user.sendEmailVerification()
                    .catch(error => console.log(error));
            },
        },
        created () {
            this.sendVerification();
        },
    };
</script>

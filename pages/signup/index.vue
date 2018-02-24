<template>
    <div class="o-modal">
        <h4 class="o-modal__title">Registrierung</h4>
        <div class="o-modal__subtitle">Sei jetzt dabei. Wir freuen uns auf dich!</div>

        <form class="c-form" @submit.prevent="onSubmit">
            <input type="email" placeholder="E-Mail" class="c-form__block-input" v-model="email">
            <input type="password" placeholder="Passwort" class="c-form__block-input" v-model="password">
            <input type="password" placeholder="Passwort wiederholen" class="c-form__block-input" v-model="passwordConfirmation">

            <button type="submit">Jetzt registrieren</button>
        </form>
    </div>
</template>

<script>
    import backButtonToHome from '~/components/mixins/backButtonToHome';

    export default {
        name: 'signup',
        mixins: [backButtonToHome],
        data () {
            return {
                email: null,
                password: null,
                passwordConfirmation: null,
            };
        },
        methods: {
            onSubmit () {
                this.$firebase.auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(this.$router.push('/'))
                    .catch(error => console.log(error));
            },
        },
    };
</script>

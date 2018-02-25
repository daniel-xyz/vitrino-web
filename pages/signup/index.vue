<template>
    <div class="o-modal o-modal--medium">
        <h4 class="o-modal__title">{{ $t('auth.signup.title') }}</h4>
        <div class="o-modal__subtitle">{{ $t('auth.signup.subtitle') }}</div>

        <form class="c-form" @submit.prevent="onSubmit">
            <input name="email"
                   type="email"
                   :placeholder="$t('auth.form.email')"
                   class="c-form__input u-block"
                   :class="{'c-form__input--error': errors.has('email') }"
                   v-model="email"
                   v-validate="'required|email'">

            <div v-show="errors.has('email')" class="c-form__error-message u-margin-bottom-l">
                {{ errors.first('email') }}
            </div>

            <input name="password"
                   type="password"
                   :placeholder="$t('auth.form.password')"
                   class="c-form__input u-block"
                   v-model="password"
                   v-validate="'required|min:6'">

            <div v-show="errors.has('password')" class="c-form__error-message u-margin-bottom-l">
                {{ errors.first('password') }}
            </div>

            <input name="password_confirmation"
                   type="password"
                   :placeholder="$t('auth.form.password_confirmation')"
                   class="c-form__input u-block"
                   v-model="passwordConfirmation"
                   v-validate="'required|confirmed:password'">

            <div v-show="errors.has('password_confirmation')" class="c-form__error-message u-margin-bottom-l">
                {{ errors.first('password_confirmation') }}
            </div>

            <button type="submit" class="c-button-primary u-full-width">{{ $t('auth.signup.submit') }}</button>
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

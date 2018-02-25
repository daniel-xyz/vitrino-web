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
            async onSubmit () {
                const isFormValid = await this.$validator.validateAll();

                if (!isFormValid) return;

                this.$firebase.auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => this.$router.push('/signup/verify'))
                    .catch(error => this.showFirebaseError(error));
            },
            showFirebaseError (error) {
                const codes = {
                    'auth/email-already-in-use': {
                        field: 'email',
                        message: 'auth.signup.email_already_in_use',
                    },
                    'auth/invalid-email': {
                        field: 'email',
                        message: 'auth.signup.invalid_email',
                    },
                    'auth/weak-password': {
                        field: 'password',
                        message: 'auth.signup.weak_password',
                    },
                };

                const knownError = codes[error.code];

                if (!knownError) {
                    this.errors.add('email', this.$t('auth.signup.unhandled_error'));
                }

                this.errors.add(knownError.field, this.$t(knownError.message));
            },
        },
    };
</script>

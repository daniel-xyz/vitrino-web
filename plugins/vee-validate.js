import Vue from 'vue';
import VeeValidate from 'vee-validate';

export default ({ app }) => {
    Vue.use(VeeValidate, {
        errorBagName: 'errors',
        fieldsBagName: 'fields',
        delay: 0,
        strict: false,
        events: 'blur',
        inject: true,
        validity: false,
        aria: true,
        i18n: app.i18n,
        i18nRootKey: 'form_validation',
    });
};

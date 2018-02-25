import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Localization from '../assets/localizations';

export default ({ app }) => {
    Vue.use(VueI18n);

    app.i18n = new VueI18n(
        {
            locale: 'de',
            fallbackLocale: 'de',
            silentTranslationWarn: true,
            sync: true,
            fallbackRoot: false,
            messages: Localization,
        },
    );
};

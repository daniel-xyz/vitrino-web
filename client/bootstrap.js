/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application
 */

import Vue from 'vue';
import SocialSharing from 'vue-social-sharing';
import VueRouter from 'vue-router';
import routes from './app/router';

/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */

Vue.config.debug = process.env.NODE_ENV !== 'production';

/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

Vue.use(VueRouter);

export const router = new VueRouter(
    {
        mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes,
    },
);

/* ============
 * Vue Social Sharing
 * ============
 *
 * A Vue.js component for sharing links to social networks
 *
 * https://github.com/nicolasbeauvais/vue-social-sharing
 */

Vue.use(SocialSharing);

/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 * http://lesscss.org/
 */

require('./assets/less/vitrino.less');

export default {
    router,
};

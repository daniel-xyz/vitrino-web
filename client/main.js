/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
  .config('https://6458ccdd8d034ee69ec311bc2fc39a03@sentry.io/120639')
  .addPlugin(RavenVue, Vue)
  .install();

let csrfToken = '<$ csrfToken $>';
Vue.prototype.$bus = new Vue();

new Vue({
  el: '#vue-app',
  router,
  render: (h) => h(App)
})
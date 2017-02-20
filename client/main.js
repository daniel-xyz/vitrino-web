/* eslint-disable */

import Vue from 'vue';
import App from './app/App';
import { router } from './bootstrap';

require('./bootstrap');

// let csrfToken = '<$ csrfToken $>';
Vue.prototype.$bus = new Vue();

new Vue({
  el: '#vue-app',
  router,
  render: (h) => h(App)
})
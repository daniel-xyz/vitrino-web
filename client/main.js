/* eslint-disable */
'use strict'

import Vue from 'vue';
import store from './app/store';
import App from './app/App.vue';
import { router } from './bootstrap';

require('./bootstrap');

// let csrfToken = '<$ csrfToken $>';
Vue.prototype.$bus = new Vue();

new Vue({
  el: '#vue-app',
  router,
  store,
  render: (h) => h(App)
})

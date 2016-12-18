/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'

let csrfToken = '<$ csrfToken $>';
Vue.prototype.$bus = new Vue();

new Vue({
  el: '#vue-app',
  router,
  render: (h) => h(App)
})
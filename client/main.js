/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex'
import App from './app/App';
import { router } from './bootstrap';

require('./bootstrap');

// let csrfToken = '<$ csrfToken $>';
Vue.prototype.$bus = new Vue();
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    filters: {
      kids: true,
      cosmetics: true,
      art: true,
      hobby: true,
      home: true,
      clothes: true,
      gifts: true,
      jewellery: true,
    },
  },
  mutations: {
    filterOn (state, filterName) {
      state.filters[filterName] = true;
    },
    filterOff (state, filterName) {
      state.filters[filterName] = false;
    }
  }
})

new Vue({
  el: '#vue-app',
  router,
  store,
  render: (h) => h(App)
})

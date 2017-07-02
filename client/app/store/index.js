/* ============
 * Vuex Store
 * ============
 *
 * The store of the application
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as actions from './actions';
import * as getters from './getters';

// Modules
import storefilters from './modules/storefilters';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,

  modules: {
    storefilters,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

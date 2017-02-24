/* ============
 * Vuex Actions
 * ============
 *
 * All the actions that can be used
 * inside the store
 */

import * as types from './mutation-types';

// Storefilters
export const filterOn = ({ commit }, filterName) => {
  commit(types.FILTER_ON, filterName);
};

export const filterOff = ({ commit }, filterName) => {
  commit(types.FILTER_OFF, filterName);
};

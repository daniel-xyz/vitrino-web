import * as types from './mutation-types';

export default {

  [types.FILTER_ON](state, filterName) {
    state.filters[filterName] = true;
  },

  [types.FILTER_OFF] (state, filterName) {
    state.filters[filterName] = false;
  },

  [types.FILTER_TOGGLE] (state, filterName) {
    state.filters[filterName] = !state.filters[filterName];
  },

  [types.FILTER_SET_ALL] (state, filterState) {
    Object.keys(state.filters).forEach((filterName) => {
      state.filters[filterName] = filterState;
    });
  },

  [types.FILTER_FIRST_VISITED] (state) {
    state.firstVisit = true;
  },
};

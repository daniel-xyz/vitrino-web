import {
  FILTER_ON,
  FILTER_OFF,
} from './../../mutation-types';

export default {
  [FILTER_ON](state, filterName) {
    state[filterName] = true;
  },

  [FILTER_OFF](state, filterName) {
    state[filterName] = false;
  },
};

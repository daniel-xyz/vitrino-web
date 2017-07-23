import * as mutations from './mutation-types';

export const filterToggle = ({ commit, dispatch }, payload) => {
  console.log('toggle', payload);
  dispatch('filterFirstVisit');
  commit(mutations.FILTER_TOGGLE, payload.name);
};

export const filterFirstVisit = ({ commit, state }) => {
  if (!state.firstVisit) {
    commit(mutations.FILTER_SET_ALL, false);
    commit(mutations.FILTER_FIRST_VISITED);
  }
};

export const filterOn = ({ commit, dispatch }, payload) => {
  commit(mutations.FILTER_ON, payload);
};

export const filterOff = ({ commit, dispatch }, payload) => {
  commit(mutations.FILTER_OFF, payload);
};

export const filterInitial = ({ commit }) => {
  commit(mutations.FILTER_SET_ALL, true);
};


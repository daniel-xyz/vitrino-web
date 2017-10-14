import * as mutations from './mutation-types';

export const filterToggle = ({ commit, dispatch, state }, payload) => {
    if (!state.firstVisit) {
        commit(mutations.FILTER_SET_ALL, false);
        commit(mutations.FILTER_FIRST_VISITED);
    }

    commit(mutations.FILTER_TOGGLE, payload.name);
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


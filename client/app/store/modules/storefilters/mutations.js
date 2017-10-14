/* eslint-disable */
import * as types from './mutation-types';

export default {
    [types.FILTER_TOGGLE] (state, filterName) {
        const current = state.filters.find((f) => {
            return f.name === filterName;
        });

        current.active = !current.active;
    },

    [types.FILTER_SET_ALL] (state, filterState) {
        state.filters.forEach((v) => {
            v.active = filterState;
        });
    },

    [types.FILTER_FIRST_VISITED] (state) {
        state.firstVisit = true;
    },
};

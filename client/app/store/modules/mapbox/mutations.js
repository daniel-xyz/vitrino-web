/* eslint-disable */
import * as types from './mutation-types';

export default {
    [types.LAST_MARKER_UPDATE_AT] (state, position) {
        state.lastMarkerUpdateAt = position;
    },
    [types.CLEAR_MARKERS] (state, category) {
        state.markers[category] = [];
    },
    [types.ADD_MARKER] (state, payload) {
        state.markers[payload.type].push(payload.marker);
    },
};

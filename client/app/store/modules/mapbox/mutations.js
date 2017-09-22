/* eslint-disable */
import * as types from './mutation-types';

export default {
    [types.POSITION] (state, position) {
        state.position = position;
    },
    [types.CLEAR_MARKER] (state, type) {
        state.markers[type] = [];
        state.addedMarkers = false;
    },
    [types.ADD_MARKER] (state, payload) {
        state.markers[payload.type].push(payload.marker);
    },
    [types.ADDED_MARKER] (state) {
        state.addedMarkers = true;
    },
};

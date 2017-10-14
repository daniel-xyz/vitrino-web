/* eslint-disable no-param-reassign */
import * as types from './mutation-types';

export default {
    [types.SET_BACK_BUTTON] (state, backButton) {
        state.backButton = backButton;
    },
};

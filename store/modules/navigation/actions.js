/* eslint-disable import/prefer-default-export */
import * as mutations from './mutation-types';

export const setBackButton = ({ commit }, backButton) => commit(mutations.SET_BACK_BUTTON, backButton);

import * as mutations from './mutation-types';

export const setUser = ({ commit }, user) => commit(mutations.SET_USER, user);

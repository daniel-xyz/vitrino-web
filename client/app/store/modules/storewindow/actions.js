import clone from 'lodash-es/clone';
import * as mutations from './mutation-types';
import { company } from './defaults';
import { stores } from '../../../services/vitrinoApi';

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

export const setUrl = ({ commit }, payload) => {
    commit(mutations.CURRENT_URL, payload);
};

export const clearCompany = ({ commit }) => {
    commit(mutations.CURRENT_COMPANY, clone(company));
};

export const setCompany = ({ commit }, payload) => {
    commit(mutations.CURRENT_COMPANY, payload);
};

export const setYid = ({ commit }, payload) => {
    commit(mutations.YID, payload);
};

export const load = ({ commit, state }) => {
    stores.getStoreByYelpID(state.yid, (error, response) => {
        if (error) {
            return console.error(error.stack);
        }

        if (state.company.name === '') {
            commit(mutations.COMPANY_NAME, response.name);
        }

        if (response.hours !== 'undefined') {
            commit(mutations.COMPANY_IS_OPEN, response.hours[0].is_open_now);
        }

        response.categories.forEach((category) => {
            commit(mutations.COMPANY_ADD_CATEGORY, category);
        });

        if (response.photos !== 'undefined') {
            response.photos.forEach((photo) => {
                commit(mutations.COMPANY_PHOTOS, photo);
            });
        }

        if (response.hours !== 'undefined' && response.hours[0] !== 'undefined'
            && response.hours[0].open !== 'undefined') {
            response.hours[0].open.forEach((obj) => {
                commit(mutations.COMPANY_OPENING_HOURS, {
                    day: days[obj.day],
                    start: obj.start.slice(0, 2) + ':' + obj.start.slice(2),
                    end: obj.end.slice(0, 2) + ':' + obj.end.slice(2),
                });
            });
        }

        return null;
    });
};

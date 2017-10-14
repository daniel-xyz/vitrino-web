/* eslint-disable */

import {
    getJSON,
    post,
} from '../utils/ajax';

const endpoint = '/api';

export const users = {
    getAll: (callback) => {
        getJSON(endpoint + '/users/', null, callback);
    },
};

export const companies = {
    getAll: (callback) => {
        getJSON(endpoint + '/companies/', null, callback);
    },

    verify: (id, callback) => {
        post(endpoint + '/companies/' + id + '/verify', callback);
    },
};

export const stores = {
    getAll: (callback) => {
        getJSON(endpoint + '/stores/', null, callback);
    },

    getStoreWindowProducts: (storeId, callback) => {
        getJSON(endpoint + '/stores/' + storeId + '/products/window', null, callback);
    },

    getStoresInRadius: (lat, lng, meters, callback) => {
        getJSON(endpoint + '/stores/radius/' + lat + '/' + lng + '/' + meters, null, callback);
    },

    getStoreByID: (storeID, callback) => {
        getJSON(endpoint + '/stores/' + storeID, null, callback);
    },
};

export const products = {
    getAll: (callback) => {
        getJSON(endpoint + '/products/', null, callback);
    },

    verify: (id, callback) => {
        post(endpoint + '/products/' + id + '/verify', callback);
    },
};

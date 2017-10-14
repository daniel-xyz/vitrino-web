/* eslint-disable no-use-before-define,no-undef,prefer-destructuring */
const endpoint = process.env.API_ENDPOINT;

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

export const send = (method, json, url, headers, callback) => {
    const xhr = typeof XMLHttpRequest !== 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open(method, url, true);

    if (method === 'post') {
        xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }

    if (json) {
        xhr.setRequestHeader('Accept', 'application/json');
    }

    if (headers) {
        setHeaders(xhr, headers);
    }

    xhr.onreadystatechange = () => {
        let status;
        let data;

        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState === 4) { // `DONE`
            status = xhr.status;

            if (status === 200) {
                data = json ? JSON.parse(xhr.responseText) : xhr.responseText;
                callback(null, data);
            } else {
                callback(status, null);
            }
        }
    };

    xhr.send();
};

export const setHeaders = (xhr, headers) => {
    Object.keys(headers)
        .forEach((key) => {
            xhr.setRequestHeader(key, headers[key]);
        });
};

export const getJSON = (url, headers, callback) => {
    send('get', true, url, headers, callback);
};

export const post = (url, callback) => {
    send('post', true, url, callback);
};

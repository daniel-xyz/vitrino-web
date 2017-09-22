const config = require('../config');
const fetch = require('node-fetch');

const findStoreByYelpID = function (yid) {
    const url = 'https://api.yelp.com/v3/businesses/' + yid + '?locale=de_DE';

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + config.yelp.authToken,
        },
    });
};

const findStoresByRadius = function (lat, lng, meters) {
    let url = 'https://api.yelp.com/v3/businesses/search?latitude=' + lat + '&longitude=' + lng + '&radius=' + meters + '&locale=de_DE';
    const categories = '&categories=fashion';

    // Object.keys(config.yelp.markerMapping).forEach(function(key) {
    //   categories = categories.concat(key + ',');
    // });
    //
    // categories = categories.slice(0, -1);
    url = url.concat(categories);

    console.log(url);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + config.yelp.authToken,
        },
    });
};

module.exports = {
    findStoreByYelpID,
    findStoresByRadius,
};

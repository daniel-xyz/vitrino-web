/* eslint-disable arrow-body-style,no-use-before-define */
const knex = require('../../services/knex.js');

/* Store model */
const Store = {

    /**
     * Find all stores in the database and return them.
     * @return {Promise<Array, Error>} An array containing the store objects
     */
    findAllStores () {
        return baseQuery()
            .then(stores => stores.map(json));
    },

    /**
     * Find all stores in the database that have their address within the speciefied radius
     * @param lat
     * @param lng
     * @param radius Search radius in meters
     * @return {Promise<Array, Error>} An array containing the objects
     */
    findStoresByRadius (lat, lng, radius) {
        return baseQuery()
            .whereRaw('cube_contains(earth_box(ll_to_earth(?, ?), ?), ll_to_earth(address.lat, address.lng))', [lat, lng, radius])
            .then(stores => stores.map(json));
    },

    /**
     * Find a store by id and return it.
     * @param storeId
     * @return {Promise<Array, Error>} An array containing the objects
     */
    findStoreByID (storeId) {
        return baseQuery()
            .where({ 'store.id': storeId })
            .then(stores => stores.map(json))
            .then(stores => stores[0]);
    },

    /**
     * Find all products that are present in a store's window and return the product id's and image url's
     * @param storeId
     * @return {Promise<Array, Error>} An array containing the objects
     */
    // findProductsInStoreWindow (storeId) {
    //    return knex.select('products.id', 'products.image_url')
    //        .from('store_has_product')
    //        .where(
    //            {
    //                store_id: storeId,
    //                in_store_window: true,
    //            },
    //        )
    //        .innerJoin('products', 'products.id', 'store_has_product.product_id');
    // },
};

const baseQuery = () => knex.select(
        'store.id AS id',
        'store.name AS name',
        'company.id AS company_id',
        'company.name AS company_name',
        'company_category.key AS company_category',
        'company.description AS company_description',
        'company.logo_url AS company_logo_url',
        'address.lat',
        'address.lng',
        'address.street',
        'address.city',
        'address.zip_code',
    )
    .from('store')
    .innerJoin('address', 'store.address_id', 'address.id')
    .innerJoin('company', 'store.company_id', 'company.id')
    .innerJoin('company_category', 'company.company_category_id', 'company_category.id');

const json = (store) => {
    return {
        id: store.id,
        name: store.name,
        company: {
            id: store.company_id,
            name: store.company_name,
            category: store.company_category,
            description: store.company_description,
            logo_url: store.company_logo_url,
        },
        address: {
            lat: store.lat,
            lng: store.lng,
            street: store.street,
            city: store.city,
            zip_code: store.zip_code,
        },
    };
};

module.exports = Store;

let knex = require('../../services/knex.js');

/** Store model **/
let Store = {

  /**
   * Find all stores in the database and return them. Including their coordinates.
   * @return {Promise<Array, Error>} An array containing the store objects
   */
  findAllStores: function () {
    return knex.select('stores.name AS store', 'companies.name AS company', 'product_categories.id AS product_category', 'addresses.lat', 'addresses.lng')
      .from('stores')
      .innerJoin('companies', 'stores.company_id', 'companies.id')
      .innerJoin('product_categories', 'companies.product_category_id', 'product_categories.id')
      .innerJoin('addresses', 'stores.address_id', 'addresses.id')
  },

  /**
   * Find all stores in the database that have their address within the speciefied radius
   * @param lat
   * @param lng
   * @param radius Search radius in meters
   * @return {Promise<Array, Error>} An array containing the objects
     */
  findAllStoresNear: function (lat, lng, radius) {
    return knex.select('stores.name AS store', 'companies.name AS company', 'product_categories.id AS product_category', 'addresses.lat', 'addresses.lng')
      .from('stores')
      .innerJoin('addresses', 'stores.address_id', 'addresses.id')
      .whereRaw('cube_contains(earth_box(ll_to_earth(?, ?), ?), ll_to_earth(addresses.lat, addresses.lng))', [lat, lng, radius])
      .innerJoin('companies', 'stores.company_id', 'companies.id')
      .innerJoin('product_categories', 'companies.product_category_id', 'product_categories.id')
  }
};

module.exports = Store;
let knex = require('../../services/knex.js');

/** Store model **/
let Store = {

  /**
   * Find all stores in the database and return them
   * @return {Promise<Array, Error>} An array containing the store objects
   */
  findAllStores: function () {
    return knex('stores');
  },

  /**
   * Find all stores in the database that can be found in the speciefied radius
   * @param lat
   * @param lng
   * @param radius Search radius in meters
   * @return {Promise<Array, Error>} An array containing the objects
     */
  findAllStoresNear: function (lat, lng, radius) {
    return knex.select('stores.name', 'addresses.lat', 'addresses.lng')
      .from('stores')
      .innerJoin('addresses', 'stores.address_id', 'addresses.id')
      .whereRaw('cube_contains(earth_box(ll_to_earth(?, ?), ?), ll_to_earth(addresses.lat, addresses.lng))', [lat, lng, radius])
  }
};

module.exports = Store;
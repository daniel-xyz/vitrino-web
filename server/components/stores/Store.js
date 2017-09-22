const knex = require('../../services/knex.js');

/** Store model **/
const Store = {

  /**
   * Find all stores in the database and return them. Including their coordinates.
   * @return {Promise<Array, Error>} An array containing the store objects
   */
  findAllStores () {
    return knex.select('store.id AS id', 'store.name AS store', 'companies.name AS company', 'companies.description AS description', 'companies.logo_url AS logo_url', 'product_categories.id AS product_category', 'addresses.lat', 'addresses.lng')
      .from('store')
      .innerJoin('companies', 'store.company_id', 'companies.id')
      .innerJoin('company_categories', 'companies.company_category_id', 'company_categories.id')
      .innerJoin('addresses', 'store.address_id', 'addresses.id');
  },

  /**
   * Find all stores in the database that have their address within the speciefied radius
   * @param lat
   * @param lng
   * @param radius Search radius in meters
   * @return {Promise<Array, Error>} An array containing the objects
     */
  findAllStoresNear (lat, lng, radius) {
    return knex.select('store.id AS id', 'store.name AS store', 'companies.name AS company', 'companies.description AS description', 'product_categories.id AS product_category', 'addresses.lat', 'addresses.lng')
      .from('store')
      .innerJoin('addresses', 'store.address_id', 'addresses.id')
      .whereRaw('cube_contains(earth_box(ll_to_earth(?, ?), ?), ll_to_earth(addresses.lat, addresses.lng))', [lat, lng, radius])
      .innerJoin('companies', 'store.company_id', 'companies.id')
      .innerJoin('product_categories', 'companies.company_category_id', 'company_categories.id');
  },

  /**
   * Find all products that are present in a store's window and return the product id's and image url's
   * @param storeId
   * @return {Promise<Array, Error>} An array containing the objects
     */
  findProductsInStoreWindow (storeId) {
    return knex.select('products.id', 'products.image_url')
      .from('store_has_product')
      .where({
        store_id: storeId,
        in_store_window: true,
      })
      .innerJoin('products', 'products.id', 'store_has_product.product_id');
  },

    /**
     * Find a store by id and return all relevant data, like products and opening hours.
     * TODO - return all necessary data, not only products.
     * @param storeId
     * @return {Promise<Array, Error>} An array containing the objects
     */
    findStoreByID (storeId) {
        return knex.select('products.id', 'products.image_url')
            .from('store_has_product')
            .where({
                store_id: storeId,
                in_store_window: true,
            })
            .innerJoin('products', 'products.id', 'store_has_product.product_id');
    },
};

module.exports = Store;

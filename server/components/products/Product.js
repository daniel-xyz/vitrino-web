let knex = require('../../services/knex.js');

/** Product model **/
let Product = {

  /**
   * Find all products in the database and return them
   * @return {Promise<Array, Error>} An array containing the product objects
   */
  findAllProducts: function () {
    return knex('products');
  },

  /**
   * Find a product based on the product's ID and set column 'verified' to true
   * @param {Number} id The product's ID
   * @return {Promise<Array, Error>} An array containing only the updated product object
   */
  verifyProduct: function (id) {
    return knex('products')
      .where('id', id)
      .update('verified', true)
      .returning('*')
  }
};

module.exports = Product;